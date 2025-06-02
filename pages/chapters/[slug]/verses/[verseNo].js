import { server, config, t } from "../../../../lib/config"
import { getChaptersInfo, getVerseDetails } from "../../../../lib/fetch"
import Layout from "../../../../components/layouts/layout-chapter"
import Meta from "../../../../components/core/meta"
import ChapterContent from "../../../../components/layout2/surah/content"

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
  loading,
  translation,
}) {
  return (
    <>
      <Meta
        title={`${t('Chapter')} ${chapterName} : Verse ${verses[0].verseNo} | ${config?.metaTitle}`}
        description={`${verses[0].translation} | ${config?.metaDescription}`}
        url={`${server}/chapters/${chapterSlug}/verses/${verses[0].verseNo}`}
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
  const translation = context.params.translation || "vietnamese_hassan"
  const slug = encodeURI(context.params.slug);
  const chapterNo = Number.parseInt(slug);
  const verseNo = context.params.verseNo;


  const [verseDetails, defaultTranslation, rwwadTranslation, chaptersInfo] = await Promise.all([
    getVerseDetails(chapterNo, verseNo, translation),
    getVerseDetails(chapterNo, verseNo, "vietnamese_hassan"),
    getVerseDetails(chapterNo, verseNo, "vietnamese_rwwad"),
    getChaptersInfo(),
  ])

  if (!verseDetails) {
    return {
      notFound: true,
    };
  }

  verseDetails.push(details);

  // const chapterNo = details.chapter.chapterNo;

  return {
    props: {
      chapterNo: chapterNo,
      chapterName: chaptersInfo[chapterNo - 1].name,
      chapterSlug: chaptersInfo[chapterNo - 1].slug,
      chapterMp3Url: chaptersInfo[chapterNo - 1].mp3Url,
      verses: [verseDetails],
      allTranslations: {
        vietnamese_hassan: [defaultTranslation],
        vietnamese_rwwad: [rwwadTranslation],
      },
      chapters: chaptersInfo,
      contentTitle: `${chaptersInfo[chapterNo - 1].name} : Câu ${verseDetails.verseNo}`,
      mode: "verse",
      key: uniqueKey(chapterNo, verseNo),
      translation: translation,
    },
    revalidate: 60,
  };
}

export async function getStaticPaths() {
  const chapters = await getChaptersInfo();
  const translations = ["vietnamese_rwwad"];
  const paths = [];

  chapters.forEach((chapter) => {
    const slug = encodeURI(chapter.slug);
    // let totalVerse = parseInt(chapter.totalVerse);

    for (let i = 1; i <= 5; i++) {
      translations.forEach((translation) => {
        paths.push({
          params: {
            slug: slug,
            verseNo: String(i),
            translation: translation,
        },
      })
      })
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
