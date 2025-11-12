import { useContext } from 'react'
import { SettingsContext } from '../../contexts/SettingsContext'
import Link from 'next/link'
import { buildChapterUrl } from '../../lib/config'
import styles from './chapter-card.module.scss'

export default function ChapterCard({ chapter, translation }) {
  const { verseMode, translation: contextTranslation } = useContext(SettingsContext)
  
  // Use the translation from context
  const currentTranslation = contextTranslation

  // const link = verseMode === "scroll" ? `/chapters/${chapter.slug}` : verseMode === "slide" ? `/chapters/${chapter.slug}/verses/1` : `/chapters/${chapter.slug}`
  const link = buildChapterUrl(currentTranslation, chapter.slug)

    return (
        <div className={styles.item}>
            <Link href={link} legacyBehavior>
                <a className={styles.wrapper}></a>
            </Link>

            <span className={styles.number}>{chapter.chapterNo}</span>

            <div className={styles.left}>
                <Link href={link} legacyBehavior>
                    <a className={styles.name}>{chapter.name}</a>
                </Link>
                <div className={styles.bottom}>{chapter.meaning}</div>
            </div>

            <div className={styles.right}>{chapter.nameArabic}</div>
        </div>
    )
}