import { server, config } from "../../lib/config";
import { getChaptersInfo, getSubjectives } from "../../lib/fetch";
import Layout from "../../components/layouts/layout-subjective";
import Meta from "../../components/core/meta";
import SubjectiveList from "../../components/subjective/list";
import { t } from "../../lib/config";

export default function Subjective({ chapters, subjectives, loading }) {
  return (
    <>
      <Meta
        title={`${t('Subjective')} | ${config?.metaTitle}`}
        description={`Subjective form the holy Quran | ${config?.metaDescription}`}
        url={`${server}/subjective`}
        image={`${server}/img/logo/${config?.localizationCode}/s_logo.png`}
        type="website"
      />

      <SubjectiveList
        chapters={chapters}
        subjectives={subjectives}
        contentTitle={t('Subjective')}
        loading={loading}
      />
    </>
  );
}

Subjective.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export async function getStaticProps() {
  const chaptersInfo = await getChaptersInfo();
  const subjectives = await getSubjectives();

  return {
    props: {
      subjectives: subjectives,
      chapters: chaptersInfo,
      title: "Subjective",
      backLink: "/",
      mode: "list",
    },
  };
}
