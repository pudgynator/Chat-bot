import { formatDistanceToNow } from "date-fns";
import ArrowPrev from "../../assets/ArrowPrev";
import type { ContactProps } from "../../types/Contact"
import { useState } from "react";

type NewGroupProps = {
    contacts: ContactProps[];
    onClose: () => void;
}
export function NewGroup({ contacts, onClose }: NewGroupProps) {
    const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
    const toggleContact = (id: string) => {
        setSelectedContacts(prev => 
            prev.includes(id) 
                ? prev.filter(contactId => contactId !== id)
                : [...prev, id]
        );
    };

    return (
        <div className="flex flex-col h-full p-4">
            <div className="flex items-center justify-between mb-4">
                <button 
                    onClick={onClose}
                    className="p-2 rounded-full bg-zinc-100 shadow-lg"
                >
                    <ArrowPrev className="w-5 h-5 font-sm " fill="#black"/>
                </button>
                <p className="text-sm text-zinc-900">Select Users</p>
                <button className="p-2 rounded-full text-zinc-900 bg-zinc-100 shadow-lg">
                    Next
                </button>
            </div>

            <div className="flex flex-col bg-zinc-100 h-full rounded-2xl p-2">
                <input 
                    type="text" 
                    placeholder="Who would you like to add?"
                    className="text-sm bg-white text-zinc-400 rounded-xl py-1 px-2 mb-2 outline-none"
                />
                <span className="text-sm w-full bg-white text-zinc-300 rounded-xl px-2">CONTACTS</span>
                <div className="flex flex-col py-2">
                    {contacts.map(contact => {
                        const isSelected = selectedContacts.includes(contact.id)
                        return (
                            <div
                                className="flex items-center gap-2  border-b border-zinc-200 py-1"
                                key={contact.id}
                            >
                                <img 
                                    src={ contact.avatar ?? '/images/default-ava.jpg'}  
                                    alt="user avatar" 
                                    className="rounded-full w-9 h-9 border-b border-zinc-400"
                                />
                                <div className="flex flex-col gap-1">
                                    <span className="text-sm leading-none">{contact.name}</span>
                                    <span className="text-zinc-400 text-xs leading-none">
                                         Last seen{" "}
                                        { 
                                            formatDistanceToNow(new Date(contact?.lastSeen), {
                                                addSuffix: true,
                                            })
                                        }
                                    </span>
                                </div>
                                <label className="flex items-center cursor-pointer ml-auto">
                                    <input type="checkbox" value="" className="peer hidden"/>
                                    <div
                                        onClick={() => toggleContact(contact.id)}
                                        className={`flex items-center justify-center w-5 h-5 border-1 border-zinc-300 transition-all rounded-full 
                                            peer-checked:bg-zinc-400
                                            peer-checked:border-zinc-400
                                            ${ isSelected ? "bg-zinc-400 border-zinc-400" : " border-zinc-300"} 
                                        `}
                                    >
                                        {isSelected && (
                                            <svg
                                                className="w-5 h-5 text-white "
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M16.704 5.29a1 1 0 010 1.414l-7.2 7.2a1 1 0 01-1.414 0l-3.2-3.2a1 1 0 111.414-1.414L9 11.586l6.493-6.493a1 1 0 011.414 0z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        )}
                                    </div>
                                
                                </label>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}