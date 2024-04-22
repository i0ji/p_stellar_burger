import styles from "./BurgerConstructorStyles.module.scss";
import awaitSpinner from "images/common/awaitSpinner.svg";

import {createOrder} from "utils/api.ts";

import {IIngredient} from "declarations/interfaces";

import {addIngredient, reorderIngredients} from "slices/constructorSlice.ts";
import {updateIds, updateOrderNumber} from "slices/orderSlice.ts";

import {Button, ConstructorElement, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import CurrentIngredients from "./CurrentIngredients/CurrentIngredients.tsx";
import {
    Loader,
    OrderAcceptance,
    WarningMessage
} from "components/index.ts";

import {useDispatch, useSelector} from "hooks/reduxHooks.ts";
import useModal from "hooks/useModal.ts";
import {useCallback, useEffect, useState} from "react";
import {useDrop} from "react-dnd";
import {useNavigate} from "react-router-dom";

export default function BurgerConstructor() {


    // --------------- VARS & STATES ---------------

    const dispatch = useDispatch(),
     navigate = useNavigate(),
     {addedIngredients, bun} = useSelector(state => state.constructorSlice),
    // --------------- HIGHLIGHT STATE
     [bunAvail, setBunAvail] = useState(false),
     [ingredientsAvail, setIngredientsAvail] = useState(false),
    // --------------- PRELOADER CONSTANTS
     isLoaded = useSelector(state => state.orderSlice.status),
     hasError = useSelector(state => state.orderSlice.error),
    // --------------- CURRENT IDS
     ingredientIDs = useSelector(state => state.constructorSlice.addedIngredients).map((elem: IIngredient) => elem._id),
    // --------------- MODAL
     {isVisible, openModal, closeModal} = useModal(),
    // --------------- TOTAL AMOUNT
     totalAmount = useSelector(state => state.constructorSlice.totalPrice),
    // --------------- BUNS STATE
     isBun: IIngredient = useSelector(state => state.constructorSlice.bun),
    //--------------- AUTH STATE
     isAuth = useSelector(state => state.authSlice.isAuth);


    // --------------- CURRENT ID ---------------

    if (isBun) {
        ingredientIDs.push(isBun._id)
    }

    useEffect(() => {
        dispatch(updateIds(ingredientIDs));
    }, [dispatch, addedIngredients, ingredientIDs]);


    // --------------- DROP LOGIC ---------------

    function InitialBun({pos}: { readonly pos: "top" | "bottom" | undefined }) {
  return (<ConstructorElement
      extraClass={`${styles.constructor_initial_bun} ${bunAvail ? styles.highlight_problem : ''}`}
      isLocked
      price={0}
      text="Перетащите сюда булочку"
      thumbnail={awaitSpinner}
      type={pos}
  />)
}

    function InitialIngredient() {
        return (
            <ConstructorElement
                extraClass={`${styles.constructor_initial_ingredient} ${ingredientsAvail ? styles.highlight_problem : ''}`}
                isLocked
                price={0}
                text="Перетащите сюда ингредиенты"
                thumbnail={awaitSpinner}
            />
        )
    }


    // --------------- GET ORDER NUMBER LOGIC ---------------

    const handleOrder = async (): Promise<void> => {

        if (!isAuth) {
            navigate('/login')
        }

        await openModal();
        const orderNumber = dispatch(createOrder(ingredientIDs));
        dispatch(updateOrderNumber(orderNumber.payload));
    }


    // --------------- MARKUP  ---------------

    return (
        <section
            className={styles.constructor_block}
        >
            <div
                className={`${styles.constructor_list} mb-10`}
                ref={dropIngredients}
            >


                {/* --------------- TOP BUN --------------- */}

                {!isBun ? <InitialBun pos="top" /> :
                <div
                    className={styles.constructor_order_item}
                >
                    {bun ? <ConstructorElement
                        extraClass={styles.constructor_item_top}
                        isLocked
                        price={bun.price ?? 0}
                        text={`${bun.name} (верх)`}
                        thumbnail={bun.image || ''}
                        type="top"
                           /> : null}
                </div>}


                {/* --------------- INNER INGREDIENTS + ORDER CONDITION --------------- */}

                {!isIngredientInOrder ? <InitialIngredient /> :

                <div
                    className={`${styles.constructor_order} ${ingredientsAvail ? styles.highlight_problem : ''}`}
                    style={{
                            scrollbarWidth: (addedIngredients.length > 3) ? 'inherit' : 'none',
                            width: (addedIngredients.length > 3) ? '100%' : '97%',
                        }}
                >
                    {addedIngredients.map((ingredient: IIngredient, uuid: number) => (
                            renderIngredients(ingredient, uuid)
                        ))}
                </div>}

                {/* --------------- BOTTOM BUN --------------- */}

                {!isBun ? <InitialBun pos="bottom" /> :
                <div className={styles.constructor_order_item}>
                    {bun ? <ConstructorElement
                        extraClass={styles.constructor_item_bottom}
                        isLocked
                        price={bun.price ?? 0}
                        text={`${bun.name} (низ)`}
                        thumbnail={bun.image || ''}
                        type="bottom"
                           /> : null}
                </div>}

                {/* --------------- PRICE --------------- */}

                <div className={`mt-4 ${styles.price_info}`}>
                    <h1 className="text text_type_digits-medium pr-3">
                        {totalAmount}
                    </h1>

                    <CurrencyIcon type="primary" />

                    <div
                        onMouseOut={handleButtonMouseOut}
                        onMouseOver={() => {
                            handleBunHighlight();
                            handleIngredientsHighlight();
                        }}
                    >
                        <Button
                            disabled={!preventOrderState}
                            extraClass="ml-3"
                            htmlType="button"
                            onClick={handleOrder}
                            size="large"
                            type="primary"
                        >
                            {isAuth ? 'Оформить заказ' : 'Войти в Аккаунт'}
                        </Button>
                    </div>
                </div>


                {/* -------------- MODAL + PRELOADER --------------- */}

                {(isLoaded === 'loading') && !hasError && <Loader description="Готовим заказ..." />}

                {isLoaded === 'failed' && <WarningMessage onClose={closeModal} />}

                {(isLoaded === 'succeeded') && isVisible ? <OrderAcceptance onClose={closeModal} /> : null}


            </div>
        </section>
    )
}