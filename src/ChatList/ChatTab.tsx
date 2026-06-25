import { tabs } from '../data/tabs'

type SidebarTabProps = {
    activeTab: string;
    onTabChange: (tabID: string) => void;
}

export function ChatTab({ activeTab, onTabChange }: SidebarTabProps) {

    return (
        <div className="flex items-center justify-around  px-4 py-3 border-t-2 border-zinc-100 bg-white mt-auto rounded-b-2xl">
        {tabs.map(tab => {
                const Icon = tab.icon;

                return (
                    <button
                        key={tab.id}
                        onClick={() => onTabChange(tab.id)}
                        className={`
                            flex items-center transition-colors focus:outline-none
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
