import styles from "pages/IngredientDetailsPage/IngredientDetailsPageStyles.module.scss";

import {useSelector} from "react-redux";
import Modal from "components/common/Modal/ModalOverlay/ModalOverlay.tsx";
import {Button} from "@ya.praktikum/react-developer-burger-ui-components";
import {useNavigate, useParams} from "react-router-dom";


export default function IngredientDetailsPage() {
	
	const ingredient = useSelector(state => state.currentIngredientSlice.selectedIngredient)
	let {userID} = useParams();
	
	console.log(userID)
	
	const navigate = useNavigate();
	
	return (
		<>
			<Modal>
				<Button
					htmlType="button"
					type="primary"
					onClick={() => navigate(-1)}
				/>
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
						<p>Белки, г</p>
						<p className="text text_type_digits-default">{ingredient.proteins}</p>
					</div>
					<div className={`${styles.feature} pl-5`}>
						<p>Жиры, г</p>
						<p className="text text_type_digits-default">{ingredient.fat}</p>
					</div>
					<div className={`${styles.feature} pl-5`}>
						<p>Углеводы, г</p>
						<p className="text text_type_digits-default">{ingredient.carbohydrates}</p>
					</div>
				</div>
			</Modal>
		</>
	);
}
	
	
