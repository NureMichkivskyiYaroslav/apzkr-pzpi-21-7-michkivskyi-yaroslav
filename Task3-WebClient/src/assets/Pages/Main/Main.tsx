import styles from './Main.module.css'
import PageFrame from "../../Components/PageFrame/PageFrame.tsx";
import {ReactNode, useEffect, useState} from "react";
import axios from "axios";
import {TripShortI} from "../../../Interfaces/TripShortI.ts";
import {DriverShortI} from "../../../Interfaces/DriverShortI.ts";
import {CaseShortI} from "../../../Interfaces/CaseShortI.ts";
import {FridgeI} from "../../../Interfaces/FridgeI.ts";
import {ClientShortI} from "../../../Interfaces/ClientShortI.ts";
import TripShort from "../../Components/EntitiesShort/TripShort.tsx";
import CaseShort from "../../Components/EntitiesShort/CaseShort.tsx";
import ClientShort from "../../Components/EntitiesShort/ClientShort.tsx";
import DriverShort from "../../Components/EntitiesShort/DriverShort.tsx";
import FridgeShort from "../../Components/EntitiesShort/FridgeShort.tsx";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import EditorModal from "../../Components/EditorModal/EditorModal.tsx";


export default function Main() {

    const [selectedEntity, setSelectedEntity] = useState('trip')
    const [htmlData, setHtmlData] = useState<ReactNode>(<div className={styles.dataBlock}></div>)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const nav = useNavigate()

    useEffect(() => {
        axios.get(`http://localhost:4000/${selectedEntity}/all`,
            {headers: {Authorization: "Bearer " + localStorage.getItem('jwt')}})
            .then((res) => {
                console.log()
                switch (selectedEntity) {
                    case 'trip': {
                        setHtmlData(
                            <div className={styles.dataBlock}>
                                <button className={styles.add} onClick={()=>{nav('/add-trip')}}>Add new trip</button>
                                <TripShort/>
                                {res.data.map((elem: TripShortI) => {
                                    return (<TripShort trip={elem}/>)
                                })}
                            </div>
                        )
                        break;
                    }
                    case 'client': {
                        setHtmlData(
                            <div className={styles.dataBlock}>
                                <ClientShort/>
                                {res.data.map((elem: ClientShortI) => {
                                    return (<ClientShort client={elem}/>)
                                })}
                            </div>
                        )
                        break;
                    }
                    case 'driver': {
                        setHtmlData(
                            <div className={styles.dataBlock}>
                                <button className={styles.add} onClick={() => {
                                    setIsModalOpen(true)
                                }}>Add new driver
                                </button>
                                <DriverShort/>
                                {res.data.map((elem: DriverShortI) => {
                                    return (<DriverShort driver={elem}/>)
                                })}
                            </div>
                        )
                        break;
                    }
                    case 'fridge': {
                        setHtmlData(
                            <div className={styles.dataBlock}>
                                <button className={styles.add} onClick={() => {
                                    setIsModalOpen(true)
                                }}>Add new fridge
                                </button>
                                <FridgeShort/>
                                {res.data.sort().map((elem: FridgeI) => {
                                    return (<FridgeShort fridge={elem}/>)
                                })}
                            </div>
                        )
                        break;
                    }
                    case 'case': {
                        setHtmlData(
                            <div className={styles.dataBlock}>
                                <button className={styles.add} onClick={() => {
                                    setIsModalOpen(true)
                                }}>Add new case
                                </button>
                                <CaseShort/>
                                {res.data.map((elem: CaseShortI) => {
                                    return (<CaseShort case={elem}/>)
                                })}
                            </div>
                        )
                        break;
                    }
                    default:
                        break;
                }
            }).catch((err) => {
            console.log(err)
        })
    }, [selectedEntity])

    const exportHandler = () => {
        axios.get(`http://localhost:4000/admin/export`,
            {headers: {Authorization: "Bearer " + localStorage.getItem('jwt')}})
            .then(() => {
                toast.success('Backup created successfully')
            }).catch((err) => {
            toast.error(err.response.data.error)
        })
    }

    const importHandler = () => {
        axios.get(`http://localhost:4000/admin/import`,
            {headers: {Authorization: "Bearer " + localStorage.getItem('jwt')}})
            .then(() => {
                toast.success('Database imported successfully')
            }).catch((err) => {
            toast.error(err.response.data.error)
        })
    }

    return (
        <PageFrame>
            {
                isModalOpen &&
                <EditorModal entity={selectedEntity} mod={'add'} onClose={() => {
                    setIsModalOpen(false)
                }}></EditorModal>
            }
            <div className={styles.actions}>
                <div className={styles.action} onClick={() => {
                    localStorage.removeItem('jwt')
                    nav('/login')
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                         stroke="currentColor" className="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                              d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"/>
                    </svg>
                    <label>
                        Log Out
                    </label>
                </div>
                <div className={styles.action} onClick={exportHandler}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                         stroke="currentColor" className="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                              d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"/>
                    </svg>
                    <label>
                        Export DB
                    </label>
                </div>
                <div className={styles.action} onClick={importHandler}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                         stroke="currentColor" className="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                              d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"/>
                    </svg>
                    <label>
                        Import DB
                    </label>
                </div>
            </div>
            <div className={styles.entities}>
                <div className={styles.entityBlock}>
                    <div className={styles.entity} onClick={() => {
                        setSelectedEntity('trip')
                    }}>
                        Trips
                    </div>
                    <div className={styles.entity} onClick={() => {
                        setSelectedEntity('client')
                    }}>
                        Clients
                    </div>
                    <div className={styles.entity} onClick={() => {
                        setSelectedEntity('fridge')
                    }}>
                        Fridges
                    </div>
                    <div className={styles.entity} onClick={() => {
                        setSelectedEntity('driver')
                    }}>
                        Drivers
                    </div>
                    <div className={styles.entity} onClick={() => {
                        setSelectedEntity('case')
                    }}>
                        Cases
                    </div>
                </div>
                {htmlData}
            </div>
        </PageFrame>
    )
}