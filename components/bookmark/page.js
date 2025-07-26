import { useContext, useEffect, useState, useMemo, useCallback } from "react";
import { useRouter } from 'next/router';
import Link from 'next/link';
import { AudioPlayerContext } from "../../contexts/AudioPlayerContext";
import { BookmarkContext } from "../../contexts/BookmarkContext";
import { SettingsContext } from "../../contexts/SettingsContext";
import Sidenav from "../layout2/sidenav";
import VerseCard from "../surah/verse-card";
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
  translation,
}) {
  const router = useRouter();
  const { bookmarks } = useContext(BookmarkContext);
  const { isMobile } = useContext(SettingsContext);
  const {
    setPlaylist,
    setChapterMp3Url,
    playing,
    play,
    pause,
    audioType,
  } = useContext(AudioPlayerContext);
  
  const [displayedData, setDisplayedData] = useState(data || []);
  const [isLoading, setIsLoading] = useState(loading);
  const [prevData, setPrevData] = useState(data);

  useEffect(() => {
    if (data !== prevData) {
      if (data && data.length > 0) {
        setDisplayedData(data);
      } else {
        setDisplayedData([]);
      }
      setPrevData(data);
      setIsLoading(false);
    }
  }, [data, prevData]);

  useEffect(() => {
    if (loading) {
      setIsLoading(true);
    }
  }, [loading]);

  const playlist = useMemo(() => {
    if (displayedData && displayedData.length > 0) {
      return displayedData.map((verse) => verse.mp3Url);
    }
    return [];
  }, [displayedData]);

  useEffect(() => {
    if (playlist.length > 0) {
      setPlaylist(playlist);
    }
  }, [playlist, setPlaylist]);

  const openSettings = useCallback(() => {
    if (isMobile) {
      const event = new CustomEvent("openMobileTranslationModal", {
        detail: { open: true },
        bubbles: true,
      });
      document.dispatchEvent(event);
    } else {
      const event = new CustomEvent("openSidenavSettings", {
        detail: {
          open: true,
          expandedSetting: "translation",
        },
        bubbles: true,
      });
      document.dispatchEvent(event);
    }
  }, [isMobile]);

  const handleVerseClick = useCallback((chapterSlug, verseNo, e) => {
    e.preventDefault();
    router.push({
      pathname: `/chapters/${chapterSlug}/verses/${verseNo}`,
      query: { translation },
    });
  }, [router, translation]);

  const renderVerseCard = (verse, index) => (
    <Link
      href={`/chapters/${verse.chapter.slug}/verses/${verse.verseNo}`}
      passHref
      legacyBehavior
    >
      <div onClick={(e) => handleVerseClick(verse.chapter.slug, verse.verseNo, e)}>
        <VerseCard
          key={`${verse.chapter.chapterNo}-${verse.verseNo}-${translation}-${index}`}
          chapterName={verse.chapter.name}
          index={index}
          chapterNo={verse.chapter.chapterNo}
          chapterSlug={verse.chapter.slug}
          verse={{
            verseNo: verse.verseNo,
            arabic: verse.arabic,
            translation: verse.translation,
            footnote: translation === "vietnamese_hassan" ? verse.footnote : undefined,
            mp3Url: verse.mp3Url,
          }}
          ayaArabic={verse.arabic}
          updateBookmarksData={updateBookmarksData}
          isBookmarkPage={isBookmarkPage}
          translation={translation}
        />
      </div>
    </Link>
  );

  return (
    <div className={styles.content}>
      <Sidenav chapters={chapters} />

      <div className={styles.chapter}>
        <div className={styles.chapter_tab}>
          <div className={styles.title}>
            {name && <span className={styles.title_text}>{name}</span>}
          </div>

          <div className={styles.change_translation}>
            <div className={styles.translation_info}>
              <p>{t('Translation by')}</p>
              <p>
                {getTranslatorName(translation)}{" "}
                <span
                  className={styles.change_link}
                  onClick={openSettings}
                  style={{ cursor: 'pointer' }}
                >
                  ({t('Change')})
                </span>
                {(isLoading || loading) && (
                  <span className={styles.translation_loading}></span>
                )}
              </p>
            </div>
          </div>

          {isLoading ? (
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
          ) : displayedData && displayedData.length > 0 ? (
            <div className={styles.verses}>
              {displayedData.map((verse, index) => renderVerseCard(verse, index))}
            </div>
          ) : !exist ? (
            <div className={styles.no_record}>{t("No records found")}!</div>
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