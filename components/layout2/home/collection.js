"use client"

import { useState, useContext, useRef } from "react"
import { PinContext } from "../../../contexts/PinContext"
import { BookmarkContext } from "../../../contexts/BookmarkContext"
import { SettingsContext } from "../../../contexts/SettingsContext"
import { useRouter } from "next/router"
import AutoStoriesIcon from "../../icons/AutoStories"
import BookmarkBorderIcon from "../../icons/BookmarkBorder"
import PinIcon from "../../icons/PinOutline"
import FolderIcon from "../../icons/Folder"
import ChevronLeftIcon from "../../icons/ChevronLeft"
import ChevronRightIcon from "../../icons/ChevronRight"
import styles from "./collection.module.scss"
import { t } from "../../../lib/config"

function formatToEnglishName(name) {
  return name
    .replace(/(chương|chuong|surah|surat|chapter|āl|'imran|'imrān)\s*/gi, "")
    .replace(/[āăâáàä]/gi, "a")
    .replace(/[éèêëē]/gi, "e")
    .replace(/[īîïíì]/gi, "i")
    .replace(/[ōôöóò]/gi, "o")
    .replace(/[ūûüúù]/gi, "u")
    .replace(/['''",.]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-{2,}/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "")
    .toLowerCase()
    .trim()
}

export default function Collection() {
  const [activeTab, setActiveTab] = useState("lastread")
  const { lastRead, pin } = useContext(PinContext)
  const { bookmarks } = useContext(BookmarkContext)
  const { verseMode } = useContext(SettingsContext)
  const router = useRouter()

  const lastReadRef = useRef(null)
  const bookmarkRef = useRef(null)
  const pinsRef = useRef(null)

  const handleLastReadClick = (e, slug, verse) => {
    e.preventDefault()
    const englishSlug = formatToEnglishName(slug).replace(/\s+/g, "-").toLowerCase()
    router.push(`/chapters/${englishSlug}#verse-${verse}`)
  }

  const handleBookmarkClick = (e, key) => {
    e.preventDefault()
    router.push(`/bookmarks?key=${key}`)
  }

  const handlePinClick = (e, slug, verse) => {
    e.preventDefault()
    const englishSlug = formatToEnglishName(slug).replace(/\s+/g, "-").toLowerCase()
    router.push(`/chapters/${englishSlug}#verse-${verse}`)
  }

  const scroll = (ref, direction) => {
    if (ref.current) {
      const scrollAmount = 300
      ref.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  const formatDate = (date) => {
    const lastReadDate = new Date(date)
    const currentDate = new Date()
    const lastReadDay = lastReadDate.getDate()
    const currentDay = currentDate.getDate()

    let options, formatted

    if (lastReadDay == currentDay) {
      options = {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      }
    } else {
      options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour12: true,
      }
    }

    formatted = lastReadDate.toLocaleString("en-US", options)
    return formatted
  }

  const renderLastRead = () => {
    if (!lastRead || lastRead.length === 0) {
      return <div className={styles.no_data}>{t("No records found")}</div>
    }

    return (
      <div className={styles.slider_container}>
        {lastRead.length > 4 && (
          <button className={`${styles.nav_button} ${styles.nav_left}`} onClick={() => scroll(lastReadRef, "left")}>
            <ChevronLeftIcon />
          </button>
        )}
        <div className={styles.slider} ref={lastReadRef}>
          {lastRead.map((item) => (
            <div
              key={item.chapter}
              className={styles.card}
              onClick={(e) => handleLastReadClick(e, item.slug, item.verse)}
            >
              <div className={styles.card_icon}>
                <AutoStoriesIcon />
              </div>
              <div className={styles.card_content}>
                <h4 className={styles.card_title}>{item.name}</h4>
                <p className={styles.card_subtitle}>Verse No: {item.verse}</p>
                <span className={styles.time}>{formatDate(item.date)}</span>
              </div>
            </div>
          ))}
        </div>
        {lastRead.length > 4 && (
          <button className={`${styles.nav_button} ${styles.nav_right}`} onClick={() => scroll(lastReadRef, "right")}>
            <ChevronRightIcon />
          </button>
        )}
      </div>
    )
  }

  const renderBookmarks = () => {
    const bookmarkKeys = Object.keys(bookmarks)

    if (bookmarkKeys.length === 0) {
      return <div className={styles.no_data}>{t("No bookmarks found")}</div>
    }

    return (
      <div className={styles.slider_container}>
        {bookmarkKeys.length > 4 && (
          <button className={`${styles.nav_button} ${styles.nav_left}`} onClick={() => scroll(bookmarkRef, "left")}>
            <ChevronLeftIcon />
          </button>
        )}
        <div className={styles.slider} ref={bookmarkRef}>
          {bookmarkKeys.map((key) => (
            <div key={key} className={styles.card} onClick={(e) => handleBookmarkClick(e, key)}>
              <div className={styles.folder_card_icon}>
                <FolderIcon />
              </div>
              <div className={styles.card_content}>
                <h4 className={styles.card_title}>{bookmarks[key]["name"]}</h4>
                <p className={styles.card_subtitle}>{bookmarks[key].entry.length} {bookmarks[key].entry.length === 1 ? "item" : "items"}</p>
              </div>
            </div>
          ))}
        </div>
        {bookmarkKeys.length > 4 && (
          <button className={`${styles.nav_button} ${styles.nav_right}`} onClick={() => scroll(bookmarkRef, "right")}>
            <ChevronRightIcon />
          </button>
        )}
      </div>
    )
  }

  const renderPins = () => {
    if (!pin || pin.length === 0) {
      return <div className={styles.no_data}>{t("No Pins Found")}</div>
    }

    return (
      <div className={styles.slider_container}>
        {pin.length > 4 && (
          <button className={`${styles.nav_button} ${styles.nav_left}`} onClick={() => scroll(pinsRef, "left")}>
            <ChevronLeftIcon />
          </button>
        )}
        <div className={styles.slider} ref={pinsRef}>
          {pin.map((item, index) => (
            <div key={index} className={styles.card} onClick={(e) => handlePinClick(e, item.slug, item.verse)}>
              <div className={styles.card_icon}>
                <PinIcon />
              </div>
              <div className={styles.card_content}>
                <h4 className={styles.card_title}>{item.name}</h4>
                <p className={styles.card_subtitle}>Verse No: {item.verse}</p>
              </div>
            </div>
          ))}
        </div>
        {pin.length > 4 && (
          <button className={`${styles.nav_button} ${styles.nav_right}`} onClick={() => scroll(pinsRef, "right")}>
            <ChevronRightIcon />
          </button>
        )}
      </div>
    )
  }

  return (
    <section className={styles.collection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Collection</h2>
          <div className={styles.tabs}>
            <button
              className={`${styles.tab} ${activeTab === "lastread" ? styles.active : ""}`}
              onClick={() => setActiveTab("lastread")}
            >
              <AutoStoriesIcon />
              {t("Last Read")}
            </button>
            <button
              className={`${styles.tab1} ${activeTab === "bookmark" ? styles.active : ""}`}
              onClick={() => setActiveTab("bookmark")}
            >
              <BookmarkBorderIcon />
              {t("Bookmark")}
            </button>
            <button
              className={`${styles.tab2} ${activeTab === "pins" ? styles.active : ""}`}
              onClick={() => setActiveTab("pins")}
            >
              <PinIcon />
              {t("Pins")}
            </button>
          </div>
        </div>

        <div className={styles.content}>
          {activeTab === "lastread" && renderLastRead()}
          {activeTab === "bookmark" && renderBookmarks()}
          {activeTab === "pins" && renderPins()}
        </div>
      </div>
    </section>
  )
}
