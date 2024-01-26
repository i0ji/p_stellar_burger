import ingredientDetailsStyles from "./IngredientDetailsStyles.module.scss"

export default function IngredientDetails() {
    return (
        <div className={ingredientDetailsStyles.ingredients_modal}>
            <div className={ingredientDetailsStyles.ingredients_modal_title}>
                <h3 className="text text_type_main-large">Детали ингредиента</h3>

            </div>

            <button>&#x2715;</button>

            <img
                src="https://code.s3.yandex.net/react/code/meat-01.png"
                alt=""
                className="mb-4"
            />

            <h4 className="text text_type_main-medium mb-8">
                Биокотлета из марсианской Магнолии
            </h4>

            <div className={ingredientDetailsStyles.ingredients_modal_features}>
                <div className={ingredientDetailsStyles.feature}>
                    <p className="text text_type_main-default">Калории, калл</p>
                    <p className="text text_type_digits-default">244,4</p>
                </div>
                <div className={`${ingredientDetailsStyles.feature} pl-5`}>
                    <p>Белки, г</p>
                    <p className="text text_type_digits-default">12,2</p>
                </div>
                <div className={`${ingredientDetailsStyles.feature} pl-5`}>
                    <p>Жиры, г</p>
                    <p className="text text_type_digits-default">17,2</p>
                </div>
                <div className={`${ingredientDetailsStyles.feature} pl-5`}>
                    <p>Углеводы, г</p>
                    <p className="text text_type_digits-default">10,2</p>
                </div>
            </div>
        </div>
    );
}