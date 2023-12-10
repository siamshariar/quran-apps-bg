import { server } from "../lib/config";
import { getChaptersInfo } from "../lib/fetch";
import Layout from "../components/layouts/layout-content";
import Meta from "../components/core/meta";
import IQGWContent from "../components/pages/is-quran-god-word";

export default function ContentPage({ pageTitle }) {
  return (
    <>
      <Meta
        title={`Is the Quran God’s word - ${pageTitle}`}
        description="Is the Quran God’s word. Quran application in Vietnamese."
        url={`${server}/is-quran-god-word`}
        image={`${server}/img/s_logo.png`}
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
      pageTitle: "Know more about the Quran",
      bgColor: "primary",
    },
  };
}
