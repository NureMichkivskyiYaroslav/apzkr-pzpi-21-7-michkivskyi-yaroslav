import styles from './EntitiesShort.module.css'
import {CaseShortI} from "../../../Interfaces/CaseShortI.ts";
import {useNavigate} from "react-router-dom";

export default function CaseShort(props:{case?:CaseShortI}) {
    const nav = useNavigate()
    if (props.case) {
        return (
            <div className={styles.background} onClick={() => {
                nav(`/case/${props.case?._id}/`)
            }}>
                <div className={styles.small}>{String(props.case.isFree)}</div>
                <div className={styles.small}>{props.case.capacity}</div>
                <div className={styles.small}>{props.case.inventoryNumber}</div>
            </div>
        )
    }
    else{
        return (
            <div className={styles.backgroundHead}>
                <div className={styles.small}>Is free</div>
                <div className={styles.small}>Capacity</div>
                <div className={styles.small}>Case IN</div>
            </div>
        )
    }
}