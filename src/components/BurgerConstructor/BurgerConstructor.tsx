import burgerConstructorStyles from "./BurgerConstructorStyles.module.scss";
import {ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDispatch, useSelector} from "react-redux";
import {useDrop} from "react-dnd";
import {addIngredient, removeIngredient, updateBun} from "slices/constructorSlice.ts";
import {CurrencyIcon, Button, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import useModal from "hooks/useModal.ts";
import {createOrder} from "utils/order-api.ts";
import Modal from "modal/Modal.tsx";
import OrderDetails from "modal/OrderDetails/OrderDetails.tsx";
import {IIngredient} from "interfaces/interfaces";

export default function BurgerConstructor() {

    const {addedIngredients} = useSelector((state: {
        constructorSlice: { addedIngredients: IIngredient[] }
    }) => state.constructorSlice);
    const {ingredients: ingredientsData} = useSelector((state: {
        ingredients: { ingredients: IIngredient[] }
    }) => state.ingredients);

    const {isVisible, orderNumber, openModal, closeModal} = useModal(() => createOrder(ingredientsData));

    const dispatch = useDispatch();

    // --------------- DND LOGIC ---------------
    // const [, drop] = useDrop({
    //     accept: 'ingredient',
    //     drop: (item: IIngredient) => {
    //         dispatch(addIngredient(item));
    //     }
    // });

    const handleRemoveIngredient = (id: string) => {
        console.log(id)
        dispatch(removeIngredient(id));
    }


    // --------------- CALCULATING AMOUNT LOGIC ---------------
    const calculateTotalAmount = (): number => {
        return addedIngredients.reduce((total, ingredient) => total + (ingredient.price || 0), 0);
    };


    // --------------- DND LOGIC ---------------
    // const [, dropBuns] = useDrop({
    //     accept: 'bun',  // Принимаем только элементы с типом 'bun'
    //     drop: (item) => {
    //         // Обрабатываем перетаскивание булок здесь
    //         dispatch(addIngredient(item));
    //     },
    // });

    const [, dropInnerIngredients] = useDrop({
        accept: 'ingredient',  // Принимаем только элементы с типом 'ingredient'
        drop: (item) => {
            // Обрабатываем перетаскивание внутренних ингредиентов здесь
            dispatch(addIngredient(item));
        },
    });

    const [, dropBuns] = useDrop({
        accept: 'bun',
        drop: (item) => {
            // Проверяем тип перетаскиваемого элемента
            if (item.type === 'bun') {
                // Определяем, это верхняя или нижняя булка
                const bunType = item.position === 'top' ? 'topBun' : 'bottomBun';

                // Заменяем булку в состоянии
                dispatch(updateBun({bunType, bun: item}));
            }
        },
    });


    return (
        <section
            className={burgerConstructorStyles.constructor_block}
        >

            <div className={`${burgerConstructorStyles.constructor_list} mb-10`}>

                {/* --------------- TOP BUN --------------- */}
                <div className={burgerConstructorStyles.constructor_order_item} ref={dropBuns}>
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
                <div className={burgerConstructorStyles.constructor_order} ref={dropInnerIngredients}>
                    {addedIngredients.map((ingredient: IIngredient, index) => (
                        <div
                            className={burgerConstructorStyles.constructor_order_item}
                            key={index}
                        >
                            <DragIcon type="primary"/>
                            <ConstructorElement
                                text={ingredient.name}
                                price={ingredient.price || 0}
                                thumbnail={ingredient.image || ''}
                                handleClose={() => handleRemoveIngredient(ingredient.id)}
                            />
                        </div>
                    ))}
                </div>

                {/* --------------- BOTTOM BUN --------------- */}
                <div className={burgerConstructorStyles.constructor_order_item} ref={dropBuns}>
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
                <h1 className="text text_type_main-large pr-3">{calculateTotalAmount()}</h1>
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