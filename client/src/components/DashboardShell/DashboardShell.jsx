import React, { useState } from 'react';
import SidebarNav from '../SidebarNav/SidebarNav.jsx';

function DashboardShell({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <div className="flex h-screen overflow-hidden bg-custom-gradient text-neutral font-lexend">
            <div
                className={`bg-custom-gradient text-neutral transition-all duration-300 ease-in-out ${sidebarOpen ? 'w-64' : 'w-0'
                    }`}
            >
                <SidebarNav isOpen={sidebarOpen} />
            </div>
            <div className="flex-1 overflow-y-auto">
                <div className="container mx-auto py-6">
                    {React.Children.map(children, child =>
                        React.cloneElement(child, { toggleSidebar })
                    )}
                </div>
            </div>
        </div>
    );
}

export default DashboardShell;

