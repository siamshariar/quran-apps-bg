"use client"

import { memo, useCallback, useContext, useEffect, useRef, useState } from "react"
import { useRouter } from "next/router"
import { Virtuoso } from "react-virtuoso"
import Skeleton from "react-loading-skeleton"
import { AudioPlayerContext } from "../../../contexts/AudioPlayerContext"
import VerseCard from "../../surah/verse-card"
import Pagination from "../../surah/pagination"
import Bismillah from "../../icons/Bismillah"
import styles from "./content.module.scss"
import { config, isFirstTranslation, buildChapterUrl } from "../../../lib/config"
import { SettingsContext } from "../../../contexts/SettingsContext"
import { t } from "../../../lib/config"

const MemoizedVerseCard = memo(VerseCard)
const MemoizedBismillah = memo(Bismillah)
const MemoizedPagination = memo(Pagination)

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

export default function ChapterContent({
  contentType,
  contentTitle,
  chapters,
  chapterNo,
  chapterName,
  chapterSlug,
  chapterMp3Url,
  verses,
  allTranslations,
  loading,
  currentTranslation, // Translation from URL (for dynamic routes)
  availableTranslations: propsAvailableTranslations,
}) {
  const printRef = useRef(null)
  const { 
    translation: contextTranslation, 
    activeTranslations = [],
    fontSizeArabic,
    fontSizeTranslation,
    fontFamilyArabic,
    fontFamilyTranslation,
  } = useContext(SettingsContext)
  const { setPlaylist, setChapterMp3Url, playing, play, pause, audioType } = useContext(AudioPlayerContext)
  
  // Use currentTranslation from props if available (from URL), otherwise use context
  const translation = currentTranslation || contextTranslation
  const activeTranslationsList = activeTranslations.length > 0 ? activeTranslations : [translation]
  
  // Better fallback logic for currentVerses
  // If translation exists in allTranslations, use it; otherwise use verses prop
  const currentVerses = (allTranslations && translation && allTranslations[translation]) 
    ? allTranslations[translation] 
    : verses
  
  const [modalOpen, setModalOpen] = useState(false)
  const [modalTitle, setModalTitle] = useState(null)
  const [modalContent, setModalContent] = useState(null)
  const [expandedSetting, setExpandedSetting] = useState(null)
  const [showMultiTranslationModal, setShowMultiTranslationModal] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  
  // Use dynamic first translation check instead of hardcoded vietnamese_hassan
  const translationPrefix = isFirstTranslation(translation) ? "" : `/${translation}`
  
  const lastScrolledVerseRef = useRef(null)
  
  // Calculate shouldShowLoading before useEffects
  // Safety check: if we have verses, don't show loading
  // Show loading ONLY if loading prop is true AND we have no data
  const shouldShowLoading = loading && (!currentVerses || currentVerses.length === 0)
  
  // Emergency fallback - if we have verses but shouldShowLoading is true, force it to false
  const finalShouldShowLoading = shouldShowLoading && (!verses || verses.length === 0)

  // Apply font styles when verses or settings change
  useEffect(() => {
    if (typeof window === 'undefined') return
    
    console.log(`🔍 Font Style Effect Triggered: Arabic=${fontSizeArabic}px, Translation=${fontSizeTranslation}px`)
    
    // Wait a bit for DOM to update after verses change
    const applyFontStyles = () => {
      const elemsArabic = document.querySelectorAll('.text_arabic')
      const elemsTrans = document.querySelectorAll('.text_trans')

      if (elemsArabic.length === 0 && elemsTrans.length === 0) {
        console.log('⏳ No text elements found yet, will retry...')
        return
      }

      elemsArabic.forEach((elem) => {
        if (fontSizeArabic) {
          elem.style.fontSize = fontSizeArabic + 'px'
        }
        if (fontFamilyArabic) {
          elem.style.fontFamily = fontFamilyArabic
        }
      })

      elemsTrans.forEach((elem) => {
        if (fontSizeTranslation) {
          elem.style.fontSize = fontSizeTranslation + 'px'
        }
        if (fontFamilyTranslation) {
          elem.style.fontFamily = fontFamilyTranslation
        }
      })

      console.log(`✅ Applied font styles to ${elemsArabic.length} Arabic + ${elemsTrans.length} Translation elements: Arabic=${fontSizeArabic}px, Translation=${fontSizeTranslation}px`)
    }

    // Apply multiple times with increasing delays to ensure all DOM updates are caught
    applyFontStyles()
    const timeout1 = setTimeout(applyFontStyles, 100)
    const timeout2 = setTimeout(applyFontStyles, 300)
    const timeout3 = setTimeout(applyFontStyles, 500)

    return () => {
      clearTimeout(timeout1)
      clearTimeout(timeout2)
      clearTimeout(timeout3)
    }
  }, [currentVerses, fontSizeArabic, fontSizeTranslation, fontFamilyArabic, fontFamilyTranslation])

  // Debug logging
  useEffect(() => {
    console.log("=== CHAPTER CONTENT DEBUG ===")
    console.log("Translation from context:", translation)
    console.log("Available translations in allTranslations:", allTranslations ? Object.keys(allTranslations) : 'NONE')
    console.log("Verses prop:", verses ? `${verses.length} verses` : 'NO VERSES')
    console.log("Current verses (computed):", currentVerses ? `${currentVerses.length} verses` : 'NO CURRENT VERSES')
    console.log("Loading prop:", loading)
    console.log("Should show loading:", shouldShowLoading)
    console.log("Final should show loading:", finalShouldShowLoading)
    
    // Critical check
    if (!currentVerses || currentVerses.length === 0) {
      console.error("⚠️ CRITICAL: No verses to display!")
      console.error("Translation:", translation)
      console.error("AllTranslations keys:", allTranslations ? Object.keys(allTranslations) : 'null')
      console.error("Verses prop:", verses ? `${verses.length} items` : 'null')
    }
    console.log("============================")
  }, [translation, allTranslations, verses, currentVerses, loading, shouldShowLoading, finalShouldShowLoading])

  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 1024
      setIsMobile(mobile)
      console.log("Screen size check:", { width: window.innerWidth, isMobile: mobile })
    }
    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)
    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  const scrollToVerse = useCallback((verseNumber, behavior = "smooth") => {
    if (!virtuosoRef.current || !verseNumber) return
    const verseIndex = verseNumber - 1
    if (lastScrolledVerseRef.current === verseNumber) return
    lastScrolledVerseRef.current = verseNumber
    virtuosoRef.current.scrollToIndex({
      index: verseIndex,
      align: "start",
      behavior: behavior === "smooth" ? "smooth" : "auto",
    })
    setTimeout(
      () => {
        const verseElement = document.getElementById(`verse-${verseNumber}`)
        if (verseElement) {
          verseElement.scrollIntoView({
            behavior: behavior,
            block: "start",
            inline: "nearest",
          })
        }
      },
      behavior === "smooth" ? 100 : 0,
    )
  }, [])

  useEffect(() => {
    const handleForceScrollToVerse = (event) => {
      const { verseNumber, chapterSlug: targetChapterSlug, timestamp } = event.detail
      if (targetChapterSlug === chapterSlug && verseNumber) {
        lastScrolledVerseRef.current = null
        setTimeout(() => {
          scrollToVerse(verseNumber, "auto")
        }, 50)
      }
    }
    document.addEventListener("forceScrollToVerse", handleForceScrollToVerse)
    return () => {
      document.removeEventListener("forceScrollToVerse", handleForceScrollToVerse)
    }
  }, [chapterSlug, scrollToVerse])

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

  useEffect(() => {
    const filtered = []
    verses.forEach((verse) => {
      filtered.push(verse.mp3Url)
    })
    setPlaylist(filtered)
    setChapterMp3Url(chapterMp3Url)
  }, [])

  const [prev, setPrev] = useState(
    contentType === "chapter" && chapters[chapterNo - 2]
      ? {
          link: `${translationPrefix}/chapters/${chapters[chapterNo - 2].slug}`,
          name: chapters[chapterNo - 2].name,
        }
      : contentType === "verse" && Number(verses[0].verseNo) > 1
        ? {
            link: `${translationPrefix}/chapters/${chapters[chapterNo - 1].slug}/verses/${
              Number(verses[0].verseNo) - 1
            }`,
            name: "Prev verse",
          }
        : contentType === "verse" && Number(verses[0].verseNo) == 1 && chapterNo > 1
          ? {
              link: `${translationPrefix}/chapters/${chapters[chapterNo - 2].slug}/verses/1`,
              name: "Prev chapter",
            }
          : null,
  )

  const [next, setNext] = useState(
    contentType === "chapter" && chapters[chapterNo]
      ? {
          link: `${translationPrefix}/chapters/${chapters[chapterNo].slug}`,
          name: chapters[chapterNo].name,
        }
      : contentType === "verse" && Number(verses[0].verseNo) < chapters[chapterNo - 1].totalVerse
        ? {
            link: `${translationPrefix}/chapters/${chapters[chapterNo - 1].slug}/verses/${
              Number(verses[0].verseNo) + 1
            }`,
            name: "Next verse",
          }
        : contentType === "verse" &&
            Number(verses[0].verseNo) == chapters[chapterNo - 1].totalVerse &&
            chapterNo < chapters.length
          ? {
              link: `${translationPrefix}/chapters/${chapters[chapterNo].slug}/verses/1`,
              name: "Next chapter",
            }
          : null,
  )

  useEffect(() => {
    if (contentType === "chapter" && chapters[chapterNo - 2]) {
      setPrev({
        link: buildChapterUrl(chapters[chapterNo - 2].slug, translation),
        name: chapters[chapterNo - 2].name,
      })
    } else if (contentType === "verse" && Number(verses[0]?.verseNo) > 1) {
      setPrev({
        link: isFirstTranslation(translation)
            ? `/chapters/${chapters[chapterNo - 1].slug}/verses/${Number(verses[0].verseNo) - 1}`
            : `/${translation}/chapters/${chapters[chapterNo - 1].slug}/verses/${Number(verses[0].verseNo) - 1}`,
        name: "Prev verse",
      })
    } else if (contentType === "verse" && Number(verses[0]?.verseNo) == 1 && chapterNo > 1) {
      setPrev({
        link: isFirstTranslation(translation)
            ? `/chapters/${chapters[chapterNo - 2].slug}/verses/1`
            : `/${translation}/chapters/${chapters[chapterNo - 2].slug}/verses/1`,
        name: "Prev chapter",
      })
    }
    if (contentType === "chapter" && chapters[chapterNo]) {
      setNext({
        link: buildChapterUrl(chapters[chapterNo].slug, translation),
        name: chapters[chapterNo].name,
      })
    } else if (contentType === "verse" && Number(verses[0]?.verseNo) < chapters[chapterNo - 1]?.totalVerse) {
      setNext({
        link: isFirstTranslation(translation)
            ? `/chapters/${chapters[chapterNo - 1].slug}/verses/${Number(verses[0].verseNo) + 1}`
            : `/${translation}/chapters/${chapters[chapterNo - 1].slug}/verses/${Number(verses[0].verseNo) + 1}`,
        name: "Next verse",
      })
    } else if (
      contentType === "verse" &&
      Number(verses[0]?.verseNo) == chapters[chapterNo - 1]?.totalVerse &&
      chapterNo < chapters.length
    ) {
      setNext({
        link: isFirstTranslation(translation)
            ? `/chapters/${chapters[chapterNo].slug}/verses/1`
            : `/${translation}/chapters/${chapters[chapterNo].slug}/verses/1`,
        name: "Next chapter",
      })
    }
  }, [translation, contentType, chapterNo, verses])

  const playingThisChapter = playing && audioType === "chapter"

  const controlPlay = () => {
    play(0, "chapter")
  }

  const controlPause = () => {
    pause()
  }

  // prev next on key press or left right drag
  const router = useRouter()
  const [isKeyPressUp, setIsKeyPressUp] = useState(false)
  const [keyPressType, setKeyPressType] = useState(null)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const [isTouchEnd, setIsTouchEnd] = useState(false)
  const [didMount, setDidMount] = useState(false)

  useEffect(() => {
    const filtered = currentVerses?.map((verse) => verse.mp3Url) || []
    setPlaylist(filtered)
    setChapterMp3Url(chapterMp3Url)
    if (contentType === "verse") {
      document.addEventListener("keydown", (event) => {
        if (event.key == "ArrowRight" && next !== null) {
          setIsKeyPressUp(false)
          setKeyPressType("right")
        } else if (event.key == "ArrowLeft" && prev !== null) {
          setIsKeyPressUp(false)
          setKeyPressType("left")
        }
      })
      document.addEventListener("keyup", (event) => {
        if ((event.key == "ArrowRight" && next !== null) || (event.key == "ArrowLeft" && prev !== null)) {
          setIsKeyPressUp(true)
        }
      })
      document.body.addEventListener("touchstart", (e) => {
        setTouchStart(e.targetTouches[0].clientX)
        setIsTouchEnd(false)
      })
      document.body.addEventListener("touchend", (e) => {
        setTouchEnd(e.changedTouches[0].clientX)
        setIsTouchEnd(true)
      })
    }
    return () => setDidMount(true)
  }, [])

  useEffect(() => {
    if (isKeyPressUp) {
      if (keyPressType == "left" && prev !== null) {
        router.push(prev.link)
      } else if (keyPressType == "right" && next !== null) {
        router.push(next.link)
      }
    }
  }, [isKeyPressUp])

  useEffect(() => {
    if (isTouchEnd) {
      if (touchEnd - touchStart > 150 && prev !== null) {
        router.push(prev.link)
      } else if (touchStart - touchEnd > 150 && next !== null) {
        router.push(next.link)
      }
    }
  }, [isTouchEnd])

  const virtuosoRef = useRef(null)

  const scrollToIndex = (index) => {
    virtuosoRef.current?.scrollToIndex({
      index: index,
      align: "start",
      behavior: "smooth",
    })
  }

  const getIndexFromHash = () => {
    const hashIndex = Number.parseInt(window.location.hash.replace("#verse-", ""), 10)
    return isNaN(hashIndex) ? null : hashIndex - 1
  }

  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash && !loading) {
      const verseNumber = Number.parseInt(window.location.hash.replace("#verse-", ""), 10)
      if (!isNaN(verseNumber)) {
        lastScrolledVerseRef.current = null
        const scrollAttempts = [0, 100, 300, 500]
        scrollAttempts.forEach((delay) => {
          setTimeout(() => {
            scrollToVerse(verseNumber, "auto")
          }, delay)
        })
      }
    }
  }, [router.asPath, loading, scrollToVerse])

  useEffect(() => {
    const handleRouteChange = () => {
      if (typeof window !== "undefined" && window.location.hash) {
        const verseNumber = Number.parseInt(window.location.hash.replace("#verse-", ""), 10)
        if (!isNaN(verseNumber)) {
          lastScrolledVerseRef.current = null
          setTimeout(() => {
            scrollToVerse(verseNumber, "auto")
          }, 100)
        }
      }
    }
    router.events.on("routeChangeComplete", handleRouteChange)
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange)
    }
  }, [router.events, scrollToVerse])

  const openSettings = useCallback(() => {
    if (isMobile) {
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
      console.log("Dispatching openSidenavSettings event for desktop")
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

  useEffect(() => {
    const handleScrollPosition = () => {
      if (typeof window !== "undefined" && window.location.hash) {
        const hashIndex = Number.parseInt(window.location.hash.replace("#verse-", ""), 10)
        if (!isNaN(hashIndex)) {
          requestAnimationFrame(() => {
            virtuosoRef.current?.scrollToIndex({
              index: hashIndex - 1,
              align: "start",
              behavior: "instant",
            })
          })
        }
      }
    }
    const timer = setTimeout(handleScrollPosition, 0)
    return () => clearTimeout(timer)
  }, [])

  const renderVerse = useCallback(
    (index) => {
      const verse = currentVerses[index]
      const verseTranslations = {}

      // Always include transliteration data if available
      if (allTranslations && allTranslations["english_transliteration"]) {
        verseTranslations["english_transliteration"] = allTranslations["english_transliteration"][index]
        console.log(`Passing transliteration for verse ${index + 1}:`, verseTranslations["english_transliteration"])
      }

      if (activeTranslationsList && activeTranslationsList.length > 0) {
        activeTranslationsList.forEach((translationCode) => {
          if (allTranslations && allTranslations[translationCode] && allTranslations[translationCode][index]) {
            verseTranslations[translationCode] = allTranslations[translationCode][index]
          }
        })
      }

      return (
        <MemoizedVerseCard
          key={`${translation}-${verse.verseNo}`}
          chapterName={chapterName}
          index={index}
          chapterNo={chapterNo}
          chapterSlug={chapterSlug}
          verse={verse}
          ayaArabic={verse.arabic}
          printRef={printRef.current}
          isVirtualized={true}
          isLastVerse={index === currentVerses.length - 1}
          translation={translation}
          allTranslations={verseTranslations}
          activeTranslations={activeTranslationsList}
        />
      )
    },
    [chapterName, chapterNo, chapterSlug, currentVerses, translation, activeTranslationsList, allTranslations],
  )

  const availableTranslations = allTranslations ? Object.keys(allTranslations) : []
  
  console.log("🔍 Render check:", { 
    loadingProp: loading, 
    hasCurrentVerses: !!currentVerses, 
    currentVersesLength: currentVerses?.length,
    shouldShowLoading,
    finalShouldShowLoading,
    translation,
    allTranslationsKeys: allTranslations ? Object.keys(allTranslations) : []
  })
  
  if (shouldShowLoading !== finalShouldShowLoading) {
    console.warn("⚠️ Loading state override:", {
      shouldShowLoading,
      finalShouldShowLoading,
      reason: "Have verses prop but loading was true"
    })
  }

  return (
    <div className={styles.chapter}>
      <div className={styles.chapter_tab} ref={printRef}>
        {finalShouldShowLoading ? (
          <>
            <Skeleton style={{ marginBottom: "24px" }} count={1} height={49} width={`100%`} className="skeleton" />
            <Skeleton count={7} height={150} width={`100%`} className="skeleton" />
            <Skeleton style={{ marginTop: "32px" }} count={1} height={64} width={`100%`} className="skeleton" />
          </>
        ) : (
          <>
            <div className={styles.title}>
              <span className={styles.title_text}>{contentTitle}</span>
            </div>
            <div className={styles.change_translation}>
              <div className={styles.translation_info}>
                <p>{t("Translation by")}</p>
                <p>
                  {getTranslatorName(translation)}{" "}
                  <span className={styles.change_link} onClick={openSettings}>
                    ({t("Change")})
                  </span>
                </p>
              </div>
            </div>
            {contentType !== "verse" && (
              <div className={styles.bismillah}>
                <MemoizedBismillah />
              </div>
            )}
            <div className={styles.verses}>
              <Virtuoso
                ref={virtuosoRef}
                useWindowScroll
                totalCount={currentVerses?.length || 0}
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
            </div>
            <div className={styles.print_footer}>
              <span>{getTranslatorName(translation)}</span>
              <span>www.{config.domain}</span>
            </div>
          </>
        )}
      </div>
      {!finalShouldShowLoading && (
        <MemoizedPagination
          prev={prev}
          next={next}
          contentType={contentType}
          chapterSlug={chapterSlug}
          verseNo={currentVerses?.[0]?.verseNo}
          translation={translation}
        />
      )}
    </div>
  )
}
