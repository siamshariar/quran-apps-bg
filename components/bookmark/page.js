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
import { t } from "../../lib/config";
import styles from "../layout2/surah/content.module.scss";

const getTranslatorName = (translationCode) => {
  const translationMap = {
    vietnamese_hassan: "Hasan Abdul-Karim",
    vietnamese_rwwad: "Ruwwad Translation Center",
  };
  return translationMap[translationCode] || translationCode;
};

export default function BookmarkContent({
  chapters,
  name,
  data,
  exist,
  isBookmarkPage,
  updateBookmarksData,
  loading,
}) {
  const { bookmarks } = useContext(BookmarkContext);
  const { translation } = useContext(SettingsContext);
  const {
    setPlaylist,
    setChapterMp3Url,
    playing,
    play,
    pause,
    audioType,
  } = useContext(AudioPlayerContext);

  useEffect(() => {
    if (!data) return;

    const versesData = data.map((verse) => ({
      ...verse,
      translation: verse.translations?.[translation] || verse.translation,
    }));

    const filtered = versesData.map((verse) => verse.mp3Url);
    setPlaylist(filtered);
  }, [data, translation]);

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

  const openSettingsWithTranslation = () => {
    const settingsEvent = new CustomEvent("openSettings", {
      detail: { open: true },
    });
    document.dispatchEvent(settingsEvent);
  };

  return (
    <div className={styles.content}>
      <Sidenav chapters={chapters} />

      <div className={styles.chapter}>
        <div className={styles.chapter_tab}>
          <div className={styles.title}>
            {name && <span className={styles.title_text}>{name}</span>}
          </div>

          <div className={styles.change_translation}>
            <span className={styles.translation_info}>
              {t('Translation by')} {getTranslatorName(translation)}{" "}
              <span
                className={styles.change_link}
                onClick={openSettingsWithTranslation}
              >
                ({t('Change')})
              </span>
            </span>
          </div>

          {loading ? (
            <>
              <Skeleton
                style={{ marginBottom: "24px" }}
                count={1}
                height={49}
                width="100%"
                className="skeleton"
              />
              <Skeleton
                count={7}
                height={150}
                width="100%"
                className="skeleton"
              />
              <Skeleton
                style={{ marginTop: "32px" }}
                count={1}
                height={64}
                width="100%"
                className="skeleton"
              />
            </>
          ) : data && data.length > 0 ? (
            <div className={styles.verses}>
              {data.map((verse, index) => (
                  <VerseCard
                    key={index}
                    chapterName={verse.chapter.name}
                    index={index}
                    chapterNo={verse.chapter.chapterNo}
                    chapterSlug={verse.chapter.slug}
                    verse={{
                      verseNo: verse.verseNo,
                      arabic: verse.arabic,
                      translation: verse.translations?.[translation] || verse.translation,
                      footnote:
                        translation === "vietnamese_hassan"
                          ? verse.footnote
                          : undefined,
                      mp3Url: verse.mp3Url,
                      translations: verse.translations,
                    }}
                    ayaArabic={verse.arabic}
                    updateBookmarksData={updateBookmarksData}
                    isBookmarkPage={isBookmarkPage}
                    translation={translation}
                  />
                ))}
            </div>
          ) : !data && !exist ? (
            <div className={styles.no_record}>No records found!</div>
          ) : (
            <Skeleton
              height={150}
              width="100%"
              count={2}
              className="skeleton"
            />
          )}
        </div>
      </div>
    </div>
  );
}
