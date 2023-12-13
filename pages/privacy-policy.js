import { server, config } from "../lib/config";
import { getChaptersInfo } from "../lib/fetch";
import Layout from "../components/layouts/layout-content";
import Meta from "../components/core/meta";
import PrivacyPolicyContent from "../components/pages/privacy-policy";

export default function ContentPage({ pageTitle }) {
  return (
    <>
      <Meta
        title={`${pageTitle} | ${config?.metaTitle}`}
	      description={config?.metaDescription}
        url={`${server}/privacy-policy`}
        image={`${server}/img/s_logo.png`}
        type="website"
      />

      <PrivacyPolicyContent />
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
      chapters, //
      pageTitle: "Privacy Policy",
      bgColor: "primary",
    },
  };
}
