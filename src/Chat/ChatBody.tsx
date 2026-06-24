import type { SubmitEvent } from "react"


export function ChatBody(){
    function HandleSubmit(e: SubmitEvent) {
        e.preventDefault()
    }

    return(

        <div className="flex flex-col flex-1 w-full justify-end pb-4">
            <form 
                action="" 
                onSubmit={HandleSubmit}
                className="w-full "
            >
                <input 
                    type="text" 
                    className="w-full rounded-full px-3 py-2 text-zinc-900 caret-zinc-900 focus:outline-none bg-white/70 backdrop-blur-md border border-white/30 shadow-sm" 
                    placeholder="Write a message..."/>
            </form>
        </div>
    )
}