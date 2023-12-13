import { server, config } from "../../../../lib/config";
import { getChaptersInfo, getVerseDetails } from "../../../../lib/fetch";
import Layout from "../../../../components/layouts/layout-chapter";
import Meta from "../../../../components/core/meta";
import ChapterContent from "../../../../components/layout2/surah/content";

export default function Verse({
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
        title={`Chapter ${chapterName} : Verse ${verses[0].verseNo} | ${config?.metaTitle}`}
        description={`${verses[0].translation} | ${config?.metaDescription}`}
        url={`${server}/chapters/${chapterSlug}/verses/${verses[0].verseNo}`}
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
        // prevChapter={prevChapter}
        // nextChapter={nextChapter}
        chapters={chapters}
      />
    </>
  );
}

Verse.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export async function getStaticProps(context) {
  const slug = encodeURI(context.params.slug);
  const chapterNo = parseInt(slug);
  const verseNo = context.params.verseNo;

  let verseDetails = [];
  const details = await getVerseDetails(chapterNo, verseNo);

  if (!details) {
    return {
      notFound: true,
    };
  }

  verseDetails.push(details);

  // const chapterNo = details.chapter.chapterNo;
  const chaptersInfo = await getChaptersInfo();

  return {
    props: {
      chapterNo: chapterNo,
      chapterName: chaptersInfo[chapterNo - 1].name,
      chapterSlug: chaptersInfo[chapterNo - 1].slug,
      chapterMp3Url: chaptersInfo[chapterNo - 1].mp3Url,
      verses: verseDetails,
      chapters: chaptersInfo,
      contentTitle: `${chaptersInfo[chapterNo - 1].name} : Câu ${
        verseDetails[0].verseNo
      }`,
      mode: "verse",
      key: uniqueKey(chapterNo, verseNo),
    },
    revalidate: 60,
  };
}

export async function getStaticPaths() {
  const chapters = await getChaptersInfo();
  let paths = [];

  chapters.map((chapter) => {
    let slug = encodeURI(chapter.slug);
    // let totalVerse = parseInt(chapter.totalVerse);

    for (let i = 1; i <= 0; i++) {
      let obj = {
        params: {
          slug: slug,
          verseNo: String(i),
        },
      };
      paths.push(obj);
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
