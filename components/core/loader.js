import CircularProgress from '@mui/material/CircularProgress'
import styles from './loader.module.scss'

export default function Loader() {
    return (
        <CircularProgress className={styles.loader} />
    )
}