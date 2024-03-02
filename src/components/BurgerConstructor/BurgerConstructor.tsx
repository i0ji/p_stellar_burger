import {addIngredient, reorderIngredients} from "slices/constructorSlice.ts"
import {updateIds} from "slices/orderSlice.ts"

import styles from "./BurgerConstructorStyles.module.scss";
import awaitSpinner from "images/common/awaitSpinner.svg"
import {IIngredient} from "interfaces/interfaces";

import {ConstructorElement, CurrencyIcon, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import CurrentIngredients from "components/BurgerConstructor/CurrentIngredients/CurrentIngredients.tsx";
import Modal from "components/common/Modal/Modal.tsx";
import OrderDetails from "components/common/Modal/OrderDetails/OrderDetails.tsx";
import Loader from "components/common/Loader/Loader.tsx";
import WarningMessage from "components/common/WarningMessage/WarningMessage.tsx";

import {useDispatch, useSelector} from "react-redux";
import {useCallback, useEffect} from "react";
import {useDrop} from "react-dnd";
import useModal from "hooks/useModal.ts";
import {useNavigate} from "react-router-dom";

export default function BurgerConstructor() {

    const dispatch = useDispatch();

    // --------------- STATES/VARS/CONSTANTS  ---------------

    const {addedIngredients, bun} = useSelector((state: {
        constructorSlice: { addedIngredients: IIngredient[]; bun: IIngredient | null };
    }) => state.constructorSlice);
    // --------------- PRELOADER CONSTANTS
    const isLoaded = useSelector(state => state.orderSlice.status);
    const hasError = useSelector(state => state.orderSlice.error);
    // --------------- CURRENT IDS
    const ingredientIDs = useSelector(state => state.constructorSlice.addedIngredients).map((elem: IIngredient) => elem._id);
    const bunIDs = useSelector(state => state.constructorSlice.bun);
    // --------------- MODAL
    const {isVisible, openModal, closeModal} = useModal(ingredientIDs);
    // --------------- TOTAL AMOUNT
    const totalAmount = useSelector(state => state.constructorSlice.totalAmount);
    // --------------- BUNS STATE
    const isBun = useSelector(state => state.constructorSlice.bun);
    //--------------- AUTH STATE
    const isAuth = useSelector(state => state.authSlice.isAuth);

const navigate = useNavigate();

    // --------------- CURRENT ID ---------------

    if (bunIDs) {
        ingredientIDs.push(bunIDs._id)
    }
    useEffect(() => {
        dispatch(updateIds(ingredientIDs));
    }, [dispatch, addedIngredients, ingredientIDs]);


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


// --------------- PREVENT FROM ORDER ---------------

    const handlePreventUnauthOrder = () => {
        if (!isAuth) {
            return navigate('/login')
        } else {
            openModal;
        }
    }

    // --------------- INITIAL BUN ---------------

    const InitialBun = ({pos}: { pos: "top" | "bottom" | undefined }) => {

        return (
            <ConstructorElement
                extraClass={styles.constructor_item_initial_bun}
                text={'Перетащите сюда булочку'}
                type={pos}
                isLocked={true}
                thumbnail={awaitSpinner}
                price={0}
            />
        )
    }


    return (
        <section
            className={styles.constructor_block}
        >
            <div
                className={`${styles.constructor_list} mb-10`}
                ref={dropIngredients}
            >


                {/* --------------- TOP BUN --------------- */}

                {!isBun ? <InitialBun pos={"top"}/> :
                    <div className={styles.constructor_order_item}>
                        {bun && (
                            <ConstructorElement
                                extraClass={`${styles.constructor_item_top}`}
                                type="top"
                                isLocked={true}
                                text={`${bun.name} (верх)`}
                                price={bun.price ?? 0}
                                thumbnail={bun.image}
                            />
                        )}
                    </div>}


                {/* --------------- INNER INGREDIENTS --------------- */}

                <div
                    className={styles.constructor_order}
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

                {!isBun ? <InitialBun pos={'bottom'}/> :
                    <div className={styles.constructor_order_item}>
                        {bun && (
                            <ConstructorElement
                                extraClass={`${styles.constructor_item_bottom}`}
                                type="bottom"
                                isLocked={true}
                                text={`${bun.name} (низ)`}
                                price={bun.price ?? 0}
                                thumbnail={bun.image}
                            />
                        )}
                    </div>}


                {/* --------------- PRICE --------------- */}

                <div className={`mt-4 ${styles.price_info}`}>
                    <h1 className="text text_type_digits-medium pr-3">{totalAmount}</h1>
                    <CurrencyIcon type="primary"/>
                    <Button
                        disabled={!bun}
                        extraClass="ml-3"
                        size="large"
                        type="primary"
                        htmlType="button"
                        onClick={handlePreventUnauthOrder}
                    >Оформить заказ</Button>
                </div>


                {/* -------------- MODAL + PRELOADER --------------- */}

                {(isLoaded === 'loading') && !hasError &&
                    <Loader/>
                }

                {isLoaded === 'failed' && <WarningMessage/>}


                {(isLoaded === 'succeeded') && isVisible &&
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