import { server, config } from "../lib/config";
import { getChaptersInfo } from "../lib/fetch";
import Layout from "../components/layouts/layout-content";
import Meta from "../components/core/meta";
import DownloadContent from "../components/pages/download";
import { t } from "../lib/config";

export default function DownloadPage({ chapters, pageTitle }) {
  return (
    <>
      <Meta
        title={`${pageTitle} | ${config?.metaTitle}`}
        description={`${pageTitle} | ${config?.metaDescription}`}
        url={`${server}/download`}
        image={`${server}/img/logo/${config?.localizationCode}/s_logo.png`}
        type="website"
      />

      <DownloadContent chapters={chapters} />
    </>
  );
}

DownloadPage.getLayout = function getLayout(page) {
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
    pageTitle: t('Download audio and pdf'),
    bgColor: 'secondary',
  },
};
}
