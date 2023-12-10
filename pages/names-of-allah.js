import { server } from "../lib/config";
import { getChaptersInfo, getNamesOfAllah } from "../lib/fetch";
import SettingsContextProvider from "../contexts/SettingsContext";
import AudioPlayerContextProvider from "../contexts/AudioPlayerContext";
import PinContextProvider from "../contexts/PinContext";
import BookmarkContextProvider from "../contexts/BookmarkContext";
import SidenavContextProvider from "../contexts/SidenavContext";
import Meta from "../components/core/meta";
//import SearchModal from '../../../components/core/search-modal'
import HeaderWeb from "../components/layout2/web/header";
import HeaderMobile from "../components/mobile/header-content";
import FooterWeb from "../components/web/footer";
import FooterMobile from "../components/mobile/footer-home";
import NamesOfAllah from "../components/names-of-allah";
// import Audio from "../components/names-of-allah/audio";

export default function AllahName({ chapters, names }) {
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
              <Meta
                title={`99 Names of Allah`}
                description={`99 Names of Allah. Quran application in Vietnamese.`}
                url={`${server}/names-of-allah`}
                image={`${server}/img/s_logo.png`}
                type="website"
              />

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

              <HeaderMobile //
                title="99 Names of Allah"
              />

              <main id="viewport" className="viewport">
                <NamesOfAllah
                  chapters={chapters}
                  names={names}
                  contentTitle="99 Names of Allah"
                />
              </main>

              {/* <Audio names={names} /> */}

              <FooterWeb />
              <FooterMobile />
            </SidenavContextProvider>
          </AudioPlayerContextProvider>
        </BookmarkContextProvider>
      </PinContextProvider>
    </SettingsContextProvider>
  );
}

export async function getStaticProps() {
  const chaptersInfo = await getChaptersInfo();
  const namesOfAllah = await getNamesOfAllah();

  return {
    props: {
      names: namesOfAllah,
      chapters: chaptersInfo,
    },
  };
}
