"use client"

import { useState, useContext } from "react"
import { SettingsContext } from "../../contexts/SettingsContext"
import Checkbox from "@mui/material/Checkbox"
import FormControlLabel from "@mui/material/FormControlLabel"
import IconButton from "@mui/material/IconButton"
import SearchIcon from "../icons/Search"
import ChevronLeftIcon from "../icons/ChevronLeft"
import CloseIcon from "../icons/Close"
import styles from "./translation-modal.module.scss"
import { t } from "../../lib/config"

// Extended translation data organized by language
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
  Albanian: [
    { code: "albanian_hasan_efendi", name: "Hasan Efendi Nahi", description: "Albanian Translation" },
    { code: "albanian_translation", name: "Albanian", description: "Standard Albanian" },
    { code: "albanian_modern", name: "Albanian Translation", description: "Modern Albanian" },
  ],
  Amazigh: [{ code: "amazigh_ramdane", name: "Ramdane At Mansour", description: "Tamazight Translation" }],
  Amharic: [{ code: "amharic_sadiq_sani", name: "Sadiq and Sani", description: "Amharic Translation" }],
  Assamese: [
    { code: "assamese_rafeeq", name: "Shaykh Rafeequl Islam Habibur-Rahman", description: "Assamese Translation" },
  ],
  Azeri: [
    { code: "azeri_alikhan", name: "Alikhan Musayev", description: "Azerbaijani Translation" },
    { code: "azeri_modern", name: "Azerbaijani", description: "Modern Azerbaijani" },
  ],
  Arabic: [{ code: "arabic_original", name: "Original Arabic", description: "القرآن الكريم" }],
  French: [
    { code: "french_rashid", name: "Rashid Maash", description: "French Translation" },
    { code: "french_hamidullah", name: "Muhammad Hamidullah", description: "Le Saint Coran" },
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

export default function TranslationModalContent({ onBack }) {
  const {
    translation,
    changeTranslation,
    selectedTranslations = [translation],
    changeSelectedTranslations,
  } = useContext(SettingsContext)
  const [searchQuery, setSearchQuery] = useState("")

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
    // Single selection: when a translation is selected, it becomes the only selected one
    const newSelections = [translationCode]

    // Update selected translations to only include the new selection
    if (changeSelectedTranslations) {
      changeSelectedTranslations(newSelections)
    }

    // Set the selected translation as the main translation
    changeTranslation(translationCode)
  }

  return (
    <div className={styles.translationModal}>
      <div className={styles.header}>
        <IconButton onClick={onBack} className={styles.btn}>
          <ChevronLeftIcon />
        </IconButton>
        <h2 className={styles.title}>{t("Translations")}</h2>
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
                        />
                      }
                      label={
                        <div className={styles.translationInfo}>
                          <span className={styles.translationName}>{trans.name}</span>
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
