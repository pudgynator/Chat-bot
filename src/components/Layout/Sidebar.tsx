
import { ChatTab } from "../../ChatList/ChatTab";
import { SearchBar } from "../../ChatList/SearchBar";
import { ChatList } from "../../ChatList/ChatList";
import { useState } from "react";

type SidebarProps = {
    onSelect: (chatID: string) => void;
    selectedChat: string | null;
}

export function Sidebar({ onSelect, selectedChat }: SidebarProps) {
    const [search, setSearch] = useState("");

    return (
        <aside className="flex flex-col h-full w-[350px] min-w-[300px] flex-shrink-0 bg-white px-1 rounded-2xl">
            <div className="flex item-center justify-center py-2">
                <span className="text-sm text-zinc-900">Chats</span>
            </div>
            <SearchBar onSearch={setSearch}/>
            <ChatList  search={search} onSelect={onSelect} selectedChat={selectedChat}/>
            <ChatTab />

        </aside>
    )
}