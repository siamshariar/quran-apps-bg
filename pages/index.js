import { server, config } from "../lib/config";
import { getChaptersInfo } from "../lib/fetch";
import Layout from "../components/layouts/layout-home";
import Meta from "../components/core/meta";
import Banner from "../components/layout2/home/banner";
import SearchSection from "../components/layout2/home/search-section";
import Collection from "../components/layout2/home/collection";
import ChapterList from "../components/layout2/home/chapter-list";

export default function Home({ chapters }) {
  return (
    <>
      <Meta
        title={config?.metaTitle}
        description={config?.metaDescription}
        url={server}
        image={`${server}/img/logo/${config?.localizationCode}/s_logo.png`}
        type="website"
      />

      <Banner />
      <SearchSection chapters={chapters}/>
      <Collection />
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
