import styles from './switcher.module.scss'

export default function Switcher(props) {
    const { control, checked, label, name } = props
    const switcher = checked ? `${styles.switcher} ${styles.checked}` : styles.switcher
    return (
        <div
            className={styles.root}
            onClick={name ? () => control(name, !checked) : () => control(!checked)}
        >
            <div className={switcher}></div>
            {label && <div className={styles.label}>{ label }</div>}
        </div>
    )
}