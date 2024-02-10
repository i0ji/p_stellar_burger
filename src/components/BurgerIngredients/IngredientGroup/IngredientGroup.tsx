import {useState} from "react";
import ingredientGroupStyles from "./IngredientGroupStyles.module.scss";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {IIngredient, IIngredientCardProps, IIngredientGroupProps} from "interfaces/interfaces";
import IngredientDetails from "modal/IngredientDetails/IngredientDetails.tsx";
import Modal from "modal/Modal.tsx";
import {useDrag} from "react-dnd";
import {v4 as uuidv4} from 'uuid';

export default function IngredientGroup({type, ingredients}: IIngredientGroupProps) {
    const [selectedIngredient, setSelectedIngredient] = useState<IIngredient | null>(null);

    // ----------------- INGREDIENT ITEM CARD -----------------
    const IngredientCard = ({onOpenModal, image, price, name}: IIngredientCardProps) => {
        const [{isDragging}, drag] = useDrag({
            type: 'ingredient',
            item: {
                id: uuidv4(),
                name,
                image,
                price,
            },
            collect: (monitor) => ({
                isDragging: !!monitor.isDragging(),
            }),
        });

        return (
            <div
                ref={drag}
                className={`${ingredientGroupStyles.ingredient_card} ${isDragging ? ingredientGroupStyles.dragging : ''}`}
                onClick={onOpenModal}
            >
                <img src={image} alt={name}/>
                <p className="text text_type_main-default pt-1">
                    <CurrencyIcon type="primary"/>
                    {price}
                </p>
                <p className="text text_type_main-default pt1">{name}</p>
            </div>
        );
    };



// ----------------- INGREDIENT MODAL OPEN/CLOSE LOGIC -----------------
const handleOpenModal = (ingredient: IIngredient) => {
    setSelectedIngredient(ingredient);
};

const handleCloseModal = () => {
    setSelectedIngredient(null);
};

return (
    <div className={ingredientGroupStyles.ingredient_list}>
        <h3 className="text text_type_main-medium pb-6">{type}</h3>

        {/* --------------- MAPPING INGREDIENTS FOR EACH GROUP --------------- */}
        {ingredients.map((ingredientItem: IIngredient, i) => (
            <IngredientCard
                key={i}
                {...ingredientItem}
                onOpenModal={() => handleOpenModal(ingredientItem)}
            />
        ))}

        {/* --------------- MODAL ENTER --------------- */}
        {selectedIngredient && (
            <Modal onClose={handleCloseModal}>
                <IngredientDetails
                    onClose={handleCloseModal}
                    image={selectedIngredient.image || ""}
                    name={selectedIngredient.name}
                    proteins={selectedIngredient.proteins || 0}
                    carbohydrates={selectedIngredient.carbohydrates || 0}
                    calories={selectedIngredient.calories || 0}
                    fat={selectedIngredient.fat || 0}
                />
            </Modal>
        )}
    </div>
);
}