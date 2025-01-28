import AquaCoins from "../../assets/aquagem.png"
import ConsistencyIcon from '../../assets/consistency.png';
import FlameIcon from '../../assets/flame.png';
import FirstWinIcon from '../../assets/firstwin.png';
import CompletedIcon from "../../svg/completed-icon.svg"
import Button from "../Button/Button.jsx";

const iconMap = {
    'Starting Strong': FirstWinIcon,
    'Consistency Starter': FlameIcon,
    'Week of Dedication': ConsistencyIcon,
};

export function QuestsCard({ user, quest, handleClaimRewardClick }) {
    const { title, description, reward, currentProgress, requirement, questId } = quest;

    // Find the current quest progress in user.questProgress
    const currentQuestProgress = user.questProgress?.find(q => q.questId === questId);

    // Determine currentProgress: if the user has progress, use it, otherwise fall back to the quest's currentProgress
    const questProgress = currentQuestProgress?.currentProgress || currentProgress;

    // Extract isCompleted and isClaimed, or set default values if not found
    const isCompleted = currentQuestProgress?.isCompleted || false;
    const isClaimed = currentQuestProgress?.isClaimed || false;

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
                        className={`progress ${isCompleted ? "progress-success" : "progress-primary"}  w-56`}
                        value={questProgress}
                        max={requirement}
                    ></progress>

                    {isCompleted && !isClaimed ? (
                        <Button onClick={() => handleClaimRewardClick(questId)}>Claim Reward</Button>
                    ) : isClaimed ? (
                        <img src={CompletedIcon} alt="Claimed Icon" className="w-14 h-14" />
                    ) : (
                        <div className="badge text-primary flex gap-2 badge-ghost shadow-2xl shadow-teal-300">
                            {reward}
                            <img className="w-4 h-4 shadow-2xl" src={AquaCoins} alt="Aqua Coins" />
                        </div>
                    )}
                </section>
                <p className="text-sm text-left mt-2">
                    Progress: {questProgress} / <span className="text-primary font-medium">{requirement}</span>
                </p>
            </div>
        </div>
    );
}
