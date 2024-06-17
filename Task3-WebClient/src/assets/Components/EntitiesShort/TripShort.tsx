import styles from './EntitiesShort.module.css'
import {TripShortI} from "../../../Interfaces/TripShortI.ts";
import formatDate from "../../../Utilities/formatDate.ts";
import {useNavigate} from "react-router-dom";

export default function TripShort(props:{trip?:TripShortI}) {
    const nav = useNavigate()
    if (props.trip){
        return (
            <div className={styles.background} onClick={()=>{nav(`/trip/${props.trip?._id}/`)}}>
                <div className={styles.small}>{props.trip.status}</div>
                <div className={styles.normal}>{formatDate(props.trip.start)}</div>
                <div className={styles.normal}>{formatDate(props.trip.finishPlan)}</div>
                <div className={styles.normal}>{props.trip.finishFact?formatDate(props.trip.finishFact):'-----'}</div>
            </div>
        )
    }
    else {
        return (
            <div className={styles.backgroundHead}>
                <div className={styles.small}>Status</div>
                <div className={styles.normal}>Start</div>
                <div className={styles.normal}>Finish(plan)</div>
                <div className={styles.normal}>Finish(fact)</div>
            </div>
        )
    }
}