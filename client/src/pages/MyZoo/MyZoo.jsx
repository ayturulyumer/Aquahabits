import { useState, useEffect } from "react";
import Button from "../../components/Button/Button.jsx";
import UnmuteIcon from "../../svg/unmute-icon.svg"
import MuteIcon from "../../svg/mute-icon.svg"

const GRID_SIZE = 6;
const ITEM_TYPES = [
  { name: "Goldfish", type: "animal", cost: 100, emoji: "🐟" },
  { name: "Clownfish", type: "animal", cost: 120, emoji: "🐠" },
  { name: "Shark", type: "animal", cost: 250, emoji: "🦈" },
  { name: "Seaweed", type: "plant", cost: 50, emoji: "🌿" },
  { name: "Anchor", type: "decoration", cost: 60, emoji: "⚓" },
];

export default function MyZoo() {
  const [grid, setGrid] = useState(
    Array(GRID_SIZE)
      .fill(null)
      .map(() => Array(GRID_SIZE).fill(null))
  );
  const [selectedCell, setSelectedCell] = useState(null);
  const [userPoints, setUserPoints] = useState(1000000); // Starting points
  const [isMuted, setIsMuted] = useState(false); // Sound state

  const bubbleSound = new Audio("/aquarium-sound.mp3");

  // Ensure the sound only plays once and loops infinitely
  useEffect(() => {
    bubbleSound.loop = true; // Set the sound to loop indefinitely
    bubbleSound.volume = isMuted ? 0 : 0.2; // Adjust volume based on mute state
    if (!isMuted) {
      bubbleSound.play();
    } else {
      bubbleSound.pause();
    }

    // Cleanup the audio when the component unmounts
    return () => {
      bubbleSound.pause();
      bubbleSound.currentTime = 0; // Reset to the beginning
    };
  }, [isMuted]); // Depend on isMuted to toggle sound

  const handleCellClick = (row, col) => {
    setSelectedCell({ row, col });
  };

  const handleItemSelect = (item) => {
    if (userPoints >= item.cost) {
      const newGrid = [...grid];
      newGrid[selectedCell.row][selectedCell.col] = item;
      setGrid(newGrid);
      setUserPoints(userPoints - item.cost);
      setSelectedCell(null);
    } else {
      alert("Not enough points to add this item!");
    }
  };

  useEffect(() => {
    const bubbleInterval = setInterval(() => {
      // Randomly add new bubbles in the grid
      const newGrid = [...grid];
      for (let row = 0; row < GRID_SIZE; row++) {
        for (let col = 0; col < GRID_SIZE; col++) {
          if (Math.random() < 0.05) {
            const cell = newGrid[row][col];
            if (cell === null) {
              newGrid[row][col] = { type: "bubble" };
            }
          }
        }
      }
      setGrid(newGrid);
    }, 3000);

    return () => clearInterval(bubbleInterval); // Cleanup on unmount
  }, [grid]);

  return (
    <div className="container mx-auto p-2">
      <h2 className="text-2xl font-bold text-primary mb-4">My Zoo</h2>
      <div className="mb-4">
        <span className="text-lg font-semibold">Points: {userPoints}</span>
      </div>


      <div className="flex justify-center p-2">
        <div className="grid grid-cols-6 max-w-2xl bg-gradient-to-b from-blue-500 to-blue-950 w-full gap-0 relative">
          {grid.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className="aspect-square border rounded border-dotted border-base-300 flex items-center justify-center md:text-4xl cursor-pointer hover:bg-base-300 transition-colors duration-200 relative water-grid"
                onClick={() => handleCellClick(rowIndex, colIndex)}
              >
                {/* Show item or emoji */}
                {cell && cell.emoji ? cell.emoji : ""}

                {/* Add bubbles inside cells */}
                {cell?.type === "bubble" && (
                  <div
                    className="bubble"
                    style={{
                      left: `${Math.random() * 100}%`, // Random horizontal position
                      bottom: "0%", // Start from the bottom
                    }}
                  ></div>
                )}

              </div>
            ))
          )}
          <Button
            className="absolute -top-12 right-0  "
            variant="btn-ghost"
            isSquare
            iconLeft={isMuted ? MuteIcon : UnmuteIcon}
            onClick={() => setIsMuted(!isMuted)}
          />
        </div>
      </div>

      {
        selectedCell && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-base-100 p-6 rounded-lg shadow-xl w-full max-w-md">
              <h3 className="text-xl font-semibold mb-4 text-primary">Add to Your Zoo</h3>
              <div className="grid grid-cols-3 gap-4">
                {ITEM_TYPES.map((item) => (
                  <button
                    key={item.name}
                    className={`p-2 rounded-lg flex flex-col items-center justify-center ${userPoints >= item.cost
                      ? "bg-primary hover:bg-primary-focus"
                      : "bg-gray-300 cursor-not-allowed"
                      }`}
                    onClick={() => handleItemSelect(item)}
                    disabled={userPoints < item.cost}
                  >
                    <span className="text-2xl mb-1">{item.emoji}</span>
                    <span className="text-sm">{item.name}</span>
                    <span className="text-xs">{item.cost} pts</span>
                  </button>
                ))}
              </div>
              <button
                className="mt-4 btn btn-ghost"
                onClick={() => setSelectedCell(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        )
      }
    </div >
  );
}
