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
  translation
}) {
    const { view, changeActiveVerse } = useContext(SettingsContext)
    const [expanded, setExpanded] = useState(true)
  const [displayTranslation, setDisplayTranslation] = useState(verse.translation)
  const translationRef = useRef(null)
  const prevTranslation = useRef(translation)
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
    if (prevTranslation.current !== translation) {

      if (translationRef.current) {
        translationRef.current.style.opacity = '0'
      }
      
      const timer = setTimeout(() => {
        setDisplayTranslation(verse.translation)
        if (translationRef.current) {
          translationRef.current.style.opacity = '1'
        }
      }, 150)
      
      prevTranslation.current = translation
      return () => clearTimeout(timer)
    }
  }, [translation, verse.translation])

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

            {view.arabic && view.translation && (
              <hr className={styles.separator} />
            )}

            <div 
                ref={translationRef}
                className={view.translation ? styles.verse_arabic : styles.verse_arabic_display_none}
                style={{ transition: 'opacity 0.15s ease' }}
              >
                <div className={`${styles.verse_text} text_trans`}>
                    {displayTranslation}
                </div>
            </div>

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