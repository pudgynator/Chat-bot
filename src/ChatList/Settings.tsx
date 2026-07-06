import ArrowPrev from "../assets/ArrowPrev";

export function Settings() {
    return(
        <div className="px-4">
            <div className="relative flex gap-2 bg-zinc-100 rounded-2xl px-3 py-4">
                <img
                    src='/images/default-ava.jpg'
                    alt="User avatar" 
                    className=" rounded-full w-15 h-15"
                />
                <span className="text-sm font-medium">
                    User
                </span>
                <button 
                    className="absolute p-1 rotate-180 right-0 top-8"
                >
                    <ArrowPrev className="w-5 h-5 font-sm " fill="#a1a1aa"/>
                </button>
            </div>
        </div>
    )
}