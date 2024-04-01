import styles from "./ProfilePage.module.scss";
import {useDispatch, useSelector} from "hooks/reduxHooks.ts";
import {useEffect} from "react";
import {wsConnect} from "services/orderFeed/actions.ts";
import {WS_URL} from "declarations/routs.ts";
import {TOrder} from "declarations/types";
import FeedItem from "common/FeedItem/FeedItem.tsx";
import {Link, useLocation} from "react-router-dom";
import Loader from "common/Loader/Loader.tsx";

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

    return (
        <div className={`${styles.profile_orders} ${modalBackground}`}>
            {ordersList &&
                reversedOrdersData.map((order: TOrder, i: number) =>
                    <Link
                        key={i}
                        to={`orders/${order.number}`}
                        state={{background: location}}
                    >
                        <FeedItem currentOrder={order}/>
                    </Link>
                )
            }
        </div>
    )
}