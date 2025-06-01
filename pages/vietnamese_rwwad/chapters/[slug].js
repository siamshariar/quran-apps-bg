import { server, config } from "../../../lib/config";
import { getChaptersInfo, getChapterDetails } from "../../../lib/fetch";
import Layout from "../../../components/layouts/layout-chapter";
import Meta from "../../../components/core/meta";
import ChapterContent from "../../../components/layout2/surah/content";

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
  loading
}) {
  return (
    <>
      <Meta
        title={`Chapter ${chapterName} | ${config?.metaTitle}`}
        description={`Chapter ${chapterName}. ${config?.metaDescription}`}
        url={`${server}/vietnamese_rwwad/chapters/${chapterSlug}`}
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
  );
}

Chapter.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export async function getStaticProps(context) {
  const slug = decodeURIComponent(context.params.slug); // use decode, not encode here
  const chaptersInfo = await getChaptersInfo();
  const chapter = chaptersInfo.find((ch) => ch.slug === slug);
  if (!chapter) {
    return { notFound: true };
  }

  const chapterNo = chapter.id || chapter.chapterNo

  try {
    const [chapterDetails, defaultTranslation] = await Promise.all([
      getChapterDetails(chapterNo, "vietnamese_rwwad"),
      getChapterDetails(chapterNo, "vietnamese_hassan"),
    ])

    return {
      props: {
        chapterNo: chapterDetails.chapterNo,
        chapterName: chapter.name,
        chapterSlug: chapter.slug,
        chapterMp3Url: chapterDetails.mp3Url,
        verses: chapterDetails.verses,
        allTranslations: {
          vietnamese_hassan: defaultTranslation.verses,
          vietnamese_rwwad: chapterDetails.verses,
        },
        chapters: chaptersInfo,
        contentTitle: chapter.name,
        mode: "chapter",
        key: chapterDetails.chapterNo,
        loading: false,
      },
    };
  } catch (error) {
    console.error(`Error loading chapter ${chapterNo} (${slug}):`, error);
    return { notFound: true }; // fallback to 404
  }
}


export async function getStaticPaths() {
  const chapters = await getChaptersInfo();

  const paths = chapters.map((chapter) => ({
    params: { slug: encodeURIComponent(chapter.slug) },
  }));

  return {
    paths,
    fallback: "blocking", // helps during export
  };
}
