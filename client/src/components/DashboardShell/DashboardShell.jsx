import React, { useState } from "react";
import { useScreenSize } from "../../hooks/useScreenSize";

import SidebarNav from "../SidebarNav/SidebarNav.jsx";
import NavbarBottom from "../Navbar/NavbarBottom.jsx"

function DashboardShell({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const isMobile = useScreenSize();

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <div className="flex h-screen overflow-hidden bg-custom-gradient">
            {!isMobile ? (
                // Render Sidebar for larger screens
                <div
                    className={`bg-custom-gradient text-neutral transition-all duration-300 ease-in-out ${sidebarOpen ? "w-52" : "w-0"
                        }`}
                >
                    <SidebarNav isOpen={sidebarOpen} />
                </div>
            ) : (
                // Render Bottom Navbar for mobile screens
                <NavbarBottom />
            )}

            {/* Main Content Area */}
            <div className="flex-1 overflow-y-auto">
                <div className="container mx-auto py-6">
                    {React.Children.map(children, (child) =>
                        React.cloneElement(child, { toggleSidebar })
                    )}
                </div>
            </div>
        </div>
    );
}

export default DashboardShell;
