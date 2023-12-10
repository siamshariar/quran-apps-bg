import { server } from '../../lib/config'
import Link from 'next/link'
import Tooltip from '@material-ui/core/Tooltip'
import NavigateBefore from '../icons/NavigateBefore'
import NavigateNext from '../icons/NavigateNext'
import KeyboardDoubleArrowDownIcon from '../icons/KeyboardDoubleArrowDown'
import styles from './pagination.module.scss'

export default function Pagination({ prev, next, contentType, chapterSlug, verseNo }) {
    return (
        <div className={styles.wrapper}>

            {contentType && contentType === "chapter" && (
                <div className={styles.prev}>
                    {prev !== null && (
                        <Link href={prev.link}>
                            <a className={styles.link}>
                                <span className={styles.icon}><NavigateBefore /></span>
                                <span className={styles.text}>{prev.name}</span>
                            </a>
                        </Link>
                    )}
                </div>
            )}

            {contentType && contentType === "verse" && (
              <Tooltip
                title="Read Full Chapter"
                arrow
                placement="top"
                disableFocusListener={true}
              >
                <div className={styles.center}>
                    <Link href={`${server}/chapters/${chapterSlug}#verse-${verseNo}`}>
                        <a className={styles.link}>
                            <span className={styles.icon}>
                              <KeyboardDoubleArrowDownIcon />
                            </span>
                        </a>
                    </Link>
                </div>
              </Tooltip>
            )}

            {contentType && contentType === "chapter" && (
                <div className={styles.next}>
                    {next !== null && (
                        <Link href={next.link}>
                            <a className={styles.link}>
                                <span className={styles.text}>{next.name}</span>
                                <span className={styles.icon}><NavigateNext /></span>
                            </a>
                        </Link>
                    )}
                </div>
            )}

        </div>
    )
}