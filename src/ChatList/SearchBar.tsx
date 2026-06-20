
type SearchBarProps = {
    onSearch: (value: string) => void;
}


export function SearchBar({ onSearch }: SearchBarProps) {
    const sign = "\u{1F50D}";

    return (
        <div className="w-full px-4 mb-2">
            <input  
                type="text"
                onChange={e => onSearch(e.target.value)} 
                className="flex w-full bg-zinc-100 text-sm text-zinc-400 text-center rounded-full px-6 py-1 focus:outline-none" 
                placeholder={`${sign} Search`}
            />
        </div>
    )
}