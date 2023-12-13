export const server = (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') ? "http://localhost:3000" : "https://www.quran.vn"

// const apiBaseUrl = (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') ? "http://localhost:8000/api" : "https://hages.dk/ditqapi/public/api"

// const apiBaseUrl = "https://hages.dk/ditqapi/public/api"
const apiBaseUrl = "https://api.alquranarabia.com/api"


const metaMapping = [
    {
        localizationCode: 'vn',
        translationCode: 'vn',
        domain: 'quran.vn',
        country: 'vietnam',
        metaTitle: 'quran.vn',
        metaDescription: 'Quran application in Vietnamese.',

    },
    {
        localizationCode: 'kh',
        translationCode: 'khmer_cambodia',
        domain: 'qurankh.com',
        country: 'Cambodia',
        metaTitle: 'QuranKh',
        metaDescription: 'Quran application in Cambodian.',

    }
];

const localizationCode = process.env.LOCALIZATION_CODE;
const metaInfo = metaMapping?.find(({ localizationCode }) => localizationCode === localizationCode);

export const config = {
    apiBaseUrl: process.env.API_BASE_URL,
    localizationCode,
    translationCode: metaInfo?.translationCode,
    metaTitle: metaInfo?.metaTitle,
    metaDescription: metaInfo?.metaDescription,

    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    databaseURL: process.env.DB_URL,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID,
}