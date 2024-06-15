import axios from "axios";
import { useState } from "react";
import styles from "./Login.module.css"
import { useNavigate } from "react-router-dom";

export default function Registration() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [secondName, setSecondName] = useState('');

  const nav = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('firstName: ', firstName);
    axios.post('http://localhost:8080/v1/register',
      {
        'firstName': firstName,
        'secondName': secondName,
        'email': email,
        'password': password
      }).then(() => {
      }).catch((err) => {
        console.log(err)
      })
  };

  return (
    <div className={styles.background}>
      <div className={styles.content}>
        <form onSubmit={handleSubmit}>
          <div className={styles.loginDiv}>
            <label htmlFor="registrationEmail">Электронна пошта:</label>
            <input
              type="email"
              id="registrationEmail"
              name="registrationEmail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={styles.loginDiv}>
            <label htmlFor="registrationPassword">Пароль:</label>
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
            <label htmlFor="registrationUsername">Ім'я користувача:</label>
            <input
              type="text"
              id="registrationUsername"
              name="registrationUsername"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className={styles.loginDiv}>
            <label htmlFor="registrationSecondName">Прізвище користувача:</label>
            <input
              type="text"
              id="registrationSecondName"
              name="registrationSecondName"
              value={secondName}
              onChange={(e) => setSecondName(e.target.value)}
              required
            />
          </div>
          <div>
            <button type="submit">Зареєструватися</button>
          </div>

          <p>Вже маєте акаунт?<br /> <a href="#!" onClick={() => { nav("/login") }}>Увійти</a></p>

        </form>
      </div>
    </div>
  );
}

