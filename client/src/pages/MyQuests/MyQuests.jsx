import { QuestsCard } from '../../components/Quests/QuestsCard.jsx';
import Spinner from '../../components/Spinner/Spinner.jsx';
import ConsistencyIcon from '../../assets/consistency.png';
import FlameIcon from '../../assets/flame.png';
import FirstWinIcon from '../../assets/firstwin.png';

import { useGenericMutation } from '../../hooks/useMutation.js';
import { useQuery } from 'react-query';
import * as questsApi from "../../actions/questActions.js"







export default function MyQuests() {

  const {
    data: quests,
    isLoading: questsLoading,
    error: questsError,
  } = useQuery({
    queryKey: ["quests"],
    queryFn: questsApi.getAll
  })





  return (
    <div className="min-h-fit mx-4 ">
      <main className="mt-8">
        <h2 className="text-2xl font-bold mb-4 text-primary  uppercase ">Daily Quests</h2>
        {questsLoading ?
          <div className='flex justify-center align-middle'>
            <Spinner />

          </div>
          :
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quests?.map((quest) => (
              <QuestsCard key={quest._id} quest={quest} />
            ))}
          </div>
        }
      </main>
    </div>
  );
}

