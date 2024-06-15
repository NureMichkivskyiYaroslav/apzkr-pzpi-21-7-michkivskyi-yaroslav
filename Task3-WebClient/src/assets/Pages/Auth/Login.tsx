import axios from "axios";
import { useState } from "react";
import styles from "./Login.module.css"
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const nav = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios.post('http://localhost:4000/v1/login',
      { 'email': email, 'password': password }).then((resp) => {
        localStorage.setItem('jwt', resp.data.token)
      })
  }

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <form onSubmit={handleSubmit}>
          <div className={styles.loginDiv}>
            <label htmlFor="loginEmail">Электронна пошта:</label>
            <input
              type="email"
              id="loginEmail"
              name="loginEmail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={styles.loginDiv}>
            <label htmlFor="loginPassword">Пароль:</label>
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
            <button type="submit">Увійти</button>
          </div>

          <p>Немає аккаунту?<br /> <a href="#!" onClick={() => { nav("/register") }}>Зареєструйся</a></p>

        </form>
      </div>
    </div >
  );
}
