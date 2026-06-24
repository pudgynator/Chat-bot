import type { ChatProps } from "../data/chats";

export type ChatContactProps = {
    chat: ChatProps[];
};

export function Contacts({ chat }: ChatContactProps) {
    return (
        <div>
            {chat.map(ch => (
                <div 
                    className="flex items-center  border-b border-zinc-100 gap-2 px-2 py-2 bg-white w-full"
                    key={ch.id}
                >
                    <img
                            src={ ch.avatar ?? '/images/default-ava.jpg'} 
                            alt="User avatar" 
                            className=" rounded-full w-9 h-9 "
                    />
                    <button className="flex flex-col items-start gap-1">
                        <span className="text-sm leading-none">{ch.name}</span>
                        <span className="text-xs leading-none text-zinc-500">online</span>
                    </button>
                </div>
            ))}
        </div>
    )
}