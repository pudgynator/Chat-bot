import { getHours, getMinutes } from "date-fns";

export type ChatProps = {
    id: string;
    name: string;
    lastMessage?: string;
    time?: string;
    avatar?: string; 
}

const hours = getHours(new Date());
const minutes = String(getMinutes(new Date())).padStart(2, '0');

export const chats: ChatProps[] = [
    {
        id: '1',
        name: "Maria",
        lastMessage: "Hi!",
        time: "12:30",
    },
    {
        id: '2',
        name: "Alex",
        lastMessage: "See you",
        time: "11:20",
    },
    {
        id: '3',
        name: "Help Bot",
        lastMessage: "How can I help you?",
        time: `${hours}:${minutes}`,
        avatar: `/images/bot-ava.jpg`
    },
];