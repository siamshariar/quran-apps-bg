import css from './style.module.scss'

export default function SampleContent() {
    return (
        <div className={css.wrapper}>
            <div className={css.page_title}>Content page title</div>

            <div className={css.page_item}>
                <h2>Who we are?</h2>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eaque, libero vel sed quisquam deleniti non itaque? Ea commodi quibusdam quasi amet neque, quam accusamus, soluta voluptate, similique ab excepturi ullam? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eaque, libero vel sed quisquam deleniti non itaque? Ea commodi quibusdam quasi amet neque, quam accusamus, soluta voluptate, similique ab excepturi ullam?</p>
            </div>

            <div className={css.page_item}>
                <h2>Meccan Surahs</h2>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eaque, libero vel sed quisquam deleniti non itaque? Ea commodi quibusdam quasi amet neque, quam accusamus, soluta voluptate, similique ab excepturi ullam? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eaque, libero vel sed quisquam deleniti non itaque? Ea commodi quibusdam quasi amet neque, quam accusamus, soluta voluptate, similique ab excepturi ullam?</p>
            </div>

            <div className={css.page_item}>
                <h2>Medinan Surahs</h2>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eaque, libero vel sed quisquam deleniti non itaque? Ea commodi quibusdam quasi amet neque, quam accusamus, soluta voluptate, similique ab excepturi ullam? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eaque, libero vel sed quisquam deleniti non itaque? Ea commodi quibusdam quasi amet neque, quam accusamus, soluta voluptate, similique ab excepturi ullam?</p>
            </div>

            <div className={css.page_item}>
                <h2>Credits</h2>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eaque, libero vel sed quisquam deleniti non itaque? Ea commodi quibusdam quasi amet neque, quam accusamus, soluta voluptate, similique ab excepturi ullam? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eaque, libero vel sed quisquam deleniti non itaque? Ea commodi quibusdam quasi amet neque, quam accusamus, soluta voluptate, similique ab excepturi ullam?</p>
            </div>

        </div>
    )
}
