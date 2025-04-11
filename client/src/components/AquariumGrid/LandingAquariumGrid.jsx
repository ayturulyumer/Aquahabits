import { useState } from "react";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale-extreme.css";


const randomCreatures = [
    { name: "Starfish", icon: "https://res.cloudinary.com/dquoir0sw/image/upload/v1738147901/starfish_avywbv.png" },
    { name: "Stringray", icon: "https://res.cloudinary.com/dquoir0sw/image/upload/v1742205160/stringray_p1q1z9.png" },
    { name: "Turtle", icon: "https://res.cloudinary.com/dquoir0sw/image/upload/v1738147900/seaturtle_cqlfyk.png" },
    { name: "Jellyfish", icon: "https://res.cloudinary.com/dquoir0sw/image/upload/v1738147882/jellyfish_g7bpgh.png" },
    { name: "Octopus", icon: "https://res.cloudinary.com/dquoir0sw/image/upload/v1738147898/octopus_mzfwn8.png" },
    { name: "Whale", icon: "https://res.cloudinary.com/dquoir0sw/image/upload/v1738147904/whale_sukixr.png" },
    { name: "Clownfish", icon: "https://res.cloudinary.com/dquoir0sw/image/upload/v1742203930/clownfish_vtthkl.png" },
    { name: "Shark", icon: "https://res.cloudinary.com/dquoir0sw/image/upload/v1742204876/shark_jj86xa.png" },
    { name: "Crab", icon: "https://res.cloudinary.com/dquoir0sw/image/upload/v1738147882/crab_mtgdtm.png" },
    { name: "Dolphin", icon: "https://res.cloudinary.com/dquoir0sw/image/upload/v1738147881/dolphin_tho0lw.png" },

];

export default function LandingAquariumGrid({ grid }) {
    const [activeCell, setActiveCell] = useState(null);

    const placeRandomAnimal = (rowIndex, colIndex) => {
        const randomIndex = Math.floor(Math.random() * randomCreatures.length);
        const randomCreature = randomCreatures[randomIndex];


        grid[rowIndex][colIndex] = {
            ...randomCreature,
            isGrowing: false, // No grow animation for demo
        };

        const splashSound = new Audio("/splash-sound.mp3");
        splashSound.volume = 0.1
        splashSound.play();

    };

    return (
        <>
            {grid.map((row, rowIndex) =>
                row.map((cell, colIndex) => (
                    <div
                        className={`relative aspect-square border rounded border-dotted border-gray-500 flex items-center justify-center cursor-pointer hover:bg-base-100 animate-pulse transition-colors duration-200`}
                        onClick={() => {
                            setActiveCell({ row: rowIndex, col: colIndex });
                            placeRandomAnimal(rowIndex, colIndex);
                        }}
                    >
                        {cell?.icon && (
                            <img
                                src={cell.icon}
                                alt={cell.name}
                                className={`transition-transform duration-200 w-8 h-8 ease-in-out `}
                            />
                        )}
                    </div>
                ))
            )}
        </>
    );
}
