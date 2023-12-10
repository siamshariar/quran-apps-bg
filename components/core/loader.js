import CircularProgress from '@material-ui/core/CircularProgress'
import styles from './loader.module.scss'

export default function Loader() {
    return (
        <CircularProgress className={styles.loader} />
    )
}