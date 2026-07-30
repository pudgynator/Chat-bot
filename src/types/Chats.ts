export type ChatProps = {
    id: string;
    _id?: string;
    name: string;
    updatedAt: string;
    lastMessage?: string;
    lastMessageSender?: string;
    lastSeen?: string;
    time?: string;
    avatar?: string; 
    unreadCount?: number;
    members?: Array<string | { _id: string; id?: string; name?: string; avatar?: string }>;
}
