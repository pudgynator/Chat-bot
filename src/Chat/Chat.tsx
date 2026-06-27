import type { ChatProps } from "../data/chats";
import { ChatBody } from "./ChatBody";
import { ChatHeader } from "./ChatHeader";


type ChatComponentProps = {
    chat: ChatProps;
}

export function Chat({ chat }: ChatComponentProps) {
    return(
        <div className="flex flex-col w-full h-full md:mt-0 mt-2 ">
            <ChatHeader chat={chat}/>
            <ChatBody/>
        </div>
    )
}