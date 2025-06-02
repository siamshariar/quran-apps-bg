import { memo, useCallback, useContext, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { Virtuoso } from 'react-virtuoso';
import Skeleton from 'react-loading-skeleton';
import { AudioPlayerContext } from "../../../contexts/AudioPlayerContext";
import VerseCard from "../../surah/verse-card";
import Pagination from "../../surah/pagination";
import QuranIcon from "../../icons/Quran";
import InfoIcon from "../../icons/Info";
import PlayIcon from "../../icons/PlayArrow";
import PauseIcon from "../../icons/Pause";
import Bismillah from "../../icons/Bismillah";

import styles from "./content.module.scss";
import { config } from "../../../lib/config";
import { SettingsContext } from '../../../contexts/SettingsContext'
import { t } from "../../../lib/config";
// import useLoader from "../../../hooks/useLoader";
const MemoizedVerseCard = memo(VerseCard);
const MemoizedBismillah = memo(Bismillah);
const MemoizedPagination = memo(Pagination);

const getTranslatorName = (translationCode) => ({
    vietnamese_hassan: 'Hasan Abdul-Karim',
    vietnamese_rwwad: 'Ruwwad Translation Center',
}[translationCode] || translationCode);

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
}) {
  // const loading = useLoader();
  const printRef = useRef(null);


  const { translation } = useContext(SettingsContext);
  const { setPlaylist, setChapterMp3Url, playing, play, pause, audioType } =
    useContext(AudioPlayerContext);

  const currentVerses = allTranslations?.[translation] || verses;
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState(null);
  const [modalContent, setModalContent] = useState(null);
  const [expandedSetting, setExpandedSetting] = useState(null);

  const translationPrefix = translation !== "vietnamese_hassan" ? `/${translation}` : "";
  useEffect(() => {
    let filtered = [];
    verses.forEach((verse) => {
      filtered.push(verse.mp3Url);
    });
    setPlaylist(filtered);
    // setPlaylist(filteredPlaylist);

    setChapterMp3Url(chapterMp3Url);
  }, []);

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
      : contentType === "verse" &&
        Number(verses[0].verseNo) == 1 &&
        chapterNo > 1
      ? {
          link: `${translationPrefix}/chapters/${chapters[chapterNo - 2].slug}/verses/1`,
          name: "Prev chapter",
        }
      : null
  );

  const [next, setNext] = useState(
    contentType === "chapter" && chapters[chapterNo]
      ? {
          link: `${translationPrefix}/chapters/${chapters[chapterNo].slug}`,
          name: chapters[chapterNo].name,
        }
      : contentType === "verse" &&
        Number(verses[0].verseNo) < chapters[chapterNo - 1].totalVerse
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
      : null
  );


  useEffect(() => {
    if (contentType === "chapter" && chapters[chapterNo - 2]) {
      setPrev({
        link:
          translation === "vietnamese_hassan"
            ? `/chapters/${chapters[chapterNo - 2].slug}`
            : `/${translation}/chapters/${chapters[chapterNo - 2].slug}`,
        name: chapters[chapterNo - 2].name,
      })
    } else if (contentType === "verse" && Number(verses[0]?.verseNo) > 1) {
      setPrev({
        link:
          translation === "vietnamese_hassan"
            ? `/chapters/${chapters[chapterNo - 1].slug}/verses/${Number(verses[0].verseNo) - 1}`
            : `/${translation}/chapters/${chapters[chapterNo - 1].slug}/verses/${Number(verses[0].verseNo) - 1}`,
        name: "Prev verse",
      })
    } else if (contentType === "verse" && Number(verses[0]?.verseNo) == 1 && chapterNo > 1) {
      setPrev({
        link:
          translation === "vietnamese_hassan"
            ? `/chapters/${chapters[chapterNo - 2].slug}/verses/1`
            : `/${translation}/chapters/${chapters[chapterNo - 2].slug}/verses/1`,
        name: "Prev chapter",
      })
    }

    if (contentType === "chapter" && chapters[chapterNo]) {
      setNext({
        link:
          translation === "vietnamese_hassan"
            ? `/chapters/${chapters[chapterNo].slug}`
            : `/${translation}/chapters/${chapters[chapterNo].slug}`,
        name: chapters[chapterNo].name,
      })
    } else if (contentType === "verse" && Number(verses[0]?.verseNo) < chapters[chapterNo - 1]?.totalVerse) {
      setNext({
        link:
          translation === "vietnamese_hassan"
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
        link:
          translation === "vietnamese_hassan"
            ? `/chapters/${chapters[chapterNo].slug}/verses/1`
            : `/${translation}/chapters/${chapters[chapterNo].slug}/verses/1`,
        name: "Next chapter",
      })
    }
  }, [translation, contentType, chapterNo, verses])

  const playingThisChapter = playing && audioType === "chapter";

  const controlPlay = () => {
    play(0, "chapter");
  };

  const controlPause = () => {
    pause();
  };

  // prev next on key press or left right drag
  const router = useRouter();

  const [isKeyPressUp, setIsKeyPressUp] = useState(false);
  const [keyPressType, setKeyPressType] = useState(null);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isTouchEnd, setIsTouchEnd] = useState(false);
  const [didMount, setDidMount] = useState(false);

  useEffect(() => {
    const filtered = currentVerses?.map(verse => verse.mp3Url) || [];
    setPlaylist(filtered);
    setChapterMp3Url(chapterMp3Url);

    if (contentType === "verse") {
      document.addEventListener("keydown", (event) => {
        if (event.key == "ArrowRight" && next !== null) {
          setIsKeyPressUp(false);
          setKeyPressType("right");
        } else if (event.key == "ArrowLeft" && prev !== null) {
          setIsKeyPressUp(false);
          setKeyPressType("left");
        }
      });

      document.addEventListener("keyup", (event) => {
        if (
          (event.key == "ArrowRight" && next !== null) ||
          (event.key == "ArrowLeft" && prev !== null)
        ) {
          setIsKeyPressUp(true);
        }
      });

      document.body.addEventListener("touchstart", (e) => {
        setTouchStart(e.targetTouches[0].clientX);
        setIsTouchEnd(false);
      });

      document.body.addEventListener("touchend", (e) => {
        setTouchEnd(e.changedTouches[0].clientX);
        setIsTouchEnd(true);
      });
    }
    return () => setDidMount(true);
  }, []);

  useEffect(() => {
    if (isKeyPressUp) {
      if (keyPressType == "left" && prev !== null) {
        router.push(prev.link);
      } else if (keyPressType == "right" && next !== null) {
        router.push(next.link);
      }
    }
  }, [isKeyPressUp]);

  useEffect(() => {
    if (isTouchEnd) {
      if (touchEnd - touchStart > 150 && prev !== null) {
        router.push(prev.link);
      } else if (touchStart - touchEnd > 150 && next !== null) {
        router.push(next.link);
      }
    }
  }, [isTouchEnd]);

  const virtuoso = useRef(null);

  const scrollToIndex = (index) => {
    virtuoso.current.scrollToIndex({
      index: index,
      align: "start",
      behavior: "auto"
    });
  };

  const getIndexFromHash = () => {
    const hashIndex = parseInt(window.location.hash.replace("#verse-", ""), 10);
    return isNaN(hashIndex) ? null : hashIndex - 1;
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash && virtuoso.current && !loading) {
      const indexFromHash = getIndexFromHash();
      scrollToIndex(indexFromHash);
    }
  }, [router, loading]);

  const openSettingsModal = () => {
    setModalTitle("Settings");
    setModalContent(
      <Settings 
        defaultExpanded="translation"
        controller={(open) => (event) => {
          if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
            return;
          }
          setModalOpen(open);
        }}
      />
    );
    setModalOpen(true);
  };


  useEffect(() => {
    const handleScrollPosition = () => {
      if (typeof window !== 'undefined' && window.location.hash) {
        const hashIndex = parseInt(window.location.hash.replace("#verse-", ""), 10);
        if (!isNaN(hashIndex)) {
          requestAnimationFrame(() => {
            virtuoso.current?.scrollToIndex({
              index: hashIndex - 1,
              align: "start",
              behavior: "instant"
            });
          });
        }
      }
    };

    const timer = setTimeout(handleScrollPosition, 0);
    return () => clearTimeout(timer);
  }, []);

  const renderVerse = useCallback((index) => {
    const verse = currentVerses[index];
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
      />
    );
  }, [chapterName, chapterNo, chapterSlug, currentVerses, translation]);

  return (
    <div className={styles.chapter}>
      <div className={styles.chapter_tab} ref={printRef}>
        {loading ? (
          <>
            <Skeleton style={{ marginBottom: "24px" }} count={1} height={49} width={`100%`} className="skeleton" />
            <Skeleton count={7} height={150} width={`100%`} className="skeleton" />
            <Skeleton style={{ marginTop: "32px" }} count={1} height={64} width={`100%`} className="skeleton" />
          </>
        ) : (
        <>
        <div className={styles.title}>
          {/*<span className={styles.title_icon}><QuranIcon /></span>*/}
          <span className={styles.title_text}>{contentTitle}</span>
          </div>
          {/* <span className={styles.title_icon}><InfoIcon /></span> */}

          {/*{playingThisChapter && (*/}
          {/*    <span*/}
          {/*        className={styles.title_icon}*/}
          {/*        onClick={controlPause}*/}
          {/*    >*/}
          {/*        <PauseIcon />*/}
          {/*    </span>*/}
          {/*)}*/}
          {/*{!playingThisChapter && (*/}
          {/*    <span*/}
          {/*        className={styles.title_icon}*/}
          {/*        onClick={controlPlay}*/}
          {/*    >*/}
          {/*        <PlayIcon />*/}
          {/*    </span>*/}
          {/*)}*/}
            <div className={styles.change_translation}>
          <span className={styles.translation_info}>
            {t('Translation by')} {getTranslatorName(translation)}{' '}
          <span
                className={styles.change_link}
                  onClick={() => {
                    document.dispatchEvent(new CustomEvent("openSettings", {
                      detail: { open: true },
                    }));
                  }}
                >
                ({t('Change')})
              </span>
          </span>
        </div>

        {contentType !== "verse" && (
          <div className={styles.bismillah}>
            <MemoizedBismillah />
          </div>
        )}

        <div className={styles.verses}>
        <Virtuoso
          ref={virtuoso}
          useWindowScroll
          // style={{ height: 300 }} // Adjust height according to your requirement
            totalCount={currentVerses?.length || 0}
            itemContent={renderVerse}
            overscan={1000}
            increaseViewportBy={{ top: 500, bottom: 500 }}
            style={{ 
              height: '100%',
              minHeight: 'calc(100vh - 200px)',
              contain: 'strict',
              willChange: 'transform'
            }}
        />

          {/* {suraTranslation.result &&
            suraTranslation.result.map((verse, index) => (
              <VerseCard
                key={verse.aya}
                chapterName={chapterName}
                index={index}
                chapterNumber={chapterNumber}
                verse={verse}
                ayaArabic={verses[index].arabic}
              />
            ))} */}
        </div>

        <div className={styles.print_footer}>
          {/* todo <span>Vietnamese Hassan</span> */}
          <span>{getTranslatorName(translation)}</span>
          <span>www.{config.domain}</span>
        </div>
        </>
        )}
      </div>

      {!loading && (
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
  );
}
