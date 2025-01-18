import { NavLink } from "react-router-dom";

import habitIcon from "../../svg/habit-icon.svg";
import missionIcon from "../../svg/mission-icon.svg";
import oceanIcon from "../../svg/ocean-icon.svg";

const menuItems = [
    { name: "Habits", href: "/dashboard/my-habits", icon: habitIcon, iconAlt: "Habits Icon" },
    { name: "Quests", href: "/dashboard/my-quests", icon: missionIcon, iconAlt: "Mission Icon", showIndicator: true },
    { name: "Aquarium", href: "/dashboard/my-aquarium", icon: oceanIcon, iconAlt: "Aquarium Icon" },
];

function SidebarNav({ isOpen }) {
    if (!isOpen) {
        return null;
    }

    return (
        <nav className="p-8">
            <ul className="space-y-2">
                {menuItems.map((item) => (
                    <NavLink
                        key={item.name}
                        to={item.href}
                        end={item.exact}
                        className={({ isActive }) =>
                            `flex items-center py-1 rounded-box transition-colors duration-200 ${isActive ? "bg-slate-700 text-lg" : "hover:bg-slate-500"}`
                        }
                    >
                        {({ isActive }) => (
                            <li className={`flex items-center justify-center font-semibold tracking-wide py-2 px-4 rounded relative text-sm ${isActive ? "text-base" : ""}`}>
                                <img
                                    className="h-6 w-6 mr-2"
                                    src={item.icon}
                                    alt={item.iconAlt}
                                />
                                {item.name}
                                {item.showIndicator && (
                                    <div className="indicator absolute -right-3 -top-1">
                                        <span className="indicator-item badge badge-xs badge-success animate-pulse"></span>
                                    </div>
                                )}
                            </li>
                        )}
                    </NavLink>
                ))}
            </ul>
        </nav>
    );
}

export default SidebarNav;
