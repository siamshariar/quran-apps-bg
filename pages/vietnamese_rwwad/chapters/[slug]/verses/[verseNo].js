import { server, config } from "../../../../../lib/config";
import { getChaptersInfo, getVerseDetails } from "../../../../../lib/fetch";
import Layout from "../../../../../components/layouts/layout-chapter";
import Meta from "../../../../../components/core/meta";
import ChapterContent from "../../../../../components/layout2/surah/content";

export default function Verse({
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
        title={`Chapter ${chapterName} : Verse ${verses[0].verseNo} | ${config?.metaTitle}`}
        description={`${verses[0].translation} | ${config?.metaDescription}`}
        url={`${server}/vietnamese_rwwad/chapters/${chapterSlug}/verses/${verses[0].verseNo}`}
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
        // prevChapter={prevChapter}
        // nextChapter={nextChapter}
        chapters={chapters}
        loading={loading}
      />
    </>
  );
}

Verse.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export async function getStaticProps(context) {
  const slug = encodeURI(context.params.slug);
  const chapterNo = Number.parseInt(slug);
  const verseNo = context.params.verseNo;

  try {
    const [rwwadVerseDetails, hassanVerseDetails, chaptersInfo] = await Promise.all([
      getVerseDetails(chapterNo, verseNo, "vietnamese_rwwad"),
      getVerseDetails(chapterNo, verseNo, "vietnamese_hassan"),
      getChaptersInfo(),
    ])

    if (!rwwadVerseDetails) {
      return { notFound: true }
    }

  // const chapterNo = details.chapter.chapterNo;

  return {
    props: {
      chapterNo: chapterNo,
      chapterName: chaptersInfo[chapterNo - 1].name,
      chapterSlug: chaptersInfo[chapterNo - 1].slug,
      chapterMp3Url: chaptersInfo[chapterNo - 1].mp3Url,
      verses: [rwwadVerseDetails],
      allTranslations: {
        vietnamese_hassan: [hassanVerseDetails],
        vietnamese_rwwad: [rwwadVerseDetails],
      },
      chapters: chaptersInfo,
      contentTitle: `${chaptersInfo[chapterNo - 1].name} : Câu ${rwwadVerseDetails.verseNo}`,
      mode: "verse",
      key: uniqueKey(chapterNo, verseNo),
      loading: false,
    },
    revalidate: 60,
  }
} catch (error) {
  return { notFound: true }
}
}

export async function getStaticPaths() {
  const chapters = await getChaptersInfo();
  const paths = [];

  chapters.forEach((chapter) => {
    const slug = encodeURI(chapter.slug)


    for (let i = 1; i <= 5; i++) {
      paths.push({
        params: {
          slug: slug,
          verseNo: String(i),
        },
      });
    }
  });

  return {
    paths: paths,
    fallback: "blocking",
  };
}

const uniqueKey = (chapterNo, verseNo) => {
  let s1 = "0000" + chapterNo;
  s1 = s1.substr(s1.length - 3);

  let s2 = "0000" + verseNo;
  s2 = s2.substr(s2.length - 3);

  return s1 + s2;
};
