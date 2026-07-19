import { ChatTab } from "../../ChatList/ChatTab";
import { SearchBar } from "../../ChatList/SearchBar";
import { ChatList } from "../../ChatList/ChatList";
import { useState } from "react";
import { type ChatProps } from "../../types/Chats";
import { Contacts } from "../../ChatList/Contacts";
import { Calls } from "../../ChatList/Calls";
import { Settings } from "../../ChatList/Settings";
import { type ContactProps } from "../../types/Contact";
import { ActionMenu } from "../ActionMenu";
import { AddContact } from "../Contacts/AddContact";
import { Edit } from "../Settings/Edit";

type SidebarProps = {
    onSelect: (chat: ChatProps) => void;
    selectedChat: ChatProps | null;
    activeTab: string;
    onTabChange: (tabID: string) => void;
    chats: ChatProps[];
    contacts: ContactProps[];
    onStartChat: (contact: ContactProps) => void;
    onContactCreated: () => Promise<void>;
    selectedContactId: string | null;
}

export function Sidebar({ onSelect, selectedChat, activeTab, onTabChange, chats, contacts, onStartChat, onContactCreated, selectedContactId }: SidebarProps) {
    const [search, setSearch] = useState("");
    const [menu, setMenu] = useState(false);
    const [addContact, setAddContact] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    const handleMenuAction = () => {
        setMenu(false);
        if (activeTab === 'contacts') {
            setAddContact(true);
        }
        
        if (activeTab === 'chats') {
            return null
        }
    };

    const title = activeTab === 'chats' 
            ? 'Chats'
            : activeTab === 'contacts'
                ? 'Contacts'
                : activeTab === 'calls'
                    ? 'Recent Calls'
                    : activeTab === 'settings'
                        ? 'Settings'
                        : null;

    const iconSrc = activeTab === 'chats' 
        ? '/images/edit.svg'
        : activeTab === 'contacts'
            ? '/images/new-contact.svg'
            : activeTab === 'calls'
                ? '/images/new-call.svg'
                : activeTab === 'settings'
                    ? 'Settings'
                    : '';

    const iconTitle = activeTab === 'chats'
        ? 'New Group'
        : activeTab === 'contacts'
            ? 'New Contact'
            : activeTab === 'calls'
                ? 'New Call'
                : activeTab === 'settings'
                    ? null : null;

    const filteredChats = chats.filter(chat => 
        chat.name
            .toLowerCase()
            .includes(search.toLowerCase())
    )

    const filteredContacts = contacts.filter(contact => 
        contact.name
            .toLowerCase()
            .includes(search.toLowerCase())
    )

    return (
        <aside className={`relative flex flex-col h-full w-full bg-white px-0.5 flex-shrink-0
            md:rounded-2xl md:translate-x-0 md:w-[350px] md:min-w-[300px] md:static
            transition-transform duration-300 ease-in-out
            ${selectedChat ? "-translate-x-full" : "translate-x-0"}
             
        `}>
            {activeTab=== 'settings' && isEdit ? null : (
                <div className="flex item-center justify-center py-4">
                    <span className="text-sm text-zinc-900">{title}</span>
                </div>
            )}

            <div className="absolute right-4 top-4">
                {
                    activeTab === 'settings' 
                        ? ( !isEdit && <span className="text-sm cursor-pointer" onClick={() => setIsEdit(true)}>Edit</span>)
                            : activeTab === 'calls' 
                            ? null : (
                                <>
                                    <button
                                        className="relative cursor-pointer"
                                        onClick={() => setMenu(!menu)}
                                    >
                                        <img src={iconSrc} alt="Icon" width='24px' height='24px'/>
                                    </button>
                                    <ActionMenu 
                                        isOpen={menu} 
                                        iconSrc={iconSrc}
                                        title={iconTitle}
                                        onClick={handleMenuAction}
                                    />
                                </>
                            )
                                
                }
            </div>
            { activeTab !== 'calls' && !(activeTab === 'settings' && isEdit) 
                ?   <SearchBar onSearch={setSearch} activeTab={activeTab}/> 
                : null 
            }
            {activeTab === 'chats' 
                ?    <ChatList  filteredChats={filteredChats} onSelect={onSelect} selectedChat={selectedChat}/>
                :    activeTab === 'contacts' 
                    ?  <Contacts contacts={filteredContacts} onStartChat={onStartChat} selectedContactId={selectedContactId}/> 
                    : activeTab === 'calls' 
                        ? <Calls/> 
                        : activeTab === 'settings' && (
                            <div className="relative flex-1 overflow-hidden">
                                <div className={`absolute inset-0 transition-all duration-300 ease-in-out
                                    ${  isEdit  ? "-translate-x-8 opacity-0 pointer-events-none"
                                                : "translate-x-0 opacity-100"
                                    }
                                    `}
                                >
                                    <Settings
                                        onEdit={() => setIsEdit(true)}
                                    />
                                </div>
                    
                                <div className={`absolute inset-0 transition-all duration-300 ease-in-out
                                    ${isEdit  ? "translate-x-0 opacity-100"
                                            : "translate-x-full opacity-0 pointer-events-none"
                                    }
                                    `}
                                >
                                    <Edit
                                        onClose={() => setIsEdit(false)}
                                    />
                                </div>
                            </div>
                        )
            }
            
            <ChatTab 
                activeTab={activeTab}
                onTabChange={onTabChange}
            />
            <AddContact
                isOpen={addContact}
                onCreated={onContactCreated}
                onClose={() => setAddContact(false)}
            />
        </aside>
    )
}