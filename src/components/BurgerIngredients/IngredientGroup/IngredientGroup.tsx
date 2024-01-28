import React, { useState } from "react";
import ingredientGroupStyles from "./IngredientGroupStyles.module.scss";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { IIngredient } from "src/Interfaces";
import IngredientDetails from "modal/IngredientDetails/IngredientDetails.tsx";

interface IIngredientCardProps extends IIngredient {
    onOpenModal: () => void;
}

const IngredientCard: React.FC<IIngredientCardProps> = ({ onOpenModal, ...ingredient }) => {
    return (
        <>
            <div className={ingredientGroupStyles.ingredient_card} onClick={onOpenModal}>
                <img src={ingredient.image} alt={ingredient.name} />
                <p className="text text_type_main-default pt-1">
                    <CurrencyIcon type="primary" />
                    {ingredient.price}
                </p>
                <p className="text text_type_main-default pt1">{ingredient.name}</p>
            </div>
        </>
    );
};

export default function IngredientGroup({ type, ingredients }: { type: string; ingredients: IIngredient[] }) {
    const [selectedIngredient, setSelectedIngredient] = useState<IIngredient | null>(null);

    const handleOpenModal = (ingredient: IIngredient) => {
        setSelectedIngredient(ingredient);
    };

    const handleCloseModal = () => {
        setSelectedIngredient(null);
    };

    return (
        <div className={ingredientGroupStyles.ingredient_list}>
            <h3 className="text text_type_main-medium pb-6">{type}</h3>
            {ingredients.map((ingredientItem: IIngredient, i) => (
                <IngredientCard key={i} {...ingredientItem} onOpenModal={() => handleOpenModal(ingredientItem)} />
            ))}
            {selectedIngredient && (
                <IngredientDetails
                    onClose={handleCloseModal}
                    image={selectedIngredient.image || ""}
                    name={selectedIngredient.name}
                    proteins={selectedIngredient.proteins || 0}
                    carbohydrates={selectedIngredient.carbohydrates || 0}
                    calories={selectedIngredient.calories || 0}
                    fat={selectedIngredient.fat || 0}
                />
            )}
        </div>
    );
}
