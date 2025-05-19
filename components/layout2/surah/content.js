import { useContext, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { Virtuoso } from 'react-virtuoso';
import Skeleton from "react-loading-skeleton";
import { AudioPlayerContext } from "../../../contexts/AudioPlayerContext";
import VerseCard from "../../surah/verse-card";
import Pagination from "../../surah/pagination";
import QuranIcon from "../../icons/Quran";
import InfoIcon from "../../icons/Info";
import PlayIcon from "../../icons/PlayArrow";
import PauseIcon from "../../icons/Pause";
import Bismillah from "../../icons/Bismillah";
import Settings from "../../settings";
import Modal from "../../utils/ModalPrimary";
import styles from "./content.module.scss";
import { config } from "../../../lib/config";
import { SettingsContext } from '../../../contexts/SettingsContext'
// import useLoader from "../../../hooks/useLoader";

export default function ChapterContent({
  contentType,
  contentTitle,
  chapters,
  chapterNo,
  chapterName,
  chapterSlug,
  chapterMp3Url,
  verses,
  loading,
}) {
  // const loading = useLoader();
  const printRef = useRef(null);

  const { translation } = useContext(SettingsContext)
  const translationPrefix = translation !== "vietnamese_hassan" ? `/${translation}` : ""

  const { setPlaylist, setChapterMp3Url, playing, play, pause, audioType } =
    useContext(AudioPlayerContext);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState(null);
  const [modalContent, setModalContent] = useState(null);
  const [expandedSetting, setExpandedSetting] = useState(null);

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

  return (
    <div className={styles.chapter}>
      <div className={styles.chapter_tab} ref={printRef}>
        {loading && (
          <Skeleton
            style={{marginBottom: "24px"}} //
            count={1}
            height={49}
            width={`100%`}
            className="skeleton"
          />
        )}

        {!loading && (
        <>
        <div className={styles.title}>
          {/*<span className={styles.title_icon}><QuranIcon /></span>*/}
          <span className={styles.title_text}>{contentTitle}</span>
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
          <span className={styles.translation_info}>
              Translation by Hasan Abdul-Karim{' '}
          <span
                className={styles.change_link}
                  onClick={openSettingsModal}
                >
                (Change)
              </span>
          </span>
        </div>

        {contentType !== "verse" && (
          <div className={styles.bismillah}>
            <Bismillah />
          </div>
        )}
        </>
        )}

        {loading && <Skeleton count={7} height={150} width={`100%`} className="skeleton" />}

        {!loading && (
        <>
        <div className={styles.verses}>
        <Virtuoso
          ref={virtuoso}
          useWindowScroll
          // style={{ height: 300 }} // Adjust height according to your requirement
          totalCount={verses.length} // Total number of items
          itemContent={(index) => (
            <VerseCard
              key={verses[index].verseNo}
              chapterName={chapterName}
              index={index}
              chapterNo={chapterNo}
              chapterSlug={chapterSlug}
              verse={verses[index]}
              ayaArabic={verses[index].arabic}
              printRef={printRef.current}
              isVirtualized={true}
              isLastVerse={index === verses.length - 1}
              translation={translation}
            />
          )}
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
          <span>{translation === "vietnamese_hassan" ? "Vietnamese Hassan" : "Ruwwad Translation Center"}</span>
          <span>www.{config.domain}</span>
        </div>
        </>
        )}
      </div>

      {!loading && (
      <Pagination
        prev={prev}
        next={next}
        contentType={contentType}
        chapterSlug={chapterSlug}
        verseNo={verses[0].verseNo}
        translation={translation}
      />
      )}

      {loading && <Skeleton style={{marginTop: "32px"}} count={1} height={64} width={`100%`} className="skeleton" />}

      <Modal
        open={modalOpen}
        closer={(open) => (event) => {
          if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
            return;
          }
          setModalOpen(open);
        }}
        title={modalTitle}
        content={modalContent}
      />
    </div>
  );
}
