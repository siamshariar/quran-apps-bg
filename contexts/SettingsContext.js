"use client"

import { useState, useEffect, createContext } from "react"
import { useRouter } from "next/router"
import { settings as defaultSettings } from "../lib/settings"

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
      let newSettings = savedSettings === null ? defaultSettings : JSON.parse(savedSettings)

      // Check if we're on a translation-specific URL and update settings accordingly
      if (typeof window !== "undefined") {
        const currentPath = window.location.pathname
        if (currentPath.startsWith("/vietnamese_rwwad/")) {
          console.log("Detected vietnamese_rwwad URL, setting translation to vietnamese_rwwad")
          newSettings = { ...newSettings, translation: "vietnamese_rwwad" }
          localStorage.setItem("settings", JSON.stringify(newSettings))
        } else if (currentPath.includes("/subjective/") || currentPath.includes("/chapters/")) {
          // If we're on a default path, ensure translation is set to default
          if (newSettings.translation !== "vietnamese_hassan") {
            console.log("On default URL but settings show non-default translation, keeping settings as is")
            // Don't change the settings, let the URL update logic handle it
          }
        }
      }

      console.log("Loaded settings:", newSettings)
      initSettings(newSettings)
      setSettings(newSettings)
      setIsReady(true)
      console.log("Settings initialized with translation:", newSettings.translation)
    } catch (error) {
      console.error("Error initializing settings:", error)
      initSettings(defaultSettings)
      setSettings(defaultSettings)
      setIsReady(true)
    }
  }, [])

    // helper functions
  const saveToLocalStorage = (settings) => {
    localStorage.setItem("settings", JSON.stringify(settings))
  }

    const initSettings = (settings) => {
        // init theme
        document.body.setAttribute('class', `${process.env.NEXT_PUBLIC_LOCALIZATION_CODE || ''} ${settings.theme}`)

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

      if (path.includes("/chapters/")) {
        const slug = path.split("/chapters/")[1].split("/")[0]
        const newPath =
          newTranslation === "vietnamese_hassan" ? `/chapters/${slug}` : `/${newTranslation}/chapters/${slug}`
        console.log("Updating chapter URL to:", newPath)
        window.history.replaceState({}, "", newPath)
      } else if (path.includes("/subjective/") && path.includes("/verses")) {
        let newPath
        if (newTranslation === "vietnamese_hassan") {
          newPath = path.replace(/^\/vietnamese_rwwad/, "")
        } else {
          if (path.startsWith("/vietnamese_rwwad")) {
            newPath = path // Already has prefix
          } else {
            newPath = `/${newTranslation}${path}`
          }
        }
        window.history.replaceState({}, "", newPath)
        }
      }
    }

    // change settings functions
    const changeView = (view) => {
        const newSettings = { ...settings, ['view']: view }
        saveToLocalStorage(newSettings)
        setSettings(newSettings)
    }

    const changeFontSizeArabic = (value) => {
        if (value > 100 || value < 10) return

        const elems = document.querySelectorAll('.text_arabic')
        for (const elem of elems) {
            elem.style.fontSize = value + 'px'
        }

        const obj = {
            arabic: value,
            translation: settings.fontSize.translation
        }
        const newSettings = { ...settings, ['fontSize']: obj }
        saveToLocalStorage(newSettings)
        setSettings(newSettings)
    }

    const changeFontSizeTranslation = (value) => {
        if (value > 60 || value < 6) return

        const elems = document.querySelectorAll('.text_trans')
        for (const elem of elems) {
            elem.style.fontSize = value + 'px'
        }

        const obj = {
            arabic: settings.fontSize.arabic,
            translation: value
        }
        const newSettings = { ...settings, ['fontSize']: obj }
        saveToLocalStorage(newSettings)
        setSettings(newSettings)
    }

    const changeFontFamilyArabic = (value) => {
        const elems = document.querySelectorAll('.text_arabic')
        for (const elem of elems) {
            elem.style.fontFamily = value
        }

        const obj = {
            arabic: value,
            translation: settings.fontFamily.translation
        }
        const newSettings = { ...settings, ['fontFamily']: obj }
        saveToLocalStorage(newSettings)
        setSettings(newSettings)
    }

    const changeFontFamilyTranslation = (value) => {
        const elems = document.querySelectorAll('.text_trans')
        for (const elem of elems) {
            elem.style.fontFamily = value
        }

        const obj = {
            arabic: settings.fontFamily.arabic,
            translation: value
        }
        const newSettings = { ...settings, ['fontFamily']: obj }
        saveToLocalStorage(newSettings)
        setSettings(newSettings)
    }

    const changeTheme = (theme) => {
        document.body.setAttribute('class', `${process.env.NEXT_PUBLIC_LOCALIZATION_CODE || ''} ${theme}`)
        const newSettings = { ...settings, ['theme']: theme }
        saveToLocalStorage(newSettings)
        setSettings(newSettings)
    }

    const changeVerseMode = (mode) => {
        const newSettings = { ...settings, ['verseMode']: mode }
        saveToLocalStorage(newSettings)
        setSettings(newSettings)
        redirectAfterChangeVerseMode(mode)
    }

    const changeActiveVerse = (verseNo) => {
        const newSettings = { ...settings, ['activeVerse']: verseNo }
        saveToLocalStorage(newSettings)
        setSettings(newSettings)
    }

    const changeAutoScroll = (status) => {
        const newSettings = { ...settings, ['autoScroll']: status }
        saveToLocalStorage(newSettings)
        setSettings(newSettings)
    }

    const changeNotification = (status) => {
        const newSettings = { ...settings, ['notification']: status }
        saveToLocalStorage(newSettings)
        setSettings(newSettings)
    }

    const changePlaybackRate = (rate) => {
        const newSettings = { ...settings, ["playbackRate"]: rate };
        saveToLocalStorage(newSettings);
        setSettings(newSettings);
    };

    const resetSettings = () => {
        initSettings(defaultSettings)
        saveToLocalStorage(defaultSettings)
        setSettings(defaultSettings)
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

    return (
        <SettingsContext.Provider
            value={{
                isReady,
                settings,
                translation: settings.translation,
                changeTranslation,
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
            { children }
        </SettingsContext.Provider>
    )
}

export default SettingsContextProvider