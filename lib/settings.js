import { config } from "./config"

export const settings = {
  view: {
    arabic: true,
    translation: true,
    tafseer: true,
    transliteration: false,
  },
  fontSize: {
    arabic: 36,
    translation: config.translationFont?.size,
  },
  fontFamily: {
    arabic: "PDMSIslam",
    translation: config.translationFont?.family,
  },
  theme: "light",
  verseMode: "scroll",
  activeVerse: 1,
  autoScroll: true,
  notification: false,
  playbackRate: 1,
  translation: "vietnamese_hassan", // default
}

export const fonts = {
  arabic: [
    {
      displayName: "PDMS Islamic Font",
      familyName: "PDMSIslam",
    },
    {
      displayName: "Al Qalam Quran 2",
      familyName: "AlQalam",
    },
    {
      displayName: "Othmani",
      familyName: "Othmani",
    },
  ],
  translation: [
    {
      displayName: "Palatino Linotype",
      familyName: "PalatinoLinotype",
    },
    {
      displayName: "Times New Roman",
      familyName: "TimesNewRoman",
    },
    {
      displayName: "Roboto",
      familyName: "Roboto",
    },
  ],
}

export const themes = [
  {
    name: "light",
    color: "#F4F4F4",
  },
  {
    name: "dark",
    color: "#293145",
  },
  // {
  //     name: 'blue',
  //     color: '#2196F3'
  // },
  // {
  //     name: 'orange',
  //     color: '#FF9800'
  // },
  // {
  //     name: 'red',
  //     color: '#F44336'
  // },
]
