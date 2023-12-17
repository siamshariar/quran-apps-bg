import { server, config } from "../lib/config";
import { getChaptersInfo } from "../lib/fetch";
import Layout from "../components/layouts/layout-content";
import Meta from "../components/core/meta";
import ContactContent from "../components/pages/contact";

export default function ContentPage({ pageTitle }) {
  return (
    <>
      <Meta
        title={`${pageTitle} | ${config?.metaTitle}`}
        description={`${config?.metaTitle} For all inquiries, please email us. We'll get back to you as soon as we can insha'Allah.`}
        url={`${server}/contact`}
        image={`${server}/img/logo/${config?.localizationCode}/s_logo.png`}
        type="website"
      />

      <ContactContent />
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
    props: { chapters, pageTitle: "Contact", bgColor: "primary" },
  };
}
