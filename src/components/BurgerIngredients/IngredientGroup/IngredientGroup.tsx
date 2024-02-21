import {updateSelectedIngredient, resetSelectedIngredient} from "slices/currentIngredientSlice.ts";

import styles from "./IngredientGroupStyles.module.scss";
import {IIngredient, IIngredientCardProps, IIngredientGroupProps} from "interfaces/interfaces";

import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useDrag} from "react-dnd";

import {v4 as uuidv4} from 'uuid';

import {IngredientDetailsPage} from "pages/index.ts";
import {useNavigate} from "react-router-dom";


export default function IngredientGroup({type, ingredients}: IIngredientGroupProps) {
	
	const dispatch = useDispatch();
	
	const navigate = useNavigate();
	
	const addedIngredients = useSelector(state => state.constructorSlice.addedIngredients);
	const bunIngredients = useSelector(state => state.constructorSlice.bun);
	
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
				className={`${styles.ingredient_card} ${isDragging ? styles.dragging : ''}`}
				onClick={onOpenDetailsPage}
			>
				<img src={image} alt={name}/>
				<p className="text text_type_digits-default">
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
	
	const [isModalOpen, setIsModalOpen] = useState(false);
	
	const handleOpenDetailsModal = (ingredient: IIngredient) => {
		navigate(`${ingredient._id}`)
		dispatch(updateSelectedIngredient(ingredient));

		setIsModalOpen(true);
	};
	
	const handleCloseDetailsPage = () => {
		dispatch(resetSelectedIngredient());
		setIsModalOpen(false);
	};
	
	
	return (
		<>
			<div className={styles.ingredient_list}>
				<h3 className="text text_type_main-medium pb-6">{type}</h3>
				
				{/* --------------- MAPPING INGREDIENTS FOR EACH GROUP --------------- */}
				
				{ingredients.map((ingredientItem: IIngredient, i) => (
						<IngredientCard
							key={i}
							{...ingredientItem}
							onOpenDetailsPage={() => handleOpenDetailsModal(ingredientItem)}
							onCloseDetailsPage={() => handleCloseDetailsPage()}
						/>
					)
				)}
				
				{isModalOpen && (
					<IngredientDetailsPage onCloseDetailsPage={handleCloseDetailsPage}/>
				)}
			</div>
		</>
	);
}