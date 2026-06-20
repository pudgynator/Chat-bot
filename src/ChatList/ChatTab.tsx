import { tabs } from './tabs'
import { useState } from "react";

export function ChatTab() {
    const [activeTab, setActiveTab ] = useState('chats');

    return (
        <div className="flex items-center justify-around px-4 py-3 border-t-2 border-zinc-100 bg-white mt-auto">
        {tabs.map(tab => {
                const Icon = tab.icon;

                return (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`
                            flex items-center transition-colors 
                            ${activeTab === tab.id
                            ? "text-[#454545]"
                            : "text-zinc-400"
                            }
                        `}
                    >
                        <Icon size={24} fill={activeTab === tab.id ? "#454545": "#a1a1aa" }/>
                    </button>
                )
            }
        )}
    </div>
    )
}
