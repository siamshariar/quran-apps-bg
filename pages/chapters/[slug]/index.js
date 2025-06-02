import { server, config, t } from "../../../lib/config"
import { getChaptersInfo, getChapterDetails } from "../../../lib/fetch"
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
        title={`${t('Chapter')} ${chapterName} | ${config?.metaTitle}`}
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
        // suraTranslation={suraTranslation}
        // prevChapter={prevChapter}
        // nextChapter={nextChapter}
        chapters={chapters}
        loading={loading}
      />
    </>
  );
}

Chapter.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export async function getStaticProps(context) {
  const translation = context.params.translation || 'vietnamese_hassan'
  const slug = encodeURI(context.params.slug);
  const chapterNo = Number.parseInt(slug);

  const [chapterDetails, defaultTranslation, rwwadTranslation, chaptersInfo] = await Promise.all([
    getChapterDetails(chapterNo, translation),
    getChapterDetails(chapterNo, "vietnamese_hassan"),
    getChapterDetails(chapterNo, "vietnamese_rwwad"),
    getChaptersInfo(),
  ])

  return {
    props: {
      chapterNo: chapterDetails.chapterNo,
      chapterName: chaptersInfo[chapterNo - 1].name,
      chapterSlug: chaptersInfo[chapterNo - 1].slug,
      chapterMp3Url: chapterDetails.mp3Url,
      verses: chapterDetails.verses,
      allTranslations: {
        vietnamese_hassan: defaultTranslation.verses,
        vietnamese_rwwad: rwwadTranslation.verses,
      },
      chapters: chaptersInfo,
      contentTitle: chaptersInfo[chapterNo - 1].name,
      mode: "chapter",
      key: chapterDetails.chapterNo,
      translation: translation,
    },
    revalidate: 86400,
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
  };
}
