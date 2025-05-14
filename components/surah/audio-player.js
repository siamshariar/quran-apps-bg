import { useState, useContext, useEffect, useRef } from 'react'
import { AudioPlayerContext } from '../../contexts/AudioPlayerContext'
import { SettingsContext } from "../../contexts/SettingsContext";
import IconButton from '@mui/material/IconButton';
import PlayIcon from '../icons/PlayArrow'
import PauseIcon from '../icons/Pause'
import SkipNextIcon from '../icons/SkipNext'
import SkipPreviousIcon from '../icons/SkipPrevious'
import CloseIcon from '../icons/Close'
import AudioSpeed from "./audio-speed";
import styles from './audio-player.module.scss'

export default function AudioPlayer() {
    const { playbackRate } = useContext(SettingsContext);

    const {
        playing,
        init,
        setInit,
        setPlaying,
        ended,
        //play,
        pause,
        playPrevious,
        playNext,
        //currentIndex,
        src,
        handleEnd
    } = useContext(AudioPlayerContext)

    const player = useRef(null)

    const [dur, setDur] = useState(0)
    const [currentTime, setCurrentTime] = useState(0)

    const formatDur = s => {
        return (s - (s %= 60)) / 60 + (s < 10 ? ':0' : ':') + ~~(s)
    }

    useEffect(() => {
        if (playing) {
            player.current.play()
            player.current.playbackRate = playbackRate;
        }
        else {
            player.current.pause()
        }
    }, [src, playing, playbackRate]);

    const playCurrent = () => {
        setPlaying(true)
    }

    const handleProgress = (e) => {
        let compute = (e.target.value * dur) / 100;
        setCurrentTime(compute);
        player.current.currentTime = compute
    }

    return (
        <div className={(init && !ended) ? `${styles.audio} ${styles.open}` : styles.audio}>

            <span
                className={!playing ? styles.close : styles.none}
                onClick={() => setInit(false)}
            >
                <CloseIcon />
            </span>

            <audio
                src={src}
                ref={player}
                onEnded={handleEnd}
                onTimeUpdate={(e) => setCurrentTime(e.target.currentTime)}
                onCanPlay={(e) => setDur(e.target.duration)}
            >
            </audio>

            <div className={styles.wrapper}>
                <div className={styles.ctrl}>

                    <IconButton
                        className={styles.prev}
                        onClick={playPrevious}
                    >
                        <SkipPreviousIcon />
                    </IconButton>


                    <div className={styles.player}>
                        {playing && (
                            <IconButton
                                className={styles.player_btn}
                                onClick={pause}
                            >
                                <PauseIcon />
                            </IconButton>
                        )}

                        {!playing && (
                            <IconButton
                                className={styles.player_btn}
                                onClick={() => playCurrent()}
                            >
                                <PlayIcon />
                            </IconButton>
                        )}
                    </div>

                    <IconButton
                        className={styles.next}
                        onClick={playNext}
                    >
                        <SkipNextIcon />
                    </IconButton>
                </div>

                <div className={styles.timer}>
                    <div className={styles.time_val_start}>
                        {formatDur(currentTime)}
                    </div>

                    <input
                        className={styles.time_ranger}
                        type="range"
                        min="0"
                        max="100"
                        value={dur ? (currentTime * 100) / dur : 0}
                        onChange={(e) => handleProgress(e)}
                        name="progresBar"
                    />

                    <div className={styles.time_val_end}>
                        {formatDur(dur)}
                    </div>

                    <div className={styles.speed}>
                        <AudioSpeed />
                    </div>
                </div>
            </div>
        </div>
    )
}
