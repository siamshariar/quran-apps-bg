import styles from './error.module.scss'

export default function Error() {
    return (
        <div className={styles.error}>
            <h1>Failed to load</h1>
        </div>
    )
}