//import { ChatList } from "../../ChatList/ChatList";

import { ChatTab } from "../../ChatList/ChatTab";
import { SearchBar } from "../../ChatList/SearchBar";
import { ChatList } from "../../ChatList/ChatList";
import { useState } from "react";



export function Sidebar() {
    const [search, setSearch] = useState("");

    return (
        <aside className="flex flex-col h-full w-[350px] min-w-[300px] flex-shrink-0 bg-white ">
            <div className="flex item-center justify-center py-2">
                <span className="text-sm text-zinc-900">Chats</span>
            </div>
            <SearchBar onSearch={setSearch}/>
            <ChatList search={search} />
            <ChatTab />

        </aside>
    )
}