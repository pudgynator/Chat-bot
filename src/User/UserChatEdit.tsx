import { useState } from "react";
import ArrowPrev from "../assets/ArrowPrev";
import axios from "axios";


type UserChatEditProps = {
    onClose: () => void;
    chatId: string;
    initialName: string;
    onNameUpdated: (newName: string) => void;
}

export function UserChatEdit( {onClose, chatId, initialName, onNameUpdated }: UserChatEditProps) {
    const [name, setName] = useState(initialName || '');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const isUnchanged = name.trim() === initialName.trim();
    const isInvalid = name.trim().length === 0;

    const handleSave = async () => {
        if (isUnchanged || isInvalid || isLoading) return;

        try {
            setIsLoading(true);
            setError(null);

            const response = await axios.patch(
                `${import.meta.env['VITE_API_URL']}/api/chats/${chatId}`, {
                    name: name.trim()
                }
            )
            const updatedName = response.data?.name || name.trim();
            onNameUpdated(updatedName);
            onClose();
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                setError(error.response.data?.message || 'Failed to update name');
            } else {
                setError('Network error. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }

    }
    return (
        <div className="flex flex-col w-full h-full bg-white px-4 md:py-1 items-center ">
            <div className="flex min-w-[300px] w-full items-center justify-between py-2 z-10">
                <button 
                    onClick={onClose}
                    className="p-2 rounded-full bg-zinc-100 shadow-lg"
                >
                    <ArrowPrev className="w-5 h-5 font-sm " fill="#black"/>
                </button>
                <button 
                    className="p-2 rounded-full text-zinc-900 bg-zinc-100 shadow-lg"
                    onClick={handleSave}
                    disabled={isLoading}
                >
                    {isLoading ? 'Saving...' : 'Done'}
                </button>
            </div>
            <img className="w-24 h-24 rounded-full mb-4" src="/images/default-ava.jpg" alt="User Avatar"/>

            <div className="flex flex-col gap-2 w-full items-center"> 
                <input 
                    type="text" 
                    className="rounded-full w-full max-w-[300px] font-light bg-zinc-100 outline-none border-none shadow-sm py-2 px-3"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                {error ? (
                    <span className="text-xs text-red-500 px-2 font-medium">
                        {error}
                    </span>
                ) : (
                    <span className="text-sm leading-none text-zinc-400">
                        You can change the name of your group
                    </span>
                )}
            </div>
        </div>
    )
}