

type ChatItemProps = {
    chat: {
        id: string;
        name: string;
        lastMessage: string;
        time?: string;
        avatar?: string;    
    }
}

export function ChatItem({ chat }: ChatItemProps) {
    return (
        <button
            className="flex items-center gap-2 w-full px-1 py-0.5 border border-zinc-100 text-left"
        >
            <img
                src={chat.avatar ?? '/images/default-avatar.jpg'} 
                alt="user avatar" 
                className=" rounded-full w-18 h-18"
            />

            <div className="flex-1 min-w-0 justify-evenly">
                <div className="flex justify-between">
                    <span className="font-medium text-sm">
                        {chat.name}
                    </span>

                    <span className="flex text-xs text-zinc-400">
                        {chat.time}
                    </span>
                </div>

                <p className="text-sm text-zinc-400 truncate">
                    {chat.lastMessage}
                </p>
            </div>
    </button>
    )
}