import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useDrag} from "react-dnd";

import ingredientGroupStyles from "./IngredientGroupStyles.module.scss";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {IIngredient, IIngredientCardProps, IIngredientGroupProps} from "interfaces/interfaces";
import IngredientDetails from "components/common/Modal/IngredientDetails/IngredientDetails.tsx";
import Modal from "components/common/Modal/Modal.tsx";

import {v4 as uuidv4} from 'uuid';

import {updateSelectedIngredient, resetSelectedIngredient} from "slices/currentIngredientSlice.ts";

export default function IngredientGroup({type, ingredients}: IIngredientGroupProps) {
	
	const [selectedIngredient, setSelectedIngredient] = useState<IIngredient | null>(null);
	
	const dispatch = useDispatch();
	
	const addedIngredients = useSelector(state => state.constructorSlice.addedIngredients);
	const bunIngredients = useSelector(state => state.constructorSlice.bun);
	
	
	// ----------------- INGREDIENT ITEM CARD -----------------
	
	const IngredientCard = ({onOpenModal, image, price, name, type, _id}: IIngredientCardProps) => {
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
				className={`${ingredientGroupStyles.ingredient_card} ${isDragging ? ingredientGroupStyles.dragging : ''}`}
				onClick={onOpenModal}
			>
				<img src={image} alt={name}/>
				<p className="text text_type_main-default pt-1">
					<CurrencyIcon type="primary"/>
					{price}
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
	
	// ----------------- INGREDIENT MODAL OPEN/CLOSE LOGIC -----------------
	
	const handleOpenModal = (ingredient: IIngredient) => {
		setSelectedIngredient(ingredient)
		dispatch(updateSelectedIngredient(ingredient));
	};
	
	const handleCloseModal = () => {
		dispatch(resetSelectedIngredient());
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
				)
			)}
			
			
			{/* --------------- MODAL ENTER --------------- */}
			
			{
				selectedIngredient && (
					<Modal
						onClose={handleCloseModal}
						selectedIngredient={selectedIngredient}
					>
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