import {
    MessageCircle,
    Phone,
    Users,
    Settings
} from "lucide-react";

type ChatTabProps = {
    id: string;
    icon: React.ElementType;
};

export const tabs: ChatTabProps[] = [
    {
        id: "contacts",
        icon: Users,
    },
    {
        id: "calls",
        icon: Phone,
    },
    {
        id: "chats",
        icon: MessageCircle,
    },
    {
        id: "settings",
        icon: Settings,
    },
];
