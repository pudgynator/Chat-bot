import { tabs } from './tabs'

export function ChatTab() {
    return (
        <div className="flex items-center justify-around px-4 py-4 border-t border-[#454545] bg-white mt-auto">
        {tabs.map(tab => { 
                const Icon = tab.icon;

                return (
                    <button
                        key={tab.id}
                        className="flex items-center text-[#454545] hover:text-zinc-400 transition-colors"
                    >
                        <Icon size={24} />
                    </button>
                )
            }
        )}
    </div>
    )
}
