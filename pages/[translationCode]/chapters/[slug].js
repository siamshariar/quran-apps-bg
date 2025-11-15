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

import { useEffect, useState, useRef } from "react";
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
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [isFetching, setIsFetching] = useState(false); // Prevent duplicate fetches
  const [currentChapterSlug, setCurrentChapterSlug] = useState(chapterSlug); // Track current chapter
  const lastFetchKey = useRef(`${initialTranslationCode}-${chapterNo}`); // Track last fetch to prevent duplicates

  // Detect when slug changes (navigating to different chapter)
  useEffect(() => {
    if (router.query.slug && router.query.slug !== currentChapterSlug) {
      console.log(`Chapter changed from ${currentChapterSlug} to ${router.query.slug}`);
      setCurrentChapterSlug(router.query.slug);
      setIsInitialLoad(false);
      // This will be handled by full page navigation, not shallow routing
      // So this effect is just for logging
    }
  }, [router.query.slug, currentChapterSlug]);

  // Sync translationCode with URL when route changes (shallow routing)
  useEffect(() => {
    if (router.query.translationCode && router.query.translationCode !== translationCode) {
      console.log(`🔄 URL changed: updating translationCode from ${translationCode} to ${router.query.translationCode}`);
      console.log(`📊 Stack trace:`, new Error().stack);
      setTranslationCode(router.query.translationCode);
      setIsInitialLoad(false);
    }
  }, [router.query.translationCode, translationCode]);

  // Update context translation when URL changes
  useEffect(() => {
    if (translationCode && typeof window !== 'undefined') {
      // Dispatch event to update settings context
      window.dispatchEvent(new CustomEvent('urlTranslationChange', {
        detail: { translation: translationCode }
      }));
    }
  }, [translationCode]);

  // Fetch new data when translationCode OR chapterNo changes
  useEffect(() => {
    const fetchKey = `${translationCode}-${chapterNo}`;
    console.log(`📡 Fetch Effect Triggered - fetchKey: ${fetchKey}, lastFetchKey: ${lastFetchKey.current}`);
    console.log(`   isInitialLoad: ${isInitialLoad}, isFetching: ${isFetching}`);
    
    // Always skip on initial mount - we already have data from getStaticProps
    if (isInitialLoad) {
      console.log('⏭️ Skipping fetch - initial load');
      setIsInitialLoad(false);
      lastFetchKey.current = fetchKey; // Mark this as already fetched
      return;
    }

    // Skip if we already fetched this exact combination
    if (lastFetchKey.current === fetchKey) {
      console.log('⏭️ Skipping fetch - already have this data');
      return;
    }

    // Prevent duplicate fetches
    if (isFetching) {
      console.log('⏸️ Already fetching, skipping duplicate request');
      return;
    }

    const fetchTranslationData = async () => {
      console.log(`🔄 Fetching ONLY translation data: ${translationCode}, chapter: ${chapterNo}`);
      lastFetchKey.current = fetchKey; // Mark as fetching this combination
      setIsFetching(true);
      setLoading(true);

      try {
        // Get available translations for this translation's language
        const currentLanguage = Object.keys(translationData).find(lang => 
          translationData[lang].some(t => t.code === translationCode)
        );
        
        const newAvailableTranslations = currentLanguage 
          ? translationData[currentLanguage] 
          : [{ code: translationCode, name: translationCode }];
        
        setAvailableTranslations(newAvailableTranslations);

        // Fetch ONLY the translation data (Arabic is already in verses from initial load)
        const chapterDetails = await getChapterDetails(chapterNo, translationCode);
        
        if (chapterDetails && chapterDetails.verses) {
          // Keep existing verses if we have them (they contain Arabic)
          // Only update if this is a new chapter or we don't have verses yet
          if (!verses || verses.length === 0) {
            setVerses(chapterDetails.verses);
          }

          // Update allTranslations - preserve existing Arabic, just update translation
          const newAllTranslations = {
            ...allTranslations, // Keep existing data (including Arabic from previous translations)
            [translationCode]: chapterDetails.verses,
          };

          setAllTranslations(newAllTranslations);
          
          console.log(`✅ Updated translation: ${translationCode} (Arabic preserved from initial load)`);
        } else {
          console.error(`No data returned for translation ${translationCode}`);
        }
      } catch (error) {
        console.error('Error fetching translation data:', error);
      } finally {
        setLoading(false);
        setIsFetching(false);
      }
    };

    fetchTranslationData();
  }, [translationCode, chapterNo]); // Re-fetch whenever translation or chapter changes

  // Get localization code for current translation
  const getLocalizationForTranslation = (transCode) => {
    // Map translation codes to localization codes
    const translationToLocale = {
      // German
      german_bubenheim: 'de',
      german_aburida: 'de',
      german_rwwad: 'de',
      // Portuguese
      portuguese_nasr: 'pt',
      por_samirelhayek: 'pt',
      // Add other mappings as needed
      // Vietnamese
      vietnamese_hassan: 'vn',
      vietnamese_rwwad: 'vn',
      vietnamese_mokhtasar: 'vn',
      // Korean
      korean_hamid: 'kr',
      korean_rwwad: 'kr',
      // Chinese
      chinese_makin: 'cn',
      chinese_suliman: 'cn',
      chinese_mayolong: 'cn',
      chinese_mokhtasar: 'cn',
      // Japanese
      japanese_saeedsato: 'jp',
      japanese_mokhtasar: 'jp',
      // Danish
      'dan-hadiabdollahian': 'dk',
      'dan-vandetaal': 'dk',
      // Khmer
      khmer_cambodia: 'kh',
      khmer_rwwad: 'kh',
      khmer_mokhtasar: 'kh',
      // Filipino
      tagalog_rwwad: 'ph',
      bisayan_rwwad: 'ph',
      iranun_sarro: 'ph',
      maguindanao_rwwad: 'ph',
      tagalog_mokhtasar: 'ph',
      // French
      french_rashid: 'fr',
      french_montada: 'fr',
      french_hameedullah: 'fr',
      french_mokhtasar: 'fr',
    };
    return translationToLocale[transCode] || config?.localizationCode;
  };

  const currentLocalization = getLocalizationForTranslation(translationCode);

  return (
    <>
      <Meta
        title={`${t('Chapter')} ${chapterName} | ${config?.metaTitle}`}
        description={`Chapter ${chapterName}. ${config?.metaDescription}`}
        url={`${server}/${translationCode}/chapters/${chapterSlug}`}
        image={`${server}/img/logo/${currentLocalization}/logo.png`}
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

    // Skip loading additional translations during build to avoid 500 errors
    // Additional translations will be loaded on-demand in the client
    console.log(`✅ Built static page for ${translationCode}/chapters/${chapter.slug}`);

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
  try {
    // ONLY get translation codes for the current locale (from env)
    const availableTranslations = getAvailableTranslations();
    const localeTranslationCodes = availableTranslations.map(t => t.code);
    
    console.log(`📦 Building static paths for locale: ${config.localizationCode}`);
    console.log(`📝 Translation codes to build: ${localeTranslationCodes.join(', ')}`);
    
    const chaptersInfo = await getChaptersInfo();
    
    if (!chaptersInfo || !Array.isArray(chaptersInfo)) {
      console.error('Failed to load chapters info for static paths')
      return {
        paths: [],
        fallback: 'blocking',
      }
    }
    
    // Generate paths ONLY for translations in the current locale
    const paths = [];
    
    localeTranslationCodes.forEach(translationCode => {
      chaptersInfo.forEach(chapter => {
        paths.push({
          params: {
            translationCode,
            slug: chapter.slug,
          },
        });
      });
    });

    console.log(`✅ Generated ${paths.length} static paths (${localeTranslationCodes.length} translations × ${chaptersInfo.length} chapters)`);

    return {
      paths,
      fallback: 'blocking', // Generate pages on-demand if not pre-rendered
    };
  } catch (error) {
    console.error("Error in getStaticPaths:", error);
    return {
      paths: [],
      fallback: 'blocking',
    };
  }
}
