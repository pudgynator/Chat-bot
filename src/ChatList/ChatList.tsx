import { ChatItem } from "./ChatItem";
import { chats, type ChatProps } from '../data/chats'


type ChatListProps = {
    search: string;
    onSelect: (chatID: ChatProps) => void;
    selectedChat: ChatProps | null;
}

export function ChatList({ search, onSelect, selectedChat }: ChatListProps) {

    const filteredChats = chats.filter(chat => 
        chat.name
            .toLowerCase()
            .includes(search.toLowerCase())
    )

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