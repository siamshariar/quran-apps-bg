/**
 * Dynamic Translation Route - Universal Chapter Page
 * 
 * This page dynamically handles ANY translation code in the URL
 * Example URLs:
 * - /korean_rwwad/chapters/11-hud
 * - /korean_hamid/chapters/11-hud
 * - /vietnamese_rwwad/chapters/11-hud
 * - /chinese_makin/chapters/11-hud
 * - etc.
 */

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { server, config, t, translationData, getAvailableTranslations } from "../../../lib/config";
import { getChaptersInfo, getChapterDetails } from "../../../lib/fetch";
import Layout from "../../../components/layouts/layout-chapter";
import Meta from "../../../components/core/meta";
import ChapterContent from "../../../components/layout2/surah/content";

export default function DynamicTranslationChapter({
  chapters,
  chapterNo,
  chapterName,
  chapterSlug,
  chapterMp3Url,
  verses: initialVerses,
  allTranslations: initialAllTranslations,
  contentTitle,
  mode,
  loading: initialLoading,
  translationCode: initialTranslationCode,
  availableTranslations: initialAvailableTranslations,
}) {
  const router = useRouter();
  const [verses, setVerses] = useState(initialVerses);
  const [allTranslations, setAllTranslations] = useState(initialAllTranslations);
  const [translationCode, setTranslationCode] = useState(initialTranslationCode);
  const [availableTranslations, setAvailableTranslations] = useState(initialAvailableTranslations);
  const [loading, setLoading] = useState(initialLoading);

  // Update context translation when URL changes
  useEffect(() => {
    if (translationCode && typeof window !== 'undefined') {
      // Dispatch event to update settings context
      window.dispatchEvent(new CustomEvent('urlTranslationChange', {
        detail: { translation: translationCode }
      }));
    }
  }, [translationCode]);

  // Listen for translation changes from settings
  useEffect(() => {
    const handleTranslationChange = async (event) => {
      const newTranslation = event.detail.translation;
      
      if (newTranslation === translationCode) {
        return; // Already showing this translation
      }

      console.log(`Translation changed from ${translationCode} to ${newTranslation}`);
      
      setLoading(true);
      setTranslationCode(newTranslation);

      try {
        // Get available translations for the new translation's language
        const currentLanguage = Object.keys(translationData).find(lang => 
          translationData[lang].some(t => t.code === newTranslation)
        );
        
        const newAvailableTranslations = currentLanguage 
          ? translationData[currentLanguage] 
          : [{ code: newTranslation, name: newTranslation }];
        
        setAvailableTranslations(newAvailableTranslations);

        // Fetch new translation data
        const chapterDetails = await getChapterDetails(chapterNo, newTranslation);
        
        if (chapterDetails && chapterDetails.verses) {
          setVerses(chapterDetails.verses);

          // Update allTranslations object
          const newAllTranslations = {
            [newTranslation]: chapterDetails.verses,
          };

          // Fetch additional translations for this language
          const otherTranslations = newAvailableTranslations.filter(t => t.code !== newTranslation);
          
          if (otherTranslations.length > 0) {
            try {
              const otherTranslationData = await Promise.all(
                otherTranslations.slice(0, 2).map(t =>
                  getChapterDetails(chapterNo, t.code).catch(() => null)
                )
              );

              otherTranslations.slice(0, 2).forEach((trans, index) => {
                if (otherTranslationData[index] && otherTranslationData[index].verses) {
                  newAllTranslations[trans.code] = otherTranslationData[index].verses;
                }
              });
            } catch (error) {
              console.error('Error loading additional translations:', error);
            }
          }

          setAllTranslations(newAllTranslations);
        }
      } catch (error) {
        console.error('Error fetching new translation:', error);
      } finally {
        setLoading(false);
      }
    };

    window.addEventListener('translationChanged', handleTranslationChange);
    
    return () => {
      window.removeEventListener('translationChanged', handleTranslationChange);
    };
  }, [translationCode, chapterNo]);

  return (
    <>
      <Meta
        title={`${t('Chapter')} ${chapterName} | ${config?.metaTitle}`}
        description={`Chapter ${chapterName}. ${config?.metaDescription}`}
        url={`${server}/${translationCode}/chapters/${chapterSlug}`}
        image={`${server}/img/logo/${config?.localizationCode}/s_logo.png`}
        type="website"
      />

      <ChapterContent
        contentType={mode}
        contentTitle={contentTitle}
        chapterNo={chapterNo}
        chapterName={chapterName}
        chapterSlug={chapterSlug}
        chapterMp3Url={chapterMp3Url}
        verses={verses}
        allTranslations={allTranslations}
        chapters={chapters}
        loading={loading}
        currentTranslation={translationCode}
        availableTranslations={availableTranslations}
      />
    </>
  );
}

DynamicTranslationChapter.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export async function getStaticProps(context) {
  const { translationCode, slug } = context.params;
  
  try {
    // Validate translation code
    const allTranslationCodes = Object.values(translationData)
      .flat()
      .map(t => t.code);
    
    if (!allTranslationCodes.includes(translationCode)) {
      return { notFound: true };
    }

    const decodedSlug = decodeURIComponent(slug);
    const chaptersInfo = await getChaptersInfo();
    const chapter = chaptersInfo.find((ch) => ch.slug === decodedSlug);
    
    if (!chapter) {
      return { notFound: true };
    }

    const chapterNo = chapter.id || chapter.chapterNo;

    // Get available translations for this language
    const currentLanguage = Object.keys(translationData).find(lang => 
      translationData[lang].some(t => t.code === translationCode)
    );
    
    const availableTranslations = currentLanguage 
      ? translationData[currentLanguage] 
      : [{ code: translationCode, name: translationCode }];

    // Fetch the primary translation
    const chapterDetails = await getChapterDetails(chapterNo, translationCode);
    
    // Check if chapterDetails is valid
    if (!chapterDetails || !chapterDetails.verses) {
      console.error(`Failed to load translation ${translationCode} for chapter ${chapterNo}`);
      return { notFound: true };
    }
    
    // Prepare allTranslations object
    const allTranslationsObj = {
      [translationCode]: chapterDetails.verses,
    };

    // Fetch other available translations for this language
    const otherTranslations = availableTranslations.filter(t => t.code !== translationCode);
    
    if (otherTranslations.length > 0) {
      try {
        const otherTranslationData = await Promise.all(
          otherTranslations.slice(0, 2).map(t => // Load max 2 additional translations
            getChapterDetails(chapterNo, t.code).catch(() => null)
          )
        );

        otherTranslations.slice(0, 2).forEach((trans, index) => {
          if (otherTranslationData[index] && otherTranslationData[index].verses) {
            allTranslationsObj[trans.code] = otherTranslationData[index].verses;
          }
        });
      } catch (error) {
        console.error('Error loading additional translations:', error);
      }
    }

    return {
      props: {
        chapterNo: chapterDetails.chapterNo,
        chapterName: chapter.name,
        chapterSlug: chapter.slug,
        chapterMp3Url: chapterDetails.mp3Url,
        verses: chapterDetails.verses,
        allTranslations: allTranslationsObj,
        chapters: chaptersInfo,
        contentTitle: chapter.name,
        mode: "chapter",
        loading: false,
        translationCode,
        availableTranslations,
      },
      revalidate: 60, // Revalidate every 60 seconds
    };
  } catch (error) {
    console.error(`Error loading chapter:`, error);
    return { notFound: true };
  }
}

export async function getStaticPaths() {
  // Get all translation codes
  const allTranslationCodes = Object.values(translationData)
    .flat()
    .map(t => t.code);
  
  const chaptersInfo = await getChaptersInfo();
  
  // Generate paths for all translation codes and chapters
  const paths = [];
  
  allTranslationCodes.forEach(translationCode => {
    chaptersInfo.forEach(chapter => {
      paths.push({
        params: {
          translationCode,
          slug: encodeURIComponent(chapter.slug),
        },
      });
    });
  });

  return {
    paths,
    fallback: 'blocking', // Generate pages on-demand if not pre-rendered
  };
}
