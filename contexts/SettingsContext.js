import { useState, useEffect, createContext } from 'react'
import { useRouter } from 'next/router'
import { settings as defaultSettings } from '../lib/settings'

export const SettingsContext = createContext()

const SettingsContextProvider = ({ children }) => {
    // state declare
    const [settings, setSettings] = useState(defaultSettings)
    const [isReady, setIsReady] = useState(false)
    const router = useRouter()

    // first render
    useEffect(() => {
        const savedSettings = localStorage.getItem('settings')
        const newSettings = savedSettings === null ? defaultSettings : JSON.parse(savedSettings)
        initSettings(newSettings)
        setSettings(newSettings)
        setIsReady(true)
    }, [])

    // helper functions
    const saveToLocalStorage = (settings) => {
        localStorage.setItem('settings', JSON.stringify(settings))
    }

    const initSettings = (settings) => {
        // init theme
        document.body.setAttribute('class', `${process.env.NEXT_PUBLIC_LOCALIZATION_CODE || ''} ${settings.theme}`)

        // init font css
        const elemsArabic = document.querySelectorAll('.text_arabic')
        const elemsTrans = document.querySelectorAll('.text_trans')

        for (const elem of elemsArabic) {
            elem.style.fontSize = settings.fontSize.arabic + 'px'
            elem.style.fontFamily = settings.fontFamily.arabic
        }
        for (const elem of elemsTrans) {
            elem.style.fontSize = settings.fontSize.translation + 'px'
            elem.style.fontFamily = settings.fontFamily.translation
        }
    }

    const changeTranslation = (translation) => {
      const newSettings = { ...settings, translation };
      saveToLocalStorage(newSettings);
      setSettings(newSettings);
    
      const path = window.location.pathname;
    
      // Match dynamic chapter path like /[translation]/chapters/1-al-fatihah or /chapters/1-al-fatihah
      const chapterMatch = path.match(/(?:\/([^/]+))?\/chapters\/([^/]+)/);
    
      if (chapterMatch) {
        const currentTranslation = chapterMatch[1]; // might be undefined if default
        const slug = chapterMatch[2];
    
        let newPath = '';
    
        if (translation === 'vietnamese_hassan') {
          // Default translation: No prefix
          newPath = `/chapters/${slug}`;
        } else {
          // Translated: Add translation prefix
          newPath = `/${translation}/chapters/${slug}`;
        }
    
        router.push(newPath);
      } else {
        // Not on a chapter page, fallback to a default path
        if (translation === 'vietnamese_hassan') {
          router.push(`/chapters/1-al-fatihah`);
        } else {
          router.push(`/${translation}/chapters/1-al-fatihah`);
        }
      }
    };


    const redirectAfterChangeVerseMode = (mode) => {
      if (typeof window !== 'undefined') {
        let path = window.location.pathname
        let parts = path.split("/");
        let activeVerse = settings.activeVerse;
        if (parts.length > 3 && parts[1] == "chapters" && mode == "scroll") {
          router.push(activeVerse == 1 ? `/chapters/${parts[2]}` : `/chapters/${parts[2]}#verse-${activeVerse}`)
        }
        else if (parts.length == 3 && parts[1] == "chapters" && mode == "slide") {
          router.push(`/chapters/${parts[2]}/verses/${activeVerse}`)
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

    return (
        <SettingsContext.Provider
            value={{
                isReady,
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
                resetSettings
            }}
        >
            { children }
        </SettingsContext.Provider>
    )
}

export default SettingsContextProvider
