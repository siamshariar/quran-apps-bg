import { useState, useEffect, useContext, useRef } from 'react'
import { SettingsContext } from '../../contexts/SettingsContext'
import { PinContext } from "../../contexts/PinContext";
import useOnScreen from "../../hooks/useOnScreen";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import IconButton from '@mui/material/IconButton';
import VerseOptions from './verse-options'
import UpIcon from '../icons/ChevronUp'
import DownIcon from '../icons/ChevronDown'
import styles from './verse-card.module.scss'

export default function VerseCard({
  index,
  chapterNo,
  chapterName,
  chapterSlug,
  verse,
  ayaArabic,
  printRef,
  updateBookmarksData,
  isBookmarkPage,
  isVirtualized,
  isLastVerse,
  translation,
  allTranslations = {},
  activeTranslations = [translation],
}) {
    const { view, changeActiveVerse } = useContext(SettingsContext)
    const [expanded, setExpanded] = useState(true)
  const [displayTranslations, setDisplayTranslations] = useState({})
  const translationRefs = useRef({})
  const prevTranslations = useRef({})
  const refTarget = useRef()
  const isTargetVisible = useOnScreen(refTarget)
  const { addLastRead } = useContext(PinContext)

  useEffect(() => {
    if (isTargetVisible) {
      addLastRead(chapterNo, chapterName, chapterSlug, verse.verseNo)
      changeActiveVerse(verse.verseNo)
    }
  }, [isTargetVisible])

  useEffect(() => {
    const initialDisplayTranslations = { [translation]: verse.translation }
    setDisplayTranslations(initialDisplayTranslations)

    prevTranslations.current = { [translation]: translation }
  }, [])

  useEffect(() => {
    const updatedDisplayTranslations = { ...displayTranslations }

    activeTranslations.forEach((translationCode) => {
      if (allTranslations[translationCode]) {
        const currentTranslation = allTranslations[translationCode].translation

        if (prevTranslations.current[translationCode] !== translationCode) {
      if (translationRefs.current[translationCode]) {
        translationRefs.current[translationCode].style.opacity = '0'
      }

          setTimeout(() => {
        setDisplayTranslations((prev) => ({
              ...prev,
              [translationCode]: currentTranslation,
            }))

            if (translationRefs.current[translationCode]) {
              translationRefs.current[translationCode].style.opacity = "1"
        }
      }, 150)
      
      prevTranslations.current[translationCode] = translationCode
      }
    }
    })
  }, [activeTranslations, allTranslations])

    const controlAccordion = () => {
        setExpanded(!expanded)
    }

    // last read option
    
  const shouldShowFootnote =
    translation === "vietnamese_hassan" &&
    view.tafseer &&
    verse.footnote &&
    verse.footnote !== "";

    useEffect(() => {
      if (isTargetVisible) {
        addLastRead(chapterNo, chapterName, chapterSlug, verse.verseNo);
        changeActiveVerse(verse.verseNo)
        console.log('visible verse-' + verse.verseNo)
      }
    }, [isTargetVisible]);

  const getTranslatorName = (translationCode) =>
    ({
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
    })[translationCode] || translationCode

    return (
        <div id={`verse-${index + 1}`} className={`${styles.wrapper} ${isVirtualized ? styles.virtualized : ""} ${isLastVerse ? styles.last_child : ""}`}>
          <div className={styles.target} ref={refTarget}></div>
            <VerseOptions
                index={index}
                verseNumber={verse.verseNo}
                chapterNumber={chapterNo}
                chapterName={chapterName}
                chapterSlug={chapterSlug}
                ayaArabic={ayaArabic}
                translation={verse.translation}
                footnotes={verse.footnote}
                printRef={printRef}
                updateBookmarksData={updateBookmarksData}
                isBookmarkPage={isBookmarkPage}
            />

            <div className={view.arabic ? styles.verse_arabic : styles.verse_arabic_display_none}>
                <div className={`${styles.verse_text} text_arabic`}>
                    {/*{verse.arabic}*/}
                    {ayaArabic}
                    {/* <span className={styles.verse_no}>١</span> */}
                </div>
            </div>

            {view.arabic && view.translation && <hr className={styles.separator} />}

            {view.translation &&
              activeTranslations.map((translationCode, idx) => {
                const translationText =
                  allTranslations[translationCode]?.translation || 
                  (translationCode === translation ? verse.translation : "");

                if (!translationText) return null;

                return (
                  <div key={translationCode} className={styles.translation_block}>
                    {idx > 0 && <hr className={styles.translation_separator} />}
                    <div
                      ref={(el) => (translationRefs.current[translationCode] = el)}
                      className={styles.verse_translation}
                      style={{ transition: "opacity 0.15s ease" }}
                    >
                      <div className={styles.verse_text}>
                        {displayTranslations[translationCode] || translationText}
                      </div>
                </div>
            </div>
            );
          })
        }

            {(view.arabic || view.translation) && shouldShowFootnote && (
              <hr className={styles.separator} />
            )}

            {shouldShowFootnote && (
            <Accordion
                className={styles.accordion}
                expanded={expanded}
                onChange={controlAccordion}
            >
                <AccordionSummary className={styles.accordion_summary}>
                    <div className={styles.summary_text}>Footnotes</div>
                    <div className={styles.summary_icon}>
                        <IconButton className={styles.btn}>
                                <span className={!expanded ? styles.none : styles.icon}>
                                    <UpIcon />
                                </span>
                            <span className={expanded ? styles.none : styles.icon}>
                                    <DownIcon />
                                </span>
                        </IconButton>
                    </div>
                </AccordionSummary>

                <AccordionDetails className={styles.accordion_details}>
            {Array.isArray(verse.footnote) ? (
              verse.footnote.map((fn, i) => (
                <p key={i} className={`${styles.verse_text} text_trans`}>
                  {fn}
                </p>
              ))
            ) : (
                    <p className={`${styles.verse_text} text_trans`}>
                        {verse.footnote}
                    </p>
            )}
                </AccordionDetails>
            </Accordion>
        )}
        </div>
    )
}