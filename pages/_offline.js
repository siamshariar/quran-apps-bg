import { server, config } from "../lib/config";
import { getChaptersInfo } from "../lib/fetch";
import Layout from "../components/layouts/layout-home";
import Meta from "../components/core/meta";
import styles from "../components/layout2/home/chapter-list.module.scss";
import Container from "../components/core/container";
import Grid from "@mui/material/Grid";

export default function Home() {
  return (
    <>
      <Meta
        title={config?.metaTitle}
        description={config?.metaDescription}
        url={server}
        image={`${server}/img/logo/${config?.localizationCode}/s_logo.png`}
        type="website"
      />

        <div className={styles.wrap}>
            <Container>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <div className={styles.offline_wrapper}>
                            <div className={styles.offline_title}>
                                No Internet Connection!
                            </div>
                            <div>
                                Kindly connect to the internet and refresh the pages. Once completed, you can access the content offline.
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </div>

      {/*<Banner />*/}
      {/*<ChapterList chapters={chapters} />*/}
    </>
  );
}

Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// export async function getStaticProps(context) {
//   const chapters = await getChaptersInfo();
//
//   if (!chapters) {
//     return {
//       notFound: true,
//     };
//   }
//
//   // Pass data to the page via props
//   return {
//     props: { chapters },
//   };
// }
