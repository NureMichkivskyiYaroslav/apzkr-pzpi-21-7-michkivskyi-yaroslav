import axios from "axios";
import {useState} from "react";
import styles from "./Login.module.css"
import {useNavigate} from "react-router-dom";
import {ToastContainer, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const nav = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        axios.post('http://localhost:4000/admin/login',
            {'login': login, 'password': password}).then((resp) => {
                localStorage.setItem('jwt', resp.data.token)
                nav('/')
            }
        ).catch((err)=>{
            toast.error(String(err.response.data.error))
        })
    }

    return (
        <div className={styles.modal}>
            <ToastContainer theme={"colored"}/>
            <div className={styles.content}>
                <form onSubmit={handleSubmit} lang='en'>
                    <div className={styles.loginDiv}>
                        <label htmlFor="loginLogin">Login:</label>
                        <input
                            type="text"
                            id="loginLogin"
                            name="loginLogin"
                            value={login}
                            onChange={(e) => setLogin(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.loginDiv}>
                        <label htmlFor="loginPassword">Password:</label>
                        <input
                            type="password"
                            id="loginPassword"
                            name="loginPassword"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <button type="submit">Log in</button>
                    </div>

                    <p>No account?<br/> <a href="#!" onClick={() => {
                        nav("/register")
                    }}>Registration</a></p>

                </form>
            </div>
        </div>
    );
}
