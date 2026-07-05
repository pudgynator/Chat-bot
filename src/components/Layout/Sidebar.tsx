import { ChatTab } from "../../ChatList/ChatTab";
import { SearchBar } from "../../ChatList/SearchBar";
import { ChatList } from "../../ChatList/ChatList";
import { useState } from "react";
import { type ChatProps } from "../../data/chats";
import { Contacts } from "../../ChatList/Contacts";
import { Calls } from "../../ChatList/Calls";
import { Settings } from "../../ChatList/Settings";

type SidebarProps = {
    onSelect: (chat: ChatProps) => void;
    selectedChat: ChatProps | null;
    activeTab: string;
    onTabChange: (tabID: string) => void;
    chats: ChatProps[];
}

export function Sidebar({ onSelect, selectedChat, activeTab, onTabChange, chats }: SidebarProps) {
    const [search, setSearch] = useState("");

    const title = activeTab === 'chats' 
        ? 'Chats'
        : activeTab === 'contacts'
            ? 'Contacts'
            : activeTab === 'calls'
                ? 'Recent Calls'
                : activeTab === 'settings'
                    ? 'Settings'
                    : '';

    const filteredChats = chats.filter(chat => 
        chat.name
            .toLowerCase()
            .includes(search.toLowerCase())
    )

    return (
        <aside className={`flex flex-col h-full w-full bg-white px-0.5 flex-shrink-0
            md:rounded-2xl md:translate-x-0 md:w-[350px] md:min-w-[300px] md:static
            transition-transform duration-300 ease-in-out
            ${selectedChat ? "-translate-x-full" : "translate-x-0"}
             
        `}>
            <div className="flex item-center justify-center py-4">
                <span className="text-sm text-zinc-900">{title}</span>
            </div>
            { activeTab !== 'calls' ? <SearchBar onSearch={setSearch} activeTab={activeTab}/> : null }
            {activeTab === 'chats' 
                ?    <ChatList  filteredChats={filteredChats} onSelect={onSelect} selectedChat={selectedChat}/>
                :    activeTab === 'contacts' 
                    ?  <Contacts onSelect={onSelect} chats={filteredChats} selectedChat={selectedChat}/> 
                    : activeTab === 'calls' 
                        ? <Calls/> 
                        : activeTab === 'settings'
                            ? <Settings/>
                            : null 
            }
            <ChatTab 
                activeTab={activeTab}
                onTabChange={onTabChange}
            />
        </aside>
    )
}