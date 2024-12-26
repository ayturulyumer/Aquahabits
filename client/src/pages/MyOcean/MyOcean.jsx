import { useState, useEffect } from "react";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale-extreme.css";
import Button from "../../components/Button/Button.jsx";
import UnmuteIcon from "../../svg/unmute-icon.svg";
import MuteIcon from "../../svg/mute-icon.svg";
import LevelUpIcon from "../../svg/levelup-icon.svg"

const GRID_SIZE = 6;
const ITEM_TYPES = [
  { name: "Goldfish", rarity: "common", cost: 100, emoji: "🐟", level: 1, size: "small" },
  { name: "Clownfish", rarity: "rare", cost: 120, emoji: "🐠", level: 1, size: "medium" },
  { name: "Shark", rarity: "legendary", cost: 250, emoji: "🦈", level: 1, size: "large" },
  { name: "Seaweed", rarity: "common", cost: 50, emoji: "🌿", level: 1, size: "small" },
  { name: "Anchor", rarity: "common", cost: 60, emoji: "⚓", level: 1, size: "small" },
];

export default function MyAquarium() {
  const [grid, setGrid] = useState(
    Array(GRID_SIZE)
      .fill(null)
      .map(() => Array(GRID_SIZE).fill(null))
  );
  const [userPoints, setUserPoints] = useState(1000);
  const [isMuted, setIsMuted] = useState(false);
  const [activeCell, setActiveCell] = useState(null); // Track the active cell for tooltip visibility

  const bubbleSound = new Audio("/aquarium-sound.mp3");
  const splashSound = new Audio("/splash-sound.mp3");
  const growSound = new Audio("/levelup-sound.mp3");

  useEffect(() => {
    bubbleSound.loop = true;
    bubbleSound.volume = isMuted ? 0 : 0.2;
    if (!isMuted) {
      bubbleSound.play();
    } else {
      bubbleSound.pause();
    }

    return () => {
      bubbleSound.pause();
      bubbleSound.currentTime = 0;
    };
  }, [isMuted]);

  const handleItemSelect = (row, col, item) => {
    if (userPoints >= item.cost) {
      const newGrid = [...grid];
      // Deep copy the item to avoid shared reference
      const itemCopy = { ...item };
      newGrid[row][col] = itemCopy;
      setGrid(newGrid);
      setUserPoints(userPoints - item.cost);
      splashSound.volume = 0.05;
      splashSound.play();

      // Hide the Tippy tooltip after selecting the item
      setActiveCell(null);
    } else {
      alert("Not enough points to add this item!");
    }
  };


  const growAnimal = (row, col) => {
    const newGrid = [...grid];
    const animal = newGrid[row][col];

    if (animal) {
      growSound.volume = 0.1;
      growSound.play();

      animal.isGrowing = true; // Trigger animation
      setGrid(newGrid);

      setTimeout(() => {
        animal.isGrowing = false; // Remove animation after it ends
        if (animal.level === 1) {
          animal.level = 2;
        } else if (animal.level === 2) {
          animal.level = 3;
        }
        setGrid([...newGrid]);
      }, 400); // Duration matches CSS animation
    }
  };


  const removeAnimal = (row, col) => {
    const newGrid = [...grid];
    const animal = newGrid[row][col];

    if (animal && animal.level) {
      newGrid[row][col] = null; // Remove the animal
      setGrid(newGrid);
      setUserPoints(userPoints + animal.cost); // Add points back when removing
    }
  };

  return (
    <div className="container mx-auto p-2">
      <h2 className="text-2xl font-bold text-primary mb-4">My Ocean</h2>
      <div className="mb-4">
        <span className="text-lg font-semibold">Points: {userPoints}</span>
      </div>

      <div className="flex justify-center p-2">
        <div className="grid grid-cols-6 max-w-2xl bg-gradient-to-b from-blue-500 to-blue-950 w-full gap-0 relative">
          {grid.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <Tippy
                key={`${rowIndex}-${colIndex}`}
                content={
                  cell ? (
                    // Show habitat information if the cell is occupied
                    <div className="p-2">
                      <h4 className="font-semibold text-lg">{cell.name}</h4>
                      <p className="text-sm">Rarity: {cell.rarity}</p>
                      <p className="text-sm">Level: {cell.level}</p>
                      <p className="text-xs">Cost: {cell.cost} pts</p>
                      <div className="flex gap-2">
                        <Button
                          className="bg-blue-500 text-white"
                          onClick={() => growAnimal(rowIndex, colIndex)}
                          disabled={cell.level === 3}
                        >
                          {cell.level === 3 ? "Max Level" : "Grow"}
                        </Button>
                        <Button
                          className="bg-red-500 text-white"
                          onClick={() => removeAnimal(rowIndex, colIndex)}
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  ) : (
                    // Show item selection menu if the cell is empty
                    <div className="grid grid-cols-1 max-w-42 max-h-32 md:max-h-48 md:grid-cols-2 lg:max-h-52 transition-all ease-in-out duration-500 overflow-y-auto gap-4 p-2 transform hover:scale-105">
                      {ITEM_TYPES.map((item) => (
                        <button
                          key={item.name}
                          className={`p-2 rounded-lg shadow-md flex md:flex-col  items-center justify-between gap-2 ${userPoints >= item.cost
                            ? "hover:bg-primary-focus"
                            : "bg-gray-300 cursor-not-allowed"
                            }`}
                          onClick={() => handleItemSelect(rowIndex, colIndex, item)}
                          disabled={userPoints < item.cost}
                        >
                          <span className="text-2xl mb-1">{item.emoji}</span>
                          <span className="text-sm">{item.name}</span>
                          <span className="text-xs">{item.cost} pts</span>
                        </button>
                      ))}
                    </div>
                  )
                }
                visible={activeCell && activeCell.row === rowIndex && activeCell.col === colIndex} // Only show tooltip for the active cell
                onClickOutside={() => setActiveCell(null)}
                placement="auto-start"
                interactive={true}
                arrow={true}
                animation="scale-extreme"
              >
                <div
                  className={`relative aspect-square border rounded border-dotted border-gray-500 flex items-center justify-center cursor-pointer hover:bg-base-100 animate-pulse transition-colors duration-200 ${cell && cell.level === 1
                    ? "md:text-xl"
                    : cell && cell.level === 2
                      ? "md:text-2xl"
                      : cell && cell.level === 3
                        ? "md:text-4xl"
                        : ""

                    } ${cell && cell.isGrowing ? "glowing-border" : ""}`}

                  onClick={() => setActiveCell({ row: rowIndex, col: colIndex })} // Set active cell on click
                >
                  {cell && cell.emoji ? cell.emoji : ""}

                  {/* Show Level Up icon when the animal is growing */}
                  {cell?.isGrowing && (
                    <span className="level-up-icon h-3 w-3 md:h-6 md:w-6">
                      <img src={LevelUpIcon} alt="Level Up" />
                    </span>
                  )}
                </div>





              </Tippy>
            ))
          )}
          <Button
            className="absolute -top-12 right-0"
            type="button"
            variant="btn-ghost"
            isSquare
            iconLeft={isMuted ? MuteIcon : UnmuteIcon}
            onClick={() => setIsMuted(!isMuted)}
          />
        </div>
      </div>
    </div>
  );
}
