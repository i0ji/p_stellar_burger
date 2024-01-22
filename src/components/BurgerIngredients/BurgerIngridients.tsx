import BurgerIngredientsStyles from "./BurgerIngredients.module.scss";
import {Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";
import {IIngredient} from "src/Interfaces";


export default function BurgerIngredients({ingredients_data}: { ingredients_data: IIngredient[] }) {
    return (
        <section className={BurgerIngredientsStyles.ingredients_order}>
            <div
                className={`${BurgerIngredientsStyles.ingredients_order_list} mb-10`}>
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text={`${ingredients_data[0].name} (верх)`}
                    price={ingredients_data[0].price ?? 0}
                    thumbnail={ingredients_data[0].image_mobile}
                />
                <div className={BurgerIngredientsStyles.ingredients_consist}>
                    <ConstructorElement
                        text={`${ingredients_data[12].name}`}
                        price={ingredients_data[12].price ?? 0}
                        thumbnail={ingredients_data[12].image_mobile}
                    />
                    <ConstructorElement
                        text={`${ingredients_data[12].name} (верх)`}
                        price={ingredients_data[12].price ?? 0}
                        thumbnail={ingredients_data[12].image_mobile}
                    />
                    <ConstructorElement
                        text={`${ingredients_data[12].name} (верх)`}
                        price={ingredients_data[12].price ?? 0}
                        thumbnail={ingredients_data[12].image_mobile}
                    />
                    <ConstructorElement
                        text={`${ingredients_data[12].name} (верх)`}
                        price={ingredients_data[12].price ?? 0}
                        thumbnail={ingredients_data[12].image_mobile}
                    />
                    <ConstructorElement
                        text={`${ingredients_data[12].name} (верх)`}
                        price={ingredients_data[12].price ?? 0}
                        thumbnail={ingredients_data[12].image_mobile}
                    />
                    <ConstructorElement
                        text={`${ingredients_data[12].name} (верх)`}
                        price={ingredients_data[12].price ?? 0}
                        thumbnail={ingredients_data[12].image_mobile}
                    />
                    <ConstructorElement
                        text={`${ingredients_data[12].name} (верх)`}
                        price={ingredients_data[12].price ?? 0}
                        thumbnail={ingredients_data[12].image_mobile}
                    />
                    <ConstructorElement
                        text={`${ingredients_data[6].name} (верх)`}
                        price={ingredients_data[6].price ?? 0}
                        thumbnail={ingredients_data[6].image_mobile}
                    />
                    <ConstructorElement
                        text={`${ingredients_data[6].name} (верх)`}
                        price={ingredients_data[6].price ?? 0}
                        thumbnail={ingredients_data[6].image_mobile}
                    />
                    <ConstructorElement
                        text={`${ingredients_data[6].name} (верх)`}
                        price={ingredients_data[6].price ?? 0}
                        thumbnail={ingredients_data[6].image_mobile}
                    />
                </div>
                <ConstructorElement
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