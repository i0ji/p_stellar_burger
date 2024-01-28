import React from "react";

export interface IIngredient {
    image_mobile: string,
    "_id"?: string,
    "name": string,
    "type"?: string,
    "proteins"?: number,
    "fat"?: number,
    "carbohydrates"?: number,
    "calories"?: number,
    "price"?: number,
    "image"?: string,
    "image_mobile?"?: string,
    "image_large?"?: string,
    "__v"?: number,
}

interface IIngredientCardProps extends IIngredient {
    onOpenModal: () => void;
}

export interface IOrderDetailsProps {
    onClose: () => void,
}

export interface IModalOverlayProps {
    onClose?: () => void;
    children?: React.ReactNode;
}


export interface IIngredientDetailsProps extends IOrderDetailsProps {
    image: string,
    fat: number,
    proteins: number,
    name: string,
    carbohydrates: number,
    calories: number,
}

