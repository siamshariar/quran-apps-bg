"use client"
import { useContext, useState, useEffect, useRef, useCallback, memo } from "react"
import { useRouter } from "next/navigation"
import { Virtuoso } from "react-virtuoso"
import Skeleton from "react-loading-skeleton"
import VerseCard from "../../surah/verse-card"
import SearchPagination from "../../surah/search-pagination"
import { SettingsContext } from "../../../contexts/SettingsContext"
import { t } from "../../../lib/config"
import MicrophoneIcon from "../../icons/Microphone"
import styles from "./content.module.scss"

const MemoizedSearchPagination = memo(SearchPagination)
const MemoizedVerseCard = memo(VerseCard)

const BookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="14" fill="none" viewBox="0 0 24 21">
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M13.714 0h9.429L24 .868v17.36l-.857.868h-9.069L12.6 20.57h-1.2l-1.474-1.475H.857L0 18.228V.868L.857 0h9.429l.6.26L12 1.371l1.114-1.11zm-2.88 17.62.309.295.051-14.894-1.268-1.285H1.714V17.36h8.572zm2.88-.26h8.572V1.736h-8.212l-1.2 1.215v14.895l.24-.226zM15.43 5.208h5.142v1.736H15.43zM20.57 8.68H15.43v1.736h5.142zm0 3.472H15.43v1.736h5.142z"
      clipRule="evenodd"
    ></path>
    <path
      fill="currentColor"
      d="M5.714 1.714V8l2-1.916 2 1.916V1.714zm.41.393h3.18v4.91l-1.59-1.522-1.59 1.522z"
    ></path>
    <path fill="currentColor" d="M6.124 2.107h3.18v4.91l-1.59-1.522-1.59 1.522z"></path>
  </svg>
)

const getTranslatorName = (translationCode) =>
  ({
    vietnamese_hassan: "Hasan Abdul-Karim",
    vietnamese_rwwad: "Ruwwad Translation Center",
    english_abdel_haleem: "M.A.S. Abdel Haleem",
    english_mustafa_khattab: "Dr. Mustafa Khattab",
    english_usmani: "T. Usmani",
    english_maududi: "A. Maududi (Tafhim commentary)",
    english_pickthall: "M. Pickthall",
    english_yusuf_ali: "A. Yusuf Ali",
    english_saheeh: "Saheeh International",
    english_hilali_khan: "Al-Hilali & Khan",
    english_transliteration: "Transliteration",
  })[translationCode] || translationCode

export default function SearchContent({
  searchQuery,
  searchResults: initialSearchResults,
  totalResults: initialTotalResults,
  totalPages: initialTotalPages,
  currentPage,
  loading: initialLoading,
  backgroundLoading,
  hasInstantResults,
  chapters = [],
}) {
  const { translation } = useContext(SettingsContext)
  const router = useRouter()
  const [searchInput, setSearchInput] = useState(searchQuery || "")
  const [chapterResults, setChapterResults] = useState([])
  const [showResults, setShowResults] = useState(false)
  const [recentNavigations, setRecentNavigations] = useState([])
  const [isExpanded, setIsExpanded] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [recognition, setRecognition] = useState(null)
  const [selectedRecentIndex, setSelectedRecentIndex] = useState(-1)
  const [selectedResultIndex, setSelectedResultIndex] = useState(-1)

  // Search state
  const [searchResults, setSearchResults] = useState(initialSearchResults)
  const [totalResults, setTotalResults] = useState(initialTotalResults)
  const [totalPages, setTotalPages] = useState(initialTotalPages)
  const [loading, setLoading] = useState(initialLoading)
  const [searchSuggestions, setSearchSuggestions] = useState([])

  const searchInputRef = useRef(null)
  const wrapperRef = useRef(null)
  const virtuosoRef = useRef(null)
  const printRef = useRef(null)
  const debounceTimeoutRef = useRef(null)

  const showLoader = loading || (backgroundLoading && hasInstantResults)
  const [isMobile, setIsMobile] = useState(false)

  // Check if screen is mobile
  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 1024
      setIsMobile(mobile)
      console.log("Search - Screen size check:", { width: window.innerWidth, isMobile: mobile })
    }
    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)
    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  // Initialize speech recognition with enhanced error handling
  useEffect(() => {
    if (typeof window !== "undefined" && ("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      const recognitionInstance = new SpeechRecognition()

      recognitionInstance.continuous = false
      recognitionInstance.interimResults = false
      recognitionInstance.lang = "en-US"
      recognitionInstance.maxAlternatives = 1

      recognitionInstance.onstart = () => {
        setIsListening(true)
        console.log("Speech recognition started")
      }

      recognitionInstance.onresult = (event) => {
        const transcript = event.results[0][0].transcript
        console.log("Speech recognition result:", transcript)
        setSearchInput(transcript)
        handleSearch(transcript)
        setIsListening(false)
      }

      recognitionInstance.onerror = (event) => {
        console.error("Speech recognition error:", event.error)
        setIsListening(false)

        // Show user-friendly error messages
        if (event.error === "not-allowed") {
          alert("Microphone access denied. Please allow microphone access to use voice search.")
        } else if (event.error === "no-speech") {
          console.log("No speech detected. Please try again.")
        }
      }

      recognitionInstance.onend = () => {
        setIsListening(false)
        console.log("Speech recognition ended")
      }

      setRecognition(recognitionInstance)
    }
  }, [])

  // Load recent navigations from localStorage with error handling
  useEffect(() => {
    try {
      const saved = localStorage.getItem("recentNavigations")
      if (saved) {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed)) {
          setRecentNavigations(parsed)
        }
      }
    } catch (error) {
      console.error("Error loading recent navigations:", error)
      localStorage.removeItem("recentNavigations")
    }
  }, [])

  useEffect(() => {
    setSearchInput(searchQuery || "")
  }, [searchQuery])

  // Enhanced search results fetching with better error handling
  useEffect(() => {
    const fetchSearchResults = async (query, page) => {
      if (!query || query.trim().length < 1) {
        setSearchResults([])
        setTotalResults(0)
        setTotalPages(0)
        setLoading(false)
        return
      }

      setLoading(true)
      try {
        const results = await searchQuran(query, page, 10)
        setSearchResults(results.verses || [])
        setTotalResults(results.total || 0)
        setTotalPages(Math.ceil((results.total || 0) / 10))
      } catch (error) {
        console.error("Client-side search error:", error)
        setSearchResults([])
        setTotalResults(0)
        setTotalPages(0)

        // Show user-friendly error message
        if (error.name === "AbortError") {
          console.log("Search request was cancelled")
        } else {
          console.log("Search failed. Please try again.")
        }
      } finally {
        setLoading(false)
      }
    }

    if (searchQuery.trim()) {
      fetchSearchResults(searchQuery, currentPage)
    } else {
      setLoading(false)
    }
  }, [searchQuery, currentPage])

  // Enhanced search function for Quran API with retry logic
  const searchQuran = async (query, page = 1, limit = 10, retries = 2) => {
    try {
      if (!query || query.trim().length < 1) {
        return { verses: [], total: 0, page: page, limit: limit }
      }

      const baseUrl = typeof window !== "undefined" ? window.location.origin : ""
      const apiUrl = `${baseUrl}/api/search?query=${encodeURIComponent(query)}&page=${page}&limit=${limit}`

      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 10000)

      const res = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        signal: controller.signal,
        cache: "no-store",
      })

      clearTimeout(timeoutId)

      if (!res.ok) {
        throw new Error(`Search API error: ${res.status}`)
      }

      const data = await res.json()
      return data
    } catch (error) {
      if (retries > 0 && error.name !== "AbortError") {
        console.log(`Retrying search... (${retries} attempts left)`)
        await new Promise((resolve) => setTimeout(resolve, 1000))
        return searchQuran(query, page, limit, retries - 1)
      }

      if (error.name === "AbortError") {
        console.log("Search request timed out")
      } else {
        console.error("Client-side search error:", error)
      }
      return { verses: [], total: 0, page: page, limit: limit }
    }
  }

  // Enhanced scroll to top functionality
  useEffect(() => {
    const handleScrollToTop = (event) => {
      if (event.detail?.shouldScrollToTop && virtuosoRef.current) {
        virtuosoRef.current.scrollToIndex({
          index: 0,
          align: "start",
          behavior: "smooth",
        })
        setTimeout(() => {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          })
        }, 100)
      }
    }

    document.addEventListener("scrollToTop", handleScrollToTop)
    return () => {
      document.removeEventListener("scrollToTop", handleScrollToTop)
    }
  }, [])

  // Enhanced recent navigation saving with validation
  const saveRecentNavigation = (item) => {
    try {
      if (!item || !item.type) return

      const existingIndex = recentNavigations.findIndex(
        (nav) =>
          nav.type === item.type &&
          ((nav.slug && nav.slug === item.slug) ||
            (nav.query && nav.query === item.query) ||
            (nav.chapterNo && nav.chapterNo === item.chapterNo)),
      )

      let newNavigations
      if (existingIndex !== -1) {
        newNavigations = [item, ...recentNavigations.filter((_, index) => index !== existingIndex)]
      } else {
        newNavigations = [item, ...recentNavigations]
      }

      newNavigations = newNavigations.slice(0, 5)
      setRecentNavigations(newNavigations)
      localStorage.setItem("recentNavigations", JSON.stringify(newNavigations))
    } catch (error) {
      console.error("Error saving recent navigation:", error)
    }
  }

  // Remove recent navigation with error handling
  const removeRecentNavigation = (index) => {
    try {
      const newNavigations = recentNavigations.filter((_, i) => i !== index)
      setRecentNavigations(newNavigations)
      localStorage.setItem("recentNavigations", JSON.stringify(newNavigations))
      setSelectedRecentIndex(-1)
    } catch (error) {
      console.error("Error removing recent navigation:", error)
    }
  }

  // Utility function to normalize strings
  const normalize = (str) => {
    return str
      ?.toLowerCase()
      .normalize("NFD")                     // Decompose accents
      .replace(/[\u0300-\u036f]/g, "")     // Remove accents/diacritics
      .replace(/[-_\s]/g, "")              // Remove dashes, underscores, spaces
      .replace(/^(an|al)/, "")             // Optional: remove "An" or "Al" prefix
  }


  // Enhanced chapter filtering with better relevance scoring
  const filterChapters = (query) => {
    if (!query.trim() || !chapters.length) return []

    const searchTerm = normalize(query)

  const filtered = chapters.filter((chapter) => {
    const chapterNoMatch = chapter.chapterNo?.toString().includes(searchTerm)
    const nameMatch = normalize(chapter.name || "").includes(searchTerm)
    const transliterationMatch = normalize(chapter.transliteration || "").includes(searchTerm)
    const meaningMatch = normalize(chapter.meaning || "").includes(searchTerm)
    const slugMatch = normalize(chapter.slug || "").includes(searchTerm)

    return (
      chapterNoMatch ||
      nameMatch ||
      transliterationMatch ||
      meaningMatch ||
      slugMatch
    )
  })


  return filtered
    .sort((a, b) => {
      const aExactMatch = normalize(a.name) === searchTerm || normalize(a.transliteration) === searchTerm
      const bExactMatch = normalize(b.name) === searchTerm || normalize(b.transliteration) === searchTerm
      if (aExactMatch && !bExactMatch) return -1
      if (!aExactMatch && bExactMatch) return 1
      return a.chapterNo - b.chapterNo
    })
    .slice(0, 5)
}


  const handleSearch = useCallback(
    (query) => {
      const localChapterResults = filterChapters(query)
      setChapterResults(localChapterResults)

      if (query.trim()) {
        setShowResults(true)
        setIsExpanded(true)

        if (query.length >= 2) {
          const suggestions = generateSearchSuggestions(query)
          setSearchSuggestions(suggestions)
        }
      } else {
        setShowResults(false)
        setIsExpanded(false)
        setSearchSuggestions([])
      }

      setSelectedResultIndex(-1)
    },
    [chapters],
  )

  const generateSearchSuggestions = (query) => {
    const commonTerms = [
      "Allah",
      "prayer",
      "faith",
      "mercy",
      "forgiveness",
      "guidance",
      "paradise",
      "hell",
      "prophet",
      "messenger",
      "book",
      "revelation",
      "believers",
      "disbelievers",
      "righteous",
      "sin",
      "repentance",
    ]

    const searchTerm = query.toLowerCase()
    return commonTerms
      .filter((term) => term.toLowerCase().includes(searchTerm) && term.toLowerCase() !== searchTerm)
      .slice(0, 3)
  }

  const handleInputChange = (e) => {
    const value = e.target.value
    setSearchInput(value)

    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current)
    }

    debounceTimeoutRef.current = setTimeout(() => {
      handleSearch(value)
    }, 300)
  }

  const handleInputFocus = () => {
    handleSearch(searchInput)
  }

  const handleMicrophoneClick = () => {
    if (!recognition) {
      alert("Speech recognition is not supported in your browser.")
      return
    }

    if (!isListening) {
      try {
        recognition.start()
      } catch (error) {
        console.error("Error starting speech recognition:", error)
        if (error.name === "InvalidStateError") {
          console.log("Speech recognition is already active")
        } else {
          alert("Failed to start voice recognition. Please try again.")
        }
      }
    } else {
      try {
        recognition.stop()
      } catch (error) {
        console.error("Error stopping speech recognition:", error)
      }
    }
  }

  const handleMoreResults = () => {
    if (!searchInput.trim()) return

    const query = searchInput.trim()
    setShowResults(false)
    setIsExpanded(false)
    setChapterResults([])
    setSelectedResultIndex(-1)

    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current)
    }

    saveRecentNavigation({
      type: "search",
      query: query,
      timestamp: Date.now(),
    })

    router.replace(`/search?query=${encodeURIComponent(query)}`)
  }

  const handleResultClick = (result) => {
    try {
      if (result.type === "chapter" || result.chapterNo) {
        const slug = result.slug || result.chapterNo
        const chapter = chapters.find((c) => c.chapterNo === result.chapterNo || c.slug === slug)

        saveRecentNavigation({
          type: "chapter",
          slug: slug,
          name: result.name || chapter?.name,
          chapterNo: result.chapterNo || chapter?.chapterNo,
          timestamp: Date.now(),
        })

        router.push(`/chapters/${slug}`)
      } else {
        saveRecentNavigation({
          type: "verse",
          chapterNo: result.chapter_number,
          verseNo: result.verse_number,
          timestamp: Date.now(),
        })

        router.push(`/chapters/${result.chapter_number}/verses/${result.verse_number}`)
      }

      setShowResults(false)
      setIsExpanded(false)
    } catch (error) {
      console.error("Error handling result click:", error)
    }
  }

  const handleRecentNavigationClick = (item) => {
    try {
      if (item.type === "search") {
        setSearchInput(item.query)
        router.push(`/search?query=${encodeURIComponent(item.query)}`)
      } else if (item.type === "chapter") {
        router.push(`/chapters/${item.slug}`)
      } else if (item.type === "juz") {
        router.push(`/juz/${item.number}`)
      } else if (item.type === "page") {
        router.push(`/page/${item.number}`)
      } else if (item.type === "verse") {
        router.push(`/chapters/${item.chapterNo}/verses/${item.verseNo}`)
      }

      setShowResults(false)
      setIsExpanded(false)
    } catch (error) {
      console.error("Error handling recent navigation click:", error)
    }
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowResults(false)
        setIsExpanded(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  useEffect(() => {
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current)
      }
    }
  }, [])

  const hasAnyResults = chapterResults.length > 0
  const showMoreButton = searchInput.trim().length > 0 && (chapterResults.length > 0 || searchInput.trim().length >= 2)

  const handleCloseSearch = () => {
    setSearchInput("")
    setChapterResults([])
    setShowResults(false)
    setIsExpanded(false)
    setSelectedRecentIndex(-1)
    setSelectedResultIndex(-1)
    setSearchSuggestions([])

    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current)
    }

    if (searchInputRef.current) {
      searchInputRef.current.blur()
    }
  }

  const getIconForType = (type) => {
    switch (type) {
      case "search":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
            <path d="m23.5 21.466-7.01-7.01a9.07 9.07 0 0 0 1.736-5.343C18.226 4.088 14.138 0 9.113 0S0 4.088 0 9.113s4.088 9.113 9.113 9.113a9.07 9.07 0 0 0 5.343-1.735l7.01 7.009zM9.113 15.348a6.236 6.236 0 1 1 6.235-6.235 6.243 6.243 0 0 1-6.235 6.235"></path>
          </svg>
        )
      case "chapter":
        return <BookIcon />
      case "juz":
      case "page":
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path
              d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"
              stroke="currentColor"
              strokeWidth="2"
            />
            <polyline points="14,2 14,8 20,8" stroke="currentColor" strokeWidth="2" />
          </svg>
        )
      case "verse":
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 6.253V12L16.5 16.5M21 12C21 16.971 16.971 21 12 21C7.029 21 3 16.971 3 12C3 7.029 7.029 3 12 3C16.971 3 21 7.029 21 12Z"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        )
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
            <path d="m23.5 21.466-7.01-7.01a9.07 9.07 0 0 0 1.736-5.343C18.226 4.088 14.138 0 9.113 0S0 4.088 0 9.113s4.088 9.113 9.113 9.113a9.07 9.07 0 0 0 5.343-1.735l7.01 7.009zM9.113 15.348a6.236 6.236 0 1 1 6.235-6.235 6.243 6.243 0 0 1-6.235 6.235"></path>
          </svg>
        )
    }
  }

  const renderVerse = useCallback(
    (index) => {
      try {
        const verse = searchResults[index]
        if (!verse) return null

        const verseTranslations = { [translation]: verse }

        return (
          <MemoizedVerseCard
            key={`${verse.chapter_number}-${verse.verse_number}-${translation}`}
            index={index}
            chapterNo={verse.chapter_number}
            chapterName={verse.chapter_name}
            chapterSlug={verse.chapter_slug}
            verse={{
              verseNo: verse.verse_number,
              translation: verse.translation || verse.text,
              footnote: verse.footnote || "",
            }}
            ayaArabic={verse.arabic}
            printRef={printRef.current}
            updateBookmarksData={null}
            isBookmarkPage={false}
            isVirtualized={true}
            isLastVerse={index === searchResults.length - 1}
            translation={translation}
            allTranslations={verseTranslations}
            activeTranslations={[translation]}
            isSearchResult={true}
          />
        )
      } catch (error) {
        console.error("Error rendering verse:", error)
        return (
          <div key={`error-${index}`} className={styles.verseError}>
            <p>Error loading verse. Please try refreshing the page.</p>
          </div>
        )
      }
    },
    [searchResults, translation],
  )

  const openSettings = useCallback(() => {
    console.log("Search - openSettings called, isMobile:", isMobile)
    if (isMobile) {
      console.log("Search - Dispatching openMobileTranslationModal event")
      const event = new CustomEvent("openMobileTranslationModal", {
        detail: { open: true },
        bubbles: true,
      })
      document.dispatchEvent(event)
      setTimeout(() => {
        window.dispatchEvent(
          new CustomEvent("openMobileTranslationModal", {
            detail: { open: true },
            bubbles: true,
          }),
        )
      }, 10)
    } else {
      console.log("Search - Dispatching openSidenavSettings event for desktop")
      document.dispatchEvent(
        new CustomEvent("openSidenavSettings", {
          detail: {
            open: true,
            expandedSetting: "translation",
          },
          bubbles: true,
        }),
      )
    }
  }, [isMobile])

  return (
    <div className={styles.search}>
      <div className={styles.search_tab} ref={printRef}>
        {showLoader ? (
          <>
            <Skeleton style={{ marginBottom: "24px" }} count={1} height={49} width={`100%`} className="skeleton" />
            <Skeleton count={7} height={150} width={`100%`} className="skeleton" />
            <Skeleton style={{ marginTop: "32px" }} count={1} height={64} width={`100%`} className="skeleton" />
          </>
        ) : (
          <>
            <div className={styles.title}>
              <span className={styles.title_text}>Search results for: "{searchQuery}"</span>
            </div>

            {/* Enhanced Search Input Section */}
            <div className={styles.search_section}>
              <div className={styles.searchContainer} ref={wrapperRef}>
                <div className={`${styles.searchInputWrapper} ${isExpanded ? styles.expanded : ""}`}>
                  <div className={styles.inputFlexRow}>
                    <div className={styles.searchIcon}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="m23.5 21.466-7.01-7.01a9.07 9.07 0 0 0 1.736-5.343C18.226 4.088 14.138 0 9.113 0S0 4.088 0 9.113s4.088 9.113 9.113 9.113a9.07 9.07 0 0 0 5.343-1.735l7.01 7.009zM9.113 15.348a6.236 6.236 0 1 1 6.235-6.235 6.243 6.243 0 0 1-6.235 6.235"></path>
                      </svg>
                    </div>
                    <input
                      type="text"
                      placeholder="Search the Quran..."
                      value={searchInput}
                      onChange={handleInputChange}
                      onFocus={handleInputFocus}
                      className={styles.searchInput}
                      ref={searchInputRef}
                      autoComplete="off"
                      spellCheck="false"
                    />
                    {!searchInput.trim() ? (
                      <div
                        className={`${styles.microphoneIcon} ${isListening ? styles.listening : ""}`}
                        onClick={handleMicrophoneClick}
                        title={isListening ? "Stop listening" : "Voice search"}
                      >
                        <MicrophoneIcon />
                        {isListening && <div className={styles.listeningIndicator}></div>}
                      </div>
                    ) : (
                      <button className={styles.closeButton} onClick={handleCloseSearch} title="Clear search">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path
                            d="M18 6L6 18M6 6L18 18"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    )}
                  </div>

                  {/* Enhanced Search Results Container */}
                  {isExpanded && (
                    <div className={styles.searchResultsContainer}>
                      {showResults && searchInput.trim() && (
                        <>
                          <div className={styles.searchResultsHeader}>
                            <span className={styles.searchResultsTitle}>Search Results</span>
                            {showMoreButton && (
                              <button className={styles.moreResults} onClick={handleMoreResults}>
                                More results →
                              </button>
                            )}
                          </div>

                          {hasAnyResults ? (
                            <div className={styles.resultsContainer}>
                              {chapterResults.map((chapter, index) => (
                                <div
                                  key={`chapter-${chapter.chapterNo}-${index}`}
                                  className={`${styles.resultItem} ${index === selectedResultIndex ? styles.selected : ""}`}
                                  onClick={() =>
                                    handleResultClick({
                                      type: "chapter",
                                      slug: chapter.slug,
                                      chapterNo: chapter.chapterNo,
                                      name: chapter.name,
                                    })
                                  }
                                  onMouseEnter={() => setSelectedResultIndex(index)}
                                  onMouseLeave={() => setSelectedResultIndex(-1)}
                                >
                                  <div className={styles.resultIcon}>{getIconForType("chapter")}</div>
                                  <div className={styles.resultContent}>
                                    <span className={styles.resultTitle}>
                                      {`${chapter.chapterNo}. ${chapter.name}`}
                                    </span>
                                    {chapter.meaning && (
                                      <span className={styles.resultDescription}>{chapter.meaning}</span>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : searchInput.trim() ? (
                            <div className={styles.noResults}>No results found for "{searchInput}"</div>
                          ) : null}
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Enhanced Translation Info Section */}
            <div className={styles.change_translation}>
              <span className={styles.translation_info}>
                {!loading && (
                  <span>
                    {totalResults} {totalResults === 1 ? "result" : "results"} •{" "}
                  </span>
                )}{" "}
                {t("Translation by")} {getTranslatorName(translation)}{" "}
                <span className={styles.change_link} onClick={openSettings}>
                  ({t("Change")})
                </span>
              </span>
            </div>

            {/* Enhanced Verses Section */}
            <div className={styles.verses}>
              {searchResults && searchResults.length > 0 ? (
                <Virtuoso
                  ref={virtuosoRef}
                  useWindowScroll
                  totalCount={searchResults.length}
                  itemContent={renderVerse}
                  overscan={1000}
                  increaseViewportBy={{ top: 500, bottom: 500 }}
                  style={{
                    height: "100%",
                    minHeight: "calc(100vh - 200px)",
                    contain: "strict",
                    willChange: "transform",
                  }}
                />
              ) : (
                !loading && (
                  <div className={styles.no_results}>
                    <p>No verses found matching your query.</p>
                    {searchQuery && (
                      <p className={styles.searchTips}>Try searching with different keywords or check your spelling.</p>
                    )}
                  </div>
                )
              )}
            </div>

            <div className={styles.print_footer}>
              <span>{getTranslatorName(translation)}</span>
              <span>www.quran.com</span>
            </div>
          </>
        )}
      </div>

      {/* Enhanced Pagination Section */}
      {!loading && searchResults && searchResults.length > 0 && totalPages > 1 && (
        <MemoizedSearchPagination
          currentPage={currentPage}
          totalPages={totalPages}
          searchQuery={searchQuery}
          totalResults={totalResults}
        />
      )}
    </div>
  )
}
