"use client"

import { fonts, themes } from "../../lib/settings"
import { useState, useContext, useEffect } from "react"
import { SettingsContext } from "../../contexts/SettingsContext"
import Accordion from "@mui/material/Accordion"
import AccordionSummary from "@mui/material/AccordionSummary"
import AccordionDetails from "@mui/material/AccordionDetails"
import Radio from "@mui/material/Radio"
import RadioGroup from "@mui/material/RadioGroup"
import FormControlLabel from "@mui/material/FormControlLabel"
import IconButton from "@mui/material/IconButton"
import Button from "@mui/material/Button"
import Switcher from "../core/switcher"
import UpIcon from "../icons/ChevronUp"
import DownIcon from "../icons/ChevronDown"
import PlusIcon from "../icons/Plus"
import MinusIcon from "../icons/Minus"
import ChevronRightIcon from "../icons/ChevronRight"
import TranslationModalContent from "../modal/translation-modal"
import { t } from "../../lib/config"
import styles from "./index.module.scss"

export default function Settings({
  defaultExpanded,
  showTranslationModal = false,
  onShowTranslationModal = null,
  onTitleChange = null,
}) {
  const [expandedPanel, setExpandedPanel] = useState(null)
  const [internalShowTranslationModal, setInternalShowTranslationModal] = useState(false)

  const isTranslationModalOpen = onShowTranslationModal ? showTranslationModal : internalShowTranslationModal
  const handleTranslationModal = onShowTranslationModal || setInternalShowTranslationModal

  useEffect(() => {
    if (defaultExpanded) {
      setExpandedPanel(defaultExpanded)
    }
  }, [defaultExpanded])

  useEffect(() => {
    if (onTitleChange) {
      if (isTranslationModalOpen) {
        onTitleChange(t("Translation"))
      } else {
        onTitleChange(t("Settings"))
      }
    }
  }, [isTranslationModalOpen, onTitleChange])

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpandedPanel(isExpanded ? panel : false)
  }

  const handleOpenTranslationModal = () => {
    handleTranslationModal(true)
  }

  const handleCloseTranslationModal = () => {
    handleTranslationModal(false)
  }

  if (isTranslationModalOpen) {
    return <TranslationModalContent onBack={handleCloseTranslationModal} />
  }

  return (
    <div className={styles.wrapper}>
      <Translation
        expanded={expandedPanel === "translation"}
        onAccordionChange={handleAccordionChange}
        onOpenModal={handleOpenTranslationModal}
        t={t}
      />
      <hr className={styles.divider} />
      <View />
      <hr className={styles.divider} />
      <FontSize />
      <hr className={styles.divider} />
      <FontFamily />
      <hr className={styles.divider} />
      <Theme />
      <hr className={styles.divider} />
      <Note />
      <Reset />
    </div>
  )
}

function Translation({ expanded, onAccordionChange, onOpenModal }) {
  const { translation } = useContext(SettingsContext)

  const getTranslatorName = (translationCode) => {
    const translationMap = {
      vietnamese_hassan: "Hasan Abdul-Karim",
      vietnamese_rwwad: "Ruwwad Translation Center",
      english_abdel_haleem: "M.A.S. Abdel Haleem",
      english_mustafa_khattab: "Dr. Mustafa Khattab",
      english_usmani: "T. Usmani",
      english_maududi: "A. Maududi",
      english_pickthall: "M. Pickthall",
      english_yusuf_ali: "A. Yusuf Ali",
      english_saheeh: "Saheeh International",
      english_hilali_khan: "Al-Hilali & Khan",
      english_transliteration: "Transliteration",
    }
    return translationMap[translationCode] || translationCode
  }

  const getSelectedTranslationText = () => {
    return getTranslatorName(translation)
  }

  return (
    <div className={`${styles.block} ${styles.translation}`}>
      <div className={styles.title}>{t("Translation")}</div>
      <div className={styles.list}>
        <div className={styles.item}>
          <div className={styles.translationSelector} onClick={onOpenModal}>
            <div className={styles.translationInfo}>
              <div className={styles.translationLabel}>{t("Selected Translation")}</div>
              <div className={styles.translationName}>{getSelectedTranslationText()}</div>
            </div>
            <IconButton className={styles.btn}>
              <ChevronRightIcon />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  )
}

const View = () => {
  const { view, changeView } = useContext(SettingsContext)
  const [message, setMessage] = useState({
    open: false,
    text: "Set at least one option visible",
  })

  const handleViewChange = (name, val) => {
    const newView = { ...view, [name]: val }

    // Check if at least one main content option is visible
    if (!newView.arabic && !newView.translation && !newView.tafseer) {
      setMessage({ ...message, ["open"]: true })
      setTimeout(() => {
        setMessage({ ...message, ["open"]: false })
      }, 2000)
      return
    }

    // If Arabic is disabled, also disable transliteration
    if (name === "arabic" && !val) {
      newView.transliteration = false
    }

    changeView(newView)
  }

  return (
    <div className={`${styles.block} ${styles.view}`}>
      <div className={styles.title}>{t("View")}</div>
      <div className={styles.list}>
        <div className={styles.item}>
          <Switcher control={handleViewChange} checked={view.arabic} label={t("Arabic")} name="arabic" />
        </div>
        <div className={styles.item}>
          <Switcher
            control={handleViewChange}
            checked={view.transliteration}
            label={t("Transliteration")}
            name="transliteration"
            disabled={!view.arabic}
          />
        </div>
        <div className={styles.item}>
          <Switcher control={handleViewChange} checked={view.translation} label={t("Translation")} name="translation" />
        </div>
        <div className={styles.item}>
          <Switcher control={handleViewChange} checked={view.tafseer} label={t("Footnotes")} name="tafseer" />
        </div>
        <div className={message.open ? `${styles.message} ${styles.open}` : styles.message}>{message.text}</div>
      </div>
    </div>
  )
}

const FontSize = () => {
  const { fontSizeArabic, changeFontSizeArabic, fontSizeTranslation, changeFontSizeTranslation } =
    useContext(SettingsContext)

  const handleFontSizeArabic = (size) => {
    changeFontSizeArabic(size)
  }

  const handleFontSizeTranslation = (size) => {
    changeFontSizeTranslation(size)
  }

  return (
    <div className={`${styles.block} ${styles.font_size}`}>
      <div className={styles.title}>{t("Font Size")}</div>
      <div className={styles.list}>
        <div className={styles.item}>
          <div className={styles.label}>{t("Arabic")}</div>
          <div className={styles.sizer}>
            <IconButton className={styles.sizer_btn} onClick={() => handleFontSizeArabic(fontSizeArabic - 1)}>
              <MinusIcon />
            </IconButton>
            <span className={styles.sizer_text}>{fontSizeArabic}</span>
            <IconButton className={styles.sizer_btn} onClick={() => handleFontSizeArabic(fontSizeArabic + 1)}>
              <PlusIcon />
            </IconButton>
          </div>
        </div>
        <div className={styles.item}>
          <div className={styles.label}>{t("Translation")}</div>
          <div className={styles.sizer}>
            <IconButton className={styles.sizer_btn} onClick={() => handleFontSizeTranslation(fontSizeTranslation - 1)}>
              <MinusIcon />
            </IconButton>
            <span className={styles.sizer_text}>{fontSizeTranslation}</span>
            <IconButton className={styles.sizer_btn} onClick={() => handleFontSizeTranslation(fontSizeTranslation + 1)}>
              <PlusIcon />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  )
}

const FontFamily = () => {
  const fontsArabic = fonts.arabic
  const fontsTranslation = fonts.translation
  const { fontFamilyArabic, changeFontFamilyArabic, fontFamilyTranslation, changeFontFamilyTranslation } =
    useContext(SettingsContext)

  const [expanded, setExpanded] = useState(false)

  const controlAccordion = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  const handleFontFamilyArabic = (event) => {
    changeFontFamilyArabic(event.target.value)
  }

  const handleFontFamilyTranslation = (event) => {
    changeFontFamilyTranslation(event.target.value)
  }

  return (
    <div className={`${styles.block} ${styles.font_family}`}>
      <div className={styles.title}>{t("Font Family")}</div>
      <div className={styles.list}>
        <div className={styles.item}>
          <Accordion
            className={styles.accordion}
            expanded={expanded === "font_arabic"}
            onChange={controlAccordion("font_arabic")}
          >
            <AccordionSummary className={styles.accordion_summary}>
              <IconButton className={styles.btn}>
                <span className={expanded !== "font_arabic" ? styles.none : styles.icon}>
                  <UpIcon />
                </span>
                <span className={expanded === "font_arabic" ? styles.none : styles.icon}>
                  <DownIcon />
                </span>
              </IconButton>
              <div className={styles.label}>{t("Choose Arabic Font")}</div>
            </AccordionSummary>
            <AccordionDetails className={styles.accordion_details}>
              <RadioGroup name="fontArabic" value={fontFamilyArabic} onChange={handleFontFamilyArabic}>
                {fontsArabic &&
                  fontsArabic.map((font) => (
                    <FormControlLabel
                      key={font.familyName}
                      className="settings_radio"
                      value={font.familyName}
                      control={<Radio />}
                      label={font.displayName}
                    />
                  ))}
              </RadioGroup>
            </AccordionDetails>
          </Accordion>
        </div>
        <div className={styles.item}>
          <Accordion
            className={styles.accordion}
            expanded={expanded === "font_trans"}
            onChange={controlAccordion("font_trans")}
          >
            <AccordionSummary className={styles.accordion_summary}>
              <IconButton className={styles.btn}>
                <span className={expanded !== "font_trans" ? styles.none : styles.icon}>
                  <UpIcon />
                </span>
                <span className={expanded === "font_trans" ? styles.none : styles.icon}>
                  <DownIcon />
                </span>
              </IconButton>
              <div className={styles.label}>{t("Choose Translation Font")}</div>
            </AccordionSummary>
            <AccordionDetails className={styles.accordion_details}>
              <RadioGroup name="fontTranslation" value={fontFamilyTranslation} onChange={handleFontFamilyTranslation}>
                {fontsTranslation &&
                  fontsTranslation.map((font) => (
                    <FormControlLabel
                      key={font.familyName}
                      className="settings_radio"
                      value={font.familyName}
                      control={<Radio />}
                      label={font.displayName}
                    />
                  ))}
              </RadioGroup>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
    </div>
  )
}

const Theme = () => {
  const [expanded, setExpanded] = useState(false)

  const controlAccordion = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  const { theme, changeTheme } = useContext(SettingsContext)

  const handleThemeChange = (newTheme) => {
    changeTheme(newTheme)
  }

  return (
    <div className={`${styles.block} ${styles.theme}`}>
      <div className={styles.title}>{t("Theme")}</div>
      <div className={styles.list}>
        <div className={styles.item}>
          <Accordion className={styles.accordion} expanded={expanded === "theme"} onChange={controlAccordion("theme")}>
            <AccordionSummary className={styles.accordion_summary}>
              <IconButton className={styles.btn}>
                <span className={expanded !== "theme" ? styles.none : styles.icon}>
                  <UpIcon />
                </span>
                <span className={expanded === "theme" ? styles.none : styles.icon}>
                  <DownIcon />
                </span>
              </IconButton>
              <div className={styles.label}>{t("Choose theme")}</div>
            </AccordionSummary>
            <AccordionDetails className={styles.accordion_details}>
              <div className={styles.themes}>
                {themes &&
                  themes.map((item) => (
                    <span
                      key={item.name}
                      onClick={() => handleThemeChange(item.name)}
                      className={theme === item.name ? `${styles.theme_item} ${styles.active}` : styles.theme_item}
                      style={{
                        background: item.color,
                      }}
                    >
                      Aa
                    </span>
                  ))}
              </div>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
    </div>
  )
}

const Note = () => {
  return (
    <div className={`${styles.block} ${styles.note}`}>
      <p className={styles.note_text}>
        <span>{t("Note")}: </span>
        {t("If you remove storage or cache then your settings will be reset to default.")}
      </p>
    </div>
  )
}

const Reset = () => {
  const { resetSettings } = useContext(SettingsContext)

  return (
    <Button className={styles.btn_reset} onClick={resetSettings} disableRipple>
      {t("Reset")}
    </Button>
  )
}
