
type ActionMenuProps = {
    isOpen: boolean;
    iconSrc: string;
    title: string | null;
    onClick: () => void;
}

export function ActionMenu({ isOpen, iconSrc, title, onClick }: ActionMenuProps) {
    if (!isOpen) {
        return null;
    }

    return (
        <div 
            className="flex items-center gap-2 absolute z-10 left-4 top-2 py-1 px-2 w-max text-sm bg-white/70 backdrop-blur-md border border-white/30 shadow-xl rounded-2xl hover:bg-white/50 hover:border-2"
            onClick={onClick}
        >
            <img src={iconSrc} alt="Icon" width='16px' height='16px'/>
            {title}
        </div>
    )
}