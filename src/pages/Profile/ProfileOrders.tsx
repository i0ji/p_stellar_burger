import styles from "./ProfilePage.module.scss";

import FeedItem from "common/FeedItem/FeedItem.tsx";

import {IConstructorSlice} from "declarations/sliceInterfaces";
import {RootState} from "declarations/rootState.ts";

import {useSelector} from "hooks/reduxHooks.ts";

export default function ProfileOrders() {

    const constructorData: IConstructorSlice = useSelector((state: RootState) => state.constructorSlice);

    return (
        <div className={styles.profile_orders}>
            <FeedItem data={constructorData}/>
        </div>
    )
}