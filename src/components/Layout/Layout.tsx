import { useState } from "react";
import { MainContent } from "./MainContent";
import { Sidebar } from "./Sidebar";
import { type ChatProps, chats } from "../../data/chats";


export function Layout() {
    const [selectedChat, setSelectedChat] = useState<ChatProps | null>(null);
    const [activeTab, setActiveTab] = useState("chats");
    return (
        
        <div className="flex relative p-0 md:p-2 h-screen w-screen overflow-hidden bg-[url('/images/bg-image.jpg')] bg-cover bg-center bg-no-repeat" > 
            
            <Sidebar 
                onSelect={setSelectedChat} 
                selectedChat={selectedChat} 
                activeTab={activeTab}
                onTabChange={setActiveTab}
                chats={chats}
            />
            
            <MainContent selectedChat={selectedChat} />

        </div>
    )
}