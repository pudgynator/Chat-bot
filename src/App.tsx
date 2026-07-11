import axios from "axios";
import { Layout } from "./components/Layout/Layout";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { RegisterPage } from "./pages/RegisterPage";
import { LoginPage } from "./pages/LoginPage";

function App() {
    const fetchAPI = async () => {
        const response = await axios.get("http://localhost:3000/api");
        console.log(response.data);
    };

    useEffect(() => {
        fetchAPI();
    }, [])

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/register" element={<RegisterPage/>}/>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/chat" element={<Layout />} />
                <Route path="/" element={<Navigate to='/login'/>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
