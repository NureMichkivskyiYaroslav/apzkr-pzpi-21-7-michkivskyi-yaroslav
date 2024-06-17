import PageFrame from "../../Components/PageFrame/PageFrame.tsx";
import styles from './EntityPages.module.css'
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {TripI} from "../../../Interfaces/TripI.ts";
import TripCaseIndicators from "../../Components/TripCaseIndicators/TripCaseIndicators.tsx";
import {toast} from "react-toastify";
import formatDate from "../../../Utilities/formatDate.ts";

export default function TripPage() {

    const id = useParams().id
    const [data, setData] = useState<TripI>()
    const nav = useNavigate()

    const handleFinish = () => {
        axios.patch(`http://localhost:4000/trip/${id}/finish`, {},
            {headers: {Authorization: "Bearer " + localStorage.getItem('jwt')}}).then(() => {
                toast.success('Trip finished')
            }
        ).catch((err) => {
            console.log(localStorage.getItem('jwt'))
            toast.error(err.response.data.error)
        })
    }

    useEffect(() => {
        axios.get(`http://localhost:4000/trip/${id}`,
            {headers: {Authorization: "Bearer " + localStorage.getItem('jwt')}})
            .then((res) => {
                setData(res.data)
            })
    }, [])

    return (
        <PageFrame>
            <div className={styles.content}>
                <label className={styles.label}>Trip info</label>
                <div className={styles.clientInfo}>
                    <div className={styles.infoBlock}>
                        Status:<br/>
                        Start:<br/>
                        Finish (plan):<br/>
                        Finish (fact):<br/>
                        Driver name:<br/>
                        Driver phone:<br/>
                        Fridge IN:<br/>
                        Client name:<br/>
                        Client phone:<br/>
                    </div>
                    <div className={styles.infoBlockValues}>
                        {data?.trip.status}<br/>
                        {data ? formatDate(data?.trip.start) : ""}<br/>
                        {data ? formatDate(data?.trip.finishPlan) : ""}<br/>
                        {data?.trip.finishFact ? formatDate(data?.trip.finishFact) : "Not finished yet"}<br/>
                        <a onClick={() => {
                            nav('/driver/' + data?.driver._id)
                        }}>{data?.driver.name}</a><br/>
                        {data?.driver.phone}<br/>
                        <a onClick={() => {
                            nav('/fridge/' + data?.fridge._id)
                        }}>{data?.fridge.inventoryNumber}</a><br/>
                        <a onClick={() => {
                            nav('/client/' + data?.client._id)
                        }}>{data?.client.name}</a><br/>
                        {data?.client.phone}
                    </div>
                </div>
                {
                    data?.trip.status === 'started' &&
                    <button className={styles.finish} onClick={() => {
                        handleFinish()
                    }}>Finish trip
                    </button>
                }
                <label className={styles.label}>Cases</label>
                <div className={styles.tripBlock}>
                    <TripCaseIndicators tripCases={data?.tripCasesInfo || []}/>
                </div>
            </div>
        </PageFrame>
    )
}