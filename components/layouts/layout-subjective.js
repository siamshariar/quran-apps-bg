import classNames from "classnames";
import SettingsContextProvider from "../../contexts/SettingsContext";
import AudioPlayerContextProvider from "../../contexts/AudioPlayerContext";
import PinContextProvider from "../../contexts/PinContext";
import BookmarkContextProvider from "../../contexts/BookmarkContext";
import SidenavContextProvider from "../../contexts/SidenavContext";
//import SearchModal from '../../../components/core/search-modal'
import HeaderWeb from "../../components/layout2/web/header";
import HeaderMobile from "../../components/mobile/header-subjective";
import FooterWeb from "../../components/web/footer";
import FooterMobile from "../../components/mobile/footer-home";
import AudioPlayer from "../../components/surah/audio-player";
import ArabicDialog from "../../components/core/arabic-dialog";
import Sidenav from "../layout2/sidenav";
import styles from "./index.module.scss";

const Layout = ({ children }) => {
  // const [searchModalOpen, updateSearchModalOpen] = useState(false)

  // const searchModalController = open => {
  //     updateSearchModalOpen(open)
  // }

  return (
    <SettingsContextProvider>
      <PinContextProvider>
        <BookmarkContextProvider>
          <AudioPlayerContextProvider>
            <SidenavContextProvider>
              {/* <SearchModal
                open={searchModalOpen}
                searchModalController={searchModalController}
            /> */}

              {children.props.mode === "verse" && <ArabicDialog />}

              <HeaderWeb
                page="surah"
                chapters={children.props.chapters}
                isChapterPage={true}
                // searchModalController={searchModalController}
                hasSidenav={true}
              />

              {/* TODO: Fix redirect */}
              <HeaderMobile
                title={children.props.title}
                backLink={children.props.backLink}
              />

              {/* TODO: fix for subjective verses page */}
              {/* <HeaderMobile
                title={children.props.title}
                backLink={
                  subjective.parentSlug == null
                    ? "/subjective"
                    : `/subjective/${subjective.parentSlug}`
                }
              /> */}

              <main
                id="viewport"
                className={classNames(
                  "viewport",
                  "viewport_surah",
                  children.props.mode === "verse" ? "viewport_no_footer" : ""
                )}
              >
                <div className={styles.content}>
                  <Sidenav chapters={children.props.chapters} />
                  {children}
                </div>
              </main>

              {children.props.mode === "verse" && <AudioPlayer />}

              <FooterWeb />

              {children.props.mode === "list" && <FooterMobile />}
            </SidenavContextProvider>
          </AudioPlayerContextProvider>
        </BookmarkContextProvider>
      </PinContextProvider>
    </SettingsContextProvider>
  );
};

export default Layout;
