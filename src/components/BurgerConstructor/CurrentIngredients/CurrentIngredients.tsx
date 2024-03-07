import CurrentIngredientsStyles from "./CurrentIngredientsStyles.module.scss"
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {IIngredient, IDragItem} from "interfaces/interfaces";
import {useDispatch} from "react-redux";
import {removeIngredient} from "slices/constructorSlice.ts";
import {useRef} from "react";
import {useDrag, useDrop} from "react-dnd";

export default function CurrentIngredients({ingredient, index, moveIngredient}: {
	ingredient: IIngredient,
	index: number,
	moveIngredient: (dragIndex: number, hoverIndex: number) => void
}) {
	
	const ref = useRef<HTMLDivElement>(null)
	
	const dispatch = useDispatch();
	const handleRemoveIngredient = (id: number) => {
		dispatch(removeIngredient(id));
	}
	
	const [{handlerId}, drop] = useDrop({
		accept: 'ingredients',
		collect(monitor) {
			return {
				handlerId: monitor.getHandlerId(),
			};
		},
		hover: function (item: IDragItem) {
			if (!ref.current) {
				return;
			}
			const dragIndex = item.index;
			const hoverIndex = index;
			if (dragIndex === hoverIndex) {
				return;
			}
			item.index = hoverIndex;
			
			moveIngredient(dragIndex, hoverIndex);
		},
	} as {
		accept: string,
		collect: (monitor: any) => { handlerId: string },
		hover: (item: IDragItem, monitor: any) => void
	})
	
	const [{isDragging}, drag] = useDrag({
		type: 'ingredients',
		item: () => ({
			id: ingredient.id,
			index,
		}),
		collect: (monitor: any) => ({
			isDragging: monitor.isDragging(),
		}),
	});
	
	
	const opacity = isDragging ? 0 : 1
	drag(drop(ref));
	return (
		<div
			className={CurrentIngredientsStyles.constructor_order_item}
			ref={ref} style={{opacity}} data-handler-id={handlerId}
		>
			<DragIcon type="primary"/>
			<ConstructorElement
				text={ingredient.name}
				price={ingredient.price || 0}
				thumbnail={ingredient.image || ''}
				handleClose={() => handleRemoveIngredient(ingredient.id)}
			/>
		</div>
	);
}