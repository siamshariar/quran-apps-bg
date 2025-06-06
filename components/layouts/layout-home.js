import { useState, useEffect } from 'react';
import SettingsContextProvider from "../../contexts/SettingsContext";
import PinContextProvider from "../../contexts/PinContext";
import BookmarkContextProvider from "../../contexts/BookmarkContext";
import SidenavContextProvider from "../../contexts/SidenavContext";
//import Viewport from '../components/core/viewport'
//import SearchModal from '../components/core/search-modal'
import HeaderWeb from "../layout2/web/header";
import HeaderMobile from "../mobile/header-home";
import FooterWeb from "../web/footer";
import FooterMobile from "../mobile/footer-home";
import IconButton from '@mui/material/IconButton';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useTheme } from '@mui/material/styles';

const Layout = ({ children }) => {
  // const [searchModalOpen, updateSearchModalOpen] = useState(false)

  // const searchModalController = open => {
  //     updateSearchModalOpen(open)
  // }
  const [showScrollButton, setShowScrollButton] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 300) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <SettingsContextProvider>
      <PinContextProvider>
        <BookmarkContextProvider>
          <SidenavContextProvider>
            {/* <SearchModal
              open={searchModalOpen}
              searchModalController={searchModalController}
            /> */}
            <HeaderWeb
              page="home"
              chapters={children.props.chapters}
              isChapterPage={false}
              // searchModalController={searchModalController}
              hasSidenav={false}
            />

            <HeaderMobile
              chapters={children.props.chapters}
              //searchModalController={searchModalController}
            />

            <main id="viewport" className="viewport">
              {children}
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

            <FooterWeb />

            <FooterMobile />
          </SidenavContextProvider>
        </BookmarkContextProvider>
      </PinContextProvider>
    </SettingsContextProvider>
  );
};

export default Layout;
