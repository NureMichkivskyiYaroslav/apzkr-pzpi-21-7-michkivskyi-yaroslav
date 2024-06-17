import styles from './TripCaseIndicators.module.css'
import {TripCaseI} from "../../../Interfaces/TripCaseI.ts";
import TripCaseShort from "../EntitiesShort/TripCaseShort.tsx";
import {useEffect, useState} from "react";
import axios from "axios";
import TemperatureIndicator from "../EntitiesShort/TemperatureIndicator.tsx";
import {toast} from "react-toastify";

export default function TripCaseIndicators(props: { tripCases: TripCaseI[] }) {

    const [selectedId, setSelectedId] = useState('')
    const [temperatureIndicators, setTemperatureIndicators] = useState([])

    useEffect(() => {
        if (selectedId !== '') {
            axios.get(`http://localhost:4000/tripcase/${selectedId}`,
                {headers: {Authorization: "Bearer " + localStorage.getItem('jwt')}})
                .then((res)=>{
                    setTemperatureIndicators(res.data.temperatureIndicators)
                }).catch((err)=>{
                    toast.error(err.response.data.error)
            })
        }
    }, [selectedId])

    return (
        <div className={styles.container}>
            <div className={styles.tripCases}>
                <TripCaseShort/>
                {props.tripCases.map((elem) => {
                    return (
                        <TripCaseShort tripCase={elem} clickHandler={() => {
                            setSelectedId(elem.tripCaseId)
                        }}/>
                    )
                })}
            </div>
            <div className={styles.temperatureIndicators}>
                <TemperatureIndicator/>
                {temperatureIndicators.map((elem) => {
                    return (
                        <TemperatureIndicator temperatureIndicator={elem}/>
                    )
                })}
            </div>
        </div>
    )
}