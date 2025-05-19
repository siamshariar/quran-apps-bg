import { server, config } from "../lib/config";
import { getChaptersInfo, getVersesByQuery, getVerseDetails } from "../lib/fetch";
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
    const checkMobile = () => {
    const x = window.matchMedia("(min-width: 1024px)");
    if (!x.matches && !router.query.key) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [router.query.key]);

  useEffect(() => {
    const loadBookmarks = async () => {
      const savedBookmarks = JSON.parse(localStorage.getItem("bookmarks") || {});
      
      if (!key || !savedBookmarks[key]) {
        router.push("/404");
        return;
      }

      setBookmarkName(savedBookmarks[key].name);
      
      if (savedBookmarks[key].entry.length === 0) {
        setExists(false);
        return;
      }

      const versesData = await Promise.all(
        savedBookmarks[key].entry.map(async (item) => {
          const verseDetails = await getVerseDetails(
            item.chapter, 
            item.verse,
            item.translation 
          );
          return {
            ...verseDetails,
            chapter: {
              chapterNo: item.chapter,
              name: chapters[item.chapter - 1]?.name || '',
              slug: chapters[item.chapter - 1]?.slug || ''
            },
            bookmarkKey: key
          };
        })
      );

      setBookmarksData(versesData);
    };

    if (key) {
      loadBookmarks();
    }
  }, [key, chapters]);

  const updateBookmarksData = (chapter, verse, translation) => {
    const updatedBookmarksData = bookmarksData.filter(
      (item) => !(
        item.chapter.chapterNo == chapter && 
        item.verseNo == verse &&
        item.translation === translation
      )
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
                image={`${server}/img/logo/${config?.localizationCode}/s_logo.png`}
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
              image={`${server}/img/logo/${config?.localizationCode}/s_logo.png`}
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
