"use client"

import { useState, useEffect, createContext } from "react"
import { useRouter } from "next/router"
import { settings as defaultSettings } from "../lib/settings"
import { getFirstAvailableTranslation, isFirstTranslation } from "../lib/config"

export const SettingsContext = createContext()

const SettingsContextProvider = ({ children }) => {
  const [settings, setSettings] = useState(defaultSettings)
  const [isReady, setIsReady] = useState(false)
  const router = useRouter()

  // Initialize settings on first render
  useEffect(() => {
    console.log("Initializing settings...")
    try {
      const savedSettings = localStorage.getItem("settings")
      const newSettings = savedSettings === null ? defaultSettings : JSON.parse(savedSettings)

      if (!newSettings.view) {
        newSettings.view = {
          arabic: true,
          translation: true,
          tafseer: true,
          transliteration: false,
        }
      } else {
        if (newSettings.view.tafseer === undefined) {
          newSettings.view.tafseer = true
        }
        if (newSettings.view.transliteration === undefined) {
          newSettings.view.transliteration = false
        }
      }

      if (!newSettings.selectedTranslations) {
        newSettings.selectedTranslations = [newSettings.translation]
      }

      const savedSelectedTranslations = localStorage.getItem("selectedTranslations")
      if (savedSelectedTranslations) {
        try {
          const parsedTranslations = JSON.parse(savedSelectedTranslations)
          if (Array.isArray(parsedTranslations) && parsedTranslations.length > 0) {
            newSettings.selectedTranslations = parsedTranslations
          }
        } catch (error) {}
      }

      // Extract translation from URL if present
      if (typeof window !== "undefined") {
        const currentPath = window.location.pathname
        
        // Pattern: /[translation_code]/chapters/[slug] or /[translation_code]/subjective/...
        const translationMatch = currentPath.match(/^\/([^\/]+)\/(chapters|subjective)/)
        
        if (translationMatch && translationMatch[1]) {
          const urlSegment = translationMatch[1]
          // Check if it's a valid translation code (contains underscore or hyphen)
          if (urlSegment.includes('_') || urlSegment.includes('-')) {
            console.log("Detected translation from URL:", urlSegment)
            newSettings.translation = urlSegment
            localStorage.setItem("settings", JSON.stringify(newSettings))
          }
        } else {
          // Check if it's a base route like /chapters/[slug] or /subjective/[slug]
          const baseRouteMatch = currentPath.match(/^\/(chapters|subjective)\//)
          if (baseRouteMatch) {
            // Base route uses first available translation
            const firstTranslation = getFirstAvailableTranslation()
            console.log("Base route detected, using first translation:", firstTranslation)
            newSettings.translation = firstTranslation
            localStorage.setItem("settings", JSON.stringify(newSettings))
          } else if (currentPath.startsWith("/vietnamese_rwwad/subjective/")) {
            newSettings.translation = "vietnamese_rwwad"
            localStorage.setItem("settings", JSON.stringify(newSettings))
          } else if (currentPath.includes("/subjective/")) {
            newSettings.translation = "vietnamese_hassan"
            localStorage.setItem("settings", JSON.stringify(newSettings))
          }
        }
      }

      console.log("Loaded settings:", newSettings)
      initSettings(newSettings)
      setSettings(newSettings)
      setIsReady(true)
    } catch (error) {
      console.error("Error initializing settings:", error)
      initSettings(defaultSettings)
      setSettings(defaultSettings)
      setIsReady(true)
    }
  }, [])

  useEffect(() => {
    if (isReady && typeof window !== "undefined") {
      const handlePopState = () => {
        const currentPath = window.location.pathname
        if (currentPath.includes("/subjective/")) {
          let newTranslation = settings.translation
          if (currentPath.startsWith("/vietnamese_rwwad/subjective/")) {
            newTranslation = "vietnamese_rwwad"
          } else if (currentPath.includes("/subjective/")) {
            newTranslation = "vietnamese_hassan"
          }
          if (newTranslation !== settings.translation) {
            console.log("Subjective URL changed, updating translation to:", newTranslation)
            const newSettings = { ...settings, translation: newTranslation }
            localStorage.setItem("settings", JSON.stringify(newSettings))
            setSettings(newSettings)
          }
        }
      }

      window.addEventListener("popstate", handlePopState)

      const checkCurrentPath = () => {
        const currentPath = window.location.pathname
        if (currentPath.includes("/subjective/")) {
          let expectedTranslation = "vietnamese_hassan"
          if (currentPath.startsWith("/vietnamese_rwwad/subjective/")) {
            expectedTranslation = "vietnamese_rwwad"
          }
          if (expectedTranslation !== settings.translation) {
            console.log("Subjective path changed, updating translation to:", expectedTranslation)
            const newSettings = { ...settings, translation: expectedTranslation }
            localStorage.setItem("settings", JSON.stringify(newSettings))
            setSettings(newSettings)
          }
        }
      }

      checkCurrentPath()

      return () => {
        window.removeEventListener("popstate", handlePopState)
      }
    }
  }, [isReady, settings])

  // helper functions
  const saveToLocalStorage = (settings) => {
    localStorage.setItem("settings", JSON.stringify(settings))
  }

  const initSettings = (settings) => {
    // init theme
    document.body.setAttribute("class", `${process.env.NEXT_PUBLIC_LOCALIZATION_CODE || ""} ${settings.theme}`)

    const initFontStyles = () => {
      const elemsArabic = document.querySelectorAll(".text_arabic")
      const elemsTrans = document.querySelectorAll(".text_trans")

      elemsArabic.forEach((elem) => {
        elem.style.fontSize = settings.fontSize.arabic + "px"
        elem.style.fontFamily = settings.fontFamily.arabic
      })

      elemsTrans.forEach((elem) => {
        elem.style.fontSize = settings.fontSize.translation + "px"
        elem.style.fontFamily = settings.fontFamily.translation
      })
    }

    if (typeof window !== "undefined") {
      if (document.readyState === "complete") {
        initFontStyles()
      } else {
        window.addEventListener("load", initFontStyles)
        return () => window.removeEventListener("load", initFontStyles)
      }
    }
  }

  const changeTranslation = (newTranslation) => {
    const newSettings = { ...settings, translation: newTranslation }
    localStorage.setItem("settings", JSON.stringify(newSettings))
    setSettings(newSettings)

    if (typeof window !== "undefined") {
      const path = window.location.pathname
      
      // Skip multi-translation routes
      if (path.includes("/multi-translation/")) {
        return
      }

      // Dispatch translation change event for components to listen
      window.dispatchEvent(new CustomEvent('translationChanged', {
        detail: { translation: newTranslation }
      }))

      // Determine if new translation is the first available translation
      const isNewTranslationFirst = isFirstTranslation(newTranslation)

      // Handle dynamic translation routes: /[translationCode]/chapters/[slug]
      const dynamicMatch = path.match(/^\/([^\/]+)\/(chapters|subjective)\/(.+)$/)
      
      if (dynamicMatch) {
        const [, currentTranslation, routeType, remainingPath] = dynamicMatch
        
        // Check if current path has translation code (contains _ or -)
        if (currentTranslation.includes('_') || currentTranslation.includes('-')) {
          // Switching from a translation-specific route
          if (isNewTranslationFirst) {
            // Going back to first translation - use base route
            const newPath = `/${routeType}/${remainingPath}`
            console.log(`Switching to first translation: ${path} → ${newPath}`)
            router.push(newPath, newPath, { shallow: true })
          } else {
            // Switching to another non-first translation
            const newPath = `/${newTranslation}/${routeType}/${remainingPath}`
            console.log(`Switching translations: ${path} → ${newPath}`)
            router.push(newPath, newPath, { shallow: true })
          }
          return
        }
      }

      // Handle base routes: /chapters/[slug] or /subjective/[slug]
      const baseMatch = path.match(/^\/(chapters|subjective)\/(.+)$/)
      
      if (baseMatch) {
        const [, routeType, remainingPath] = baseMatch
        
        if (isNewTranslationFirst) {
          // Already on base route and switching to first translation - no URL change needed
          console.log(`Already on base route, staying: ${path}`)
          return
        } else {
          // Switching from base route (first translation) to another translation
          const newPath = `/${newTranslation}/${routeType}/${remainingPath}`
          console.log(`Switching from first translation: ${path} → ${newPath}`)
          router.push(newPath, newPath, { shallow: true })
          return
        }
      }
    }
  }

  const changeSelectedMultiTranslations = (translations) => {
    const newSettings = {
      ...settings,
      selectedTranslations: translations,
    }
    saveToLocalStorage(newSettings)
    localStorage.setItem("selectedTranslations", JSON.stringify(translations))
    setSettings(newSettings)

    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("translationsChanged", {
          detail: { translations },
        }),
      )
    }
  }

  // View settings
  const changeView = (view) => {
    const newSettings = { ...settings, view }
    saveToLocalStorage(newSettings)
    setSettings(newSettings)
  }

  const changeFontSizeArabic = (value) => {
    if (value > 100 || value < 10) return

    const elems = document.querySelectorAll(".text_arabic")
    for (const elem of elems) {
      elem.style.fontSize = value + "px"
    }

    const newSettings = {
      ...settings,
      fontSize: {
        ...settings.fontSize,
        arabic: value,
      },
    }
    saveToLocalStorage(newSettings)
    setSettings(newSettings)
  }

  const changeFontSizeTranslation = (value) => {
    if (value > 60 || value < 6) return

    const elems = document.querySelectorAll(".text_trans")
    for (const elem of elems) {
      elem.style.fontSize = value + "px"
    }

    const newSettings = {
      ...settings,
      fontSize: {
        ...settings.fontSize,
        translation: value,
      },
    }
    saveToLocalStorage(newSettings)
    setSettings(newSettings)
  }

  const changeFontFamilyArabic = (value) => {
    const elems = document.querySelectorAll(".text_arabic")
    for (const elem of elems) {
      elem.style.fontFamily = value
    }

    const newSettings = {
      ...settings,
      fontFamily: {
        ...settings.fontFamily,
        arabic: value,
      },
    }
    saveToLocalStorage(newSettings)
    setSettings(newSettings)
  }

  const changeFontFamilyTranslation = (value) => {
    const elems = document.querySelectorAll(".text_trans")
    for (const elem of elems) {
      elem.style.fontFamily = value
    }

    const newSettings = {
      ...settings,
      fontFamily: {
        ...settings.fontFamily,
        translation: value,
      },
    }
    saveToLocalStorage(newSettings)
    setSettings(newSettings)
  }

  const changeTheme = (theme) => {
    document.body.setAttribute("class", `${process.env.NEXT_PUBLIC_LOCALIZATION_CODE || ""} ${theme}`)
    const newSettings = { ...settings, theme }
    saveToLocalStorage(newSettings)
    setSettings(newSettings)
  }

  const changeVerseMode = (mode) => {
    const newSettings = { ...settings, verseMode: mode }
    saveToLocalStorage(newSettings)
    setSettings(newSettings)
    redirectAfterChangeVerseMode(mode)
  }

  const changeActiveVerse = (verseNo) => {
    const newSettings = { ...settings, activeVerse: verseNo }
    saveToLocalStorage(newSettings)
    setSettings(newSettings)
  }

  const changeAutoScroll = (status) => {
    const newSettings = { ...settings, autoScroll: status }
    saveToLocalStorage(newSettings)
    setSettings(newSettings)
  }

  const changeNotification = (status) => {
    const newSettings = { ...settings, notification: status }
    saveToLocalStorage(newSettings)
    setSettings(newSettings)
  }

  const changePlaybackRate = (rate) => {
    const newSettings = { ...settings, playbackRate: rate }
    saveToLocalStorage(newSettings)
    setSettings(newSettings)
  }

  const resetSettings = () => {
    initSettings(defaultSettings)
    saveToLocalStorage(defaultSettings)
    setSettings(defaultSettings)
    localStorage.removeItem("selectedTranslations")
    redirectAfterChangeVerseMode(defaultSettings.verseMode)
  }

  const redirectAfterChangeVerseMode = (mode) => {
    if (typeof window !== "undefined") {
      const path = window.location.pathname
      const parts = path.split("/")
      const activeVerse = settings.activeVerse

      if (parts.length > 3 && parts[1] === "chapters" && mode === "scroll") {
        router.push(activeVerse === 1 ? `/chapters/${parts[2]}` : `/chapters/${parts[2]}#verse-${activeVerse}`)
      } else if (parts.length === 3 && parts[1] === "chapters" && mode === "slide") {
        router.push(`/chapters/${parts[2]}/verses/${activeVerse}`)
      }
    }
  }

  const getSelectedTranslation = () => settings.translation
  const getSelectedMultiTranslations = () => settings.selectedTranslations || [settings.translation]

  return (
    <SettingsContext.Provider
      value={{
        isReady,
        settings,
        translation: getSelectedTranslation(),
        changeTranslation,
        selectedTranslations: getSelectedMultiTranslations(),
        changeSelectedTranslations: changeSelectedMultiTranslations,
        selectedMultiTranslations: getSelectedMultiTranslations(),
        activeTranslations: [getSelectedTranslation()],
        view: settings.view,
        changeView,
        theme: settings.theme,
        changeTheme,
        fontSizeArabic: settings.fontSize.arabic,
        changeFontSizeArabic,
        fontSizeTranslation: settings.fontSize.translation,
        changeFontSizeTranslation,
        fontFamilyArabic: settings.fontFamily.arabic,
        changeFontFamilyArabic,
        fontFamilyTranslation: settings.fontFamily.translation,
        changeFontFamilyTranslation,
        verseMode: settings.verseMode,
        changeVerseMode,
        activeVerse: settings.activeVerse,
        changeActiveVerse,
        autoScroll: settings.autoScroll,
        changeAutoScroll,
        notification: settings.notification,
        changeNotification,
        playbackRate: settings.playbackRate || 1,
        changePlaybackRate,
        resetSettings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  )
}

export default SettingsContextProvider
