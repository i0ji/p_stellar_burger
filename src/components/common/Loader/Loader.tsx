import styles from './Loader.module.scss'
import loading from "images/common/loading.svg"

export default function Loader() {
    return (
        <>
            <div className={styles.loader}/>
            <div
                style={{
                    position: 'absolute',
                    zIndex: '500',
                    top: 'calc(50% - 100px)',
                    left: 'calc(50% - 100px)'
                }}>
                <img src={loading} alt="ЗАГРУЗКА..."/>
            </div>
        </>
    );
}