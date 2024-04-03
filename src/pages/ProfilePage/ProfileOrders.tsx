import styles from "./ProfilePage.module.scss";

import {WS_URL} from "declarations/routs.ts";
import {wsClose, wsConnect} from "services/orderFeed/actions.ts";
import {updateCurrentOrder} from "slices/orderSlice.ts";

import {TOrder} from "declarations/types";

import FeedItem from "common/FeedItem/FeedItem.tsx";
import ProfileMenu from "pages/ProfilePage/ProfileMenu.tsx";
import Loader from "common/Loader/Loader.tsx";

import {Link, useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "hooks/reduxHooks.ts";
import {useEffect} from "react";

export default function ProfileOrders() {


    // --------------- VARS/STATES ---------------

    const dispatch = useDispatch();

    const location = useLocation();

    const modalBackground = (location.key === 'default') ? styles.background : styles.dark;

    const accessToken = localStorage.getItem('accessToken');
    const formattedAccessToken = accessToken ? accessToken.replace("Bearer ", "") : '';

    const WS_URL_WITH_TOKEN = `${WS_URL}?token=${formattedAccessToken}`;

    useEffect(() => {
        dispatch({
            type: wsConnect,
            payload: WS_URL_WITH_TOKEN
        });
        return (() => dispatch(wsClose()));
    }, [WS_URL_WITH_TOKEN, dispatch])

    const ordersList = useSelector(state => state.orderFeed.orders);

    // --------------- STATUS
    const status = useSelector(state => state.orderFeed.status);

    console.log(status);

    const ordersData = ordersList.orders;

    const reversedOrdersData = [...ordersData].reverse();
    // --------------- READY ORDERS

    if (status !== 'ONLINE') {
        return <Loader/>
    }

    const onUpgradeCurrentOrder = (order: TOrder) => {
        dispatch(updateCurrentOrder(order));
    }

    return (
        <section className={styles.profile_section}>
            <ProfileMenu/>
            <div className={`${styles.profile_orders} ${modalBackground}`}>
                {
                    ordersList && reversedOrdersData.map((currentOrder: TOrder, i: number) =>
                        <Link
                            key={i}
                            to={`${currentOrder.number}`}
                            state={{background: location}}
                            onClick={() => onUpgradeCurrentOrder(currentOrder)}
                        >
                            <FeedItem currentOrder={currentOrder}/>
                        </Link>
                    )
                }
            </div>
        </section>
    )
}