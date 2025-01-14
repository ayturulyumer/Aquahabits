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
import formatDateToReadable from '../../utils/formatDateToReadable.js';
import { useGenericMutation } from '../../hooks/useMutation.js';
import { useNavigate, useSearchParams } from 'react-router-dom';





export default function MyHabits() {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingHabit, setEditingHabit] = useState(null);
    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
    const [habitToDelete, setHabitToDelete] = useState(null);
    const { increaseUserPoints, decreaseUserPoints } = useAuth()


    const today = formatDateToReadable(new Date())


    const {
        data: habits,
        isLoading: habitsLoading,
        error: habitsError,
    } = useQuery({
        queryKey: ["habits"],
        queryFn: habitsApi.getAll
    })


    const toggleHabitCompletion = (id) => {
        const today = formatDateToReadable(new Date()); // Format today's date

        const updatedHabits = habits.map(habit => {
            if (habit.id === id) {
                // Check if today's date is already in the habit history
                const updatedHistory = habit.history.some(entry => formatDateToReadable(entry) === today)
                    ? habit.history.filter(entry => formatDateToReadable(entry) !== today) // Remove today's date if unchecking
                    : [...habit.history, today]; // Add today's date if checking

                const newTotalCompletions = updatedHistory.length; // Update total completions based on the new history

                return {
                    ...habit,
                    history: updatedHistory,
                    totalCompletions: newTotalCompletions,
                };
            }
            return habit;
        });

        const habit = updatedHabits.find(habit => habit.id === id);

        // Check if current date is not in history
        if (!habit.history.some(entry => formatDateToReadable(entry) === today)) {
            const audio = new Audio('/success-sound.mp3');
            audio.volume = 0.05;
            audio.play();

            // Trigger confetti
            confetti({
                particleCount: 50,
                angle: Math.random() * (120 - 60) + 60,
                spread: 80,
                origin: { x: 0.5, y: 0.7 },
                colors: ['#ffa500', '#ff6347', '#32cd32', '#1e90ff', '#800080'],
            });

            // Increase points only if the habit hasn't been completed today yet
            increaseUserPoints(10);
        } else {
            const audio = new Audio('/uncheck-sound.mp3');
            audio.volume = 0.05;
            audio.play();

            // Decrease points when unchecking (if the habit was completed previously)
            decreaseUserPoints(10);
        }
    };

    const isHabitCompletedToday = (history) => {
        const today = formatDateToReadable(new Date());
        return history.some(date => formatDateToReadable(date) === today);
    };

    const createHabitMutation = useGenericMutation({
        mutationFn: habitsApi.createHabit,
        queryKey: "habits", // Automatically invalidates "habits" after success
        onSuccess: (data) => console.log("Habit created successfully:", data),
        onError: (error) => console.error("Error creating habit:", error),
    });

    const updateHabitMutation = useGenericMutation({
        mutationFn: habitsApi.updateHabit,
        queryKey: "habits", // Automatically invalidates "habits" after success
        onSuccess: (data) => console.log("Habit updated successfully:", data),
        onError: (error) => console.error("Error updating habit:", error),
    });


    const DeleteHabitMutation = useGenericMutation({
        mutationFn: habitsApi.deleteHabit,
        queryKey: "habits",
        onSuccess: (data) => console.log("Habit deleted successfully:", data),
        onError: (error) => console.error("Error deleting habit:", error),
    })



    const addOrUpdateHabit = (habit) => {
        if (habit.id) {
            updateHabitMutation.mutate(habit)
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
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {habits?.map(habit => (
                    <div key={habit._id} className={`relative card xl:max-w-96 mx-2 bg-gradient-to-r from-slate-900 to-slate-700 border-primary shadow-xl hover:shadow-blue-500 transition-shadow duration-300 `}>
                        <div className="card-body p-6">

                            <div className="flex  gap-4 items-start">

                                <h3 className="card-title text-lg font-semibold text-neutral ">{habit.name}</h3>
                                <input
                                    type="checkbox"
                                    checked={habit.completed}
                                    onChange={() => toggleHabitCompletion(habit.id)}
                                    className="checkbox checkbox-success"
                                />
                                <span className="absolute top-7.5 right-2 badge ">{habit.frequency}</span>
                                <div className=" dropdown dropdown-left absolute -top-4   right-0 mr-2">
                                    <div tabIndex={0} role="button" className="text-2xl">...</div>
                                    <ul tabIndex={0} className="dropdown-content menu  bg-black/60   rounded-box z-[1]  shadow">
                                        <li onClick={() => openModal(habit)}><a>Edit</a></li>
                                        <li onClick={() => openConfirmationModal(habit)}><a>Delete</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className='w-full flex  justify-between my-3 gap-2  '>
                                <HabitStat
                                    label="Completed"
                                    bgColor='shadow-2xl shadow-teal-500'
                                    value={habit.completed}
                                    labelColor="font-mono"
                                    valueColor="font-mono "
                                />
                                <HabitStat label="Consistency" bgColor='shadow-2xl shadow-green-600 ' labelColor="font-mono "
                                    valueColor="font-mono" value={`${habit.consistency} %`} />
                                <HabitStat
                                    label="Streak"
                                    bgColor='shadow-2xl shadow-primary'
                                    value={habit.streak}
                                    labelColor="font-mono "
                                    valueColor="font-mono"
                                />
                            </div>

                            <p className="text-white mt-2">{habit.goal}</p>
                            <div className="mt-4 space-y-3">
                                <CalendarHeatmap
                                    startDate={new Date(new Date().setMonth(new Date().getMonth() - 6)).setDate(new Date().getDate() + 1)} // 6 months ago + next day

                                    endDate={new Date()} // Today
                                    gutterSize={2}
                                    showWeekdayLabels={true}
                                    values={habit.history
                                        .map(entry => ({
                                            date: new Date(entry), // Convert the string date to a JavaScript Date object
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

                        {/* Big Check Icon when Completed */}
                        {habit.history.some(entry => formatDateToReadable(entry) === today) && (
                            <div onClick={() => toggleHabitCompletion(habit.id)} className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black cursor-pointer rounded-box bg-opacity-80 z-40">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-24 h-24 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                        )}

                    </div>

                ))}
            </div>

            {/* Add/Edit Habit Modal */}
            {isModalOpen && (
                <div onClick={() => setIsModalOpen(false)} className="fixed inset-0  bg-black  backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50">
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

