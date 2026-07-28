import { useEffect, useRef, Fragment } from "react";
import type { MessageProps } from "../types/Message";
import { MessageItem } from "./MessageItem";
import { formatDateDivider, isDifferentDay } from "../utils/formatDateDivider";

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
           {messages.map((message, index) => {
                const prevMessage = messages[index - 1];
                const msgDate = message.createdAt;
                const prevMsgDate = prevMessage?.createdAt;

                const showDateDivider = isDifferentDay(msgDate, prevMsgDate);

                return (
                    <Fragment key = {message.id || index}>
                        { showDateDivider && (
                            <div className="flex justify-center my-3">
                                <span className="bg-zinc-800/60 text-white text-xs px-3 py-1 rounded-full shadow-sm backdrop-blur-md">
                                    {formatDateDivider(msgDate)}
                                </span>
                            </div>
                        )}
                        <MessageItem
                            key={message.id || index}
                            message={message}
                            currentUserId={currentUserId}
                        />
                    </Fragment>
                )
            })}
            <div ref={messagesEndRef}/>
        </div>
    )
}