import modalIngredientStyles from "./ModalIngredientStyles.module.scss"

export default function ModalIngredient() {
    return (
        <div className={modalIngredientStyles.modal}>
            <h3 className="text text_type_main-medium">Детали ингредиента</h3>
            <button>&#x2715;</button>
            <img src="https://code.s3.yandex.net/react/code/meat-01.png" alt=""/>
            <h4>Биокотлета из марсианской Магнолии</h4>

            <div className={modalIngredientStyles.modal_feature}>
                <p>Калории, калл</p>
                <p className="text text_type_digits-default">244,4</p>
            </div>
            <div className={`${modalIngredientStyles.modal_feature} pl-5`}>
                <p>Белки, г</p>
                <p className="text text_type_digits-default">12,2</p>
            </div>
            <div className={`${modalIngredientStyles.modal_feature} pl-5`}>
                <p>Жиры, г</p>
                <p className="text text_type_digits-default">17,2</p>
            </div>
            <div className={`${modalIngredientStyles.modal_feature} pl-5`}>
                <p>Углеводы, г</p>
                <p className="text text_type_digits-default">10,2</p>
            </div>
        </div>
    );
}