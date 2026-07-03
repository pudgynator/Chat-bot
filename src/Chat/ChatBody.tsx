import type { SubmitEvent } from "react"


export function ChatBody(){
    function HandleSubmit(e: SubmitEvent) {
        e.preventDefault()
    }

    return(

        <div className="flex flex-col flex-1 w-full justify-end md:pb-0 pb-4">
            <form 
                action="" 
                onSubmit={HandleSubmit}
                className="w-full flex items-center gap-2"
            >
                <input 
                    type="text" 
                    className="w-full rounded-full px-3 py-2 text-zinc-900 caret-zinc-900 focus:outline-none bg-white/70 backdrop-blur-md border border-white/30 shadow-sm" 
                    placeholder="Write a message..."
                />
                <button type="submit" onClick={() => HandleSubmit} className=" flex w-10 h-10 rounded-full bg-white/70 backdrop-blur-md border border-white/30 shadow-sm flex items-center justify-center">
                    <img src="/images/send-symbol.svg" alt="send icon"/>
                </button>
            </form>
        </div>
    )
}