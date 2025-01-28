import "./QuestRewardModal.scss";
import TreasureChestIcon from "../../assets/treasure-chest.png";
import AquaCoins from "../../assets/aquagem.png";
export default function QuestRewardModal({ earnedCoins, onClose }) {
    return (
        <div onClick={onClose} className={`modal-enter  fixed inset-0  bg-black bg-opacity-95  cursor-pointer flex items-center justify-center p-4 `}>
            <div className="rounded  max-w-lg ">
                <div className="p-6 text-center ">
                    <div className="flex flex-col gap-2 ">
                        <img src={TreasureChestIcon} alt="Treasure Chest" className="animate-bounce bg-transparent mx-auto mb-4 w-24 h-24" />
                        <p className="text-2xl font-bold font-mono text-success md:text-4xl">Quest Completed!</p>
                        <p className="font-mono text-xl  inline-flex justify-center gap-4 mb-4">
                            You've earned <span className="text-primary ">{earnedCoins}</span> <span>
                                <img className="w-6 h-6" src={AquaCoins} alt="Aqua Coins" />
                            </span>
                        </p>
                        <p className="text-xs font-mono ">Click anywhere to continue</p>
                    </div>
                </div>
            </div>
        </div>
    );
}


