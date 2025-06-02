import { server } from '../../lib/config'

import PdfIcon from '../icons/Description'
import { t } from '../../lib/config'
import Mp3Icon from '../icons/MusicNote'
import styles from './download.module.scss'

export default function DownloadContent({ chapters }) {
    return (
        <div className={styles.wrapper}>

            <div className={styles.title}>{t("Download")}</div>

            <ul className={styles.lists}>
                {chapters && chapters.map(chapter =>
                    <li key={chapter.chapterNo} className={styles.item}>
                        <div className={styles.left}>
                            <span className={styles.number}>{chapter.chapterNo}</span>
                            <span className={styles.name}>{chapter.name}</span>
                        </div>

                        <div className={styles.right}>
                            {/*<a*/}
                            {/*    href={chapter.pdfUrl}*/}
                            {/*    // href={`${server}/pdf-viewer/web/viewer.html?file=http://files.deeniinfotech.com/quran-vn/pdf/chapters/Chu%CC%9Bo%CC%9Bng%20Al-Fa%CC%84tihah.pdf`}*/}
                            {/*    className={styles.link}*/}
                            {/*    // download*/}
                            {/*    target="_blank"*/}
                            {/*>*/}
                            {/*    <span><PdfIcon /></span>*/}
                            {/*    <span><span className={styles.down_text}>Download </span>PDF</span>*/}
                            {/*</a>*/}
                            <a
                                href={chapter.mp3Url}
                                className={styles.link}
                                download
                                // target="_blank"
                            >
                                <span><Mp3Icon /></span>
                                <span><span className={styles.down_text}>Download </span>Audio</span>
                            </a>
                        </div>
                    </li>
                )}
            </ul>
        </div>
    )
}
