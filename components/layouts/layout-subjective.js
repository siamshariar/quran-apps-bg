import { useState, useEffect } from 'react'
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
import IconButton from '@mui/material/IconButton';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useTheme } from '@mui/material/styles';

const Layout = ({ children }) => {
  const [showScrollButton, setShowScrollButton] = useState(false)
  const [headerVisible, setHeaderVisible] = useState(true)
  const [isScrolling, setIsScrolling] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [scrollDirection, setScrollDirection] = useState("up")
  // const [searchModalOpen, updateSearchModalOpen] = useState(false)

  // const searchModalController = open => {
  //     updateSearchModalOpen(open)
  // }
  const theme = useTheme();

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

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isScrolling, lastScrollY, headerVisible]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

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
                headerVisible={headerVisible}
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
                  <Sidenav chapters={children.props.chapters} headerVisible={headerVisible} marginTop={getSidenavMarginTop()}/>
                  {children}
                </div>
              </main>

              {/* Scroll to Top Button - Web */}
              {showScrollButton && (
                <IconButton
                  onClick={scrollToTop}
                  sx={{
                    position: 'fixed',
                    bottom: 50,
                    right: 32,
                    backgroundColor: 'var(--bg22)',
                    color: 'var(--main-color)',
                    boxShadow: 'var(--bs11)',
                    transition: 'all 0.5s ease',
                    display: { xs: 'none', sm: 'flex' },
                    width: 48,
                    height: 48,
                    zIndex: 1000
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
                    position: 'fixed',
                    bottom: 20,
                    right: 16,
                    backgroundColor: 'var(--bg22)',
                    color: 'var(--main-color)',
                    boxShadow: 'var(--bs11)',
                    transition: 'all 0.5s ease',
                    display: { xs: 'flex', sm: 'none' },
                    width: 40,
                    height: 40,
                    zIndex: 1000
                  }}
                  aria-label="scroll to top"
                >
                  <KeyboardArrowUpIcon fontSize="small" />
                </IconButton>
              )}

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
