import styles from "./Thumbnail.module.scss"

export default function Thumbnail(elemID: string) {



    return (
        <div
            className={styles.gradient_wrapper}>
            <div className={styles.gradient_wrapper_background}>
                {/*<img src={image} alt=""/>*/}
                <p>{elemID}</p>
            </div>
        </div>
    );
}

