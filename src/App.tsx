import axios from "axios";
import { Layout } from "./components/Layout/Layout";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RegisterPage } from "./pages/RegisterPage";

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
                <Route path="/" element={<Layout />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
