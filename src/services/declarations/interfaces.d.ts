export interface IIngredient {
	id?: string;
	_id?: string;
	uuid?: string;
	name: string;
	type?: string;
	proteins?: number;
	fat?: number;
	carbohydrates?: number;
	calories?: number;
	price?: number;
	image?: string;
	image_mobile?: string;
	image_large?: string;
	__v?: number;
	content?: string;

	moveIngredient?: (dragIndex: number, hoverIndex: number) => void;
}

export interface IIngredientCardProps extends IIngredient {
	onOpenModal?: () => void;
	onOpenDetailsPage?: () => void;
	onCloseDetailsPage?: () => void;
}

export interface IIngredientGroupProps {
	type: string;
	ingredients: IIngredient[];
	navigate?: string;
}

export interface IDragItem {
	index: number;
	id: string;
	type: string;
}

// export interface IForm {
// 	name?: string;
// 	email?: string;
// 	password?: string;
// }

interface IForm {
	[key: string]: string;
}