import ingredientCardStyles from "./IngredientCard.module.scss";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

export default function IngredientCard({ingredient_data}: { ingredient_data: any }) {
    return (
        ingredient_data.map((elem:any) => {
                return (

                    <div className={ingredientCardStyles.ingredient_item}>

                        <img class={ingredientCardStyles.ingredient_img} src={elem.image} alt={elem.name}/>

                        <div className={ingredientCardStyles.ingredient_price}>
                            <p>{elem.price}</p>
                            <CurrencyIcon type={"primary"}/>
                        </div>

                        <p className="text text_type_main-default">{elem.name}</p>
                    </div>

                )
            }
        )
    )
}