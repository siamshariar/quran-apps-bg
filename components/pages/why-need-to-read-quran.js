import css from './style.module.scss'
import styles from './about.module.scss'

export default function WNTRQContent({ page_title }) {
    return (
        <div className={css.wrapper}>
            <div className={css.page_title}>{page_title}</div>

            <div className={css.page_item}>
                <div className={styles.quran_content}>
                    <h2>Why should read the Quran?</h2>
                    <p>
                        The first revelation of the Holy Qur’an that was revealed to Prophet Muhammad (PBUH) was ‘Read’ ‘اقرا’ from (Al Quran - 96 : 01) which shows the importance of acquiring knowledge by reading.
                    </p>

                    <p>
                        Allah said, “The month of Ramadan [is that] in which was revealed the Qur'an, a guidance for the people and clear proofs of guidance and criterion” [Al Quran - 02 : 185]
                    </p>

                    <p>
                        The Quran describes itself as a book of guidance for mankind. [Al Quran - 02 : 185]
                    </p>

                    <p>
                        It is a source of Guidance. Quran reading will help you to find direction or guidance in life. Allah Almighty has promised mankind that the effect of reading and understanding the Quran is to: “take mankind from the depths of darkness to light [Al Quran - 14 : 01] and “guides them to the ways of peace.” [Al Quran - 05 : 16]
                    </p>

                    <p>
                        It is an Intercessor for the Day of Judgment. “Recite the Quran for it will come as an intercessor for its people on the Day of Judgement” [Sahih Muslim]
                    </p>

                    <p>
                        It Teaches about the Purpose of Existence. In the Holy Quran, In the Holy Quran, Allah Almighty says: “He created death and life to test you as to which of you is best in deed.” [Al Quran - 67 : 2]
                    </p>

                    <p>
                        It Fills our Heart and Removes illness from the Heart. Allah (SWT) says in the Holy Quran: “We send the Quran as healing and mercy for those who believe.” [Al Quran - 17 : 82]
                    </p>

                    <p>
                        Reciting and reflecting over the Quran has tremendous benefits as The Holy Quran is the book of guidance for all mankind till the Day of Judgment. Muslims needs to practice the teachings of the Holy Quran in their lives. The Quran is not a book like any other, it is a timeless guide for life, death and the hereafter life.
                    </p>
                </div>

                <div>
                    <div className={styles.video_block}>
                        <div className={styles.video}>
                            <iframe src={`https://www.youtube.com/embed/uZaHPz7OVbQ?autoplay=0&mute=0`}></iframe>
                        </div>
                        <h2>Miracles of Quran By Dr Zakir Naik</h2>
                    </div>

                    <div className={styles.video_block}>
                        <div className={styles.video}>
                            <iframe src={`https://www.youtube.com/embed/ocCdBbfSk8Q?autoplay=0&mute=0`}></iframe>
                        </div>
                        <h2>Quran : The Path Of Happiness - Dr Zakir Naik</h2>
                    </div>

                    <div className={styles.video_block}>
                        <div className={styles.video}>
                            <iframe src={`https://www.youtube.com/embed/rUf9i79u7vI?autoplay=0&mute=0`}></iframe>
                        </div>
                        <h2>Dr Zakir Naik Scientifically & Logically Proves to an Atheist the Existence of Hell & Heaven</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}
