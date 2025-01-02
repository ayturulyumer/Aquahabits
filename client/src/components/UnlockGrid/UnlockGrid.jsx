import LockedIcon from "../../svg/locked-icon.svg"
import UnlockedIcon from "../../svg/unlocked-icon.svg"

// Sample data for sea habitats
const unlockedHabitats = [
    { name: "Goldfish", rarity: "common", cost: 100, emoji: "🐟", level: 1, size: "small" },
    { name: "Clownfish", rarity: "rare", cost: 120, emoji: "🐠", level: 1, size: "medium" },
];

const lockableHabitats = [
    { name: "Shark", rarity: "legendary", cost: 250, emoji: "🦈", level: 1, size: "large" },
    { name: "Seaweed", rarity: "common", cost: 50, emoji: "🌿", level: 1, size: "small" },
    { name: "Anchor", rarity: "common", cost: 60, emoji: "⚓", level: 1, size: "small" },
];

export default function UnlockGrid() {
    return (
        <div className="grid  my-4 grid-cols-1 md:grid-cols-2 gap-6">
            {/* Unlocked Habitats */}
            <div>
                <h2 className="text-xl  font-semibold mb-3 flex gap-1">
                    <img className="w-6 h-6" src={UnlockedIcon} alt="Unlocked Icon" />
                    Unlocked
                </h2>
                <div className="grid grid-cols-3 gap-2">
                    {unlockedHabitats.map((habitat) => (
                        <div key={habitat.name} className="bg-base-100 rounded-lg flex flex-col items-center justify-center shadow-sm hover:shadow-md transition-shadow duration-300  border border-blue-200">
                            <figure className="px-2 pt-2 ">
                                <div className="text-2xl mb-1  ">{habitat.emoji}</div>
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
                <div className="grid grid-cols-3 gap-2">
                    {lockableHabitats.map((habitat) => (
                        <div key={habitat.name} className="bg-base-100 rounded-lg  flex flex-col items-center justify-center shadow-sm hover:shadow-md transition-shadow duration-300  border border-red-500">
                            <figure className="px-2 pt-2 ">
                                <div className="text-2xl mb-1 opacity-30">{habitat.emoji}</div>
                            </figure>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
