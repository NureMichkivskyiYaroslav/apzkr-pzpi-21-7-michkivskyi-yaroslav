import axios from "axios";
import React, {useState} from "react";
import styles from "./Login.module.css"
import {useNavigate} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

export default function Registration() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const nav = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        axios.post('http://localhost:4000/admin/register',
            {
                'name': name,
                'login': login,
                'password': password
            }).then((resp) => {
            nav('/login')
            console.log(resp.data)
        }).catch((err) => {
            toast.error(String(err.response.data.error))
        })
    };

    return (
        <div className={styles.modal}>
            <ToastContainer theme={"colored"}/>
            <div className={styles.content}>
                <form onSubmit={handleSubmit} lang='en'>
                    <div className={styles.loginDiv}>
                        <label htmlFor="registrationLogin">Login:</label>
                        <input
                            type="text "
                            id="registrationLogin"
                            name="registrationLogin"
                            value={login}
                            onChange={(e) => setLogin(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.loginDiv}>
                        <label htmlFor="registrationPassword">Password:</label>
                        <input
                            type="password"
                            id="registrationPassword"
                            name="registrationPassword"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.loginDiv}>
                        <label htmlFor="registrationUsername">Name:</label>
                        <input
                            type="text"
                            id="registrationUsername"
                            name="registrationUsername"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <button type="submit">Sign up</button>
                    </div>

                    <p>Already have an account?<br/> <a href="#!" onClick={() => {
                        nav("/login")
                    }}>Log in</a></p>
                </form>
            </div>
        </div>
    );
}

