import type { ChatProps } from "../data/chats";
import { ChatBody } from "./ChatBody";
import { ChatHeader } from "./ChatHeader";


type ChatComponentProps = {
    chat: ChatProps;
}

export function Chat({ chat }: ChatComponentProps) {
    return(
        <div className="flex flex-col relative w-full h-full md:mt-0 mt-2 ">
            <ChatHeader chat={chat}/>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="flex text-sm w-max whitespace-nowrap bg-white px-3 py-1.5 rounded-xl">
                    No message here yet
            </span>
            </div>
            <ChatBody/>
        </div>
    )
}