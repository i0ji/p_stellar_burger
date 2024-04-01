import styles from "./ProfilePage.module.scss";
import {useDispatch, useSelector} from "hooks/reduxHooks.ts";
import {useEffect} from "react";
import {wsConnect} from "services/orderFeed/actions.ts";
import {WS_URL} from "declarations/routs.ts";
import {RootState} from "declarations/rootState.ts";
import {TOrder} from "declarations/types";
import FeedItem from "common/FeedItem/FeedItem.tsx";
import {Link, useLocation} from "react-router-dom";

export default function ProfileOrders() {


    // --------------- VARS/STATES ---------------

    const dispatch = useDispatch();

    const location = useLocation();

    const modalBackground = (location.key === 'default') ? styles.background : styles.dark;

    const accessToken = localStorage.getItem('accessToken').replace("Bearer ", "");

    const WS_URL_WITH_TOKEN = `${WS_URL}?token=${accessToken}`;

    useEffect(() => {
        dispatch({
            type: wsConnect,
            payload: WS_URL_WITH_TOKEN
        });
    }, [dispatch])

    const ordersList = useSelector((state: RootState) => state.orderFeed.orders);

    const ordersData = ordersList.orders;

    const reversedOrdersData = [...ordersData].reverse();
    // --------------- READY ORDERS

    return (
        <div className={`${styles.profile_orders} ${modalBackground}`}>
            {ordersList && ordersData.length > 0 &&
                reversedOrdersData.map((order: TOrder, i: number) =>
                    <Link
                        key={i}
                        to={`${order.number}`}
                        state={{background: location}}
                    >
                        <FeedItem currentOrder={order}/>
                    </Link>
                )
            }
        </div>
    )
}