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
  contentTitle,
  mode,
}) {
  return (
    <>
      <Meta
        title={`Chapter ${chapterName} | ${config?.metaTitle}`}
        description={`Chapter ${chapterName}. ${config?.metaDescription}`}
        url={`${server}/chapters/${chapterSlug}`}
        image={`${server}/img/s_logo.png`}
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
        // suraTranslation={suraTranslation}
        // prevChapter={prevChapter}
        // nextChapter={nextChapter}
        chapters={chapters}
      />
    </>
  );
}

Chapter.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export async function getStaticProps(context) {
  const slug = encodeURI(context.params.slug);
  const chapterNo = parseInt(slug);
  const chapterDetails = await getChapterDetails(chapterNo);
  const chaptersInfo = await getChaptersInfo();

  return {
    props: {
      chapterNo: chapterDetails.chapterNo,
      chapterName: chaptersInfo[chapterNo - 1].name,
      chapterSlug: chaptersInfo[chapterNo - 1].slug,
      chapterMp3Url: chapterDetails.mp3Url,
      verses: chapterDetails.verses,
      chapters: chaptersInfo,
      contentTitle: chaptersInfo[chapterNo - 1].name,
      mode: "chapter",
      key: chapterDetails.chapterNo,
    },
  };
}

export async function getStaticPaths() {
  const chapters = await getChaptersInfo();
  let paths = [];

  chapters.map((chapter) => {
    let slug = encodeURI(chapter.slug);
    let obj = { params: { slug: slug } };
    paths.push(obj);
  });

  return {
    paths: paths,
    fallback: false,
  };
}
