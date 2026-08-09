import { ChatItem } from "./ChatItem";
import { type ChatProps } from '../types/Chats'
import { jwtDecode  } from "jwt-decode";
import type { JwtPayload } from "../Chat/Chat";
import type { ContactProps } from "../types/Contact";

type ChatListProps = {
    onSelect: (chatID: ChatProps) => void;
    selectedChat: ChatProps | null;
    filteredChats: ChatProps[];
    contacts: ContactProps[];
}

export function ChatList({ onSelect, selectedChat, filteredChats, contacts }: ChatListProps) {
    const token = localStorage.getItem('token')
    const currentUserId =  token ? jwtDecode<JwtPayload>(token).userId : "";
    return (
        <div className="flex flex-1 flex-col px-1">
            {filteredChats.map(chat => (
                    <ChatItem
                        currentUserId={currentUserId}
                        onSelect={onSelect}
                        selectedChat={selectedChat}
                        key={chat.id}
                        chat={chat}
                        contacts={contacts}
                    />
                )
            )}
        </div>
    )
}