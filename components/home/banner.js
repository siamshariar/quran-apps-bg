import Link from 'next/link'
import Image from 'next/image'
import Container from '../core/container'
import styles from './banner.module.scss'

export default function Banner() {
    return (
        <>
            <div className={styles.banner}>
                <Container>
                    <div className={styles.calligraphy}>
                        <Image
                            src="/img/quran.webp"
                            alt=""
                            width={300}
                            height={170}
                        />
                    </div>

                    <div className={styles.title}>
                        <h1>Quran.vn</h1>
                    </div>
                </Container>
            </div>

            <div className={styles.banner_mobile}>
                <Container>
                    <Link href="/about-quran">
                        <a className={styles.banner_link}>Know more about Quran</a>
                    </Link>
                </Container>
            </div>
        </>
    )
}