import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const useLoader = () => {
  const loadingPaths = ["/chapters", "/subjective"];
  const router = useRouter();

  const [loading, setLoading] = useState(
    loadingPaths.some((path) => router.pathname.startsWith(path))
  );
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const handleStart = (url) => {
      if (loadingPaths.some((path) => url.startsWith(path))) {
        setLoading(true);
        setLoaded(false);
      } else {
        setLoading(false);
        setLoaded(false);
      }
    };

    const handleComplete = () => {
      setLoaded(true);
      setTimeout(() => {
        setLoading(false);
      }, 500);
    };

    const startLoading = setTimeout(() => {
      setLoading(false);
    }, 500);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      clearTimeout(startLoading);
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router.events]);

  return { loading, loaded };
};

export default useLoader;
