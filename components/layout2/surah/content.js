import { useContext, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
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

export default function ChapterContent({
  contentType,
  contentTitle,
  chapters,
  chapterNo,
  chapterName,
  chapterSlug,
  chapterMp3Url,
  verses,
}) {
  const printRef = useRef(null);

  const { setPlaylist, setChapterMp3Url, playing, play, pause, audioType } =
    useContext(AudioPlayerContext);

  useEffect(() => {
    let filtered = [];
    verses.forEach((verse) => {
      filtered.push(verse.mp3Url);
    });
    setPlaylist(filtered);

    setChapterMp3Url(chapterMp3Url);
  }, []);

  const [prev, setPrev] = useState(
    contentType === "chapter" && chapters[chapterNo - 2]
      ? {
          link: `/chapters/${chapters[chapterNo - 2].slug}`,
          name: chapters[chapterNo - 2].name,
        }
      : contentType === "verse" && Number(verses[0].verseNo) > 1
      ? {
          link: `/chapters/${chapters[chapterNo - 1].slug}/verses/${
            Number(verses[0].verseNo) - 1
          }`,
          name: "Prev verse",
        }
      : contentType === "verse" &&
        Number(verses[0].verseNo) == 1 &&
        chapterNo > 1
      ? {
          link: `/chapters/${chapters[chapterNo - 2].slug}/verses/1`,
          name: "Prev chapter",
        }
      : null
  );

  const [next, setNext] = useState(
    contentType === "chapter" && chapters[chapterNo]
      ? {
          link: `/chapters/${chapters[chapterNo].slug}`,
          name: chapters[chapterNo].name,
        }
      : contentType === "verse" &&
        Number(verses[0].verseNo) < chapters[chapterNo - 1].totalVerse
      ? {
          link: `/chapters/${chapters[chapterNo - 1].slug}/verses/${
            Number(verses[0].verseNo) + 1
          }`,
          name: "Next verse",
        }
      : contentType === "verse" &&
        Number(verses[0].verseNo) == chapters[chapterNo - 1].totalVerse &&
        chapterNo < chapters.length
      ? {
          link: `/chapters/${chapters[chapterNo].slug}/verses/1`,
          name: "Next chapter",
        }
      : null
  );

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

  return (
    <div className={styles.chapter}>
      <div className={styles.chapter_tab} ref={printRef}>
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
        </div>

        {contentType !== "verse" && (
          <div className={styles.bismillah}>
            <Bismillah />
          </div>
        )}

        <div className={styles.verses}>
          {verses &&
            verses.map((verse, index) => (
              <VerseCard
                key={verse.verseNo}
                chapterName={chapterName}
                index={index}
                chapterNo={chapterNo}
                chapterSlug={chapterSlug}
                verse={verse}
                ayaArabic={verses[index].arabic}
                printRef={printRef.current}
              />
            ))}

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
          <span>www.{config.domain}</span>
        </div>
      </div>

      <Pagination
        prev={prev}
        next={next}
        contentType={contentType}
        chapterSlug={chapterSlug}
        verseNo={verses[0].verseNo}
      />
    </div>
  );
}
