import AquaCoins from "../../assets/aquagem.png"
import ConsistencyIcon from '../../assets/consistency.png';
import FlameIcon from '../../assets/flame.png';
import FirstWinIcon from '../../assets/firstwin.png';

const iconMap = {
    'First win of the day': FirstWinIcon,
    'Consistency Starter': FlameIcon,
    'Daily Streak': ConsistencyIcon,
};

export function QuestsCard({ quest }) {
    const { title, description, points, daysRequired, habitsRequired, progress, icon } = quest;
    const total = daysRequired || habitsRequired || 1;
    const progressPercentage = (progress / total) * 100;

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
                <div className="flex justify-between gap-4 items-center mt-4">
                    <progress
                        className="progress progress-success w-56"
                        value={progress}
                        max={total}
                    ></progress>
                    <div className="badge flex gap-2 badge-ghost shadow-2xl shadow-teal-300 ">{points}
                        <img className="w-4  h-4 shadow-2xl" src={AquaCoins} alt="Aqua Coins" />
                    </div>
                </div>
                <p className="text-sm text-left mt-2">
                    Progress: {progress} / {total} {daysRequired ? 'days' : 'habits'}
                </p>
            </div>
        </div>
    );
}
