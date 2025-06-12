import { useState, useEffect, useRef } from 'react';
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
import IconButton from "@mui/material/IconButton";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const Layout = ({ children }) => {
  // const [searchModalOpen, updateSearchModalOpen] = useState(false)

  // const searchModalController = open => {
  //     updateSearchModalOpen(open)
  // }
  const [showScrollButton, setShowScrollButton] = useState(false)
  const [isScrolling, setIsScrolling] = useState(false)
  const scrollToTopRef = useRef(null)
  const [headerVisible, setHeaderVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [scrollDirection, setScrollDirection] = useState("up")

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.pageYOffset

      if (!isScrolling) {
        setShowScrollButton(currentScrollY > 300)
      }

      if (Math.abs(currentScrollY - lastScrollY) < 5) {
        return
      }

      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        if (headerVisible) {
          setHeaderVisible(false)
          setScrollDirection("down")
        }
      } else if (currentScrollY < lastScrollY) {
        if (!headerVisible) {
          setHeaderVisible(true)
          setScrollDirection("up")
        }
      }

      if (currentScrollY <= 80) {
        setHeaderVisible(true)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isScrolling, lastScrollY, headerVisible])

  const scrollToTop = () => {
    if (isScrolling) return
    
    setIsScrolling(true)
    const scrollToTopEvent = new CustomEvent("scrollToTop", {
      detail: { shouldScrollToTop: true },
    })
    document.dispatchEvent(scrollToTopEvent)
    
    setTimeout(() => {
      setIsScrolling(false)
    }, 1000)
  }

  const getSidenavMarginTop = () => {
    if (headerVisible) {
      return 90 
    } else if (scrollDirection === "up") {
      return 100
    } else {
      return 24
    }
  }

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
              headerVisible={headerVisible}
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
                  <Sidenav
                    chapters={children.props.chapters}
                    headerVisible={headerVisible}
                    scrollDirection={scrollDirection}
                    marginTop={getSidenavMarginTop()}
                  />

                  {children}
                </div>
              </main>

              {/* Scroll to Top Button - Web */}
              {showScrollButton && (
                <IconButton
                  ref={scrollToTopRef}
                  onClick={scrollToTop}
                  sx={{
                    position: "fixed",
                    bottom: 50,
                    right: 32,
                    backgroundColor: "var(--bg22)",
                    color: "var(--main-color)",
                    boxShadow: "var(--bs11)",
                    transition: "all 0.5s ease",
                    display: { xs: "none", sm: "flex" },
                    width: 48,
                    height: 48,
                    zIndex: 1000,
                  }}
                  aria-label="scroll to top"
                >
                  <KeyboardArrowUpIcon />
                </IconButton>
              )}

              {/* Scroll to Top Button - Mobile */}
              {showScrollButton && (
                <IconButton
                  onClick={scrollToTop}
                  sx={{
                    position: "fixed",
                    bottom: 20,
                    right: 16,
                    backgroundColor: "var(--bg22)",
                    color: "var(--main-color)",
                    boxShadow: "var(--bs11)",
                    transition: "all 0.5s ease",
                    display: { xs: "flex", sm: "none" },
                    width: 40,
                    height: 40,
                    zIndex: 1000,
                  }}
                  aria-label="scroll to top"
                >
                  <KeyboardArrowUpIcon fontSize="small" />
                </IconButton>
              )}

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
