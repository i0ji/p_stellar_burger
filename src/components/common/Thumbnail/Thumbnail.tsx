import styles from "./Thumbnail.module.scss"

export default function Thumbnail(
    {image, count, isLast}: { image: string | undefined, count: number | null, isLast: boolean }
) {
    return (
        <div
            className={styles.thumbnail_wrapper}>
            <div className={styles.thumbnail_wrapper_background}>
                {
                    isLast &&
                    <span
                        className={`text text_type_digits-default ${styles.thumbnail_count}`}
                    >
                    +{count}
                </span>
                }
                <img src={image} alt=""/>
            </div>
        </div>
    );
}

