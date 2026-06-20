import { ChatItem } from "./ChatItem";

type ChatListProps = {
    search: string;
}

const chats = [
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
];


export function ChatList({ search }: ChatListProps) {

    const filteredChats = chats.filter(chat => 
        chat.name
            .toLowerCase()
            .includes(search.toLowerCase())

    )

    return (
        <div className="flex flex-1 flex-col">
            {filteredChats.map(chat => (
                    <ChatItem
                        key={chat.id}
                        chat={chat}
                    />
                )
            )}
        </div>
    )
}