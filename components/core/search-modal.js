import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import MicrophoneIcon from '../icons/Microphone'
import styles from './search-modal.module.scss'

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

export default function SearchModal({ open, searchModalController, chapters = [] }) {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [chapterResults, setChapterResults] = useState([])
  const [showResults, setShowResults] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [recognition, setRecognition] = useState(null)
  const [selectedResultIndex, setSelectedResultIndex] = useState(-1)
  const searchInputRef = useRef(null)
  const searchResultsRef = useRef(null)
  const searchContainerRef = useRef(null)

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
    if (open && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current.focus()
      }, 100)
    } else if (!open) {
      setSearchQuery("")
      setShowResults(false)
      setIsExpanded(false)
      setChapterResults([])
    }
  }, [open])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setShowResults(false)
        setIsExpanded(false)
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside)
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [open])

  const handleKeyDown = (e) => {
    if (!isExpanded || !showResults) return
    const totalResults = chapterResults.length
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault()
        setSelectedResultIndex((prev) => (prev < totalResults - 1 ? prev + 1 : 0))
        break
      case "ArrowUp":
        e.preventDefault()
        setSelectedResultIndex((prev) => (prev > 0 ? prev - 1 : totalResults - 1))
        break
      case "Enter":
        e.preventDefault()
        if (selectedResultIndex >= 0 && selectedResultIndex < totalResults) {
          const selectedResult = chapterResults[selectedResultIndex]
          handleResultClick({
            type: "chapter",
            slug: selectedResult.slug,
            chapterNo: selectedResult.chapterNo,
            name: selectedResult.name,
          })
        }
        break
      case "Escape":
        e.preventDefault()
        searchModalController(false)()
        break
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isExpanded, showResults, selectedResultIndex, chapterResults])

const normalize = (str) => {
  return str
    ?.toLowerCase()
    .normalize("NFD")                    
    .replace(/[\u0300-\u036f]/g, "")     
    .replace(/[-_\s]/g, "")             
    .replace(/^an|^al/, "")             
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
    if (query.trim()) {
      setShowResults(true)
      setIsExpanded(true)
    } else {
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
    setShowResults(false)
    setIsExpanded(false)
    setChapterResults([])
    setSelectedResultIndex(-1)
    searchModalController(false)()
    router.replace(`/search?query=${encodeURIComponent(query)}`)
  }

  const handleResultClick = (result) => {
    if (result.type === "chapter" || result.chapterNo) {
      const slug = result.slug || result.chapterNo
      router.push(`/chapters/${slug}`)
    } else {
      router.push(`/chapters/${result.chapter_number}/verses/${result.verse_number}`)
    }
    searchModalController(false)()
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (searchQuery.trim() === "") return
    router.push(`/search?query=${encodeURIComponent(searchQuery)}`)
    searchModalController(false)()
  }

  const hasAnyResults = chapterResults.length > 0
  const showMoreButton = searchQuery.trim().length > 0 && (chapterResults.length > 0 || searchQuery.trim().length >= 2)

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
    <div className={open ? `${styles.modal} ${styles.active}` : styles.modal}>
      <div className={styles.searchContainer}>
        <div className={styles.closeIconArea}>
          <span className={styles.close} onClick={searchModalController(false)}></span>
        </div>
        <form className={styles.search} onSubmit={handleSubmit}>
          <div
            ref={searchContainerRef}
            className="search-container"
            style={{
              position: "relative",
              background: "var(--bg11)",
              border: "1px solid var(--bdr11)",
              borderRadius: 25,
              transition: "all 0.3s ease",
              overflow: "hidden",
              paddingBottom: isExpanded && showResults ? 20 : 0,
              boxShadow: isExpanded && showResults ? "0 6px 20px rgba(0, 0, 0, 0.15)" : "none",
              width: "100%",
            }}
          >
            <div className={styles.searchInputWrapper}>
              <div className={styles.searchIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="m23.5 21.466-7.01-7.01a9.07 9.07 0 0 0 1.736-5.343C18.226 4.088 14.138 0 9.113 0S0 4.088 0 9.113s4.088 9.113 9.113 9.113a9.07 9.07 0 0 0 5.343-1.735l7.01 7.009zM9.113 15.348a6.236 6.236 0 1 1 6.235-6.235 6.243 6.243 0 0 1-6.235 6.235"></path>
                </svg>
              </div>
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search the Quran..."
                value={searchQuery}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                className={styles.searchInput}
              />
              <div style={{ display: "flex", alignItems: "center" }}>
                <div
                  className={`${styles.microphoneIcon} ${isListening ? styles.listening : ""}`}
                  onClick={handleMicrophoneClick}
                  title="Voice search"
                >
                  <MicrophoneIcon />
                  {isListening && (
                    <div
                      style={{
                        position: "absolute",
                        top: -2,
                        right: -2,
                        width: 8,
                        height: 8,
                        background: "var(--main-color)",
                        borderRadius: "50%",
                        animation: "blink 1s infinite",
                      }}
                    ></div>
                  )}
                </div>
              </div>
            </div>
            {isExpanded && (
              <div className={styles.searchResultsContainer} ref={searchResultsRef}>
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
        </form>
      </div>
    </div>
  )
}