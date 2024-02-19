import notFoundStyles from "./NotFound404.module.scss"
import {Link} from 'react-router-dom';

export default function NotFound404() {
	return (
		
		<div className={notFoundStyles.container}>
			
			<div className={notFoundStyles.content}>
								<br/>
				<Link to='/' className={notFoundStyles.link}>Перейти в список чатов</Link>
			</div>
		</div>
	);
}
