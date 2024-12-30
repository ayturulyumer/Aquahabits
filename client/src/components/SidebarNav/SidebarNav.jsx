
import { NavLink } from "react-router-dom";

import habitIcon from "../../svg/habit-icon.svg"
import missionIcon from "../../svg/mission-icon.svg"
import oceanIcon from "../../svg/ocean-icon.svg"


const menuItems = [
    { name: "Habits", href: "/dashboard/my-habits", icon: habitIcon, iconAlt: "Habits Icon" },
    { name: "Quests", href: "/dashboard/my-quests", icon: missionIcon, iconAlt: "Mission Icon" },
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
                            `flex items-center py-2 px-4 rounded transition-colors duration-200 ${isActive ? "bg-primary text-secondary" : "hover:bg-primary hover:text-secondary"
                            }`
                        }
                    >
                        {({ isActive }) => (
                            <li className="flex items-center py-2 px-4 rounded">
                                <img className={`h-8 w-8 mr-2  ${isActive ? "animate-bounce" : ""}`} src={item.icon} alt={item.iconAlt} />
                                {item.name}
                            </li>
                        )}
                    </NavLink>
                ))}
            </ul>
        </nav>

    );
}

export default SidebarNav;
