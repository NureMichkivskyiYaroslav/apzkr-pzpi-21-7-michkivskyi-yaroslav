import styles from './EntitiesShort.module.css'
import {TripCaseI} from "../../../Interfaces/TripCaseI.ts";
import {MouseEventHandler} from "react";
import {useNavigate} from "react-router-dom";

export default function TripCaseShort(props: { tripCase?: TripCaseI, clickHandler?: MouseEventHandler }) {

    const nav = useNavigate()
    if (props.tripCase && props.clickHandler) {
        return (
            <div className={styles.background} onClick={props.clickHandler}>
                <div className={styles.small}><a className={styles.link} onClick={() => {
                    nav(`/trip/${props.tripCase?.tripId}`)
                }}>{props.tripCase.status}</a></div>
                <div className={styles.small}><a className={styles.link} onClick={() => {
                    nav(`/case/${props.tripCase?.caseId}`)
                }}>{props.tripCase.inventoryNumber}</a></div>
                <div className={styles.small}>{props.tripCase.filling}</div>
                <div className={styles.small}>{props.tripCase.maxTemperature}</div>
                <div className={styles.normal}>{props.tripCase.statistics.time0to5}</div>
                <div className={styles.normal}>{props.tripCase.statistics.timeAbove5}</div>
                <div className={styles.normal}>{props.tripCase.statistics.averageExceed}</div>
            </div>
        )
    } else {
        return (
            <div className={styles.backgroundHead}>
                <div className={styles.small}>Trip status</div>
                <div className={styles.small}>Case IN</div>
                <div className={styles.small}>Filling</div>
                <div className={styles.small}>Max t°</div>
                <div className={styles.normal}>Excess 0°-5°(min)</div>
                <div className={styles.normal}>Excess {'>'}5°(min)</div>
                <div className={styles.normal}>Average excess(°)</div>
            </div>
        )
    }
}