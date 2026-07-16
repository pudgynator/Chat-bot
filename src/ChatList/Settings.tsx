import ArrowPrev from "../assets/ArrowPrev";
import { useNavigate } from "react-router-dom";

type SettingsProps = {
    onEdit: () => void;
}

export function Settings({ onEdit }: SettingsProps) {
    const storedUser = localStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        navigate('/login');
    }

    return(
        <div className="px-4 flex flex-col h-full">
            <div className="relative flex gap-2 bg-zinc-100 rounded-2xl px-3 py-4">
                <img
                    src='/images/default-ava.jpg'
                    alt="User avatar" 
                    className=" rounded-full w-15 h-15"
                />
                <div className="flex flex-col gap-0.5">
                    <span className="text-sm font-medium">
                        {user?.name}
                    </span>
                    <span className="text-xs font-light text-zinc-400">
                        {user?.phone}
                    </span>
                </div>
                <button 
                    className="absolute p-1 rotate-180 right-0 top-8"
                    onClick={onEdit}
                >
                    <ArrowPrev className="w-5 h-5 font-sm " fill="#a1a1aa"/>
                </button>
            </div>
            <button onClick={handleLogout} className="mt-auto mb-2 bg-zinc-100 rounded-2xl px-3 py-3">
                <span className="text-red-500 font-light">Log Out</span>
            </button>
        </div>
    )
}