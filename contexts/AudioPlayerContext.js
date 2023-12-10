import { useState, useContext, createContext } from 'react'
import { SettingsContext } from './SettingsContext'

export const AudioPlayerContext = createContext()

const AudioPlayerContextProvider = ({ children }) => {
    const { autoScroll } = useContext(SettingsContext)

    const [playlist, setPlaylist] = useState([])
    const [chapterMp3Url, setChapterMp3Url] = useState(null)
    const [audioType, setAudioType] = useState(null)

    const [currentIndex, setCurrentIndex] = useState(0)
    const [src, setSrc] = useState(null)

    const [playing, setPlaying] = useState(false)
    const [ended, setEnded] = useState(false)
    const [init, setInit] = useState(false)

    const scrollToVerse = index => {
        const top = document.getElementById('verse-' + (index + 1)).offsetTop

        const x = window.matchMedia('(min-width: 1024px)')
        if (x.matches) {
            window.scrollTo({
                top: top,
                left: 0,
                behavior: 'smooth'
            })
        }
        else {
            document.querySelector('#viewport').scrollTo({
                top: top,
                left: 0,
                behavior: 'smooth'
            })
        }
    }

    const play = (index, type) => {
        if (type === 'chapter') {
            setSrc(chapterMp3Url)
        }
        else if (type === 'verse') {
            setSrc(playlist[index])
        }
        setPlaying(true)
        setCurrentIndex(index)
        setAudioType(type)
        setEnded(false)
        setInit(true)
    }

    const pause = () => {
        setPlaying(false)
    }

    const playPrevious = () => {
        const index = currentIndex - 1
        if (audioType === 'chapter' || index < 0) return
        //if (index < 0) return
        setCurrentIndex(index)
        setSrc(playlist[index])
        scrollToVerse(index)
        setPlaying(true)
    }

    const playNext = () => {
        const index = currentIndex + 1
        if (audioType === 'chapter' || index == playlist.length) return
        //if (index == playlist.length) return
        setCurrentIndex(index)
        setSrc(playlist[index])
        scrollToVerse(index)
        setPlaying(true)
    }

    const handleEnd = () => {
        if (audioType === 'chapter') {
            setPlaying(false)
            setEnded(true)
            setCurrentIndex(0)
            return
        }

        const index = currentIndex + 1

        if (!autoScroll || index == playlist.length) {
            setPlaying(false)
            setEnded(true)
            setCurrentIndex(0)
            return
        }

        setCurrentIndex(index)
        setSrc(playlist[index])
        setPlaying(true)
        scrollToVerse(index)
    }

    return (
        <AudioPlayerContext.Provider
            value={{
                playlist,
                setPlaylist,
                setChapterMp3Url,
                currentIndex,
                setCurrentIndex,
                src,
                playing,
                init,
                setInit,
                setPlaying,
                audioType,
                ended,
                play,
                pause,
                playPrevious,
                playNext,
                handleEnd
            }}
        >
            { children }
        </AudioPlayerContext.Provider>
    )
}

export default AudioPlayerContextProvider