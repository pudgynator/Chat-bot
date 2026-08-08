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
    const isGroup = chat.isGroup;

    const member = !isGroup ? chat.members!.find((m) => m.id !== currentUserId) : null;
    const title = isGroup ? chat.name : member?.name ?? "Unknown";
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

            <div className="flex flex-col self-stretch flex-1 ">
                <span className={`font-medium text-sm
                    ${selectedChat === chat ? 'text-white' : 'text-zinc-900'}`}
                >
                    {chat.name}
                </span>
                    
                <p className={`flex flex-col text-sm truncate font-light
                    ${selectedChat === chat 
                        ? 'text-white' 
                        : 'text-zinc-400'}
                `}>
                    {chat.lastMessage ? (
                        <>
                            {isMyLastMessage && 
                            <span className={`font-light ${selectedChat === chat ? 'text-white' : 'text-zinc-500'}`}>
                                You
                            </span>}
                            {chat.lastMessage}
                        </> 
                    ) : (
                        'No messages yet'
                    )}
                </p>
            </div> 

            <div className="flex flex-col items-end gap-2 justify-between self-stretch shrink-0">
                {formattedTime && (
                    <span className={`flex text-xs 
                        ${selectedChat === chat
                            ? 'text-white' 
                            : 'text-zinc-400'}
                    `}>
                        {formattedTime}
                    </span>
                )}
                {Boolean(chat.unreadCount && chat.unreadCount > 0) && (
                    <span className={`flex p-0.5 items-center justify-center rounded-full
                        text-xs w-5 h-5 font-semibold leading-none
                        ${selectedChat === chat 
                            ? 'text-zinc-400 bg-white' 
                            : 'text-white bg-[#454545]'
                        }`}
                    >
                        {chat.unreadCount! > 99 ? '99+' : chat.unreadCount}
                    </span>
                )}
            </div>
    </button>
    )
}