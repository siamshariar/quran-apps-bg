import { server, config } from "../lib/config";
import { getChaptersInfo } from "../lib/fetch";
import Layout from "../components/layouts/layout-content";
import Meta from "../components/core/meta";
import WNTRQContent from "../components/pages/why-need-to-read-quran";
import { t } from "../lib/config";

export default function ContentPage({ pageTitle }) {
  return (
    <>
      <Meta
        title={`${config.content.why_should_read_quran.title} - ${pageTitle} | ${config?.metaTitle}`}
        description={`${config.content.why_should_read_quran.title} ${config?.metaDescription}`}
        url={`${server}/why-should-read-the-quran`}
        image={`${server}/img/logo/${config?.localizationCode}/s_logo.png`}
        type="website"
      />

      <WNTRQContent page_title={pageTitle} />
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
