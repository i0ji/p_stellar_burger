import burgerConstructorStyles from "./BurgerConstructorStyles.module.scss";
import {useEffect} from "react";
import {Button, CurrencyIcon, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";
import {IIngredient} from "interfaces/interfaces";
import OrderDetails from "modal/OrderDetails/OrderDetails.tsx";
import Modal from "modal/Modal.tsx";
import useModal from "hooks/useModal.ts";
import {createOrder} from "utils/order-api.ts";

export default function BurgerConstructor({ingredientsData, bunData}: {
    ingredientsData: IIngredient[],
    bunData: IIngredient[]
}) {

    const {isVisible, orderNumber, openModal, closeModal} = useModal(() => createOrder(randomIDs));

    function getIDs(data: IIngredient[]): (string | undefined)[] {
        if (data) return data.map(item => item._id)
        else return [];
    }

    const randomIDs: string[] = getIDs(ingredientsData).filter(Boolean) as string[];

    // ------ CALCULATING TOTAL AMOUNT ON RENDER ------
    function totalAmount(ingredientsData: IIngredient[], bunData: IIngredient[]): number {
        return (
            ingredientsData
                .map(ingredientItem => ingredientItem.price || 0)
                .reduce((acc, current) => acc + current, 0)
            + bunData
                .map(ingredientItem => ingredientItem.price || 0)
                .reduce((acc, current) => acc + current, 0)
        )
    }

    useEffect(() => {
        totalAmount(ingredientsData, bunData)
    }, [ingredientsData, bunData]);

    return (
        <section className={burgerConstructorStyles.constructor_block}>

            <div
                className={`${burgerConstructorStyles.constructor_list} mb-10`}
            >
                {/* ----- TOP BUN ----- */}
                <div className={burgerConstructorStyles.constructor_order_item}>
                    <ConstructorElement
                        extraClass={`${burgerConstructorStyles.constructor_item_top}`}
                        type="top"
                        isLocked={true}
                        text={`${bunData[0].name} (верх)`}
                        price={bunData[0].price ?? 0}
                        thumbnail={bunData[0].image_mobile}
                    />
                </div>

                {/* ----- SCROLLED INNER INGREDIENTS ----- */}
                <div className={burgerConstructorStyles.constructor_order}>

                    {ingredientsData.map((ingredientItem: IIngredient) => (
                        <div
                            className={burgerConstructorStyles.constructor_order_item}
                            key={ingredientItem._id}
                        >
                            <DragIcon type="primary"/>
                            <ConstructorElement
                                thumbnail={ingredientItem.image || ''}
                                text={ingredientItem.name}
                                price={ingredientItem.price || 0}
                            />
                        </div>
                    ))}

                </div>
                {/*----- BOTTOM BUN ----- */}
                <div className={burgerConstructorStyles.constructor_order_item}>
                    <ConstructorElement
                        extraClass={`${burgerConstructorStyles.constructor_item_bottom}`}
                        type="bottom"
                        isLocked={true}
                        text={`${bunData[0].name} (низ)`}
                        price={bunData[0].price ?? 0}
                        thumbnail={bunData[0].image_mobile}
                    />
                </div>
            </div>

            {/* ----- PRICE ----- */}
            <div className={burgerConstructorStyles.price_info}>
                <h1 className="text text_type_main-large pr-3">{totalAmount(ingredientsData, bunData)}</h1>
                <CurrencyIcon type="primary"/>
                <Button
                    extraClass="ml-3"
                    size="large"
                    type="primary"
                    htmlType="button"
                    onClick={openModal}
                >Оформить заказ</Button>
            </div>

            {/* ----- MODAL ENTER ----- */}

            {isVisible &&
                <>
                    <Modal onClose={closeModal}>
                        <OrderDetails orderNumber={orderNumber}/>
                    </Modal>
                </>
            }

        </section>
    );
}