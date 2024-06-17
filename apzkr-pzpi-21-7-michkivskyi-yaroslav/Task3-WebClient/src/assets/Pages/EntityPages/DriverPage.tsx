import PageFrame from "../../Components/PageFrame/PageFrame.tsx";
import styles from './EntityPages.module.css'
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {DriverI} from "../../../Interfaces/DriverI.ts";
import {TripShortI} from "../../../Interfaces/TripShortI.ts";
import TripShort from "../../Components/EntitiesShort/TripShort.tsx";
import {toast} from "react-toastify";
import EditorModal from "../../Components/EditorModal/EditorModal.tsx";

export default function DriverPage() {

    const id = useParams().id
    const nav = useNavigate()
    const [data, setData] = useState<DriverI>()
    const [isEditorOpen, setIsEditorOpen] = useState(false)

    useEffect(() => {
        axios.get(`http://localhost:4000/driver/${id}`,
            {headers: {Authorization: "Bearer " + localStorage.getItem('jwt')}})
            .then((res) => {
                setData(res.data)
            })
    }, [])

    const handleDelete = () => {
        if (data?.trips.length !== 0) {
            toast.error("You can't delete driver with trips")
        }
        else {
            axios.delete(`http://localhost:4000/driver/${id}/delete`,
                {headers: {Authorization: "Bearer " + localStorage.getItem('jwt')}}).then(()=> {
                    toast.success('Deleted successfully')
                nav('/')
                }
            ).catch((err)=>{
                toast.error(err.response.data.error)
            })
        }
    }

    return (
        <PageFrame>
            {
                isEditorOpen&&
                <EditorModal entity={'driver'} mod={'edit'} id={id} onClose={() => {
                    setIsEditorOpen(false)
                }}/>
            }
            <div className={styles.content}>
                <label className={styles.label}>Driver info</label>
                <div className={styles.clientInfo}>
                    <div className={styles.infoBlock}>
                        Name:<br/>Phone:
                    </div>
                    <div className={styles.infoBlockValues}>
                        {data?.driver.name}<br/>
                        {data?.driver.phone}
                    </div>
                </div>
                <div className={styles.buttons}>
                    <button className={styles.edit} onClick={()=>{setIsEditorOpen(true)}}>Edit</button>
                    <button className={styles.delete} onClick={handleDelete}>Delete</button>
                </div>
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