import { NavLink } from "react-router-dom";
import habitIcon from "../../svg/habit-icon.svg";
import missionIcon from "../../svg/mission-icon.svg";
import oceanIcon from "../../svg/ocean-icon.svg";

const menuItems = [
    { name: "Habits", href: "/dashboard/my-habits", icon: habitIcon, iconAlt: "Habits Icon" },
    { name: "Quests", href: "/dashboard/my-quests", icon: missionIcon, iconAlt: "Mission Icon" },
    { name: "Aquarium", href: "/dashboard/my-aquarium", icon: oceanIcon, iconAlt: "Aquarium Icon" },
];

export default function NavbarBottom() {
    return (
        <nav className="btm-nav  btm-nav-lg bg-transparent h-fit rounded-t-2xl z-50 backdrop-blur-sm flex justify-between items-center ">
            {menuItems.map((item) => (
                <NavLink
                    key={item.name}
                    to={item.href}
                    className={({ isActive }) =>
                        `flex flex-col items-center justify-center  ${isActive ? "bg-primary  rounded" : ""}`
                    }
                >
                    <img className="w-8 h-8" src={item.icon} alt={item.iconAlt} />
                </NavLink>
            ))}
        </nav>

    );
}
