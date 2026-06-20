//import { ChatList } from "../../ChatList/ChatList";

import { ChatTab } from "../../ChatList/ChatTab";


export function Sidebar() {
    return (
        <aside className="flex flex-col h-full w-[350px] min-w-[300px] flex-shrink-0 bg-white ">
            <ChatTab />

        </aside>
    )
}