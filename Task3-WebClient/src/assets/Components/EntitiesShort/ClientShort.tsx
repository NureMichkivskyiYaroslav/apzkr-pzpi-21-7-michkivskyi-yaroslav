import styles from './EntitiesShort.module.css'
import {ClientShortI} from "../../../Interfaces/ClientShortI.ts";
import {useNavigate} from "react-router-dom";

export default function ClientShort(props:{client?:ClientShortI}) {
    const nav = useNavigate()

    if (props.client){
        return (
            <div className={styles.background} onClick={()=>{nav(`/client/${props.client?._id}/`)}}>
                <div className={styles.normal}>{props.client.name}</div>
                <div className={styles.normal}>{props.client.login}</div>
                <div className={styles.normal}>{props.client.phone}</div>
            </div>
        )
    }
    else {
        return (
            <div className={styles.backgroundHead}>
                <div className={styles.normal}>Name</div>
                <div className={styles.normal}>Login</div>
                <div className={styles.normal}>Phone</div>
            </div>
        )
    }
}