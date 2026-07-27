import { useEffect, useRef } from "react";
import type { MessageProps } from "../types/Message";
import { MessageItem } from "./MessageItem";

export type  MessagesListProps = {
    messages: MessageProps[];
    currentUserId: string;
}

export function MessageList({ messages, currentUserId }: MessagesListProps) {
    const  messagesEndRef = useRef<HTMLDivElement | null>(null);
    const scrollToEnd = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "instant" })
    };
    useEffect(() => {
        scrollToEnd();
    }, [messages]);

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
        <div className="flex flex-col gap-1 overflow-y-auto py-2 w-full">
           {messages.map((message, index) => (
                <MessageItem
                    key={message.id || index}
                    message={message}
                    currentUserId={currentUserId}
                />
            ))}
            <div ref={messagesEndRef}/>
        </div>
    )
}