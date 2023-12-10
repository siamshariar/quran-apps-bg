// import init, { getChaptersInfo } from '../../lib/fetch'
// import { useState } from 'react'
// import SettingsContextProvider from '../../contexts/SettingsContext'
//
// import Meta from '../../components/core/meta'
// //import Viewport from '../components/core/viewport'
// import SearchModal from '../../components/core/search-modal'
// import HeaderWeb from '../../components/web/header'
// import HeaderMobile from '../../components/mobile/header-home'
// import FooterWeb from '../../components/web/footer'
// import FooterMobile from '../../components/mobile/footer-home'
// import Sidenav from '../../components/sidenav'
// import Banner from '../../components/home/banner'
// import ChapterList from '../../components/home/chapter-list'
//
// init()
//
// export default function Home({ chapters }) {
//     const [searchModalOpen, updateSearchModalOpen] = useState(false)
//
//     const searchModalController = open => {
//         updateSearchModalOpen(open)
//     }
//
//     return (
//         <SettingsContextProvider>
//             <Meta
//                 title="Kinh Quran | Quran in Vietnamese"
//                 description="Quran application in Vietnamese"
//                 url="https://www.quran.vn"
//                 image="/img/logo.png"
//                 type="website"
//             />
//
//             <SearchModal
//                 open={searchModalOpen}
//                 searchModalController={searchModalController}
//             />
//
//             <Sidenav chapters={chapters} />
//
//             <HeaderWeb
//                 page="home"
//                 searchModalController={searchModalController}
//             />
//
//             <HeaderMobile
//                 searchModalController={searchModalController}
//             />
//
//             <main id="viewport" className="viewport">
//                 <Banner />
//                 <ChapterList chapters={chapters} />
//             </main>
//
//             <FooterWeb />
//
//             <FooterMobile />
//         </SettingsContextProvider>
//     )
// }
//
//
// export async function getStaticProps(context) {
//     const chapters = await getChaptersInfo()
//
//     if (!chapters) {
//         return {
//             notFound: true
//         }
//     }
//
//     // Pass data to the page via props
//     return {
//         props: { chapters }
//     }
// }

export default function Test(){
    return<div></div>
}