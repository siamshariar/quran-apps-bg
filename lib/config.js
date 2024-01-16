// const apiBaseUrl = (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') ? "http://localhost:8000/api" : "https://hages.dk/ditqapi/public/api"

const apiBaseUrl = "https://api.alquranarabia.com/api"

const metaMapping = [
    {
        localizationCode: 'vn',
        translationCode: 'vietnamese_hassan',
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
    }
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
