import ingredientDetailsStyles from "./IngredientDetailsStyles.module.scss"
import {IIngredientDetailsProps} from "interfaces/interfaces";

export default function IngredientDetails(props: IIngredientDetailsProps) {

    const {image, fat, name, calories, proteins, carbohydrates} = props;

    return (
        <>
            <div className={ingredientDetailsStyles.ingredients_modal}>
                <div className={ingredientDetailsStyles.ingredients_modal_title}>
                    <h3 className="text text_type_main-large">Детали ингредиента</h3>
                </div>

                <img
                    src={image}
                    alt={name}
                    className="mb-4"
                />

                <h4 className="text text_type_main-medium mb-8">
                    {name}
                </h4>

                <div className={ingredientDetailsStyles.ingredients_modal_features}>
                    <div className={ingredientDetailsStyles.feature}>
                        <p className="text text_type_main-default">Калории, калл</p>
                        <p className="text text_type_digits-default">{calories}</p>
                    </div>
                    <div className={`${ingredientDetailsStyles.feature} pl-5`}>
                        <p>Белки, г</p>
                        <p className="text text_type_digits-default">{proteins}</p>
                    </div>
                    <div className={`${ingredientDetailsStyles.feature} pl-5`}>
                        <p>Жиры, г</p>
                        <p className="text text_type_digits-default">{fat}</p>
                    </div>
                    <div className={`${ingredientDetailsStyles.feature} pl-5`}>
                        <p>Углеводы, г</p>
                        <p className="text text_type_digits-default">{carbohydrates}</p>
                    </div>
                </div>
            </div>
        </>
    )
}