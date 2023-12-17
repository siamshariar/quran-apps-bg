import { server, config } from "../lib/config";
import { getChaptersInfo } from "../lib/fetch";
import Layout from "../components/layouts/layout-content";
import Meta from "../components/core/meta";
import WIQContent from "../components/pages/what-is-quran";

export default function WhatIsQuranPage({ pageTitle }) {
  return (
    <>
      <Meta
        title={`What is Quran - ${pageTitle} | ${config?.metaTitle}`}
        description={`What is Quran. ${config?.metaDescription}`}
        url={`${server}/what-is-quran`}
        image={`${server}/img/logo/${config?.localizationCode}/s_logo.png`}
        type="website"
      />

      <WIQContent page_title={pageTitle} />
    </>
  );
}

WhatIsQuranPage.getLayout = function getLayout(page) {
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
      pageTitle: "Know more about the Quran",
      bgColor: "primary",
    },
  };
}
