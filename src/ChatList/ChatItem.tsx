import type { ChatProps } from "../types/Chats"; 
import { formatTime } from "../utils/formatTime";

export type ChatItemProps = {
    chat: ChatProps;
    onSelect: (chat: ChatProps) => void;
    selectedChat: ChatProps | null;
    currentUserId: string;
}

export function ChatItem({ chat, onSelect, selectedChat, currentUserId }: ChatItemProps) {
    const isMyLastMessage = Boolean(
        chat.lastMessageSender &&
        currentUserId &&
        String(chat.lastMessageSender) === String(currentUserId)
    );
    const formattedTime = formatTime(chat.updatedAt);
    return (
        <button
            onClick={() => onSelect(chat)}
            className={`
                flex items-center gap-2 w-full px-2 py-2 focus:outline-none text-left
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

                    {formattedTime && (
                        <span className={`flex text-xs 
                            ${selectedChat === chat
                                ? 'text-white' 
                                : 'text-zinc-400'}
                        `}>
                            {formattedTime}
                        </span>
                    )}
                </div>

                <p className={`flex flex-col text-sm truncate
                    ${selectedChat === chat 
                        ? 'text-white' 
                        : 'text-zinc-400'}
                `}>
                    {chat.lastMessage ? (
                        <>
                            {isMyLastMessage && <span className="font-medium text-zinc-500">You</span>}
                            {chat.lastMessage}
                        </> 
                    ) : (
                        'No messages yet'
                    )}
                </p>
            </div>
    </button>
    )
}