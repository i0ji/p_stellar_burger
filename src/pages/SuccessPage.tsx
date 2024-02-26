import styles from "pages/Pages.module.scss"

import {Link} from "react-router-dom";

export default function SuccessPage() {

    return (
        <section className={styles.section}>
            <form>
                <h1 className="text text text_type_main-medium pb-6"> Пароль успешно изменён!</h1>
                <p>
                    <Link
                        to="/"
                    >&nbsp;На главную</Link></p>
            </form>
        </section>
    );
}