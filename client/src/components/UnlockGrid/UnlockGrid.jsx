import LockedIcon from "../../svg/locked-icon.svg"
import UnlockedIcon from "../../svg/unlocked-icon.svg"
import { ITEM_TYPES } from "../../utils/constants.js";


export default function UnlockGrid() {
    return (
        <div className="grid  my-4 grid-cols-1 md:grid-cols-2 gap-6">
            {/* Unlocked Habitats */}
            <div>
                <h2 className="text-xl  font-semibold mb-3 flex gap-1">
                    <img className="w-6 h-6" src={UnlockedIcon} alt="Unlocked Icon" />
                    Unlocked
                </h2>
                <div className="grid max-w-96 w-full grid-cols-5 gap-2">
                    {ITEM_TYPES.map((creature) => (
                        <div key={creature.name} className="bg-base-100 rounded-lg flex flex-col items-center justify-center shadow-sm hover:shadow-md transition-shadow duration-300  border border-blue-200">
                            <figure className="p-2 ">
                                <img className="w-6 h-6" src={creature.icon} alt={creature.name} />
                            </figure>
                        </div>
                    ))}
                </div>
            </div>

            {/* Unlockable Habitats */}
            <div>
                <h2 className="text-xl font-semibold mb-3 flex gap-1 ">
                    <img className="h-6 w-6" src={LockedIcon} alt="Locked Icon" />
                    Unlockable
                </h2>
                <div className=" grid grid-cols-5 gap-2 shadow">
                    {ITEM_TYPES.map((creature) => (
                        <div key={creature.name} className="bg-base-100 rounded-lg  flex flex-col items-center justify-center shadow-sm hover:shadow-md transition-shadow duration-300  border border-red-500">
                            <figure className="p-2">
                                <img className="w-6 h-6" src={creature.icon} alt={creature.name} />
                            </figure>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
