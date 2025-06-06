import { t } from '../../lib/config'
import css from './style.module.scss'
import styles from './about.module.scss'

export default function GratefulContent() {
    return (
        <div className={css.wrapper}>
            <div className={css.page_title}>Grateful</div>

            <div className={css.page_item}>
                <div className={styles.quran_content}>
                    <p>
                        {t('By the grace of almighty Allah, extremely thankful to Quran Encyclopedia for providing authentic data to spread the message of Allah.')}
                    </p>
                </div>
            </div>
        </div>
    )
}
