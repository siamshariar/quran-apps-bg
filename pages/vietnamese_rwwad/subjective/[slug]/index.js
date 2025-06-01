import { server, config } from "../../../../lib/config"
import { getChaptersInfo, getParentSubjectives, getParentSubjectiveBySlug } from "../../../../lib/fetch"
import Layout from "../../../../components/layouts/layout-subjective"
import Meta from "../../../../components/core/meta"
import SubjectiveList from "../../../../components/subjective/list"

export default function Subjective({ slug, chapters, subjective, loading }) {
  const name = subjective.title

  return (
    <>
      <Meta
        title={`Subjective ${name} | ${config?.metaTitle}`}
        description={`Subjective form the holy Quran | ${config?.metaDescription}`}
        url={`${server}/vietnamese_rwwad/subjective/${slug}`}
        image={`${server}/img/logo/${config?.localizationCode}/s_logo.png`}
        type="website"
      />

      <SubjectiveList
        chapters={chapters}
        subjectives={subjective.children}
        contentTitle={subjective.title}
        loading={loading}
        translationPrefix="/vietnamese_rwwad"
      />
    </>
  )
}

Subjective.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}

export async function getStaticProps(context) {
  const slug = context.params.slug
  const chaptersInfo = await getChaptersInfo()
  const subjective = await getParentSubjectiveBySlug(slug)

  if (!subjective) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      slug: slug,
      chapters: chaptersInfo,
      subjective,
      title: subjective.title,
      backLink: "/vietnamese_rwwad/subjective",
      mode: "list",
      key: slug,
    },
    revalidate: 60,
  }
}

export async function getStaticPaths() {
  const subjectives = await getParentSubjectives()
  const paths = []

  subjectives.map((subjective) => {
    const slug = encodeURI(subjective.slug)
    const obj = { params: { slug: slug } }
    paths.push(obj)
  })

  return {
    paths: paths,
    fallback: "blocking",
  }
}
