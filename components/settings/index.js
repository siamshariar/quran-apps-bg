import { fonts, themes } from '../../lib/settings'
import { useState, useContext } from 'react'
import { SettingsContext } from '../../contexts/SettingsContext'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import Switcher from '../core/switcher'
import UpIcon from '../icons/ChevronUp'
import DownIcon from '../icons/ChevronDown'
import PlusIcon from '../icons/Plus'
import MinusIcon from '../icons/Minus'
import styles from './index.module.scss'

export default function SettingsContent() {
    return (
        <div className={styles.wrapper}>
            <View />
            {/*<hr className={styles.divider} />*/}
            {/*<VerseMode />*/}
            <hr className={styles.divider} />
            <FontSize />
            <hr className={styles.divider} />
            <FontFamily />
            <hr className={styles.divider} />
            <Theme />
            <hr className={styles.divider} />
            {/*<AutoScroll />*/}
            {/*<hr className={styles.divider} />*/}
            {/*<Notification />*/}
            {/*<hr className={styles.divider} />*/}
            <Note />
            <Reset />
        </div>
    )
}


const View = () => {
    const { view, changeView } = useContext(SettingsContext)

    const [message, setMessage] = useState({
        open: false,
        text: 'Set at least one option visible'
    })

    const handleViewChange = (name, val) => {
        const newView = { ...view, [name]: val }
        if (!newView.arabic && !newView.translation && !newView.tafseer) {
            setMessage({ ...message, ['open']: true })
            setTimeout(() => {
                setMessage({ ...message, ['open']: false })
            }, 2000)
            return
        }
        changeView(newView)
    }

    return (
        <div className={`${styles.block} ${styles.view}`}>
            <div className={styles.title}>View</div>
            <div className={styles.list}>
                <div className={styles.item}>
                    <Switcher
                        control={handleViewChange}
                        checked={view.arabic}
                        label="Arabic"
                        name="arabic"
                    />
                </div>
                <div className={styles.item}>
                    <Switcher
                        control={handleViewChange}
                        checked={view.translation}
                        label="Translation"
                        name="translation"
                    />
                </div>
                <div className={styles.item}>
                    <Switcher
                        control={handleViewChange}
                        checked={view.tafseer}
                        label="Footnotes"
                        name="tafseer"
                    />
                </div>

                <div className={message.open ? `${styles.message} ${styles.open}` : styles.message}>{message.text}</div>
            </div>
        </div>
    )
}

const FontSize = () => {
    const {
        fontSizeArabic,
        changeFontSizeArabic,
        fontSizeTranslation,
        changeFontSizeTranslation
    } = useContext(SettingsContext)

    const handleFontSizeArabic = (size) => {
        changeFontSizeArabic(size)
    }

    const handleFontSizeTranslation = (size) => {
        changeFontSizeTranslation(size)
    }

    return (
        <div className={`${styles.block} ${styles.font_size}`}>
            <div className={styles.title}>Font Size</div>
            <div className={styles.list}>
                <div className={styles.item}>
                    <div className={styles.label}>Arabic</div>
                    <div className={styles.sizer}>
                        <IconButton
                            className={styles.sizer_btn}
                            onClick={() => handleFontSizeArabic(fontSizeArabic - 1)}
                        >
                            <MinusIcon />
                        </IconButton>

                        <span className={styles.sizer_text}>{ fontSizeArabic }</span>

                        <IconButton
                            className={styles.sizer_btn}
                            onClick={() => handleFontSizeArabic(fontSizeArabic + 1)}
                        >
                            <PlusIcon />
                        </IconButton>
                    </div>
                </div>
                <div className={styles.item}>
                    <div className={styles.label}>Translation</div>
                    <div className={styles.sizer}>
                        <IconButton
                            className={styles.sizer_btn}
                            onClick={() => handleFontSizeTranslation(fontSizeTranslation - 1)}
                        >
                            <MinusIcon />
                        </IconButton>

                        <span className={styles.sizer_text}>{ fontSizeTranslation }</span>

                        <IconButton
                            className={styles.sizer_btn}
                            onClick={() => handleFontSizeTranslation(fontSizeTranslation + 1)}
                        >
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

    const {
        fontFamilyArabic,
        changeFontFamilyArabic,
        fontFamilyTranslation,
        changeFontFamilyTranslation
    } = useContext(SettingsContext)

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
            <div className={styles.title}>Font Family</div>
            <div className={styles.list}>
                <div className={styles.item}>
                    <Accordion
                        className={styles.accordion}
                        expanded={expanded === 'font_arabic'}
                        onChange={controlAccordion('font_arabic')}
                    >
                        <AccordionSummary className={styles.accordion_summary}>
                            <IconButton className={styles.btn}>
                                <span className={expanded !== 'font_arabic' ? styles.none : styles.icon}>
                                    <UpIcon />
                                </span>
                                <span className={expanded === 'font_arabic' ? styles.none : styles.icon}>
                                    <DownIcon />
                                </span>
                            </IconButton>
                            <div className={styles.label}>Choose Arabic Font</div>
                        </AccordionSummary>

                        <AccordionDetails className={styles.accordion_details}>
                            <RadioGroup
                                name="fontArabic"
                                value={fontFamilyArabic}
                                onChange={handleFontFamilyArabic}
                            >
                            {fontsArabic && fontsArabic.map(font =>
                                <FormControlLabel
                                    key={font.familyName}
                                    className="settings_radio"
                                    value={font.familyName}
                                    control={<Radio />}
                                    label={font.displayName}
                                />
                            )}
                            </RadioGroup>
                        </AccordionDetails>
                    </Accordion>
                </div>
                <div className={styles.item}>
                    <Accordion
                        className={styles.accordion}
                        expanded={expanded === 'font_trans'}
                        onChange={controlAccordion('font_trans')}
                    >
                        <AccordionSummary className={styles.accordion_summary}>
                            <IconButton className={styles.btn}>
                                <span className={expanded !== 'font_trans' ? styles.none : styles.icon}>
                                    <UpIcon />
                                </span>
                                <span className={expanded === 'font_trans' ? styles.none : styles.icon}>
                                    <DownIcon />
                                </span>
                            </IconButton>
                            <div className={styles.label}>Choose Translation Font</div>
                        </AccordionSummary>

                        <AccordionDetails className={styles.accordion_details}>
                            <RadioGroup
                                name="fontTranslation"
                                value={fontFamilyTranslation}
                                onChange={handleFontFamilyTranslation}
                            >
                            {fontsTranslation && fontsTranslation.map(font =>
                                <FormControlLabel
                                    key={font.familyName}
                                    className="settings_radio"
                                    value={font.familyName}
                                    control={<Radio />}
                                    label={font.displayName}
                                />
                            )}
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
            <div className={styles.title}>Theme</div>
            <div className={styles.list}>
                <div className={styles.item}>
                    <Accordion
                        className={styles.accordion}
                        expanded={expanded === 'theme'}
                        onChange={controlAccordion('theme')}
                    >
                        <AccordionSummary className={styles.accordion_summary}>
                            <IconButton className={styles.btn}>
                                <span className={expanded !== 'theme' ? styles.none : styles.icon}>
                                    <UpIcon />
                                </span>
                                <span className={expanded === 'theme' ? styles.none : styles.icon}>
                                    <DownIcon />
                                </span>
                            </IconButton>
                            <div className={styles.label}>Choose theme</div>
                        </AccordionSummary>

                        <AccordionDetails className={styles.accordion_details}>
                            <div className={styles.themes}>
                            {themes && themes.map(item =>
                                <span
                                    key={item.name}
                                    onClick={() => handleThemeChange(item.name)}
                                    className={
                                        theme === item.name ? `${styles.theme_item} ${styles.active}` : styles.theme_item
                                    }
                                    style={{
                                        background: item.color
                                    }}
                                >Aa
                                </span>
                            )}
                            </div>
                        </AccordionDetails>
                    </Accordion>
                </div>
            </div>
        </div>
    )
}

// const VerseMode = () => {
//     const { verseMode, changeVerseMode } = useContext(SettingsContext)
//     const handleVerseModeChange = (event) => {
//       changeVerseMode(event.target.value)
//     }
//
//     return (
//         <div className={`${styles.block} ${styles.scroll_mode}`}>
//             <div className={styles.title}>Verse Mode</div>
//             <RadioGroup
//                 className={styles.list}
//                 name="verseMode"
//                 value={verseMode}
//                 onChange={handleVerseModeChange}
//             >
//                 <FormControlLabel
//                     classes={{
//                       root: `${styles.item} settings_radio verse_mode_radio` + (verseMode == "scroll" ? " checked" : ""),
//                     }}
//                     value="scroll"
//                     control={<Radio />}
//                     label="Scroll"
//                 />
//                 <FormControlLabel
//                     classes={{
//                       root: `${styles.item} settings_radio verse_mode_radio` + (verseMode == "slide" ? " checked" : ""),
//                     }}
//                     value="slide"
//                     control={<Radio />}
//                     label="Slide"
//                 />
//             </RadioGroup>
//         </div>
//     )
// }

const AutoScroll = () => {
    const { autoScroll, changeAutoScroll } = useContext(SettingsContext)
    const handleAutoScrollStatusChange = (status) => {
        changeAutoScroll(status)
    }
    return (
        <div className={`${styles.block} ${styles.auto_scroll}`}>
            <div className={styles.title}>Auto Scroll</div>
            <div className={styles.list}>
                <div className={styles.item}>
                    <div className={styles.label}>Enable</div>
                    <Switcher
                        control={handleAutoScrollStatusChange}
                        checked={autoScroll}
                    />
                </div>
            </div>
        </div>
    )
}

const Notification = () => {
    const { notification, changeNotification } = useContext(SettingsContext)
    const handleNotificationStatusChange = (status) => {
        changeNotification(status)
    }
    return (
        <div className={`${styles.block} ${styles.notification}`}>
            <div className={styles.title}>Notification</div>
            <div className={styles.list}>
                <div className={styles.item}>
                    <div className={styles.label}>Enable</div>
                    <Switcher
                        control={handleNotificationStatusChange}
                        checked={notification}
                    />
                </div>
            </div>
        </div>
    )
}

const Note = () => {
    return (
        <div className={`${styles.block} ${styles.note}`}>
            <p className={styles.note_text}>
                <span>Note: </span>If you remove storage or cache then your settings will be reset to default.
            </p>
        </div>
    )
}

const Reset = () => {
    const { resetSettings } = useContext(SettingsContext)
    return (
        <Button
            className={styles.btn_reset}
            onClick={resetSettings}
            disableRipple
        >
            Reset
        </Button>
    )
}