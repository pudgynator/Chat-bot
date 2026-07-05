import { useRef, useState } from "react";

type SearchBarProps = {
    onSearch: (value: string) => void;
    activeTab: string;
}


export function SearchBar({ onSearch, activeTab }: SearchBarProps) {
    const sign = "\u{1F50D}";
    const[isFocused, setIsFocused] = useState(false);
    const[value, setValue] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    return (
        <div className={`
            w-full px-4 border-zinc-100
            ${activeTab === 'settings' ? 'border-b-0' : 'border-b'}
        `}>
            <div className="relative">
                <input  
                    type="text"
                    ref={inputRef}
                    value={value}
                    onFocus={() =>setIsFocused(true)}
                    onBlur={() =>setIsFocused(false)}
                    onChange={e => {
                        setValue(e.target.value);
                        onSearch(e.target.value)
                    }} 
                    className="flex w-full mb-2 bg-zinc-100 text-sm text-zinc-400 text-center rounded-full px-5 py-1 focus:outline-none 
                        duration-300
                        indent-0
                        focus:indent-[-75%]
                        transition-all
                    " 
                    placeholder={`${sign} Search`}
                />
                
                { isFocused && (
                    <button
                        type="button"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => {
                            setValue("");
                            onSearch(""); 
                            inputRef.current?.blur()
                        }}
                        className="absolute right-3 top-[50%] -translate-y-1/2 rounded-full bg-zinc-400 text-white w-4 h-4 text-xs flex items-center justify-center"
                    >
                         ✕
                    </button>
                )}
            </div>
        </div>
    )
}