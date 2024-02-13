import burgerConstructorStyles from "./BurgerConstructorStyles.module.scss";
import {ConstructorElement, CurrencyIcon, Button} from "@ya.praktikum/react-developer-burger-ui-components";

import {useDispatch, useSelector} from "react-redux";
import {useCallback, useEffect} from "react";
import {useDrop} from "react-dnd";
import useModal from "hooks/useModal.ts";

import {addIngredient, reorderIngredients} from "slices/constructorSlice.ts"
import {updateIds} from "slices/orderSlice.ts"

import CurrentIngredients from "components/BurgerConstructor/CurrentIngredients/CurrentIngredients.tsx";
import Modal from "modal/Modal.tsx";
import OrderDetails from "modal/OrderDetails/OrderDetails.tsx";

import {IIngredient} from "interfaces/interfaces";


export default function BurgerConstructor() {

    const dispatch = useDispatch();


    // --------------- SETTING STATE LOGIC ---------------

    const {addedIngredients, bun} = useSelector((state: {
        constructorSlice: { addedIngredients: IIngredient[]; bun: IIngredient | null };
    }) => state.constructorSlice);


    // --------------- CURRENT IDS ---------------

    const ingredientIDs = useSelector(state => state.constructorSlice.addedIngredients).map((elem: IIngredient) => elem._id);
    const bunIDs = useSelector(state => state.constructorSlice.bun);

    if (bunIDs) {
        ingredientIDs.push(bunIDs._id)
    }
    useEffect(() => {
        dispatch(updateIds(ingredientIDs));
    }, [dispatch, addedIngredients, ingredientIDs]);

    const {isVisible, openModal, closeModal} = useModal(ingredientIDs);

    const totalAmount = useSelector((state) => state.constructorSlice.totalAmount);


    // --------------- DROP LOGIC ---------------

    const [, dropIngredients] = useDrop({
        accept: ['bun', 'ingredient'],
        drop: (item: IIngredient) => {
            dispatch(addIngredient(item));
        }
    });

    const moveIngredient = useCallback((dragIndex: number, hoverIndex: number) => {
        dispatch(reorderIngredients({dragIndex, hoverIndex}));
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
                        disabled={!bun}
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
                            <OrderDetails/>
                        </Modal>
                    </>
                }
            </div>
        </section>
    )
}