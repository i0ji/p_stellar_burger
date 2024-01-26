import ingredientGroupStyles from "./IngredientGroupStyles.module.scss";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {IIngredient} from "src/Interfaces";

export default function IngredientGroup({type, ingredients}: { type: string, ingredients: IIngredient[]}) {

   const IngredientCard = (ingredient: IIngredient) => {
        return (
            <div className={ingredientGroupStyles.ingredient_card}>
                <img
                    src={ingredient.image}
                    alt={ingredient.name}
                />
                <p className="text text_type_main-default pt-1">
                    <CurrencyIcon type="primary"/>
                    {ingredient.price}
                </p>
                <p className="text text_type_main-default pt1">{ingredient.name}</p>
            </div>
        )
    }

    return (
        <div className={ingredientGroupStyles.ingredient_list}>
            <h3 className="text text_type_main-medium pb-6">{type}</h3>
            {ingredients.map((ingredientItem: IIngredient, i) => (
                <IngredientCard key={i} {...ingredientItem}/>
            ))}
        </div>
    );
}