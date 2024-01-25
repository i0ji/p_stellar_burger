import BurgerConstructorStyles from "./BurgerConstructorStyles.module.scss";
import {Button, CurrencyIcon, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";
import {IIngredient} from "src/Interfaces";

export default function BurgerConstructor({ingredientsData}: { ingredientsData: IIngredient[] }) {

    return (
        <section className={BurgerConstructorStyles.constructor_block}>
            <div
                className={`${BurgerConstructorStyles.constructor_list} mb-10`}>

                {/*----- TOP BUN -----*/}
                <ConstructorElement
                    extraClass={`${BurgerConstructorStyles.constructor_item_top}`}
                    type="top"
                    isLocked={true}
                    text={`${ingredientsData[0].name} (верх)`}
                    price={ingredientsData[0].price ?? 0}
                    thumbnail={ingredientsData[0].image_mobile}
                />


                {/*/!* ----- SCROLLED INNER INGREDIENTS -----*!/*/}
                {/*<div className={BurgerConstructorStyles.constructor_order}>*/}
                {/*    <div className={BurgerConstructorStyles.constructor_order_item}>*/}
                {/*        <DragIcon type="primary"/>*/}
                {/*        <ConstructorElement*/}
                {/*            text={ingredientsData[7].name}*/}
                {/*            price={ingredientsData[7].price ?? 0}*/}
                {/*            thumbnail={ingredientsData[7].image_mobile}*/}
                {/*        />*/}
                {/*    </div>*/}
                {/*    <div className={BurgerConstructorStyles.constructor_order_item}>*/}
                {/*        <DragIcon type="primary"/>*/}
                {/*        <ConstructorElement*/}
                {/*            text={ingredientsData[12].name}*/}
                {/*            price={ingredientsData[12].price ?? 0}*/}
                {/*            thumbnail={ingredientsData[12].image_mobile}*/}
                {/*        />*/}
                {/*    </div>*/}
                {/*    <div className={BurgerConstructorStyles.constructor_order_item}>*/}
                {/*        <DragIcon type="primary"/>*/}
                {/*        <ConstructorElement*/}
                {/*            text={ingredientsData[2].name}*/}
                {/*            price={ingredientsData[2].price ?? 0}*/}
                {/*            thumbnail={ingredientsData[2].image_mobile}*/}
                {/*        />*/}
                {/*    </div>*/}
                {/*    <div className={BurgerConstructorStyles.constructor_order_item}>*/}
                {/*        <DragIcon type="primary"/>*/}
                {/*        <ConstructorElement*/}
                {/*            text={ingredientsData[12].name}*/}
                {/*            price={ingredientsData[12].price ?? 0}*/}
                {/*            thumbnail={ingredientsData[12].image_mobile}*/}
                {/*        />*/}
                {/*    </div>*/}
                {/*    <div className={BurgerConstructorStyles.constructor_order_item}>*/}
                {/*        <DragIcon type="primary"/>*/}
                {/*        <ConstructorElement*/}
                {/*            text={`${ingredientsData[6].name} (верх)`}*/}
                {/*            price={ingredientsData[6].price ?? 0}*/}
                {/*            thumbnail={ingredientsData[6].image_mobile}*/}
                {/*        />*/}
                {/*    </div>*/}
                {/*</div>*/}

                {/*----- BOTTOM BUN -----*/}
                <ConstructorElement
                    extraClass={`${BurgerConstructorStyles.constructor_item_bottom}`}
                    type="bottom"
                    isLocked={true}
                    text={`${ingredientsData[0].name} (низ)`}
                    price={ingredientsData[4].price ?? 0}
                    thumbnail={ingredientsData[4].image_mobile}
                />

                {/* ----- PRICE -----*/}
            </div>
            <div className={BurgerConstructorStyles.price_info}>
                <h1 className="text text_type_main-large pr-3">1000</h1>
                <CurrencyIcon type="primary"/>
                <Button
                    extraClass="ml-3"
                    size="large"
                    type="primary"
                    htmlType="button"
                >Оформить заказ</Button>
            </div>
        </section>
    );
}