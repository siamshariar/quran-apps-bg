"use client"
import { useState, useEffect, useContext, useRef, memo, useCallback } from "react"
import { useRouter } from "next/router"
import { Virtuoso } from "react-virtuoso"
import Skeleton from "react-loading-skeleton"
import { SettingsContext } from "../../../contexts/SettingsContext"
import { getChaptersInfo, getMultipleTranslations } from "../../../lib/fetch"
import { t } from "../../../lib/config"
import Layout from "../../../components/layouts/layout-chapter"
import Meta from "../../../components/core/meta"
import MultiTranslationSelectionModal from "../../../components/modal/multi-translation-modal"
import VerseOptions from "../../../components/surah/verse-options"
import Pagination from "../../../components/surah/multi-translation-pagination"
import { IconButton } from "@mui/material"
import ChevronUp from "../../../components/icons/ChevronUp"
import ChevronDown from "../../../components/icons/ChevronDown"
import Accordion from "@mui/material/Accordion"
import AccordionDetails from "@mui/material/AccordionDetails"
import AccordionSummary from "@mui/material/AccordionSummary"
import Bismillah from "../../../components/icons/Bismillah"
import SearchIcon from "../../../components/icons/Search"
import ChevronRightIcon from "../../../components/icons/ChevronRight"
import CloseIcon from "../../../components/icons/Close"
import Scrollbar from "../../../components/core/scrollbar"
import { saveMultiTranslationChapter } from "../../../lib/multi-translation-storage"
import styles from "./multi-translation.module.scss"

const MemoizedBismillah = memo(Bismillah)
const MemoizedPagination = memo(Pagination)

export default function MultiTranslationChapterPage({
  chapters,
  chapterNo,
  chapterName,
  chapterSlug,
  contentType = "chapter",
}) {
  const router = useRouter()
  const { selectedTranslations = ["vietnamese_hassan"], view } = useContext(SettingsContext)
  const [verses, setVerses] = useState([])
  const [currentChapter, setCurrentChapter] = useState(chapterNo)
  const [currentChapterName, setCurrentChapterName] = useState(
    chapterName || (chapters && chapters[chapterNo - 1]?.name) || `Chapter ${chapterNo}`,
  )
  const [currentChapterSlug, setCurrentChapterSlug] = useState(
    chapterSlug || (chapters && chapters[chapterNo - 1]?.slug) || `${chapterNo}-chapter-${chapterNo}`,
  )
  const [loading, setLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [allTranslations, setAllTranslations] = useState({})
  const [lastUpdateTime, setLastUpdateTime] = useState(Date.now())
  const [isChapterListOpen, setIsChapterListOpen] = useState(false)
  const [isChapterListClosing, setIsChapterListClosing] = useState(false)
  const [expanded, setExpanded] = useState(true)
  const [filteredChapters, setFilteredChapters] = useState(chapters || [])
  const [searchOpen, setSearchOpen] = useState(false)
  const [fetchError, setFetchError] = useState(null)
  const virtuosoRef = useRef(null)
  const printRef = useRef(null)
  const chapterSearchInputRef = useRef(null)
  const [prev, setPrev] = useState(null)
  const [next, setNext] = useState(null)
  const [prevSelectedTranslations, setPrevSelectedTranslations] = useState(selectedTranslations)
  const [modalTranslationsChanged, setModalTranslationsChanged] = useState(false)

  useEffect(() => {
    if (currentChapter && currentChapterName && currentChapterSlug) {
      saveMultiTranslationChapter({
        chapterNo: currentChapter,
        name: currentChapterName,
        slug: currentChapterSlug,
      })
    }
  }, [currentChapter, currentChapterName, currentChapterSlug])

  const updateChapterFromRoute = useCallback(() => {
    const slug = router.query.slug
    if (slug && chapters) {
      const newChapterNo = Number.parseInt(slug.split("-")[0])
      if (!isNaN(newChapterNo) && newChapterNo >= 1 && newChapterNo <= chapters.length) {
        const chapterInfo = chapters[newChapterNo - 1]
        if (chapterInfo) {
          setCurrentChapter(newChapterNo)
          setCurrentChapterName(chapterInfo.name || `Chapter ${newChapterNo}`)
          setCurrentChapterSlug(chapterInfo.slug || `${newChapterNo}-chapter-${newChapterNo}`)
        }
      }
    }
  }, [router.query.slug, chapters])

  useEffect(() => {
    updateChapterFromRoute()
  }, [updateChapterFromRoute])

  useEffect(() => {
    const handleRouteChangeComplete = (url) => {
      if (url.includes("/multi-translation/chapters/")) {
        updateChapterFromRoute()
      }
    }
    router.events.on("routeChangeComplete", handleRouteChangeComplete)
    return () => {
      router.events.off("routeChangeComplete", handleRouteChangeComplete)
    }
  }, [router, updateChapterFromRoute])

  const controlAccordion = useCallback(() => {
    setExpanded(!expanded)
  }, [expanded])

  const fetchVerses = useCallback(async (chapterNumber, translations) => {
    if (!translations || translations.length === 0) {
      setIsModalOpen(true)
      return
    }
    setLoading(true)
    setFetchError(null)
    try {
      const translationsData = await getMultipleTranslations(chapterNumber, translations)
      const successfulTranslations = Object.keys(translationsData)
      if (successfulTranslations.length === 0) {
        throw new Error("No translations could be loaded")
      }
      let primaryVerses = []
      const newAllTranslations = {}
      translations.forEach((translationCode) => {
        if (translationsData[translationCode]) {
          const versesWithFootnotes = translationsData[translationCode].map((verse) => ({
            ...verse,
            footnote: verse.footnote || verse.footnotes || "",
          }))
          newAllTranslations[translationCode] = versesWithFootnotes
          if (primaryVerses.length === 0) {
            primaryVerses = versesWithFootnotes
          }
        }
      })
      if (Object.keys(newAllTranslations).length > 0) {
        setAllTranslations(newAllTranslations)
        setVerses(primaryVerses)
        setLastUpdateTime(Date.now())
        if (Object.keys(newAllTranslations).length < translations.length) {
          const failedTranslations = translations.filter((t) => !newAllTranslations[t])
          console.warn("Some translations failed to load:", failedTranslations)
          setFetchError(`Some translations could not be loaded: ${failedTranslations.join(", ")}`)
        }
      } else {
        throw new Error("All translations failed to load")
      }
    } catch (error) {
      console.error("Error fetching verses:", error)
      setFetchError(error.message)
      const fallbackVerses = createFallbackVerses(chapterNumber)
      setVerses(fallbackVerses)
      const fallbackTranslations = {}
      translations.forEach((translationCode) => {
        fallbackTranslations[translationCode] = fallbackVerses
      })
      setAllTranslations(fallbackTranslations)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (selectedTranslations.length > 0 && currentChapter) {
      setPrevSelectedTranslations(selectedTranslations)
      fetchVerses(currentChapter, selectedTranslations)
    } else {
      setIsModalOpen(true)
    }
  }, [currentChapter, selectedTranslations, fetchVerses])

  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash && virtuosoRef.current && !loading) {
      const hashIndex = getIndexFromHash()
      if (hashIndex !== null) {
        scrollToIndex(hashIndex)
      }
    }
  }, [router, loading])

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
    if (contentType === "chapter" && chapters && chapters.length > 0) {
      if (currentChapter > 1) {
        const prevChapter = chapters[currentChapter - 2]
        setPrev({
          link: `/multi-translation/chapters/${prevChapter?.slug || `${currentChapter - 1}-chapter-${currentChapter - 1}`}`,
          name: prevChapter?.name || `Chapter ${currentChapter - 1}`,
        })
      } else {
        setPrev(null)
      }
      if (currentChapter < chapters.length) {
        const nextChapter = chapters[currentChapter]
        setNext({
          link: `/multi-translation/chapters/${nextChapter?.slug || `${currentChapter + 1}-chapter-${currentChapter + 1}`}`,
          name: nextChapter?.name || `Chapter ${currentChapter + 1}`,
        })
      } else {
        setNext(null)
      }
    }
  }, [currentChapter, chapters, contentType])

  const getIndexFromHash = () => {
    const hashIndex = Number.parseInt(window.location.hash.replace("#verse-", ""), 10)
    return isNaN(hashIndex) ? null : hashIndex - 1
  }

  const scrollToIndex = (index) => {
    virtuosoRef.current?.scrollToIndex({
      index: index,
      align: "start",
      behavior: "smooth",
    })
  }

  const createFallbackVerses = (chapterNumber) => {
    const fallbackVerses = []
    const verseCount = chapterNumber === 1 ? 7 : 10
    for (let i = 1; i <= verseCount; i++) {
      fallbackVerses.push({
        verseNo: i,
        arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
        translation: `Verse ${i} - Translation not available. Please check your internet connection or try again later.`,
        footnote: "",
      })
    }
    return fallbackVerses
  }

  const handleChapterChange = useCallback(
    (newChapter) => {
      if (newChapter === currentChapter) return
      const targetChapter = chapters[newChapter - 1]
      const targetSlug = targetChapter?.slug || `${newChapter}-chapter-${newChapter}`
      const targetName = targetChapter?.name || `Chapter ${newChapter}`
      setCurrentChapter(newChapter)
      setCurrentChapterName(targetName)
      setCurrentChapterSlug(targetSlug)
      setIsChapterListOpen(false)
      setFetchError(null)
      router.push(`/multi-translation/chapters/${targetSlug}`, undefined, { shallow: true })
    },
    [currentChapter, chapters, router],
  )

  const handleOpenModal = useCallback(() => {
    setIsModalOpen(true)
    setPrevSelectedTranslations(selectedTranslations)
    setModalTranslationsChanged(false)
  }, [selectedTranslations])

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false)
    // Check if translations changed and call API
    const translationsChanged = JSON.stringify(prevSelectedTranslations) !== JSON.stringify(selectedTranslations)
    if (translationsChanged && selectedTranslations.length > 0) {
      setModalTranslationsChanged(true)
      fetchVerses(currentChapter, selectedTranslations)
    }
  }, [selectedTranslations, currentChapter, fetchVerses, prevSelectedTranslations])

  const handleOpenChapterList = useCallback(() => {
    setIsChapterListOpen(true)
    setIsChapterListClosing(false)
    setFilteredChapters(chapters || [])
    setSearchOpen(false)
  }, [chapters])

  const handleCloseChapterList = useCallback(
    (event) => {
      if (event) {
        event.preventDefault()
        event.stopPropagation()
      }
      if (isChapterListClosing) return
      setIsChapterListClosing(true)
      setTimeout(() => {
        setIsChapterListOpen(false)
        setIsChapterListClosing(false)
        setSearchOpen(false)
        if (chapterSearchInputRef.current) {
          chapterSearchInputRef.current.value = ""
        }
      }, 300)
    },
    [isChapterListClosing],
  )

  const handleChapterSearchOpen = (open) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return
    }
    if (open) {
      chapterSearchInputRef.current?.focus()
    } else {
      setFilteredChapters(chapters || [])
      if (chapterSearchInputRef.current) {
        chapterSearchInputRef.current.value = ""
      }
    }
    setSearchOpen(open)
  }

  const filterChapters = (search) => {
    if (!search.trim()) {
      setFilteredChapters(chapters || [])
      return
    }
    const filtered = chapters.filter(
      (chapter) =>
        chapter.name.toLowerCase().includes(search.toLowerCase()) || chapter.chapterNo.toString().includes(search),
    )
    setFilteredChapters(filtered)
  }

  const getTranslatorName = useCallback((translationCode) => {
    const translationMap = {
      vietnamese_hassan: "Hasan Abdul-Karim",
      vietnamese_rwwad: "Ruwwad Translation Center",
      english_abdel_haleem: "M.A.S. Abdel Haleem",
      english_mustafa_khattab: "Dr. Mustafa Khattab",
      english_usmani: "T. Usmani",
      english_maududi: "A. Maududi",
      english_pickthall: "M. Pickthall",
      english_yusuf_ali: "A. Yusuf Ali",
      english_saheeh: "Saheeh International",
      english_hilali_khan: "Al-Hilali & Khan",
      english_transliteration: "Transliteration",
    }
    return translationMap[translationCode] || translationCode
  }, [])

  const getTranslationAttributionText = useCallback(() => {
    if (selectedTranslations.length === 0) return ""
    if (selectedTranslations.length === 1) {
      return getTranslatorName(selectedTranslations[0])
    }
    if (selectedTranslations.length === 2) {
      return `${getTranslatorName(selectedTranslations[0])} ${t("and")} ${getTranslatorName(selectedTranslations[1])}`
    }
    const othersCount = selectedTranslations.length - 1
    return `${getTranslatorName(selectedTranslations[0])}, ${t("and")} ${othersCount} ${t("others")}`
  }, [selectedTranslations, getTranslatorName, t])

  const renderVerse = useCallback(
    (index) => {
      const verse = verses[index]
      if (!verse) return null
      const verseNumber = verse.verseNo || index + 1
      return (
        <div key={`verse-${verseNumber}`} id={`verse-${verseNumber}`} className={styles.verseWrapper}>
          <VerseOptions
            index={index}
            verseNumber={verseNumber}
            chapterNumber={currentChapter}
            chapterName={currentChapterName}
            chapterSlug={currentChapterSlug}
            ayaArabic={verse.arabic}
            translation={verse.translation}
            footnotes={verse.footnote}
          />
          {view.arabic && verse.arabic && (
            <div className={styles.verseArabic}>
              <div className={`${styles.verseText} text_arabic`}>{verse.arabic}</div>
            </div>
          )}
          {view.translation && (
            <div className={styles.translationsSection}>
              {selectedTranslations.map((translationCode, translationIndex) => {
                const translationVerse = allTranslations[translationCode]?.[index]
                const translationText = translationVerse?.translation || ""
                const footnote = translationVerse?.footnote || ""
                const shouldShowFootnote =
                  translationCode === "vietnamese_hassan" && view.tafseer && footnote && footnote !== ""
                if (!translationText) return null
                return (
                  <div key={`${translationCode}-${verseNumber}`} className={styles.translationBlock}>
                    {translationIndex > 0 && <hr className={styles.translationSeparator} />}
                    <div className={styles.verseTranslation}>
                      <div className={`${styles.verseText} text_trans`}>{translationText}</div>
                      <div className={styles.translatorName}>— {getTranslatorName(translationCode)}</div>
                    </div>
                    {shouldShowFootnote && (
                      <Accordion className={styles.accordion} expanded={expanded} onChange={controlAccordion}>
                        <AccordionSummary className={styles.accordion_summary}>
                          <div className={styles.summary_text}>Footnotes</div>
                          <div className={styles.summary_icon}>
                            <IconButton className={styles.btn}>
                              <span className={!expanded ? styles.none : styles.icon}>
                                <ChevronUp />
                              </span>
                              <span className={expanded ? styles.none : styles.icon}>
                                <ChevronDown />
                              </span>
                            </IconButton>
                          </div>
                        </AccordionSummary>
                        <AccordionDetails className={styles.accordion_details}>
                          {Array.isArray(footnote) ? (
                            footnote.map((fn, i) => (
                              <p key={i} className={`${styles.verse_text} text_trans`}>
                                {fn}
                              </p>
                            ))
                          ) : (
                            <p className={`${styles.verse_text} text_trans`}>{footnote}</p>
                          )}
                        </AccordionDetails>
                      </Accordion>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )
    },
    [
      verses,
      allTranslations,
      selectedTranslations,
      currentChapter,
      currentChapterName,
      currentChapterSlug,
      view,
      expanded,
      controlAccordion,
      getTranslatorName,
    ],
  )

  return (
    <>
      <Meta
        title={`${t("Multi-Translation")} - ${currentChapterName}`}
        description={`${currentChapterName} in multiple translations`}
      />
      <div className={styles.chapter}>
        <div className={styles.chapter_tab}>
          <div className={styles.container}>
            <div className={styles.content} ref={printRef}>
              <div className={styles.header}>
                <div className={styles.headerLeft}>
                  <div className={styles.iconWrapper}>
                    <svg className={styles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                      />
                    </svg>
                  </div>
                  <div className={styles.headerText}>
                    <h1 className={styles.title}>{t("Multi-Translation")}</h1>
                    <p className={styles.subtitle}>
                      {currentChapterName} - {t("Multiple Translations")}
                    </p>
                  </div>
                </div>
              </div>
              {/* Error message display */}
              {fetchError && (
                <div className={styles.errorMessage}>
                  <div className={styles.errorContent}>
                    <span className={styles.errorIcon}>⚠️</span>
                    <span className={styles.errorText}>{fetchError}</span>
                    <button
                      className={styles.retryButton}
                      onClick={() => fetchVerses(currentChapter, selectedTranslations)}
                    >
                      Retry
                    </button>
                  </div>
                </div>
              )}
              <div className={styles.webFlexContainer}>
                <div className={styles.leftSection}>
                  {selectedTranslations.length > 0 ? (
                    <div className={styles.translationAttribution}>
                      <div>Translation by</div>
                      <span className={styles.translationNames}>{getTranslationAttributionText()}</span>
                      <span
                        className={styles.changeLink}
                        onClick={handleOpenModal}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault()
                            handleOpenModal()
                          }
                        }}
                      >
                        (Change)
                      </span>
                    </div>
                  ) : (
                    <div className={styles.emptyState}>
                      <div className={styles.emptyStateContent}>
                        <svg className={styles.emptyStateIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                          />
                        </svg>
                        <h3 className={styles.emptyStateTitle}>{t("No Translations Selected")}</h3>
                        <p className={styles.emptyStateText}>{t("Please select translations to view verses")}</p>
                        <button onClick={handleOpenModal} className={styles.emptyStateButton}>
                          {t("Select Translations")}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                <div className={styles.rightSection}>
                  <div className={styles.translationSelector} onClick={handleOpenChapterList}>
                    <div className={styles.translationInfo}>
                      <div className={styles.translationLabel}>{t("Chapter: ")}</div>
                      <div className={styles.translationName}>
                        {currentChapter}. {currentChapterName}
                      </div>
                    </div>
                    <IconButton className={styles.btn}>
                      <ChevronRightIcon />
                    </IconButton>
                  </div>
                </div>
              </div>
              {selectedTranslations.length > 0 && (
                <>
                  {loading ? (
                    <>
                      <Skeleton count={1} height={49} width="100%" className="skeleton" />
                      <Skeleton count={3} height={100} width="100%" className="skeleton" />
                      <Skeleton count={1} height={64} width="100%" className="skeleton" />
                    </>
                  ) : (
                    <div className={styles.versesContainer}>
                      {contentType !== "verse" && (
                        <div className={styles.bismillah}>
                          <MemoizedBismillah />
                        </div>
                      )}
                      <Virtuoso
                        ref={virtuosoRef}
                        useWindowScroll
                        totalCount={verses.length}
                        itemContent={renderVerse}
                        overscan={200}
                        increaseViewportBy={{ top: 200, bottom: 200 }}
                        style={{
                          height: "100%",
                          minHeight: "calc(100vh - 200px)",
                          contain: "strict",
                          willChange: "transform",
                        }}
                      />
                    </div>
                  )}
                </>
              )}
              {isChapterListOpen && (
                <div
                  className={styles.chapterListModal}
                  onClick={(e) => {
                    if (e.target === e.currentTarget) {
                      handleCloseChapterList(e)
                    }
                  }}
                >
                  <div
                    className={`${styles.chapterListContent} ${isChapterListClosing ? styles.closing : ""}`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className={styles.chapterListHeader}>
                      <div className={styles.chapterListLeft}>
                        <h3 className={styles.chapterListTitle}>{t("Chapters")}</h3>
                      </div>
                      <div className={styles.chapterListRight}>
                        <span className={styles.chapterListIcon} onClick={handleChapterSearchOpen(true)}>
                          <SearchIcon />
                        </span>
                        <span className={styles.chapterListIcon} onClick={handleCloseChapterList}>
                          <CloseIcon />
                        </span>
                      </div>
                      <div
                        className={searchOpen ? `${styles.chapterListSearch} ${styles.open}` : styles.chapterListSearch}
                      >
                        <input
                          type="text"
                          name="chapter-search"
                          placeholder={t("Search Chapter")}
                          onChange={(e) => filterChapters(e.target.value)}
                          ref={chapterSearchInputRef}
                        />
                        <span onClick={handleChapterSearchOpen(false)}>
                          <CloseIcon />
                        </span>
                      </div>
                    </div>
                    <Scrollbar className={styles.chapterListScrollArea}>
                      <div className={styles.chapterListGrid}>
                        {filteredChapters.map((chapter) => (
                          <div
                            key={chapter.chapterNo}
                            className={`${styles.chapterListItem} ${
                              currentChapter === chapter.chapterNo ? styles.active : ""
                            }`}
                            onClick={(e) => {
                              e.stopPropagation()
                              handleChapterChange(chapter.chapterNo)
                              handleCloseChapterList()
                            }}
                          >
                            <span className={styles.chapterListItemNumber}>{chapter.chapterNo}</span>
                            <div className={styles.chapterListItemName}>
                              <span>{chapter.name}</span>
                              <span>{chapter.meaning}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </Scrollbar>
                  </div>
                </div>
              )}
              <MultiTranslationSelectionModal isOpen={isModalOpen} onClose={handleCloseModal} mode="multi" />
            </div>
          </div>
        </div>
        {!loading && selectedTranslations.length > 0 && verses.length > 0 && (
          <MemoizedPagination
            prev={prev}
            next={next}
            contentType={contentType}
            chapterSlug={currentChapterSlug}
            verseNo={verses[0]?.verseNo}
            translation={selectedTranslations[0] || "vietnamese_hassan"}
          />
        )}
      </div>
    </>
  )
}

MultiTranslationChapterPage.getLayout = function getLayout(page) {
  return (
    <Layout contentTitle={page.props.chapterName} chapterNo={page.props.chapterNo} chapters={page.props.chapters}>
      {page}
    </Layout>
  )
}

export async function getStaticProps(context) {
  const slug = context.params.slug
  const chapterNo = Number.parseInt(slug.split("-")[0])
  try {
    const chapters = await getChaptersInfo()
    if (!chapters[chapterNo - 1]) {
      return {
        notFound: true,
      }
    }
    return {
      props: {
        chapters: chapters || [],
        chapterNo,
        chapterName: chapters[chapterNo - 1].name,
        chapterSlug: chapters[chapterNo - 1].slug,
        contentType: "chapter",
      },
      revalidate: 60,
    }
  } catch (error) {
    console.error("Error in getStaticProps:", error)
    return {
      notFound: true,
    }
  }
}

export async function getStaticPaths() {
  try {
    const chapters = await getChaptersInfo()
    const paths = chapters.map((chapter, index) => ({
      params: {
        slug: chapter.slug,
      },
    }))
    return {
      paths,
      fallback: false,
    }
  } catch (error) {
    console.error("Error in getStaticPaths:", error)
    return {
      paths: [],
      fallback: false,
    }
  }
}
