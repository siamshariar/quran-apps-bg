import { useRef, useEffect } from 'react'
import Container from '../core/container'
import styles from './search.module.scss'

export default function HomeSearch() {
    const focusable = useRef(null)
    useEffect(() => {
        focusable.current.focus()
    }, [])

    return (
        <div className={styles.parent}>
            <Container>
                <form action="" className={styles.search}>
                    <input type="text" name="search" placeholder="Search here..." ref={focusable} />
                    <input type="submit" name="submit" value="Submit" />
                </form>
            </Container>
        </div>
    )
}