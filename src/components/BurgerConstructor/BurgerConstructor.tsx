import {addIngredient, reorderIngredients} from "slices/constructorSlice.ts"
import {updateIds, updateOrderNumber} from "slices/orderSlice.ts"

import styles from "./BurgerConstructorStyles.module.scss";
import awaitSpinner from "images/common/awaitSpinner.svg";
import {IIngredient} from "declarations/interfaces";
import {RootState} from "declarations/rootState.ts";
import {AppDispatch} from "declarations/types";

import {ConstructorElement, CurrencyIcon, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import CurrentIngredients from "components/BurgerConstructor/CurrentIngredients/CurrentIngredients.tsx";
import OrderDetails from "common/Modal/OrderDetails/OrderDetails.tsx";
import Loader from "common/Loader/Loader.tsx";
import WarningMessage from "common/WarningMessage/WarningMessage.tsx";
import Tooltip from "common/Tooltip/Tooltip.tsx";

import {useDispatch, useSelector} from "react-redux";
import {useCallback, useEffect} from "react";
import {useDrop} from "react-dnd";
import useModal from "hooks/useModal.ts";
import {createOrder} from "utils/api.ts";


export default function BurgerConstructor() {
	
	const dispatch = useDispatch<AppDispatch>();
	
	// --------------- STATES/VARS/CONSTANTS  ---------------
	const {addedIngredients, bun} = useSelector((state: RootState) => state.constructorSlice);
	// --------------- PRELOADER CONSTANTS
	const isLoaded = useSelector((state: RootState) => state.orderSlice.status);
	const hasError = useSelector((state: RootState) => state.orderSlice.error);
	// --------------- CURRENT IDS
	const ingredientIDs = useSelector((state: RootState) => state.constructorSlice.addedIngredients).map((elem: IIngredient) => elem._id);
	const bunIDs = useSelector((state: RootState) => state.constructorSlice.bun);
	// --------------- MODAL
	const {isVisible, openModal, closeModal} = useModal();
	// --------------- TOTAL AMOUNT
	const totalAmount = useSelector((state: RootState) => state.constructorSlice.totalAmount);
	// --------------- BUNS STATE
	const isBun = useSelector((state: RootState) => state.constructorSlice.bun);
	//--------------- AUTH STATE
	const isAuth = useSelector((state: RootState) => state.authSlice.isAuth);
	
	
	// --------------- CURRENT ID ---------------
	
	if (bunIDs) {
		ingredientIDs.push(bunIDs._id)
	}
	useEffect(() => {
		dispatch(updateIds(ingredientIDs));
	}, [dispatch, addedIngredients, ingredientIDs]);
	
	
	// --------------- DROP LOGIC ---------------
	
	const [, dropIngredients] = useDrop({
		accept: ['bun', 'ingredient'],
		drop: (item: IIngredient) => {
			dispatch(addIngredient(item));
		}
	});
	
	const moveIngredient = useCallback((dragIndex: number, hoverIndex: number) => {
		dispatch(reorderIngredients({dragIndex, hoverIndex}));
	}, [dispatch]);
	
	const renderIngredients =
		(ingredient: IIngredient, uuid: number) => {
			return (
				<CurrentIngredients
					key={ingredient.id}
					ingredient={ingredient}
					index={uuid}
					moveIngredient={moveIngredient}
				/>
			)
		}
	
	
	// --------------- PREVENT FROM ORDER ---------------
	
	const preventOrderState = isAuth && Boolean(isBun) && Boolean(addedIngredients.length);
	
	
	
	// --------------- INITIAL BUN ---------------
	
	const InitialBun = ({pos}: { pos: "top" | "bottom" | undefined }) => {
		
		return (
			<ConstructorElement
				extraClass={styles.constructor_item_initial_bun}
				text={'Перетащите сюда булочку'}
				type={pos}
				isLocked={true}
				thumbnail={awaitSpinner}
				price={0}
			/>
		)
	}
	
	
	// --------------- ORDER NUMBER LOGIC ---------------
	
	const handleOrder = async (): Promise<void> => {
		await openModal();
		const orderNumber = dispatch(createOrder(ingredientIDs));
		dispatch(updateOrderNumber(orderNumber.payload));
	}
	
	return (
		<section
			className={styles.constructor_block}
		>
			<div
				className={`${styles.constructor_list} mb-10`}
				ref={dropIngredients}
			>
				
				
				{/* --------------- TOP BUN --------------- */}
				
				{!isBun ? <InitialBun pos={"top"}/> :
					<div className={styles.constructor_order_item}>
						{bun && (
							<ConstructorElement
								extraClass={`${styles.constructor_item_top}`}
								type="top"
								isLocked={true}
								text={`${bun.name} (верх)`}
								price={bun.price ?? 0}
								thumbnail={bun.image || ''}
							/>
						)}
					</div>}
				
				
				{/* --------------- INNER INGREDIENTS --------------- */}
				
				<div
					className={styles.constructor_order}
					style={{
						scrollbarWidth: (addedIngredients.length > 3) ? 'inherit' : 'none',
						width: (addedIngredients.length > 3) ? '100%' : '97%',
					}}
				>
					{addedIngredients.map((ingredient: IIngredient, uuid: number) => (
						renderIngredients(ingredient, uuid)
					))}
				</div>
				
				
				
				{/* --------------- BOTTOM BUN --------------- */}
				
				{!isBun ? <InitialBun pos={'bottom'}/> :
					<div className={styles.constructor_order_item}>
						{bun && (
							<ConstructorElement
								extraClass={`${styles.constructor_item_bottom}`}
								type="bottom"
								isLocked={true}
								text={`${bun.name} (низ)`}
								price={bun.price ?? 0}
								thumbnail={bun.image || ''}
							/>
						)}
					</div>}
				
				
				{/* --------------- PRICE --------------- */}
				
				<div className={`mt-4 ${styles.price_info}`}>
					<h1 className="text text_type_digits-medium pr-3">{totalAmount}</h1>
					<CurrencyIcon type="primary"/>
					<Tooltip type={'Необходимо&nbsp;авторизоваться'}/>
					<Button
						disabled={!preventOrderState}
						extraClass="ml-3"
						size="large"
						type="primary"
						htmlType="button"
						onClick={handleOrder}
					>Оформить заказ</Button>
				</div>
				
				
				{/* -------------- MODAL + PRELOADER --------------- */}
				
				{(isLoaded === 'loading') && !hasError && <Loader/>}
				
				{isLoaded === 'failed' && <WarningMessage onClose={closeModal}/>}
				
				{(isLoaded === 'succeeded') && isVisible && <OrderDetails onClose={closeModal}/>
				
				}
			</div>
		</section>
	)
}