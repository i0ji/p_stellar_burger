import styles from "pages/IngredientDetailsPage/IngredientDetailsPageStyles.module.scss";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useSelector} from "react-redux";
import {useCallback, useEffect} from "react";
import {useParams, useNavigate} from "react-router-dom";
import {IIngredient} from "interfaces/interfaces";
import ModalOverlay from "components/common/Modal/ModalOverlay/ModalOverlay.tsx";
import Modal from "components/common/Modal/Modal.tsx";

export default function IngredientDetailsPage() {
	
	const navigate = useNavigate();
	const {id} = useParams<{ "id"?: string }>();
	const {ingredients: ingredientData} = useSelector((state) => state.ingredients)
	
	function getIngredient(id: string) {
		return ingredientData.filter((ingredient: IIngredient) => ingredient._id === id);
	}
	
	const [ingredient] = getIngredient(id ?? '')
	
	const onDismiss = useCallback(() => {
		navigate(-1)
	}, [navigate])
	
	
	useEffect(() => {
		
		const closeOnEscapeKey = (e: KeyboardEvent) => {
			if (onDismiss) (e.key === "Escape" ? onDismiss() : null);
		}
		
		document.body.addEventListener("keydown", closeOnEscapeKey);
		
		return () => {
			document.body.removeEventListener("keydown", closeOnEscapeKey);
		};
	}, [onDismiss]);
	
	return (
		
		<Modal>
			<div className={styles.ingredients_details}>
				<div className={styles.ingredients_details_title}>
					<h3 className="text text_type_main-large">Детали ингредиента</h3>
					<CloseIcon
						type='secondary'
						onClick={onDismiss}
					/>
				</div>
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
			</div>
		</Modal>
	
	);
}
	
	
