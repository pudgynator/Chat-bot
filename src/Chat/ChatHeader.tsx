import type { ChatProps } from "../data/chats";

type ChatHeaderProps = {
    chat: ChatProps;
};

export function ChatHeader({chat }: ChatHeaderProps) {
    console.log(chat);

    return(
        <div className="flex  items-center bg-white/70 backdrop-blur-md border border-white/30 shadow-sm w-full rounded-2xl ">
            <img
                    src={ chat.avatar ?? '/images/default-ava.jpg'} 
                    alt="User avatar" 
                    className=" rounded-full w-8 h-8 ml-1 mt-0.5 mb-0.5"
            />
            <button className="flex flex-col gap-0.5 rounded-full px-2 py-1">

                <span className="font-sm">{chat.name}</span>
                <span className="text-xs">Online</span>
            </button>
        </div>
    )
}