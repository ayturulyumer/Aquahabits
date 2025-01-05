import { useState, useEffect } from "react";
import Button from "../../components/Button/Button.jsx";
import UnmuteIcon from "../../svg/unmute-icon.svg";
import MuteIcon from "../../svg/mute-icon.svg";



import AquariumGrid from "../../components/AquariumGrid/AquariumGrid.jsx";
import BubbleContainer from "../../components/BubbleContainer/BubbleContainer.jsx";
import UnlockGrid from "../../components/UnlockGrid/UnlockGrid.jsx";
import { useAuth } from "../../context/authContext.jsx";
import { useContext } from "react";

const GRID_SIZE = 6;



export default function MyAquarium() {
  const { userPoints, increaseUserPoints, decreaseUserPoints } = useAuth()
  const [grid, setGrid] = useState(
    Array(GRID_SIZE)
      .fill(null)
      .map(() => Array(GRID_SIZE).fill(null))
  );

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
      const itemCopy = { ...item };
      newGrid[row][col] = itemCopy;
      setGrid(newGrid);
      decreaseUserPoints(item.cost);
      splashSound.volume = 0.05;
      splashSound.play();

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
      increaseUserPoints(animal.cost)
    }
  };



  return (
    <div className="container mx-auto p-2">
      <h2 className="text-2xl font-bold text-primary mb-4">My Ocean</h2>

      <div className="flex flex-wrap justify-around gap-4 p-2">
        <div className="grid  grid-cols-6 max-w-2xl bg-gradient-to-b from-blue-500 to-blue-950 w-full gap-0 relative">
          <AquariumGrid
            grid={grid}
            handleItemSelect={handleItemSelect}
            growAnimal={growAnimal}
            removeAnimal={removeAnimal}
            setActiveCell={setActiveCell}
            activeCell={activeCell}
            userPoints={userPoints} />
          {/* Render the bubbles container */}
          <BubbleContainer />

          <Button
            className="absolute -top-12 right-0"
            type="button"
            variant="btn-ghost"
            isSquare
            iconLeft={isMuted ? MuteIcon : UnmuteIcon}
            onClick={() => setIsMuted(!isMuted)}
          />
        </div>
        <UnlockGrid />
      </div>
    </div>
  );
}
