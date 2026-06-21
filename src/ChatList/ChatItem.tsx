import { ChatBody } from "../Chat/ChatBody";


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
            className="flex items-start gap-2 w-full px-4 py-2 border border-zinc-100 text-left"
            onClick={ChatBody}
        >
            <img
                src={chat.avatar ?? '/images/default-ava.jpg'} 
                alt="user avatar" 
                className=" rounded-full w-12 h-12"
            />

            <div className="flex-1 min-w-0">
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