import { QuestsCard } from '../../components/Quests/QuestsCard.jsx';
import { QuestsCompleted } from '../../components/Quests/QuestsCompleted.jsx';
import ConsistencyIcon from '../../assets/consistency.png';
import FlameIcon from '../../assets/flame.png';
import FirstWinIcon from '../../assets/firstwin.png';


const missions = [
  { id: 1, title: 'First win of the day', description: 'Complete a habit for the first time today', points: 25, daysRequired: 1, progress: 0, icon: FirstWinIcon },
  { id: 2, title: 'Consistency Starter', description: 'Complete a habit 3 days in a row', points: 50, daysRequired: 3, progress: 1, icon: FlameIcon },
  { id: 3, title: 'Daily Streak', description: 'Complete any habit for 5 consecutive days', points: 75, daysRequired: 5, progress: 2, icon: ConsistencyIcon },
];

const completedMissions = [
  { id: 101, title: 'First Dip', description: 'Complete your first habit ever', points: 25 },
];


export default function MyQuests() {
  const userPoints = 325; // This would normally come from a user state or API

  return (
    <div className="min-h-screen mx-4 ">
      <main className="mt-8">
        <h2 className="text-2xl font-bold mb-4 text-neutral">Daily Quests</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {missions.map((mission) => (
            <QuestsCard key={mission.id} mission={mission} />
          ))}
        </div>
        <QuestsCompleted missions={completedMissions} />
      </main>
    </div>
  );
}

