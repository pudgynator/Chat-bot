import { useState } from "react";
import ArrowPrev from "../../assets/ArrowPrev";
import type { ContactProps } from "../../types/Contact";
import { formatDistanceToNow } from "date-fns";

type NewGroupDetails = {
    onBack: () => void;
    selectedContacts: ContactProps[];
    onCreateGroup: (groupName: string) => void;
    isLoading?: boolean;
}

export function NewGroupDetails({onBack, selectedContacts, onCreateGroup,  isLoading = false}: NewGroupDetails) {
    const [groupName, setGroupName] = useState('');

    const handleCreate = () => {
        if (!groupName.trim()) return;
        onCreateGroup(groupName.trim());
    };
    return (
        <div className="flex flex-col z-30 h-full p-4">
            <div className="flex items-center justify-between mb-4">
                <button 
                    onClick={onBack}
                    className="p-2 rounded-full bg-zinc-100 shadow-lg"
                >
                    <ArrowPrev className="w-5 h-5 font-sm " fill="#black"/>
                </button>
                <div className="flex items-center gap-1.5">
                    <span className="text-sm  text-zinc-900">New Group</span>
                </div>
                <button 
                    onClick={handleCreate}
                    disabled={!groupName.trim() || isLoading}
                    className="p-2 rounded-full text-sm text-zinc-900 bg-zinc-100 shadow-lg"
                >
                    {isLoading ? "Creating..." : "Create"}
                </button>
            </div>

            <div className="flex items-center bg-zinc-100 rounded-2xl gap-2 px-3 py-4 mb-4">
                <div className="rounded-full flex items-center justify-center shrink-0">
                    <img 
                        src="/images/default-ava.jpg" 
                        alt="Group Avatar" 
                        className="rounded-full w-13 h-13"
                    />
                </div>
                <input 
                    placeholder="Group Name"
                    value={groupName}
                    onChange={(e) => (setGroupName(e.target.value))}
                    className="outline-none border-none p-1 bg-trasparent placeholder:text-zinc-400"
                    type="text" 
                    autoFocus
                />
            </div>

            <div className="flex flex-col justify-center rounded-2xl bg-zinc-100 overflow-y-auto px-3 py-2">
                <div className="flex gap-2 items-center px-1">
                    <img className="w-7 h-7" src="/images/new-contact.svg" alt="" />
                    <div className="border-b border-zinc-200 text-zinc-900 py-1">
                        Add Members
                    </div>
                </div>
                {selectedContacts.map((contact)=> (
                    <div 
                        key={contact.id}
                        className="flex items-center gap-2 border-b border-zinc-200 py-1"
                    >
                        <img
                            src={contact.avatar ?? "/images/default-ava.jpg"}
                            alt={contact.name}
                            className="w-10 h-10 rounded-full object-cover border border-zinc-300 shrink-0"
                        />
                        <div className="flex flex-col gap-1 items-start">
                            <span className="text-sm leading-none font-medium truncate">
                                {contact.name}
                            </span>
                            <span className='text-xs leading-none text-zinc-400'>
                                {contact?.lastSeen ? (
                                    <>
                                        Last seen{" "}
                                        {formatDistanceToNow(new Date(contact.lastSeen), {
                                                addSuffix: true,
                                            })
                                        }
                                    </>
                                ): (
                                    'Last seen recently'
                            )}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}