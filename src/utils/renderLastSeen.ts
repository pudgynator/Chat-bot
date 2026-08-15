import { formatDistanceToNow } from "date-fns";


interface LastSeenOptions {
    isGroup?: boolean;
    membersCount?: number;
    lastSeen?: string | Date | null; 
}

export function renderLastSeen({ isGroup, membersCount = 0, lastSeen }: LastSeenOptions): string {
    if (isGroup) {
        return `${membersCount} ${membersCount === 1 ? 'member' : 'members'}`;
    }

    if (!lastSeen) {
        return 'Last seen recently';
    }

    try {
        const date = typeof lastSeen === 'string' ? new Date(lastSeen) : lastSeen;
        if (isNaN(date.getTime())) {
            return 'Last seen recently';
        }
        return `Last seen ${formatDistanceToNow(date, { addSuffix: true })}`;
    } catch {
        return 'Last seen recently';
    }
} 