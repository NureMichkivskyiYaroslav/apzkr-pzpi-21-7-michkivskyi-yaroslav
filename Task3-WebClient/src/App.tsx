import { Routes, Route } from "react-router-dom";
import Registration from "./assets/Pages/Auth/Register.tsx";
import Login from "./assets/Pages/Auth/Login.tsx";
import Main from "./assets/Pages/Main/Main.tsx";
import ClientPage from "./assets/Pages/EntityPages/ClientPage.tsx";
import DriverPage from "./assets/Pages/EntityPages/DriverPage.tsx";
import CasePage from "./assets/Pages/EntityPages/CasePage.tsx";
import TripPage from "./assets/Pages/EntityPages/TripPage.tsx";
import FridgePage from "./assets/Pages/EntityPages/FridgePage.tsx";
import AddTripPage from "./assets/Pages/AddTripPage/AddTripPage.tsx";

function App() {
    return (
        <Routes>
            <Route path="/register/" element={<Registration />} />
            <Route path="/login/" element={<Login />} />
            <Route path="/" element={<Main />} />
            <Route path="/client/:id" element={<ClientPage/>}/>
            <Route path="/driver/:id" element={<DriverPage/>}/>
            <Route path="/case/:id" element={<CasePage/>}/>
            <Route path="/trip/:id" element={<TripPage/>}/>
            <Route path="/fridge/:id" element={<FridgePage/>}/>
            <Route path="/add-trip" element={<AddTripPage/>}/>
        </Routes>
    );
}

export default App;
