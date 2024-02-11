import CurrentIngredientsStyles from "./CurrentIngredientsStyles.module.scss"
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {IIngredient} from "interfaces/interfaces";
import {useDispatch} from "react-redux";
import {removeIngredient} from "slices/constructorSlice.ts";
import {useRef} from "react";
import {useDrag, useDrop} from "react-dnd";

export default function CurrentIngredients(ingredient: IIngredient) {


    const dispatch = useDispatch();
    const handleRemoveIngredient = (id: string) => {
        console.log(id)
        dispatch(removeIngredient(id));
    }

    const ref = useRef(null);

    const [{isDragging}, drag] = useDrag({
        type: 'ingredient',
        item: () => {
            return {type: 'ingredient', index};
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

            // ваша логика перетаскивания, если необходимо
        },
    });

    const opacity = isDragging ? 0 : 1

    return (
        <div
            className={CurrentIngredientsStyles.constructor_order_item}
            ref={ref}
            style={{opacity}}

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