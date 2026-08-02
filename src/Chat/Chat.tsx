import { useEffect, useState } from "react";
import type { ChatProps } from "../types/Chats";
import { ChatBody } from "./ChatBody";
import { ChatHeader } from "./ChatHeader";
import { MessageList } from "./MessageList";
import type { MessageProps } from "../types/Message";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

type ChatComponentProps = {
    chat: ChatProps;
    onBack: () => void;
};

export type JwtPayload = {
    userId: string;
};

export function Chat({ chat, onBack }: ChatComponentProps) {
    const [messages, setMessages] = useState<MessageProps[]>([]);
    const handleMessageSend = (message: MessageProps) => {
        setMessages(prev => [...prev, message]);
    }
    const token = localStorage.getItem("token");
    const currentUserId =  token ? jwtDecode<JwtPayload>(token).userId : "";

    useEffect(() => {
        const fetchMessages = async () => {
            const chatId = chat.id;
            if (!chatId) return;
            try {

                const token = localStorage.getItem('token');

                const response = await axios.get(
                    `${import.meta.env['VITE_API_URL']}/api/messages/${chat.id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                setMessages(response.data);
            } catch (error) {
                console.error('Failed to fetch messages:', error)
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
            <MessageList 
                messages={messages}
                currentUserId={currentUserId}
            />
            <ChatBody
                chatId={chat.id}
                onMessageSent={handleMessageSend}
            />
        </div>
    )
}