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
  verses = [],
  allTranslations,
  contentTitle,
  mode,
  loading,
  translation,
}) {
  const verse = verses[0];

  if (!verse) {
    return <p>Verse not found.</p>;
  }

  return (
    <>
      <Meta
        title={`${t("Chapter")} ${chapterName} : Verse ${verse.verseNo} | ${config?.metaTitle}`}
        description={`${verse.translation || ""} | ${config?.metaDescription}`}
        url={`${server}/chapters/${chapterSlug}/verses/${verse.verseNo}`}
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
  const { slug, verseNo, translation = "vietnamese_hassan"} = context.params;
  const decodedSlug = decodeURIComponent(slug);
  const chapterNo = parseInt(decodedSlug.split("-")[0]);
  try {
  const [verseDetails, defaultTranslation, rwwadTranslation, chaptersInfo] = await Promise.all([
    getVerseDetails(chapterNo, verseNo, translation),
    getVerseDetails(chapterNo, verseNo, "vietnamese_hassan"),
    getVerseDetails(chapterNo, verseNo, "vietnamese_rwwad"),
    getChaptersInfo(),
  ])

  if (!verseDetails || !chaptersInfo[chapterNo - 1]) {
    return {
      notFound: true,
    };
  }

  const chapterData = chaptersInfo[chapterNo - 1];
  // const chapterNo = details.chapter.chapterNo;

  return {
    props: {
      chapterNo,
      chapterName: chapterData.name,
      chapterSlug: chapterData.slug,
      chapterMp3Url: chapterData.mp3Url,
      verses: [verseDetails],
      allTranslations: {
        vietnamese_hassan: [defaultTranslation],
        vietnamese_rwwad: [rwwadTranslation],
      },
      chapters: chaptersInfo,
      contentTitle: `${chapterData.name} : Câu ${verseDetails.verseNo}`,
      mode: "verse",
      key: uniqueKey(chapterNo, verseNo),
      translation,
    },
    revalidate: 60,
  };
} catch (error) {
  console.error("getStaticProps failed for:", { slug, verseNo, translation }, error);
  return { notFound: true };
}
}

export async function getStaticPaths() {
  const chapters = await getChaptersInfo();
  const translations = ["vietnamese_rwwad"];
  const paths = [];

  chapters.forEach((chapter) => {
    const slug = encodeURI(chapter.slug);
    const totalVerse = parseInt(chapter.totalVerse || "5");

    for (let i = 1; i <= Math.min(totalVerse, 5); i++) {
      translations.forEach((translation) => {
        paths.push({
          params: {
            slug,
            verseNo: String(i),
            translation,
        },
      })
      })
    }
  });

  return {
    paths,
    fallback: "blocking",
  };
}

const uniqueKey = (chapterNo, verseNo) => {
  const s1 = String(chapterNo).padStart(3, "0");
  const s2 = String(verseNo).padStart(3, "0");
  return s1 + s2;
};
