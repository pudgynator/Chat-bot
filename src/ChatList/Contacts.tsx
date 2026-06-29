import type { ChatProps } from "../data/chats";

export type ChatContactProps = {
    chats: ChatProps[];
    onSelect: (chatID: ChatProps) => void;
    selectedChat: ChatProps | null;
};

export function Contacts({ chats, onSelect, selectedChat }: ChatContactProps) {
    return (
        <div>
            {chats.map(chat => (
                <div 
                    className={`flex items-center  border-b border-zinc-100 gap-2 px-2 py-2 w-full
                        ${selectedChat === chat ? 'bg-[#454545] text-white rounded-2xl' : 'bg-white' }
                    `}
                    key={chat.id}
                    onClick={() => onSelect(chat)}
                >
                    <img
                            src={ chat.avatar ?? '/images/default-ava.jpg'} 
                            alt="User avatar" 
                            className=" rounded-full w-9 h-9 "
                    />
                    <button className="flex flex-col items-start gap-1">
                        <span className="text-sm leading-none">{chat.name}</span>
                        <span className={`text-xs leading-none  ${selectedChat === chat ? ' text-white' : 'text-zinc-500' }`}>online</span>
                    </button>
                </div>
            ))}
        </div>
    )
}