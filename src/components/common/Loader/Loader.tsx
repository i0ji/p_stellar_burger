import styles from './Loader.module.scss'
import loading from "images/common/loading.svg"

export default function Loader({description}: { description: string }) {
    return (
        <>
            <div className={styles.loader}/>
            <div className={styles.loader_content}>
                <img src={loading} alt="ЗАГРУЗКА..."/>
                <h1 className="text text_type_main-medium">{description}</h1>
            </div>
        </>
    )
}