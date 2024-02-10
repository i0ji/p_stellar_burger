import burgerConstructorStyles from "./BurgerConstructorStyles.module.scss";
import {ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDispatch, useSelector} from "react-redux";
import {useDrop} from "react-dnd";
import {addIngredient, setIngredients, removeIngredient} from "slices/constructorSlice.ts";
import {CurrencyIcon, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import useModal from "hooks/useModal.ts";
import {createOrder} from "utils/order-api.ts";
import Modal from "modal/Modal.tsx";
import OrderDetails from "modal/OrderDetails/OrderDetails.tsx";

export default function BurgerConstructor() {

    const { addedIngredients } = useSelector((state) => state.constructorSlice);
    const { ingredients: ingredientsData } = useSelector((state) => state.ingredients);

    const {isVisible, orderNumber, openModal, closeModal} = useModal(() => createOrder(ingredientsData));

    const dispatch = useDispatch();

    // ---------------DND LOGIC ---------------

    const [, drop] = useDrop({
        accept: 'ingredient',
        drop: (item) => {
            dispatch(addIngredient(item));
        },
    });

    return (
        <section
            className={burgerConstructorStyles.constructor_block}
            ref={drop}
        >

            <div className={`${burgerConstructorStyles.constructor_list} mb-10`}>

                {/* --------------- TOP BUN --------------- */}
                <div className={burgerConstructorStyles.constructor_order_item}>
                    <ConstructorElement
                        extraClass={`${burgerConstructorStyles.constructor_item_top}`}
                        type="top"
                        isLocked={true}
                        text={`${ingredientsData[0].name} (верх)`}
                        price={ingredientsData[0].price ?? 0}
                        thumbnail={ingredientsData[0].image_mobile}
                    />
                </div>




                {/* --------------- INNER INGREDIENTS --------------- */}
                <div className={burgerConstructorStyles.constructor_order}>
                    {addedIngredients.map((ingredient, index) => (
                        <div key={index} className={burgerConstructorStyles.constructor_order_item}>
                            <ConstructorElement
                                type={ingredient.type}
                                text={ingredient.name}
                                price={ingredient.price ?? 0}
                                thumbnail={ingredient.image_mobile}
                            />
                        </div>
                    ))}
                </div>






                {/* --------------- BOTTOM BUN --------------- */}
                <div className={burgerConstructorStyles.constructor_order_item}>
                    <ConstructorElement
                        extraClass={`${burgerConstructorStyles.constructor_item_bottom}`}
                        type="bottom"
                        isLocked={true}
                        text={`${ingredientsData[0].name} (низ)`}
                        price={ingredientsData[0].price ?? 0}
                        thumbnail={ingredientsData[0].image_mobile}
                    />
                </div>

            </div>

            {/* --------------- PRICE --------------- */}
            <div className={burgerConstructorStyles.price_info}>
                <h1 className="text text_type_main-large pr-3">5555</h1>
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

        </section>
    );
}