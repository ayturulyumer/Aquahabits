import { useState } from 'react';
import confetti from 'canvas-confetti';
import Button from '../../components/Button/Button.jsx';
import HabitForm from '../../components/HabitForm/HabitForm.jsx';
import ConfirmationModal from '../../components/ConfirmationModal/ConfirmationModal.jsx';
import addIcon from "../../svg/add-icon.svg"
import CalendarHeatmap from 'react-calendar-heatmap';
import "../../scss/Calendar.scss"
import HabitStat from '../../components/HabitStat/HabitStat.jsx';
import Tippy from '@tippyjs/react';
import "tippy.js/animations/scale-subtle.css";
import { useAuth } from '../../context/authContext.jsx';
import { useQuery } from "react-query"
import * as habitsApi from '../../actions/habitActions.js';
import * as questApi from '../../actions/questActions.js';
import formatDateToReadable from '../../utils/formatDateToReadable.js';
import { useGenericMutation } from '../../hooks/useMutation.js';
import { useSearchParams } from 'react-router-dom';
import Spinner from '../../components/Spinner/Spinner.jsx';
import toast from 'react-hot-toast';






export default function MyHabits() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingHabit, setEditingHabit] = useState(null);
    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
    const [habitToDelete, setHabitToDelete] = useState(null);
    const [checkingInHabitId, setCheckingInHabitId] = useState(null); // Check which habit is checking in to disable only that habit card 
    const { updateAquaCoins, updateUserQuestProgress } = useAuth()




    const {
        data: habits,
        isLoading: habitsLoading,
        error: habitsError,
    } = useQuery({
        queryKey: ["habits"],
        queryFn: habitsApi.getAll
    })



    const isHabitCompletedToday = (history) => {
        const today = formatDateToReadable(new Date());
        return history.some(date => formatDateToReadable(date) === today);
    };

    const createHabitMutation = useGenericMutation({
        mutationFn: habitsApi.createHabit,
        queryKey: "habits", // Automatically invalidates "habits" after success
        onSuccess: (data) => toast.success("Habit created successfully"),
        onError: (error) => toast.error("Error creating habit"),
    });


    const updateHabitMutation = useGenericMutation({
        mutationFn: habitsApi.editHabit,
        queryKey: "habits",
        onSuccess: (data) => toast.success("Habit updated successfully"),
        onError: (error) => toast.error("Error updating habit"),
    });


    const DeleteHabitMutation = useGenericMutation({
        mutationFn: habitsApi.deleteHabit,
        queryKey: "habits",
        onSuccess: (data) => toast.success("Habit deleted successfully"),
        onError: (error) => toast.error("Error deleting habit"),
    })

    const CheckInHabitMutation = useGenericMutation({
        mutationFn: habitsApi.checkInHabit,
        queryKey: "habits",
        onMutate: (habitId) => {
            setCheckingInHabitId(habitId) // set currently checked in habit's id to state
        },
        onSuccess: async (data, variables) => {
            // **Trigger the second API request (quest progress update)
            try {
                const updatedQuestProgress = await questApi.updateQuestProgressForHabit(variables);
                updateUserQuestProgress(updatedQuestProgress);
                if (data.message === "Checkin") {
                    const audio = new Audio('/success-sound.mp3');
                    audio.volume = 0.05;
                    audio.play();
                    updateAquaCoins(data.userCoins)
                } else if (data.message === "Checkout") {
                    const audio = new Audio('/uncheck-sound.mp3');
                    audio.volume = 0.05;
                    audio.play();
                    updateAquaCoins(data.userCoins)
                }
                setCheckingInHabitId(null) // if checkin is successfull reset it
            } catch (error) {
                toast.error("Error updating quest progress:", error?.response?.data);
            }

        },
        onError: (error) => toast.error(error?.response?.data),
    });

    const toggleHabitCompletion = (id) => {
        CheckInHabitMutation.mutate(id)
    };


    const addOrUpdateHabit = (habit) => {
        if (habit._id) {
            updateHabitMutation.mutate({
                habitId: habit._id,
                habitData: habit
            })

        } else {
            createHabitMutation.mutate(habit)
        }
        setIsModalOpen(false);
        setEditingHabit(null);
    };

    const openConfirmationModal = (habit) => {
        setHabitToDelete(habit);
        setSearchParams({ habitId: habit._id });
        setIsConfirmationOpen(true);
    };

    const closeConfirmationModal = () => {
        setIsConfirmationOpen(false);
        setSearchParams({});
        setHabitToDelete(null);
    };

    const confirmDeleteHabit = (habitId) => {
        DeleteHabitMutation.mutate(habitId)
        closeConfirmationModal();
    };


    const openModal = (habit = null) => {
        if (habit) {
            // Add habit ID to URL as a query parameter
            setSearchParams({ habitId: habit._id });
        } else {
            // Remove habitId from URL when adding a new habit
            setSearchParams({});
        }

        setEditingHabit(habit);
        setIsModalOpen(true);
    };

    const closeEditModal = () => {
        setIsModalOpen(false);
        setSearchParams({});
    }



    return (
        <div className="space-y-2">
            <div className="flex justify-between mx-4 items-baseline ">
                <h2 className="text-2xl font-bold text-primary">My Habits</h2>
                <Button onClick={() => openModal()} iconRight={addIcon} iconAlt='Add Icon' className="btn btn-circle mt-4  btn-primary "></Button>
            </div>

            {/* Habit Grid */}
            {habitsLoading ?
                <div className='flex justify-center align-middle'>
                    <Spinner />

                </div>
                :
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {habits?.map(habit => (
                        <div key={habit._id} className={`relative card xl:max-w-96 mx-2 bg-black/80 border-primary shadow-xl hover:shadow-sky-400 transition-shadow duration-300 `}>
                            <div className="card-body p-6">

                                <div className="flex  gap-4 items-start">

                                    <h3 className="card-title text-lg font-semibold text-neutral ">{habit.name}</h3>
                                    <input
                                        type="checkbox"
                                        checked={isHabitCompletedToday(habit.history)}
                                        onChange={() => toggleHabitCompletion(habit._id)}
                                        disabled={checkingInHabitId === habit._id}
                                        className={`${checkingInHabitId === habit._id ? "loading  text-primary" : "checkbox checkbox-success"}`}
                                    />
                                    {/*Show tippy tooltip only if user has selected days  */}
                                    {habit.selectedDays.length > 0 ? (
                                        <Tippy content={habit.selectedDays.join(", ")} placement="bottom-start" animation="scale-subtle">
                                            <span className="absolute top-7.5 right-2 badge badge-primary badge-sm font-bold font-mono">
                                                {habit.frequency === "weekly" ? `${habit.selectedDays.length}x/week` : "Daily"}
                                            </span>
                                        </Tippy>
                                    ) : (
                                        <span className="absolute top-7.5 right-2 badge badge-primary badge-sm font-bold font-mono">
                                            {habit.frequency === "weekly" ? `${habit.selectedDays.length}x/week` : "Daily"}
                                        </span>
                                    )}


                                    <div className=" dropdown dropdown-left absolute -top-4   right-0 mr-2">
                                        <div tabIndex={0} role="button" className="text-2xl">...</div>
                                        <ul tabIndex={0} className="dropdown-content menu  bg-black/60   rounded-box z-[1]  shadow">
                                            <li onClick={() => openModal(habit)}><a>Edit</a></li>
                                            <li onClick={() => openConfirmationModal(habit)}><a>Delete</a></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className='w-full flex  justify-around my-3 gap-2  '>
                                    <HabitStat
                                        label="Completed"
                                        bgColor='bg-white/10'
                                        value={habit.completed}
                                        labelColor="font-mono"
                                        valueColor="font-mono "
                                    />
                                    <HabitStat label="Consistency" bgColor=' bg-white/10  ' labelColor="font-mono "
                                        valueColor="font-mono" value={`${habit.consistency}%`}
                                        consistencyPercent={habit.consistencyChangePercent} />
                                    <HabitStat
                                        label="Streak"
                                        bgColor='bg-white/10'
                                        value={habit.streak}
                                        labelColor="font-mono "
                                        valueColor="font-mono"
                                    />
                                </div>

                                <p className="text-white text-sm mt-2">{habit.goal}</p>
                                <div className="mt-4 space-y-3">
                                    <CalendarHeatmap
                                        startDate={new Date(new Date().setMonth(new Date().getMonth() - 6)).setDate(new Date().getDate() + 1)} // 6 months ago + next day
                                        endDate={new Date()}
                                        gutterSize={2}
                                        showWeekdayLabels={true}
                                        values={habit.history
                                            .map(entry => ({
                                                date: formatDateToReadable(entry), // Convert the string date to a JavaScript Date object
                                                count: 1
                                            }))
                                        }
                                        classForValue={(value) => {
                                            if (!value) {
                                                return 'color-empty'; // Class for empty cells
                                            }
                                            return 'color-filled'; // Class for filled cells
                                        }}
                                        transformDayElement={(element, value) => {
                                            if (!value || !value.date) return element; // Skip if no value



                                            // Wrap the day element with Tippy for tooltip
                                            return (
                                                <Tippy key={value.date} placement='top' animation="scale-subtle" content={`${value.date}`}>
                                                    {element}
                                                </Tippy>
                                            );
                                        }}
                                    />

                                </div>

                            </div>

                        </div>

                    ))}
                </div>}


            {/* Add/Edit Habit Modal */}
            {isModalOpen && (
                <div onClick={() => closeEditModal()} className="fixed inset-0  bg-black  backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50">
                    <h3 className="text-xl font-semibold text-center hidden mb-2  text-primary">{editingHabit ? 'Edit Habit' : 'Add New Habit'}</h3>
                    <HabitForm
                        habit={editingHabit || {}}
                        addOrUpdateHabit={addOrUpdateHabit}
                        onCancel={() => closeEditModal()}
                    />
                </div>
            )}

            {isConfirmationOpen && (
                <ConfirmationModal
                    isOpen={isConfirmationOpen}
                    onConfirm={() => confirmDeleteHabit(habitToDelete._id)}
                    onCancel={closeConfirmationModal}
                    message={
                        <>Are you sure you want to delete <span className="text-primary font-bold">{habitToDelete.name}</span>?</>
                    }

                />
            )}
        </div>
    );
}

