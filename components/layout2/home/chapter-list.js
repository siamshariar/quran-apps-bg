import Grid from '@material-ui/core/Grid'
import Container from '../../core/container'
import ChapterCard from './chapter-card'
import styles from './chapter-list.module.scss'

export default function ChapterList({ chapters }) {
    return (
        <div className={styles.wrap}>
            <Container>
                <Grid container spacing={2}>
                    {chapters && chapters.map(chapter =>
                        <Grid key={chapter.chapterNo} item xs={12} md={6} lg={4}>
                            <ChapterCard chapter={chapter} />
                        </Grid>
                    )}
                </Grid>
            </Container>
        </div>
    )
}