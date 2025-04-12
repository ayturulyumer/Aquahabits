

import Button from "../Button/Button.jsx";


const COMPLETED_ICON_URL = "https://res.cloudinary.com/dquoir0sw/image/upload/v1740558111/completed-icon_ecltw5.png"
const LOCKEDCHEST_ICON_URL = "https://res.cloudinary.com/dquoir0sw/image/upload/v1740558057/treasure-chest-locked_m3dgml.png"
export function QuestsCard({ user, quest, handleClaimRewardClick }) {
    const { title, description, iconUrl, currentProgress, requirement, questId } = quest;



    // Find the current quest progress in user.questProgress
    const currentQuestProgress = user?.questProgress?.find(q => q.questId === questId);

    // Determine currentProgress: if the user has progress, use it, otherwise fall back to the quest's currentProgress
    const questProgress = currentQuestProgress?.currentProgress || currentProgress;

    // Extract isCompleted and isClaimed, or set default values if not found
    const isCompleted = currentQuestProgress?.isCompleted || false;
    const isClaimed = currentQuestProgress?.isClaimed || false;

    return (
        <div className="card max-w-sm  bg-gradient-to-r from-slate-900 to-slate-700 shadow-xl">
            <div className="card-body">
                <div className="flex justify-between">
                    <h2 className="card-title text-primary">{title}</h2>
                    <img
                        loading="eager"
                        src={iconUrl}
                        alt="Quest Icon"
                        className="h-16 w-16 ml-2 "
                    />
                </div>
                <p>{description}</p>
                <section className="flex justify-between gap-2 items-center ">
                    <progress
                        className={`progress ${isCompleted ? "progress-success" : "progress-primary"}  w-56`}
                        value={questProgress}
                        max={requirement}
                    ></progress>

                    {isCompleted && !isClaimed ? (
                        <Button onClick={() => handleClaimRewardClick(questId)}>Claim Reward</Button>
                    ) : isClaimed ? (
                        <img src={COMPLETED_ICON_URL} alt="Claimed Icon" className="mr-3 w-10 h-10" />
                    ) : (
                        <img src={LOCKEDCHEST_ICON_URL} alt="Claimed Icon" className="mr-3 w-10 h-10" />
                    )}
                </section>
                <p className={`text-sm text-left mt-2 ${isCompleted ? "line-through" : ""}`}>
                    Progress: {questProgress} / <span className="text-primary font-medium">{requirement}</span>
                </p>
            </div>
        </div>
    );
}
