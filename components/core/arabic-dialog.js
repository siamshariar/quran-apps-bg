import { useState, useEffect, useContext } from 'react'
import { SettingsContext } from '../../contexts/SettingsContext'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { t } from '../../lib/config';
import styles from './arabic-dialog.module.scss'

export default function ArabicDialog() {
    const { view, changeView } = useContext(SettingsContext)

    const [open, setOpen] = useState(false)

    useEffect(() => {
        const arabicDialog = localStorage.getItem('arabicDialog')
        if (arabicDialog === null) {
            setOpen(true)
            localStorage.setItem('arabicDialog', 'opened')
        }
    }, [])

    const handleClickYes = () => {
        const newView = { ...view, ['arabic']: true }
        changeView(newView)
        setOpen(false)
    }

    const handleClickNo = () => {
        const newView = { ...view, ['arabic']: false }
        changeView(newView)
        setOpen(false)
    }

    return (
        <Dialog
            open={open}
            onClose={handleClickYes}
            //aria-labelledby="alert-dialog-title"
            //aria-describedby="alert-dialog-description"
            classes={{
                paper: styles.paper
            }}
        >
            <DialogTitle
                //id="alert-dialog-title"
                classes={{
                    root: styles.title
                }}
            >
                {t('Do you want to display Arabic?')}
            </DialogTitle>

            <DialogContent>
                <DialogContentText
                    //id="alert-dialog-description"
                    classes={{
                        root: styles.desc
                    }}
                >
                    {t("You can change the display in the Settings → View section.")}
                </DialogContentText>
            </DialogContent>

            <DialogActions>
                <Button
                    onClick={handleClickNo}
                    className={styles.btn}
                >
                    {t('No')}
                </Button>
                <Button
                    onClick={handleClickYes}
                    className={styles.btn}
                >
                    {t('Yes')}
                </Button>
            </DialogActions>
        </Dialog>
    )
}
