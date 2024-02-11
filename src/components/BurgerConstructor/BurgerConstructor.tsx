import burgerConstructorStyles from "./BurgerConstructorStyles.module.scss";
import {ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDispatch, useSelector} from "react-redux";
import {useDrop, useDrag} from "react-dnd";
import {addIngredient, reorderIngredients} from "slices/constructorSlice.ts";
import {CurrencyIcon, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import useModal from "hooks/useModal.ts";
import {createOrder} from "utils/order-api.ts";
import Modal from "modal/Modal.tsx";
import OrderDetails from "modal/OrderDetails/OrderDetails.tsx";
import {IIngredient} from "interfaces/interfaces";
import CurrentIngredients from "components/BurgerConstructor/CurrentIngredients/CurrentIngredients.tsx";
import {useCallback, useRef} from "react";
import {XYCoord} from 'dnd-core'

export default function BurgerConstructor() {

    const ref=useRef()

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
        dispatch(reorderIngredients(dragIndex, hoverIndex));
    }, [dispatch]);

    const [{ isDragging }, drag] = useDrag({
        type: 'ingredient',
        item: () => {
            return { type: 'ingredient' };
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const [, drop] = useDrop({
        accept: 'ingredient',
        hover: (item: { index: number; type: string }, monitor: DropTargetMonitor) => {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;

            // Не перемещайте элементы на тот же индекс
            if (dragIndex === hoverIndex) {
                return;
            }

            // Определите прямоугольник на экране
            const hoverBoundingRect = ref.current.getBoundingClientRect();

            // Получите вертикальную середину
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

            // Определите позицию мыши
            const clientOffset = monitor.getClientOffset();

            // Получите пиксели до верхней части
            const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

            // Выполните перемещение только тогда, когда мышь пересекла половину высоты элемента
            // При перетаскивании вниз перемещайте только тогда, когда курсор ниже 50%
            // При перетаскивании вверх перемещайте только тогда, когда курсор выше 50%

            // Перетаскивание вниз
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }

            // Перетаскивание вверх
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }

            // Выполните перемещение
            moveIngredient(dragIndex, hoverIndex);

            // Обновите индекс элемента в мониторе (изменение происходит на стороне клиента)
            item.index = hoverIndex;
        },
    });

    drag(drop(ref));
    const opacity = isDragging ? 0.5 : 1;



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
                    ref={ref}
                >
                    {addedIngredients.map((ingredient, index) => (
                        <CurrentIngredients
                            image={ingredient.image}
                            name={ingredient.name}
                            key={index}
                            price={ingredient.price}
                            id={ingredient.id}
                            reorderCurrentIngredient={reorderIngredients}
                         />
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