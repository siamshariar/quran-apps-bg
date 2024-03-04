import { useState, useEffect, useRef } from "react";
import IconButton from "@material-ui/core/IconButton";
import PlayIcon from "../icons/PlayArrow";
import PauseIcon from "../icons/Pause";
import styles from "./audio.module.scss";

export default function Audio({ names }) {
  const player = useRef(null);

  const [playlist, setPlaylist] = useState([]);
  const [src, setSrc] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    let filtered = [];
    names.forEach((name) => {
      filtered.push(name.mp3Url);
    });
    setPlaylist(filtered);
  }, []);

  useEffect(() => {
    if (playing) {
      player.current.play();
    } else {
      player.current.pause();
    }
  }, [src, currentIndex, playing]);

  const play = () => {
    setSrc(playlist[currentIndex]);
    setPlaying(true);
    addHighlight(currentIndex);
    scrollToName(currentIndex);
  };

  const pause = () => {
    setPlaying(false);
    removeHighlight(currentIndex);
  };

  const handleEnd = () => {
    const index = currentIndex + 1;
    if (index == playlist.length) {
      setPlaying(false);
      removeHighlight(index - 1);
      setCurrentIndex(0);
      return;
    }
    setCurrentIndex(index);
    setSrc(playlist[index]);
    setPlaying(true);
    addHighlight(index);
    scrollToName(index);
  };

  const scrollToName = (index) => {
    const elem = document.getElementById("name-" + (index + 1));
    const top = elem.offsetTop;
    const x = window.matchMedia("(min-width: 1024px)");

    if (x.matches) {
      window.scrollTo({
        top: top - 24,
        left: 0,
        behavior: "smooth",
      });
    } else {
      window.scrollTo({
        top: top - 70,
        left: 0,
        behavior: "smooth",
      });
    }
  };

  const addHighlight = (index) => {
    const elem = document.getElementById("name-" + (index + 1));
    removeHighlight(currentIndex);
    elem.classList.add("highlight");
  };

  const removeHighlight = (index) => {
    const elem = document.getElementById("name-" + (index + 1));
    elem.classList.remove("highlight");
  };

  return (
    <div className={styles.wrapper}>
      <audio ref={player} src={src} onEnded={handleEnd}></audio>

      <div className={styles.player}>
        <IconButton
          className={styles.player_btn}
          onClick={playing ? () => pause() : () => play()}
        >
          {playing ? <PauseIcon /> : <PlayIcon />}
        </IconButton>
      </div>
    </div>
  );
}
