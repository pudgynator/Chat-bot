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
import { NewGroup } from "../Groups/NewGroup";
import { sidebarTabs } from "../../constants/sidebarTabs";
import { filterUsers } from "../../utils/filter";

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
    const [newGroup, setNewGroup] = useState(false)

    const handleMenuAction = () => {
        setMenu(false);
        if (activeTab === 'contacts') {
            setAddContact(true);
        }
        
        if (activeTab === 'chats') {
            setNewGroup(true)
        }
    };

    const currentTab = sidebarTabs[activeTab as keyof typeof sidebarTabs];
    const title = currentTab.title;
    const iconSrc = currentTab.iconSrc;
    const iconTitle = currentTab.iconTitle;
    const filteredChats = filterUsers(chats, search);
    const filteredContacts = filterUsers(contacts, search)

    const isEditSettings = activeTab === "settings" && isEdit;
    const hideHeader = isEditSettings || newGroup;
    const hideSearch = activeTab === 'calls' || hideHeader;
    const hideChatTab = activeTab === "chats" && newGroup && isEdit;
    const hideActionMenu =  (activeTab === "chats" || activeTab === "contacts") && menu;
    const showEditButton = activeTab === "settings" && !isEdit;
    const showIcon = activeTab !== "settings" && !newGroup;

    return (
        <aside className={`relative flex flex-col h-full w-full bg-white px-0.5 flex-shrink-0
            md:rounded-2xl md:translate-x-0 md:w-[350px] md:min-w-[300px] md:static
            transition-transform duration-300 ease-in-out
            ${selectedChat ? "-translate-x-full" : "translate-x-0"}
             
        `}>
            { !hideHeader && (
                <div className="flex items-center justify-center py-4">
                    <span className="text-sm text-zinc-900">{title}</span>
                </div>
            )}

            <div className="absolute right-4 top-4">
                { showEditButton 
                    ? (<span 
                        className="text-sm cursor-pointer" 
                        onClick={() => setIsEdit(true)}
                    >
                        Edit
                    </span>) : showIcon ? (
                            <>
                                <button
                                    className="relative cursor-pointer"
                                    onClick={() => setMenu(!menu)}
                                >
                                    <img src={iconSrc} alt="Icon" width='24px' height='24px'/>
                                </button>
                                {hideActionMenu && (<ActionMenu 
                                    isOpen={menu} 
                                    iconSrc={iconSrc}
                                    title={iconTitle}
                                    onClick={handleMenuAction}
                                />)}
                            </>
                        ) : null     
                }
            </div>
            { !hideSearch && <SearchBar onSearch={setSearch} activeTab={activeTab} /> }
            {activeTab === 'chats' ? (newGroup  ? (
                    <NewGroup contacts={contacts} onClose={() => setNewGroup(false)} /> 
                ) : <ChatList  filteredChats={filteredChats} onSelect={onSelect} selectedChat={selectedChat}/>
                ) : activeTab === 'contacts' ?  <Contacts contacts={filteredContacts} onStartChat={onStartChat} selectedContactId={selectedContactId}/> 
                    : activeTab === 'calls' 
                        ? <Calls/> 
                        : activeTab === 'settings' && (
                            <div className="relative flex-1 overflow-hidden">
                                <div className={`absolute inset-0 transition-all duration-300 ease-in-out
                                    ${  isEdit  
                                        ? "-translate-x-8 opacity-0 pointer-events-none"
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
            
            { !hideChatTab && (<ChatTab 
                activeTab={activeTab}
                onTabChange={onTabChange}
            />)}
            <AddContact
                isOpen={addContact}
                onCreated={onContactCreated}
                onClose={() => setAddContact(false)}
            />
        </aside>
    )
}