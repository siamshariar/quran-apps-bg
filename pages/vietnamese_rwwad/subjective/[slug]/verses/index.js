import { server, config, t } from "../../../../../lib/config"
import {
  getChaptersInfo,
  getAllSubjectives,
  getSubjectiveVersesBySlug,
  getSubjectiveVersesByTranslation,
} from "../../../../../lib/fetch"
import Layout from "../../../../../components/layouts/layout-subjective"
import Meta from "../../../../../components/core/meta"
import SubjectiveVerses from "../../../../../components/subjective/verses"

export default function Subjective({ slug, chapters, subjective, allTranslations, loading }) {
  const name = subjective?.title || "Loading..."

  console.log("Vietnamese Rwwad Subjective page props:", {
    slug,
    subjectiveTitle: subjective?.title,
    loading,
    allTranslations: allTranslations ? Object.keys(allTranslations) : "none",
    hassanCount: allTranslations?.vietnamese_hassan?.length || 0,
    rwwadCount: allTranslations?.vietnamese_rwwad?.length || 0,
  })

  return (
    <>
      <Meta
        title={`${t('Subjective')} ${name} | ${config?.metaTitle}`}
        description={`Subjective ${name} | ${config?.metaDescription}`}
        url={`${server}/vietnamese_rwwad/subjective/${slug}/verses`}
        image={`${server}/img/logo/${config?.localizationCode}/s_logo.png`}
        type="website"
      />

      <SubjectiveVerses
        contentTitle={name}
        verses={subjective?.verses || []}
        allTranslations={allTranslations}
        chapters={chapters}
        loading={loading}
        initialTranslation="vietnamese_rwwad"
      />
    </>
  )
}

Subjective.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}

export async function getStaticProps(context) {
  try {
    const slug = encodeURI(context.params.slug)
    console.log("Building vietnamese_rwwad subjective page for slug:", slug)

    const [chaptersInfo, subjective] = await Promise.all([getChaptersInfo(), getSubjectiveVersesBySlug(slug)])

    if (!subjective) {
      console.error("Subjective not found for slug:", slug)
      return {
        notFound: true,
      }
    }

    console.log("Base subjective data for vietnamese_rwwad:", {
      title: subjective.title,
      versesCount: subjective.verses?.length || 0,
    })

    // Extract verse IDs for fetching different translations
    const verseIds =
      subjective.verses?.map((verse) => {
        return `${verse.chapter?.chapterNo || verse.chapterNo}:${verse.verseNo}`
      }) || []

    console.log("Extracted verse IDs for vietnamese_rwwad:", verseIds)

    // Fetch both translations in parallel
    const [hassanTranslation, rwwadTranslation] = await Promise.all([
      verseIds.length > 0 ? getSubjectiveVersesByTranslation(verseIds, "vietnamese_hassan") : [],
      verseIds.length > 0 ? getSubjectiveVersesByTranslation(verseIds, "vietnamese_rwwad") : [],
    ])

    console.log("Fetched translations for vietnamese_rwwad page:", {
      hassanCount: hassanTranslation?.length || 0,
      rwwadCount: rwwadTranslation?.length || 0,
      originalCount: subjective.verses?.length || 0,
    })

    // Use the fetched translations or fall back to original verses
    const finalHassanTranslation = hassanTranslation?.length > 0 ? hassanTranslation : subjective.verses || []
    const finalRwwadTranslation = rwwadTranslation?.length > 0 ? rwwadTranslation : subjective.verses || []

    console.log("Final translations for vietnamese_rwwad page:", {
      hassanFinalCount: finalHassanTranslation.length,
      rwwadFinalCount: finalRwwadTranslation.length,
    })

    return {
      props: {
        slug: slug,
        chapters: chaptersInfo,
        subjective: {
          ...subjective,
          verses: finalRwwadTranslation, // Use rwwad as primary for this route
        },
        allTranslations: {
          vietnamese_hassan: finalHassanTranslation,
          vietnamese_rwwad: finalRwwadTranslation,
        },
        title: subjective.title,
        backLink: "/vietnamese_rwwad/subjective",
        mode: "verse",
        key: slug,
        loading: false, // Set to false since data is loaded at build time
      },
      revalidate: 60,
    }
  } catch (error) {
    console.error("Error in getStaticProps for vietnamese_rwwad:", error)
    return {
      notFound: true,
    }
  }
}

export async function getStaticPaths() {
  try {
    const subjectives = await getAllSubjectives()
    console.log(`Generated vietnamese_rwwad paths for ${subjectives?.length || 0} subjectives`)

    const paths =
      subjectives?.map((subjective) => ({
        params: { slug: encodeURI(subjective.slug) },
      })) || []

    return {
      paths,
      fallback: "blocking", // This enables skeleton loading for paths not pre-generated
    }
  } catch (error) {
    console.error("Error in getStaticPaths for vietnamese_rwwad:", error)
    return {
      paths: [],
      fallback: "blocking",
    }
  }
}
