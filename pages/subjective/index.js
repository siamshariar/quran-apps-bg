import { server } from "../../lib/config";
import { getChaptersInfo, getSubjectives } from "../../lib/fetch";
import Layout from "../../components/layouts/layout-subjective";
import Meta from "../../components/core/meta";
import SubjectiveList from "../../components/subjective/list";

export default function Subjective({ chapters, subjectives }) {
  return (
    <>
      <Meta
        title={`Subjective`}
        description={`Subjective form the holy Quran`}
        url={`${server}/subjective`}
        image={`${server}/img/s_logo.png`}
        type="website"
      />

      <SubjectiveList
        chapters={chapters}
        subjectives={subjectives}
        contentTitle="Subjective"
      />
    </>
  );
}

Subjective.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export async function getStaticProps() {
  const chaptersInfo = await getChaptersInfo();
  const subjectives = await getSubjectives();

  return {
    props: {
      subjectives: subjectives,
      chapters: chaptersInfo,
      title: "Subjective",
      backLink: "/",
      mode: "list",
    },
  };
}
