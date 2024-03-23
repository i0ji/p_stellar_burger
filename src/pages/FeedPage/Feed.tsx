import styles from "./Feed.module.scss"
import {useSelector} from "hooks/reduxHooks.ts";
import {RootState} from "declarations/rootState.ts";


export default function Feed() {

    const addedIngredients = useSelector((state: RootState) => state.constructorSlice.addedIngredients);


    const FeedItem = () => {
        return (
            <div className={styles.feed_item}>

            </div>
        )
    }

    return (
        <section className={styles.feed}>
            <div className={styles.feed_list}>
                <FeedItem/>
            </div>
            <div className={styles.feed_details}>
                ddddddddddddddddddddddd
            </div>
        </section>
    );
}