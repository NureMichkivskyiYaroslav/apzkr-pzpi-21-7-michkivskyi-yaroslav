import PageFrame from "../../Components/PageFrame/PageFrame.tsx";
import styles from './EntityPages.module.css'
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {CaseI} from "../../../Interfaces/CaseI.ts";
import TripCaseIndicators from "../../Components/TripCaseIndicators/TripCaseIndicators.tsx";
import EditorModal from "../../Components/EditorModal/EditorModal.tsx";
import {toast} from "react-toastify";

export default function CasePage() {

    const id = useParams().id
    const [data, setData] = useState<CaseI>()
    const nav = useNavigate()
    const [isEditorOpen, setIsEditorOpen] = useState(false)

    const handleDelete = () => {
        if (data?.tripCasesInfo.length !== 0) {
            toast.error("You can't delete case with trips")
        }
        else {
            axios.delete(`http://localhost:4000/case/${id}/delete`,
                {headers: {Authorization: "Bearer " + localStorage.getItem('jwt')}}).then(()=> {
                    toast.success('Deleted successfully')
                    nav('/')
                }
            ).catch((err)=>{
                toast.error(err.response.data.error)
            })
        }
    }

    useEffect(() => {
        axios.get(`http://localhost:4000/case/${id}`,
            {headers: {Authorization: "Bearer " + localStorage.getItem('jwt')}})
            .then((res) => {
                setData(res.data)
            })
    }, [])

    return (
        <PageFrame>
            {
                isEditorOpen&&
                <EditorModal entity={'case'} mod={'edit'} id={id} onClose={() => {
                    setIsEditorOpen(false)
                }}/>
            }
            <div className={styles.content}>
                <label className={styles.label}>Case info</label>
                <div className={styles.clientInfo}>
                    <div className={styles.infoBlock}>
                        Case IN:<br/>Capacity:
                    </div>
                    <div className={styles.infoBlockValues}>
                        {data?.case.inventoryNumber}<br/>
                        {data?.case.capacity}
                    </div>
                </div>
                <div className={styles.buttons}>
                    <button className={styles.edit} onClick={()=>{setIsEditorOpen(true)}}>Edit</button>
                    <button className={styles.delete} onClick={handleDelete}>Delete</button>
                </div>
                <label className={styles.label}>Trips</label>
                <div className={styles.tripBlock}>
                    <TripCaseIndicators tripCases={data?.tripCasesInfo||[]}/>
                </div>
            </div>
        </PageFrame>
    )
}