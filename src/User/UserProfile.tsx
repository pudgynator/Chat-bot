import { formatDistanceToNow } from "date-fns";
import ArrowPrev from "../assets/ArrowPrev";
import type { ChatProps } from "../types/Chats";
import type { ContactProps } from "../types/Contact";
import { renderLastSeen } from "../utils/renderLastSeen";
import { useState } from "react";
import { UserChatEdit } from "./UserChatEdit";

type UserProfileProps = {
    chat: ChatProps;
    currentUserId: string;
    contacts: ContactProps[];
    onClose: () => void;
    onChatUpdated?: (updatedChat: ChatProps) => void;
}

export function UserProfile({ chat, currentUserId, contacts, onClose, onChatUpdated }: UserProfileProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [chatName, setChatName] = useState(chat.name || "");

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

    const phone = !isGroup ? savedContact?.phone : null;

    const lastSeenValue = !isGroup && typeof memberObj === "object" 
        ? memberObj?.lastSeen 
        : chat?.lastSeen;

    const subtitle = renderLastSeen({
        isGroup,
        membersCount: chat.members?.length ?? 0,
        lastSeen: lastSeenValue ?? null,
    })
    
    if (isEditing) {
        return (
            <UserChatEdit
                onClose={() => setIsEditing(false)}
                chatId={chat.id}
                initialName={chatName}
                onNameUpdated={(newName) => {
                    setChatName(newName);
                    if (onChatUpdated) {
                        onChatUpdated({ ...chat, name: newName });
                    }
                }}
            />
        );
    }

    return (
        <div className="flex flex-col bg-white px-4 md:py-1">
            <div className="flex min-w-[300px] items-center justify-between py-2 z-10">
                <button 
                    onClick={onClose}
                    className="p-2 rounded-full bg-zinc-100 shadow-lg"
                >
                    <ArrowPrev className="w-5 h-5 font-sm " fill="#black"/>
                </button>
                <button 
                    className="p-2 rounded-full text-zinc-900 bg-zinc-100 shadow-lg"
                    onClick={() => setIsEditing(true)}
                >
                    Edit
                </button>
            </div>

            <div className="flex flex-col gap-1 items-center justify-center mb-6">
                <img className="w-24 h-24 rounded-full mb-2" src="/images/default-ava.jpg" alt="User Avatar" />
                <span className="font-medium text-sm leading-none">{title}</span>
                <span className="font-light text-xs leading-none text-zinc-500">
                {subtitle}
                </span>
            </div>

            <button 
                onClick={onClose}
                className="flex justify-center items-center shadow-sm rounded-2xl w-full mb-4 p-2 bg-zinc-100 text-sm text-zinc-900"
            >
                Message
            </button>

            {!isGroup && (
                <div className="flex flex-col bg-zinc-100 shadow-sm rounded-3xl px-3 py-3">
                    <span className="text-xs text-zinc-400">Phone</span>
                    <span className="text-zinc-900 font-light">{phone}</span>
                </div>
            )}

            { isGroup && chat.members && (
                <div className="flex flex-col bg-zinc-100 rounded-3xl px-4 py-2 shadow-sm ">
                    <div className="text-xs text-zinc-400 border-b border-zinc-200 py-2">
                        Members
                    </div>
                    <div className="overflow-y-auto">
                    { chat.members.map((member) => (
                        <div
                            key={member._id}
                            className="flex gap-2 bg-zinc-100 py-2 border-b last:border-none border-zinc-200"
                        >
                            <img 
                                src={ member?.avatar || '/images/default-ava.jpg'} 
                                alt="User Avatr" 
                                className="rounded-full w-9 h-9"
                            />
                            <div className="flex flex-col gap-0.5 justify-center">
                                <span className="font-medium leading-none text-sm">{member.name}</span>
                                <span className="leading-none text-sm text-zinc-400">   
                                {typeof member === 'object' && member?.lastSeen ? (
                                    `Last seen ${formatDistanceToNow(new Date(member.lastSeen), { addSuffix: true })}`
                                ) : (
                                    'Last seen recently'
                                )}
                                </span>
                            </div>
                        </div>
                    ))
                    }
                    </div>
                </div>
            )}
        </div>
    )

}