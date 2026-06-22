import { ChatBody } from "./ChatBody";
import { ChatHeader } from "./ChatHeader";


export function Chat() {
    return(
        <div className="flex flex-col w-full h-full">
            <ChatHeader/>
            <ChatBody/>
        </div>
    )
}