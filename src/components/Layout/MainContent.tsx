import { Chat } from "../../Chat/Chat";


export function MainContent({ selectedChat }) {
    return (
        <main className={`flex px-2 flex-1 h-full min-w-[300px] lg:min-w-0 fixed w-full
                md:static
                md:translate-x-0 
                transition-transform duration-300 ease-in-out

                ${selectedChat ? "translate-x-0" : "translate-x-full"}
                 

            `}>

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
                    <Chat chat={selectedChat}/>
                </div>
            }
        </main>
    )
}