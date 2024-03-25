import styles from "./Thumbnail.module.scss"
import {IIngredient} from "declarations/interfaces";

export default function Thumbnail({elem}:{elem:IIngredient}) {
    return (
        <div
            className={styles.gradient_wrapper}>
            <div className={styles.gradient_wrapper_background}>
                <img src={elem.image} alt=""/>
            </div>
        </div>
    );
}

