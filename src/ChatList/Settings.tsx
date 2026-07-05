
export function Settings() {
    return(
        <div className="px-4">
            <div className="flex gap-2 bg-zinc-100 rounded-2xl px-3 py-4">
                <img
                    src='/images/default-ava.jpg'
                    alt="User avatar" 
                    className=" rounded-full w-15 h-15"
                />
                <span className="text-sm font-medium">
                    User
                </span>
            </div>
        </div>
    )
}