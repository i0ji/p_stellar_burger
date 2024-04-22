import styles from "./IngredientGroupStyles.module.scss";

import {updateSelectedIngredient} from "slices/currentIngredientSlice.ts";
import {v4 as uuidv4} from 'uuid';

import {IIngredient, IIngredientCardProps, IIngredientGroupProps} from "declarations/interfaces";

import {Link} from "react-router-dom";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

import {useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "hooks/reduxHooks.ts";
import {useDrag} from "react-dnd";

export default function IngredientGroup({type, ingredients}: IIngredientGroupProps) {


    // --------------- VARS & STATES ---------------

    function IngredientCard({onOpenDetailsPage, image, price, name, type, _id}: IIngredientCardProps) {
        const [{isDragging}, drag] = useDrag({
            type: 'ingredient',
            item: {
                id: uuidv4(),
                name,
                image,
                price,
                type,
                _id
            },
            collect: (monitor) => ({
                isDragging: monitor.isDragging(),
            }),
        }),

        // ----------------- INGREDIENTS COUNTER -----------------

         ingredientCount = addedIngredients.reduce((count: number, ingredient: IIngredient) => ingredient.name === name ? count + 1 : count, 0),

         isCurrentBun = bunIngredients && bunIngredients.name === name && bunIngredients.price === price;

        return (
            <div
                className={`pb-8 ${styles.ingredient_card} ${isDragging ? styles.dragging : ''}`}
                onClick={onOpenDetailsPage}
                ref={drag}
            >
                <img
                    alt={name}
                    src={image}
                />

                <p className="text text_type_digits-default pt-1 pb-1">
                    {price}

                    <CurrencyIcon type="primary" />
                </p>

                <p className="text text_type_main-default pt1">
                    {name}
                </p>

                {(ingredientCount > 0) ? <span className="text text_type_digits-default">
                    {ingredientCount}
                                         </span> : null}

                {isCurrentBun ? <span className="text text_type_digits-default">
                    2
                                </span> : null}
            </div>
        );
    }


    // ----------------- MARKUP -----------------

    return (
        <div className={styles.ingredient_list}>
            <h3 className="text text_type_main-medium pb-6">
                {type}
            </h3>

            {
                    ingredients.map((ingredientItem) => (
                        <Link
                            className={styles.ingredient_card}
                            key={ingredientItem._id}
                            onClick={() => onUpdateSelectedIngredient(ingredientItem)}
                            state={{background: location}}
                            to={`/ingredient/${ingredientItem._id}`}
                        >
                            <IngredientCard
                                {...ingredientItem}
                            />
                        </Link>
                    ))
                }

        </div>
    );
}