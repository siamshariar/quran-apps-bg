import { useContext, useEffect, useRef } from "react";
import { Virtuoso } from 'react-virtuoso';
import Skeleton from "react-loading-skeleton";
import { AudioPlayerContext } from "../../contexts/AudioPlayerContext";
import Sidenav from "../layout2/sidenav";
import { SettingsContext } from "../../contexts/SettingsContext"
import { useRouter } from "next/router"
import VerseCard from "../surah/verse-card";
// import Pagination from "../surah/pagination";
// import QuranIcon from "../icons/Quran";
// import Bismillah from "../icons/Bismillah";
// import useLoader from "../../hooks/useLoader";
import styles from "../layout2/surah/content.module.scss";

const getTranslatorName = (translationCode) => {
  const translationMap = {
    vietnamese_hassan: "Hasan Abdul-Karim",
    vietnamese_rwwad: "Ruwwad Translation Center",
  }
  return translationMap[translationCode] || translationCode
}

export default function SubjectiveVerses({
  contentTitle,
  chapters,
  verses = [],
  allTranslations = {},
  loading,
  initialTranslation = "vietnamese_hassan",
}) {
  const router = useRouter()
  // const loading = useLoader();
  const printRef = useRef();
  const { translation, isReady } = useContext(SettingsContext)
  const { setPlaylist, setChapterMp3Url, playing, play, pause, audioType } =
    useContext(AudioPlayerContext);

  const isLoading = loading || router.isFallback || !isReady
  const currentVerses = allTranslations?.[translation] || verses

  console.log("SubjectiveVerses render:", {
    isReady,
    translation,
    initialTranslation,
    loading,
    routerIsFallback: router.isFallback,
    isLoading,
    currentPath: typeof window !== "undefined" ? window.location.pathname : "SSR",
    hasAllTranslations: !!allTranslations,
    availableTranslations: Object.keys(allTranslations || {}),
    currentVersesCount: currentVerses?.length,
  })

  useEffect(() => {
    if (currentVerses && !isLoading) {
      const filtered = currentVerses.map((verse) => verse.mp3Url);
      setPlaylist(filtered)
      setChapterMp3Url(null)
    }
    //setChapterMp3Url(chapterMp3Url);
  }, [currentVerses, isLoading, setPlaylist, setChapterMp3Url])

  // const [prev, setPrev] = useState(
  //   contentType === "chapter" && chapters[chapterNo - 2]
  //     ? {
  //         link: `/chapters/${chapters[chapterNo - 2].slug}`,
  //         name: chapters[chapterNo - 2].name,
  //       }
  //     : contentType === "verse" && verses[0].verseNo > 1
  //     ? {
  //         link: `/chapters/${chapters[chapterNo - 1].slug}/verses/${
  //           verses[0].verseNo - 1
  //         }`,
  //         name: "Prev verse",
  //       }
  //     : null
  // );

  // const [next, setNext] = useState(
  //   contentType === "chapter" && chapters[chapterNo]
  //     ? {
  //         link: `/chapters/${chapters[chapterNo].slug}`,
  //         name: chapters[chapterNo].name,
  //       }
  //     : contentType === "verse" &&
  //       verses[0].verseNo < chapters[chapterNo - 1].totalVerse
  //     ? {
  //         link: `/chapters/${chapters[chapterNo - 1].slug}/verses/${
  //           verses[0].verseNo + 1
  //         }`,
  //         name: "Next verse",
  //       }
  //     : null
  // );

  useEffect(() => {
    if (router.isReady && isReady && !isLoading) {
      const currentPath = router.asPath.split("?")[0]

      let expectedPath
      if (translation === "vietnamese_hassan") {
        expectedPath = currentPath.replace(/^\/vietnamese_rwwad/, "")
      } else {
        if (currentPath.startsWith("/vietnamese_rwwad")) {
          expectedPath = currentPath 
        } else {
          expectedPath = `/${translation}${currentPath}`
        }
      }
      if (expectedPath !== currentPath && router.asPath === router.route) {
        console.log("Translation changed by user, updating URL from", currentPath, "to", expectedPath)
        window.history.replaceState({}, "", expectedPath)
      }
    }
  }, [translation, router.isReady, isReady, router.asPath, router.route, isLoading])

  const openSettingsWithTranslation = () => {
    const settingsEvent = new CustomEvent("openSettings", {
      detail: { open: true, expandedSetting: "translation" },
    })
    document.dispatchEvent(settingsEvent)
  }
  const uniqueKey = (chapterNo, verseNo) => {
    let s1 = "0000" + chapterNo;
    s1 = s1.substring(s1.length - 3);

    let s2 = "0000" + verseNo;
    s2 = s2.substring(s2.length - 3);

    return s1 + s2;
  };

  return (
    <div className={styles.chapter}>
      <div className={styles.chapter_tab} ref={printRef}>
        {isLoading && (
          <>
            <Skeleton
              style={{marginBottom: "24px"}} //
              count={1}
              height={49}
              width={`100%`}
              className="skeleton"
            />
            <Skeleton
              count={7}
              height={150}
              width={`100%`}
              className="skeleton"
            />
          </>
        )}

        {!isLoading && (
        <>
        <div className={styles.title}>
          {/*<span className={styles.title_icon}><QuranIcon /></span>*/}
          <span className={styles.title_text}>{contentTitle}</span>
        </div>

        {/* <div className={styles.bismillah}>
            <Bismillah />
          </div> */}

        <div className={styles.change_translation}>
              <span className={styles.translation_info}>
                Translation by {getTranslatorName(translation)}{" "}
                <span className={styles.change_link} onClick={openSettingsWithTranslation}>
                  (Change)
                </span>
              </span>
            </div>

            {currentVerses && currentVerses.length > 0 ? (
        <div className={styles.verses}>
          <Virtuoso
              useWindowScroll
              totalCount={currentVerses.length} // Total number of items
              itemContent={(index) => (
                  <VerseCard
                      key={`${translation}-${currentVerses[index]?.verseNo || index}`}
                      chapterName={currentVerses[index]?.chapter?.name || ""}
                      index={index}
                      chapterNo={currentVerses[index]?.chapter?.chapterNo}
                      chapterSlug={currentVerses[index]?.chapter?.slug}
                      verse={currentVerses[index]}
                      ayaArabic={currentVerses[index]?.arabic}
                      printRef={printRef.current}
                      isVirtualized={true}
                      isLastVerse={index === currentVerses.length - 1}
                      translation={translation}
                  />
              )}
          />

          {/*{verses &&*/}
          {/*  verses.map((verse, index) => (*/}
          {/*    <VerseCard*/}
          {/*      key={uniqueKey(verse.chapter.chapterNo, verse.verseNo)}*/}
          {/*      chapterName={verse.chapter.name}*/}
          {/*      index={index}*/}
          {/*      chapterNo={verse.chapter.chapterNo}*/}
          {/*      chapterSlug={verse.chapter.slug}*/}
          {/*      verse={verse}*/}
          {/*      ayaArabic={verse.arabic}*/}
          {/*      printRef={printRef.current}*/}
          {/*    />*/}
          {/*  ))}*/}
        </div>
            ) : (
              <div className={styles.empty}>No verses found</div>
            )}
        </>
        )}
      </div>

      {/* <Pagination prev={prev} next={next} /> */}
    </div>
  );
}
