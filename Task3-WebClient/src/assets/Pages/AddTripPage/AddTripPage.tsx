import styles from './AddTripPage.module.css'
import PageFrame from "../../Components/PageFrame/PageFrame.tsx";
import {useEffect, useState} from "react";
import {ResourcesI} from "../../../Interfaces/ResourcesI.ts";
import axios from "axios";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

interface TripCase {
    caseId: string,
    filling: string,
    maxTemperature: number
}

export default function AddTripPage() {

    const [data, setData] = useState<ResourcesI>()
    const [driver, setDriver] = useState<string>()
    const [fridge, setFridge] = useState<string>()
    const [client, setClient] = useState<string>()
    const [tripCases, setTripCases] = useState<TripCase[]>([])
    const [finish, setFinish] = useState<string>()
    const nav = useNavigate()

    useEffect(() => {
        axios.get('http://localhost:4000/trip/resources',
            {headers: {Authorization: "Bearer " + localStorage.getItem('jwt')}})
            .then((res) => {
            setData(res.data)
        }).catch(err => {
            toast.error(err.response.data.error)
        })
    }, []);

    const handleCreateTrip = () => {
        if (!driver || !fridge || !client || tripCases.length === 0 || !finish) {
            console.log(driver, fridge, client, tripCases, finish)
            toast.error("Choose all fields");
            return;
        }

        axios.post('http://localhost:4000/trip/add', {
            driverId: driver,
            clientId: client,
            fridgeId: fridge,
            finishPlan: finish
        }, {
            headers: { Authorization: "Bearer " + localStorage.getItem('jwt') }
        }).then((res) => {
            const tripId = res.data._id;
            const promises = tripCases.map((tripCase) => {
                return axios.post('http://localhost:4000/tripcase/add', {
                    tripId,
                    caseId: tripCase.caseId,
                    filling: tripCase.filling,
                    maxTemperature: tripCase.maxTemperature
                }, {
                    headers: { Authorization: "Bearer " + localStorage.getItem('jwt') }
                });
            });

            Promise.all(promises).then(() => {
                nav('/');
            }).catch(err => {
                toast.error(err.response.data.error);
            });
        }).catch(err => {
            toast.error(err.response.data.error);
        });
    };

    const handleAddTripCase = () => {
        setTripCases([...tripCases, { caseId: '', filling: '', maxTemperature: 0 }]);
    };

    const handleRemoveTripCase = (index: number) => {
        const newTripCases = tripCases.filter((_, i) => i !== index);
        setTripCases(newTripCases);
    };

    const handleTripCaseChange = (index: number, field: string, value: string | number) => {
        const newTripCases = [...tripCases];
        newTripCases[index] = { ...newTripCases[index], [field]: value };
        setTripCases(newTripCases);
    };

    const getAvailableCases = (index: number) => {

        const selectedCaseIds = tripCases.map(tc => tc.caseId).filter((_id, i) => {
            return i !== index;
        });
        return data?.cases.filter(c => !selectedCaseIds.includes(c._id));
    };

    return (
        <PageFrame>
            <div className={styles.content}>
                {data ? (
                    <form className={styles.form}>
                        <div className={styles.field}>
                            <label htmlFor="driver">Driver:</label>
                            <select id="driver" value={driver} onChange={(e) => setDriver(e.target.value)}>
                                <option value="">Select Driver</option>
                                {data.drivers.map(driver => (
                                    <option key={driver._id} value={driver._id}>{driver.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className={styles.field}>
                            <label htmlFor="fridge">Fridge:</label>
                            <select id="fridge" value={fridge} onChange={(e) => setFridge(e.target.value)}>
                                <option value="">Select Fridge</option>
                                {data.fridges.map(fridge => (
                                    <option key={fridge._id} value={fridge._id}>{fridge.inventoryNumber}</option>
                                ))}
                            </select>
                        </div>

                        <div className={styles.field}>
                            <label htmlFor="client">Client:</label>
                            <select id="client" value={client} onChange={(e) => setClient(e.target.value)}>
                                <option value="">Select Client</option>
                                {data.clients.map(client => (
                                    <option key={client._id} value={client._id}>{client.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className={styles.field}>
                            <label htmlFor="finish">Finish Plan:</label>
                            <input
                                type="datetime-local"
                                id="finish"
                                value={finish}
                                onChange={(e) => setFinish(e.target.value)}
                            />
                        </div>

                        <h2>Trip Cases</h2>
                        {tripCases.map((tripCase, index) => (
                            <div key={index} className={styles.tripCase}>
                                <div className={styles.field}>
                                    <label htmlFor={`caseId-${index}`}>Case:</label>
                                    <select
                                        id={`caseId-${index}`}
                                        value={tripCase.caseId}
                                        onChange={(e) => handleTripCaseChange(index, 'caseId', e.target.value)}
                                    >
                                        <option value="">Select Case</option>
                                        {getAvailableCases(index)?.map(c => (
                                            <option key={c._id} value={c._id}>{c.inventoryNumber}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className={styles.field}>
                                    <label htmlFor={`filling-${index}`}>Filling:</label>
                                    <input
                                        type="text"
                                        id={`filling-${index}`}
                                        value={tripCase.filling}
                                        onChange={(e) => handleTripCaseChange(index, 'filling', e.target.value)}
                                    />
                                </div>
                                <div className={styles.field}>
                                    <label htmlFor={`maxTemperature-${index}`}>Max Temperature:</label>
                                    <input
                                        type="number"
                                        id={`maxTemperature-${index}`}
                                        value={tripCase.maxTemperature}
                                        onChange={(e) => handleTripCaseChange(index, 'maxTemperature', +e.target.value)}
                                    />
                                </div>
                                <button
                                    type="button"
                                    onClick={() => handleRemoveTripCase(index)}
                                    className={styles.removeButton}
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                        <button type="button" onClick={handleAddTripCase} className={styles.addButton}>Add Trip Case
                        </button>
                        <button type="button" onClick={handleCreateTrip} className={styles.createButton}>Create Trip
                        </button>
                    </form>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </PageFrame>
    )
}