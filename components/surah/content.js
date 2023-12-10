import { useContext, useEffect } from 'react'
import { AudioPlayerContext } from '../../contexts/AudioPlayerContext'
import VerseCard from './verse-card'
import Pagination from './pagination'
import QuranIcon from '../icons/Quran'
//import InfoIcon from '../icons/Info'
import PlayIcon from '../icons/PlayArrow'
import PauseIcon from '../icons/Pause'
import Bismillah from '../icons/Bismillah'
import styles from './content.module.scss'

export default function ChapterContent({ chapterNumber, chapterName, chapterMp3Url, verses, prevChapter, nextChapter }) {
    const { setPlaylist, setChapterMp3Url, playing, play, pause, audioType } = useContext(AudioPlayerContext)


    useEffect(() => {
        let filtered = []
        verses.forEach(verse => {
            filtered.push(verse.mp3Url)
        })
        setPlaylist(filtered)

        setChapterMp3Url(chapterMp3Url)
    }, [])


    const playingThisChapter = playing && audioType === 'chapter'

    const controlPlay = () => {
        play(0, 'chapter')
    }

    const controlPause = () => {
        pause()
    }

    return (
        <div className={styles.content}>
            <div className={styles.chapter}>

                <div className={styles.chapter_tab}>

                    <div className={styles.title}>
                        <span className={styles.title_icon}><QuranIcon /></span>
                        <span className={styles.title_text}>{chapterName}</span>
                        {/* <span className={styles.title_icon}><InfoIcon /></span> */}

                        {playingThisChapter && (
                            <span
                                className={styles.title_icon}
                                onClick={controlPause}
                            >
                                <PauseIcon />
                            </span>
                        )}
                        {!playingThisChapter && (
                            <span
                                className={styles.title_icon}
                                onClick={controlPlay}
                            >
                                <PlayIcon />
                            </span>
                        )}
                    </div>

                    <div className={styles.bismillah}><Bismillah /></div>

                    <div className={styles.verses}>
                        {verses && verses.map((verse, index) =>
                            <VerseCard
                                key={verse.ayah}
                                index={index}
                                chapterNumber={chapterNumber}
                                verse={verse}
                            />
                        )}
                    </div>

                </div>

                <Pagination
                    prevChapter={prevChapter}
                    nextChapter={nextChapter}
                />
            </div>
        </div>
    )
}