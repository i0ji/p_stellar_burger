import ingredientsStyles from "./BurgerIngredients.module.scss";

export default function BurgerIngredients() {
    return (
            <div className={ingredientsStyles.ingredients_menu}>
                <p className="text text_type_main-medium">Ингридеиеты</p>
            </div>
    );
};