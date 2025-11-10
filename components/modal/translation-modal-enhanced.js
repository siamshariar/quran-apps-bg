/**
 * Enhanced Translation Modal with URL Update Support
 * 
 * This component extends the translation modal to automatically update
 * the URL when a user selects a different translation
 */

"use client"
import { useState, useContext, useCallback } from "react"
import { SettingsContext } from "../../contexts/SettingsContext"
import { useTranslationRouter } from "../../lib/translation-router"
import { Checkbox } from "@mui/material"
import FormControlLabel from "@mui/material/FormControlLabel"
import IconButton from "@mui/material/IconButton"
import SearchIcon from "../icons/Search"
import ChevronLeftIcon from "../icons/ChevronLeft"
import styles from "./translation-modal.module.scss"
import { t, getAvailableTranslations, config } from "../../lib/config"

export default function EnhancedTranslationModal({ onBack, isOpen = true }) {
  const { translation, changeTranslation } = useContext(SettingsContext)
  const { switchTranslation } = useTranslationRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [isClosing, setIsClosing] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)

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

  const handleTranslationToggle = useCallback(async (translationCode) => {
    if (translationCode === translation || isUpdating) return
    
    setIsUpdating(true)
    
    try {
      // Update the translation in context
      changeTranslation(translationCode)
      
      // Update the URL to match the new translation
      await switchTranslation(translationCode)
      
      // Dispatch custom event for other components
      window.dispatchEvent(new CustomEvent('translationChange', {
        detail: { translation: translationCode }
      }))
      
      // Show success feedback (optional)
      console.log(`Translation changed to: ${translationCode}`)
      
    } catch (error) {
      console.error('Error changing translation:', error)
      // Optionally show error message to user
    } finally {
      setIsUpdating(false)
    }
  }, [translation, changeTranslation, switchTranslation, isUpdating])

  const handleBack = (event) => {
    if (event) {
      event.preventDefault()
      event.stopPropagation()
    }

    if (isClosing) return

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
        <IconButton onClick={handleBack} className={styles.btn} disabled={isClosing || isUpdating}>
          <ChevronLeftIcon />
        </IconButton>
        <h2 className={styles.title}>
          {t("Translation")}
          {isUpdating && <span className={styles.updating}> (Updating...)</span>}
        </h2>
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
            disabled={isUpdating}
          />
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.languageList}>
          {Object.entries(filteredTranslations).map(([language, translations]) => (
            <div key={language} className={styles.languageSection}>
              <div className={styles.languageHeader}>
                <span className={styles.languageName}>{language}</span>
                <span className={styles.languageCount}>
                  {translations.length} {translations.length === 1 ? 'translation' : 'translations'}
                </span>
              </div>
              <div className={styles.translationList}>
                {translations.map((trans) => (
                  <div 
                    key={trans.code} 
                    className={`${styles.translationItem} ${isUpdating ? styles.disabled : ''}`}
                  >
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={translation === trans.code}
                          onChange={() => handleTranslationToggle(trans.code)}
                          className={styles.checkbox}
                          disabled={isUpdating}
                        />
                      }
                      label={
                        <div className={styles.translationLabel}>
                          <span className={styles.translationName}>{trans.name}</span>
                          {trans.description && (
                            <span className={styles.translationDescription}>{trans.description}</span>
                          )}
                        </div>
                      }
                      className={styles.formControl}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
          {Object.keys(filteredTranslations).length === 0 && (
            <div className={styles.noResults}>
              <p>No translations found matching "{searchQuery}"</p>
            </div>
          )}
        </div>
      </div>
      <div className={styles.footer}>
        <p className={styles.footerNote}>
          {t("Changing translation will update the URL automatically")}
        </p>
      </div>
    </div>
  )
}
