import styles from "./ThumbnailStyles.module.scss"

export default function Thumbnail(
    {image, count, isLast}: { image: string | undefined, count: number | null, isLast: boolean }
) {
    const brightness = isLast ? '50' : '100';

    return (
        <div
            className={styles.thumbnail_wrapper}>
            <div
                style={{filter: brightness}}
                className={styles.thumbnail_wrapper_background}
            >
                {
                    isLast &&
                    <span className={`text text_type_digits-default ${styles.thumbnail_count}`}>
                        +{count}
                    </span>
                }
                <img
                    className={isLast ? styles.img : ''}
                    src={image}
                    alt="Ингредиент!"
                />
            </div>
        </div>
    );
}