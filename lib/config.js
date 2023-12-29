// const apiBaseUrl = (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') ? "http://localhost:8000/api" : "https://hages.dk/ditqapi/public/api"

// const apiBaseUrl = "https://hages.dk/ditqapi/public/api"
const apiBaseUrl = "https://api.alquranarabia.com/api"


const metaMapping = [
    {
        localizationCode: 'vn',
        translationCode: 'vietnamese_hassan',
        domain: 'quran.vn',
        country: 'Vietnam',
        metaTitle: 'quran.vn',
        metaDescription: 'Quran application in Vietnamese',
        quranInLocal: 'Kinh Quran',
        language: 'Vietnamese',
    },
    {
        localizationCode: 'kh',
        translationCode: 'khmer_cambodia',
        domain: 'qurankh.com',
        country: 'Cambodia',
        metaTitle: 'QuranKh.com',
        metaDescription: 'Quran application in Khmer',
        quranInLocal: '', // todo
        language: 'Khmer',
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
