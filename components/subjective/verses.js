import { useContext, useEffect, useRef, useState } from "react";
import { Virtuoso } from 'react-virtuoso';
import Skeleton from "react-loading-skeleton";
import { AudioPlayerContext } from "../../contexts/AudioPlayerContext";
import Sidenav from "../layout2/sidenav";
import VerseCard from "../surah/verse-card";
// import Pagination from "../surah/pagination";
// import QuranIcon from "../icons/Quran";
// import Bismillah from "../icons/Bismillah";
// import useLoader from "../../hooks/useLoader";
import styles from "../layout2/surah/content.module.scss";

export default function SubjectiveVerses({ contentTitle, chapters, verses, loading }) {
  // const loading = useLoader();
  const printRef = useRef();

  const { setPlaylist, setChapterMp3Url, playing, play, pause, audioType } =
    useContext(AudioPlayerContext);

  useEffect(() => {
    let filtered = [];
    verses.forEach((verse) => {
      filtered.push(verse.mp3Url);
    });
    setPlaylist(filtered);

    //setChapterMp3Url(chapterMp3Url);
  }, []);

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
        {loading && (
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

        {!loading && (
        <>
        <div className={styles.title}>
          {/*<span className={styles.title_icon}><QuranIcon /></span>*/}
          <span className={styles.title_text}>{contentTitle}</span>
        </div>

        {/* <div className={styles.bismillah}>
            <Bismillah />
          </div> */}

        <div className={styles.verses}>
          <Virtuoso
              useWindowScroll
              totalCount={verses.length} // Total number of items
              itemContent={(index) => (
                  <VerseCard
                      key={verses[index].verseNo}
                      chapterName={verses[index].chapter.name}
                      index={index}
                      chapterNo={verses[index].chapter.chapterNo}
                      chapterSlug={verses[index].chapter.slug}
                      verse={verses[index]}
                      ayaArabic={verses[index].arabic}
                      printRef={printRef.current}
                      isVirtualized={true}
                      isLastVerse={index === verses.length - 1}
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
        </>
        )}
      </div>

      {/* <Pagination prev={prev} next={next} /> */}
    </div>
  );
}
