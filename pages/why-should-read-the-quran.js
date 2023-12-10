import { server } from "../lib/config";
import { getChaptersInfo } from "../lib/fetch";
import Layout from "../components/layouts/layout-content";
import Meta from "../components/core/meta";
import WNTRQContent from "../components/pages/why-need-to-read-quran";

export default function ContentPage({ pageTitle }) {
  return (
    <>
      <Meta
        title={`Why should read Quran - ${pageTitle}`}
        description="Why should read Quran. Quran application in Vietnamese."
        url={`${server}/why-should-read-the-quran`}
        image={`${server}/img/s_logo.png`}
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
      pageTitle: "Know more about the Quran",
      bgColor: "primary",
    },
  };
}
