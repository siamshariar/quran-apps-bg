import Link from 'next/link'
import Container from '../core/container'

import MenuBookIcon from '../icons/MenuBook'
import NearMeIcon from '../icons/NearMe'
import FavoriteIcon from '../icons/Favorite'
import SubtitlesIcon from '../icons/Subtitles'

import styles from './footer.module.scss'

export default function FooterMobile() {
    return (
        <div className={styles.footer}>
            <Container>
                {/* <ul className={styles.menu}>
                    <li>
                        <Link href="/">
                            <a><MenuBookIcon /></a>
                        </Link>
                    </li>
                    <li>
                        <NearMeIcon />
                    </li>
                    <li>
                        <SubtitlesIcon />
                    </li>
                    <li>
                        <FavoriteIcon />
                    </li>
                    <li>
                        <FavoriteIcon />
                    </li>
                </ul> */}
            </Container>
        </div>
    )
}