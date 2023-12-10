import { useEffect } from "react";
import { useRouter } from "next/router";
import * as gtag from "../lib/gtag";
// import NProgress from 'nprogress'
// import 'nprogress/nprogress.css'

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
    document.addEventListener("keydown", (e) => {
      if (
        e.key === "s" &&
        (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)
      ) {
        e.preventDefault();
      }
    });

    // document.addEventListener('contextmenu', (e) => {
    //   e.preventDefault()
    // })
  }, []);

  const getLayout = Component.getLayout || ((page) => page);

  return getLayout(<Component {...pageProps} />);
};

export default App;
