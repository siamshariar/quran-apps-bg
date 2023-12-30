import css from './style.module.scss'
import styles from './about.module.scss'
import {config} from "../../lib/config";

export default function IQGWContent({ page_title }) {
    return (
        <div className={css.wrapper}>
            <div className={css.page_title}>{page_title}</div>

            <div className={css.page_item}>
                <div className={styles.quran_content}>
                    <h2>{config.content.is_quran_god_word.title}</h2>
                    <p>
                        The Noble Quran is the eternal miracle of Prophet Muhammad (PUBH), because all the miracles of the prophets (PUBH) ended with their death, except our Prophet (PUBH), whose miracle is still preserved. This everlasting miracle is the Book of Allah and His revealed speech that
                        “It cannot be proven false from any angle. ˹It is˺ a revelation from the ˹One Who is˺ All-Wise, Praiseworthy.” [Al Quran - 41 : 42]
                    </p>

                    <p>
                        Basically, prophet Muhammad just revealed the verse towards which were sent down to him. Here are some reference,
                    </p>

                    <p>
                        Prophet Muhammad (PBUH) was known to be illiterate, he could neither read any previous scriptures nor write the Quran. Allah said,
                        “You (O Prophet,) have never been reciting any book before this, nor have you been writing it with your right hand; had it been so, the adherents of falsehood would have raised doubts.” [Al Quran - 12 : 111]
                    </p>

                    <p>
                        Some of the verses in which addressed the Prophet (PBUH) mention some of the things that Allah warned against him, and some of verses admonish him:
                        “And never say about anything, “I will do this tomorrow,” unless (you say - ‘if) Allah wills.’ And remember your Lord if you forget, and say (to those who asked you about the story of the People of the Cave), “May be, my Lord will lead me to something closer than this to guidance.” [Al Quran - 18 : 23-24]
                    </p>

                    <p>
                        If Quran was authored by human beings, regardless of their knowledge and understanding, it should have contradictions, errors, and deficiencies.
                    </p>

                    <p>
                        Allah said, "Do they not then reflect on the Quran? Had it been from anyone other than Allah, they would have certainly found in it many inconsistencies." [Al Quran - 04 : 82]
                    </p>

                    <p>
                        Basically in Quran Allah showed us the amazing creatures of him. If Muhammad would wrote Quran by himself then he must glorify himself by telling his story, his family, etc. But instead of that he just narrated what actually Allah told him to do so. And Allah also warned him not to tell anything by his own rather than what Allah actually told.
                    </p>
                </div>

                <div>
                    <div className={styles.video_block}>
                        <div className={styles.video}>
                            <iframe src={`https://www.youtube.com/embed/5FbwsNMj_qs?autoplay=0&mute=0`}></iframe>
                        </div>
                        <h2>100 Proof Quran Is The Word Of God - Dr Zakir Naik</h2>
                    </div>

                    <div className={styles.video_block}>
                        <div className={styles.video}>
                            <iframe src={`https://www.youtube.com/embed/9RuQMD4yYWg?autoplay=0&mute=0`}></iframe>
                        </div>
                        <h2>Is the Qur'an God's Word? by Dr Zakir Naik | Full Lecture</h2>
                    </div>

                    <div className={styles.video_block}>
                        <div className={styles.video}>
                            <iframe src={`https://www.youtube.com/embed/1VJMT77QqB0?autoplay=0&mute=0`}></iframe>
                        </div>
                        <h2>HOW TO PROVE TO AN ATHEIST THAT THE QUR'AN IS GOD'S WORD? PART - 1 | DR ZAKIR NAIK</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}
