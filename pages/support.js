import { server } from "../lib/config";
import { getChaptersInfo } from "../lib/fetch";
import Layout from "../components/layouts/layout-content";
import Meta from "../components/core/meta";
import SupportContent from "../components/pages/support";

export default function ContentPage({ pageTitle }) {
  return (
    <>
      <Meta
        title={`${pageTitle}`}
        description="Please mail us if you want to support. Any kind of support is highly appreciable. Email: deeniinfotech@gmail.com"
        url={`${server}/support`}
        image={`${server}/img/s_logo.png`}
        type="website"
      />

      <SupportContent />
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
      pageTitle: "Support",
      bgColor: "primary",
    },
  };
}
