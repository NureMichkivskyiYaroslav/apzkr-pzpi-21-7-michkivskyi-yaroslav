import styles from './EntitiesShort.module.css'
import {TemperatureIndicatorI} from "../../../Interfaces/TemperatureIndicatorI.ts";
import formatDate from "../../../Utilities/formatDate.ts";

export default function TemperatureIndicator(props:{temperatureIndicator?:TemperatureIndicatorI}) {
    if (props.temperatureIndicator){
        return (
            <div className={styles.background}>
                <div className={styles.normal}>{formatDate(props.temperatureIndicator.dateTime)}</div>
                <div className={styles.small}>{props.temperatureIndicator.temperature}</div>
            </div>
        )
    }
    else {
        return (
            <div className={styles.backgroundHead}>
                <div className={styles.normal}>DateTime</div>
                <div className={styles.small}>Temperature</div>
            </div>
        )
    }
}