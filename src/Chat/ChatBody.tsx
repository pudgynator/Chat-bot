import { useState } from "react"
import type { MessageProps } from "../types/Message";
import axios from "axios";

type ChatBodyProps ={
    chatId: string;
    onMessageSent: (message: MessageProps) => void;
}

export function ChatBody({ chatId, onMessageSent }: ChatBodyProps){
    const [text, setText] = useState('');
    const  handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!text.trim()) return;

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                'http://localhost:3000/api/messages',
                {
                    chatId,
                    text,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            onMessageSent(response.data);
            setText('');
        } catch (error) {
            console.error(error);
        }
    }

    return(
        <div className="flex flex-col flex-1 w-full justify-end md:pb-0 pb-4">
            <form 
                onSubmit={handleSubmit}
                className="w-full flex items-center gap-2"
            >
                <input 
                    type="text" 
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="w-full rounded-full px-3 py-2 text-zinc-900 caret-zinc-900 focus:outline-none bg-white/70 backdrop-blur-md border border-white/30 shadow-sm" 
                    placeholder="Write a message..."
                />
                <button 
                    type="submit" 
                    className=" flex w-10 h-10 rounded-full bg-white/70 backdrop-blur-md border border-white/30 shadow-sm flex items-center justify-center"
                >
                    <img src="/images/send-symbol.svg" alt="send icon"/>
                </button>
            </form>
        </div>
    )
}