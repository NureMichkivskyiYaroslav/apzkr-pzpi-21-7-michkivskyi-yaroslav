import styles from './EditorModal.module.css'
import axios from "axios";
import {toast} from "react-toastify";
import {useEffect, useState} from "react";

interface Props {
    entity: string,
    mod: string,
    onClose: Function,
    id?:string
}

const fields =[
    {
        entity:'driver',
        addFields:[
            {
                name:'name',
                type:'text',
                required:true
            },
            {
                name:'phone',
                type:'phone',
                required:true
            }
        ],
        editFields:[
            {
                name:'name',
                type:'text',
                required:false
            },
            {
                name:'phone',
                type:'phone',
                required:false
            }
        ]
    },
    {
        entity:'case',
        addFields:[
            {
                name:'capacity',
                type:'text',
                required:true
            },
            {
                name:'inventoryNumber',
                type:'text',
                required:true
            }
        ],
        editFields:[
            {
                name:'capacity',
                type:'text',
                required:false
            },
            {
                name:'inventoryNumber',
                type:'text',
                required:false
            }
        ]
    },
    {
        entity:'fridge',
        addFields:[
            {
                name:'inventoryNumber',
                type:'text',
                required:true
            },
            {
                name:'latitude',
                type:'number',
                required:true
            },
            {
                name:'longitude',
                type:'number',
                required:true
            }
        ],
        editFields:[
            {
                name:'inventoryNumber',
                type:'text',
                required:false
            }
        ]
    }
]

export default function EditorModal(props: Props) {

    const [formData, setFormData] = useState<{ [key: string]: any }>({});

    useEffect(() => {
        const entityFields = fields.find(field => field.entity === props.entity);
        if (entityFields) {
            const currentFields = props.mod === 'add' ? entityFields.addFields : entityFields.editFields;
            const initialFormData = currentFields.reduce((acc, field) => {
                acc[field.name] = '';
                return acc;
            }, {} as { [key: string]: any });
            setFormData(initialFormData);
        }
    }, [props.entity, props.mod]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = () => {

        const filteredFormData = Object.fromEntries(
            Object.entries(formData).filter(([_, value]) => value !== '')
        );

        if (props.mod === 'add') {
            axios.post(`http://localhost:4000/${props.entity}/add`,
                filteredFormData,
                {headers: {Authorization: "Bearer " + localStorage.getItem('jwt')}})
                .then(() => {
                    toast.success('Added successfully')
                    props.onClose
                }).catch((err) => {
                toast.error(err.response.data.error)
            })
        }
        else {
            axios.patch(`http://localhost:4000/${props.entity}/${props.id}/edit`,
                filteredFormData,
                {headers: {Authorization: "Bearer " + localStorage.getItem('jwt')}})
                .then(()=>{
                    toast.success('Edited successfully')
                    props.onClose
                }).catch((err)=>{
                toast.error(err.response.data.error)
            })
        }

    }

    const entityFields = fields.find(field => field.entity === props.entity);
    const currentFields = entityFields ? (props.mod === 'add' ? entityFields.addFields : entityFields.editFields) : [];


    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <form className={styles.form}
                    onSubmit={handleSubmit}>
                    {currentFields.map((field, index) => (
                        <div key={index} className={styles.inputDiv}>
                            <label htmlFor={field.name}>{field.name.charAt(0).toUpperCase() + field.name.slice(1)}:</label>
                            <input
                                className={styles.input}
                                type={field.type}
                                id={field.name}
                                name={field.name}
                                value={formData[field.name] || ''}
                                onChange={handleChange}
                                required={field.required || false}
                            />
                        </div>
                    ))}
                    <div>
                        <button className={styles.submitButton} type="submit">{props.mod}</button>
                    </div>
                </form>
                <span className={styles.close} onClick={()=>{
                    console.log('111')
                    props.onClose()
                }}>&times;</span>
            </div>
        </div>
    )

}