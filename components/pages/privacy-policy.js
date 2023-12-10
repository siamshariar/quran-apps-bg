import css from './style.module.scss'
import styles from './about.module.scss'

export default function PrivacyPolicyContent() {
    return (
        <div className={css.wrapper}>
            <div className={css.page_title}>Privacy Policy</div>

            <div className={css.page_item}>
                <div className={styles.quran_content}>
                    <p>
                        You are allowed to use content for non-commercial purpose.
                    </p>
                </div>
            </div>
        </div>
    )
}
