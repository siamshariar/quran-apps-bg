// Use local API in development if available, otherwise fallback to production API
const apiBaseUrl = (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') ? "http://127.0.0.1:8000/api" : "https://api.alquranarabia.com/api"

export const showMultiTranslation = false;

const modernBannerBackgroundLight = "linear-gradient(90deg, #ffffff 0%, #ffffff 100%)";
const modernBannerBackgroundDark = "linear-gradient(90deg, #232a3b 0%, #232a3b 55%,rgba(35, 42, 59, 1) 100%)";

export const translationData = {
  English: [
    { code: "english_abdel_haleem", name: "M.A.S. Abdel Haleem" },
    { code: "english_mustafa_khattab", name: "Dr. Mustafa Khattab" },
    { code: "english_usmani", name: "T. Usmani" },
    { code: "english_maududi", name: "A. Maududi" },
    { code: "english_pickthall", name: "M. Pickthall" },
    { code: "english_yusuf_ali", name: "A. Yusuf Ali" },
    { code: "english_saheeh", name: "Saheeh International" },
    { code: "english_hilali_khan", name: "Al-Hilali & Khan" },
    { code: "english_transliteration", name: "Transliteration" },
    { code: "english_wahiduddin", name: "Wahiduddin Khan" },
    { code: "english_ahmed_ali", name: "Ahmed Ali" },
    { code: "english_arberry", name: "A.J. Arberry" },
    { code: "english_rwwad", name: "Rowwad Translation Center" },
    { code: "english_waleed", name: "Dr. Waleed Bleyhesh Omary" },
  ],
  Vietnamese: [
    { code: "vietnamese_hassan", name: "Hasan Abdul-Karim" },
    { code: "vietnamese_rwwad", name: "Ruwwad Translation Center" },
    { code: "vietnamese_mokhtasar", name: "Al-Mukhtasar in interpretation of the Noble Quran" },
  ],
  Khmer: [
    { code: "khmer_cambodia", name: "Development Society of Muslim Cambodian Society" },
    { code: "khmer_rwwad", name: "Ruwwad Translation Center" },
    { code: "khmer_mokhtasar", name: "Al-Mukhtasar in interpretation of the Noble Quran" },
  ],
  Korean: [
    { code: "korean_hamid", name: "Hamed Choi" },
    { code: "korean_rwwad", name: "Ruwwad Translation Center" },
  ],
  Chinese: [
    { code: "chinese_makin", name: "Muhammad Makin" },
    { code: "chinese_suliman", name: "Muhammad Sulaiman" },
    { code: "chinese_mayolong", name: "Basair" },
    { code: "chinese_mokhtasar", name: "Al-Mukhtasar" },
  ],
  Japanese: [
    { code: "japanese_saeedsato", name: "Saeed Sato" },
    { code: "japanese_mokhtasar", name: "Al-Mukhtsar" },
  ],
  Danish: [
    { code: "dan-hadiabdollahian", name: "Hadi Abdollahian" },
    { code: "dan-vandetaal", name: "Van De Taal" },
  ],
  Filipino: [
    { code: "tagalog_rwwad", name: "Filipino (Tagalog)" },
    { code: "bisayan_rwwad", name: "Filipino translation (Bisayan)" },
    { code: "iranun_sarro", name: "Filipino (Iranun)" },
    { code: "maguindanao_rwwad", name: "Filipino Translation (Maguindanaon)" },
    { code: "tagalog_mokhtasar", name: "Persian Filipino (Tagalog)" },
  ],
  French: [
    { code: "french_rashid", name: "Rashid Maash" },
    { code: "french_montada", name: "Noor International" },
    { code: "french_hameedullah", name: "Muhammad Hamidullah" },
    { code: "french_mokhtasar", name: "Al-Mukhtsar" },
  ],
  German: [
    { code: "german_bubenheim", name: "Frank Bubenheim" },
    { code: "german_aburida", name: "Abu Rida" },
    { code: "german_rwwad", name: "Rowwad Translation Center" },
  ],
  Arabic: [
    { code: "arabic_original", name: "Original Arabic Text" },
    { code: "arabic_tafseer_jalalayn", name: "Tafseer Al-Jalalayn" },
    { code: "arabic_tafseer_kathir", name: "Tafseer Ibn Kathir" },
    { code: "arabic_tafseer_tabari", name: "Tafseer At-Tabari" },
  ],
  Urdu: [
    { code: "urdu_jalandhri", name: "Fateh Muhammad Jalandhri" },
    { code: "urdu_kanzul_iman", name: "Kanzul Iman - Ahmed Raza Khan" },
    { code: "urdu_maududi", name: "Abul Ala Maududi" },
    { code: "urdu_junagarhi", name: "Muhammad Junagarhi" },
  ],
  Spanish: [
    { code: "spanish_cortes", name: "Julio Cortes" },
    { code: "spanish_garcia", name: "Muhammad Isa Garcia" },
    { code: "spanish_bornez", name: "Raul Gonzalez Bornez" },
    { code: "spanish_montada_eu", name: "Noor International" },
    { code: "spanish_montada_latin", name: "Noor International (Latin)" },
  ],
  Turkish: [
    { code: "turkish_rwwad", name: "Rowwad Translation Center" },
    { code: "turkish_shaban", name: "Shaaban British" },
    { code: "turkish_shahin", name: "Dr. Ali Ozek and others" },
  ],
  Persian: [
    { code: "persian_ansarian", name: "Hussain Ansarian" },
    { code: "persian_makarem", name: "Naser Makarem Shirazi" },
    { code: "persian_fooladvand", name: "Mohammad Mahdi Fooladvand" },
    { code: "persian_ih", name: "Rowwad Translation Center" },
    { code: "persian_saadi", name: "Saadi" },
  ],
  Russian: [
    { code: "russian_kuliev", name: "Elmir Kuliev" },
    { code: "russian_porokhova", name: "V. Porokhova" },
    { code: "russian_osmanov", name: "M.-N. O. Osmanov" },
    { code: "russian_aboadel", name: "Abu Adel" },
  ],
  Indonesian: [
    { code: "indonesian_affairs", name: "Indonesian Ministry of Religious Affairs" },
    { code: "indonesian_complex", name: "King Fahd Complex" },
    { code: "indonesian_sabiq", name: "Sayyid Sabiq" },
  ],
  Malay: [
    { code: "malay_basmeih", name: "Abdullah Muhammad Basmeih" },
    { code: "malay_affairs", name: "Malaysian Ministry of Religious Affairs" },
    { code: "malay_basumayyah", name: "Abdullah Basumayyah" },
  ],
  Bengali: [
    { code: "bengali_hasan", name: "Zohurul Hoque" },
    { code: "bengali_muhiuddin", name: "Muhiuddin Khan" },
    { code: "bengali_zakaria", name: "Abu Bakr Zakaria" },
  ],
  Hindi: [
    { code: "hindi_farooq", name: "Suhel Farooq Khan" },
    { code: "hindi_ahmad", name: "Maulana Azizul Haque al Umari" },
    { code: "hindi_omari", name: "Azizul Haq Al-Omari" },
  ],
  Tamil: [
    { code: "tamil_jan", name: "Jan Trust Foundation" },
    { code: "tamil_omar", name: "Omar Sharif" },
    { code: "tamil_baqavi", name: "Abdulhamid Albaqoi" },
  ],
  Swahili: [
    { code: "swahili_barwani", name: "Ali Muhsin Al-Barwani" },
    { code: "swahili_omar", name: "Sheikh Abdullah Omar" },
    { code: "swahili_rwwad", name: "Rowwad Translation Center" },
    { code: "swahili_abubakr", name: "Dr. Abdullah Muhammad Abu Bakr" },
  ],
  Dutch: [
    { code: "dutch_keyzer", name: "Salomo Keyzer" },
    { code: "dutch_leemhuis", name: "Fred Leemhuis" },
    { code: "dutch_center", name: "Dutch Islamic Center" },
  ],
  Italian: [
    { code: "italian_piccardo", name: "Hamza Roberto Piccardo" },
    { code: "italian_bonelli", name: "Gabriele Mandel" },
    { code: "italian_rwwad", name: "Rowwad Translation Center" },
  ],
  Portuguese: [
    { code: "portuguese_nasr", name: "Helmi Nasr" },
    { code: "por_samirelhayek", name: "Samir El-Hayek" },
  ],
  Albanian: [
    { code: "albanian_nahi", name: "Hasan Nahi" },
    { code: "albanian_ahmeti", name: "Sherif Ahmeti" },
    { code: "albanian_rwwad", name: "Rowwad Translation Center" },
  ],
  Bosnian: [
    { code: "bosnian_korkut", name: "Besim Korkut" },
    { code: "bosnian_mlivo", name: "Mustafa Mlivo" },
    { code: "bosnian_rwwad", name: "Rowwad Translation Center" },
    { code: "bosnian_mihanovich", name: "Muhammad Mihanovich" },
  ],
  Azerbaijani: [
    { code: "azerbaijani_mammadaliyev", name: "Alikhan Musayev" },
    { code: "azerbaijani_bunyadov", name: "Ziya Bunyadov" },
  ],
  Kurdish: [
    { code: "kurdish_bamoki", name: "Muhammad Salih Bamoki" },
    { code: "kurdish_burhan", name: "Burhan Muhammad-Amin" },
    { code: "kurdish_salahuddin", name: "Salahuddin Abdulkarim" },
  ],
  Hausa: [{ code: "hausa_gumi", name: "Abubakar Mahmoud Gumi" }],
  Yoruba: [{ code: "yoruba_mikail", name: "Shaykh Abu Rahimah Mikail" }],
  Amharic: [{ code: "amharic_sadiq", name: "Sadiq Ahmad" }],
  Somali: [{ code: "somali_abduh", name: "Mahmud Muhammad Abduh" }],
  Thai: [{ code: "thai_complex", name: "King Fahd Complex" }],
  Sindhi: [{ code: "sindhi_amroti", name: "Taj Mehmood Amroti" }],
  Pashto: [{ code: "pashto_zakaria", name: "Zakaria Abulsalam" }],
  Uzbek: [{ code: "uzbek_mansour", name: "Muhammad Sodik Muhammad Yusuf" }],
  Kazakh: [{ code: "kazakh_altai", name: "Khalifa Altai" }],
  Kyrgyz: [{ code: "kyrgyz_mamayusupov", name: "Turat Mamayusupov" }],
  Tajik: [{ code: "tajik_ayati", name: "AbdolMohammad Ayati" }],
  Tatar: [{ code: "tatar_noghmani", name: "Yakub Ibn Nugman" }],
  Uyghur: [{ code: "uyghur_saleh", name: "Muhammad Saleh" }],
  
  // NEWLY ADDED NON-MUSLIM COUNTRY TRANSLATIONS
  Greek: [
    { code: "greek_rwwad", name: "Rowwad Translation Center" }
  ],
  Bulgarian: [
    { code: "bulgarian_translation", name: "Unknown" }
  ],
  Romanian: [
    { code: "romanian_project", name: "Islam4ro.com" }
  ],
  Macedonian: [
    { code: "macedonian_group", name: "Group of Macedonian scholars" }
  ],
  Georgian: [
    { code: "georgian_rwwad", name: "Rowwad Translation Center" }
  ],
  Serbian: [
    { code: "serbian_rwwad", name: "Rowwad Translation Center" }
  ],
  Croatian: [
    { code: "croatian_rwwad", name: "Rowwad Translation Center" }
  ],
  Lithuanian: [
    { code: "lithuanian_rwwad", name: "Rowwad Translation Center" }
  ],
  Ukrainian: [
    { code: "ukrainian_yakubovych", name: "Mikhailo Yakubovych" }
  ],
  Czech: [
    { code: "ces_arnykl", name: "A. R. Nykl" },
    { code: "ces_hadiabdollahian", name: "Hadi Abdollahian" },
    { code: "ces_prekladihrbek", name: "Preklad I. Hrbek" }
  ],
  Finnish: [
    { code: "fin_unknown", name: "Unknown" }
  ],
  Norwegian: [
    { code: "nor_einarberg", name: "Einar Berg" }
  ],
  Swedish: [
    { code: "swe_knutbernstrom", name: "Knut Bernstrom" }
  ],
  Polish: [
    { code: "pol_jozefabielawski", name: "Jozefa Bielawskiego" }
  ],
  Hungarian: [
    { code: "hun_drahmedabdelrah", name: "Dr. Ahmed Abdel Rahman" }
  ],
  Hebrew: [
    { code: "hebrew_darussalam", name: "Darussalam Association" }
  ],
  Afrikaans: [
    { code: "afr_imammabaker", name: "Imam M. A. Baker" }
  ],
  Esperanto: [
    { code: "epo_hadiabdollahian", name: "Hadi Abdollahian" }
  ],
  Latin: [
    { code: "lat_hadiabdollahian", name: "Hadi Abdollahian" }
  ],
  Catalan: [
    { code: "cat_yousseflyoussi", name: "Youssef Lyoussi" }
  ],
  Slovak: [
    { code: "slk_hadiabdollahian", name: "Hadi Abdollahian" }
  ],
  // African Languages
  Oromo: [
    { code: "oromo_ababor", name: "Gali Ababor" }
  ],
  Malagasy: [
    { code: "malagasy_rwwad", name: "Rowwad Translation Center" }
  ],
  Luhya: [
    { code: "luhya_center", name: "International Society for Science and Culture" }
  ],
  Afar: [
    { code: "afar_hamza", name: "Mahmoud Abdulqader Hamza" }
  ],
  Luganda: [
    { code: "luganda_foundation", name: "African Development Foundation" }
  ],
  Nko: [
    { code: "ankobambara_foudi", name: "Fudi Sulaiman Kanti" },
    { code: "ankobambara_dayyan", name: "Karamo, Baba Mamadi Jani" }
  ],
  Kinyarwanda: [
    { code: "kinyarwanda_assoc", name: "Rwanda Muslim Association" }
  ],
  Kirundi: [
    { code: "ikirundi_gehiti", name: "Yusuf Gheti" }
  ],
  Moore: [
    { code: "moore_rwwad", name: "Rowwad Translation Center" }
  ],
  Dagbani: [
    { code: "dagbani_ghatubo", name: "Muhammad Baba Ghatubo" }
  ],
  Chewa: [
    { code: "chichewa_betala", name: "Khalid Ibrahim Betala" }
  ],
  Asante: [
    { code: "asante_harun", name: "Harun Ismail" }
  ],
  Yaw: [
    { code: "yaw_silika", name: "Muhammad ibn Abdulhamid Slika" }
  ],
  Fulani: [
    { code: "fulani_rwwad", name: "Rowwad Translation Center" }
  ],
  Lingala: [
    { code: "lingala_zakaria", name: "Zakaria Mohammed Balangogo" }
  ],
  // Indian Regional Languages
  Marathi: [
    { code: "marathi_ansari", name: "Muhammad Shafi Ansari" }
  ],
  Telugu: [
    { code: "telugu_muhammad", name: "Abdurrahim ibn Muhammad" }
  ],
  Gujarati: [
    { code: "gujarati_omari", name: "Rabila Al-Omari" }
  ],
  Malayalam: [
    { code: "malayalam_kunhi", name: "Abdulhamid Haidar Al-Madany & Kunhi Muhammad" }
  ],
  Kannada: [
    { code: "kannada_hamza", name: "Muhammad Hamza Batur" },
    { code: "kannada_bashir", name: "Sh. Bashir Misuri" }
  ],
  Assamese: [
    { code: "assamese_rafeeq", name: "Rafiqul Islam Habibur Rahman" }
  ],
  Punjabi: [
    { code: "punjabi_arif", name: "Arif Halim" }
  ],
  Nepali: [
    { code: "nepali_central", name: "Ahlul Hadith Association" }
  ],
  Sinhalese: [
    { code: "sinhalese_mahir", name: "Rowwad Translation Center" }
  ],
  // Other Asian Languages
  Burmese: [
    { code: "mya_alinuyin", name: "Alin U Yin" },
    { code: "mya_basein", name: "Ba Sein" },
    { code: "mya_ghazimohammadha", name: "Ghazi Mohammad Hashim" },
    { code: "mya_hashimtinmyint", name: "Hashim Tin Myint" }
  ],
  Divehi: [
    { code: "div_officeofthepres", name: "Office Of The President Of Maldives" }
  ],
  Javanese: [
    { code: "jav_unknown", name: "Unknown" }
  ],
  // Philippine Regional Languages
  Maranao: [
    { code: "mrw_guroalimsaroman", name: "Guro Alim Saromantang" }
  ],
  // African Regional Languages
  Shona: [
    { code: "sna_abdullahjmadini", name: "Abdullah J. M. Adini And Students" }
  ],
  Sotho: [
    { code: "sot_sheikheliaskeke", name: "Sheikh Elias Keketso Lelia" }
  ],
  Xhosa: [
    { code: "xho_imaamismaaeelng", name: "Imaam Ismaaeel Ngqoyiyana" }
  ],
  Zulu: [
    { code: "zul_iqembulezifundi", name: "Iqembu Lezifundiswa" }
  ],
  Bambara: [
    { code: "bam_deenmuhammad", name: "Deen Muhammad" }
  ],
  Berber: [
    { code: "ber_ramdaneatmansou", name: "Ramdane At Mansour" }
  ]
}

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
        name: 'Ruwwad Translation Center',
      },
      {
        code: 'vietnamese_mokhtasar',
        name: 'Al-Mukhtasar in interpretation of the Noble Quran',
      },
    ],
    domain: 'quran.vn',
    country: 'Vietnam',
    metaTitle: 'Quran Vietnam – Read and Listen to the Holy Quran in Vietnamese.',
    metaDescription: 'Read and understand the Holy Quran with Vietnamese translation. Listen to audio recitations and explore tafseer easily.',
    keywords: 'Quran, Vietnamese Quran, Islam, Quran App, Quran Translation',
    quranInLocal: 'Kinh Quran',
    language: 'Vietnamese',
    bannerBackground: showMultiTranslation
      ? modernBannerBackgroundLight
      : "linear-gradient(90deg,#e80013 0,#fce802 50%,#fce802 50%,#e80013 100%)",
    bannerBackgroundDark: showMultiTranslation
      ? modernBannerBackgroundDark
      : "linear-gradient(90deg,#2b395d 0,#909090 50%,#909090 50%,#2b395d 100%)",
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
    availableTranslations: [
      {
        code: "khmer_cambodia",
        name: "Development Society of Muslim Cambodian Society",
      },
      {
        code: "khmer_rwwad",
        name: "Ruwwad Translation Center",
      },
      {
        code: "khmer_mokhtasar",
        name: "Al-Mukhtasar in interpretation of the Noble Quran",
      },
    ],
    domain: 'QuranKh.com',
    country: 'Cambodia',
    metaTitle: 'Quran Cambodia – Read and Listen to the Holy Quran in Khmer.',
    metaDescription: 'Read and understand the Holy Quran with Khmer translation. Listen to audio recitations and explore tafseer easily.',
    keywords: 'Quran, Khmer Quran, Islam, Quran App, Quran Translation',
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
    availableTranslations: [
      {
        code: 'korean_hamid',
        name: 'Hamed Choi'
      },
      {
        code: 'korean_rwwad',
        name: 'Ruwwad Translation Center',
      },
    ],
    domain: 'Quran.kr',
    country: 'Korea',
    metaTitle: 'Quran Korea – Read and Listen to the Holy Quran in Korean.',
    metaDescription: 'Read and understand the Holy Quran with Korean translation. Listen to audio recitations and explore tafseer easily.',
    keywords: 'Quran, Korean Quran, Islam, Quran App, Quran Translation',
    quranInLocal: '', // todo
    language: 'Korean',
    bannerBackground: showMultiTranslation
      ? modernBannerBackgroundLight
      : 'linear-gradient(90deg,#2c569b 0,#cfcfcf 50%,#cfcfcf 50%,#ed1c27 100%)',
    bannerBackgroundDark: showMultiTranslation
      ? modernBannerBackgroundDark
      : 'linear-gradient(90deg,#2c569b 0,#cfcfcf 50%,#cfcfcf 50%,#ed1c27 100%)',
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
    availableTranslations: [
      {
        code: "chinese_makin",
        name: "Muhammad Makin",
      },
      {
        code: "chinese_suliman",
        name: "Muhammad Sulaiman",
      },
      {
        code: "chinese_mayolong",
        name: "Basair",
      },
      {
        code: "chinese_mokhtasar",
        name: "Al-Mukhtasar",
      },
    ],
    domain: 'Quran.cn',
    country: 'China',
    metaTitle: 'Quran China – Read and Listen to the Holy Quran in Chinese.',
    metaDescription: 'Read and understand the Holy Quran with Chinese translation. Listen to audio recitations and explore tafseer easily.',
    keywords: 'Quran, Chinese Quran, Islam, Quran App, Quran Translation',
    quranInLocal: '', 
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
    availableTranslations: [
      {
        code: "japanese_saeedsato",
        name: "Saeed Sato",
      },
      {
        code: "japanese_mokhtasar",
        name: "Al-Mukhtasar",
      },
    ],
    domain: 'Quran.jp',
    country: 'Japan',
    metaTitle: 'Quran Japan – Read and Listen to the Holy Quran in Japanese.',
    metaDescription: 'Read and understand the Holy Quran with Japanese translation. Listen to audio recitations and explore tafseer easily.',
    keywords: 'Quran, Japanese Quran, Islam, Quran App, Quran Translation',
    quranInLocal: '', 
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
    availableTranslations: [
      {
        code: "dan-hadiabdollahian",
        name: "Hadi Abdollahian",
      },
      {
        code: "dan-vandetaal",
        name: "Van De Taal",
      },
    ],
    domain: 'Quran.dk',
    country: 'Denmark',
    metaTitle: 'Quran Denmark – Read and Listen to the Holy Quran in Danish.',
    metaDescription: 'Read and understand the Holy Quran with Danish translation. Listen to audio recitations and explore tafseer easily.',
    keywords: 'Quran, Danish Quran, Islam, Quran App, Quran Translation',
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
    availableTranslations: [
      {
        code: "tagalog_rwwad",
        name: "Filipino (Tagalog)",
      },
      {
        code: "bisayan_rwwad",
        name: "Filipino translation (Bisayan)",
      },
      {
        code: "iranun_sarro",
        name: "Filipino (Iranun)",
      },
      {
        code: "maguindanao_rwwad",
        name: "Filipino Translation (Maguindanaon)",
      },
      {
        code: "tagalog_mokhtasar",
        name: "Persian Filipino (Tagalog)",
      },
    ],
    domain: 'Quran.ph',
    country: 'Philippines',
    metaTitle: 'Quran Philippines – Read and Listen to the Holy Quran in Filipinos.',
    metaDescription: 'Read and understand the Holy Quran with Filipinos translation. Listen to audio recitations and explore tafseer easily.',
    keywords: 'Quran, Filipinos Quran, Islam, Quran App, Quran Translation',
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
    availableTranslations: [
      {
        code: "french_rashid",
        name: "Rashid Maash",
      },
      {
        code: "french_montada",
        name: "Noor International",
      },
      {
        code: "french_hameedullah",
        name: "Muhammad Hamidullah",
      },
      {
        code: "french_mokhtasar",
        name: "Al-Mukhtasar",
      },
    ],
    domain: 'QuranFr.com',
    country: 'France',
    metaTitle: 'Quran France – Read and Listen to the Holy Quran in French.',
    metaDescription: 'Read and understand the Holy Quran with French translation. Listen to audio recitations and explore tafseer easily.',
    keywords: 'Quran, French Quran, Islam, Quran App, Quran Translation',
    quranInLocal: '', // todo
    language: 'French',
    bannerBackground: 'linear-gradient(90deg, #082153 0,#d1cfcf 50%,#d1cfcf 50%,#d00821 100%)',
    translationFont: {
            family: 'Roboto',
      size: 20,
    },
    logoWidthWeb: 182,
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
    availableTranslations: [
      {
        code: "german_bubenheim",
        name: "Frank Bubenheim",
      },
      {
        code: "german_aburida",
        name: "Abu Rida",
      },
      {
        code: "german_rwwad",
        name: "Rowwad Translation Center",
      },
    ],
    domain: 'QuranDe.com',
    country: 'Germany',
    metaTitle: 'Quran Germany – Read and Listen to the Holy Quran in German.',
    metaDescription: 'Read and understand the Holy Quran with German translation. Listen to audio recitations and explore tafseer easily.',
    keywords: 'Quran, German Quran, Islam, Quran App, Quran Translation',
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
  {
    localizationCode: 'it',
    translationCode: 'italian_rwwad',
    availableTranslations: [
      {
        code: "italian_rwwad",
        name: "Rowwad Translation Center",
      },
    ],
    domain: 'QuranIt.com',
    country: 'Italy',
    metaTitle: 'Quran Italy – Read and Listen to the Holy Quran in Italian.',
    metaDescription: 'Read and understand the Holy Quran with Italian translation. Listen to audio recitations and explore tafseer easily.',
    keywords: 'Quran, Italian Quran, Islam, Quran App, Quran Translation',
    quranInLocal: '', // todo
    language: 'Italian',
    bannerBackground: 'linear-gradient(90deg,#009246 0,#ffffff 33%,#ffffff 33%,#ce2b37 66%,#ce2b37 100%)',
    translationFont: {
            family: 'Roboto',
      size: 18,
    },
    logoWidthWeb: 122,
    content: {
      what_is_quran: {
        title: "Cos'è il Corano?",
      },
      is_quran_god_word: {
        title: "Il Corano è la parola di Dio?",
      },
      why_should_read_quran: {
        title: "Perché dovremmo leggere il Corano?",
      },
    },
  },
  {
    localizationCode: 'es',
    translationCode: 'spanish_montada_eu',
    availableTranslations: [
      {
        code: "spanish_montada_eu",
        name: "Noor International",
      },
      {
        code: "spanish_garcia",
        name: "Muhammad Isa Garcia",
      },
      {
        code: "spanish_montada_latin",
        name: "Noor International (Latin)",
      },
    ],
    domain: 'QuranEs.com',
    country: 'Spain',
    metaTitle: 'Quran Spain – Read and Listen to the Holy Quran in Spanish.',
    metaDescription: 'Read and understand the Holy Quran with Spanish translation. Listen to audio recitations and explore tafseer easily.',
    keywords: 'Quran, Spanish Quran, Islam, Quran App, Quran Translation',
    quranInLocal: '', // todo
    language: 'Spanish',
    bannerBackground: 'linear-gradient(90deg,#FFC400 0,#FFC400 25%,#C60B1E 25%,#C60B1E 75%,#FFC400 75%,#FFC400 100%)',
    translationFont: {
            family: 'Roboto',
      size: 18,
    },
    logoWidthWeb: 122,
    content: {
      what_is_quran: {
        title: "¿Qué es el Corán?",
      },
      is_quran_god_word: {
        title: "¿Es el Corán la palabra de Dios?",
      },
      why_should_read_quran: {
        title: "¿Por qué deberíamos leer el Corán?",
      },
    },
  },
  {
    localizationCode: 'el',
    translationCode: 'greek_rwwad',
    availableTranslations: [
      {
        code: "greek_rwwad",
        name: "Rowwad Translation Center",
      },
    ],
    domain: 'QuranEl.com',
    country: 'Greece',
    metaTitle: 'Quran Greece – Read and Listen to the Holy Quran in Greek.',
    metaDescription: 'Read and understand the Holy Quran with Greek translation. Listen to audio recitations and explore tafseer easily.',
    keywords: 'Quran, Greek Quran, Islam, Quran App, Quran Translation',
    quranInLocal: '', // todo
    language: 'Greek',
    bannerBackground: 'linear-gradient(90deg,#0D5EAF 0,#0D5EAF 50%,#FFFFFF 50%,#FFFFFF 100%)',
    translationFont: {
            family: 'Roboto',
      size: 18,
    },
    logoWidthWeb: 122,
    content: {
      what_is_quran: {
        title: "Τι είναι το Κοράνι;",
      },
      is_quran_god_word: {
        title: "Είναι το Κοράνι η λέξη του Θεού;",
      },
      why_should_read_quran: {
        title: "Γιατί πρέπει να διαβάζουμε το Κοράνι;",
      },
    },
  },
  {
    localizationCode: 'nl',
    translationCode: 'dutch_center',
    availableTranslations: [
      {
        code: "dutch_center",
        name: "Dutch Islamic Center",
      },
    ],
    domain: 'QuranNl.com',
    country: 'Netherlands',
    metaTitle: 'Quran Netherlands – Read and Listen to the Holy Quran in Dutch.',
    metaDescription: 'Read and understand the Holy Quran with Dutch translation. Listen to audio recitations and explore tafseer easily.',
    keywords: 'Quran, Dutch Quran, Islam, Quran App, Quran Translation',
    quranInLocal: '', // todo
    language: 'Dutch',
    bannerBackground: 'linear-gradient(90deg,#21468B 0,#21468B 33%,#FFFFFF 33%,#FFFFFF 66%,#AD1D21 66%,#AD1D21 100%)',
    translationFont: {
            family: 'Roboto',
      size: 18,
    },
    logoWidthWeb: 122,
    content: {
      what_is_quran: {
        title: "Wat is de Koran?",
      },
      is_quran_god_word: {
        title: "Is de Koran het woord van God?",
      },
      why_should_read_quran: {
        title: "Waarom zouden we de Koran moeten lezen?",
      },
    },
  },
  {
    localizationCode: 'tr',
    translationCode: 'turkish_rwwad',
    availableTranslations: [
      {
        code: "turkish_rwwad",
        name: "Rowwad Translation Center",
      },
      {
        code: "turkish_shaban",
        name: "Shaaban British",
      },
      {
        code: "turkish_shahin",
        name: "Dr. Ali Ozek and others",
      },
    ],
    domain: 'QuranTr.com',
    country: 'Turkey',
    metaTitle: 'Quran Turkey – Read and Listen to the Holy Quran in Turkish.',
    metaDescription: 'Read and understand the Holy Quran with Turkish translation. Listen to audio recitations and explore tafseer easily.',
    keywords: 'Quran, Turkish Quran, Islam, Quran App, Quran Translation',
    quranInLocal: '', // todo
    language: 'Turkish',
    bannerBackground: 'linear-gradient(90deg,#E30A17 0,#E30A17 50%,#FFFFFF 50%,#FFFFFF 100%)',
    translationFont: {
            family: 'Roboto',
      size: 18,
    },
    logoWidthWeb: 122,
    content: {
      what_is_quran: {
        title: "Kur'an nedir?",
      },
      is_quran_god_word: {
        title: "Kur'an Allah'ın sözü mü?",
      },
      why_should_read_quran: {
        title: "Neden Kur'an okumalıyız?",
      },
    },
  },
  {
    localizationCode: 'ru',
    translationCode: 'russian_aboadel',
    availableTranslations: [
      {
        code: "russian_aboadel",
        name: "Abu Adel",
      },
      {
        code: "russian_porokhova",
        name: "V. Porokhova",
      },
      {
        code: "russian_osmanov",
        name: "M.-N. O. Osmanov",
      },
    ],
    domain: 'QuranRu.com',
    country: 'Russia',
    metaTitle: 'Quran Russia – Read and Listen to the Holy Quran in Russian.',
    metaDescription: 'Read and understand the Holy Quran with Russian translation. Listen to audio recitations and explore tafseer easily.',
    keywords: 'Quran, Russian Quran, Islam, Quran App, Quran Translation',
    quranInLocal: '', // todo
    language: 'Russian',
    bannerBackground: 'linear-gradient(90deg,#FFFFFF 0,#FFFFFF 33%,#0052B4 33%,#0052B4 66%,#D52B1E 66%,#D52B1E 100%)',
    translationFont: {
            family: 'Roboto',
      size: 18,
    },
    logoWidthWeb: 122,
    content: {
      what_is_quran: {
        title: "Что такое Коран?",
      },
      is_quran_god_word: {
        title: "Является ли Коран словом Бога?",
      },
      why_should_read_quran: {
        title: "Почему мы должны читать Коран?",
      },
    },
  },
  {
    localizationCode: 'id',
    translationCode: 'indonesian_affairs',
    availableTranslations: [
      {
        code: "indonesian_affairs",
        name: "Indonesian Ministry of Religious Affairs",
      },
      {
        code: "indonesian_complex",
        name: "King Fahd Complex",
      },
      {
        code: "indonesian_sabiq",
        name: "Sayyid Sabiq",
      },
    ],
    domain: 'QuranId.com',
    country: 'Indonesia',
    metaTitle: 'Quran Indonesia – Read and Listen to the Holy Quran in Indonesian.',
    metaDescription: 'Read and understand the Holy Quran with Indonesian translation. Listen to audio recitations and explore tafseer easily.',
    keywords: 'Quran, Indonesian Quran, Islam, Quran App, Quran Translation',
    quranInLocal: '', // todo
    language: 'Indonesian',
    bannerBackground: 'linear-gradient(90deg,#FF0000 0,#FF0000 50%,#FFFFFF 50%,#FFFFFF 100%)',
    translationFont: {
            family: 'Roboto',
      size: 18,
    },
    logoWidthWeb: 122,
    content: {
      what_is_quran: {
        title: "Apa itu Al-Quran?",
      },
      is_quran_god_word: {
        title: "Apakah Al-Quran adalah firman Allah?",
      },
      why_should_read_quran: {
        title: "Mengapa kita harus membaca Al-Quran?",
      },
    },
  },
  {
    localizationCode: 'pt',
    translationCode: 'portuguese_nasr', // Changed from english_saheeh
    availableTranslations: [
      {
        code: "portuguese_nasr",
        name: "Helmi Nasr",
      },
      {
        code: "por_samirelhayek",
        name: "Samir El-Hayek",
      },
    ],
    domain: 'QuranPt.com',
    country: 'Portugal',
    metaTitle: 'Quran Portugal – Read and Listen to the Holy Quran in Portuguese.',
    metaDescription: 'Read and understand the Holy Quran with Portuguese translation. Listen to audio recitations and explore tafseer easily.',
    keywords: 'Quran, Portuguese Quran, Islam, Quran App, Quran Translation',
    quranInLocal: '', // todo
    language: 'Portuguese',
    bannerBackground: 'linear-gradient(90deg,#046a38 0,#da251d 50%,#da251d 50%,#ffcc00 100%)',
    translationFont: {
            family: 'Roboto',
      size: 18,
    },
    logoWidthWeb: 182,
    content: {
      what_is_quran: {
        title: "O que é o Alcorão?",
      },
      is_quran_god_word: {
        title: "O Alcorão é a palavra de Deus?",
      },
      why_should_read_quran: {
        title: "Por que devemos ler o Alcorão?",
      },
    },
  },
  // NEWLY ADDED NON-MUSLIM COUNTRY CONFIGURATIONS
  {
    localizationCode: 'bg',
    translationCode: 'bulgarian_translation',
    availableTranslations: [
      {
        code: "bulgarian_translation",
        name: "Unknown",
      },
    ],
    domain: 'QuranBg.com',
    country: 'Bulgaria',
    metaTitle: 'Quran Bulgaria – Read and Listen to the Holy Quran in Bulgarian.',
    metaDescription: 'Read and understand the Holy Quran with Bulgarian translation. Listen to audio recitations and explore tafseer easily.',
    keywords: 'Quran, Bulgarian Quran, Islam, Quran App, Quran Translation',
    quranInLocal: '', // todo
    language: 'Bulgarian',
    bannerBackground: 'linear-gradient(90deg,#D62612 0,#FFFFFF 33%,#FFFFFF 33%,#00966E 66%,#00966E 100%)',
    translationFont: {
      family: 'Roboto',
      size: 18,
    },
    logoWidthWeb: 122,
    content: {
      what_is_quran: {
        title: "Какво е Коранът?",
      },
      is_quran_god_word: {
        title: "Коранът слово ли е на Бог?",
      },
      why_should_read_quran: {
        title: "Защо трябва да четем Корана?",
      },
    },
  },
  {
    localizationCode: 'ro',
    translationCode: 'romanian_project',
    availableTranslations: [
      {
        code: "romanian_project",
        name: "Islam4ro.com",
      },
    ],
    domain: 'QuranRo.com',
    country: 'Romania',
    metaTitle: 'Quran Romania – Read and Listen to the Holy Quran in Romanian.',
    metaDescription: 'Read and understand the Holy Quran with Romanian translation. Listen to audio recitations and explore tafseer easily.',
    keywords: 'Quran, Romanian Quran, Islam, Quran App, Quran Translation',
    quranInLocal: '', // todo
    language: 'Romanian',
    bannerBackground: 'linear-gradient(90deg,#002B7F 0,#FCD116 50%,#FCD116 50%,#CE1126 100%)',
    translationFont: {
      family: 'Roboto',
      size: 18,
    },
    logoWidthWeb: 122,
    content: {
      what_is_quran: {
        title: "Ce este Coranul?",
      },
      is_quran_god_word: {
        title: "Este Coranul cuvântul lui Dumnezeu?",
      },
      why_should_read_quran: {
        title: "De ce ar trebui să citim Coranul?",
      },
    },
  },
  {
    localizationCode: 'mk',
    translationCode: 'macedonian_group',
    availableTranslations: [
      {
        code: "macedonian_group",
        name: "Group of Macedonian scholars",
      },
    ],
    domain: 'QuranMk.com',
    country: 'North Macedonia',
    metaTitle: 'Quran North Macedonia – Read and Listen to the Holy Quran in Macedonian.',
    metaDescription: 'Read and understand the Holy Quran with Macedonian translation. Listen to audio recitations and explore tafseer easily.',
    keywords: 'Quran, Macedonian Quran, Islam, Quran App, Quran Translation',
    quranInLocal: '', // todo
    language: 'Macedonian',
    bannerBackground: 'linear-gradient(90deg,#D20000 0,#FFE600 50%,#FFE600 50%,#D20000 100%)',
    translationFont: {
      family: 'Roboto',
      size: 18,
    },
    logoWidthWeb: 122,
    content: {
      what_is_quran: {
        title: "Што е Куранот?",
      },
      is_quran_god_word: {
        title: "Дали Куранот е зборот на Бог?",
      },
      why_should_read_quran: {
        title: "Зошто треба да го читаме Куранот?",
      },
    },
  },
  {
    localizationCode: 'ka',
    translationCode: 'georgian_rwwad',
    availableTranslations: [
      {
        code: "georgian_rwwad",
        name: "Rowwad Translation Center",
      },
    ],
    domain: 'QuranGe.com',
    country: 'Georgia',
    metaTitle: 'Quran Georgia – Read and Listen to the Holy Quran in Georgian.',
    metaDescription: 'Read and understand the Holy Quran with Georgian translation. Listen to audio recitations and explore tafseer easily.',
    keywords: 'Quran, Georgian Quran, Islam, Quran App, Quran Translation',
    quranInLocal: '', // todo
    language: 'Georgian',
    bannerBackground: 'linear-gradient(90deg,#FF0000 0,#000000 50%,#000000 50%,#FF0000 100%)',
    translationFont: {
      family: 'Roboto',
      size: 18,
    },
    logoWidthWeb: 122,
    content: {
      what_is_quran: {
        title: "რა არის ყურანი?",
      },
      is_quran_god_word: {
        title: "არის თუ არა ყურანი ღვთის სიტყვა?",
      },
      why_should_read_quran: {
        title: "რატომ უნდა ვკითხულობდეთ ყურანს?",
      },
    },
  },
  {
    localizationCode: 'sr',
    translationCode: 'serbian_rwwad',
    availableTranslations: [
      {
        code: "serbian_rwwad",
        name: "Rowwad Translation Center",
      },
    ],
    domain: 'QuranRs.com',
    country: 'Serbia',
    metaTitle: 'Quran Serbia – Read and Listen to the Holy Quran in Serbian.',
    metaDescription: 'Read and understand the Holy Quran with Serbian translation. Listen to audio recitations and explore tafseer easily.',
    keywords: 'Quran, Serbian Quran, Islam, Quran App, Quran Translation',
    quranInLocal: '', // todo
    language: 'Serbian',
    bannerBackground: 'linear-gradient(90deg,#0C4076 0,#C6363C 50%,#C6363C 50%,#0C4076 100%)',
    translationFont: {
      family: 'Roboto',
      size: 18,
    },
    logoWidthWeb: 122,
    content: {
      what_is_quran: {
        title: "Шта је Куран?",
      },
      is_quran_god_word: {
        title: "Да ли је Куран Божја реч?",
      },
      why_should_read_quran: {
        title: "Зашто треба да читамо Куран?",
      },
    },
  },
  {
    localizationCode: 'hr',
    translationCode: 'croatian_rwwad',
    availableTranslations: [
      {
        code: "croatian_rwwad",
        name: "Rowwad Translation Center",
      },
    ],
    domain: 'QuranHr.com',
    country: 'Croatia',
    metaTitle: 'Quran Croatia – Read and Listen to the Holy Quran in Croatian.',
    metaDescription: 'Read and understand the Holy Quran with Croatian translation. Listen to audio recitations and explore tafseer easily.',
    keywords: 'Quran, Croatian Quran, Islam, Quran App, Quran Translation',
    quranInLocal: '', // todo
    language: 'Croatian',
    bannerBackground: 'linear-gradient(90deg,#FF0000 0,#FFFFFF 33%,#FFFFFF 33%,#0000FF 66%,#0000FF 100%)',
    translationFont: {
      family: 'Roboto',
      size: 18,
    },
    logoWidthWeb: 122,
    content: {
      what_is_quran: {
        title: "Što je Kur'an?",
      },
      is_quran_god_word: {
        title: "Je li Kur'an Božja riječ?",
      },
      why_should_read_quran: {
        title: "Zašto trebamo čitati Kur'an?",
      },
    },
  },
  {
    localizationCode: 'lt',
    translationCode: 'lithuanian_rwwad',
    availableTranslations: [
      {
        code: "lithuanian_rwwad",
        name: "Rowwad Translation Center",
      },
    ],
    domain: 'QuranLt.com',
    country: 'Lithuania',
    metaTitle: 'Quran Lithuania – Read and Listen to the Holy Quran in Lithuanian.',
    metaDescription: 'Read and understand the Holy Quran with Lithuanian translation. Listen to audio recitations and explore tafseer easily.',
    keywords: 'Quran, Lithuanian Quran, Islam, Quran App, Quran Translation',
    quranInLocal: '', // todo
    language: 'Lithuanian',
    bannerBackground: 'linear-gradient(90deg,#FDB913 0,#006A44 50%,#006A44 50%,#C1272D 100%)',
    translationFont: {
      family: 'Roboto',
      size: 18,
    },
    logoWidthWeb: 122,
    content: {
      what_is_quran: {
        title: "Kas yra Koranas?",
      },
      is_quran_god_word: {
        title: "Ar Koranas yra Dievo žodis?",
      },
      why_should_read_quran: {
        title: "Kodėl turėtume skaityti Koraną?",
      },
    },
  },
  {
    localizationCode: 'uk',
    translationCode: 'ukrainian_yakubovych',
    availableTranslations: [
      {
        code: "ukrainian_yakubovych",
        name: "Mikhailo Yakubovych",
      },
    ],
    domain: 'QuranUa.com',
    country: 'Ukraine',
    metaTitle: 'Quran Ukraine – Read and Listen to the Holy Quran in Ukrainian.',
    metaDescription: 'Read and understand the Holy Quran with Ukrainian translation. Listen to audio recitations and explore tafseer easily.',
    keywords: 'Quran, Ukrainian Quran, Islam, Quran App, Quran Translation',
    quranInLocal: '', // todo
    language: 'Ukrainian',
    bannerBackground: 'linear-gradient(90deg,#0057B7 0,#FFD700 50%,#FFD700 50%,#0057B7 100%)',
    translationFont: {
      family: 'Roboto',
      size: 18,
    },
    logoWidthWeb: 122,
    content: {
      what_is_quran: {
        title: "Що таке Коран?",
      },
      is_quran_god_word: {
        title: "Чи є Коран словом Божим?",
      },
      why_should_read_quran: {
        title: "Чому ми повинні читати Коран?",
      },
    },
  },
];

const localizationCode = process.env.NEXT_PUBLIC_LOCALIZATION_CODE;
const metaInfo = metaMapping?.find(({ localizationCode: l }) => l === localizationCode);

export const server = !process.env.NODE_ENV || process.env.NODE_ENV === 'development' ? "http://localhost:3000" : `https://www.${metaInfo?.domain}`

export const config = {
  apiBaseUrl,
  localizationCode,
  showMultiTranslation,
  ...metaInfo,

  appId: process.env.APP_ID,
}


 

const translations = {
  vn: {
    'Go To Verse': 'Đi đến Câu',
    'Bookmarks': 'Đánh dấu',
    'Pin': 'Ghim',
    'Last Read': 'Đọc lần trước',
    'Translation by': 'Translation by',
    'Change': 'Thay đổi',
    'Subjective': 'Chủ đề',
    'Chapter List': 'Danh sách chương',
    'Download': 'Tải xuống',
    'Names of Allah': 'Những tên của Allah',
    'Settings': 'Cài đặt',
    'Install App': '',
    'About': '',
    'Donate': '',
    'Chapters': 'Chương',
    'Search': 'Tìm kiếm',
    'Home': 'Trang chủ',
    'Bookmarks and Pin': 'Đánh dấu và ghim',
    'Translation': 'Dịch',
    'Choose Translation': 'Chọn bản dịch',
    'View': 'Hiển thị',
    'Arabic': 'Tiếng Ả Rập',
    'Footnotes': 'Chú thích',
    'Font Size': 'Cỡ chữ',
    'Font Family': 'Phông chữ',
    'Choose Arabic Font': 'Chọn phông tiếng Ả Rập',
    'Choose Translation Font': 'Chọn phông bản dịch',
    'Theme': 'Giao diện',
    'Change your app setting.': 'Thay đổi cài đặt ứng dụng.',
    'Choose theme': 'Chọn giao diện',
    'All Rights Reserved': 'Mọi quyền được bảo lưu',
    'Powered By': 'Được cung cấp bởi',
    'Grateful': 'Tri ân',
    'Contact': 'Liên hệ',
    'Chapters': 'Chương',
    'Search by title...': 'Tìm chủ đề...',
    'Search Chapter': 'Tìm kiếm chương',
    'Favorites': 'Ưa thích',
    'No records found': 'Không tìm thấy bản ghi',
    'Know more about the Quran': 'Biết thêm hêm về Quran',
    'Bookmark': 'Đánh dấu trang',
    'Bookmark verse': 'Đánh dấu câu',
    'Choose Folder': 'Chọn thư mục',
    '99 Names of Allah': '99 Tên của Allah',
    'Go To': 'Đi đến',
    'Download audio and pdf': 'Tải xuống âm thanh và pdf',
    'Search by name...': 'Tìm kiếm theo tên...',
    'Select chapter and verse': 'Chọn chương và câu',
    'Chapter': 'Chương',
    'Subjective': 'Chủ đề',
    'Settings': 'Cài đặt',
    'Add': 'Thêm vào',
    'Create New Folder': 'Tạo thư mục mới',
    'Email': 'Email',
    'Note': 'Ghi chú',
    'Reset': 'Cài đặt lại',
    'Play': 'Chạy',
    'Share': 'Chia sẻ',
    'Unpin': 'Bỏ ghim',
    'Share verse': 'Chia sẻ câu',
    'Copy Verse': 'Sao chép câu',
    'Copy Link': 'Sao chép link',
    'Remove bookmark': 'Gỡ đánh dấu',
    'No': 'Không',
    'Yes': 'Đúng',
    'Read more': 'Xem thêm',
    'Do you want to display Arabic?': 'Bạn có muốn hiển thị tiếng Ả rập không?',
    'You can change the display in the Settings → View section.': 'Bạn có thể thay đổi hiển thị trong phần cài đặt \'Settings -> View\'.',
    'If you remove storage or cache then your settings will be reset to default.': 
      'cài đặt sẽ được đưa về mặc định nếu xoá dữ liệu hoặc bộ nhớ đệm.'
  },
  en: {
    'Go To Verse': 'Go To Verse',
    'Bookmarks': 'Bookmarks',
    'Pin': 'Pin',
    'Last Read': 'Last Read',
    'Translation by': 'Translation by',
    'Change': 'Change',
    'Subjective': 'Subjective',
    'Chapter List': 'Chapter List',
    'Download': 'Download',
    'Names of Allah': '99 Names of Allah',
    'Settings': 'Settings',
    'Install App': 'Install App',
    'About': 'About',
    'Donate': 'Donate',
    'Chapters': 'Chapters',
    'Search': 'Search',
    'Home': 'Home',
    'Bookmarks and Pin': 'Bookmarks and Pin',
    'Translation': 'Translation',
    'Choose Translation': 'Choose Translation',
    'View': 'View',
    'Arabic': 'Arabic',
    'Footnotes': 'Footnotes',
    'Font Size': 'Font Size',
    'Font Family': 'Font Family',
    'Choose Arabic Font': 'Choose Arabic Font',
    'Choose Translation Font': 'Choose Translation Font',
    'Theme': 'Theme',
    'Change your app setting.': 'Change your app setting.',
    'Choose theme': 'Choose theme',
    'All Rights Reserved': 'All Rights Reserved',
    'Powered By': 'Powered By',
    'Grateful': 'Grateful',
    'Contact': 'Contact',
    'Search by title...': 'Search by title...',
    'Search Chapter': 'Search Chapter',
    'Favorites': 'Favorites',
    'Folder name': 'Folder name',
    'App installation process for': 'App installation process for',
    'Open Google Chrome browser and visit': 'Open Google Chrome browser and visit',
    'Click on top-right "three dots" icon. (If you see popup "Add': 'Click on top-right "three dots" icon. (If you see popup "Add',
    'to Home Screen" then click on it.': 'to Home Screen" then click on it.',
    'Click on "Install app". (If you don\'t see "Install app" then wait a few seconds and try again.)':
      'Click on "Install app". (If you don\'t see "Install app" then wait a few seconds and try again.)',
    'Click on "Install" to confirm.': 'Click on "Install" to confirm.',
    'Open Safari browser and visit': 'Open Safari browser and visit',
    'Click on "Share" icon.': 'Click on "Share" icon.',
    'Scroll to bottom and click on "Add to Home Screen".': 'Scroll to bottom and click on "Add to Home Screen".',
    'Click on "Add" to confirm.': 'Click on "Add" to confirm.',
    'By the grace of almighty Allah, extremely thankful to Quran Encyclopedia for providing authentic data to spread the message of Allah.':
      'By the grace of almighty Allah, extremely thankful to Quran Encyclopedia for providing authentic data to spread the message of Allah.',
    'For any inquiries, please email us. We\'ll get back to you as soon as we can, In\'Sha  Allah.':
      'For any inquiries, please email us. We\'ll get back to you as soon as we can, In\'Sha  Allah.',
    'Quran application in': 'Quran application in',
    'Developed and maintain by': 'Developed and maintain by',
    'Deeni Info Tech is a non-profit Software Development organization to spread the message of Islam worldwide.':
      'Deeni Info Tech is a non-profit Software Development organization to spread the message of Islam worldwide.',
    'Deeni Info Tech working for the following three sets of goals:':
      'Deeni Info Tech working for the following three sets of goals:',
    'Applications for Scholars & Da\'wah organizations': 'Applications for Scholars & Da\'wah organizations',
    'Applications for Non-Muslim Countries': 'Applications for Non-Muslim Countries',
    'Develop Islamic applications': 'Develop Islamic applications',
    'The primary goal of Deeni Info Tech is to create more promising Islamic applications. All our applications is/will be free of charge and entirely ad-free.':
      'The primary goal of Deeni Info Tech is to create more promising Islamic applications. All our applications is/will be free of charge and entirely ad-free.',
    'Please mail us if you want to support. Any kind of support is highly appreciable.':
      'Please mail us if you want to support. Any kind of support is highly appreciable.',
    'Bookmark': 'Bookmark',
    '99 Names of Allah': '99 Names of Allah',
    'Go To': 'Go To',
    'Download audio and pdf': 'Download audio and pdf',
    'Search by name...': 'Search by name...',
    'Website': 'Website',
    'Select chapter and verse': 'Select chapter and verse',
    'Chapter': 'Chapter',
    'Email': 'Email',
    'Note': 'Note',
    'Reset': 'Reset',
    'If you remove storage or cache then your settings will be reset to default.':
      'If you remove storage or cache then your settings will be reset to default.'
  },
  // ... (other language translations remain the same)
};

export const t = (key) => {
  return translations[config.localizationCode]?.[key] || translations['en'][key] || key;
};

export const getAvailableLanguages = () => {
  return Object.keys(translations).map((code) => ({
    code,
    name: translations[code]['Language'] || code.toUpperCase()
  }));
};
export const getAvailableTranslations = () => {
  // Get translations based on current localization
  const currentLanguage = config.language;
  
  // First try to get from config.availableTranslations
  if (config.availableTranslations && config.availableTranslations.length > 0) {
    return config.availableTranslations;
  }
  
  // Fallback: Get from translationData based on language
  if (currentLanguage && translationData[currentLanguage]) {
    return translationData[currentLanguage];
  }
  
  // Last fallback: Vietnamese
  return [
    { code: "vietnamese_hassan", name: "Hasan Abdul-Karim" },
    { code: "vietnamese_rwwad", name: "Ruwwad Translation Center" },
  ];
}

// Get the dynamic route prefix based on translation code
export const getRoutePrefix = (translationCode) => {
  if (!translationCode) return '';
  
  // Map translation codes to route prefixes
  const routeMapping = {
    // Vietnamese
    vietnamese_hassan: 'vietnamese_hassan',
    vietnamese_rwwad: 'vietnamese_rwwad',
    vietnamese_mokhtasar: 'vietnamese_mokhtasar',
    
    // Khmer
    khmer_cambodia: 'khmer_cambodia',
    khmer_rwwad: 'khmer_rwwad',
    khmer_mokhtasar: 'khmer_mokhtasar',
    
    // Korean
    korean_hamid: 'korean_hamid',
    korean_rwwad: 'korean_rwwad',
    
    // Chinese
    chinese_makin: 'chinese_makin',
    chinese_suliman: 'chinese_suliman',
    chinese_mayolong: 'chinese_mayolong',
    chinese_mokhtasar: 'chinese_mokhtasar',
    
    // Japanese
    japanese_saeedsato: 'japanese_saeedsato',
    japanese_mokhtasar: 'japanese_mokhtasar',
    
    // Danish
    'dan-hadiabdollahian': 'dan-hadiabdollahian',
    'dan-vandetaal': 'dan-vandetaal',
    
    // Filipino
    tagalog_rwwad: 'tagalog_rwwad',
    bisayan_rwwad: 'bisayan_rwwad',
    iranun_sarro: 'iranun_sarro',
    maguindanao_rwwad: 'maguindanao_rwwad',
    tagalog_mokhtasar: 'tagalog_mokhtasar',
    
    // French
    french_rashid: 'french_rashid',
    french_montada: 'french_montada',
    french_hameedullah: 'french_hameedullah',
    french_mokhtasar: 'french_mokhtasar',
    
    // German
    german_bubenheim: 'german_bubenheim',
    german_aburida: 'german_aburida',
    german_rwwad: 'german_rwwad',
    
    // Portuguese
    portuguese_nasr: 'portuguese_nasr',
    por_samirelhayek: 'por_samirelhayek',

    // Turkish
    turkish_rwwad: 'turkish_rwwad',
    turkish_shaban: 'turkish_shaban',
    turkish_shahin: 'turkish_shahin',
  };
  
  return routeMapping[translationCode] || '';
}

// Get translation code from route prefix
export const getTranslationFromRoute = (routePrefix) => {
  return routePrefix; // They are the same in our mapping
}

// Build dynamic chapter URL based on translation
export const buildChapterUrl = (translationCode, chapterSlug) => {
  // If it's the first available translation, use the base route without translation code
  if (isFirstTranslation(translationCode)) {
    return `/chapters/${chapterSlug}`;
  }
  
  const routePrefix = getRoutePrefix(translationCode);
  if (!routePrefix) {
    return `/chapters/${chapterSlug}`;
  }
  return `/${routePrefix}/chapters/${chapterSlug}`;
}

// Build dynamic verse URL based on translation
export const buildVerseUrl = (translationCode, chapterSlug, verseNo) => {
  const routePrefix = getRoutePrefix(translationCode);
  if (!routePrefix) {
    return `/chapters/${chapterSlug}/verses/${verseNo}`;
  }
  return `/${routePrefix}/chapters/${chapterSlug}/verses/${verseNo}`;
}

// Build dynamic subjective URL based on translation
export const buildSubjectiveUrl = (translationCode, slug = '') => {
  const routePrefix = getRoutePrefix(translationCode);
  if (!routePrefix) {
    return slug ? `/subjective/${slug}` : '/subjective';
  }
  return slug ? `/${routePrefix}/subjective/${slug}` : `/${routePrefix}/subjective`;
}

// Get default translation for current localization
export const getDefaultTranslation = () => {
  const envKey = `NEXT_PUBLIC_DEFAULT_TRANSLATION_${localizationCode?.toUpperCase()}`;
  return process.env[envKey] || config.translationCode;
}

// Get first available translation (for default routes)
export const getFirstAvailableTranslation = () => {
  const availableTranslations = getAvailableTranslations();
  return availableTranslations.length > 0 ? availableTranslations[0].code : getDefaultTranslation();
}

// Check if translation is the first available translation
export const isFirstTranslation = (translationCode) => {
  const firstTranslation = getFirstAvailableTranslation();
  return translationCode === firstTranslation;
}