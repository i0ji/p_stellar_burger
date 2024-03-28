import styles from "./OrderDetails.module.scss"

import {RootState} from "declarations/rootState.ts";
import {IIngredient} from "declarations/interfaces";

import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import Thumbnail from "common/Thumbnail/Thumbnail.tsx";

import {useSelector} from "hooks/reduxHooks.ts";
import {useParams, useLocation, useNavigate} from "react-router-dom";
import Modal from "common/Modal/Modal.tsx";
import {useCallback} from "react";
import {TOrder} from "declarations/types";

export default function OrderDetails() {


    // --------------- NAVIGATION & BACKGROUND ---------------

    const navigate = useNavigate();
    const {number} = useParams<{ "number"?: string }>();

    const location = useLocation();

    const modalBackground = (location.key === 'default') ? styles.transparent : styles.dark;

    const order = useSelector((state: RootState) => state.orderFeed).orders.orders;
const currentNumber = order.find((elem:TOrder) => elem.number?.toString() == number);
    console.log(order);
    console.log(number);
    console.log(currentNumber);


    // --------------- INGREDIENT STRIPE
    const IngredientInfo = ({elem}: { elem: IIngredient }) => {
         return (
             <>
                 <div className={styles.order_ingredient}>
                     <Thumbnail
                         image={elem.image}
                         count={null}
                         isLast={false}
                     />

                     <p className="text text_type_main-default">
                         {elem.name}
                     </p>

                     <div className={styles.order_ingredient_price}>
                         <p className="text text_type_digits-default">
                             {elem.price}
                         </p>
                         <CurrencyIcon type="primary"/>
                     </div>
                 </div>
             </>
         )
     }

    // --------------- MODAL CLOSING ---------------

    const handleCloseModal = useCallback(() => {
        navigate('/feed');
    }, [navigate]);

    return (
        <Modal onClose={handleCloseModal}>
            <div
                className={`${styles.order_details} ${modalBackground}`}
            >

                <div className={styles.order_details_header}>
                    <h5 className="text text_type_digits-default mb-10 ">{currentNumber.number}</h5>
                    <h3 className="text text_type_main-medium mb-3">{currentNumber.name}</h3>
                    <p className="text text_type_main-default mb-15">Выполнен</p>
                </div>

                <h3 className="text text_type_main-medium mb-3">Состав:</h3>

                <div className="mb-10">
                    <ul>
                        {
                            currentNumber.ingredients.map((elem: IIngredient, i: number) =>
                                <li key={i}>
                                    <IngredientInfo
                                        elem={elem}
                                    />
                                </li>
                            )
                        }
                    </ul>
                </div>

                <div className={styles.order_details_footer}>
                    <p>{currentNumber.updatedAt}</p>
                    <span className="text text_type_digits-default">
                    {currentNumber.totalAmount}
                        <CurrencyIcon type="primary"/>
                </span>
                </div>

            </div>
        </Modal>
    );
}