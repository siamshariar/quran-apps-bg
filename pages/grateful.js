import { server, config } from "../lib/config";
import { getChaptersInfo } from "../lib/fetch";
import Layout from "../components/layouts/layout-content";
import Meta from "../components/core/meta";
import GratefulContent from "../components/pages/grateful";

export default function ContentPage({ pageTitle }) {
  return (
    <>
      <Meta
        title={`${pageTitle} | ${config?.metaTitle}`}
        description={`${pageTitle} | ${config?.metaDescription}`}
        url={`${server}/grateful`}
        image={`${server}/img/logo/${config?.localizationCode}/s_logo.png`}
        type="website"
      />

      <GratefulContent />
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
    props: { chapters, pageTitle: "Grateful", bgColor: "primary" },
  };
}
