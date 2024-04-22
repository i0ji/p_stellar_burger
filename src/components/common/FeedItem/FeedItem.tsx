import styles from "./FeedItem.module.scss"

import {useSelector} from "hooks/reduxHooks.ts";

import {TOrder} from "declarations/types";

import {Loader, Thumbnail} from "components/index.ts";
import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import {getIngredientsWithQuantity, orderPriceCalculation} from "utils/orderPriceCalculation.ts";

export default function FeedItem({currentOrder}: { readonly currentOrder: TOrder | undefined }) {

    const ingredientsData = useSelector(state => state.ingredients.ingredients);

    if (!currentOrder) {
        return (
            <Loader description="Please stand by..." />
        )
    }


    // --------------- VARS & STATES ---------------

    const orderIngredientIDs = currentOrder.ingredients;

    if (!orderIngredientIDs) {
        return (
            <Loader description="Please stand by..." />
        )
    }

    // --------------- INGREDIENTS FULL DATA
    const orderIngredients = ingredientsData.filter(elem => orderIngredientIDs.includes(elem._id as string)),

    // --------------- COUNTER
     orderCount = (orderIngredients.length > 5) ? (orderIngredients.length - 5) : 1,

     ingredientCounts: { [key: string]: number } = {};

    // --------------- CALCULATING PRICE ---------------

    orderIngredientIDs?.forEach(order => {
        ingredientCounts[order] = (ingredientCounts[order] || 0) + 1;
    });


    function OrderDate() {
        const dateFromServer = currentOrder.createdAt;
        return dateFromServer && <FormattedDate date={new Date(dateFromServer)} />
    }


    return (
        <div
            className={styles.feed_item}
        >
            {currentOrder ? <>
                <div className={styles.feed_item_info}>
                    <p>
                        {currentOrder.number}
                    </p>

                    <p className={styles.order_date}>
                        <OrderDate />
                    </p>
                </div>

                <div className={`${styles.feed_item_name} pt-6`}>
                    <h4>
                        {currentOrder.name}
                    </h4>
                </div>

                <div className={`${styles.feed_item_ingredients} pt-6 pb-6`}>

                    <div className={styles.ingredients_thumbnail}>
                        {
                                orderIngredients.slice(0, 5).map(
                                    (elem, i: number) =>
                                        (<div
                                            key={i}
                                            style={{zIndex: 100 - i}}
                                        >
                                            <Thumbnail
                                                count={orderCount}
                                                image={elem.image}
                                                isLast={i === 4}
                                            />
                                        </div>)
                                )
                            }
                    </div>

                    <div className={styles.feed_item_price}>
                        <p className="text text_type_digits-default">
                            {totalOrderPrice}
                        </p>

                        <CurrencyIcon type="primary" />
                    </div>
                </div>
                            </> : null}
        </div>
    )
}