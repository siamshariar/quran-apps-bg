import { server, config } from "../lib/config";
import { getChaptersInfo, getVersesByQuery } from "../lib/fetch";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import SettingsContextProvider from "../contexts/SettingsContext";
import AudioPlayerContextProvider from "../contexts/AudioPlayerContext";
import PinContextProvider from "../contexts/PinContext";
import BookmarkContextProvider from "../contexts/BookmarkContext";
import SidenavContextProvider from "../contexts/SidenavContext";
import Meta from "../components/core/meta";
import HeaderWeb from "../components/layout2/web/header";
import HeaderMobile from "../components/mobile/header-subjective";
import FooterWeb from "../components/web/footer";
import FooterMobile from "../components/mobile/footer-home";
import ArabicDialog from "../components/core/arabic-dialog";
import BookmarkContent from "../components/bookmark/page";
import AudioPlayer from "../components/surah/audio-player";
import BookmarkMobile from "../components/mobile/bookmark/index";

const fetcher = async (bookmarkVersesStr) => {
  return await getVersesByQuery(bookmarkVersesStr);
};

export default function Bookmark({ chapters }) {
  const router = useRouter();
  const { key } = router.query;
  const [bookmarkName, setBookmarkName] = useState(null);
  const [bookmarkVersesStr, setBookmarkVersesStr] = useState(null);
  const [isExists, setExists] = useState(true);
  const [bookmarksData, setBookmarksData] = useState([]);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const savedBookmarks = localStorage.getItem("bookmarks");
    const bookmarks = JSON.parse(savedBookmarks);

    const queryKey = "key";
    const keyMatcher = router.asPath.match(
      new RegExp(`[&?]${queryKey}=(.*?)(&|$)`)
    );

    const x = window.matchMedia("(min-width: 1024px)");
    if (!x.matches && !keyMatcher && !key) {
      setIsMobile(true);
      return;
    } else {
      setIsMobile(false);
    }

    if (!keyMatcher) {
      router.push("/404");
      return <></>;
    }

    if (!key) {
      return <></>;
    }

    if (!bookmarks[key]) {
      router.push("/404");
      return <></>;
    }

    setBookmarkName(bookmarks[key].name);

    let verseStr = "";

    if (bookmarks.hasOwnProperty(key)) {
      if (bookmarks[key]["entry"].length > 0) {
        let verseArr = bookmarks[key]["entry"];
        verseArr.forEach((entry, index) => {
          verseStr = verseStr + entry.chapter + ":" + entry.verse;
          if (index < verseArr.length - 1) {
            verseStr += ",";
          }
        });
      } else {
        setExists(false);
      }
    }

    setBookmarkVersesStr(verseStr);
  }, [key]);

  const { data } = useSWR(
    bookmarkVersesStr,
    (bookmarkVersesStr) => fetcher(bookmarkVersesStr),
    { revalidateOnMount: true }
  );

  useEffect(() => {
    setBookmarksData(data);
  }, [data]);

  const updateBookmarksData = (chapter, verse) => {
    let updatedBookmarksData = bookmarksData.filter(
      (item) => !(item.chapter.chapterNo == chapter && item.verseNo == verse)
    );
    setBookmarksData(updatedBookmarksData);
  };

  if (isMobile) {
    return (
      <SettingsContextProvider>
        <PinContextProvider>
          <BookmarkContextProvider>
            <SidenavContextProvider>
              <Meta
                title={`Bookmark ${bookmarkName} | ${config?.metaTitle}`}
                description={`Quran Bookmark | ${config?.metaDescription}`}
                url={`${server}/bookmarks`}
                image={`${server}/img/s_logo.png`}
                type="website"
              />
              <HeaderMobile //
                title="Bookmarks & Pin"
                backLink="/"
              />
              <main id="viewport" className="viewport">
                <BookmarkMobile key={key} />
              </main>
              <FooterMobile />
            </SidenavContextProvider>
          </BookmarkContextProvider>
        </PinContextProvider>
      </SettingsContextProvider>
    );
  }

  return (
    <SettingsContextProvider>
      <PinContextProvider>
        <BookmarkContextProvider>
          <SidenavContextProvider>
            <Meta
              title={`Bookmark ${bookmarkName} | ${config?.metaTitle}`}
              description={`Bookmark ${bookmarkName} | ${config?.metaDescription}`}
              url={`${server}/bookmarks`}
              image={`${server}/img/s_logo.png`}
              type="website"
            />

            <ArabicDialog />

            {/* <SearchModal
                open={searchModalOpen}
                searchModalController={searchModalController}
            /> */}

            <HeaderWeb
              page="surah"
              chapters={chapters}
              isChapterPage={true}
              // searchModalController={searchModalController}
              hasSidenav={true}
            />

            <AudioPlayerContextProvider>
              <HeaderMobile //
                title={bookmarkName}
                backLink="/bookmarks"
              />

              <main
                id="viewport"
                className="viewport viewport_surah viewport_no_footer"
              >
                <BookmarkContent //
                  chapters={chapters}
                  name={bookmarkName}
                  data={bookmarksData}
                  exist={isExists}
                  isBookmarkPage={true}
                  key={key}
                  updateBookmarksData={updateBookmarksData}
                />
              </main>

              <AudioPlayer />
            </AudioPlayerContextProvider>

            <FooterWeb />
            {/* <FooterMobile /> */}
          </SidenavContextProvider>
        </BookmarkContextProvider>
      </PinContextProvider>
    </SettingsContextProvider>
  );
}

export async function getStaticProps() {
  const chaptersInfo = await getChaptersInfo();

  return {
    props: {
      chapters: chaptersInfo,
    },
  };
}
