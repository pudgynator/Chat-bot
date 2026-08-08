export type ChatMember = {
    _id?: string;
    id: string;
    name: string;
    avatar?: string;
    lastSeen?: string;
};

export type ChatProps = {
    id: string;
    _id?: string;
    name: string;
    isGroup?: boolean;
    admin?: string | ChatMember;
    updatedAt: string;
    lastMessage?: string;
    lastMessageSender?: string;
    lastSeen?: string;
    time?: string;
    avatar?: string; 
    unreadCount?: number;
    members?: ChatMember[];
}
