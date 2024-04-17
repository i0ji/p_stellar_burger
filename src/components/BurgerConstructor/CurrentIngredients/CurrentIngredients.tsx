import CurrentIngredientsStyles from "./CurrentIngredientsStyles.module.scss"
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {IIngredient, IDragItem} from "declarations/interfaces";
import {useDispatch} from "hooks/reduxHooks.ts";
import {removeIngredient} from "slices/constructorSlice.ts";
import {useRef} from "react";
import {useDrag, useDrop, DragSourceMonitor, DropTargetMonitor} from "react-dnd";

export default function CurrentIngredients({ingredient, index, moveIngredient}: {
    ingredient: IIngredient,
    index: number,
    moveIngredient: (dragIndex: number, hoverIndex: number) => void
}) {

    const ref = useRef<HTMLDivElement>(null)

    const dispatch = useDispatch();
    const handleRemoveIngredient = (id: string) => {
        dispatch(removeIngredient(id));
    }

    const [{handlerId}, drop] = useDrop({
        accept: 'ingredients',
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            };
        },
        hover: function (item: IDragItem) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;
            if (dragIndex === hoverIndex) {
                return;
            }
            item.index = hoverIndex;

            moveIngredient(dragIndex, hoverIndex);
        },
    } as {
        accept: string,
        collect: (monitor: DropTargetMonitor) => { handlerId: string },
        hover: (item: IDragItem, monitor: DropTargetMonitor) => void
    })

    const [{isDragging}, drag] = useDrag({
        type: 'ingredients',
        item: () => ({
            id: ingredient._id,
            index,
        }),
        collect: (monitor: DragSourceMonitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });


    const opacity = isDragging ? 0 : 1
    drag(drop(ref));


    // --------------- COMPONENT  ---------------

    return (
        <div
            className={CurrentIngredientsStyles.constructor_order_item}
            ref={ref}
            style={{opacity}}
            data-handler-id={handlerId}
        >
            <DragIcon type="primary"/>
            <ConstructorElement
                text={ingredient.name}
                price={ingredient.price || 0}
                thumbnail={ingredient.image || ''}
                handleClose={
                    ingredient._id !== undefined ? () => handleRemoveIngredient(ingredient._id!) : undefined
                }
            />
        </div>
    );
}