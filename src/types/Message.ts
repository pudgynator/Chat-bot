
export type MessageProps = {
    id: string;
    chat: string;
    sender: {
        _id: string;
        name: string;
    };
    text: string;
    createdAt: string;
};