import './App.css';
import { Routes, Route } from "react-router-dom";
import Registration from "./assets/Pages/Auth/Register.tsx";
import Login from "./assets/Pages/Auth/Login.tsx";

function App() {
    return (
        <Routes>
            <Route path="/register/" element={<Registration />} />
            <Route path="/login/" element={<Login />} />
        </Routes>
    );
}

export default App;
