import type { ChatProps } from "../types/Chats";
import ArrowPrev  from "../assets/ArrowPrev";
import { formatDistanceToNow } from "date-fns";

export type ChatHeaderProps = {
    chat: ChatProps;
    currentUserId: string;
    onBack: () => void;
};

export function ChatHeader({ chat, currentUserId,  onBack }: ChatHeaderProps) {
    console.log(chat);
    const isGroup = chat.isGroup;

    const member = !isGroup
    ? chat.members?.find((m) => {
          if (typeof m === "string") return m !== currentUserId;
          return (m.id ?? m._id) !== currentUserId;
      })
    : null;


    const renderLastSeen = () => {
        if (!chat.lastSeen) return 'Last seen recently';
        try {
            return (
                <>
                    Last seen{" "}
                    {formatDistanceToNow(new Date(chat.lastSeen), {
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
                    <span className="text-sm leading-none">{chat.name}</span>
                    <span className="text-xs leading-none text-zinc-500">
                        {renderLastSeen()}
                    </span>
                </button>
            </div>

        </div>
    )
}