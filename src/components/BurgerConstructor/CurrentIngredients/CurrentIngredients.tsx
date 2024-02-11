import CurrentIngredientsStyles from "./CurrentIngredientsStyles.module.scss"
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {IIngredient} from "interfaces/interfaces";
import {useDispatch} from "react-redux";
import {removeIngredient} from "slices/constructorSlice.ts";
import {useRef} from "react";
import {DropTargetMonitor, useDrag, useDrop} from "react-dnd";
import {XYCoord} from "react-dnd";


export interface CardProps {
    id: any;
    text: string;
    index: number;
    moveCard: (dragIndex: number, hoverIndex: number) => void;
}

interface DragItem {
    index: number;
    id: string;
    type: string;
}


export default function CurrentIngredients(ingredient: IIngredient) {

    const ref = useRef()

    const dispatch = useDispatch();
    const handleRemoveIngredient = (id: string) => {
        console.log(id)
        dispatch(removeIngredient(id));
    }

    const [{handlerId}, drop] = useDrop({
        accept: 'ingredients',
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            };
        },
        hover: function (item: DragItem, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;
            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return;
            }
            // Determine rectangle on screen
            const hoverBoundingRect = ref.current?.getBoundingClientRect();

            // Get vertical middle
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

            // Determine mouse position
            const clientOffset = monitor.getClientOffset();

            // Get pixels to the top
            const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

            // Only perform the move when the mouse has crossed half of the items height
            // When dragging downwards, only move when the cursor is below 50%
            // When dragging upwards, only move when the cursor is above 50%

            // Dragging downwards
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }

            // Dragging upwards
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }

            // Time to actually perform the action
            moveIngredient(dragIndex, hoverIndex);

            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            item.index = hoverIndex;
        },
    });

    const [{isDragging}, drag] = useDrag({
        type: 'ingredients',
        item: () => {
            return {id, index};
        },
        collect: (monitor: any) => ({
            isDragging: monitor.isDragging(),
        }),
    });


    const opacity = isDragging ? 0 : 1
    drag(drop(ref));
    return (
        <div
            className={CurrentIngredientsStyles.constructor_order_item}
            ref={ref} style={{opacity}} data-handler-id={handlerId}
        >
            <DragIcon type="primary"/>
            <ConstructorElement
                text={ingredient.name}
                price={ingredient.price || 0}
                thumbnail={ingredient.image || ''}
                handleClose={() => handleRemoveIngredient(ingredient.id || '')}
            />
        </div>
    );
}