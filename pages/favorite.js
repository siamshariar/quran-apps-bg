// import { server } from '../lib/config'
// import { useState } from 'react'
// import SettingsContextProvider from '../contexts/SettingsContext'
// import Meta from '../components/core/meta'
// //import Viewport from '../components/core/viewport'
// import SearchModal from '../components/core/search-modal'
// import HeaderWeb from '../components/layout2/web/header'
// import HeaderMobile from '../components/mobile/header-content'
// import FooterWeb from '../components/web/footer'
// //import FooterMobile from '../components/mobile/footer-home'
// //import Sidenav from '../components/sidenav'
// //import Banner from '../components/home/banner'

// import styles from "../components/layout2/surah/content.module.scss";
// import Sidenav from "../components/layout2/sidenav";

// import Container from '../components/core/container'
// import {getChaptersInfo} from "../lib/fetch";

// import PinContextProvider from '../contexts/PinContext'
// import BookmarkContextProvider from '../contexts/BookmarkContext'
// import SidenavContextProvider from '../contexts/SidenavContext'

// export default function FavoritePage({ chapters }) {
//     const [searchModalOpen, updateSearchModalOpen] = useState(false)

//     const searchModalController = open => {
//         updateSearchModalOpen(open)
//     }

//     return (
//         <SettingsContextProvider>
//           <PinContextProvider>
//             <BookmarkContextProvider>
//             <SidenavContextProvider>
//             <Meta
//                 title="Favorite"
//                 description="Quran application in Vietnamese"
//                 url="https://www.quran.vn"
//                 image="/img/logo.png"
//                 type="website"
//             />

//             {/*<SearchModal*/}
//             {/*	open={searchModalOpen}*/}
//             {/*	searchModalController={searchModalController}*/}
//             {/*/>*/}

//             {/* <Sidenav chapters={chapters} /> */}

//             <HeaderWeb
//                 page="home"
//                 chapters={chapters}
//                 isChapterPage={true}
//                 // searchModalController={searchModalController}
//             />

//             <HeaderMobile
//                 //searchModalController={searchModalController}
//                 title="Favorite"
//                 chapters={chapters}
//             />

//             <main id="viewport" className="viewport viewport_no_footer">
//                 <div className={styles.content + " quran_content"}>

//                     <Sidenav chapters={chapters} />

//                     <div className={styles.chapter}>

//                         <div className={styles.chapter_tab}>

//                             <div className={styles.title}>
//                                 <span className={styles.title_text}>Favorite</span>
//                                 {/* <span className={styles.title_icon}><InfoIcon /></span> */}
//                             </div>

//                             <div className={styles.verses}>
//                                 <div className={styles.quran_content}>
//                                     <p className={styles.quran_content_text}>Sẽ được thêm vào sớm</p>
//                                 </div>
//                             </div>

//                         </div>

//                     </div>
//                 </div>
//             </main>

//             <FooterWeb />

//             {/* <FooterMobile /> */}
//             </SidenavContextProvider>
//             </BookmarkContextProvider>
//           </PinContextProvider>
//         </SettingsContextProvider>
//     )
// }

// export async function getStaticProps(context) {
//     const chaptersInfo = await getChaptersInfo()

//     return {
//         props: {
//             chapters: chaptersInfo
//         }
//     }
// }


export default function Test(){
  return <div></div>
}