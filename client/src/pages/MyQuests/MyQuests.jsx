import { QuestsCard } from '../../components/Quests/QuestsCard.jsx';
import QuestRewardModal from '../../components/QuestRewardModal/QuestRewardModal.jsx';
import Spinner from '../../components/Spinner/Spinner.jsx';
import { useEffect } from 'react';
import { useGenericMutation } from '../../hooks/useMutation.js';
import { useQuery } from 'react-query';
import * as questsApi from "../../actions/questActions.js"
import { useAuth } from '../../context/authContext.jsx';
import { useState } from 'react';







export default function MyQuests() {
  const [claimRewardModal, setCLaimRewardModal] = useState(false)
  const {
    data,
    isLoading: questsLoading,
    error: questsError,
  } = useQuery({
    queryKey: ["quests"],
    queryFn: questsApi.getAllWithUserProgress
  })

  const handleClaimRewardClick = () => {
    setCLaimRewardModal(true)
  }

  const closeClaimRewardModal = () => {
    setCLaimRewardModal(false)
  }



  return (
    <div className="min-h-fit mx-4 ">
      <main className="mt-8">
        <h2 className="text-2xl font-bold mb-4 text-primary  uppercase ">Quests</h2>
        {questsLoading ?
          <div className='flex justify-center align-middle'>
            <Spinner />
          </div>
          :
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.quests?.map((quest) => (
              <QuestsCard key={quest.questId} quest={quest} handleClaimRewardClick={handleClaimRewardClick} closeClaimRewardModal={closeClaimRewardModal} />
            ))}
          </div>
        }
      </main>

      {claimRewardModal && <QuestRewardModal onClose={closeClaimRewardModal} />}
    </div>
  );
}

