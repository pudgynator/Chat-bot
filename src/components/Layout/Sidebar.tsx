import { ChatTab } from "../../ChatList/ChatTab";
import { SearchBar } from "../../ChatList/SearchBar";
import { ChatList } from "../../ChatList/ChatList";
import { useState } from "react";
import { type ChatProps, chats } from "../../data/chats";
import { Contacts } from "../../ChatList/Contacts";

type SidebarProps = {
    onSelect: (chat: ChatProps) => void;
    selectedChat: ChatProps | null;
    activeTab: string;
    onTabChange: (tabID: string) => void;
}

export function Sidebar({ onSelect, selectedChat, activeTab, onTabChange }: SidebarProps) {
    const [search, setSearch] = useState("");
    const title = activeTab === 'chats' 
        ? 'Chats'
        : activeTab === 'contacts'
            ? 'Contacts'
            : '';
    return (
        <aside className="flex flex-col h-full w-[350px] min-w-[300px] flex-shrink-0 bg-white px-1 rounded-2xl">
            <div className="flex item-center justify-center py-2">
                <span className="text-sm text-zinc-900">{title}</span>
            </div>
            <SearchBar onSearch={setSearch}/>
            {activeTab === 'chats' 
                ?    <ChatList  search={search} onSelect={onSelect} selectedChat={selectedChat}/>
                :    activeTab === 'contacts' 
                    ?  <Contacts chat={chats} /> 
                    : null
            }
            <ChatTab 
            activeTab={activeTab}
            onTabChange={onTabChange}
        />
        </aside>
    )
}