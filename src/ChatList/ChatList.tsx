import { getHours, getMinutes } from "date-fns";
import { ChatItem } from "./ChatItem";

type ChatListProps = {
    search: string;
    onSelect: (chatID: string) => void;
    selectedChat: string | null;
}

type ChatProps = {
    id: string;
    name: string;
    lastMessage: string;
    time: string;
    avatar?: string; 
}

const hours = getHours(new Date());
const minutes = getMinutes(new Date())

const chats: ChatProps[] = [
    {
        id: '1',
        name: "Maria",
        lastMessage: "Hi!",
        time: "12:30",
    },
    {
        id: '2',
        name: "Alex",
        lastMessage: "See you",
        time: "11:20",
    },
    {
        id: '3',
        name: "Help Bot",
        lastMessage: "How can I help you?",
        time: `${hours}:${minutes}`,
        avatar: `images/bot-ava.jpg`
    },
];


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