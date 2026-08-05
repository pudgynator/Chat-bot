import { useNavigate } from "react-router-dom";
import ArrowPrev from "../../assets/ArrowPrev";
import { useState } from "react";
import axios from "axios";

type EditProps = {
    onClose: () => void;
}

export function Edit({ onClose }: EditProps) {
    const storedUser = localStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;
    const navigate = useNavigate();

    const [name, setName] = useState(user?.name || '');
    const [phone, setPhone] = useState(user?.phone || '');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        navigate('/login');
    }

    const handleSave = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const token = localStorage.getItem('token');

            const response = await axios.patch(
                `${import.meta.env['VITE_API_URL']}/api/profile`,
                { name, phone },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                }
            );

            localStorage.setItem('user', JSON.stringify(response.data));
            onClose();
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                setError(error.response.data?.message || 'Failed to update profile');
            } else {
                setError('Network error. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
        
    }
    return (
        <div className="flex flex-col h-full px-4">
            <div className="flex min-w-[300px] items-center justify-between py-2 z-10">
                <button 
                    onClick={onClose}
                    className="p-2 rounded-full bg-zinc-100 shadow-lg"
                >
                    <ArrowPrev className="w-5 h-5 font-sm " fill="#black"/>
                </button>
                <p className="text-sm text-zinc-900">Edit Profile</p>
                <button 
                    className="p-2 rounded-full text-zinc-900 bg-zinc-100 shadow-lg"
                    onClick={handleSave}
                    disabled={isLoading}
                >
                    {isLoading ? 'Saving...' : 'Done'}
                </button>
            </div>
            {error && (
                <div className="text-xs text-red-500 text-center mt-2">
                    {error}
                </div>
            )}
            <div className="flex gap-2 bg-zinc-100 rounded-2xl px-3 py-4 mt-4 shadow-sm mb-2">
                <img
                    src='/images/default-ava.jpg'
                    alt="User avatar" 
                    className=" rounded-full w-15 h-15"
                />
                <div className="flex flex-col gap-1 w-full px-2">
                    <input 
                        className="text-sm w-full font-weigth-300 outline-none border-b border-zinc-300 py-1"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Name"
                    />

                    <input 
                        className="text-xs font-weigth-300 outline-none py-1"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Phone number"
                    />
                </div>
            </div>
            <p className="text-xs text-zinc-400 px-3">Enter your name, phone number and add a profile photo.</p>
            <button onClick={handleLogout} className="mt-auto mb-2 bg-zinc-100 shadow-sm rounded-3xl px-3 py-3">
                <span className="text-red-500 font-light">Log Out</span>
            </button>
        </div>
    )
}