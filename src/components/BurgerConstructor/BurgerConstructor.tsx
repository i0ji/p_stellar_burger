import burgerConstructorStyles from "./BurgerConstructorStyles.module.scss";
import {ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDispatch, useSelector} from "react-redux";
import {useDrop} from "react-dnd";
import {addIngredient,reorderIngredients} from "slices/constructorSlice.ts";
import {CurrencyIcon, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import useModal from "hooks/useModal.ts";
import {createOrder} from "utils/order-api.ts";
import Modal from "modal/Modal.tsx";
import OrderDetails from "modal/OrderDetails/OrderDetails.tsx";
import {IIngredient} from "interfaces/interfaces";
import CurrentIngredients from "components/BurgerConstructor/CurrentIngredients/CurrentIngredients.tsx";
import {useCallback} from "react";
import update from 'immutability-helper'

export default function BurgerConstructor() {

    const dispatch = useDispatch();

    // --------------- SETTING STATE LOGIC ---------------
    const {addedIngredients, bun} = useSelector((state: {
        constructorSlice: { addedIngredients: IIngredient[]; bun: IIngredient | null };
    }) => state.constructorSlice);
    const {ingredients: ingredientsData} = useSelector((state: {
        ingredients: { ingredients: IIngredient[] };
    }) => state.ingredients);
    const {isVisible, orderNumber, openModal, closeModal} = useModal(() => createOrder(ingredientsData));
    const totalAmount = useSelector((state) => state.constructorSlice.totalAmount);

    // --------------- DROP LOGIC ---------------
    const [, dropIngredients] = useDrop({
        accept: ['bun', 'ingredient'],
        drop: (item: IIngredient) => {
            dispatch(addIngredient(item));
        }
    });

    // --------------- NEW DROP LOGIC ---------------

    const moveIngredient = useCallback((dragIndex: number, hoverIndex: number) => {
        dispatch(reorderIngredients({ dragIndex, hoverIndex }));
    }, [dispatch]);

    const renderIngredients =
        (ingredient: IIngredient, index: number) => {
            return (
                <CurrentIngredients
                    key={ingredient.id}
                    ingredient={ingredient}
                    index={index}
                    moveIngredient={moveIngredient}
                />
            )
        }


    return (
        <section
            className={burgerConstructorStyles.constructor_block}
        >
            <div
                className={`${burgerConstructorStyles.constructor_list} mb-10`}
                ref={dropIngredients}
            >


                {/* --------------- TOP BUN --------------- */}
                <div className={burgerConstructorStyles.constructor_order_item}>
                    {bun && (
                        <ConstructorElement
                            extraClass={`${burgerConstructorStyles.constructor_item_top}`}
                            type="top"
                            isLocked={true}
                            text={`${bun.name} (верх)`}
                            price={bun.price ?? 0}
                            thumbnail={bun.image}
                        />
                    )}
                </div>


                {/* --------------- INNER INGREDIENTS --------------- */}
                <div
                    className={burgerConstructorStyles.constructor_order}
                    style={{
                        scrollbarWidth: (addedIngredients.length > 3) ? 'inherit' : 'none',
                        width: (addedIngredients.length > 3) ? '100%' : '97%',
                    }}
                >
                    {addedIngredients.map((ingredient, index) => (
                        renderIngredients(ingredient, index)
                    ))}
                </div>


                {/* --------------- BOTTOM BUN --------------- */}
                <div className={burgerConstructorStyles.constructor_order_item}>
                    {bun && (
                        <ConstructorElement
                            extraClass={`${burgerConstructorStyles.constructor_item_bottom}`}
                            type="bottom"
                            isLocked={true}
                            text={`${bun.name} (низ)`}
                            price={bun.price ?? 0}
                            thumbnail={bun.image}
                        />
                    )}
                </div>


                {/* --------------- PRICE --------------- */}
                <div className={burgerConstructorStyles.price_info}>
                    <h1 className="text text_type_main-large pr-3">{totalAmount}</h1>
                    <CurrencyIcon type="primary"/>
                    <Button
                        extraClass="ml-3"
                        size="large"
                        type="primary"
                        htmlType="button"
                        onClick={openModal}
                    >Оформить заказ</Button>
                </div>

                {/* --------------- MODAL ENTER --------------- */}
                {isVisible &&
                    <>
                        <Modal onClose={closeModal}>
                            <OrderDetails orderNumber={orderNumber}/>
                        </Modal>
                    </>
                }
            </div>
        </section>
    )
}