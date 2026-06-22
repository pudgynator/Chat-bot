

export function ChatHeader() {
    return(
        <div className="flex bg-white/70 backdrop-blur-md border border-white/30 shadow-sm w-full rounded-2xl ">
            <button className="flex flex-col gap-0.5 rounded-full px-1 py-1">
                <span className="font-sm">Name</span>
                <span className="text-xs">Online</span>
            </button>
        </div>
    )
}