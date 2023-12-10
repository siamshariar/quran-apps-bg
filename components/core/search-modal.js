import { useState } from 'react'
import { useRouter } from 'next/router'
import styles from './search-modal.module.scss'

export default function SearchModal({ open, searchModalController }) {
    const router = useRouter()
    const [query, setQuery] = useState('')

    const changeQuery = event => {
        setQuery(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        if (query === '') return

        router.push({
            pathname: '/search',
            query: {
                q: query
            }
        })
    }

    return (
        <div className={open ? `${styles.modal} ${styles.active}` : styles.modal}>
            <span
                className={styles.close}
                onClick={() => searchModalController(false)}
            ></span>

            <form
                className={styles.search}
                onSubmit={e => handleSubmit(e)}
            >
                <input
                    type="text"
                    name="search"
                    value={query}
                    onChange={e => changeQuery(e)}
                    placeholder="Search..."
                />
                <p>Enter your keyword in search box and press enter</p>
            </form>
        </div>
    )
}