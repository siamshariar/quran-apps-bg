//import { useState } from 'react'
import SettingsContextProvider from "../../contexts/SettingsContext";
import PinContextProvider from "../../contexts/PinContext";
import BookmarkContextProvider from "../../contexts/BookmarkContext";
import SidenavContextProvider from "../../contexts/SidenavContext";
//import Viewport from '../components/core/viewport'
//import SearchModal from '../components/core/search-modal'
import HeaderWeb from "../layout2/web/header";
import HeaderMobile from "../mobile/header-content";
import FooterWeb from "../web/footer";
//import FooterMobile from '../components/mobile/footer-home'
import Sidenav from "../layout2/sidenav";
import classNames from "classnames";

const Layout = ({ children }) => {
  // const [searchModalOpen, updateSearchModalOpen] = useState(false);

  // const searchModalController = (open) => {
  //   updateSearchModalOpen(open);
  // };

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
              page="surah"
              chapters={children.props.chapters}
              isChapterPage={true}
              //searchModalController={searchModalController}
              hasSidenav={true}
            />

            <HeaderMobile
              //searchModalController={searchModalController}
              title={children.props.pageTitle}
            />

            <main
              id="viewport"
              className={classNames(
                "viewport",
                "viewport_no_footer",
                children.props.bgColor === "secondary" ? "viewport_surah" : ""
              )}
            >
              <div className="content layout2">
                <Sidenav chapters={children.props.chapters} />
                <div className="content_wrapper">{children}</div>
              </div>
            </main>

            <FooterWeb />

            {/* <FooterMobile /> */}
          </SidenavContextProvider>
        </BookmarkContextProvider>
      </PinContextProvider>
    </SettingsContextProvider>
  );
};

export default Layout;
