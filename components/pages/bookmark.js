import css from './style.module.scss'
import styles from './about.module.scss'

export default function BookmarkContent() {
    return (
        <div className={css.wrapper}>
            <div className={css.page_title}>Bookmark</div>

            <div className={css.page_item}>
                <div className={styles.quran_content}>
                    <p>
                        Sẽ được thêm vào sớm
                    </p>
                </div>
            </div>
        </div>
    )
}
