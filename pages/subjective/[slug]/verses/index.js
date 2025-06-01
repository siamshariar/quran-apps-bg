import { server, config } from "../../../../lib/config";
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
        title={`Subjective ${name} | ${config?.metaTitle}`}
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
      />
    </>
  );
}

Subjective.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export async function getStaticProps(context) {
  try {
  const slug = encodeURI(context.params.slug)

    const [chaptersInfo, subjective] = await Promise.all([getChaptersInfo(), getSubjectiveVersesBySlug(slug)])

  if (!subjective) {
    return {
      notFound: true,
    };
  }

    const verseIds =
      subjective.verses?.map((verse) => {
        return `${verse.chapter?.chapterNo || verse.chapterNo}:${verse.verseNo}`
      }) || []

    const [hassanTranslation, rwwadTranslation] = await Promise.all([
      verseIds.length > 0 ? getSubjectiveVersesByTranslation(verseIds, "vietnamese_hassan") : [],
      verseIds.length > 0 ? getSubjectiveVersesByTranslation(verseIds, "vietnamese_rwwad") : [],
    ])

    const finalHassanTranslation = hassanTranslation?.length > 0 ? hassanTranslation : subjective.verses || []
    const finalRwwadTranslation = rwwadTranslation?.length > 0 ? rwwadTranslation : subjective.verses || []

  return {
    props: {
      slug: slug,
      chapters: chaptersInfo,
      subjective,
      allTranslations: {
        vietnamese_hassan: finalHassanTranslation,
        vietnamese_rwwad: finalRwwadTranslation,
      },
      title: subjective.title,
      backLink: "/subjective",
      mode: "verse",
      key: slug,
      loading: false, 
      },
      revalidate: 60,
    }
  } catch (error) {
    return {
      notFound: true,
    }
  };
}

export async function getStaticPaths() {
  try {
    const subjectives = await getAllSubjectives()
    const paths =
  subjectives?.map((subjective) => ({
    params: { slug: encodeURI(subjective.slug) },
      })) || []

  return {
      paths,
      fallback: "blocking", 
    }
  } catch (error) {
    return {
    paths: [],
    fallback: "blocking",
    }
  };
}
