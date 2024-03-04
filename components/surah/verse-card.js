import { useState, useEffect, useContext, useRef } from 'react'
import { SettingsContext } from '../../contexts/SettingsContext'
import { PinContext } from "../../contexts/PinContext";
import useOnScreen from "../../hooks/useOnScreen";
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import IconButton from '@material-ui/core/IconButton'
import VerseOptions from './verse-options'
import UpIcon from '../icons/ChevronUp'
import DownIcon from '../icons/ChevronDown'
import styles from './verse-card.module.scss'

export default function VerseCard({ index, chapterNo, chapterName, chapterSlug, verse, ayaArabic, printRef, updateBookmarksData, isBookmarkPage, isVirtualized, isLastVerse }) {
    const { view, changeActiveVerse } = useContext(SettingsContext)
    const [expanded, setExpanded] = useState(true)

    const controlAccordion = () => {
        setExpanded(!expanded)
    }

    // last read option
    const refTarget = useRef();
    const isTargetVisible = useOnScreen(refTarget);
    const { addLastRead } = useContext(PinContext);

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

            <div className={view.translation ? styles.verse_arabic : styles.verse_arabic_display_none}>
                <div className={`${styles.verse_text} text_trans`}>
                    {verse.translation}
                </div>
            </div>

            {(view.arabic || view.translation) && (view.tafseer && verse.footnote !== "") && (
              <hr className={styles.separator} />
            )}

            <Accordion
                className={view.tafseer && verse.footnote !== "" ? styles.accordion : styles.accordion_display_none}
                expanded={expanded}
                onChange={() => controlAccordion()}
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
                    <p className={`${styles.verse_text} text_trans`}>
                        {verse.footnote}
                    </p>
                </AccordionDetails>
            </Accordion>
        </div>
    )
}