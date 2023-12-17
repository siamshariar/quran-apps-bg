import { server, config } from "../lib/config";
import { useState } from "react";
import SettingsContextProvider from "../contexts/SettingsContext";
import Meta from "../components/core/meta";
//import Viewport from '../components/core/viewport'
import SearchModal from "../components/core/search-modal";
import HeaderWeb from "../components/web/header";
import HeaderMobile from "../components/mobile/header-content";
import FooterWeb from "../components/web/footer";
//import FooterMobile from '../components/mobile/footer-home'
//import Sidenav from '../components/sidenav'
//import Banner from '../components/home/banner'

import Container from "../components/core/container";

import PinContextProvider from "../contexts/PinContext";
import BookmarkContextProvider from "../contexts/BookmarkContext";

export default function ContentPage() {
  const [searchModalOpen, updateSearchModalOpen] = useState(false);

  const searchModalController = (open) => {
    updateSearchModalOpen(open);
  };

  return (
    <SettingsContextProvider>
      <PinContextProvider>
        <BookmarkContextProvider>
          <Meta    
            title={config?.metaTitle}
            description={config?.metaDescription}
            url={`${server}/content`}
            image={`${server}/img/logo/${config?.localizationCode}/s_logo.png`}
            type="website"
          />

          <SearchModal
            open={searchModalOpen}
            searchModalController={searchModalController}
          />

          {/* <Sidenav chapters={chapters} /> */}

          <HeaderWeb
            page="home"
            searchModalController={searchModalController}
          />

          <HeaderMobile
            //searchModalController={searchModalController}
            title="Content"
          />

          <main id="viewport" className="viewport viewport_no_footer">
            <Content />
          </main>

          <FooterWeb />

          {/* <FooterMobile /> */}
        </BookmarkContextProvider>
      </PinContextProvider>
    </SettingsContextProvider>
  );
}

const Content = () => {
  return (
    <div className="content_page">
      <Container>
        <div className="content_page_item">
          <h2>Who we are?</h2>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eaque,
            libero vel sed quisquam deleniti non itaque? Ea commodi quibusdam
            quasi amet neque, quam accusamus, soluta voluptate, similique ab
            excepturi ullam? Lorem ipsum dolor sit, amet consectetur adipisicing
            elit. Eaque, libero vel sed quisquam deleniti non itaque? Ea commodi
            quibusdam quasi amet neque, quam accusamus, soluta voluptate,
            similique ab excepturi ullam?
          </p>
        </div>

        <div className="content_page_item">
          <h2>Meccan Surahs</h2>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eaque,
            libero vel sed quisquam deleniti non itaque? Ea commodi quibusdam
            quasi amet neque, quam accusamus, soluta voluptate, similique ab
            excepturi ullam? Lorem ipsum dolor sit, amet consectetur adipisicing
            elit. Eaque, libero vel sed quisquam deleniti non itaque? Ea commodi
            quibusdam quasi amet neque, quam accusamus, soluta voluptate,
            similique ab excepturi ullam?
          </p>
        </div>

        <div className="content_page_item">
          <h2>Medinan Surahs</h2>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eaque,
            libero vel sed quisquam deleniti non itaque? Ea commodi quibusdam
            quasi amet neque, quam accusamus, soluta voluptate, similique ab
            excepturi ullam? Lorem ipsum dolor sit, amet consectetur adipisicing
            elit. Eaque, libero vel sed quisquam deleniti non itaque? Ea commodi
            quibusdam quasi amet neque, quam accusamus, soluta voluptate,
            similique ab excepturi ullam?
          </p>
        </div>

        <div className="content_page_item">
          <h2>Credits</h2>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eaque,
            libero vel sed quisquam deleniti non itaque? Ea commodi quibusdam
            quasi amet neque, quam accusamus, soluta voluptate, similique ab
            excepturi ullam? Lorem ipsum dolor sit, amet consectetur adipisicing
            elit. Eaque, libero vel sed quisquam deleniti non itaque? Ea commodi
            quibusdam quasi amet neque, quam accusamus, soluta voluptate,
            similique ab excepturi ullam?
          </p>
        </div>
      </Container>
    </div>
  );
};
