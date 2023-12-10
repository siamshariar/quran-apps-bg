// import { getChaptersInfo } from '../../lib/fetch'
// import { useState } from 'react'
// import SettingsContextProvider from '../../contexts/SettingsContext'
//
// import Meta from '../../components/core/meta'
// //import Viewport from '../../components/core/viewport'
// import SearchModal from '../../components/core/search-modal'
// import HeaderWeb from '../../components/web/header'
// import HeaderMobile from '../../components/mobile/header-home'
// import FooterMobile from '../../components/mobile/footer-home'
// import Sidenav from '../../components/sidenav'
// import SubjectiveContent from '../../components/subjective'
// import PinContextProvider from '../../contexts/PinContext'
// import BookmarkContextProvider from '../../contexts/BookmarkContext'
//
// export default function Subjective({ chapters, subjectives }) {
//     const [searchModalOpen, updateSearchModalOpen] = useState(false)
//
//     const searchModalController = open => {
//         updateSearchModalOpen(open)
//     }
//
//     return (
//         <SettingsContextProvider>
//           <PinContextProvider>
//             <BookmarkContextProvider>
//             <Meta
//                 title="Subjective"
//                 description="The Noble Quran"
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
//                 page="surah"
//                 searchModalController={searchModalController}
//             />
//
//             <HeaderMobile
//               chapters={chapters}
//             />
//
//             <main id="viewport" className="viewport">
//                 <SubjectiveContent
//                     subjectives={subjectives}
//                 />
//             </main>
//
//             <FooterMobile />
//             </BookmarkContextProvider>
//           </PinContextProvider>
//         </SettingsContextProvider>
//     )
// }
//
//
// export async function getStaticProps(context) {
//     const chapters = await getChaptersInfo()
//     const subjectives = await getSubjectives()
//
//     if (!chapters || !subjectives) {
//         return {
//             notFound: true
//         }
//     }
//
//     // Pass data to the page via props
//     return {
//         props: {
//             chapters,
//             subjectives
//         }
//     }
// }
//
//
// const getSubjectives = async () => {
//     return [
//         {
//             subject: "allah",
//             title: "আল্লাহ তা'আলার পরিচয়",
//             numberOfAyahs: 25,
//         },
//         {
//             subject: "allah",
//             title: "আল্লাহর একত্ব (তাওহীদ)",
//             numberOfAyahs: 25,
//         },
//         {
//             subject: "allah",
//             title: "আল্লাহ কারো অংশীদারিত্ব (শিরক) থেকে পবিত্র",
//             numberOfAyahs: 25,
//         },
//         {
//             subject: "allah",
//             title: "আল্লাহ আরশে আছেন",
//             numberOfAyahs: 25,
//         },
//         {
//             subject: "allah",
//             title: "আল্লাহ রাব্বুল আলামীন",
//             numberOfAyahs: 25,
//         },
//         {
//             subject: "allah",
//             title: "আল্লাহ আর-রাহমান (পরম দয়াময়)",
//             numberOfAyahs: 25,
//         },
//         {
//             subject: "allah",
//             title: "আল্লাহ সর্বশক্তিমান (সব কিছুর উপর পূর্ণ ক্ষমতাবান)",
//             numberOfAyahs: 25,
//         },
//     ]
// }

export default function Test(){
    return<div></div>
}
