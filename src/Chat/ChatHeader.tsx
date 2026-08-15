import type { ChatProps } from "../types/Chats";
import ArrowPrev  from "../assets/ArrowPrev";
import type { ContactProps } from "../types/Contact";
import { renderLastSeen } from "../utils/renderLastSeen";

export type ChatHeaderProps = {
    chat: ChatProps;
    currentUserId: string;
    onBack: () => void;
    contacts: ContactProps[];
    onOpenProfile: () => void;
};

export function ChatHeader({ chat, currentUserId,  onBack, contacts, onOpenProfile }: ChatHeaderProps) {
    console.log(chat);

    const isGroup = chat.isGroup === true || (chat.isGroup === undefined && chat.members!.length > 2);
    const memberObj = !isGroup
    ? (chat.members || []).find((m) => {
          const mId = String(typeof m === "object" ? (m?._id ?? m?.id) : m);
          return currentUserId && mId && mId !== currentUserId;
      })
    : null;

    const memberId = typeof memberObj === 'object' ? (memberObj?.id ?? memberObj?._id) : memberObj;
    const savedContact = (contacts || []).find((c) => {
        return String(c.id) === String(memberId);
    });

    const title = isGroup 
        ? (chat.name || "Group") 
        : savedContact?.name || (typeof memberObj === "object" ? memberObj?.name : chat.name);

    const lastSeenValue = !isGroup && typeof memberObj === "object" 
        ? memberObj?.lastSeen 
        : chat?.lastSeen;

    const subtitle = renderLastSeen({
        isGroup,
        membersCount: chat.members?.length ?? 0,
        lastSeen: lastSeenValue ?? null,
    })
    return(
        <div className="flex items-center gap-3">
            <button 
                className="w-max md:hidden bg-white/70 backdrop-blur-md border border-white/30 shadow-sm rounded-full p-1"
                onClick={onBack}
            >
                <ArrowPrev className="w-8 h-8 font-sm"/>
            </button>

            <div onClick={onOpenProfile} className="flex items-center gap-2 px-1 py-1 bg-white/70 backdrop-blur-md border border-white/30 shadow-sm w-full rounded-full ">
                <img
                        src={ chat.avatar || '/images/default-ava.jpg'} 
                        alt="User avatar" 
                        className=" rounded-full w-8 h-8 "
                />
                <button className="flex flex-col items-start gap-1">
                    <span className="text-sm leading-none">{title}</span>
                    <span className="text-xs leading-none text-zinc-500">
                        {subtitle}
                    </span>
                </button>
            </div>

        </div>
    )
}