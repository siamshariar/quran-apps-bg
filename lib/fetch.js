// import { info } from '../db/info'
import { config } from "./config";
// import firebase from 'firebase/app'
// import 'firebase/database'

const apiBaseUrl = config.apiBaseUrl;
const localizationCode = config.localizationCode;
const translationCode = config.translationCode;

// async function waitToCallApi() {
//   await new Promise((resolve, reject) => setTimeout(resolve, 1200));
// }

// export default function init() {
//     if (!firebase.apps.length) {
//         firebase.initializeApp(config)
//     }
//     else {
//         firebase.app()
//     }
// }

// export async function getChaptersInfo() {
//     const chaptersInfoRef = firebase.database().ref()
//     let chapters = []

//     await chaptersInfoRef.once('value').then(snapshot => {
//         // snapshot.forEach(snap => {
//         // 	chapters.push(snap.val())
//         // })

//         chapters = snapshot.val()
//     })

//     let filtered = []

//     chapters.forEach(chapter => {
//         let obj = {
//             surah: chapter.surah,
//             name: chapter.name,
//             nameTranslation: chapter.nameTranslation,
//             nameMeaning: chapter.nameMeaning,
//             totalVerses: chapter.totalVerses,
//             type: chapter.type,
//             pdfUrl: chapter.pdfUrl,
//             mp3Url: chapter.mp3Url
//         }
//         filtered.push(obj)
//     })
//     return filtered
// }

// lib/fetch.js
export async function getChaptersInfo() {
    try {
        const res = await fetch(`${apiBaseUrl}/chapters/localizations/${localizationCode}`)
        const data = await res.json();
        return data;
    } catch (err) {
        return null;
    }
}

export async function getChapterDetails(chapterNo, translation = null) {
    const trans = translation || config.translationCode
    const res = await fetch(`${apiBaseUrl}/translations/${trans}/chapters/${chapterNo}`)
    const data = await res.json()
    return data
}
export async function getVerseDetails(chapterNo, verseNo, translation = null) {
  //waitToCallApi()

  // let data
  // await firebase.database().ref(`${chapterNo - 1}/verses/${verseNumber - 1}`).once('value').then(snapshot => {
  //     data = Array(snapshot.val())
  // })
  const trans = translation || config.translationCode;
  const url = `${apiBaseUrl}/translations/${trans}/chapters/${chapterNo}/verses/${verseNo}`
  const res = await fetch(url);
  if (res.status === 500) {
    return null;
  }
  const data = await res.json();

  return data;
}

export async function getVersesByQuery(verses) {
  const url = `${apiBaseUrl}/translations/${translationCode}?verses=${verses}`
  return fetchDataByUrl(url);
}

export async function fetchDataByUrl(url) {
  try {
    const res = await fetch(url)

    if (!res.ok) {
      return null
    }

    const contentType = res.headers.get("content-type")
    if (!contentType || !contentType.includes("application/json")) {
      const text = await res.text()
      return null
    }

    return await res.json()
  } catch (error) {
    return null
  }
}

// Start Subjective
export async function getSubjectives() {
  const url = `${apiBaseUrl}/subjective/localizations/${localizationCode}?type=1`;
  return fetchDataByUrl(url);
}

export async function getParentSubjectives() {
  const url = `${apiBaseUrl}/subjective/localizations/${localizationCode}?type=2`;
  return fetchDataByUrl(url);
}

export async function getParentSubjectiveBySlug(slug) {
  const url = `${apiBaseUrl}/subjective/${slug}/localizations/${localizationCode}`;
  return fetchDataByUrl(url);
}

export async function getSubjectiveVersesBySlug(slug) {
  const url = `${apiBaseUrl}/subjective/${slug}/verses/localizations/${localizationCode}`;
  return fetchDataByUrl(url);
}

export async function getSubjectiveVersesByTranslation(verseIds, translation) {
  if (!verseIds || verseIds.length === 0) return []

  const verseQuery = verseIds.join(",")
  const url = `${apiBaseUrl}/translations/${translation}?verses=${verseQuery}`

  try {
    const data = await fetchDataByUrl(url)
    return data || []
  } catch (error) {
    return []
  }
}

export async function getAllSubjectives() {
  const url = `${apiBaseUrl}/subjective/localizations/${localizationCode}`;
  return fetchDataByUrl(url);
}
// End Subjective

// 99 names of Allah
export async function getNamesOfAllah() {
  const url = `${apiBaseUrl}/names-of-allah/localizations/${localizationCode}`;
  return fetchDataByUrl(url);
}
