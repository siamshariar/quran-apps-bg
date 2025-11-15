import { config } from "./config"
import {
  getFallbackChapterTransliteration,
  getFallbackVerseTransliteration,
  hasTransliterationData,
  getAvailableTransliterationChapters,
} from "../data/transliteration"
import chapters from "../data/chapters"

const apiBaseUrl = config.apiBaseUrl
const localizationCode = config.localizationCode
const translationCode = config.translationCode

class CacheManager {
  constructor() {
    this.cache = new Map()
    this.ttl = 10 * 60 * 1000
  }

  set(key, value) {
    this.cache.set(key, {
      value,
      timestamp: Date.now(),
    })
  }

  get(key) {
    const item = this.cache.get(key)
    if (!item) return null

    if (Date.now() - item.timestamp > this.ttl) {
      this.cache.delete(key)
      return null
    }

    return item.value
  }

  clear() {
    this.cache.clear()
  }

  size() {
    return this.cache.size
  }
}

const responseCache = new CacheManager()

async function enhancedFetch(url, options = {}, retries = 2, retryDelay = 1000) {
  try {
    const cachedResponse = responseCache.get(url)
    if (cachedResponse) {
      return cachedResponse
    }

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 30000)

    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      credentials: "omit",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Accept": "application/json; charset=utf-8",
        "Accept-Charset": "utf-8",
        "User-Agent": "QuranApp/1.0",
        ...options.headers,
      },
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    // Ensure proper UTF-8 decoding
    const text = await response.text()
    
    // Debug: Log first 500 chars of response for encoding issues
    if (url.includes('khmer')) {
      console.log('🔍 Khmer API Response (first 500 chars):', text.substring(0, 500))
    }
    
    const data = JSON.parse(text)
    responseCache.set(url, data)
    return data
  } catch (error) {
    if (error.name === "AbortError") {
      if (retries > 0) {
        await new Promise((resolve) => setTimeout(resolve, retryDelay))
        return enhancedFetch(url, options, retries - 1, retryDelay * 1.5)
      }
    } else if (retries > 0) {
      await new Promise((resolve) => setTimeout(resolve, retryDelay))
      return enhancedFetch(url, options, retries - 1, retryDelay * 1.5)
    }
    throw error
  }
}

export async function getChaptersInfo() {
  try {
    const data = await enhancedFetch(`${apiBaseUrl}/chapters/localizations/${localizationCode}`)
    return data
  } catch (err) {
    console.error("Failed to load chapters info from API, using local fallback:", err)
    // Fallback to local chapters data
    return chapters.map(chapter => ({
      id: chapter.chapterNo,
      chapterNo: chapter.chapterNo,
      name: chapter.name,
      nameArabic: chapter.nameArabic,
      meaning: chapter.meaning,
      slug: chapter.slug,
      totalVerse: chapter.totalVerse,
      placeOfRevelation: chapter.placeOfRevelation,
      introduction: chapter.introduction,
      mp3Url: chapter.mp3Url,
      pdfUrl: chapter.pdfUrl
    }))
  }
}

export async function getChapterDetails(chapterNo, translation = null) {
  const trans = translation || config.translationCode

  try {
    const data = await enhancedFetch(`${apiBaseUrl}/translations/${trans}/chapters/${chapterNo}`)

    if (!data || !data.verses) {
      console.error(`Failed to load translation ${trans} for chapter ${chapterNo}`)
      return null
    }

    return data
  } catch (error) {
    console.error(`Failed to load translation ${trans} for chapter ${chapterNo}:`, error.message)

    // Try fallback to Arabic text if translation fails
    try {
      console.log(`Trying fallback to Arabic text for chapter ${chapterNo}`)
      const arabicData = await enhancedFetch(`${apiBaseUrl}/translations/arabic_original/chapters/${chapterNo}`)
      if (arabicData && arabicData.verses) {
        console.log(`✅ Using Arabic fallback for chapter ${chapterNo}`)
        return arabicData
      }
    } catch (arabicError) {
      console.error(`Arabic fallback also failed for chapter ${chapterNo}:`, arabicError.message)
    }

    return null
  }
}

// Enhanced transliteration functions with fallback support
export async function getChapterTransliteration(chapterNo) {
  try {
    // First try to get from API
    const data = await enhancedFetch(`${apiBaseUrl}/translations/english_transliteration/chapters/${chapterNo}`)
    if (data && data.verses) {
      console.log(`API transliteration found for chapter ${chapterNo}`)
      return data
    }
  } catch (error) {
    console.log(`API transliteration not available for chapter ${chapterNo}, trying fallback`)
  }

  // Fallback to local data
  const fallbackData = getFallbackChapterTransliteration(chapterNo)
  if (fallbackData) {
    console.log(`Using fallback transliteration for chapter ${chapterNo}`)
    return {
      chapterNo: chapterNo,
      verses: fallbackData,
    }
  }

  console.log(`No transliteration available for chapter ${chapterNo}`)
  return null
}

export async function getVerseTransliteration(chapterNo, verseNo) {
  try {
    // First try to get from API
    const data = await enhancedFetch(
      `${apiBaseUrl}/translations/english_transliteration/chapters/${chapterNo}/verses/${verseNo}`,
    )
    if (data) {
      console.log(`API transliteration found for chapter ${chapterNo}, verse ${verseNo}`)
      return data
    }
  } catch (error) {
    console.log(`API transliteration not available for chapter ${chapterNo}, verse ${verseNo}, trying fallback`)
  }

  // Fallback to local data
  const fallbackTransliteration = getFallbackVerseTransliteration(chapterNo, Number.parseInt(verseNo))
  if (fallbackTransliteration) {
    console.log(`Using fallback transliteration for chapter ${chapterNo}, verse ${verseNo}`)
    return {
      verseNo: Number.parseInt(verseNo),
      translation: fallbackTransliteration,
    }
  }

  console.log(`No transliteration available for chapter ${chapterNo}, verse ${verseNo}`)
  return null
}

// New function to get transliteration with enhanced fallback
export async function getTransliterationWithFallback(chapterNo, verseNo = null) {
  if (verseNo) {
    return await getVerseTransliteration(chapterNo, verseNo)
  } else {
    return await getChapterTransliteration(chapterNo)
  }
}

// Function to check if transliteration is available (local or API)
export function isTransliterationAvailable(chapterNo) {
  return hasTransliterationData(chapterNo)
}

// Get list of chapters with available transliteration
export function getChaptersWithTransliteration() {
  return getAvailableTransliterationChapters()
}

export async function getMultipleTranslations(chapterNo, translationCodes) {
  try {
    const promises = translationCodes.map(async (code) => {
      try {
        let data
        if (code === "english_transliteration") {
          // Use enhanced transliteration function
          data = await getChapterTransliteration(chapterNo)
        } else {
          data = await getChapterDetails(chapterNo, code)
        }
        return { code, data, success: true }
      } catch (error) {
        return { code, data: null, success: false, error }
      }
    })

    const results = await Promise.allSettled(promises)
    const translations = {}
    const errors = []

    results.forEach((result) => {
      if (result.status === "fulfilled") {
        const { code, data, success, error } = result.value
        if (success && data?.verses) {
          translations[code] = data.verses
        } else if (error) {
          errors.push({ code, error })
        }
      } else {
        errors.push({ error: result.reason })
      }
    })

    if (errors.length > 0) {
      console.log("Translation fetch errors:", errors)
    }

    return translations
  } catch (error) {
    console.error("Error in getMultipleTranslations:", error)
    return {}
  }
}

export async function getVerseDetails(chapterNo, verseNo, translation = null) {
  const trans = translation || config.translationCode
  const url = `${apiBaseUrl}/translations/${trans}/chapters/${chapterNo}/verses/${verseNo}`

  try {
    const data = await enhancedFetch(url)
    return data
  } catch (error) {
    return null
  }
}

export async function getVersesByQuery(verses) {
  const url = `${apiBaseUrl}/translations/${translationCode}?verses=${verses}`
  return fetchDataByUrl(url)
}

export async function fetchDataByUrl(url) {
  try {
    const data = await enhancedFetch(url)
    return data
  } catch (error) {
    console.error("Error fetching data:", error)
    return null
  }
}

export async function searchChapters(query) {
  try {
    const chapters = await getChaptersInfo()
    if (!chapters) return []

    const searchTerm = query.toLowerCase().trim()
    const results = []

    chapters.forEach((chapter) => {
      let relevanceScore = 0

      if (chapter.chapterNo.toString() === searchTerm) {
        relevanceScore = 100
      } else if (chapter.chapterNo.toString().includes(searchTerm)) {
        relevanceScore = 90
      } else if (chapter.name.toLowerCase() === searchTerm) {
        relevanceScore = 95
      } else if (chapter.name.toLowerCase().startsWith(searchTerm)) {
        relevanceScore = 85
      } else if (chapter.name.toLowerCase().includes(searchTerm)) {
        relevanceScore = 70
      } else if (chapter.meaning && chapter.meaning.toLowerCase().includes(searchTerm)) {
        relevanceScore = 60
      }

      if (relevanceScore > 0) {
        results.push({
          type: "chapter",
          chapter_number: chapter.chapterNo,
          name: `Surah ${chapter.name}`,
          slug: chapter.slug,
          relevanceScore,
          meaning: chapter.meaning,
          hasTransliteration: hasTransliterationData(chapter.chapterNo),
        })
      }
    })

    return results.sort((a, b) => b.relevanceScore - a.relevanceScore).slice(0, 5)
  } catch (error) {
    return []
  }
}

export async function searchPages(query) {
  try {
    const searchTerm = query.toLowerCase().trim()
    const results = []

    const pagePatterns = [/page\s*(\d+)/i, /p\s*(\d+)/i, /^(\d+)$/]

    let pageNumber = null
    for (const pattern of pagePatterns) {
      const match = searchTerm.match(pattern)
      if (match) {
        pageNumber = Number.parseInt(match[1])
        break
      }
    }

    if (pageNumber && pageNumber >= 1 && pageNumber <= 604) {
      results.push({
        type: "page",
        page_number: pageNumber,
        relevanceScore: 100,
      })
    }

    return results
  } catch (error) {
    return []
  }
}

export async function searchJuz(query) {
  try {
    const searchTerm = query.toLowerCase().trim()
    const results = []

    const juzPatterns = [/juz\s*(\d+)/i, /para\s*(\d+)/i, /part\s*(\d+)/i, /^(\d+)$/]

    let juzNumber = null
    for (const pattern of juzPatterns) {
      const match = searchTerm.match(pattern)
      if (match) {
        juzNumber = Number.parseInt(match[1])
        break
      }
    }

    if (juzNumber && juzNumber >= 1 && juzNumber <= 30) {
      results.push({
        type: "juz",
        juz_number: juzNumber,
        relevanceScore: 100,
      })
    }

    return results
  } catch (error) {
    return []
  }
}

export async function searchQuran(query, page = 1, limit = 10) {
  try {
    if (!query || query.trim().length < 1) {
      return { verses: [], total: 0, page: page, limit: limit }
    }

    const baseUrl = typeof window !== "undefined" ? window.location.origin : ""
    const apiUrl = `${baseUrl}/api/search?query=${encodeURIComponent(query)}&page=${page}&limit=${limit}`

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 15000)

    const res = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      signal: controller.signal,
      cache: "no-store",
    })

    clearTimeout(timeoutId)

    if (!res.ok) {
      return { verses: [], total: 0, page: page, limit: limit }
    }

    const data = await res.json()
    return data
  } catch (error) {
    if (error.name === "AbortError") {
      console.log("Search request timed out")
    } else {
      console.error("Search error:", error)
    }
    return { verses: [], total: 0, page: page, limit: limit }
  }
}

export async function getMultipleVerseTranslations(chapterNo, verseNo, translationCodes) {
  try {
    const promises = translationCodes.map(async (code) => {
      try {
        if (code === "english_transliteration") {
          return await getVerseTransliteration(chapterNo, verseNo)
        } else {
          return await getVerseDetails(chapterNo, verseNo, code)
        }
      } catch (error) {
        return null
      }
    })

    const results = await Promise.all(promises)
    const translations = {}

    translationCodes.forEach((code, index) => {
      if (results[index]) {
        translations[code] = [results[index]]
      }
    })

    return translations
  } catch (error) {
    return {}
  }
}

// Subjective functions remain the same...
export async function getSubjectives() {
  const url = `${apiBaseUrl}/subjective/localizations/${localizationCode}?type=1`
  return fetchDataByUrl(url)
}

export async function getParentSubjectives() {
  const url = `${apiBaseUrl}/subjective/localizations/${localizationCode}?type=2`
  return fetchDataByUrl(url)
}

export async function getParentSubjectiveBySlug(slug) {
  const url = `${apiBaseUrl}/subjective/${slug}/localizations/${localizationCode}`
  return fetchDataByUrl(url)
}

export async function getSubjectiveVersesBySlug(slug) {
  const url = `${apiBaseUrl}/subjective/${slug}/verses/localizations/${localizationCode}`
  return fetchDataByUrl(url)
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
  const url = `${apiBaseUrl}/subjective/localizations/${localizationCode}`
  return fetchDataByUrl(url)
}

export async function getNamesOfAllah() {
  const url = `${apiBaseUrl}/names-of-allah/localizations/${localizationCode}`
  return fetchDataByUrl(url)
}

export async function fetchWithTimeout(url, options = {}, timeout = 8000) {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeout)

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    })
    clearTimeout(timeoutId)
    return response
  } catch (error) {
    clearTimeout(timeoutId)
    throw error
  }
}

export async function batchFetch(urls, options = {}) {
  const promises = urls.map((url) => fetchWithTimeout(url, options).catch((error) => ({ error, url })))
  return Promise.all(promises)
}

export function clearCache() {
  responseCache.clear()
}

export function getCacheSize() {
  return responseCache.size()
}

export function removeCacheEntry(url) {
  return responseCache.cache.delete(url)
}

export async function healthCheck() {
  try {
    const response = await fetchWithTimeout(`${apiBaseUrl}/health`, {}, 5000)
    return response.ok
  } catch (error) {
    return false
  }
}
