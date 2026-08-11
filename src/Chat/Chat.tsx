import { useEffect, useState } from "react";
import type { ChatProps } from "../types/Chats";
import { ChatBody } from "./ChatBody";
import { ChatHeader } from "./ChatHeader";
import { MessageList } from "./MessageList";
import type { MessageProps } from "../types/Message";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import type { ContactProps } from "../types/Contact";
import { UserProfile } from "../User/UserProfile";

type ChatComponentProps = {
    chat: ChatProps;
    onBack: () => void;
    contacts: ContactProps[];
};

export type JwtPayload = {
    userId: string;
};

export function Chat({ chat, onBack, contacts }: ChatComponentProps) {
    const [messages, setMessages] = useState<MessageProps[]>([]);
    const [isProfileOpen, setIsProfileOpen] = useState(false);

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
                currentUserId={currentUserId}
                onBack={onBack}
                contacts={contacts}
                onOpenProfile={() => setIsProfileOpen(true)}
            />
            <MessageList 
                messages={messages}
                currentUserId={currentUserId}
            />
            <ChatBody
                chatId={chat.id}
                onMessageSent={handleMessageSend}
            />

            {isProfileOpen && chat && (
                <div className="absolute inset-0 z-50 bg-white rounded-2xl overflow-hidden">
                    <UserProfile
                        chat={chat}
                        currentUserId={currentUserId}
                        contacts={contacts}
                        onClose={() => setIsProfileOpen(false)}
                    />
                </div>
            )}
        </div>
    )
}