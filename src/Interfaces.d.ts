export interface IIngredient {
    image_mobile: string;
    "_id"?: string;
    "name": string;
    "type"?: string;
    "proteins"?: number;
    "fat"?: number;
    "carbohydrates"?: number;
    "calories"?: number;
    "price"?: number;
    "image"?: string;
    "image_mobile?"?: string;
    "image_large?"?: string;
    "__v"?: number;
}

export interface IModalOverlayProps {
    children?: ReactNode;
    onClose?:() => void;
}

export interface IOrderDetailsProps {
    onClose: () => void;
}