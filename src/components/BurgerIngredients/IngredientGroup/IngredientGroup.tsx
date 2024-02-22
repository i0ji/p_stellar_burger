import styles from "./IngredientGroupStyles.module.scss";
import {IIngredient, IIngredientCardProps, IIngredientGroupProps} from "interfaces/interfaces";

import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

import {useLocation} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {useDrag} from "react-dnd";

import {updateSelectedIngredient} from "slices/currentIngredientSlice.ts";

import {v4 as uuidv4} from 'uuid';

import {Link} from "react-router-dom";

export default function IngredientGroup({type, ingredients}: IIngredientGroupProps) {


    const location = useLocation();
    const dispatch = useDispatch();

    const addedIngredients = useSelector(state => state.constructorSlice.addedIngredients);
    const bunIngredients = useSelector(state => state.constructorSlice.bun);


    const onUpdateSelectedIngredient = (ingredient: IIngredient) => {
        dispatch(updateSelectedIngredient(ingredient))
    }


    // ----------------- INGREDIENT ITEM CARD -----------------

    const IngredientCard = ({onOpenDetailsPage, image, price, name, type, _id}: IIngredientCardProps) => {
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
        });

        // ----------------- INGREDIENTS COUNTER -----------------

        const ingredientCount = addedIngredients.reduce((count: number, ingredient: IIngredient) => {
            return ingredient.name === name ? count + 1 : count;
        }, 0);

        const isCurrentBun = bunIngredients && bunIngredients.name === name && bunIngredients.price === price;

        return (
            <div
                ref={drag}
                className={`pb-8 ${styles.ingredient_card} ${isDragging ? styles.dragging : ''}`}
                onClick={onOpenDetailsPage}
            >
                <img src={image} alt={name}/>
                <p className="text text_type_digits-default pt-1 pb-1">
                    {price}
                    <CurrencyIcon type="primary"/>
                </p>
                <p className="text text_type_main-default pt1">{name}</p>
                {(ingredientCount > 0) ? <span className="text text_type_digits-default">
					{ingredientCount}
				</span> : null}
                {isCurrentBun && <span className="text text_type_digits-default">
					2
				</span>
                }
            </div>
        );
    };


    return (
        <>
            <div className={styles.ingredient_list}>
                <h3 className="text text_type_main-medium pb-6">{type}</h3>


                {/* --------------- MAPPING INGREDIENTS FOR EACH GROUP --------------- */}

                {ingredients.map((ingredientItem: IIngredient, i) => (
                    <Link
                        className={styles.ingredient_card}
                        key={i}
                        to={`/ingredient/${ingredientItem._id}`}
                        state={{background: location}}
                        onClick={() => onUpdateSelectedIngredient(ingredientItem)}
                    >
                        <IngredientCard
                            {...ingredientItem}
                        />
                    </Link>
                ))}
            </div>
        </>
    );
}