
export const filterUsers = <T extends {name: string }>(
        items: T[], search: string
    ) => {
        return items.filter(item => 
            item.name.toLowerCase().includes(search.toLowerCase())
    )
}