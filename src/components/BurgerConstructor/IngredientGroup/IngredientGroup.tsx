import IngredientGroupStyle from "./IngredientGroup.module.scss";
export default function IngredientGroup ({type, ingredients}: {type:string, ingredients: string[]}) {


    const IngredinetCard = (ingredintsData) => {
        return (
            <div>

            </div>
        )
    }

    return (
        <div>
            <h3 className="text text_type_main-medium pb-6">{type}</h3>

        </div>
    );
}