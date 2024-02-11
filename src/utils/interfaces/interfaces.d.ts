import React from "react";

export interface IIngredient {
    "id"?: string,
    "_id"?: string,
    "index"?: string,
    "name": string,
    "type"?: string,
    "proteins"?: number,
    "fat"?: number,
    "carbohydrates"?: number,
    "calories"?: number,
    "price"?: number,
    "image"?: string,
    "image_mobile"?: string,
    "image_large?"?: string,
    "__v"?: number,
    "content"?: string,
    "uuid"?: string,
    "moveIngredient"?: (dragIndex: number, hoverIndex: number) => void
}

export interface IIngredientCardProps extends IIngredient {
    onOpenModal: () => void;
}

export interface IOrderDetailsProps {
    onClose: () => void,
}

export interface IModalOverlayProps extends IOrderDetailsProps {
    children?: React.ReactNode,
    id?: string;
}

export interface IIngredientDetailsProps extends IOrderDetailsProps {
    image: string,
    fat: number,
    proteins: number,
    name: string,
    carbohydrates: number,
    calories: number,
}

export interface IIngredientGroupProps {
    type: string;
    ingredients: IIngredient[];
}

export interface IResponseData {
    success: boolean;
    order: {
        number: string;
    };
}

export interface IRequestFunction {
    (): Promise<IResponseData>;
}