import { useState, useEffect } from "react";
import axios from  'axios';
import { MainContent } from "./MainContent";
import { Sidebar } from "./Sidebar";
import { type ChatProps } from "../../data/chats";


export function Layout() {
    const [selectedChat, setSelectedChat] = useState<ChatProps | null>(null);
    const [chats, setChats] = useState<ChatProps[]>([]);
    const [activeTab, setActiveTab] = useState("chats");

    useEffect(() => {
        const fetchChats = async () => {
            try {
                const token = localStorage.getItem('token');

                const response = await axios.get(
                    'http://localhost:3000/api/chats',
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setChats(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchChats();
    }, [])

    return (
        
        <div className="flex relative p-0 md:p-2 h-screen w-screen overflow-hidden bg-[url('/images/bg-image.jpg')] bg-cover bg-center bg-no-repeat" > 
            
            <Sidebar 
                onSelect={setSelectedChat} 
                selectedChat={selectedChat} 
                activeTab={activeTab}
                onTabChange={setActiveTab}
                chats={chats}
            />
            
            <MainContent 
                selectedChat={selectedChat} 
                onBack={() => setSelectedChat(null)}
            />

        </div>
    )
}