import { server, config, t } from "../../../lib/config"
import { getChaptersInfo, getChapterDetails, getChapterTransliteration } from "../../../lib/fetch"
import Layout from "../../../components/layouts/layout-chapter"
import Meta from "../../../components/core/meta"
import ChapterContent from "../../../components/layout2/surah/content"

export default function Chapter({
  chapters,
  chapterNo,
  chapterName,
  chapterSlug,
  chapterMp3Url,
  verses,
  allTranslations,
  contentTitle,
  mode,
  loading,
  translation,
}) {
  return (
    <>
      <Meta
        title={`${t("Chapter")} ${chapterName} | ${config?.metaTitle}`}
        description={`Chapter ${chapterName}. ${config?.metaDescription}`}
        url={`${server}/${translation}/chapters/${chapterSlug}`}
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
      />
    </>
  )
}

Chapter.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}

export async function getStaticProps(context) {
  const translation = context.params.translation || "vietnamese_hassan"
  const slug = encodeURI(context.params.slug)
  const chapterNo = Number.parseInt(slug)

  try {
    console.log(`Fetching data for chapter ${chapterNo}`)

    const [chapterDetails, defaultTranslation, rwwadTranslation, transliterationData, chaptersInfo] = await Promise.all(
      [
        getChapterDetails(chapterNo, translation),
        getChapterDetails(chapterNo, "vietnamese_hassan"),
        getChapterDetails(chapterNo, "vietnamese_rwwad"),
        getChapterTransliteration(chapterNo), // This now uses enhanced fallback
        getChaptersInfo(),
      ],
    )

    if (!chapterDetails || !chaptersInfo || !chaptersInfo[chapterNo - 1]) {
      return {
        notFound: true,
      }
    }

    // Prepare all translations object
    const allTranslations = {
      vietnamese_hassan: defaultTranslation?.verses || [],
      vietnamese_rwwad: rwwadTranslation?.verses || [],
    }

    // Add transliteration if available (API or fallback)
    if (transliterationData && transliterationData.verses) {
      allTranslations.english_transliteration = transliterationData.verses
      console.log(`Transliteration loaded for chapter ${chapterNo}:`, transliterationData.verses.length, "verses")
    }

    console.log("Final allTranslations:", {
      hasVietnameseHassan: !!allTranslations.vietnamese_hassan?.length,
      hasVietnameseRwwad: !!allTranslations.vietnamese_rwwad?.length,
      hasTransliteration: !!allTranslations.english_transliteration?.length,
      transliterationCount: allTranslations.english_transliteration?.length || 0,
    })

    return {
      props: {
        chapterNo: chapterDetails.chapterNo,
        chapterName: chaptersInfo[chapterNo - 1].name,
        chapterSlug: chaptersInfo[chapterNo - 1].slug,
        chapterMp3Url: chapterDetails.mp3Url,
        verses: chapterDetails.verses,
        allTranslations,
        chapters: chaptersInfo,
        contentTitle: chaptersInfo[chapterNo - 1].name,
        mode: "chapter",
        key: chapterDetails.chapterNo,
        translation: translation,
      },
      revalidate: 86400,
    }
  } catch (error) {
    console.error("Error in getStaticProps:", error)
    return {
      notFound: true,
    }
  }
}

export async function getStaticPaths() {
  const chapters = await getChaptersInfo()
  const translations = ["vietnamese_rwwad"]

  const paths = chapters.flatMap((chapter) =>
    translations.map((translation) => ({
      params: {
        slug: chapter.slug,
        translation: translation,
      },
    })),
  )

  return {
    paths,
    fallback: false,
  }
}
