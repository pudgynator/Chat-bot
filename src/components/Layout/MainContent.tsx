import { Chat } from "../../Chat/Chat";


export function MainContent({ selectedChat }) {
    return (
        <main className="flex px-2 flex-1 w-screen h-screen min-w-[300px] lg:min-w-0">

            {
                selectedChat === null 
                ? 
                <div className="flex h-full w-full items-center justify-center">
                    <span className="text-white text-sm whitespace-nowrap bg-[#0e1621]/60 px-3 py-1.5 backdrop-blur-md rounded-full">
                        Select a chat to start messaging
                    </span>
                </div>
                :
                <div className="flex h-full w-full">
                    <Chat/>
                </div>
            }
        </main>
    )
}