import orderDetailsStyles from "./OrderDetailsStyles.module.scss";
import done_png from "assets/done.png";

export default function OrderDetailsStyles() {
    return (
        <div className={orderDetailsStyles.orders_modal}>
            <button>&#x2715;</button>
            <h1 className="text text_type_digits-large mb-8">034567</h1>
            <p className="text text_type_main-medium mb-15">идентификатор заказа</p>
            <img
                className="mb-15"
                src={done_png}
                alt="Ваш заказ начали собирать"/>
            <div className={orderDetailsStyles.orders_modal_info}>
                <p className="text text_type_main-default mb2">Ваш заказ начали готовить</p>
                <p className="text text_type_main-default">Дождитесь готовности на орбитальной станции</p>
            </div>
        </div>
    );
}