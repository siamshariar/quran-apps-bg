

export function saveMultiTranslationChapter(chapterData) {
  if (typeof window === "undefined" || !chapterData) return

  try {
    const dataToSave = {
      ...chapterData,
      timestamp: Date.now(),
      path: `/multi-translation/chapters/${chapterData.slug}`,
    }
    localStorage.setItem("multiTranslationLastChapter", JSON.stringify(dataToSave))
  } catch (error) {
  }
}

export function getLastMultiTranslationChapter(chapters = []) {
  if (typeof window === "undefined") return null

  try {
    const stored = localStorage.getItem("multiTranslationLastChapter")
    if (!stored) return null

    const chapterData = JSON.parse(stored)

    if (!chapterData.slug || !chapterData.chapterNo) {
      localStorage.removeItem("multiTranslationLastChapter")
      return null
    }

    if (chapters.length > 0) {
      const chapterExists = chapters.some(
        (ch) => ch.slug === chapterData.slug || ch.chapterNo === chapterData.chapterNo,
      )

      if (!chapterExists) {
        localStorage.removeItem("multiTranslationLastChapter")
        return null
      }
    }

    return chapterData
  } catch (error) {
    localStorage.removeItem("multiTranslationLastChapter")
    return null
  }
}

export function clearMultiTranslationChapter() {
  if (typeof window === "undefined") return

  try {
    localStorage.removeItem("multiTranslationLastChapter")
  } catch (error) {
  }
}

export function navigateToMultiTranslation(router, chapters = []) {
  const lastChapter = getLastMultiTranslationChapter(chapters)

  if (lastChapter && lastChapter.slug) {
    router.push(`/multi-translation/chapters/${lastChapter.slug}`)
  } else {
    router.push("/multi-translation")
  }
}
