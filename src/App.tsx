import axios from "axios";
import { Layout } from "./components/Layout/Layout";
import { useEffect } from "react";

function App() {
    const fetchAPI = async () => {
        const response = await axios.get("http://localhost:3000/api");
        console.log(response.data);
    };

    useEffect(() => {
        fetchAPI();
    }, [])

    return <Layout />;
}

export default App;
