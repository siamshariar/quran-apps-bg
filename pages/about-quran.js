import { server, config } from "../lib/config";
import { getChaptersInfo } from "../lib/fetch";
import Layout from "../components/layouts/layout-home";
import Meta from "../components/core/meta";
import Banner from "../components/layout2/home/banner";
import Container from "../components/core/container";
import AboutQuranContent from "../components/pages/about-quran";

export default function AboutQuran() {
  return (
    <>
      <Meta
        title={config?.metaTitle}
        description={config?.metaDescription}
        url={`${server}/about-quran`}
        image={`${server}/img/logo/${config?.localizationCode}/s_logo.png`}
        type="website"
      />

      <div className="view_on_mobile">
        <div className="content">
          <Container>
            <div className="content_wrapper">
              <AboutQuranContent />
            </div>
          </Container>
        </div>
      </div>

      <div className="view_on_web" style={{ minHeight: "calc(100vh - 72px)" }}>
        <Banner />
        {/* <ChapterList chapters={chapters} /> */}
      </div>
    </>
  );
}

AboutQuran.getLayout = function getLayout(page) {
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
