import { server, config } from "../lib/config";
import { getChaptersInfo } from "../lib/fetch";
import Layout from "../components/layouts/layout-content";
import Meta from "../components/core/meta";
import IQGWContent from "../components/pages/is-quran-god-word";
import { t } from "../lib/config";

export default function ContentPage({ pageTitle }) {
  return (
    <>
      <Meta
        title={`${config.content.is_quran_god_word.title} - ${pageTitle} | ${config?.metaTitle}`}
        description={`${config.content.is_quran_god_word.title} ${config?.metaDescription}`}
        url={`${server}/is-quran-god-word`}
        image={`${server}/img/logo/${config?.localizationCode}/s_logo.png`}
        type="website"
      />

      <IQGWContent page_title={pageTitle} />
    </>
  );
}

ContentPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export async function getStaticProps(context) {
  const chapters = await getChaptersInfo();

  if (!chapters) {
    return {
      notFound: true,
    };
  }

  // Pass data to the page via props
  return {
    props: {
      chapters,
      pageTitle: t('Know more about the Quran'),
      bgColor: "primary",
    },
  };
}
