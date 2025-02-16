import { NavLink } from "react-router-dom";
import habitIcon from "../../svg/habit-icon.svg";
import missionIcon from "../../svg/mission-icon.svg";
import oceanIcon from "../../svg/ocean-icon.svg";

const menuItems = [
    { name: "Habits", href: "/dashboard/my-habits", icon: habitIcon, iconAlt: "Habits Icon" },
    { name: "Quests", href: "/dashboard/my-quests", icon: missionIcon, iconAlt: "Mission Icon", checkUnclaimed: true },
    { name: "Aquarium", href: "/dashboard/my-aquarium", icon: oceanIcon, iconAlt: "Aquarium Icon" },
];

export default function NavbarBottom({ hasUnclaimedRewards }) {
    return (
        <nav className="btm-nav border-t   bg-transparent h-fit rounded-t-md z-50 backdrop-blur-sm flex justify-between items-center ">
            {menuItems.map((item) => (
                <NavLink
                    key={item.name}
                    to={item.href}
                    className={({ isActive }) =>
                        `flex flex-col items-center justify-center  ${isActive ? "bg-white/55 rounded" : ""}`
                    }
                >
                    <img className="w-8 h-8" src={item.icon} alt={item.iconAlt} />
                    {hasUnclaimedRewards && item.checkUnclaimed &&
                        <div className="indicator  absolute right-10 -top-1 ">
                            <span className="indicator-item badge badge-xs badge-success animate-pulse"></span>
                        </div>
                    }
                </NavLink>
            ))}
        </nav>

    );
}
