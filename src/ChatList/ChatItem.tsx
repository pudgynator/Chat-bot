import type { ChatProps } from "../data/chats"; 

export type ChatItemProps = {
    chat: ChatProps;
    onSelect: (id: ChatProps) => void;
    selectedChat: ChatProps | null;
}

export function ChatItem({ chat, onSelect, selectedChat }: ChatItemProps) {

    return (
        <button
            onClick={() => onSelect(chat)}
            className={`
                flex items-start gap-2 w-full px-2 py-2 focus:outline-none text-left
                ${selectedChat === chat 
                    ? 'bg-[#454545] rounded-2xl text-white' 
                    : 'bg-white border-b border-zinc-100'
                }
            `}
        >
            <img
                src={chat.avatar ?? '/images/default-ava.jpg'} 
                alt="User avatar" 
                className=" rounded-full w-13 h-13"
            />

            <div className="flex-1 min-w-0">
                <div className="flex justify-between">
                    <span className={`font-medium text-sm
                        ${selectedChat === chat 
                        ? 'text-white' 
                        : 'text-zinc-900'}
                    `}
                    >
                        {chat.name}
                    </span>

                    <span className={`flex text-xs 
                        ${selectedChat === chat
                            ? 'text-white' 
                            : 'text-zinc-400'}
                    `}>
                        {chat.time}
                    </span>
                </div>

                <p className={`text-sm  truncate
                    ${selectedChat === chat 
                        ? 'text-white' 
                        : 'text-zinc-400'}
                `}>
                    {chat.lastMessage}
                </p>
            </div>
    </button>
    )
}