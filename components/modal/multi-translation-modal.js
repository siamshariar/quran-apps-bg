"use client"
import { useState, useContext, useEffect, useRef } from "react"
import { SettingsContext } from "../../contexts/SettingsContext"
import { Checkbox } from "@mui/material"
import SearchIcon from "../icons/Search"
import CloseIcon from "../icons/Close"
import FormControlLabel from "@mui/material/FormControlLabel"
import { t } from "../../lib/config"
import styles from "./multi-translation-modal.module.scss"

// Translation data
const translationData = {
  English: [
    { code: "english_abdel_haleem", name: "M.A.S. Abdel Haleem", description: "Oxford World's Classics" },
    { code: "english_mustafa_khattab", name: "Dr. Mustafa Khattab", description: "The Clear Quran" },
    { code: "english_usmani", name: "T. Usmani", description: "Maariful Quran" },
    { code: "english_maududi", name: "A. Maududi", description: "Tafhim commentary" },
    { code: "english_pickthall", name: "M. Pickthall", description: "The Meaning of the Glorious Quran" },
    { code: "english_yusuf_ali", name: "A. Yusuf Ali", description: "The Holy Quran" },
    { code: "english_saheeh", name: "Saheeh International", description: "The Quran: English Translation" },
    { code: "english_hilali_khan", name: "Al-Hilali & Khan", description: "Noble Quran" },
    { code: "english_transliteration", name: "Transliteration", description: "English Transliteration" },
  ],
  Vietnamese: [
    { code: "vietnamese_hassan", name: "Hasan Abdul-Karim", description: "Vietnamese Translation" },
    { code: "vietnamese_rwwad", name: "Ruwwad Translation Center", description: "Modern Vietnamese" },
  ],
  French: [
    { code: "french_rashid", name: "Rashid Maash", description: "French Translation" },
    { code: "french_hameedullah", name: "Muhammad Hamidullah", description: "Le Saint Coran" },
  ],
  German: [
    { code: "german_bubenheim", name: "Bubenheim & Elyas", description: "German Translation" },
    { code: "german_khoury", name: "Adel Theodor Khoury", description: "Der Koran" },
  ],
  Spanish: [
    { code: "spanish_cortes", name: "Julio Cortes", description: "El Corán" },
    { code: "spanish_garcia", name: "Muhammad Isa Garcia", description: "Spanish Translation" },
  ],
  Urdu: [
    { code: "urdu_jalandhri", name: "Fateh Muhammad Jalandhri", description: "Urdu Translation" },
    { code: "urdu_kanzul_iman", name: "Kanzul Iman", description: "Ahmed Raza Khan" },
  ],
}

export default function MultiTranslationSelectionModal({ isOpen, onClose, mode = "multi", onTranslationsChange }) {
  const {
    translation,
    changeTranslation,
    selectedTranslations = [translation],
    changeSelectedTranslations,
    theme,
  } = useContext(SettingsContext)
  const [filteredTranslations, setFilteredTranslations] = useState(translationData)
  const [searchOpen, setSearchOpen] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState("")
  const [toastHighlight, setToastHighlight] = useState(false)
  const contentRef = useRef(null)
  const searchInputRef = useRef(null)
  const [hoveredTranslation, setHoveredTranslation] = useState(null)
  const toastTimeoutRef = useRef(null)
  const toastHighlightTimeoutRef = useRef(null)
  // Track local selection for "after close, call API"
  const [localSelections, setLocalSelections] = useState(selectedTranslations)
  const [closeCallbackTimeout, setCloseCallbackTimeout] = useState(null)

  useEffect(() => {
    // Sync local selections when modal is opened or selection changed from outside
    if (isOpen) {
      setFilteredTranslations(translationData)
      setSearchOpen(false)
      setIsClosing(false)
      setLocalSelections(selectedTranslations)
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current)
      }
      if (toastHighlightTimeoutRef.current) {
        clearTimeout(toastHighlightTimeoutRef.current)
      }
      if (closeCallbackTimeout) {
        clearTimeout(closeCallbackTimeout)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen])

  const showToastMessage = (message) => {
    setToastMessage(message)
    setToastHighlight(true)
    setShowToast(true)
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current)
    }
    if (toastHighlightTimeoutRef.current) {
      clearTimeout(toastHighlightTimeoutRef.current)
    }
    // Highlight for 800ms, then fade highlight
    toastHighlightTimeoutRef.current = setTimeout(() => {
      setToastHighlight(false)
    }, 800)
    // Hide after 3s
    toastTimeoutRef.current = setTimeout(() => {
      setShowToast(false)
      setToastHighlight(false)
    }, 3000)
  }

  const filterTranslations = (search) => {
    if (!search.trim()) {
      setFilteredTranslations(translationData)
      return
    }
    const filtered = Object.entries(translationData).reduce((acc, [language, translations]) => {
      const filteredTrans = translations.filter(
        (t) =>
          t.name.toLowerCase().includes(search.toLowerCase()) ||
          t.description.toLowerCase().includes(search.toLowerCase()) ||
          language.toLowerCase().includes(search.toLowerCase()),
      )
      if (filteredTrans.length > 0) {
        acc[language] = filteredTrans
      }
      return acc
    }, {})
    setFilteredTranslations(filtered)
  }

  const handleSearchOpen = (open) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return
    }
    if (open) {
      searchInputRef.current?.focus()
    } else {
      setFilteredTranslations(translationData)
      if (searchInputRef.current) {
        searchInputRef.current.value = ""
      }
    }
    setSearchOpen(open)
  }

  const handleTranslationToggle = (translationCode) => {
    let newSelections

    if (mode === "single") {
      // Single selection mode
      newSelections = [translationCode]
      // Update the primary translation
      changeTranslation(translationCode)
    } else {
      // Multi selection mode
      if (localSelections.includes(translationCode)) {
        // Don't allow removing the last translation
        if (localSelections.length === 1) {
          showToastMessage(t("At least one translation must be selected"))
          return
        }
        newSelections = localSelections.filter((code) => code !== translationCode)
      } else {
        // Check if already reached max selections
        if (localSelections.length >= 5) {
          showToastMessage(t("Maximum 5 translations can be selected"))
          return
        }
        newSelections = [...localSelections, translationCode]
      }

      // If the primary translation is being removed, set the first remaining one as primary
      if (translationCode === translation && !newSelections.includes(translationCode)) {
        changeTranslation(newSelections[0])
      }
    }

    setLocalSelections(newSelections)
    // Do NOT update selectedTranslations in context here, only after closing
  }

  const handleClose = () => {
    setIsClosing(true)
    setTimeout(() => {
      setFilteredTranslations(translationData)
      setSearchOpen(false)
      setIsClosing(false)
      if (searchInputRef.current) {
        searchInputRef.current.value = ""
      }
      // After closing animation/exit, fire translation change if different
      if (
        JSON.stringify(localSelections) !== JSON.stringify(selectedTranslations) &&
        changeSelectedTranslations
      ) {
        changeSelectedTranslations(localSelections)
        // If parent provided a callback to run after close, fire after change
        if (typeof onTranslationsChange === "function") {
          onTranslationsChange(localSelections)
        }
      }
      onClose()
    }, 200)
  }

  // Theme-based styles
  const modalClasses = `${styles.modalContent} ${theme === "dark" ? styles.dark : styles.light} ${
    isClosing ? styles.closing : ""
  }`

  // Toast highlight class
  const toastClassNames = [
    styles.toastMessage,
    showToast ? styles.toastShow : "",
    toastHighlight ? styles.toastHighlight : "",
  ].join(" ")

  // For mobile: add a mobile modifier if screen is small and modal is fullscreen
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  if (!isOpen) return null

  return (
    <>
      <div className={styles.modalOverlay} onClick={(e) => e.target === e.currentTarget && handleClose()}>
        <div className={modalClasses} onClick={(e) => e.stopPropagation()}>
          {/* Header */}
          <div className={styles.header}>
            <div className={styles.top}>
              <div className={styles.left}>
                <div className={styles.title}>
                  <h2>{mode === "single" ? t("Select Translation") : t("Select Multi-Translations")}</h2>
                </div>
              </div>
              <div className={styles.right}>
                <span className={styles.icon} onClick={handleSearchOpen(true)}>
                  <SearchIcon />
                </span>
                <span className={styles.icon} onClick={handleClose}>
                  <CloseIcon />
                </span>
              </div>
              <div className={searchOpen ? `${styles.search} ${styles.open}` : styles.search}>
                <input
                  type="text"
                  name="translation-search"
                  placeholder={t("Search Translations")}
                  onChange={(e) => filterTranslations(e.target.value)}
                  ref={searchInputRef}
                />
                <span onClick={handleSearchOpen(false)}>
                  <CloseIcon />
                </span>
              </div>
            </div>
          </div>
          {/* Content */}
          <div className={styles.content} ref={contentRef}>
            <div className={styles.languageList}>
              {Object.entries(filteredTranslations).map(([language, translations]) => (
                <div key={language} className={styles.languageSection}>
                  <div className={styles.languageHeader}>
                    <span className={styles.languageName}>{language}</span>
                  </div>
                  <div className={styles.translationList}>
                    {translations.map((trans) => {
                      const isSelected = localSelections.includes(trans.code)
                      return (
                        <div key={trans.code} className={styles.translationItem}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={isSelected}
                                onChange={() => handleTranslationToggle(trans.code)}
                                className={styles.checkbox}
                                name={mode === "single" ? "translation-selection" : "multi-translation-selection"}
                              />
                            }
                            label={
                              <div className={styles.translationInfo}>
                                <span className={styles.translationName}>{trans.name}</span>
                                {/* <span className={styles.translationDescription}>{trans.description}</span> */}
                              </div>
                            }
                            className={styles.formControlLabel}
                          />
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Toast message */}
      {showToast && (
        <div
          className={`${toastClassNames} ${isMobile ? styles.toastMobile : ""}`}
        >
          {toastMessage}
        </div>
      )}
    </>
  )
}