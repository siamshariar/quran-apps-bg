// import init, { getChaptersInfo, getChapterDetails } from '../../../../lib/fetch'
// import { useState } from 'react'
// import SettingsContextProvider from '../../../../contexts/SettingsContext'
// import AudioPlayerContextProvider from '../../../../contexts/AudioPlayerContext'
//
// import Meta from '../../../../components/core/meta'
// //import Viewport from '../../../components/core/viewport'
// import SearchModal from '../../../../components/core/search-modal'
// import HeaderWeb from '../../../../components/web/header'
// import HeaderMobile from '../../../../components/mobile/header-chapter'
// //import FooterMobile from '../../../components/mobile/footer-chapter'
// import Sidenav from '../../../../components/sidenav'
// import ChapterContent from '../../../../components/surah/content'
// import AudioPlayer from '../../../../components/surah/audio-player'
//
// init()
//
// export default function Surah({ chapters, chapterNumber, chapterName, chapterMp3Url, verses, prevChapter, nextChapter }) {
//     const [searchModalOpen, updateSearchModalOpen] = useState(false)
//
//     const searchModalController = open => {
//         updateSearchModalOpen(open)
//     }
//
//     return (
//         <SettingsContextProvider>
//             <Meta
//                 title={`Surah ${chapterName}`}
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
//             <AudioPlayerContextProvider>
//
//                 <HeaderMobile
//                     chapterNumber={chapterNumber}
//                     chapterName={chapterName}
//                 />
//
//                 <main id="viewport" className="viewport viewport_surah viewport_no_footer">
//                     <ChapterContent
//                         chapterNumber={chapterNumber}
//                         chapterName={chapterName}
//                         chapterMp3Url={chapterMp3Url}
//                         verses={verses}
//                         prevChapter={prevChapter}
//                         nextChapter={nextChapter}
//                     />
//                 </main>
//
//                 <AudioPlayer />
//
//             </AudioPlayerContextProvider>
//
//             {/* <FooterMobile /> */}
//
//         </SettingsContextProvider>
//     )
// }
//
//
// export async function getStaticProps(context) {
//     const chapterNumber = context.params.chapter
//     const chapterDetails = await getChapterDetails(chapterNumber)
//     const chaptersInfo = await getChaptersInfo()
//
//     return {
//         props: {
//             chapterNumber: chapterDetails.surah,
//             chapterName: chapterDetails.nameTranslation,
//             chapterMp3Url: chapterDetails.mp3Url,
//             verses: chapterDetails.verses,
//             chapters: chaptersInfo,
//
//             prevChapter: {
//                 number: chaptersInfo[chapterNumber - 2] ? chaptersInfo[chapterNumber - 2].surah : null,
//                 name: chaptersInfo[chapterNumber - 2] ? chaptersInfo[chapterNumber - 2].nameTranslation : null
//             },
//             nextChapter: {
//                 number: chaptersInfo[chapterNumber] ? chaptersInfo[chapterNumber].surah : null,
//                 name: chaptersInfo[chapterNumber] ? chaptersInfo[chapterNumber].nameTranslation : null
//             },
//
//             key: chapterDetails.surah
//         }
//     }
// }
//
//
// export async function getStaticPaths() {
//     const chapters = await getChaptersInfo()
//     let paths = []
//
//     chapters.map(chapter => {
//         let surah = String(chapter.surah)
//         let obj = { params: { chapter: surah } }
//         paths.push(obj)
//     })
//
//     return {
//         paths: paths,
//         fallback: false
//     }
// }

export default function Test(){
    return<div></div>
}