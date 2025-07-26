"use client"
import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import Container from "../../core/container"
import styles from "./search-section.module.scss"
import MicrophoneIcon from "../../icons/Microphone"

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

export default function SearchSection({ chapters = [] }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [chapterResults, setChapterResults] = useState([])
  const [showResults, setShowResults] = useState(false)
  const [recentNavigations, setRecentNavigations] = useState([])
  const [isExpanded, setIsExpanded] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [recognition, setRecognition] = useState(null)
  const [selectedRecentIndex, setSelectedRecentIndex] = useState(-1)
  const [selectedResultIndex, setSelectedResultIndex] = useState(-1)
  const searchInputRef = useRef(null)
  const wrapperRef = useRef(null)
  const router = useRouter()

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== "undefined" && ("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      const recognitionInstance = new SpeechRecognition()
      recognitionInstance.continuous = false
      recognitionInstance.interimResults = false
      recognitionInstance.lang = "en-US"

      recognitionInstance.onstart = () => {
        setIsListening(true)
      }

      recognitionInstance.onresult = (event) => {
        const transcript = event.results[0][0].transcript
        setSearchQuery(transcript)
        handleSearch(transcript)
        setIsListening(false)
      }

      recognitionInstance.onerror = (event) => {
        console.error("Speech recognition error:", event.error)
        setIsListening(false)
      }

      recognitionInstance.onend = () => {
        setIsListening(false)
      }

      setRecognition(recognitionInstance)
    }
  }, [])

  useEffect(() => {
    const saved = localStorage.getItem("recentNavigations")
    if (saved) {
      setRecentNavigations(JSON.parse(saved))
    }
  }, [])

  const saveRecentNavigation = (item) => {
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
  }

  const removeRecentNavigation = (index) => {
    const newNavigations = recentNavigations.filter((_, i) => i !== index)
    setRecentNavigations(newNavigations)
    localStorage.setItem("recentNavigations", JSON.stringify(newNavigations))
    setSelectedRecentIndex(-1)
  }

const normalize = (str) => {
  return str
    ?.toLowerCase()
    .normalize("NFD")                    
    .replace(/[\u0300-\u036f]/g, "")    
    .replace(/[-_\s]/g, "")              
    .replace(/^(an|al)/, "")             
}


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

  const handleSearch = (query) => {
    const localChapterResults = filterChapters(query)
    setChapterResults(localChapterResults)
    // If we have a query, always show results and keep expanded
    if (query.trim()) {
      setShowResults(true)
      setIsExpanded(true)
    } else {
      // Close expanded padding when no keyword
      setShowResults(false)
      setIsExpanded(false)
    }
    setSelectedResultIndex(-1)
  }

  const handleInputChange = (e) => {
    const value = e.target.value
    setSearchQuery(value)
    clearTimeout(window.searchTimeout)
    window.searchTimeout = setTimeout(() => {
      handleSearch(value)
    }, 100)
  }

  const handleInputFocus = () => {
    handleSearch(searchQuery)
  }

  const handleMicrophoneClick = () => {
    if (recognition && !isListening) {
      try {
        recognition.start()
      } catch (error) {
        console.error("Error starting speech recognition:", error)
      }
    }
  }

  const handleMoreResults = () => {
    if (!searchQuery.trim()) return
    const query = searchQuery.trim()
    
    saveRecentNavigation({
      type: "search",
      query: query,
      timestamp: Date.now()
    })
    
    clearTimeout(window.searchTimeout)
    
    
    router.push(`/search?query=${encodeURIComponent(query)}`)
  }

  const handleResultClick = (result) => {
    if (result.type === "chapter" || result.chapterNo) {
      const slug = result.slug || result.chapterNo
      const chapter = chapters.find((c) => c.chapterNo === result.chapterNo || c.slug === slug)
      
      saveRecentNavigation({
        type: "chapter",
        slug: slug,
        chapterNo: result.chapterNo,
        name: result.name || chapter?.name,
        timestamp: Date.now()
      })
      
      router.push(`/chapters/${slug}`)
    } else {
      saveRecentNavigation({
        type: "verse",
        chapterNo: result.chapter_number,
        verseNo: result.verse_number,
        timestamp: Date.now()
      })
      
      router.push(`/chapters/${result.chapter_number}/verses/${result.verse_number}`)
    }
    
    setShowResults(false)
    setIsExpanded(false)
  }

  const handleRecentNavigationClick = (item) => {
    if (item.type === "search") {
      setSearchQuery(item.query)
      handleSearch(item.query)
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
  }, [searchQuery])

  const hasAnyResults = chapterResults.length > 0
  const showMoreButton =
    isExpanded && searchQuery.trim().length > 0 && (chapterResults.length > 0 || searchQuery.trim().length >= 2)

  const handleCloseSearch = () => {
    setSearchQuery("")
    setChapterResults([])
    setShowResults(false)
    setIsExpanded(false)
    setSelectedRecentIndex(-1)
    setSelectedResultIndex(-1)
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

  return (
    <div className={styles.searchSection}>
      <Container>
        <div className={styles.searchContainer} ref={wrapperRef}>
          <div className={`${styles.searchInputWrapper} ${isExpanded ? styles.expanded : ""}`}>
            <div className={styles.inputFlexRow}>
              <div className={styles.searchIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="m23.5 21.466-7.01-7.01a9.07 9.07 0 0 0 1.736-5.343C18.226 4.088 14.138 0 9.113 0S0 4.088 0 9.113s4.088 9.113 9.113 9.113a9.07 9.07 0 0 0 5.343-1.735l7.01 7.009zM9.113 15.348a6.236 6.236 0 1 1 6.235-6.235 6.243 6.243 0 0 1-6.235 6.235"></path>
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search the Quran..."
                value={searchQuery}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                className={styles.searchInput}
                ref={searchInputRef}
              />
              {!searchQuery.trim() ? (
                <div
                  className={`${styles.microphoneIcon} ${isListening ? styles.listening : ""}`}
                  onClick={handleMicrophoneClick}
                  title="Voice search"
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
            {isExpanded && (
              <div className={styles.searchResultsContainer}>
                {searchQuery.trim() && (
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
                              <span className={styles.resultTitle}>{`${chapter.chapterNo}. ${chapter.name}`}</span>
                            </div>

                            {chapter.meaning && (
                              <span className={styles.resultDescription}>{chapter.meaning}</span>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className={styles.noResults}>No results found</div>
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  )
}