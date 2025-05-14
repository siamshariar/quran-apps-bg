import { useEffect } from "react";
import { useRouter } from "next/router";
import * as gtag from "../lib/gtag";
// import NProgress from 'nprogress'
// import 'nprogress/nprogress.css'
import useLoader from "../hooks/useLoader";
// import Loader from "../components/utils/Loader";

import "../styles/global.scss";

// Router.events.on('routeChangeStart', () => NProgress.start())
// Router.events.on('routeChangeComplete', () => NProgress.done())
// Router.events.on('routeChangeError', () => NProgress.done())

// function MyApp({ Component, pageProps }) {
//   return <Component {...pageProps} />
// }
//
// export default MyApp

const App = ({ Component, pageProps }) => {
  const router = useRouter();
  const loading = useLoader();

  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

    useEffect(() => {
    // Handle translation initialization
    const initializeTranslation = () => {
      const path = window.location.pathname;
      const isTranslationPath = path.startsWith('/vietnamese_');
      
      // If directly accessing root translation path, redirect to first chapter
      if (isTranslationPath && path.split('/').length === 2) {
        router.push(`${path}/chapters/1-al-fatihah`);
      }
    };

    if (typeof window !== 'undefined') {
      initializeTranslation();
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (
        e.key === "s" &&
        (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)
      ) {
        e.preventDefault();
      }
    });

    // DISABLED RIGHT CLICK/TAP ON MOBILE
    const x = window.matchMedia("(min-width: 1024px)");
    if (!x.matches) {
      // document.addEventListener('contextmenu', (event) => {
      //   event.preventDefault();
      // });

      window.addEventListener('contextmenu', function (e) {
        e.preventDefault();
      }, false);
    }
    // DISABLED RIGHT CLICK/TAP ON MOBILE
  }, []);

  const getLayout = Component.getLayout || ((page) => page);

  return (
    <>
      {/* {loading && <Loader />} */}
      {getLayout(<Component {...pageProps} loading={loading} />)}
    </>
  );
};

export default App;
