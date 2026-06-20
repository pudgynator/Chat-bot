

export function MainContent() {
    return (
        <main className="flex flex-1 w-screen h-screen min-w-[300px] lg:min-w-0">
            <div className="flex h-full w-full items-center justify-center bg-[url('/images/bg-image.jpg')] bg-cover bg-center bg-no-repeat">
                <span className="text-white text-sm whitespace-nowrap bg-[#0e1621]/60 px-3 py-1.5 backdrop-blur-md rounded-full">
                    Select a chat to start messaging
                </span>
            </div>
        </main>
    )
}