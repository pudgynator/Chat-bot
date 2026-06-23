import { useState } from "react";
import { MainContent } from "./MainContent";
import { Sidebar } from "./Sidebar";
import type { ChatProps } from "../../data/chats";


export function Layout() {
    const [selectedChat, setSelectedChat] = useState<ChatProps | null>(null);
    
    return (
        
        <div className="flex p-2 h-screen w-screen overflow-hidden bg-[url('/images/bg-image.jpg')] bg-cover bg-center bg-no-repeat" > 
            
            <Sidebar onSelect={setSelectedChat} selectedChat={selectedChat} />
            
            <MainContent selectedChat={selectedChat} />

        </div>
    )
}