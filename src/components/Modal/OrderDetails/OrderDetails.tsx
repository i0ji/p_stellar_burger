import orderDetailsStyles from "./OrderDetailsStyles.module.scss"

export default function OrderDetailsStyles() {
    return (
        <div className={orderDetailsStyles.orders_modal}>
            <button>&#x2715;</button>
            <h1 className="text text_type_digits-large">034567</h1>
        </div>
    );
}