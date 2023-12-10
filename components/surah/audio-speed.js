import { SettingsContext } from "../../contexts/SettingsContext";
import { AudioPlayerContext } from "../../contexts/AudioPlayerContext";
import { useState, useEffect, useContext } from "react";
import Popover from "@material-ui/core/Popover";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import CloseIcon from "../icons/Close";
import MoreIcon from "../icons/MoreVert";
import TickIcon from "../icons/Tick";
import styles from "./audio-speed.module.scss";

const AudioSpeed = () => {
    const { playbackRate, changePlaybackRate } = useContext(SettingsContext);
    const { ended } = useContext(AudioPlayerContext);
    const [anchorEl, setAnchorEl] = useState(null);

    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    const handlePlaybackSpeed = (speed) => {
        changePlaybackRate(speed);
        handlePopoverClose();
    };

    useEffect(() => {
        if (ended) handlePopoverClose();
    }, [ended]);

    return (
        <div className={styles.wrapper}>
            <IconButton
                className={styles.more_icon} //
                onClick={handlePopoverOpen}
            >
                <MoreIcon />
            </IconButton>

            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handlePopoverClose}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                disableScrollLock={true}
                classes={{
                    root: styles.speed_root,
                    paper: styles.speed_paper,
                }}
            >
                <Button
                    classes={{ root: styles.playback_label }}
                    onClick={handlePopoverClose}
                >
                    <span className={styles.icon}>
                        <CloseIcon />
                    </span>
                    <span className={styles.speed_label}>Playback Speed</span>
                </Button>

                <MenuList>
                    {/*<MenuItem onClick={() => handlePlaybackSpeed(0.25)}>*/}
                    {/*    <span className={styles.icon}>*/}
                    {/*      {playbackRate === 0.25 && <TickIcon />}*/}
                    {/*    </span>*/}
                    {/*    <span className={styles.speed_label}>0.25</span>*/}
                    {/*</MenuItem>*/}
                    <MenuItem onClick={() => handlePlaybackSpeed(0.5)}>
                        <span className={styles.icon}>
                          {playbackRate === 0.5 && <TickIcon />}
                        </span>
                        <span className={styles.speed_label}>0.5</span>
                    </MenuItem>
                    <MenuItem onClick={() => handlePlaybackSpeed(0.75)}>
                        <span className={styles.icon}>
                          {playbackRate === 0.75 && <TickIcon />}
                        </span>
                        <span className={styles.speed_label}>0.75</span>
                    </MenuItem>
                    <MenuItem onClick={() => handlePlaybackSpeed(1)}>
                        <span className={styles.icon}>
                          {playbackRate === 1 && <TickIcon />}
                        </span>
                        <span className={styles.speed_label}>Normal</span>
                    </MenuItem>
                    <MenuItem onClick={() => handlePlaybackSpeed(1.25)}>
                        <span className={styles.icon}>
                          {playbackRate === 1.25 && <TickIcon />}
                        </span>
                        <span className={styles.speed_label}>1.25</span>
                    </MenuItem>
                    <MenuItem onClick={() => handlePlaybackSpeed(1.5)}>
                        <span className={styles.icon}>
                          {playbackRate === 1.5 && <TickIcon />}
                        </span>
                        <span className={styles.speed_label}>1.5</span>
                    </MenuItem>
                    {/*<MenuItem onClick={() => handlePlaybackSpeed(1.75)}>*/}
                    {/*  <span className={styles.icon}>*/}
                    {/*    {playbackRate === 1.75 && <TickIcon />}*/}
                    {/*  </span>*/}
                    {/*  <span className={styles.speed_label}>1.75</span>*/}
                    {/*</MenuItem>*/}
                    {/*<MenuItem onClick={() => handlePlaybackSpeed(2)}>*/}
                    {/*  <span className={styles.icon}>*/}
                    {/*    {playbackRate === 2 && <TickIcon />}*/}
                    {/*  </span>*/}
                    {/*  <span className={styles.speed_label}>2</span>*/}
                    {/*</MenuItem>*/}
                </MenuList>
            </Popover>
        </div>
    );
};

export default AudioSpeed;
