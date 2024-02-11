import CurrentIngredientsStyles from "./CurrentIngredientsStyles.module.scss"
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {IIngredient} from "interfaces/interfaces";
import {useDispatch} from "react-redux";
import {removeIngredient} from "slices/constructorSlice.ts";
import {useRef} from "react";
import {useDrag, useDrop} from "react-dnd";
import {XYCoord} from "react-dnd";


export interface CardProps {
    id: number;
    text: string;
    index: number;
    moveCard: (dragIndex: number, hoverIndex: number) => void;
}

interface DragItem {
    index: number;
    id: string;
    type: string;
}


export default function CurrentIngredients(ingredient: IIngredient, moveIngredient, index) {

    const ref = useRef<HTMLDivElement>(null)

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
            if (dragIndex === hoverIndex) {
                return;
            }
            const hoverBoundingRect = ref.current?.getBoundingClientRect();

            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

            const clientOffset = monitor.getClientOffset();

            const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }

            moveIngredient(dragIndex, hoverIndex);

            item.index = hoverIndex;
        },
    });

    const [{ isDragging }, drag] = useDrag({
        type: 'ingredients',
        item: () => ({
            id: ingredient.id,
            index,
        }),
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