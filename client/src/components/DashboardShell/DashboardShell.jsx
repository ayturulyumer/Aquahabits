import React, { useState } from "react";
import { useScreenSize } from "../../hooks/useScreenSize";

import SidebarNav from "../SidebarNav/SidebarNav.jsx";
import NavbarBottom from "../Navbar/NavbarBottom.jsx";

import { useAuth } from "../../context/authContext.jsx"

function DashboardShell({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const isMobile = useScreenSize();
    const { user } = useAuth()

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const hasUnclaimedRewards = user?.questProgress?.some((quest) => quest.isCompleted && !quest.isClaimed === true)

    return (
        <div className="flex flex-col min-h-screen bg-custom-gradient ">
            <div className="flex flex-1">
                {!isMobile ? (
                    <div
                        className={`bg-transparent text-neutral transition-all duration-300 ease-in-out ${sidebarOpen ? "w-52" : "w-0"
                            }`}
                    >
                        <SidebarNav hasUnclaimedRewards={hasUnclaimedRewards} isOpen={sidebarOpen} />
                    </div>
                ) : null}

                {/* Main Content Area */}
                <div className="flex-1 overflow-y-auto pb-16">
                    <div className="container mx-auto py-6">
                        {React.Children.map(children, (child) =>
                            React.cloneElement(child, { toggleSidebar, sidebarOpen })
                        )}
                    </div>
                </div>
            </div>

            {isMobile && (


                <NavbarBottom hasUnclaimedRewards={hasUnclaimedRewards} />
            )}
        </div>
    );
}

export default DashboardShell;
