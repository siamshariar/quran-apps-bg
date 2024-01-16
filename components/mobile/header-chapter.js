import { useState, useEffect, useRef, useContext } from 'react'
//import { AudioPlayerContext } from '../../contexts/AudioPlayerContext'
import Link from 'next/link'
import Container from '../core/container'
import GoToVerse from './go-to-verse'
import SettingsModal from './settings-modal'
//import IconButton from '@material-ui/core/IconButton'
import BackIcon from '../icons/NavigateBefore'
import DropDownIcon from '../icons/ArrowDropDown'
import TuneIcon from '../icons/Tune'
//import PlayIcon from '../icons/PlayArrow'
//import PauseIcon from '../icons/Pause'
import styles from './header.module.scss'

export default function HeaderMobile({ contentTitle, chapterNo, chapters }) {
    // const { playing, play, pause, audioType } = useContext(AudioPlayerContext)
    // const playingThisChapter = playing && audioType === 'chapter'

    // const controlPlay = () => {
    //     play(0, 'chapter')
    // }

    // const controlPause = () => {
    //     pause()
    // }


    const [goToVerseOpen, setGoToVerseOpen] = useState(false)
    // const [goToVerseInit, setGoToVerseInit] = useState(false)
    // const [goToVerseData, setGoToVerseData] = useState([])

    const handleGoToVerseModal = open => event => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return
        }

        setGoToVerseOpen(open)

        // if (!goToVerseInit) {
        //     getChaptersInfo().then(res => {
        //         setGoToVerseData(res)

        //         setTimeout(() => {
        //             setGoToVerseInit(true)
        //         }, 0)
        //     })
        // }
    }


    // settings modal
    const [settingsOpen, setSettingsOpen] = useState(false)

    const handleSettingsModal = open => event => {
        event.preventDefault()
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return
        }
        setSettingsOpen(open)
    }


    // show hide appbar on scroll
    const header = useRef(null)
    const [lastScrollTop, setLastScrollTop] = useState(0)
    const [scrollTop, setScrollTop] = useState(0)
    const [didMount, setDidMount] = useState(false)

    // useEffect(() => {
    //     setDidMount(true)
    //
    //     const viewport = document.getElementById('viewport')
    //
    //     viewport.onscroll = () => {
    //         setScrollTop(viewport.scrollTop)
    //     }
    //     if (scrollTop > lastScrollTop) {
    //         header.current.classList.add(styles.scroll_up)
    //     }
    //     else {
    //         header.current.classList.remove(styles.scroll_up)
    //     }
    //     setLastScrollTop(scrollTop)
    //
    //     return () => setDidMount(false)
    // }, [scrollTop])


    return (
        <>
            <div className={styles.header} ref={header}>
                <Container>
                    <div className={styles.wrapper}>
                        <div className={styles.left}>
                            <Link href="/">
                                <a className={styles.back_icon}>
                                    <BackIcon />
                                </a>
                            </Link>
                        </div>

                        <div
                            className={styles.center}
                            onClick={handleGoToVerseModal(true)}
                        >
                            {/* <span>{chapterNo}. </span> */}
                            <span>{contentTitle} </span>
                            <span className={styles.icon}><DropDownIcon /></span>


                            {/* {playingThisChapter && (
                                <span
                                    className={styles.audio_icon}
                                    onClick={controlPause}
                                >
                                    <PauseIcon />
                                </span>
                            )}
                            {!playingThisChapter && (
                                <span
                                    className={styles.audio_icon}
                                    onClick={controlPlay}
                                >
                                    <PlayIcon />
                                </span>
                            )} */}

                        </div>

                        <div className={styles.right}>
                            <Link href="/settings">
                                <a className={styles.icon} onClick={handleSettingsModal(true)}>
                                    <TuneIcon />
                                </a>
                            </Link>
                        </div>
                    </div>
                </Container>
            </div>

            <GoToVerse
                open={goToVerseOpen}
                controller={handleGoToVerseModal}
                chapters={chapters}
            />

            <SettingsModal
                open={settingsOpen}
                controller={handleSettingsModal}
            />
        </>
    )
}
