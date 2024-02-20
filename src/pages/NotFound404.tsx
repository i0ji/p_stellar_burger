import notFoundStyles from "./FormsPage.module.scss"

import {Link} from "react-router-dom";

import astronaut from "images/404/astronaut.png";
import loading from "images/common/loading.svg";

export default function NotFound404() {
	return (
		
		<section className={notFoundStyles.section}>
			<div className={notFoundStyles.not_found}>
				<h1 className='text text_type_digits-large'>404</h1>
				<p className="text text_type_main-large mb-15">Страница не найдена :(</p>
				<Link to='/constructor' className={`text text_type_main-medium ${notFoundStyles.link}`}>На главную</Link>
				<img className={notFoundStyles.astronaut} src={astronaut} alt=""/>
				<img className={notFoundStyles.astro_loading} id="astroloading" src={loading} alt=""/>
			</div>
		</section>
	);
}
