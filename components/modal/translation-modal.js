"use client"
import { useState, useContext } from "react"
import { SettingsContext } from "../../contexts/SettingsContext"
import { Checkbox } from "@mui/material"
import FormControlLabel from "@mui/material/FormControlLabel"
import IconButton from "@mui/material/IconButton"
import SearchIcon from "../icons/Search"
import ChevronLeftIcon from "../icons/ChevronLeft"
import styles from "./translation-modal.module.scss"
import { t, getAvailableTranslations, config } from "../../lib/config"

export default function TranslationModalContent({ onBack, isOpen = true }) {
  const { translation, changeTranslation } = useContext(SettingsContext)
  const [searchQuery, setSearchQuery] = useState("")
  const [isClosing, setIsClosing] = useState(false)

  const availableTranslations = getAvailableTranslations()
  
  const currentLanguage = config.language || "Translations"

  const translationData = {
    [currentLanguage]: availableTranslations.map(trans => ({
      code: trans.code,
      name: trans.name,
      description: ""
    }))
  }

  // Filter translations based on search query
  const filteredTranslations = Object.entries(translationData).reduce((acc, [language, translations]) => {
    const filtered = translations.filter(
      (t) =>
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        language.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    if (filtered.length > 0) {
      acc[language] = filtered
    }
    return acc
  }, {})

  const handleTranslationToggle = (translationCode) => {
    // Only update the primary translation
    changeTranslation(translationCode)
  }

  const handleBack = (event) => {
    // Prevent event propagation to avoid double triggers
    if (event) {
      event.preventDefault()
      event.stopPropagation()
    }

    if (isClosing) return // Prevent multiple calls

    setIsClosing(true)
    setTimeout(() => {
      setIsClosing(false)
      if (onBack) {
        onBack()
      }
    }, 300)
  }

  return (
    <div className={`${styles.translationModal} ${isClosing ? styles.closing : ""}`}>
      <div className={styles.header}>
        <IconButton onClick={handleBack} className={styles.btn} disabled={isClosing}>
          <ChevronLeftIcon />
        </IconButton>
        <h2 className={styles.title}>{t("Translation")}</h2>
      </div>
      <div className={styles.searchContainer}>
        <div className={styles.searchWrapper}>
          <SearchIcon className={styles.searchIcon} />
          <input
            type="text"
            placeholder={t("Search Translations")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.languageList}>
          {Object.entries(filteredTranslations).map(([language, translations]) => (
            <div key={language} className={styles.languageSection}>
              <div className={styles.languageHeader}>
                <span className={styles.languageName}>{language}</span>
              </div>
              <div className={styles.translationList}>
                {translations.map((trans) => (
                  <div key={trans.code} className={styles.translationItem}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={translation === trans.code}
                          onChange={() => handleTranslationToggle(trans.code)}
                          className={styles.checkbox}
                          name="translation-selection"
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
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
