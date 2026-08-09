import type { MessageProps } from "../types/Message";

type MessageItemProps = {
    message: MessageProps;
    currentUserId: string;
}

export function MessageItem({ message, currentUserId }: MessageItemProps) {
    const sender = message.sender;
    const senderId = typeof sender === 'object' && sender !== null
        ? sender._id
        : sender;

    const isOwn = String(senderId) === String(currentUserId);
    const formattedTime = message.createdAt 
        ? new Date(message.createdAt).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
        })
        : new Date().toLocaleDateString([], {
            hour: '2-digit',
            minute: '2-digit'
        });

    return (
        <div 
            key={message.id}
            className={`flex gap-3 py-2 px-3 w-max rounded-3xl max-w-[50%] min-w-0 w-fit break-all
                ${isOwn 
                    ? 'self-end ml-auto bg-white' 
                    : 'self-start mr-auto bg-zinc-200'}
            `}
        >
            <span className="mb-0.5">{message.text}</span>
            <span
                className={`text-xs self-end whitespace-nowrap shrink-0
                    ${isOwn ? 'text-zinc-300' : 'text-zinc-400'}
                `}
            >
                {formattedTime}
            </span>
        </div>
    )
}