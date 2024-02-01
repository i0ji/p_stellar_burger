import burgerConstructorStyles from "./BurgerConstructorStyles.module.scss";
import {Button, CurrencyIcon, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";
import {IIngredient} from "src/Interfaces";
import {useState} from "react";
import OrderDetails from "modal/OrderDetails/OrderDetails.tsx";
import Modal from "modal/Modal.tsx";

export default function BurgerConstructor({ingredientsData, fixedData}: {
    ingredientsData: IIngredient[],
    fixedData: IIngredient[]
}) {

    const [isVisible, setIsVisible] = useState(false);

    // ------ MODAL OPENING/CLOSING LOGIC ------
    function handleOpenModal() {
        setIsVisible(true);
    }

    function handleCloseModal() {
        setIsVisible(false);
    }

    return (
        <section className={burgerConstructorStyles.constructor_block}>

            <div
                className={`${burgerConstructorStyles.constructor_list} mb-10`}
            >
                {/* ----- TOP BUN ----- */}
                <div className={burgerConstructorStyles.constructor_order_item}>
                    <DragIcon type="secondary"/>
                    <ConstructorElement
                        extraClass={`${burgerConstructorStyles.constructor_item_top}`}
                        type="top"
                        isLocked={true}
                        text={`${fixedData[0].name} (верх)`}
                        price={fixedData[0].price ?? 0}
                        thumbnail={fixedData[0].image_mobile}
                    />
                </div>


                {/* ----- SCROLLED INNER INGREDIENTS ----- */}
                <div className={burgerConstructorStyles.constructor_order}>


                    {ingredientsData.map((ingredientItem: IIngredient, i) => (
                        <div
                            className={burgerConstructorStyles.constructor_order_item}
                            key={i}
                        >
                            <DragIcon type="primary"/>
                            <ConstructorElement
                                thumbnail={ingredientItem.image || ''}

                                text={ingredientItem.name}
                                price={ingredientItem.price || 0}
                            />
                        </div>
                    ))}

                    {/*----- BOTTOM BUN ----- */}

                </div>

                <div className={burgerConstructorStyles.constructor_order_item}>
                    <DragIcon type="secondary"/>
                    <ConstructorElement
                        extraClass={`${burgerConstructorStyles.constructor_item_bottom}`}
                        type="bottom"
                        isLocked={true}
                        text={`${fixedData[7].name} (низ)`}
                        price={fixedData[7].price ?? 0}
                        thumbnail={fixedData[7].image_mobile}
                    />
                </div>
            </div>

            {/* ----- PRICE ----- */}
            <div className={burgerConstructorStyles.price_info}>
                <h1 className="text text_type_main-large pr-3">1000</h1>
                <CurrencyIcon type="primary"/>
                <Button
                    extraClass="ml-3"
                    size="large"
                    type="primary"
                    htmlType="button"
                    onClick={handleOpenModal}
                >Оформить заказ</Button>
            </div>

            {/* ----- MODAL ENTER ----- */}
            {isVisible &&
                <>
                    <Modal onClose={handleCloseModal}>
                        <OrderDetails/>
                    </Modal>
                </>
            }
        </section>
    );
}