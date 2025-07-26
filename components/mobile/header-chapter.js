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
import { useRouter } from "next/router"

export default function HeaderMobile({ contentTitle, chapterNo, chapters, onSettingsClick, isSearchPage = false, searchQuery = "", }) {
      // const { playing, play, pause, audioType } = useContext(AudioPlayerContext)
    // const playingThisChapter = playing && audioType === 'chapter'

    // const controlPlay = () => {
    //     play(0, 'chapter')
    // }

    // const controlPause = () => {
    //     pause()
    // }

  const router = useRouter()
  const [goToVerseOpen, setGoToVerseOpen] = useState(false)
    // const [goToVerseInit, setGoToVerseInit] = useState(false)
    // const [goToVerseData, setGoToVerseData] = useState([])

  const isMultiTranslationPage = router.pathname.includes("/multi-translation")
  const handleGoToVerseModal = (open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return
    }
    if (event) {
      event.preventDefault()
      event.stopPropagation()
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


  const handleSettingsClick = (event) => {
    event.preventDefault()
    if (onSettingsClick) {
      onSettingsClick(event)
    }
  }
  

    // show hide appbar on scroll
  const header = useRef(null)
  const [lastScrollTop, setLastScrollTop] = useState(0)
  const [scrollTop, setScrollTop] = useState(0)
  const [didMount, setDidMount] = useState(false)

  const handleBackNavigation = () => {
    if (window.history.length > 1) {
      router.back()
    } else {
      router.push("/")
    }
  }

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
              <div className={styles.back_icon} onClick={handleBackNavigation}>
                <BackIcon />
              </div>
            </div>

            <div
             className={styles.center}
              onClick={isMultiTranslationPage ? undefined : handleGoToVerseModal(true)}
              >
              <span>{isMultiTranslationPage ? "Multi Translation" : contentTitle}</span>
              {!isMultiTranslationPage && (
                <span className={styles.icon}>
                  <DropDownIcon />

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
                </span>
              )}
              
            </div>

            <div className={styles.right}>
              <a className={styles.icon} onClick={handleSettingsClick}>
                <TuneIcon />
              </a>
            </div>
          </div>
        </Container>
      </div>
      {!isMultiTranslationPage && (
        <GoToVerse
          open={goToVerseOpen}
          onClose={handleGoToVerseModal(false)}
          controller={handleGoToVerseModal}
          chapters={chapters}
        />
      )}

    </>
  )
}
