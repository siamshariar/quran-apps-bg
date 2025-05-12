import { server, config } from "../../../../lib/config";
import {
  getChaptersInfo,
  getAllSubjectives,
  getSubjectiveVersesBySlug,
} from "../../../../lib/fetch";
import Layout from "../../../../components/layouts/layout-subjective";
import Meta from "../../../../components/core/meta";
import SubjectiveVerses from "../../../../components/subjective/verses";

export default function Subjective({ slug, chapters, subjective, loading }) {
  const name = subjective.title;

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
        verses={subjective.verses}
        chapters={chapters}
        loading={loading}
      />
    </>
  );
}

Subjective.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export async function getStaticProps(context) {
  const slug = encodeURI(context.params.slug);
  const chaptersInfo = await getChaptersInfo();
  const subjective = await getSubjectiveVersesBySlug(slug);

  if (!subjective) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      slug: slug,
      chapters: chaptersInfo,
      subjective,
      title: subjective.title,
      backLink: "/subjective",
      mode: "verse",
      key: slug,
    },
    revalidate: 60,
  };
}

export async function getStaticPaths() {
  const subjectives = await getAllSubjectives();
  let paths = [];

  subjectives.map((subjective) => {
    let slug = encodeURI(subjective.slug);
    let obj = { params: { slug: slug } };
    paths.push(obj);
  });

  return {
    paths: paths,
    fallback: "blocking",
  };
}
