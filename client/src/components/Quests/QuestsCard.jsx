import AquaCoins from "../../assets/aquagem.png"
import ConsistencyIcon from '../../assets/consistency.png';
import FlameIcon from '../../assets/flame.png';
import FirstWinIcon from '../../assets/firstwin.png';
import TreasureChest from "../../assets/treasure-chest.png"
import Button from "../Button/Button.jsx";

const iconMap = {
    'Starting Strong': FirstWinIcon,
    'Consistency Starter': FlameIcon,
    'Week of Dedication': ConsistencyIcon,
};

export function QuestsCard({ quest, handleClaimRewardClick }) {
    const { title, description, reward, currentProgress, isCompleted, isClaimed, requirement } = quest;


    return (
        <div className="card bg-gradient-to-r from-slate-900 to-slate-700 shadow-xl">
            <div className="card-body">
                <div className="flex justify-between">
                    <h2 className="card-title text-primary">{title}</h2>
                    <img
                        src={iconMap[title]}
                        alt="Quest Icon"
                        className="h-16 w-16 ml-2 "
                    />
                </div>
                <p>{description}</p>
                <section className="flex justify-between gap-2 items-center mt-4">
                    <progress
                        className="progress progress-success w-56"
                        value={currentProgress}
                        max={requirement}
                    ></progress>
                    {isCompleted ?
                        // <button onClick={handleClaimRewardClick} type="button" className="animate-bounce cursor-pointer h-14 w-14 ">
                        //     <img className="h-full w-full  object-fill" src={TreasureChest} alt="Claim Reward" />
                        // </button>
                        <Button onClick={handleClaimRewardClick} className="" >Claim Reward</Button>
                        :
                        <div className="badge text-primary flex gap-2 badge-ghost shadow-2xl shadow-teal-300 ">{reward}
                            <img className="w-4  h-4 shadow-2xl" src={AquaCoins} alt="Aqua Coins" />
                        </div>
                    }

                </section>
                <p className="text-sm text-left mt-2">
                    Progress: {currentProgress} / <span className="text-primary  font-medium">{requirement} </span>
                </p>
            </div>
        </div>
    );
}
