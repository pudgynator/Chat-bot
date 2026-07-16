
type AddContactProps = {
    isOpen: boolean;
    onClose: () => void;
}

export function AddContact({ isOpen, onClose }: AddContactProps) {
    return (
        <div className={`fixed inset-0 z-50 flex flex-col items-center justify-center 
                bg-black/50 rounded-2xl
                transition-all duration-200 ease-in-out
                ${ isOpen ? 'opacity-100 pointer-events-auto' : " opacity-0 pointer-events-none"}
            `}>
            <div className={`relative w-[300px] bg-zinc-200 border border-white/30 shadow-sm rounded-2xl p-4
                transition-all duration-300 ease-in-out
                ${ isOpen ? 'opacity-100 translate-y-0 scale-100' : " opacity-0 -translate-y-2 scale-95 pointer-events-none"}
            `}
            >
                <button 
                    className="absolute left-2 top-2 shadow-sm rounded-full p-2 bg-zinc-100" 
                    onClick={onClose}
                >
                    <img src="images/close-x.svg" alt="close icon" width='18px' height='18px'/>
                </button>

                <h2 className="text-[14px] text-center mb-6">Add Contact</h2>
                <form className="flex flex-col gap-3 ">
                    <div className="rounded-3xl px-4 bg-white shadow-sm">
                        <input
                            placeholder="Name"
                            className="w-full text-sm border-b border-zinc-300 bg-transparent py-3 outline-none"
                        />

                        <input
                            placeholder="Phone Number"
                            className="w-full text-sm  py-3 outline-none"
                        />
                    </div>
                    <button 
                        className="bg-zinc-600 text-white rounded-3xl p-2 font-medium cursor-pointer"
                        type="submit"
                    >
                        Create
                    </button>
                </form>
            </div>
        </div>
    )
}