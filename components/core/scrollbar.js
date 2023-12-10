import styles from './scrollbar.module.scss'

export default function Scrollbar({ children, className }) {
    return (
        <div className={`${styles.scrollbar} ${className}`}>{ children }</div>
    )
}