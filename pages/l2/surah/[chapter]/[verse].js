// import init, { getChaptersInfo, getVerseDetails } from '../../../../lib/fetch'
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
// export default function Verse({ chapters, chapterNumber, chapterName, chapterMp3Url, verses, prevChapter, nextChapter }) {
//     const [searchModalOpen, updateSearchModalOpen] = useState(false)
//
//     const searchModalController = open => {
//         updateSearchModalOpen(open)
//     }
//
//     return (
//         <SettingsContextProvider>
//             <Meta
//                 title={`Surah ${chapterName} - ${verses[0].ayah}`}
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
//     const verseNumber = context.params.verse
//     const verseDetails = await getVerseDetails(chapterNumber, verseNumber)
//     const chaptersInfo = await getChaptersInfo()
//
//     return {
//         props: {
//             chapterNumber: chapterNumber,
//             chapterName: chaptersInfo[chapterNumber - 1].nameTranslation,
//             chapterMp3Url: chaptersInfo[chapterNumber - 1].mp3Url,
//             verses: verseDetails,
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
//             key: uniqueKey(chapterNumber, verseNumber)
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
//         let totalVerses = parseInt(chapter.totalVerses)
//
//         for (let i = 1; i <= totalVerses; i++) {
//             let obj = {
//                 params: {
//                     chapter: surah,
//                     verse: String(i)
//                 }
//             }
//             paths.push(obj)
//         }
//     })
//
//     return {
//         paths: paths,
//         fallback: false
//     }
// }
//
//
//
// const uniqueKey = (chapterNumber, verseNumber) => {
//     let s1 = "0000" + chapterNumber
//     s1 = s1.substr(s1.length - 3)
//
//     let s2 = "0000" + verseNumber
//     s2 = s2.substr(s2.length - 3)
//
//     return (s1 + s2)
// }

export default function Test(){
    return<div></div>
}