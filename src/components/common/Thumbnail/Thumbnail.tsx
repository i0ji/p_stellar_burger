import styles from "./Thumbnail.module.scss"
import {IThumbnailProps} from "declarations/interfaces";

export default function Thumbnail(props: IThumbnailProps) {
    return (
        <div
            key={props.i}
            className={styles.gradient_wrapper}>
            <div className={styles.gradient_wrapper_background}>
                <img src={props.elem.image} alt=""/>
            </div>
        </div>
    );
}

