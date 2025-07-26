import { useState } from "react";
import { Drawer, IconButton } from "@mui/material";
import SettingsContent from "../settings";
import CloseIcon from "../icons/Close";
import { t } from "../../lib/config";
import styles from "./settings-modal.module.scss";

export default function SettingsModal({ open, onClose, controller }) {
  const [isClosing, setIsClosing] = useState(false)

  const handleClose = () => {
    setIsClosing(true)
    setTimeout(() => {
      setIsClosing(false)
      onClose()
    }, 200)
  }

  const handleBackdropClick = (event) => {
    event.preventDefault()
    event.stopPropagation()
    handleClose()
  }

  return (
    <Drawer
      anchor="bottom"
      open={open}
      onClose={handleClose}
      className={styles.drawer}
      PaperProps={{
        className: `${styles.drawerPaper} ${isClosing ? styles.closing : ""}`,
        style: {
          height: "100vh",
          maxHeight: "100vh",
          borderRadius: 0,
        },
      }}
      ModalProps={{
        keepMounted: false,
        disableScrollLock: true,
        BackdropProps: {
          onClick: handleBackdropClick,
        },
      }}
      transitionDuration={300}
    >
      <div className={styles.modalContainer}>
        <div className={styles.header}>
          <h2 className={styles.title}>{t("Settings")}</h2>
          <IconButton onClick={handleClose} className={styles.closeButton} aria-label="close">
            <CloseIcon />
          </IconButton>
        </div>

        <div className={styles.content}>
          <SettingsContent />
        </div>
      </div>
    </Drawer>
  );
}
