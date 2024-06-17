import styles from './EntitiesShort.module.css'
import {FridgeI} from "../../../Interfaces/FridgeI.ts";
import {useNavigate} from "react-router-dom";

export default function FridgeShort(props: { fridge?: FridgeI }) {
    const nav = useNavigate()

    if (props.fridge){
        return (
            <div className={styles.background} onClick={() => {
                nav(`/fridge/${props.fridge?.fridge._id}/`)
            }}>
                <div className={styles.small}>{String(props.fridge.trips.some((trip) => {
                    return trip.status === 'started'
                }))}
                </div>
                <div className={styles.normal}>{props.fridge.fridge.inventoryNumber}</div>
            </div>
        )
    }
    else {
        return (
            <div className={styles.backgroundHead}>
                <div className={styles.small}>Is free</div>
                <div className={styles.normal}>Fridge IN</div>
            </div>
        )
    }

}