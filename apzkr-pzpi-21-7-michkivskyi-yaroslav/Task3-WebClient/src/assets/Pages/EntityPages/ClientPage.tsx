import PageFrame from "../../Components/PageFrame/PageFrame.tsx";
import styles from './EntityPages.module.css'
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {ClientI} from "../../../Interfaces/ClientI.ts";
import TripShort from "../../Components/EntitiesShort/TripShort.tsx";
import {TripShortI} from "../../../Interfaces/TripShortI.ts";

export default function ClientPage() {

    const id = useParams().id
    const [data, setData] = useState<ClientI>()

    useEffect(() => {
        axios.get(`http://localhost:4000/client/${id}`,
            {headers: {Authorization: "Bearer " + localStorage.getItem('jwt')}})
            .then((res) => {
                setData(res.data)
            })
    }, [])

    return (
        <PageFrame>
            <div className={styles.content}>
                <div className={styles.clientInfo}>
                    <div className={styles.infoBlock}>
                        Name:<br/>Login:<br/>Phone:
                    </div>
                    <div className={styles.infoBlock}>
                        {data?.client.name}<br/>
                        {data?.client.login}<br/>
                        {data?.client.phone}
                    </div>
                </div>
                <label className={styles.label}>Trips</label>
                <div className={styles.tripBlock}>
                    <TripShort/>
                    {data?.trips.map((elem:TripShortI)=>{
                        return(
                            <TripShort trip={elem}/>
                        )
                    })}
                </div>
            </div>
        </PageFrame>
    )
}