import { ChatItem } from "./ChatItem";
import { type ChatProps } from '../types/Chats'

type ChatListProps = {
    onSelect: (chatID: ChatProps) => void;
    selectedChat: ChatProps | null;
    filteredChats: ChatProps[];
}

export function ChatList({ onSelect, selectedChat, filteredChats  }: ChatListProps) {

    return (
        <div className="flex flex-1 flex-col">
            {filteredChats.map(chat => (
                    <ChatItem
                        onSelect={onSelect}
                        selectedChat={selectedChat}
                        key={chat.id}
                        chat={chat}
                    />
                )
            )}
        </div>
    )
}