import { useNavigate } from "react-router-dom";

type EditProps = {
    onClose: () => void;
}

export function Edit({ onClose }: EditProps) {
    const storedUser = localStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        navigate('/login');
    }
    return (
        <div className="flex flex-col h-full px-4">
            <div className="flex items-center justify-between py-2">
                <button 
                    onClick={onClose}
                    className="p-2 rounded-full bg-zinc-100 shadow-sm"
                >
                    <img src="" alt="exit arrow" />
                </button>
                <h2>
                    Edit Profile
                </h2>
                <button className="p-2 rounded-full bg-zinc-100 shadow-sm">
                    Done
                </button>
            </div>
            <div className="relative flex gap-2 bg-zinc-100 rounded-2xl px-3 py-4">
                <img
                    src='/images/default-ava.jpg'
                    alt="User avatar" 
                    className=" rounded-full w-15 h-15"
                />
                <div className="flex flex-col gap-0.5">
                    <input 
                        className="text-sm font-medium outline-none border-b border-white"
                        defaultValue={user?.name}
                    />

                    <input className="text-sm font-medium outline-none"
                        defaultValue={user?.phone}
                    />
                </div>
            </div>
            <button onClick={handleLogout} className="mt-auto mb-2 bg-zinc-100 shadow-sm rounded-3xl px-3 py-3">
                <span className="text-red-500 font-light">Log Out</span>
            </button>
        </div>
    )
}