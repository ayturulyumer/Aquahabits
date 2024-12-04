import HomeIcon from "../../svg/home-icon.svg"
import AddIcon from "../../svg/add-icon.svg"
import HabitsIcon from "../../svg/habits-icon.svg"

export default function NavbarBottom() {
    return (
        <nav className="btm-nav bg-inherit  ">
            <button>
                <img className="w-6 h-6" src={HomeIcon} alt="Home Icon" />
            </button>
            <button  >
                <img className="w-16 h-16 " src={AddIcon} alt="Add Icon" />
            </button>
            <button>
                <img className="w-6 h-6" src={HabitsIcon} alt="Habits Icon" />
            </button>
        </nav>
    )
}
