

export function Calls() {
    return (
        <div className="flex flex-col w-full">
            <div className="flex px-4 gap-1">
                <img src="images/new-call.svg" alt="" width='24px' height='24px'/>
                <button className="flex text-sm font-light text-[#454545] border-t border-zinc-100 px-2 py-2">
                    Create New Call
                </button>
            </div>
            <div className="text-zinc-400 text-xs bg-zinc-100 w-full p-1">
                Recent calls
            </div>

        </div>
    )
}