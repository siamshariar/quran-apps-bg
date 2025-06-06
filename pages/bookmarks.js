import { server, config, t } from "../lib/config";
import { getChaptersInfo, getVerseDetails } from "../lib/fetch";
import { useState, useEffect, useContext, useRef, useCallback } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import { SettingsContext } from "../contexts/SettingsContext";
import SettingsContextProvider from "../contexts/SettingsContext";
import AudioPlayerContextProvider from "../contexts/AudioPlayerContext";
import PinContextProvider from "../contexts/PinContext";
import BookmarkContextProvider from "../contexts/BookmarkContext";
import SidenavContextProvider from "../contexts/SidenavContext";
import Meta from "../components/core/meta";
import HeaderWeb from "../components/layout2/web/header";
import HeaderMobile from "../components/mobile/header-subjective";
import FooterWeb from "../components/web/footer";
import FooterMobile from "../components/mobile/footer-home";
import ArabicDialog from "../components/core/arabic-dialog";
import BookmarkContent from "../components/bookmark/page";
import AudioPlayer from "../components/surah/audio-player";
import BookmarkMobile from "../components/mobile/bookmark/index";

const globalRequestCache = new Map()
const pendingRequests = new Map()

function BookmarkInner({ chapters }) {
  const router = useRouter();
  const { key } = router.query;
  const [bookmarkName, setBookmarkName] = useState(null);
  const [isExists, setExists] = useState(true);
  const [bookmarksCache, setBookmarksCache] = useState({});
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [bookmarkEntries, setBookmarkEntries] = useState([]);
  const [initialized, setInitialized] = useState(false);

  const mountedRef = useRef(true)
  const abortControllerRef = useRef(null)

  const settingsContext = useContext(SettingsContext);
  const translation = settingsContext?.translation || config.translationCode;

  useEffect(() => {
    return () => {
      mountedRef.current = false
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, [])

  useEffect(() => {
    const checkMobile = () => {
    const x = window.matchMedia("(min-width: 1024px)");
    if (!x.matches && !router.query.key) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [router.query.key]);

  useEffect(() => {
    if (!key || initialized) return

      const savedBookmarks = JSON.parse(localStorage.getItem("bookmarks") || "{}");
      if (!savedBookmarks[key]) {
        router.push("/404");
        return;
      }

      setBookmarkName(savedBookmarks[key].name);
      setBookmarkEntries(savedBookmarks[key].entry || [])

      if (savedBookmarks[key].entry.length === 0) {
        setExists(false)
      } else {
        setExists(true)
      }

    setInitialized(true)
  }, [key, router, initialized])

  useEffect(() => {
    if (initialized && bookmarkEntries.length > 0 && translation) {
      setBookmarksCache(prev => {
        const newCache = {...prev};
        delete newCache[translation];
        return newCache;
      });
      
      loadDataForTranslation(translation, true);
    }
  }, [translation]);

  const fetchVerseWithDeduplication = useCallback(async (chapter, verse, targetTranslation) => {
    const cacheKey = `${chapter}-${verse}-${targetTranslation}`

    if (globalRequestCache.has(cacheKey)) {
      return globalRequestCache.get(cacheKey)
    }

    if (pendingRequests.has(cacheKey)) {
      return await pendingRequests.get(cacheKey)
    }

    const requestPromise = (async () => {
      try {
        const verseData = await getVerseDetails(chapter, verse, targetTranslation)

        if (!mountedRef.current) return null

        if (verseData) {
          globalRequestCache.set(cacheKey, verseData)
        }

        return verseData
      } catch (error) {
        return null
      } finally {
        pendingRequests.delete(cacheKey)
      }
    })()

    pendingRequests.set(cacheKey, requestPromise)
    return await requestPromise
  }, [])

  const fetchVersesForTranslation = useCallback(
    async (targetTranslation, entries) => {
      if (!entries || entries.length === 0 || !chapters || !chapters.length) return []

      abortControllerRef.current = new AbortController()

      try {
      const versesData = await Promise.all(
        entries.map(async (item) => {
            if (!mountedRef.current) return null

            try {
              const verseData = await fetchVerseWithDeduplication(item.chapter, item.verse, targetTranslation)

              if (!verseData || !mountedRef.current) {
                return null
              }

              return {
                chapter: {
                  chapterNo: item.chapter,
                  name: chapters[item.chapter - 1]?.name || "",
                  slug: chapters[item.chapter - 1]?.slug || "",
                },
                bookmarkKey: key,
                verseNo: verseData.verseNo,
                arabic: verseData.arabic,
                translation: verseData.translation || "",
                footnote: verseData.footnote || "",
                mp3Url: verseData.mp3Url,
              }
            } catch (error) {
              return null
            }
          }),
        )

        return versesData.filter((verse) => verse !== null)
      } catch (error) {
        if (error.name === "AbortError") {
          return []
        }
        return []
      }
    },
    [chapters, key, fetchVerseWithDeduplication],
  )

  const loadDataForTranslation = useCallback(
    async (targetTranslation, forceRefresh = false) => {
      if (!chapters || !chapters.length || !bookmarkEntries.length) {
        return
      }

      if (forceRefresh) {
        setBookmarksCache(prev => {
          const newCache = {...prev};
          delete newCache[targetTranslation];
          return newCache;
        });
        
        bookmarkEntries.forEach(entry => {
          const cacheKey = `${entry.chapter}-${entry.verse}-${targetTranslation}`;
          globalRequestCache.delete(cacheKey);
        });
      }

      if (bookmarksCache[targetTranslation] && !forceRefresh) {
        return
      }

      const allCached = bookmarkEntries.every((entry) => {
        const cacheKey = `${entry.chapter}-${entry.verse}-${targetTranslation}`
        return globalRequestCache.has(cacheKey)
      })

      if (allCached && !forceRefresh) {
        const cachedVerses = bookmarkEntries.map((entry) => {
          const cacheKey = `${entry.chapter}-${entry.verse}-${targetTranslation}`
          const verseData = globalRequestCache.get(cacheKey)
          return {
            chapter: {
              chapterNo: entry.chapter,
              name: chapters[entry.chapter - 1]?.name || "",
              slug: chapters[entry.chapter - 1]?.slug || "",
            },
            bookmarkKey: key,
            verseNo: verseData.verseNo,
            arabic: verseData.arabic,
            translation: verseData.translation || "",
            footnote: verseData.footnote || "",
            mp3Url: verseData.mp3Url,
          }
        })

        setBookmarksCache((prev) => ({
          ...prev,
          [targetTranslation]: cachedVerses,
        }))
        return
      }

      const partiallyCachedVerses = []
      const entriesToFetch = []

      bookmarkEntries.forEach((entry) => {
        const cacheKey = `${entry.chapter}-${entry.verse}-${targetTranslation}`
        if (globalRequestCache.has(cacheKey)) {
          const verseData = globalRequestCache.get(cacheKey)
          partiallyCachedVerses.push({
            chapter: {
              chapterNo: entry.chapter,
              name: chapters[entry.chapter - 1]?.name || "",
              slug: chapters[entry.chapter - 1]?.slug || "",
            },
            bookmarkKey: key,
            verseNo: verseData.verseNo,
            arabic: verseData.arabic,
            translation: verseData.translation || "",
            footnote: verseData.footnote || "",
            mp3Url: verseData.mp3Url,
          })
        } else {
          entriesToFetch.push(entry)
        }
      })

      if (partiallyCachedVerses.length > 0) {
        setBookmarksCache((prev) => ({
          ...prev,
          [targetTranslation]: partiallyCachedVerses,
        }))
      }

      if (entriesToFetch.length === 0) {
        return
      }

      setLoading(true)

      try {
        const versesData = await fetchVersesForTranslation(targetTranslation, entriesToFetch)

        if (!mountedRef.current) return

        const combinedVerses = [...partiallyCachedVerses, ...versesData]
          .filter((verse) => verse !== null)
          .sort((a, b) => {
            if (a.chapter.chapterNo !== b.chapter.chapterNo) {
              return a.chapter.chapterNo - b.chapter.chapterNo
            }
            return a.verseNo - b.verseNo
          })

        setBookmarksCache((prev) => ({
          ...prev,
          [targetTranslation]: combinedVerses,
        }))
      } catch (error) {
        console.error("Error in loadDataForTranslation:", error)
      } finally {
        if (mountedRef.current) {
          setLoading(false)
        }
      }
    },
    [bookmarksCache, bookmarkEntries, chapters, key, fetchVersesForTranslation],
  )

  useEffect(() => {
    if (!initialized || !bookmarkEntries.length || !chapters || !chapters.length || !settingsContext?.isReady) {
      return
    }

    loadDataForTranslation(translation)
  }, [initialized, bookmarkEntries, chapters, settingsContext?.isReady])

  const getCurrentBookmarksData = () => {
    return bookmarksCache[translation] || []
  }

  const updateBookmarksData = (chapter, verse) => {
    const updatedCache = {}
    Object.keys(bookmarksCache).forEach((translationKey) => {
      updatedCache[translationKey] = bookmarksCache[translationKey].filter(
        (item) => !(item.chapter.chapterNo == chapter && item.verseNo == verse),
      )
    })
    setBookmarksCache(updatedCache)

    const updatedEntries = bookmarkEntries.filter((item) => !(item.chapter == chapter && item.verse == verse))
    setBookmarkEntries(updatedEntries)

    const savedBookmarks = JSON.parse(localStorage.getItem("bookmarks") || "{}")
    if (savedBookmarks[key]) {
      savedBookmarks[key].entry = updatedEntries
      localStorage.setItem("bookmarks", JSON.stringify(savedBookmarks))
    }

    const cacheKey = `${chapter}-${verse}-${translation}`
    globalRequestCache.delete(cacheKey)
  }

  if (isMobile) {
    return (
      <>
              <Meta
                title={`${t('Bookmark')} ${bookmarkName} | ${config?.metaTitle}`}
                description={`Quran Bookmark | ${config?.metaDescription}`}
                url={`${server}/bookmarks`}
                image={`${server}/img/logo/${config?.localizationCode}/s_logo.png`}
                type="website"
              />
              <HeaderMobile //
                title="Bookmarks & Pin"
                backLink="/"
              />
              <main id="viewport" className="viewport">
                <BookmarkMobile key={key} />
              </main>
              <FooterMobile />
      </>
    );
  }

  return (
    <>
            <Meta
              title={`${t("Bookmark")} ${bookmarkName} | ${config?.metaTitle}`}
              description={`Bookmark ${bookmarkName} | ${config?.metaDescription}`}
              url={`${server}/bookmarks`}
              image={`${server}/img/logo/${config?.localizationCode}/s_logo.png`}
              type="website"
            />

            <ArabicDialog />

            {/* <SearchModal
                open={searchModalOpen}
                searchModalController={searchModalController}
            /> */}

            <HeaderWeb
              page="surah"
              chapters={chapters}
              isChapterPage={true}
              // searchModalController={searchModalController}
              hasSidenav={true}
            />

            <AudioPlayerContextProvider>
              <HeaderMobile //
                title={bookmarkName}
                backLink="/bookmarks"
              />

              <main
                id="viewport"
                className="viewport viewport_surah viewport_no_footer"
              >
                <BookmarkContent //
                  chapters={chapters}
                  name={bookmarkName}
                  data={getCurrentBookmarksData()}
                  exist={isExists}
                  isBookmarkPage={true}
                  updateBookmarksData={updateBookmarksData}
                  loading={loading}
                  translation={translation}
                />
              </main>

              <AudioPlayer />
            </AudioPlayerContextProvider>

            <FooterWeb />
      </>
    )
  }

  export default function Bookmark({ chapters }) {
    return (
      <SettingsContextProvider>
        <PinContextProvider>
          <BookmarkContextProvider>
            <SidenavContextProvider>
            <BookmarkInner chapters={chapters} />;
            {/* <FooterMobile /> */}
          </SidenavContextProvider>
        </BookmarkContextProvider>
      </PinContextProvider>
    </SettingsContextProvider>
  );
}

export async function getStaticProps() {
  const chaptersInfo = await getChaptersInfo();

  return {
    props: {
      chapters: chaptersInfo,
    },
  };
}
