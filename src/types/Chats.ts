export type ChatProps = {
    id: string;
    _id?: string;
    name: string;
    lastMessage?: string;
    lastMessageSender?: string;
    time?: string;
    avatar?: string; 
    members?: Array<string | { _id: string; id?: string; name?: string; avatar?: string }>;
}
