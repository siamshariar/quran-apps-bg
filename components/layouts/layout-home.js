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

            <FooterWeb />

            <FooterMobile />
          </SidenavContextProvider>
        </BookmarkContextProvider>
      </PinContextProvider>
    </SettingsContextProvider>
  );
};

export default Layout;
