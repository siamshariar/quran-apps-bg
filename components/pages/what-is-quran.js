import css from './style.module.scss'
import styles from './about.module.scss'

export default function WIQContent({ page_title }) {
    return (
        <div className={css.wrapper}>
            <div className={css.page_title}>{page_title}</div>

            <div className={css.page_item}>
                <div className={styles.quran_content}>
                    <h2>What is Quran?</h2>
                    <p>
                        The Holy Quran is the Holy Book or the Scripture(holy book) of mankind. The Quran is a complete code of life for the human being. It prescribes us what to do and what not to do.
                    </p>

                    <p>
                        Allah Subhanahu Wa Ta'ala said: “It is a detailed explanation of all things and guidance and mercy for a people who believe.” [Al Quran - 12 : 111]
                    </p>

                    <p>
                        The text of the Holy Quran has remained unchanged over the past 1400 years. Neither a single verse nor a single verse has been changed since the revelation of the Quran as Allah said, “Surely it is We (Allah) who have revealed the exposition, and surely it is We(Allah) who are its guardians” [Al Quran - 15 : 09]
                    </p>

                    <p>
                        It is a compilation of the verbal revelations given to the Prophet Muhammad (PBUH) over a period of 23 years, beginning in the month of Ramadan, when Muhammad (PBUH) was 40; and concluding in 63, the year of his death.
                    </p>

                    <p>
                        Surely this Quran guides to what is most upright, and gives good news to the believers—who do good—that they will have a mighty reward. And ˹it warns˺ those who do not believe in the Hereafter ˹that˺ We have prepared for them a painful punishment. [Al Quran - 17 : 9-10]
                    </p>
                </div>

                <div>
                    <div className={styles.video_block}>
                        <div className={styles.video}>
                            <iframe src={`https://www.youtube.com/embed/PUEmgsDF6iw?autoplay=0&mute=0`}></iframe>
                        </div>
                        <h2>Scientific Proof for an Atheist on Existence of God - Dr Zakir Naik</h2>
                    </div>

                    <div className={styles.video_block}>
                        <div className={styles.video}>
                            <iframe src={`https://www.youtube.com/embed/B-RLIU5FkbM?autoplay=0&mute=0`}></iframe>
                        </div>
                        <h2>QURAN AND MODERN SCIENCE - LECTURE - DR ZAKIR NAIK</h2>
                    </div>

                    <div className={styles.video_block}>
                        <div className={styles.video}>
                            <iframe src={`https://www.youtube.com/embed/AUjy0V_q3O8?autoplay=0&mute=0`}></iframe>
                        </div>
                        <h2>Authenticity of the Quran - Dr Zakir Naik</h2>
                    </div>
                </div>

            </div>
        </div>
    )
}
