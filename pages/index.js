import { server, config } from "../lib/config";
import { getChaptersInfo } from "../lib/fetch";
import Layout from "../components/layouts/layout-home";
import Meta from "../components/core/meta";
import Banner from "../components/layout2/home/banner";
import ChapterList from "../components/layout2/home/chapter-list";

export default function Home({ chapters }) {
  return (
    <>
      <Meta
        title={config?.metaTitle}
        description={config?.metaDescription}
        url={server}
        image={`${server}/img/s_logo.png`}
        type="website"
      />

      <Banner />
      <ChapterList chapters={chapters} />
    </>
  );
}

Home.getLayout = function getLayout(page) {
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
    props: { chapters },
  };
}
