import { useContext } from 'react'
import Grid from '@mui/material/Grid'
import Container from '../core/container'
import ChapterCard from './chapter-card'
import styles from './chapter-list.module.scss'
import { SettingsContext } from '../../contexts/SettingsContext'

export default function ChapterList({ chapters }) {
  const { translation } = useContext(SettingsContext)

    return (
        <div className={styles.wrap}>
            <Container>
                <Grid container spacing={2}>
                    {chapters &&
                        chapters.map((chapter) => (
                          <Grid key={chapter.chapterNo} item xs={12} sm={6} md={6} lg={4}>
                            <ChapterCard chapter={chapter} translation={translation} />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </div>
    )
}