import { useEffect, useState } from "react";
import type { ChatProps } from "../types/Chats";
import { ChatBody } from "./ChatBody";
import { ChatHeader } from "./ChatHeader";
import { MessageList } from "./MessageList";
import type { MessageProps } from "../types/Message";
import axios from "axios";

type ChatComponentProps = {
    chat: ChatProps;
    onBack: () => void;
}

export function Chat({ chat, onBack }: ChatComponentProps) {
    const [messages, setMessages] = useState<MessageProps[]>([]);
    const handleMessageSend = (message: MessageProps) => {
        setMessages(prev => [...prev, message]);
    }

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const token = localStorage.getItem('token');

                const response = await axios.get(
                    `http://localhost:3000/api/messages/${chat.id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                console.log(response.data);
                setMessages(response.data);
            } catch (error) {
                console.error(error)
            }
        };
        void fetchMessages();
    }, [chat.id]);

    return(
        <div className="flex flex-col relative w-full h-full md:mt-0 mt-2 ">
            <ChatHeader 
                chat={chat}
                onBack={onBack}
            />
            <MessageList messages={messages}/>
            <ChatBody
                chatId={chat.id}
                onMessageSent={handleMessageSend}
            />
        </div>
    )
}