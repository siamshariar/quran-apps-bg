import { useState, useContext, useEffect, useRef, useCallback } from 'react'
import { SettingsContext } from '../../contexts/SettingsContext'
import { useRouter } from 'next/router'
import Button from '@mui/material/Button'
import SendIcon from '../icons/Send'
import CloseIcon from '../icons/Close'
import styles from './go-to-verse.module.scss'
import { useTheme, useMediaQuery } from '@mui/material'
import { t } from "../../lib/config"

export default function GoToVerseWeb({ open, onClose = () => {}, controller, chapters }) {
  const { verseMode, theme: userTheme } = useContext(SettingsContext);
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isTablet = useMediaQuery(theme.breakpoints.between("md", "lg"))
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"))

  const [selectedChapter, setSelectedChapter] = useState(1)
  const [selectedVerse, setSelectedVerse] = useState(1)
  const [versesList, setVersesList] = useState([])
  const [currentTheme, setCurrentTheme] = useState("light")
  const [activeSection, setActiveSection] = useState("chapter")
  const [searchQuery, setSearchQuery] = useState("")
  const [searchOpen, setSearchOpen] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const [backdropVisible, setBackdropVisible] = useState(false)

  const chapterListRef = useRef(null)
  const verseListRef = useRef(null)
  const modalRef = useRef(null)
  const searchInputRef = useRef(null)
  const isInitialLoadRef = useRef(true)
  const isProgrammaticScrollRef = useRef(false)

  const chapterScrollTimeoutRef = useRef(null)
  const verseScrollTimeoutRef = useRef(null)
  const lastChapterSelectionRef = useRef(null)
  const lastVerseSelectionRef = useRef(null)
  const chapterItemsCache = useRef([])
  const verseItemsCache = useRef([])
  const isScrollingRef = useRef(false)
  const scrollDirectionRef = useRef(null)
  const lastScrollTopRef = useRef({ chapter: 0, verse: 0 })

  const filteredChapters = chapters?.filter(
    (chapter) =>
      chapter.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chapter.chapterNo.toString().includes(searchQuery),
  )

  const throttle = useCallback((func, delay) => {
    let timeoutId
    let lastExecTime = 0
    return function (...args) {
      const currentTime = Date.now()

      if (currentTime - lastExecTime > delay) {
        func.apply(this, args)
        lastExecTime = currentTime
      } else {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(
          () => {
            func.apply(this, args)
            lastExecTime = Date.now()
          },
          delay - (currentTime - lastExecTime),
        )
      }
    }
  }, [])

  const getScrollBehavior = useCallback(() => {
    if (isMobile) {
      return {
        throttleDelay: 16, // 60fps
        centerThreshold: 40,
        scrollBehavior: "smooth",
        momentum: true,
      }
    } else if (isTablet) {
      return {
        throttleDelay: 12, // ~83fps
        centerThreshold: 35,
        scrollBehavior: "smooth",
        momentum: true,
      }
    } else {
      return {
        throttleDelay: 8, // 120fps
        centerThreshold: 30,
        scrollBehavior: "smooth",
        momentum: false,
      }
    }
  }, [isMobile, isTablet])

  const closeModal = useCallback(
    (event) => {
      if (event?.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) return
      setIsClosing(true)
      setBackdropVisible(false)
      setTimeout(() => {
        onClose()
        setIsClosing(false)
        setSearchQuery("")
        setSearchOpen(false)
      }, 300)
    },
    [onClose],
  )

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (open && modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal(event)
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside)
      document.addEventListener("touchstart", handleClickOutside)
      setBackdropVisible(true)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("touchstart", handleClickOutside)
    }
  }, [open, closeModal])

  const getThemeColors = useCallback(() => {
    const isDark = currentTheme === "dark"
    return {
      modalBg: isDark ? "#232A3B" : "#ffffff",
      contentBg: isDark ? "#232A3B" : "#ffffff",
      headerBg: isDark ? "#293145" : "#f8f9fa",
      footerBg: isDark ? "#293145" : "#f8f9fa",
      selectionBg: isDark ? "rgba(255, 255, 255, 0.15)" : "rgba(78, 139, 111, 0.15)",
      selectionBorder: isDark ? "rgba(255, 255, 255, 0.3)" : "rgba(31, 126, 249, 0.3)",
      hoverBg: isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.02)",
      primaryText: isDark ? "#ffffff" : "#2e3031",
      secondaryText: isDark ? "#b0b0b0" : "#666666",
      lightText: isDark ? "#888888" : "#9EABBE",
      borderColor: isDark ? "#313a55" : "#e0e0e0",
      accentColor: isDark ? "#4FC3F7" : "#1F7EF9",
      accentHover: isDark ? "#1565C0" : "#1565C0",
      buttonText: isDark ? "#ffffff" : "#ffffff",
      buttonHover: isDark ? "#1565C0" : "#1565C0",
      buttonDisabled: isDark ? "#2D3748" : "#E0E0E0",
      boxShadow: isDark ? "0 8px 32px rgba(0, 0, 0, 0.6)" : "0 8px 32px rgba(0, 0, 0, 0.15)",
      searchBg: isDark ? "#293145" : "#f0f2f5",
      iconBg: isDark ? "#293145" : "#f0f2f5",
    }
  }, [currentTheme])

  const centerItem = useCallback(
    (container, index, isChapter = false) => {
      if (!container || index < 0) return

      const cache = isChapter ? chapterItemsCache : verseItemsCache

      let items = cache.current
      if (!items.length) {
        items = Array.from(container.children).filter((child) => child.classList.contains(styles.list_item))
        cache.current = items
      }

      if (items[index]) {
        isProgrammaticScrollRef.current = true
        const containerHeight = container.clientHeight
        const itemHeight = items[index].clientHeight
        const scrollTop = items[index].offsetTop - containerHeight / 2 + itemHeight / 2

        if (isMobile) {
          container.style.scrollBehavior = "smooth"
          container.scrollTop = scrollTop
        } else {
          container.scrollTo({
            top: scrollTop,
            behavior: "smooth",
          })
        }

        const resetTimeout = isMobile ? 200 : 150
        setTimeout(() => {
          isProgrammaticScrollRef.current = false
        }, resetTimeout)
      }
    },
    [isMobile],
  )

  const updateVersesForChapter = useCallback(
    (chapterNo, options = {}) => {
      if (!chapterNo || !chapters) return

      const chapter = chapters.find((ch) => ch.chapterNo === chapterNo)
      if (chapter?.totalVerse) {
        const verses = Array.from({ length: chapter.totalVerse }, (_, i) => i + 1)

        requestAnimationFrame(() => {
          setVersesList(verses)
          setSelectedVerse(1)
          lastVerseSelectionRef.current = 1
          setActiveSection("verse")

          verseItemsCache.current = []
        })

        const { preventScroll = false } = options
        if (!preventScroll) {
          const scrollDelay = isMobile ? 20 : 10
          setTimeout(() => {
            if (verseListRef.current) {
              isProgrammaticScrollRef.current = true
              centerItem(verseListRef.current, 0, false)
            }
          }, scrollDelay)
        }
      }
    },
    [chapters, centerItem, isMobile],
  )

  const detectCenterItemSmooth = useCallback(
    (container, isChapter = false) => {
      if (!container || isProgrammaticScrollRef.current || isScrollingRef.current) return

      const scrollBehavior = getScrollBehavior()
      const cache = isChapter ? chapterItemsCache : verseItemsCache

      let items = cache.current
      if (!items.length) {
        items = Array.from(container.children).filter((child) => child.classList.contains(styles.list_item))
        cache.current = items
      }

      if (items.length === 0) return

      const containerRect = container.getBoundingClientRect()
      const containerCenter = containerRect.top + containerRect.height / 2

      let closestItem = null
      let minDistance = Number.POSITIVE_INFINITY

      for (let i = 0; i < items.length; i++) {
        const item = items[i]
        const itemRect = item.getBoundingClientRect()
        const itemCenter = itemRect.top + itemRect.height / 2
        const distance = Math.abs(itemCenter - containerCenter)

        if (distance < scrollBehavior.centerThreshold && distance < minDistance) {
          minDistance = distance
          closestItem = { index: i, element: item, distance }
        }

        if (distance < 10) break
      }

      if (closestItem) {
        if (isChapter) {
          const newChapter = filteredChapters[closestItem.index]?.chapterNo
          if (newChapter && newChapter !== selectedChapter && newChapter !== lastChapterSelectionRef.current) {
            lastChapterSelectionRef.current = newChapter

            requestAnimationFrame(() => {
              setSelectedChapter(newChapter)
              updateVersesForChapter(newChapter, { preventScroll: false })
            })
          }
        } else {
          const newVerse = versesList[closestItem.index]
          if (newVerse && newVerse !== selectedVerse && newVerse !== lastVerseSelectionRef.current) {
            lastVerseSelectionRef.current = newVerse
            requestAnimationFrame(() => {
              setSelectedVerse(newVerse)
              setActiveSection("verse")
            })
          }
        }
      }
    },
    [filteredChapters, selectedChapter, selectedVerse, versesList, updateVersesForChapter, getScrollBehavior],
  )

  const handleChapterScroll = useCallback(
    throttle((event) => {
      if (isProgrammaticScrollRef.current) return

      const container = event.target
      const currentScrollTop = container.scrollTop
      const lastScrollTop = lastScrollTopRef.current.chapter

      scrollDirectionRef.current = currentScrollTop > lastScrollTop ? "down" : "up"
      lastScrollTopRef.current.chapter = currentScrollTop

      isScrollingRef.current = true

      if (chapterScrollTimeoutRef.current) {
        clearTimeout(chapterScrollTimeoutRef.current)
      }

      detectCenterItemSmooth(container, true)

      chapterScrollTimeoutRef.current = setTimeout(() => {
        isScrollingRef.current = false
        detectCenterItemSmooth(container, true)
      }, getScrollBehavior().throttleDelay * 2)
    }, getScrollBehavior().throttleDelay),
    [detectCenterItemSmooth, throttle, getScrollBehavior],
  )

  const handleVerseScroll = useCallback(
    throttle((event) => {
      if (isProgrammaticScrollRef.current) return

      const container = event.target
      const currentScrollTop = container.scrollTop
      const lastScrollTop = lastScrollTopRef.current.verse

      scrollDirectionRef.current = currentScrollTop > lastScrollTop ? "down" : "up"
      lastScrollTopRef.current.verse = currentScrollTop

      isScrollingRef.current = true

      if (verseScrollTimeoutRef.current) {
        clearTimeout(verseScrollTimeoutRef.current)
      }

      detectCenterItemSmooth(container, false)

      verseScrollTimeoutRef.current = setTimeout(() => {
        isScrollingRef.current = false
        detectCenterItemSmooth(container, false)
      }, getScrollBehavior().throttleDelay * 2)
    }, getScrollBehavior().throttleDelay),
    [detectCenterItemSmooth, throttle, getScrollBehavior],
  )

  const setupScrollListeners = useCallback(() => {
    const chapterContainer = chapterListRef.current
    const verseContainer = verseListRef.current

    if (chapterContainer) {
      chapterContainer.addEventListener("scroll", handleChapterScroll, {
        passive: true,
      })

      if (isMobile) {
        chapterContainer.addEventListener("touchmove", handleChapterScroll, {
          passive: true,
        })
      }
    }

    if (verseContainer) {
      verseContainer.addEventListener("scroll", handleVerseScroll, {
        passive: true,
      })

      if (isMobile) {
        verseContainer.addEventListener("touchmove", handleVerseScroll, {
          passive: true,
        })
      }
    }

    return () => {
      if (chapterContainer) {
        chapterContainer.removeEventListener("scroll", handleChapterScroll)
        if (isMobile) {
          chapterContainer.removeEventListener("touchmove", handleChapterScroll)
        }
      }
      if (verseContainer) {
        verseContainer.removeEventListener("scroll", handleVerseScroll)
        if (isMobile) {
          verseContainer.removeEventListener("touchmove", handleVerseScroll)
        }
      }
    }
  }, [handleChapterScroll, handleVerseScroll, isMobile])

  useEffect(() => {
    return setupScrollListeners()
  }, [setupScrollListeners])

  useEffect(() => {
    chapterItemsCache.current = []
  }, [filteredChapters])

  useEffect(() => {
    if (selectedChapter && chapters && !isInitialLoadRef.current) {
      const timeoutDelay = isMobile ? 50 : 20
      setTimeout(() => {
        updateVersesForChapter(selectedChapter, { preventScroll: false })
      }, timeoutDelay)
    }
  }, [selectedChapter, chapters, updateVersesForChapter, isMobile])

  useEffect(() => {
    if (open && searchInputRef.current) {
      setTimeout(() => searchInputRef.current.focus(), 300)
    }
  }, [open])

  useEffect(() => {
    const detectTheme = () => {
      if (userTheme) {
        setCurrentTheme(userTheme)
      } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        setCurrentTheme("dark")
      } else {
        setCurrentTheme("light")
      }
    }

    detectTheme()
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    mediaQuery.addEventListener("change", detectTheme)
    return () => mediaQuery.removeEventListener("change", detectTheme)
  }, [userTheme])

  useEffect(() => {
    const root = document.documentElement
    const colors = getThemeColors()
    root.style.setProperty("--modal-bg", colors.modalBg)
    root.style.setProperty("--content-bg", colors.contentBg)
    root.style.setProperty("--primary-text", colors.primaryText)
    root.style.setProperty("--border-color", colors.borderColor)
    root.style.setProperty("--accent-color", colors.accentColor)
    document.body.classList.remove("light-theme", "dark-theme")
    document.body.classList.add(`${currentTheme}-theme`)
  }, [currentTheme, getThemeColors])

  const scrollToChapter = useCallback(
    (chapterNo) => {
      setSelectedChapter(chapterNo)
      updateVersesForChapter(chapterNo)
    },
    [updateVersesForChapter],
  )

  const scrollToVerse = useCallback((verseNo) => {
    setSelectedVerse(verseNo)
    setActiveSection("verse")
  }, [])

  const router = useRouter()

  const handleGoToVerse = (e) => {
    e?.preventDefault()
    const chapter = chapters?.find((ch) => ch.chapterNo === selectedChapter)
    if (chapter) {
      closeModal()
      const newUrl = `/chapters/${chapter.slug}#verse-${selectedVerse}`
      const currentPath = window.location.pathname
      const targetPath = `/chapters/${chapter.slug}`

      if (currentPath === targetPath) {
        window.location.hash = `verse-${selectedVerse}`
        setTimeout(() => {
          document.dispatchEvent(
            new CustomEvent("forceScrollToVerse", {
              detail: {
                verseNumber: selectedVerse,
                chapterSlug: chapter.slug,
                timestamp: Date.now(),
              },
            }),
          )
        }, 100)
      } else {
        router.push(newUrl)
      }
    }
  }

  useEffect(() => {
    if (open && chapters?.[0]) {
      const pathParts = window.location.pathname.split("/")
      const currentChapterSlug = pathParts[pathParts.length - 1]
      const currentChapter = chapters.find((ch) => ch.slug === currentChapterSlug)

      const initialChapter = currentChapter?.chapterNo || chapters[0].chapterNo
      setSelectedChapter(initialChapter)
      lastChapterSelectionRef.current = initialChapter
      setActiveSection("chapter")

      chapterItemsCache.current = []
      verseItemsCache.current = []

      updateVersesForChapter(initialChapter, { preventScroll: false })

      if (window.location.hash) {
        const verseNumber = Number.parseInt(window.location.hash.replace("#verse-", ""))
        if (!isNaN(verseNumber)) {
          setSelectedVerse(verseNumber)
          lastVerseSelectionRef.current = verseNumber
        }
      }

      isInitialLoadRef.current = false
    } else if (!open) {
      isInitialLoadRef.current = true
      setSearchOpen(false)
      lastChapterSelectionRef.current = null
      lastVerseSelectionRef.current = null
      chapterItemsCache.current = []
      verseItemsCache.current = []
    }
  }, [open, chapters, updateVersesForChapter])

  const handleChapterClick = useCallback(
    (chapterNo) => {
      if (chapterNo === selectedChapter) return

      lastChapterSelectionRef.current = chapterNo
      setSelectedChapter(chapterNo)
      updateVersesForChapter(chapterNo, { preventScroll: false })

      requestAnimationFrame(() => {
        if (chapterListRef.current) {
          const chapterIndex = filteredChapters.findIndex((ch) => ch.chapterNo === chapterNo)
          if (chapterIndex >= 0) {
            centerItem(chapterListRef.current, chapterIndex, true)
          }
        }
        if (verseListRef.current) {
          isProgrammaticScrollRef.current = true
          centerItem(verseListRef.current, 0, false)
        }
      })
    },
    [filteredChapters, updateVersesForChapter, selectedChapter, centerItem],
  )

  const handleVerseClick = useCallback(
    (verseNo) => {
      if (verseNo === selectedVerse) return

      lastVerseSelectionRef.current = verseNo
      setSelectedVerse(verseNo)
      setActiveSection("verse")

      requestAnimationFrame(() => {
        if (verseListRef.current) {
          const verseIndex = versesList.findIndex((v) => v === verseNo)
          if (verseIndex >= 0) {
            centerItem(verseListRef.current, verseIndex, false)
          }
        }
      })
    },
    [selectedVerse, versesList, centerItem],
  )

  const handleSearchOpen = (open) => (event) => {
    if (event?.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return
    }

    if (open) {
      searchInputRef.current.focus()
    } else {
      setSearchQuery("")
    }
    setSearchOpen(open)
  }

  useEffect(() => {
    if (searchOpen && searchQuery !== "" && filteredChapters && filteredChapters.length > 0) {
      const firstFiltered = filteredChapters[0]
      if (firstFiltered && firstFiltered.chapterNo !== selectedChapter) {
        lastChapterSelectionRef.current = firstFiltered.chapterNo
        setSelectedChapter(firstFiltered.chapterNo)
        updateVersesForChapter(firstFiltered.chapterNo, { preventScroll: false })
        setActiveSection("chapter")

        requestAnimationFrame(() => {
          if (chapterListRef.current) {
            centerItem(chapterListRef.current, 0, true)
          }
          if (verseListRef.current) {
            isProgrammaticScrollRef.current = true
            centerItem(verseListRef.current, 0, false)
          }
        })
      }
    }
  }, [searchQuery, filteredChapters, searchOpen, selectedChapter, updateVersesForChapter, centerItem])

  useEffect(() => {
    return () => {
      if (chapterScrollTimeoutRef.current) {
        clearTimeout(chapterScrollTimeoutRef.current)
      }
      if (verseScrollTimeoutRef.current) {
        clearTimeout(verseScrollTimeoutRef.current)
      }
      chapterItemsCache.current = []
      verseItemsCache.current = []
    }
  }, [])

  const themeColors = getThemeColors()
  const selectedChapterData = chapters?.find((ch) => ch.chapterNo === selectedChapter)

  return (
    <>
      <div
        className={`${styles.backdrop} ${backdropVisible && open ? styles.visible : ""}`}
        onClick={closeModal}
        data-testid="backdrop"
      />
      <div className={styles.drawer_container}>
        <div
          className={`${styles.modal} ${open ? styles.open : ""} ${isClosing ? styles.closing : ""}`}
          style={{
            backgroundColor: themeColors.modalBg,
            boxShadow: themeColors.boxShadow,
            border: `1px solid ${themeColors.borderColor}`,
          }}
          data-testid="modal"
          ref={modalRef}
        >
          <div className={styles.title_container}>
            <div className={styles.top}>
              <div className={styles.left}>
                <div className={styles.title}>
                  <h3 className={styles.modal_title} style={{ color: themeColors.primaryText }}>
                    {t("Go To Verse")}
                  </h3>
                  <p className={styles.modal_subtitle} style={{ color: themeColors.secondaryText }}>
                    {t("Select chapter and verse")}
                  </p>
                </div>
              </div>
              <div
                className={searchOpen ? `${styles.search_container} ${styles.open}` : styles.search_container}
                style={{ backgroundColor: themeColors.searchBg }}
              >
                <div className={styles.search_wrapper}>
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder={t("Search Chapter")}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ color: themeColors.primaryText }}
                  />
                  <span className={styles.search_close} onClick={handleSearchOpen(false)}>
                    <CloseIcon />
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.header}>
            <div className={styles.header_row}>
              <div className={styles.header_cell}>Chapters</div>
              <div className={styles.header_cell}>Verses</div>
            </div>
          </div>

          <div className={styles.content_container}>
            <div
              className={`${styles.selection_indicator} ${styles.chapter_indicator}`}
              style={{
                backgroundColor: themeColors.selectionBg,
                borderColor: themeColors.selectionBorder,
              }}
            />
            <div
              className={`${styles.selection_indicator} ${styles.verse_indicator}`}
              style={{
                backgroundColor: themeColors.selectionBg,
                borderColor: themeColors.selectionBorder,
              }}
            />

            <div className={styles.chapter_section} style={{ borderRight: `1px solid ${themeColors.borderColor}` }}>
              <div className={styles.list_container}>
                <div ref={chapterListRef} className={styles.scrollable_list}>
                  {filteredChapters?.map((chapter) => (
                    <div
                      key={chapter.chapterNo}
                      className={`${styles.list_item} ${selectedChapter === chapter.chapterNo ? styles.selected : ""}`}
                      onClick={() => handleChapterClick(chapter.chapterNo)}
                      style={{ color: themeColors.primaryText }}
                    >
                      <div className={styles.chapter_content}>
                        <span className={styles.chapter_number}>{chapter.chapterNo}.</span>
                        <span className={styles.chapter_name}>{chapter.name}</span>
                        <span className={styles.chapter_verses}>{chapter.totalVerse} verses</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className={styles.verse_section}>
              <div className={styles.list_container}>
                <div ref={verseListRef} className={styles.scrollable_list}>
                  {versesList.length > 0 ? (
                    versesList.map((verse) => (
                      <div
                        key={`verse-${verse}`}
                        className={`${styles.list_item} ${selectedVerse === verse ? styles.selected : ""}`}
                        onClick={() => handleVerseClick(verse)}
                        style={{ color: themeColors.primaryText }}
                      >
                        <div className={styles.verse_content}>
                          <span className={styles.verse_number}>{verse}</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className={styles.list_item} style={{ color: themeColors.secondaryText }}>
                      <div className={styles.verse_content}>
                        <span className={styles.verse_number}>
                          {selectedChapterData ? `Select a chapter` : "Loading..."}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className={styles.footer} style={{ borderTop: `1px solid ${themeColors.borderColor}` }}>
            <div className={styles.selected_info}>
              {selectedChapterData && (
                <span className={styles.info_text} style={{ color: themeColors.primaryText }}>
                  {selectedChapterData.name} - Verse {selectedVerse}
                  {versesList.length > 0 && ` (of ${versesList.length})`}
                </span>
              )}
            </div>
            <Button
              variant="contained"
              endIcon={<SendIcon />}
              onClick={handleGoToVerse}
              disabled={!selectedChapterData || versesList.length === 0}
              className={styles.btn}
              disableElevation
            >
              {t("Go To")}
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
