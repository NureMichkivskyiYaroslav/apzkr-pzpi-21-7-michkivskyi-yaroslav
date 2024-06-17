import styles from './EntitiesShort.module.css'
import {DriverShortI} from "../../../Interfaces/DriverShortI.ts";
import {useNavigate} from "react-router-dom";

export default function DriverShort(props:{driver?:DriverShortI}) {
    const nav = useNavigate()

    if (props.driver){
        return (
            <div className={styles.background} onClick={()=>{nav(`/driver/${props.driver?.driver._id}/`)}}>
                <div className={styles.small}>{String(props.driver.isFree)}</div>
                <div className={styles.normal}>{props.driver.driver.name}</div>
                <div className={styles.normal}>{props.driver.driver.phone}</div>
            </div>
        )
    }
    else {
        return (
            <div className={styles.backgroundHead}>
                <div className={styles.small}>Is free</div>
                <div className={styles.normal}>Name</div>
                <div className={styles.normal}>Phone</div>
            </div>
        )
    }
}