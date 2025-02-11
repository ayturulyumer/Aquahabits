import React, { useState } from "react";
import { useScreenSize } from "../../hooks/useScreenSize";

import SidebarNav from "../SidebarNav/SidebarNav.jsx";
import NavbarBottom from "../Navbar/NavbarBottom.jsx";

function DashboardShell({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const isMobile = useScreenSize();

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <div  className="flex flex-col min-h-screen bg-custom-gradient ">
            <div className="flex flex-1">
                {!isMobile ? (
                    <div
                        className={`bg-transparent text-neutral transition-all duration-300 ease-in-out ${
                            sidebarOpen ? "w-52" : "w-0"
                        }`}
                    >
                        <SidebarNav isOpen={sidebarOpen} />
                    </div>
                ) : null}

                {/* Main Content Area */}
                <div className="flex-1 overflow-y-auto pb-16">
                    <div className="container mx-auto py-6">
                        {React.Children.map(children, (child) =>
                            React.cloneElement(child, { toggleSidebar })
                        )}
                    </div>
                </div>
            </div>

            {isMobile && (


                    <NavbarBottom />
            )}
        </div>
    );
}

export default DashboardShell;
