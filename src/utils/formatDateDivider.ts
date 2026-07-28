
export const formatDateDivider = (dateString: string): string => {
    if (!dateString) return '';

    const messageDate = new Date(dateString);
    const now = new Date();

    const messageDay = new Date(messageDate.getFullYear(), messageDate.getMonth(), messageDate.getDate());
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    if (messageDay.getTime() === today.getTime()) {
        return 'Today';
    };

    if (messageDay.getTime() === yesterday.getTime()) {
        return 'Yesterday';
    };

    return messageDate.toLocaleDateString('en-UK', {
        day: 'numeric',
        month: 'long',
    });
};

export const isDifferentDay = (currentDateStr: string, prevDateStr?: string): boolean => {
    if (!prevDateStr) return true;

    const current = new Date(currentDateStr);
    const prev = new Date(prevDateStr);

    return (
        current.getDate() !== prev.getDate() ||
        current.getMonth() !== prev.getMonth() ||
        current.getFullYear() !== prev.getFullYear()
    );
};