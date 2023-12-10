//import { useState } from 'react'
import SettingsContextProvider from "../../contexts/SettingsContext";
import AudioPlayerContextProvider from "../../contexts/AudioPlayerContext";
import PinContextProvider from "../../contexts/PinContext";
import BookmarkContextProvider from "../../contexts/BookmarkContext";
import SidenavContextProvider from "../../contexts/SidenavContext";
//import Viewport from '../../../components/core/viewport'
//import SearchModal from '../../../components/core/search-modal'
import HeaderWeb from "../layout2/web/header";
import HeaderMobile from "../mobile/header-chapter";
//import FooterMobile from '../../../components/mobile/footer-chapter'
import AudioPlayer from "../surah/audio-player";
import FooterWeb from "../web/footer";
import ArabicDialog from "../core/arabic-dialog";
import Sidenav from "../layout2/sidenav";
import styles from "./index.module.scss";

// import { chapters } from "../../data/chapters";

const Layout = ({ children }) => {
  // const [searchModalOpen, updateSearchModalOpen] = useState(false)

  // const searchModalController = open => {
  //     updateSearchModalOpen(open)
  // }

  return (
    <SettingsContextProvider>
      <PinContextProvider>
        <BookmarkContextProvider>
          <SidenavContextProvider>
            <ArabicDialog />

            {/* <SearchModal
              open={searchModalOpen}
              searchModalController={searchModalController}
            /> */}

            <HeaderWeb
              page="surah"
              chapters={children.props.chapters}
              isChapterPage={true}
              // searchModalController={searchModalController}
              hasSidenav={true}
            />

            <AudioPlayerContextProvider>
              <HeaderMobile
                contentTitle={children.props.contentTitle}
                chapterNo={children.props.chapterNo}
                chapters={children.props.chapters}
                // chapterName={chapterName}
              />

              <main
                id="viewport"
                className="viewport viewport_surah viewport_no_footer"
              >
                <div className={styles.content}>
                  <Sidenav chapters={children.props.chapters} />

                  {children}
                </div>
              </main>

              <AudioPlayer />
            </AudioPlayerContextProvider>

            {children.props.mode === "chapter" && <FooterWeb />}

            {/* <FooterMobile /> */}
          </SidenavContextProvider>
        </BookmarkContextProvider>
      </PinContextProvider>
    </SettingsContextProvider>
  );
};

export default Layout;
