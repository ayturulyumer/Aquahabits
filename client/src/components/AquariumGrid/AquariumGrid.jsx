import { useMemo } from "react";
import Tippy from "@tippyjs/react";
import Button from "../Button/Button.jsx";
import LevelUpIcon from "../../svg/levelup-icon.svg"
import { ITEM_TYPES } from "../../utils/constants.js";

export default function AquariumGrid({ grid, handleItemSelect, growAnimal, removeAnimal, setActiveCell, activeCell, userPoints }) {
    // Memoize the grid rendering
    const renderedGrid = useMemo(() => {
        return grid.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
                <Tippy
                    key={`${rowIndex}-${colIndex}`}
                    content={
                        cell ? (
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
                            <div className="grid grid-cols-1 max-w-42 max-h-32 md:max-h-48 md:grid-cols-2 lg:max-h-52 transition-all ease-in-out duration-500 overflow-y-auto gap-4 p-2 transform hover:scale-105">
                                {ITEM_TYPES.map((item) => (
                                    <button
                                        key={item.name}
                                        className={`p-2 rounded-lg shadow-md flex md:flex-col items-center justify-between gap-2 ${userPoints >= item.cost ? "hover:bg-primary-focus" : "bg-gray-300 cursor-not-allowed"
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
                    visible={activeCell && activeCell.row === rowIndex && activeCell.col === colIndex}
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
                        onClick={() => setActiveCell({ row: rowIndex, col: colIndex })}
                    >
                        {cell && cell.emoji ? cell.emoji : ""}

                        {cell?.isGrowing && (
                            <span className="level-up-icon h-3 w-3 md:h-6 md:w-6">
                                <img src={LevelUpIcon} alt="Level Up" />
                            </span>
                        )}
                    </div>
                </Tippy>
            ))
        );
    }, [grid, growAnimal, removeAnimal, setActiveCell, activeCell, userPoints]);

    return <>{renderedGrid}</>;
}


