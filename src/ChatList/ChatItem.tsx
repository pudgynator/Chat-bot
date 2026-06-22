
type ChatItemProps = {
    chat: {
        id: string;
        name: string;
        lastMessage: string;
        time?: string;
        avatar?: string;    
    };
    onSelect: (id: string) => void;
    selectedChat: string | null;
}

export function ChatItem({ chat, onSelect, selectedChat }: ChatItemProps) {

    return (
        <button
            onClick={() => onSelect(chat.id)}
            className={`
                flex items-start gap-2 w-full px-2 py-2 border-t border-b border-zinc-100 text-left
                ${selectedChat === chat.id 
                    ? 'bg-[#454545] rounded-2xl text-white' 
                    : 'bg-white'
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
                        ${selectedChat === chat.id 
                        ? 'text-white' 
                        : 'text-zinc-900'}
                    `}
                    >
                        {chat.name}
                    </span>

                    <span className={`flex text-xs 
                        ${selectedChat === chat.id 
                            ? 'text-white' 
                            : 'text-zinc-400'}
                    `}>
                        {chat.time}
                    </span>
                </div>

                <p className={`text-sm  truncate
                    ${selectedChat === chat.id 
                        ? 'text-white' 
                        : 'text-zinc-400'}
                `}>
                    {chat.lastMessage}
                </p>
            </div>
    </button>
    )
}