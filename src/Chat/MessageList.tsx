import type { MessageProps } from "../types/Message";

export type  MessagesListProps = {
    messages: MessageProps[];
}

export function MessageList({ messages }: MessagesListProps) {
    if (messages.length === 0) {
        return (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="flex text-sm w-max whitespace-nowrap bg-white px-3 py-1.5 rounded-xl">
                    No messages here yet
                </span>
            </div> 
        )
    }
    return (
        <div className="flex flex-col gap-1 overflow-y-auto py-2 mt-auto">
           {messages.map(message => (
                <div 
                    key={message.id}
                    className="bg-white py-2 px-3 w-max rounded-3xl ml-auto mt-auto"
                >
                    {message.text}
                </div>
           ))}

        </div>
    )
}