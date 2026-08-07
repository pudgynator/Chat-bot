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
                `${import.meta.env['VITE_API_URL']}/api/chats`,
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
                `${import.meta.env['VITE_API_URL']}/api/contacts`,
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
            const isExist = chats.find((c) => {
                return c.members?.some((m) => {
                    const memberId = typeof m === 'object' && m !== null ?  m.id : m;
                    return String(memberId) === String(contact.id);
                })
            })

            if (isExist) {
                setSelectedChat({
                    ...isExist,
                    id: isExist._id || isExist.id,
                    name: isExist.name || contact.name,
                    lastSeen: isExist.lastSeen || contact.lastSeen,
                });
                setActiveTab('chats');
                return;
            }

            const response = await axios.post(
                `${import.meta.env['VITE_API_URL']}/api/chats`,
                {
                    userId: contact.id,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )

            const chat = {
                ...response.data,
                id: response.data._id || response.data.id,
                _id: response.data._id || response.data.id,
                name: contact.name,
                lastSeen: contact.lastSeen,
            };

            await fetchChats();

            setSelectedChat(chat);
            setActiveTab('chats');
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log(error.response?.data);
            }
        }
    }

    const handleCreateGroup = async (groupName: string, memberIds: string[]): Promise<boolean> => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                `${import.meta.env['VITE_API_URL']}/api/chats/group`,
                { 
                    name: groupName, 
                    members: memberIds,
                },
                { 
                    headers: { 
                        Authorization: `Bearer ${token}` 
                    } ,
                }
            );
            const newGroup = response.data;
            setChats((prev) => [newGroup, ...prev]);
            setSelectedChat(newGroup);
            setActiveTab("chats");
            return true;
        } catch (error) {
            console.error("Failed to create group:", error);
            return false;
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
                onCreateGroup={handleCreateGroup}
            />
            
            <MainContent 
                selectedChat={selectedChat} 
                onBack={() => setSelectedChat(null)}
            />

        </div>
    )
}