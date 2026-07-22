import { useState, useEffect } from "react";
import axios from  'axios';
import { MainContent } from "./MainContent";
import { Sidebar } from "./Sidebar";
import { type ChatProps } from "../../types/Chats";
import type { ContactProps } from "../../types/Contact";


export function Layout() {
    const [selectedChat, setSelectedChat] = useState<ChatProps | null>(null);
    const [selectedContactId, setSelectedContactId] = useState<string | null>(null);

    const [chats, setChats] = useState<ChatProps[]>([]);
    const [contacts, setContacts] = useState<ContactProps[]>([]);
    const [activeTab, setActiveTab] = useState("chats");

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

    const fetchContacts = async () => {
        try {
            const token = localStorage.getItem('token');

            const response = await axios.get(
                'http://localhost:3000/api/contacts',
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                }
            )

            setContacts(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        const loadData = async () => {
            await Promise.all([
                fetchChats(),
                fetchContacts(),
            ]);
        };
    
        loadData();
    }, [])

    const handleStartChat = async (contact: ContactProps) => {
        try {
            setSelectedContactId(contact.id);
        const token = localStorage.getItem('token');

        const response = await axios.post(
            "http://localhost:3000/api/chats",
            {
                userId: contact.id,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
        const chat = response.data;

        await fetchChats();

        setSelectedChat(chat);
        setActiveTab('chats');
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log(error.response?.data);
            }
        }
    }

    return (
        
        <div className="flex relative p-0 md:p-2 h-screen w-screen overflow-hidden bg-[url('/images/bg-image.jpg')] bg-cover bg-center bg-no-repeat" > 
            <Sidebar 
                onSelect={setSelectedChat} 
                selectedChat={selectedChat} 
                activeTab={activeTab}
                onTabChange={setActiveTab}
                chats={chats}
                contacts={contacts}
                onStartChat={handleStartChat}
                onContactCreated={fetchContacts}
                selectedContactId={selectedContactId}
            />
            
            <MainContent 
                selectedChat={selectedChat} 
                onBack={() => setSelectedChat(null)}
            />

        </div>
    )
}