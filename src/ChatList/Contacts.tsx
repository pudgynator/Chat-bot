import type { ContactProps } from "../types/Contact";
import { formatDistanceToNow } from "date-fns";

export type ChatContactProps = {
    contacts: ContactProps[];
    onStartChat: (contact: ContactProps) => void;
    selectedContactId: string | null;
};


export function Contacts({ contacts, onStartChat, selectedContactId }: ChatContactProps) {
    return (
        <div>
            {contacts.map(contact => {
                const isSelected = selectedContactId === contact.id;
                return (
                    <div 
                    className={`flex items-center  border-b border-zinc-100 gap-2 px-2 py-1.5 w-full
                        ${isSelected ? 'bg-[#454545] text-white rounded-2xl' : 'bg-white' }
                    `}
                    key={contact.id}
                    onClick={() => onStartChat(contact)}
                >
                    <img
                            src={ contact.avatar ?? '/images/default-ava.jpg'} 
                            alt="User avatar" 
                            className=" rounded-full w-9 h-9 "
                    />
                    <button className="flex flex-col items-start gap-1">
                        <span className="text-sm leading-none">{contact.name}</span>
                        <span className={`text-xs leading-none  ${isSelected ? ' text-white' : 'text-zinc-500' }`}>
                        Last seen{" "}
                        { 
                            formatDistanceToNow(new Date(contact.lastSeen), {
                                addSuffix: true,
                            })
                        }
                        </span>
                    </button>
                </div>
                )
            })}
        </div>
    )
}