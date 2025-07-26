import { server, config, t } from "../../../../lib/config";
import { cleanSlug, normalizeSlug } from "../../../../lib/utils";
import {
  getChaptersInfo,
  getAllSubjectives,
  getSubjectiveVersesBySlug,
  getSubjectiveVersesByTranslation,
} from "../../../../lib/fetch";
import Layout from "../../../../components/layouts/layout-subjective";
import Meta from "../../../../components/core/meta";
import SubjectiveVerses from "../../../../components/subjective/verses";

export default function Subjective({ slug, chapters, subjective, allTranslations, loading }) {
  const name = subjective?.title || "Loading..."

  return (
    <>
      <Meta
        title={`${t('Subjective')} ${name} | ${config?.metaTitle}`}
        description={`Subjective ${name} | ${config?.metaDescription}`}
        url={`${server}/subjective/${slug}/verses`}
        image={`${server}/img/logo/${config?.localizationCode}/s_logo.png`}
        type="website"
      />

      <SubjectiveVerses
        contentTitle={name}
        verses={subjective?.verses || []}
        allTranslations={allTranslations}
        chapters={chapters}
        loading={loading}
        initialTranslation="vietnamese_hassan"
        slug={slug}
      />
    </>
  );
}

Subjective.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export async function getStaticProps(context) {
  try {
    // Get the raw slug from params
    const rawSlug = context.params.slug;
    console.log('=== getStaticProps Debug ===');
    console.log('Raw slug from params:', rawSlug);
    
    // Try different approaches to clean the slug
    let cleanedSlug = rawSlug;
    
    // First, try to decode if it's URL encoded
    try {
      const decoded = decodeURIComponent(rawSlug);
      console.log('Decoded slug:', decoded);
      cleanedSlug = decoded;
    } catch (e) {
      console.log('Slug not URL encoded or decode failed:', e.message);
    }
    
    // Clean the slug
    cleanedSlug = cleanSlug(cleanedSlug);
    console.log('Final cleaned slug:', cleanedSlug);
    
    // Try to fetch with original slug first, then cleaned slug
    let subjective = null;
    
    try {
      console.log('Trying to fetch with cleaned slug:', cleanedSlug);
      subjective = await getSubjectiveVersesBySlug(cleanedSlug);
    } catch (error) {
      console.log('Failed with cleaned slug, trying original:', rawSlug);
      try {
        subjective = await getSubjectiveVersesBySlug(rawSlug);
      } catch (error2) {
        console.log('Failed with original slug too');
      }
    }
    
    const chaptersInfo = await getChaptersInfo();

    if (!subjective) {
      console.log('Subjective not found for any slug variant');
      return {
        notFound: true,
      };
    }

    console.log('Found subjective:', subjective.title);

    const verseIds = subjective.verses?.map((verse) => {
      return `${verse.chapter?.chapterNo || verse.chapterNo}:${verse.verseNo}`
    }) || []

    console.log('Generated verse IDs count:', verseIds.length);
    console.log('Sample verse IDs:', verseIds.slice(0, 3));

    const [hassanTranslation, rwwadTranslation] = await Promise.all([
      verseIds.length > 0 ? getSubjectiveVersesByTranslation(verseIds, "vietnamese_hassan") : [],
      verseIds.length > 0 ? getSubjectiveVersesByTranslation(verseIds, "vietnamese_rwwad") : [],
    ])

    const finalHassanTranslation = hassanTranslation?.length > 0 ? hassanTranslation : subjective.verses || []
    const finalRwwadTranslation = rwwadTranslation?.length > 0 ? rwwadTranslation : subjective.verses || []

    console.log('Hassan translation count:', finalHassanTranslation.length);
    console.log('Rwwad translation count:', finalRwwadTranslation.length);

    return {
      props: {
        slug: cleanedSlug,
        chapters: chaptersInfo,
        subjective,
        allTranslations: {
          vietnamese_hassan: finalHassanTranslation,
          vietnamese_rwwad: finalRwwadTranslation,
        },
        title: subjective.title,
        backLink: "/subjective",
        mode: "verse",
        key: cleanedSlug,
        loading: false, 
      },
      revalidate: 60,
    }
  } catch (error) {
    console.error('Error in getStaticProps:', error);
    return {
      notFound: true,
    }
  };
}

export async function getStaticPaths() {
  try {
    console.log('=== getStaticPaths Debug ===');
    const subjectives = await getAllSubjectives()
    
    if (!subjectives || !Array.isArray(subjectives)) {
      console.log('No subjectives found or invalid format');
      return {
        paths: [],
        fallback: "blocking",
      }
    }

    console.log('Total subjectives found:', subjectives.length);

    const paths = subjectives.map((subjective, index) => {
      const originalSlug = subjective.slug;
      const cleanedSlug = cleanSlug(originalSlug);
      
      if (index < 5) { // Log first 5 for debugging
        console.log(`Path ${index + 1}:`, { 
          original: originalSlug, 
          cleaned: cleanedSlug 
        });
      }
      
      return {
        params: { slug: cleanedSlug },
      }
    }).filter(path => path.params.slug && path.params.slug.length > 0);

    console.log('Generated paths count:', paths.length);
    console.log('Sample generated paths:', paths.slice(0, 3).map(p => p.params.slug));

    return {
      paths,
      fallback: "blocking", 
    }
  } catch (error) {
    console.error('Error in getStaticPaths:', error);
    return {
      paths: [],
      fallback: "blocking",
    }
  };
}