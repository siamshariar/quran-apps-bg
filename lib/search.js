const allVerses = [
  {
    chapter_number: 1,
    verse_number: 1,
    chapter_name: "Al-Fātihah",
    chapter_name_vi: "Al-Fatihah (Khai Đề)",
    text: "Nhân danh Allah(1), Đấng Rất Mực Độ Lượng, Đấng Rất Mực Khoan Dung(2)",
    translation: "Nhân danh Allah(1), Đấng Rất Mực Độ Lượng, Đấng Rất Mực Khoan Dung",
    translation_vi: "Nhân danh Allah, Đấng Rất Mực Độ Lượng, Đấng Rất Mực Khoan Dung.",
    arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
    chapter_slug: "1-al-fatihah",
    mp3Url: "https://audio.qurancdn.com/verse/1:1",
  },
  {
    chapter_number: 1,
    verse_number: 2,
    chapter_name: "Al-Fātihah",
    chapter_name_vi: "Al-Fatihah (Khai Đề)",
    text: "Mọi lời ca tụng đều dâng lên Allah, Thượng Đế(3) của vũ trụ và muôn loài",
    translation: "Mọi lời ca tụng đều dâng lên Allah, Thượng Đế(3) của vũ trụ và muôn loài.",
    translation_vi: "Mọi lời ca ngợi đều dâng lên Allah, Thượng Đế của vũ trụ và vạn vật.",
    arabic: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
    chapter_slug: "1-al-fatihah",
    mp3Url: "https://audio.qurancdn.com/verse/1:2",
  },
  {
    chapter_number: 55,
    verse_number: 13,
    chapter_name: "Ar-Rahman",
    chapter_name_vi: "Ar-Rahman (Đấng Rất Mực Độ Lượng)",
    text: "So which of the favors of your Lord would you deny?",
    translation: "Thế Ân Huệ nào của Thượng Đế của hai ngươi (Jinn và con người) mà hai ngươi phủ nhận?",
    translation_vi: "Vậy, ân huệ nào của Thượng Đế của các ngươi mà các ngươi phủ nhận?",
    arabic: "فَبِأَيِّ آلَاءِ رَبِّكُمَا تُكَذِّبَانِ",
    chapter_slug: "55-ar-rahman",
    mp3Url: "https://audio.qurancdn.com/verse/55:13",
  },
  {
    chapter_number: 114,
    verse_number: 1,
    chapter_name: "An-Nas",
    chapter_name_vi: "An-Nas (Nhân Loại)",
    text: "Say, 'I seek refuge in the Lord of mankind,",
    translation: "Hãy nói: 'Bề tôi cầu xin Thượng Đế của nhân loại,",
    translation_vi: "Hãy nói: 'Tôi xin cầu xin sự che chở của Thượng Đế của nhân loại,",
    arabic: "قُلْ أَعُوذُ بِرَبِّ النَّاسِ",
    chapter_slug: "114-an-nas",
    mp3Url: "https://audio.qurancdn.com/verse/114:1",
  },
  {
    chapter_number: 114,
    verse_number: 2,
    chapter_name: "An-Nas",
    chapter_name_vi: "An-Nas (Nhân Loại)",
    text: "The Sovereign of mankind.",
    translation: "Đức Vua của nhân loại,",
    translation_vi: "Vua của nhân loại,",
    arabic: "مَلِكِ النَّاسِ",
    chapter_slug: "114-an-nas",
    mp3Url: "https://audio.qurancdn.com/verse/114:2",
  },
  {
    chapter_number: 114,
    verse_number: 3,
    chapter_name: "An-Nas",
    chapter_name_vi: "An-Nas (Nhân Loại)",
    text: "The God of mankind,",
    translation: "Đấng Thượng Đế của nhân loại,",
    translation_vi: "Thượng Đế của nhân loại,",
    arabic: "إِلَٰهِ النَّاسِ",
    chapter_slug: "114-an-nas",
    mp3Url: "https://audio.qurancdn.com/verse/114:3",
  },
  {
    chapter_number: 114,
    verse_number: 4,
    chapter_name: "An-Nas",
    chapter_name_vi: "An-Nas (Nhân Loại)",
    text: "From the evil of the retreating whisperer",
    translation: "(Che chở) tránh khỏi sự hãm hại của kẻ thì thào (lời xúi giục, bùa phép) rồi lẫn mất,",
    translation_vi: "Khỏi cái ác của kẻ thì thầm rồi rút lui,",
    arabic: "مِنْ شَرِّ الْوَسْوَاسِ الْخَنَّاسِ",
    chapter_slug: "114-an-nas",
    mp3Url: "https://audio.qurancdn.com/verse/114:4",
  },
  {
    chapter_number: 114,
    verse_number: 5,
    chapter_name: "An-Nas",
    chapter_name_vi: "An-Nas (Nhân Loại)",
    text: "Who whispers [evil] into the breasts of mankind",
    translation: "Kẻ đã thì thào (những điều tác hại) vào lòng người,",
    translation_vi: "Kẻ thì thầm vào lòng người,",
    arabic: "الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ",
    chapter_slug: "114-an-nas",
    mp3Url: "https://audio.qurancdn.com/verse/114:5",
  },
  {
    chapter_number: 114,
    verse_number: 6,
    chapter_name: "An-Nas",
    chapter_name_vi: "An-Nas (Nhân Loại)",
    text: "From among the jinn and mankind.",
    translation: "Từ loài Jinn và loài người.",
    translation_vi: "Từ loài Jinn và loài người.",
    arabic: "مِنَ الْجِنَّةِ وَالنَّاسِ",
    chapter_slug: "114-an-nas",
    mp3Url: "https://audio.qurancdn.com/verse/114:6",
  },
  {
    chapter_number: 2,
    verse_number: 1,
    chapter_name: "Al-Baqarah",
    chapter_name_vi: "Al-Baqarah (Con Bò Cái)",
    text: "Alif, Lam, Meem.",
    translation: "Alif, Lam, Meem.",
    translation_vi: "Alif, Lam, Meem.",
    arabic: "الم",
    chapter_slug: "2-al-baqarah",
    mp3Url: "https://audio.qurancdn.com/verse/2:1",
  },
  {
    chapter_number: 2,
    verse_number: 2,
    chapter_name: "Al-Baqarah",
    chapter_name_vi: "Al-Baqarah (Con Bò Cái)",
    text: "This is the Book about which there is no doubt, a guidance for those conscious of Allah",
    translation:
      "Đây là Kinh Sách (Al-Qur'an) không có gì đáng nghi ngờ trong đó, là sự hướng dẫn cho những người kiêng sợ (Allah)",
    translation_vi: "Đây là Kinh Sách không có gì đáng nghi ngờ, là sự hướng dẫn cho những người tâm đức.",
    arabic: "ذَٰلِكَ الْكِتَابُ لَا رَيْبَ ۛ فِيهِ ۛ هُدًى لِّلْمُتَّقِينَ",
    chapter_slug: "2-al-baqarah",
    mp3Url: "https://audio.qurancdn.com/verse/2:2",
  },
]

export function performSearch(query, page = 1, limit = 10) {
  if (!query || query.trim().length < 1) {
    return { verses: [], total: 0, page: Number.parseInt(page), limit: Number.parseInt(limit) }
  }

  const searchTerm = query.toLowerCase().trim()

  // Enhanced search with better relevance scoring
  const filteredVerses = allVerses.filter((verse) => {
    const textMatch = verse.text.toLowerCase().includes(searchTerm)
    const translationMatch = verse.translation.toLowerCase().includes(searchTerm)
    const translationViMatch = verse.translation_vi && verse.translation_vi.toLowerCase().includes(searchTerm)
    const chapterNameMatch = verse.chapter_name.toLowerCase().includes(searchTerm)
    const chapterNameViMatch = verse.chapter_name_vi && verse.chapter_name_vi.toLowerCase().includes(searchTerm)
    const arabicMatch = verse.arabic.includes(searchTerm)

    return textMatch || translationMatch || translationViMatch || chapterNameMatch || chapterNameViMatch || arabicMatch
  })

  const scoredVerses = filteredVerses.map((verse) => {
    let score = 0
    const lowerText = verse.text.toLowerCase()
    const lowerTranslation = verse.translation.toLowerCase()

    if (lowerText === searchTerm || lowerTranslation === searchTerm) {
      score += 100
    }
    else if (lowerText.includes(` ${searchTerm} `) || lowerTranslation.includes(` ${searchTerm} `)) {
      score += 80
    }
    else if (lowerText.startsWith(searchTerm) || lowerTranslation.startsWith(searchTerm)) {
      score += 60
    }
    else if (lowerText.includes(searchTerm) || lowerTranslation.includes(searchTerm)) {
      score += 40
    }

    if (verse.chapter_name.toLowerCase().includes(searchTerm)) {
      score += 20
    }

    if (verse.arabic.includes(searchTerm)) {
      score += 30
    }

    return { ...verse, relevanceScore: score }
  })

  const sortedVerses = scoredVerses.sort((a, b) => {
    if (b.relevanceScore !== a.relevanceScore) {
      return b.relevanceScore - a.relevanceScore
    }
    if (a.chapter_number !== b.chapter_number) {
      return a.chapter_number - b.chapter_number
    }
    return a.verse_number - b.verse_number
  })

  const total = sortedVerses.length
  const startIndex = (Number.parseInt(page) - 1) * Number.parseInt(limit)
  const endIndex = startIndex + Number.parseInt(limit)
  const paginatedResults = sortedVerses.slice(startIndex, endIndex)

  return {
    verses: paginatedResults,
    total: total,
    page: Number.parseInt(page),
    limit: Number.parseInt(limit),
  }
}

export function performAdvancedSearch(query, filters = {}) {
  const { chapterNumbers, verseRange, translationType } = filters

  let results = allVerses

  if (chapterNumbers && chapterNumbers.length > 0) {
    results = results.filter((verse) => chapterNumbers.includes(verse.chapter_number))
  }

  if (verseRange && verseRange.start && verseRange.end) {
    results = results.filter((verse) => verse.verse_number >= verseRange.start && verse.verse_number <= verseRange.end)
  }

  if (query && query.trim()) {
    const searchTerm = query.toLowerCase().trim()
    results = results.filter((verse) => {
      const searchFields = [
        verse.text,
        verse.translation,
        verse.translation_vi,
        verse.chapter_name,
        verse.chapter_name_vi,
        verse.arabic,
      ].filter(Boolean)

      return searchFields.some((field) => field.toLowerCase().includes(searchTerm))
    })
  }

  return results
}

export function getSearchSuggestions(query) {
  if (!query || query.trim().length < 2) {
    return []
  }

  const searchTerm = query.toLowerCase().trim()
  const suggestions = new Set()

  const uniqueChapters = [...new Set(allVerses.map((v) => v.chapter_name))]
  uniqueChapters.forEach((chapter) => {
    if (chapter.toLowerCase().includes(searchTerm)) {
      suggestions.add(chapter)
    }
  })

  allVerses.forEach((verse) => {
    const words = verse.text.toLowerCase().split(/\s+/)
    words.forEach((word) => {
      if (word.length > 3 && word.includes(searchTerm) && word !== searchTerm) {
        suggestions.add(word)
      }
    })
  })

  return Array.from(suggestions).slice(0, 5)
}
