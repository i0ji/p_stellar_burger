import BurgerIngredientsStyles from "./BurgerIngredientsStyles.module.scss";
import {Button, CurrencyIcon, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";
import {IIngredient} from "src/Interfaces";

export default function BurgerIngredients({ingredients_data}: { ingredients_data: IIngredient[] }) {
    return (
        <section className={BurgerIngredientsStyles.ingredients_order}>
            <div
                className={`${BurgerIngredientsStyles.ingredients_order_list} mb-10`}>
                {/* ----- TOP BUN -----*/}
                <ConstructorElement
                    extraClass={`${BurgerIngredientsStyles.ingredients_item_top}`}
                    type="top"
                    isLocked={true}
                    text={`${ingredients_data[0].name} (верх)`}
                    price={ingredients_data[0].price ?? 0}
                    thumbnail={ingredients_data[0].image_mobile}
                />
                <div className={BurgerIngredientsStyles.ingredients_consist}>
                    <div className={BurgerIngredientsStyles.ingredients_order_item}>
                        <DragIcon type="primary"/>
                        <ConstructorElement
                            text={ingredients_data[7].name}
                            price={ingredients_data[7].price ?? 0}
                            thumbnail={ingredients_data[7].image_mobile}
                        />
                    </div>
                    <div className={BurgerIngredientsStyles.ingredients_order_item}>
                        <DragIcon type="primary"/>
                        <ConstructorElement
                            text={ingredients_data[12].name}
                            price={ingredients_data[12].price ?? 0}
                            thumbnail={ingredients_data[12].image_mobile}
                        />
                    </div>
                    <div className={BurgerIngredientsStyles.ingredients_order_item}>
                        <DragIcon type="primary"/>
                        <ConstructorElement
                            text={ingredients_data[2].name}
                            price={ingredients_data[2].price ?? 0}
                            thumbnail={ingredients_data[2].image_mobile}
                        />
                    </div>
                    <div className={BurgerIngredientsStyles.ingredients_order_item}>
                        <DragIcon type="primary"/>
                        <ConstructorElement
                            text={ingredients_data[12].name}
                            price={ingredients_data[12].price ?? 0}
                            thumbnail={ingredients_data[12].image_mobile}
                        />
                    </div>
                    <div className={BurgerIngredientsStyles.ingredients_order_item}>
                        <DragIcon type="primary"/>
                        <ConstructorElement
                            text={`${ingredients_data[6].name} (верх)`}
                            price={ingredients_data[6].price ?? 0}
                            thumbnail={ingredients_data[6].image_mobile}
                        />
                    </div>
                </div>

                {/* ----- BOTTOM BUN -----*/}
                <ConstructorElement
                    extraClass={`${BurgerIngredientsStyles.ingredients_item_bottom}`}
                    type="bottom"
                    isLocked={true}
                    text={`${ingredients_data[0].name} (низ)`}
                    price={ingredients_data[4].price ?? 0}
                    thumbnail={ingredients_data[4].image_mobile}
                />
            </div>
            <div className={BurgerIngredientsStyles.price_info}>
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