import { formatDistanceToNow } from "date-fns";
import ArrowPrev from "../../assets/ArrowPrev";
import type { ContactProps } from "../../types/Contact"

type NewGroupProps = {
    contacts: ContactProps[];
    onClose: () => void;
}
export function NewGroup({ contacts, onClose }: NewGroupProps) {
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
                    className="text-sm bg-white text-zinc-400 rounded-xl p-1 mb-2"
                />
                <span className="text-sm w-full bg-white text-zinc-300">CONTACTS</span>
                <div className="flex flex-col py-2">
                    {contacts.map(contact => {
                        const isSelected = contact.id;
                        return (
                            <div
                                className="flex items-center gap-2"
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
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}