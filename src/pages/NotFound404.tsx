import styles from "./Pages.module.scss"

import {Link} from "react-router-dom";

import astronaut from "images/404/astronaut.png";
import loading from "images/common/loading.svg";

export default function NotFound404() {
	return (
		
		<section className={styles.section}>
			<div className={styles.not_found}>
				<h1 className='text text_type_digits-large'>404</h1>
				<p className="text text_type_main-large mb-15">Страница не найдена :(</p>
				<Link to='/' className={`text text_type_main-medium ${styles.link}`}>На главную</Link>
				<img className={styles.astronaut} src={astronaut} alt=""/>
				<img className={styles.astro_loading} id="astroloading" src={loading} alt=""/>
			</div>
		</section>
	);
}
