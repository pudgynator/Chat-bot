import axios from "axios";
import { Layout } from "./components/Layout/Layout";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { RegisterPage } from "./pages/RegisterPage";
import { LoginPage } from "./pages/LoginPage";
import { ProtectedRoute } from "./components/ProtectedRoute";

function App() {
    const fetchAPI = async () => {
        try {
            const response = await axios.get(`${import.meta.env['VITE_API_URL']}/api`);
            console.log(response.data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        fetchAPI();
    }, [])

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/register" element={<RegisterPage/>}/>
                <Route path="/login" element={<LoginPage />} />
                <Route element={<ProtectedRoute />}>
                    <Route path="/chat" element={<Layout />} />
                </Route>
                <Route path="/" element={<Navigate to='/login'/>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
