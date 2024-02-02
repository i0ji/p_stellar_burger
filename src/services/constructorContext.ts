import React from "react";
import {IIngredient} from "src/Interfaces";

export const BurgerConstructorContext = React.createContext<{
    contextData: IIngredient[];
    bunData: IIngredient[]
}>({contextData: [], bunData: []});
