import burgerConstructorStyles from "./BurgerConstructorStyles.module.scss";
import {Button, CurrencyIcon, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";
import {IIngredient} from "src/Interfaces";
import {useContext, useEffect, useReducer, useState} from "react";
import OrderDetails from "modal/OrderDetails/OrderDetails.tsx";
import Modal from "modal/Modal.tsx";
import {OrderDetailsContext} from "services/orderDetailsContext.ts";
import {createOrder} from "utils/order-api.ts";
import {BurgerConstructorContext} from "services/constructorContext.ts";

export default function BurgerConstructor() {
	
	const [isVisible, toggleVisibility] = useReducer(isVisible => !isVisible, false);
	const [orderNumber, setOrderNumber] = useState(null);
	
	const orderNumberContext = orderNumber;
	
	const {contextData, bunData} = useContext(BurgerConstructorContext);
	
	// ------ GET ORDER IDS ------
	function getIDs(data: IIngredient[]): (string | undefined)[] {
		if (data) return data.map(item => item._id)
		else return [];
	}
	
	const randomIDs: (string | undefined)[] = getIDs(contextData);
	
	// ------ MODAL OPENING/CLOSING LOGIC ------
	
	
	function handleOpenModal() {
		createOrder(randomIDs)
			.then(responseData => {
				if (responseData.success) {
					console.log(responseData.order.number);
					setOrderNumber(responseData.order.number);
				} else {
					console.error('YOU WILL NOT GET FOOD:', responseData);
				}
			})
			.catch(error => {
				console.error('Got this error:', error);
			});
		toggleVisibility();
	}
	
	function handleCloseModal() {
		toggleVisibility();
	}
	
	// ------ TOTAL PRICE LOGIC ------
	function totalAmount(contextData: IIngredient[], bunData: IIngredient[]): number {
		return (
			contextData
				.map(ingredientItem => ingredientItem.price || 0)
				.reduce((acc, current) => acc + current, 0)
			+ bunData
				.map(ingredientItem => ingredientItem.price || 0)
				.reduce((acc, current) => acc + current, 0)
		)
	}
	
	// ------ CALCULATING TOTAL AMOUNT ON RENDER ------
	useEffect(() => {
		totalAmount(contextData, bunData)
	}, [contextData, bunData]);
	
	return (
		<section className={burgerConstructorStyles.constructor_block}>
			
			<div
				className={`${burgerConstructorStyles.constructor_list} mb-10`}
			>
				{/* ----- TOP BUN ----- */}
				<div className={burgerConstructorStyles.constructor_order_item}>
					<DragIcon type="secondary"/>
					<ConstructorElement
						extraClass={`${burgerConstructorStyles.constructor_item_top}`}
						type="top"
						isLocked={true}
						text={`${bunData[0].name} (верх)`}
						price={bunData[0].price ?? 0}
						thumbnail={bunData[0].image_mobile}
					/>
				</div>
				
				{/* ----- SCROLLED INNER INGREDIENTS ----- */}
				<div className={burgerConstructorStyles.constructor_order}>
					
					{contextData.map((ingredientItem: IIngredient, i: number) => (
						<div
							className={burgerConstructorStyles.constructor_order_item}
							key={i}
						>
							<DragIcon type="primary"/>
							<ConstructorElement
								thumbnail={ingredientItem.image || ''}
								text={ingredientItem.name}
								price={ingredientItem.price || 0}
							/>
						</div>
					))}я
				
				</div>
				{/*----- BOTTOM BUN ----- */}
				<div className={burgerConstructorStyles.constructor_order_item}>
					<DragIcon type="secondary"/>
					<ConstructorElement
						extraClass={`${burgerConstructorStyles.constructor_item_bottom}`}
						type="bottom"
						isLocked={true}
						text={`${bunData[1].name} (низ)`}
						price={bunData[1].price ?? 0}
						thumbnail={bunData[1].image_mobile}
					/>
				</div>
			</div>
			
			{/* ----- PRICE ----- */}
			<div className={burgerConstructorStyles.price_info}>
				<h1 className="text text_type_main-large pr-3">{totalAmount(contextData, bunData)}</h1>
				<CurrencyIcon type="primary"/>
				<Button
					extraClass="ml-3"
					size="large"
					type="primary"
					htmlType="button"
					onClick={handleOpenModal}
				>Оформить заказ</Button>
			</div>
			
			{/* ----- MODAL ENTER ----- */}
			
			{isVisible &&
                <>
                    <Modal onClose={handleCloseModal}>
                        <OrderDetailsContext.Provider value={orderNumberContext!}>
                            <OrderDetails/>
                        </OrderDetailsContext.Provider>
                    </Modal>
                </>
			}
		
		</section>
	);
}