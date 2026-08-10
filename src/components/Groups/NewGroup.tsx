import { formatDistanceToNow } from "date-fns";
import ArrowPrev from "../../assets/ArrowPrev";
import type { ContactProps } from "../../types/Contact"
import { useMemo, useState } from "react";
import { filterUsers } from "../../utils/filter";

type NewGroupProps = {
    contacts: ContactProps[];
    onClose: () => void;
    onNext: (selectedIds: string[]) => void;
}
export function NewGroup({ contacts, onClose, onNext }: NewGroupProps) {
    const [selectedContactsIds, setSelectedContactsIds] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState('');

    const selectedContactsList = useMemo(() => {
        return contacts.filter((contact) =>  selectedContactsIds.includes(contact.id));
    }, [contacts, selectedContactsIds]);

    const filteredContacts = useMemo(() => {
        return filterUsers(contacts, searchQuery);
    }, [contacts, searchQuery])

    const toggleContact = (id: string) => {
        setSelectedContactsIds(prev => 
            prev.includes(id) 
                ? prev.filter(contactId => contactId !== id)
                : [...prev, id]
        );
    };

    const handleNext = () => {
        if (onNext && selectedContactsIds.length > 0) {
            onNext(selectedContactsIds);
        }
    };

    return (
        <div className="flex flex-col z-30 h-full p-4">
            <div className="flex items-center justify-between mb-4">
                <button 
                    onClick={onClose}
                    className="p-2 rounded-full bg-zinc-100 shadow-lg"
                >
                    <ArrowPrev className="w-5 h-5 font-sm " fill="#black"/>
                </button>
                <div className="flex items-center gap-1.5">
                    <span className="text-sm  text-zinc-900">Select Users</span>
                    <span className="text-xs text-zinc-400">
                        {selectedContactsIds.length}/200 000
                    </span>
                </div>
                <button 
                    onClick={handleNext}
                    disabled={selectedContactsIds.length === 0}
                    className="p-2 rounded-full text-sm text-zinc-900 bg-zinc-100 shadow-lg"
                >
                    Next
                </button>
            </div>

            <div className="flex flex-col bg-zinc-100 rounded-2xl overflow-hidden">
                <div className="p-2 w-full shrink-0"> 
                    <div className="flex flex-wrap py-1 px-3 items-center gap-1 bg-white rounded-2xl focus-within:border-zinc-300 transition">
                        {selectedContactsList.map((contact) => (
                            <span 
                                key={contact.id}
                                className="inline-flex items-center gap-1 bg-zinc-600 text-white text-xs font-medium px-2 py-1 rounded-md animate-in fade-in zoom-in-95 duration-150"
                            >
                                {contact.name}
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        toggleContact(contact.id);
                                    }}
                                    className="hover:bg-zinc-700 rounded-full p-0.5 transition"
                                >
                                    <svg className="w-3 h-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </span>
                        ))}
                        <input 
                            type="text" 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder={selectedContactsIds.length === 0 ? "Who would you like to add?" : ""}
                            className="flex-1 text-sm bg-white text-zinc-400 rounded-xl outline-none"
                        />
                    </div>

                </div>
                <div className="text-xs text-zinc-400 px-4 uppercase w-full bg-zinc-200 border-y border-zinc-200  ">
                    contacts
                </div>
                <div className="flex flex-col py-2 px-2 overflow-auto h-full">
                    {filteredContacts.map(contact => {
                        const isSelected = selectedContactsIds.includes(contact.id)
                        return (
                            <div
                                onClick={() => toggleContact(contact.id)}
                                className="flex items-center gap-2 border-b border-zinc-200 py-1"
                                key={contact.id}
                            >
                                <img 
                                    src={ contact.avatar ?? '/images/default-ava.jpg'}  
                                    alt="user avatar" 
                                    className="rounded-full w-9 h-9 border-b border-zinc-400"
                                />
                                <div className="flex flex-col gap-1">
                                    <span className="text-sm leading-none font-medium truncate">{contact.name}</span>
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