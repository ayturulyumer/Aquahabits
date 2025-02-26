import { useState, useEffect } from "react";
import Button from "../../components/Button/Button.jsx";
import UnmuteIcon from "../../svg/unmute-icon.svg";
import MuteIcon from "../../svg/mute-icon.svg";

import * as creaturesApi from "../../actions/creatureActions.js";
import { useQuery } from "react-query";
import { useGenericMutation } from "../../hooks/useMutation.js";



import AquariumGrid from "../../components/AquariumGrid/AquariumGrid.jsx";
import BubbleContainer from "../../components/BubbleContainer/BubbleContainer.jsx";
import { useAuth } from "../../context/authContext.jsx";
import { GROWTH_COSTS } from "../../utils/constants.js";
import ConfirmationModal from "../../components/ConfirmationModal/ConfirmationModal.jsx";

const GRID_SIZE = 6;



export default function MyAquarium() {
  const { user, updateAquaCoins, updateUserCreatures, removeUserCreature } = useAuth()
  const [grid, setGrid] = useState(
    Array(GRID_SIZE)
      .fill(null)
      .map(() => Array(GRID_SIZE).fill(null))
  );

  const [isMuted, setIsMuted] = useState(true);
  const [activeCell, setActiveCell] = useState(null); // Track the active cell for tooltip visibility
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false)
  const [selectedCreatureToRemove, setSelectedCreatureToRemove] = useState(null)

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





  const {
    data: creatures,
    isLoading: creaturesLoading,
    error: creaturesError,
  } = useQuery({
    queryKey: "creatures",
    queryFn: creaturesApi.getAll
  })

  useEffect(() => {
    if (user?.creatures && creatures) {
      const newGrid = Array(GRID_SIZE)
        .fill(null)
        .map(() => Array(GRID_SIZE).fill(null));


      user.creatures.forEach(({ _id, creatureId, coordinates, level, size }) => {
        // Find the base creature model from the creatures array
        const creature = creatures?.find((c) => c._id === creatureId);
        if (creature) {
          // Merge creature properties with user-specific data (level, size, coordinates)
          const mixedCreature = {
            ...creature,               // Base creature properties (e.g., name, pricing, rarity)
            level,                     // User-specific level
            size,                      // User-specific size
            x: coordinates.x,          // User-specific coordinates (x)
            y: coordinates.y,          // User-specific coordinates (y)
            _id: _id,       // User creature's _id
            creatureId: creature._id,  // Base creature's _id
          };


          // Place the merged creature into the grid at the appropriate position
          newGrid[coordinates.x][coordinates.y] = mixedCreature;
        }
      });

      setGrid(newGrid);
    }
  }, [user?.creatures, creatures]);



  const addCreatureMutation = useGenericMutation({
    mutationFn: creaturesApi.addCreature,
    queryKey: "creatures",
    onSuccess: (data, variables) => {
      const { item } = variables;
      updateAquaCoins(data.aquaCoins);
      updateUserCreatures(data.addedCreature);

      //  Merge addedCreature with the item data
      setGrid((prevGrid) => {
        const newGrid = [...prevGrid];
        const { x, y } = data.addedCreature.coordinates;

        // Merge addedCreature and item, give priority to addedCreature's properties (e.g. level, size)
        const mixedCreature = {
          ...data.addedCreature, // properties like level, size, etc.
          ...item,               // properties like pricing, rarity, etc.
          x,                     // Ensure coordinates are correctly placed in the grid
          y,
        };
        newGrid[x][y] = mixedCreature; // Update grid with the merged object

        return newGrid;
      });


      splashSound.volume = 0.05;
      splashSound.play();

      setActiveCell(null);
    },
    onError: (error) => console.error("Error adding creature to user:", error),
  });

  const levelUpCreatureMutation = useGenericMutation({
    mutationFn: creaturesApi.levelUpCreature,
    queryKey: "creatures",
    onSuccess: (data) => {
      const updatedCreature = data.updatedCreature;

      // Play sound when leveling up
      growSound.volume = 0.1;
      growSound.play();

      updateUserCreatures(updatedCreature);
      updateAquaCoins(data.updatedAquaCoins);
    },
    onError: (error) => console.error("Error leveling up creature:", error),
  });

  const removeCreatureMutation = useGenericMutation({
    mutationFn: creaturesApi.removeCreature,
    queryKey: "creatures",
    // This will force re-rendering of the grid immediately when the creature is removed
    onSuccess: (data, variables) => {
      const { userCreatureId } = variables;


      updateAquaCoins(data.updatedAquaCoins);
      removeUserCreature(userCreatureId); // This should now correctly remove the creature
    },



    onError: (error) => console.error("Error leveling up creature:", error)
  })




  const handleItemSelect = (row, col, item) => {
    if (user?.aquaCoins >= item.cost) {
      // Pass both the item and coordinates to the mutation
      addCreatureMutation.mutate({
        creatureId: item._id,
        coordinates: { x: row, y: col },
        item, // Pass the item along
      });

    } else {
      alert("Not enough points to add this item!");
    }
  };







  const growAnimal = (row, col) => {
    const newGrid = [...grid];
    const animal = newGrid[row][col];

    if (animal) {
      levelUpCreatureMutation.mutate({
        creatureModelId: animal.creatureId,
        userCreatureId: animal._id,
        x: animal.x,
        y: animal.y
      })
      animal.isGrowing = true
    }


  };

  const removeAnimal = (row, col, item) => {
    const animal = grid[row][col];
    if (animal) {
      setSelectedCreatureToRemove({ animal });
      setIsRemoveModalOpen(true);
    }
  };

  const confirmRemoveAnimal = () => {
    if (selectedCreatureToRemove) {
      removeCreatureMutation.mutate({
        creatureModelId: selectedCreatureToRemove.animal.creatureId,
        userCreatureId: selectedCreatureToRemove.animal._id,
      });

      setIsRemoveModalOpen(false);
      setSelectedCreatureToRemove(null);
    }
  };




  return (
    <div className="container  mx-auto p-2">
      <h2 className="text-2xl font-bold text-primary mb-4">My Aquarium</h2>

      <div className="flex flex-wrap justify-around gap-4 p-2">
        <div className="grid  grid-cols-6 max-w-2xl bg-gradient-to-b from-blue-500 to-blue-950 w-full gap-0 relative">
          <AquariumGrid
            levelUpCreatureMutation={levelUpCreatureMutation}
            user={user}
            grid={grid}
            creatures={creatures}
            handleItemSelect={handleItemSelect}
            growAnimal={growAnimal}
            removeAnimal={removeAnimal}
            setActiveCell={setActiveCell}
            confirmRemoveAnimal={confirmRemoveAnimal}
            activeCell={activeCell}
            aquaCoins={user?.aquaCoins} />
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
      </div>
      {isRemoveModalOpen &&
        (<ConfirmationModal
          isOpen={isRemoveModalOpen}
          onConfirm={confirmRemoveAnimal}
          onCancel={() => setIsRemoveModalOpen(false)}
          message={"You will receive only a 50% refund of animal's original cost"} />)}
    </div>
  );
}
