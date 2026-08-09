import type { ChatProps } from "../types/Chats";
import ArrowPrev  from "../assets/ArrowPrev";
import { formatDistanceToNow } from "date-fns";
import type { ContactProps } from "../types/Contact";

export type ChatHeaderProps = {
    chat: ChatProps;
    currentUserId: string;
    onBack: () => void;
    contacts: ContactProps[];
};

export function ChatHeader({ chat, currentUserId,  onBack, contacts }: ChatHeaderProps) {
    console.log(chat);

    const isGroup = chat.isGroup === true || (chat.isGroup === undefined && (chat.members?.length || 0) > 2);
    const memberObj = !isGroup 
        ? (chat.members || []).find((m) =>{
            const mId = typeof m === "string" ? m : (m.id ?? m._id);
            return String(mId) !== String(currentUserId);
        })
        : null;

    const memberId = typeof memberObj === 'object' ? (memberObj?.id ?? memberObj?._id) : memberObj;
    const savedContact = (contacts || []).find((c) => {
        const cId = c.id;
        return String(cId) === String(memberId);
    })

    const title = isGroup 
        ? chat.name 
        : savedContact?.name || (typeof memberObj === "object" ? memberObj?.name : "Unknown");

    const renderLastSeen = () => {  
        if (isGroup) {
            const count = chat.members?.length || 0;
            return `${count} ${count === 1 ? 'member' : 'members'}`
        }
        const lastSeenValue = typeof memberObj === "object" ? memberObj?.lastSeen : chat.lastSeen;
        if (!lastSeenValue) return "Last seen recently";
        try {
            return (
                <>
                    Last seen{" "}
                    {formatDistanceToNow(new Date(lastSeenValue), {
                        addSuffix: true,
                    })}
                </>
            );
        } catch {
            return 'Last seen recently';
        }
    }
    return(
        <div className="flex items-center gap-3">
            <button 
                className="w-max md:hidden bg-white/70 backdrop-blur-md border border-white/30 shadow-sm rounded-full p-1"
                onClick={onBack}
            >
                <ArrowPrev className="w-8 h-8 font-sm"/>
            </button>

            <div className="flex items-center gap-2 px-1 py-1 bg-white/70 backdrop-blur-md border border-white/30 shadow-sm w-full rounded-full ">
                <img
                        src={ chat.avatar ?? '/images/default-ava.jpg'} 
                        alt="User avatar" 
                        className=" rounded-full w-8 h-8 "
                />
                <button className="flex flex-col items-start gap-1">
                    <span className="text-sm leading-none">{title}</span>
                    <span className="text-xs leading-none text-zinc-500">
                        {renderLastSeen()}
                    </span>
                </button>
            </div>

        </div>
    )
}