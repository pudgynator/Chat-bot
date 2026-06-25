
type SearchBarProps = {
    onSearch: (value: string) => void;
}


export function SearchBar({ onSearch }: SearchBarProps) {
    const sign = "\u{1F50D}";

    return (
        <div className="w-full px-4 border-b border-zinc-100">
            <input  
                type="text"
                onChange={e => onSearch(e.target.value)} 
                className="flex w-full mb-2 bg-zinc-100 text-sm text-zinc-400 text-center rounded-full px-5 py-1 focus:outline-none 
                    duration-300
                    indent-0
                    focus:indent-[-75%]
                    transition-all
                " 
                placeholder={`${sign} Search`}
            />
        </div>
    )
}