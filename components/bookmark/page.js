import { useContext, useEffect } from "react";
import { AudioPlayerContext } from "../../contexts/AudioPlayerContext";
import { BookmarkContext } from "../../contexts/BookmarkContext";
import { SettingsContext } from "../../contexts/SettingsContext";
import Sidenav from "../layout2/sidenav";
import VerseCard from "../surah/verse-card";
// import QuranIcon from "../icons/Quran";
// import InfoIcon from "../icons/Info";
// import PlayIcon from "../icons/PlayArrow";
// import PauseIcon from "../icons/Pause";
// import Bismillah from "../icons/Bismillah";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';
import styles from "../layout2/surah/content.module.scss";

export default function BookmarkContent({
  chapters,
  name,
  data,
  exist,
  isBookmarkPage,
  updateBookmarksData,
}) {
  const { bookmarks } = useContext(BookmarkContext);
  const { translation: currentTranslation } = useContext(SettingsContext);
  const {
    setPlaylist, //
    setChapterMp3Url,
    playing,
    play,
    pause,
    audioType,
  } = useContext(AudioPlayerContext);

  useEffect(() => {
    if (data) {
      let filtered = [];
      data.forEach((verse) => {
        filtered.push(verse.mp3Url);
      });
      setPlaylist(filtered);
    }

    //setChapterMp3Url(chapterMp3Url);
  }, [bookmarks, data]);

  const playingThisChapter = playing && audioType === "chapter";

  const controlPlay = () => {
    play(0, "chapter");
  };

  const controlPause = () => {
    pause();
  };

  return (
    <div className={styles.content}>
      <Sidenav chapters={chapters} />

      <div className={styles.chapter}>
        <div className={styles.chapter_tab}>
          <div className={styles.title}>
            {name && <span className={styles.title_text}>{name}</span>}
            {name === null && <Skeleton height={29} width={`100%`} className="skeleton" />}
          </div>

          {data && (
            <div className={styles.verses}>
              {data.length > 0 &&
                data.map((verse, index) => (
                  <VerseCard
                    key={index}
                    chapterName={verse.chapter.name}
                    index={index}
                    chapterNo={verse.chapter.chapterNo}
                    chapterSlug={verse.chapter.slug}
                    verse={{
                      verseNo: verse.verseNo,
                      arabic: verse.arabic,
                      translation: verse.translation,
                      footnote: verse.footnote,
                      mp3Url: verse.mp3Url,
                    }}
                    ayaArabic={verse.arabic}
                    updateBookmarksData={updateBookmarksData}
                    isBookmarkPage={isBookmarkPage}
                  />
                ))}
            </div>
          )}

          {!data && !exist && (
            <div className={styles.no_record}>No records found!</div>
          )}

          {!data && exist && <Skeleton height={150} width={`100%`} count={2} className="skeleton" />}
        </div>
      </div>
    </div>
  );
}
