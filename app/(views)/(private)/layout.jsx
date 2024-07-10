import Sidebar from "@/app/_components/Sidebar/sidebar";
import Header from "@/app/_components/Header/header";
import Sidebar2 from "@/app/_components/Sidebar/Responsive/sidebar2";

export default function Layout({children}) {
    return (
        <>
            <main className="relative h-screen bg-gray-100 dark:bg-gray-800 rounded-2xl">
                <div className="flex items-start justify-between">
                    <div className="relative h-screen">
                        <Sidebar/>
                        <Sidebar2/>
                    </div>
                    <div className="flex flex-col w-full pl-0 md:p-4 md:space-y-4">
                        {/* <Header /> */}
                        <div className="pt-2 pb-24 pl-2 pr-2 overflow-auto md:pt-0 md:pr-0 md:pl-0">
                            <div className="flex flex-col flex-wrap sm:flex-row ">
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}