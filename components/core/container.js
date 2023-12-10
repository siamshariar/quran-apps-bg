import styles from './container.module.scss'

export default function Container({ children }) {
    return (
        <div className={styles.page_width}>{ children }</div>
    )
}