"use client"
import { useState, useEffect } from "react"
import { Drawer, IconButton } from "@mui/material"
import TranslationModalContent from "../modal/translation-modal"
import CloseIcon from "../icons/Close"
import { t } from "../../lib/config"
import styles from "./mobile-translation-modal.module.scss"

export default function MobileTranslationModal({ open, onClose, controller }) {
  const [isClosing, setIsClosing] = useState(false)

  useEffect(() => {
    console.log("MobileTranslationModal open state changed:", open)
  }, [open])

  const handleClose = () => {
    console.log("MobileTranslationModal handleClose called")
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

        <div className={styles.content}>
          <TranslationModalContent onBack={handleClose} />
        </div>
      </div>
    </Drawer>
  )
}
