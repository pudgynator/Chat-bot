import { MainContent } from "./MainContent";
import { Sidebar } from "./Sidebar";


export function Layout() {
    return (
        <div className="flex h-screen w-screen overflow-y-hidden">
            
            <Sidebar/>
            
            <MainContent/>

        </div>
    )
}