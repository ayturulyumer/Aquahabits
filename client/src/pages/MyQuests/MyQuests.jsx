import { QuestsCard } from '../../components/Quests/QuestsCard.jsx';
import QuestRewardModal from '../../components/QuestRewardModal/QuestRewardModal.jsx';
import Spinner from '../../components/Spinner/Spinner.jsx';
import { useEffect } from 'react';
import { useGenericMutation } from '../../hooks/useMutation.js';
import { useQuery } from 'react-query';
import * as questsApi from "../../actions/questActions.js"
import { useAuth } from '../../context/authContext.jsx';
import { useState } from 'react';
import confetti from 'canvas-confetti';







export default function MyQuests() {
  const [claimRewardModal, setClaimRewardModal] = useState({ isVisible: false, reward: null });
  const { user, updateAquaCoins, updateUserQuestProgress } = useAuth()
  const {
    data,
    isLoading: questsLoading,
    error: questsError,
  } = useQuery({
    queryKey: ["quests"],
    queryFn: questsApi.getAllWithUserProgress
  })

  const claimRewardMutation = useGenericMutation({
    mutationFn: questsApi.claimQuestReward,
    queryKey: ["quests"],
    onSuccess: (data) => {
      setClaimRewardModal({ isVisible: true, reward: data.earned });
      const audio = new Audio('/quest-completed-sound.mp3');
      confetti({
        particleCount: 50,
        angle: Math.random() * (120 - 60) + 60,
        spread: 80,
        origin: { x: 0.5, y: 0.7 },
        colors: ['#ffa500', '#ff6347', '#32cd32', '#1e90ff', '#800080'],
      });
      audio.volume = 0.05;
      audio.play();
      updateAquaCoins(data.reward)
      updateUserQuestProgress(data.updatedQuestProgress)

    },
    onError: (error) => console.error("Error claiming quest reward:", error),
  })

  const handleClaimRewardClick = (questId) => {
    claimRewardMutation.mutate(questId)
  }


  const closeClaimRewardModal = () => {
    setClaimRewardModal({ isVisible: false, reward: null });
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
              <QuestsCard key={quest.questId} quest={quest} user={user} handleClaimRewardClick={handleClaimRewardClick} closeClaimRewardModal={closeClaimRewardModal} />
            ))}
          </div>
        }
      </main>

      {claimRewardModal.isVisible && <QuestRewardModal onClose={closeClaimRewardModal} earnedCoins={claimRewardModal.reward} />}
    </div>
  );
}

