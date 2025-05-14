// const apiBaseUrl = (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') ? "http://localhost:8000/api" : "https://hages.dk/ditqapi/public/api"

const apiBaseUrl = "https://api.alquranarabia.com/api"

const metaMapping = [
    {
        localizationCode: 'vn',
        translationCode: 'vietnamese_hassan',
        availableTranslations: [
          {
              code: 'vietnamese_hassan',
              name: 'Hasan Abdul-Karim'
          },
          {
              code: 'vietnamese_rwwad',
              name: 'Ruwwad Translation Center'
          }
        ],
        domain: 'quran.vn',
        country: 'Vietnam',
        metaTitle: 'Quran.vn',
        metaDescription: 'Quran application in Vietnamese',
        quranInLocal: 'Kinh Quran',
        language: 'Vietnamese',
        bannerBackground: 'linear-gradient(90deg,#e80013 0,#fce802 50%,#fce802 50%,#e80013 100%)',
        translationFont: {
            family: 'PalatinoLinotype',
            size: 18,
        },
        logoWidthWeb: 122,
        content: {
            what_is_quran: {
                title: "Kinh Quran là gì?",
            },
            is_quran_god_word: {
                title: "Kinh Quran có phải là lời nói của Thượng Đế không?",
            },
            why_should_read_quran: {
                title: "Tại sao chúng ta phải nên đọc Kinh Quran?",
            },
        },
    },
    {
        localizationCode: 'kh',
        translationCode: 'khmer_cambodia',
        domain: 'QuranKh.com',
        country: 'Cambodia',
        metaTitle: 'QuranKh.com',
        metaDescription: 'Quran application in Khmer',
        quranInLocal: '', // todo
        language: 'Khmer',
        bannerBackground: 'linear-gradient(90deg,#032ea1 0,#e00025 50%,#e00025 50%,#032ea1 100%)',
        translationFont: {
            family: 'Roboto',
            size: 18,
        },
        logoWidthWeb: 182,
        content: {
            what_is_quran: {
                title: "តើគម្ពីគូរ៉ានគឺជាអ្វី?",
            },
            is_quran_god_word: {
                title: "តើគម្ពីគូរ៉ាគឺជាព្រះបន្ទូលរបស់ព្រះ?",
            },
            why_should_read_quran: {
                title: "ហេតុអ្វីបានជាអ្នកគួរអានគម្ពីគូរ៉ា?",
            },
        },
    },
    {
        localizationCode: 'kr',
        translationCode: 'korean_hamid',
        domain: 'Quran.kr',
        country: 'Korea',
        metaTitle: 'Quran.kr',
        metaDescription: 'Quran application in Korean',
        quranInLocal: '', // todo
        language: 'Korean',
        bannerBackground: 'linear-gradient(90deg,#2c569b 0,#cfcfcf 50%,#cfcfcf 50%,#ed1c27 100%)',
        translationFont: {
            family: 'Roboto',
            size: 18,
        },
        logoWidthWeb: 122,
        content: {
            what_is_quran: {
                title: "꾸란이란 무엇인가?",
            },
            is_quran_god_word: {
                title: "꾸란은 하나님의 말씀인가?",
            },
            why_should_read_quran: {
                title: "꾸란을 꼭 읽어야 하는 이유는 무엇인가?",
            },
        },
    },
    {
        localizationCode: 'cn',
        translationCode: 'chinese_makin',
        domain: 'Quran.cn',
        country: 'China',
        metaTitle: 'Quran.cn',
        metaDescription: 'Quran application in Chinese',
        quranInLocal: '', // todo
        language: 'Chinese',
        bannerBackground: 'linear-gradient(90deg, #e80013 0,#e3d210 50%,#e3d210 50%,#e80013 100%)',
        translationFont: {
            family: 'Roboto',
            size: 18,
        },
        logoWidthWeb: 122,
        content: {
            what_is_quran: {
                title: "什么是《古兰经》？",
            },
            is_quran_god_word: {
                title: "《古兰经》是真主的话吗？",
            },
            why_should_read_quran: {
                title: "为什么要读《古兰经》？",
            },
        },
    },
    {
        localizationCode: 'jp',
        translationCode: 'japanese_saeedsato',
        domain: 'Quran.jp',
        country: 'Japan',
        metaTitle: 'Quran.jp',
        metaDescription: 'Quran application in Japanese',
        quranInLocal: '', // todo
        language: 'Japanese',
        bannerBackground: 'linear-gradient(90deg,#eaeaea 0,#bd0028 50%,#bd0028 50%,#eaeaea 100%)',
        translationFont: {
            family: 'Roboto',
            size: 18,
        },
        logoWidthWeb: 122,
        content: {
            what_is_quran: {
                title: "コーランとは何ですか?",
            },
            is_quran_god_word: {
                title: "コーランは神の言葉ですか?",
            },
            why_should_read_quran: {
                title: "なぜコーランを読む必要があるのですか?",
            },
        },
    },
    {
        localizationCode: 'dk',
        translationCode: 'dan-hadiabdollahian',
        domain: 'Quran.dk',
        country: 'Denmark',
        metaTitle: 'Quran.dk',
        metaDescription: 'Quran application in Danish',
        quranInLocal: '', // todo
        language: 'Danish',
        bannerBackground: 'linear-gradient(90deg, #ca072a 0,#d2cece 50%,#d2cece 50%,#ca072a 100%)',
        translationFont: {
            family: 'Roboto',
            size: 18,
        },
        logoWidthWeb: 128,
        content: {
            what_is_quran: {
                title: "Hvad er Koranen?",
            },
            is_quran_god_word: {
                title: "Er Koranen Guds ord?",
            },
            why_should_read_quran: {
                title: "Hvorfor skal man læse Koranen?",
            },
        },
    },
    {
        localizationCode: 'ph',
        translationCode: 'tagalog_rwwad',
        domain: 'Quran.ph',
        country: 'Philippines',
        metaTitle: 'Quran.ph',
        metaDescription: 'Quran application in Filipinos',
        quranInLocal: '', // todo
        language: 'Filipinos',
        bannerBackground: 'linear-gradient(0deg, #0a2165 0,#dfdcc5 50%,#dfdcc5 50%,#bd0a3c 100%)',
        translationFont: {
            family: 'Roboto',
            size: 18,
        },
        logoWidthWeb: 122,
        content: {
            what_is_quran: {
                title: "Ano ang Quran?",
            },
            is_quran_god_word: {
                title: "Ang Quran ba ay salita ng Diyos?",
            },
            why_should_read_quran: {
                title: "Bakit dapat basahin ang Quran?",
            },
        },
    },
    {
        localizationCode: 'fr',
        translationCode: 'french_rashid',
        domain: 'QuranFr.com',
        country: 'France',
        metaTitle: 'QuranFr.com',
        metaDescription: 'Quran application in French',
        quranInLocal: '', // todo
        language: 'French',
        bannerBackground: 'linear-gradient(90deg, #082153 0,#d1cfcf 50%,#d1cfcf 50%,#d00821 100%)',
        translationFont: {
            family: 'Roboto',
            size: 18,
        },
        logoWidthWeb: 172,
        content: {
            what_is_quran: {
                title: "Qu'est-ce que le Coran?",
            },
            is_quran_god_word: {
                title: "Le Coran est-il la parole de Dieu?",
            },
            why_should_read_quran: {
                title: "Pourquoi faut-il lire le Coran?",
            },
        },
    },
    {
        localizationCode: 'de',
        translationCode: 'german_bubenheim',
        domain: 'QuranDe.com',
        country: 'Germany',
        metaTitle: 'QuranDe.com',
        metaDescription: 'Quran application in German',
        quranInLocal: '', // todo
        language: 'German',
        bannerBackground: 'linear-gradient(90deg,#000000 0,#de0000 50%,#de0000 50%,#facf06 100%)',
        translationFont: {
            family: 'Roboto',
            size: 18,
        },
        logoWidthWeb: 182,
        content: {
            what_is_quran: {
                title: "Was ist der Koran?",
            },
            is_quran_god_word: {
                title: "Ist der Koran Gottes Wort?",
            },
            why_should_read_quran: {
                title: "Warum sollte man den Koran lesen?",
            },
        },
    },
];

const localizationCode = process.env.NEXT_PUBLIC_LOCALIZATION_CODE;
const metaInfo = metaMapping?.find(({ localizationCode: l }) => l === localizationCode);

export const server = (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') ? "http://localhost:3000" : `https://www.${metaInfo?.domain}`

export const config = {
    apiBaseUrl,
    localizationCode,
    ...metaInfo,

    appId: process.env.APP_ID,
}
