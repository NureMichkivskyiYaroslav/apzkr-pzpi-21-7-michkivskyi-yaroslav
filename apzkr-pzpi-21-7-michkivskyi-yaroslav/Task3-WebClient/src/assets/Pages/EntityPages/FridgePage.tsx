import PageFrame from "../../Components/PageFrame/PageFrame.tsx";
import styles from './EntityPages.module.css'
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {FridgeI} from "../../../Interfaces/FridgeI.ts";
import {TripShortI} from "../../../Interfaces/TripShortI.ts";
import TripShort from "../../Components/EntitiesShort/TripShort.tsx";
import {toast} from "react-toastify";
import EditorModal from "../../Components/EditorModal/EditorModal.tsx";
import formatDate from "../../../Utilities/formatDate.ts";
import {GoogleMap, LoadScript, Marker} from '@react-google-maps/api';

export default function FridgePage() {

    const id = useParams().id
    const nav = useNavigate()
    const [data, setData] = useState<FridgeI>()
    const [isEditorOpen, setIsEditorOpen] = useState(false)

    useEffect(() => {
        axios.get(`http://localhost:4000/fridge/${id}/get`,
            {headers: {Authorization: "Bearer " + localStorage.getItem('jwt')}})
            .then((res) => {
                setData(res.data)
            })
    }, [])

    const handleDelete = () => {
        if (data?.trips.length !== 0) {
            toast.error("You can't delete fridge with trips")
        } else {
            axios.delete(`http://localhost:4000/fridge/${id}/delete`,
                {headers: {Authorization: "Bearer " + localStorage.getItem('jwt')}}).then(() => {
                    toast.success('Deleted successfully')
                    nav('/')
                }
            ).catch((err) => {
                toast.error(err.response.data.error)
            })
        }
    }

    return (
        <PageFrame>
            {
                isEditorOpen &&
                <EditorModal entity={'fridge'} mod={'edit'} id={id} onClose={() => {
                    setIsEditorOpen(false)
                }}/>
            }
            <div className={styles.content}>
                <label className={styles.label}>Fridge info</label>
                <div className={styles.clientInfo}>
                    <div className={styles.infoBlock}>
                        Fridge IN:<br/>Last time online:
                    </div>
                    <div className={styles.infoBlockValues}>
                        {data?.fridge.inventoryNumber}<br/>
                        {data ? formatDate(data?.fridge.timestamp) : ''}
                    </div>
                </div>
                <div className={styles.buttons}>
                    <button className={styles.edit} onClick={() => {
                        setIsEditorOpen(true)
                    }}>Edit
                    </button>
                    <button className={styles.delete} onClick={handleDelete}>Delete</button>
                </div>
                <LoadScript googleMapsApiKey="AIzaSyA71Snk4y4KsxoAQSOOCRYKpm6NDxFiZwQ">
                    <GoogleMap
                        mapContainerStyle={{width: '800px', height: '400px', marginTop: '50px'}}
                        center={{
                            lat: data?Number(data?.fridge.location.coordinates[1]):0,
                            lng: data?Number(data?.fridge.location.coordinates[0]):0,
                        }}
                        zoom={10}
                    >
                        <Marker position={{
                            lat: data?Number(data?.fridge.location.coordinates[1]):0,
                            lng: data?Number(data?.fridge.location.coordinates[0]):0,
                        }}/>
                    </GoogleMap>
                </LoadScript>
                <label className={styles.label}>Trips</label>
                <div className={styles.tripBlock}>
                    <TripShort/>
                    {data?.trips.map((elem: TripShortI) => {
                        return (
                            <TripShort trip={elem}/>
                        )
                    })}
                </div>
            </div>
        </PageFrame>
    )
}