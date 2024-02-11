import CurrentIngredientsStyles from "./CurrentIngredientsStyles.module.scss"
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {IIngredient} from "interfaces/interfaces";
import {useDispatch} from "react-redux";
import {removeIngredient} from "slices/constructorSlice.ts";

export default function CurrentIngredients(ingredient: IIngredient) {
    const dispatch = useDispatch();
    const handleRemoveIngredient = (id: string) => {
        dispatch(removeIngredient(id));
    }

    return (
        <div
            className={CurrentIngredientsStyles.constructor_order_item}
        >
            <DragIcon type="primary"/>
            <ConstructorElement
                text={ingredient.name}
                price={ingredient.price || 0}
                thumbnail={ingredient.image || ''}
                handleClose={() => handleRemoveIngredient(ingredient.id)}
            />
        </div>
    );
}