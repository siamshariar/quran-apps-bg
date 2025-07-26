import { useContext, useEffect, useRef, useState, useCallback } from "react";
import { Virtuoso } from 'react-virtuoso';
import Skeleton from "react-loading-skeleton";
import { AudioPlayerContext } from "../../contexts/AudioPlayerContext";
import { SettingsContext } from "../../contexts/SettingsContext"
import { useRouter } from "next/router"
import VerseCard from "../surah/verse-card";
import { t } from "../../lib/config";
import { getSubjectiveVersesByTranslation } from "../../lib/fetch";
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
  slug,
}) {
  const router = useRouter()
  const printRef = useRef();
  const { translation, isReady } = useContext(SettingsContext)
  const { setPlaylist, setChapterMp3Url } = useContext(AudioPlayerContext);
  const [dynamicTranslations, setDynamicTranslations] = useState(allTranslations);
  const [isRefetching, setIsRefetching] = useState(false);
  const [isMobile, setIsMobile] = useState(false)
  const isLoading = loading || router.isFallback || !isReady || isRefetching
  const currentVerses = dynamicTranslations?.[translation] || verses

  // Add mobile detection
  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 1024
      setIsMobile(mobile)
      console.log("Screen size check:", { width: window.innerWidth, isMobile: mobile })
    }
    
    // Only run on client side
    if (typeof window !== 'undefined') {
      checkScreenSize()
      window.addEventListener("resize", checkScreenSize)
      return () => window.removeEventListener("resize", checkScreenSize)
    }
  }, [])

  const refetchTranslation = useCallback(async (newTranslation) => {
    if (!slug || !verses.length) return;
    setIsRefetching(true);
    
    try {
      const verseIds = verses.map((verse) => {
        return `${verse.chapter?.chapterNo || verse.chapterNo}:${verse.verseNo}`
      });

      const translationData = await getSubjectiveVersesByTranslation(verseIds, newTranslation);
      const finalTranslation = translationData?.length > 0 ? translationData : verses;

      setDynamicTranslations(prev => ({
        ...prev,
        [newTranslation]: finalTranslation
      }));
    } catch (error) {
      console.error('Error refetching translation:', error);
    } finally {
      setIsRefetching(false);
    }
  }, [slug, verses]);

  useEffect(() => {
    if (isReady && translation && !dynamicTranslations[translation]) {
      refetchTranslation(translation);
    }
  }, [translation, isReady, dynamicTranslations, refetchTranslation]);

  useEffect(() => {
    const handleTranslationChange = (event) => {
      const newTranslation = event.detail.translation;
      if (newTranslation && !dynamicTranslations[newTranslation]) {
        refetchTranslation(newTranslation);
      }
    };

    window.addEventListener("subjectiveTranslationChanged", handleTranslationChange);
    return () => {
      window.removeEventListener("subjectiveTranslationChanged", handleTranslationChange);
    };
  }, [dynamicTranslations, refetchTranslation]);

  useEffect(() => {
    if (currentVerses && !isLoading) {
      const filtered = currentVerses.map((verse) => verse.mp3Url);
      setPlaylist(filtered)
      setChapterMp3Url(null)
    }
  }, [currentVerses, isLoading, setPlaylist, setChapterMp3Url])

  const openSettings = useCallback(() => {
    console.log("Attempting to open settings...");
    try {
      if (isMobile) {
        console.log("Opening mobile translation modal");
        const event = new CustomEvent("openMobileTranslationModal", {
          detail: { 
            open: true,
            source: "subjective-verse"
          },
          bubbles: true,
          composed: true
        });
        
        // Dispatch at multiple levels
        document.dispatchEvent(event);
        window.dispatchEvent(event);
        
        // Add timeout as fallback
        setTimeout(() => {
          window.dispatchEvent(
            new CustomEvent("openMobileTranslationModal", {
              detail: { 
                open: true,
                source: "subjective-verse-timeout"
              },
              bubbles: true,
              composed: true
            })
          );
        }, 50);
      } else {
        console.log("Opening desktop sidenav settings");
        const event = new CustomEvent("openSidenavSettings", {
          detail: {
            open: true,
            expandedSetting: "translation",
            source: "subjective-verse"
          },
          bubbles: true,
          composed: true
        });
        
        document.dispatchEvent(event);
        window.dispatchEvent(event);
      }
    } catch (error) {
      console.error("Error in openSettings:", error);
    }
  }, [isMobile]);

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
        {isLoading ? (
          <>
            <Skeleton
              style={{marginBottom: "24px"}}
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
        ) : (
          <>
            <div className={styles.title}>
              <span className={styles.title_text}>{contentTitle}</span>
            </div>

            <div className={styles.change_translation}>
              <div className={styles.translation_info}>
                <p>{t("Translation by")}</p>
                <p>
                  {getTranslatorName(translation)}{" "}
                  <span 
                    className={styles.change_link} 
                    onClick={openSettings}
                    style={{ cursor: 'pointer' }}
                  >
                    ({t("Change")})
                  </span>
                </p>
              </div>
            </div>

            {currentVerses?.length > 0 ? (
              <div className={styles.verses}>
                <Virtuoso
                  useWindowScroll
                  totalCount={currentVerses.length}
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
              </div>
            ) : (
              <div className={styles.empty}>No verses found</div>
            )}
          </>
        )}
      </div>
    </div>
  );
}