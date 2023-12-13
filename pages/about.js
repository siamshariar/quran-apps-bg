import { server, config } from "../lib/config";
import { getChaptersInfo } from "../lib/fetch";
import Layout from "../components/layouts/layout-content";
import Meta from "../components/core/meta";
import AboutContent from "../components/pages/about";

export default function AboutPage({ pageTitle }) {
  return (
    <>
      <Meta
        title={`${pageTitle} | ${config?.metaTitle}`}
        description={config?.metaDescription}
        url={`${server}/about`}
        image={`${server}/img/s_logo.png`}
        type="website"
      />

      <AboutContent />
    </>
  );
}

AboutPage.getLayout = function getLayout(page) {
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
    props: { chapters, pageTitle: "About", bgColor: "primary" },
  };
}
