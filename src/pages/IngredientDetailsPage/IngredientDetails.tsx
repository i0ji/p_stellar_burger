import styles from "pages/IngredientDetailsPage/IngredientDetailsStyles.module.scss";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {IIngredient} from "interfaces/interfaces";
import {IBurgerState} from "interfaces/sliceInterfaces";
import Loader from "components/common/Loader/Loader.tsx";
import burgerBuilderStyles from "pages/HomePage/BurgerBuilder.module.scss";


export default function IngredientDetails() {

    const {id} = useParams<{ "id"?: string }>();
    const {ingredients: ingredientsData, status, error}: IBurgerState = useSelector((state: {
        ingredients: IBurgerState
    }) => state.ingredients);

    console.log(id)
    console.log(ingredientsData)

    function getIngredient(id: string) {
        return ingredientsData.filter((ingredient: IIngredient) => ingredient._id === id);
    }

    const [ingredient] = getIngredient(id ?? '')

    console.log(ingredient)


    // --------------- FADE IN/OUT ANIMATION  ---------------

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);


    // --------------- STATUSES ---------------
    if (status === 'loading') {
        return <Loader/>;
    }

    if (status === 'failed') {
        return <p className={burgerBuilderStyles.status}>Ошибка: {error}</p>;
    }

    return (




        <div className={styles.ingredients_details}>


            {error ? (<p>Произошла ошибка: {error}</p>) : (ingredientsData.length > 0 && (

                <>
                    <h3 className="text text_type_main-large">Детали ингредиента</h3>
                    <img
                        src={ingredient.image}
                        alt={ingredient.name}
                        className="mb-4"
                    />
                    <h4 className="text text_type_main-medium mb-8">
                        {ingredient.name}
                    </h4>
                    <div className={styles.ingredients_details_features}>
                        <div className={styles.feature}>
                            <p className="text text_type_main-default">Калории, калл</p>
                            <p className="text text_type_digits-default">{ingredient.calories}</p>
                        </div>
                        <div className={`${styles.feature} pl-5`}>
                            <p className="text text_type_main-default">Белки, г</p>
                            <p className="text text_type_digits-default">{ingredient.proteins}</p>
                        </div>
                        <div className={`${styles.feature} pl-5`}>
                            <p className="text text_type_main-default">Жиры, г</p>
                            <p className="text text_type_digits-default">{ingredient.fat}</p>
                        </div>
                        <div className={`${styles.feature} pl-5`}>
                            <p className="text text_type_main-default">Углеводы, г</p>
                            <p className="text text_type_digits-default">{ingredient.carbohydrates}</p>
                        </div>
                    </div>
                </>

            ))}


        </div>
    )
}
//
//
//
// {(isLoaded === 'loading') && !hasError &&
// <Loader/>
// }
//
// {isLoaded === 'failed' && <WarningMessage/>}
//
//
// {(isLoaded === 'succeeded') && isVisible &&
// <>
//     <Modal onClose={closeModal}>
//         <OrderDetails/>
//     </Modal>
// </>
// }