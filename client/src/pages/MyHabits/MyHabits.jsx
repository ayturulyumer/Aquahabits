import { useState } from 'react';
import confetti from 'canvas-confetti';
import Button from '../../components/Button/Button.jsx';
import HabitForm from '../../components/HabitForm/HabitForm.jsx';
import ConfirmationModal from '../../components/ConfirmationModal/ConfirmationModal.jsx';
import editIcon from "../../svg/edit-icon.svg"
import addIcon from "../../svg/add-icon.svg"
import CalendarHeatmap from 'react-calendar-heatmap';
import "../../scss/Calendar.scss"
import HabitStat from '../../components/HabitStat/HabitStat.jsx';
import Tippy from '@tippyjs/react';
import "tippy.js/animations/scale-extreme.css";


const initialHabits = [
    {
        id: 1,
        name: 'Drink Water',
        frequency: 'Daily',
        completed: false,
        streak: 5,
        goal: '8 glasses',
        timesPerWeek: 7, // Always 7 for Daily habits
        history: [
            { date: '2024-12-01', status: 'completed' },
            { date: '2024-12-02', status: 'skipped' }
        ]
    },
    {
        id: 2,
        name: 'Exercise',
        frequency: '3x/week',
        completed: false,
        streak: 2,
        goal: '30 minutes',
        selectedDays: ['Monday', 'Wednesday', 'Friday'], // Required for weekly habits
        timesPerWeek: 3,
        history: [
            { date: '2024-12-01', status: 'completed' },
            { date: '2024-12-03', status: 'skipped' }
        ]
    },
    {
        id: 3,
        name: 'Read',
        frequency: 'Daily',
        completed: true,
        streak: 10,
        goal: '30 pages',
        timesPerWeek: 7, // Always 7 for Daily habits
        history: [
            { date: '2024-12-01', status: 'completed' },
            { date: '2024-12-02', status: 'completed' }
        ]
    },
    {
        id: 4,
        name: 'Meditate',
        frequency: 'Daily',
        completed: false,
        streak: 7,
        goal: '15 minutes',
        timesPerWeek: 7, // Always 7 for Daily habits
        history: [
            { date: '2024-12-01', status: 'skipped' }
        ]
    },
    {
        id: 5,
        name: 'Learn a Language',
        frequency: '5x/week',
        completed: true,
        streak: 15,
        goal: '20 new words',
        selectedDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], // Only for habits with Xx/week
        timesPerWeek: 5,
        history: [
            { date: '2024-12-01', status: 'completed' },
            { date: '2024-12-02', status: 'completed' }
        ]
    }
];


export default function MyHabits() {
    const [habits, setHabits] = useState(initialHabits);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingHabit, setEditingHabit] = useState(null);
    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
    const [habitToDelete, setHabitToDelete] = useState(null);


    const toggleHabitCompletion = (id) => {
        const today = new Date().toISOString().split('T')[0]; // Get today's date in 'YYYY-MM-DD' format

        const updatedHabits = habits.map(habit => {
            if (habit.id === id) {
                const updatedHistory = habit.completed
                    ? habit.history.filter(entry => entry.date !== today) // Remove today's date if unchecking
                    : [...habit.history, { date: today, status: 'completed' }]; // Add today's date if checking

                return {
                    ...habit,
                    completed: !habit.completed,
                    history: updatedHistory,
                };
            }
            return habit;
        });

        const habit = updatedHabits.find(habit => habit.id === id);

        if (habit.completed) {
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
        } else {
            const audio = new Audio('/uncheck-sound.mp3');
            audio.volume = 0.05;
            audio.play();
        }

        setHabits(updatedHabits);
    };

    const addOrUpdateHabit = (habit) => {
        if (habit.id) {
            // Update existing habit
            setHabits(habits.map(h => h.id === habit.id ? { ...h, ...habit } : h));
        } else {
            // Add new habit
            setHabits([...habits, { ...habit, id: Date.now(), streak: 0, history: [] }]);
        }
        setIsModalOpen(false);
        setEditingHabit(null);
    };

    const openConfirmationModal = (habit) => {
        setHabitToDelete(habit);
        setIsConfirmationOpen(true);
    };

    const closeConfirmationModal = () => {
        setIsConfirmationOpen(false);
        setHabitToDelete(null);
    };

    const confirmDeleteHabit = () => {
        setHabits(habits.filter(habit => habit.id !== habitToDelete.id));
        closeConfirmationModal();
    };





    const openModal = (habit = null) => {
        setEditingHabit(habit);
        setIsModalOpen(true);
    };

    return (
        <div className="space-y-2">
            <div className="flex justify-between mx-4 items-baseline ">
                <h2 className="text-2xl font-bold text-primary">My Habits</h2>
                <Button onClick={() => openModal()} iconRight={addIcon} iconAlt='Add Icon' className="btn btn-circle mt-4  btn-primary "></Button>
            </div>

            {/* Habit Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {habits.map(habit => (
                    <div key={habit.id} className={`relative card xl:max-w-96 mx-2 bg-gradient-to-r from-slate-900 to-slate-700 border-primary shadow-xl hover:shadow-blue-500 transition-shadow duration-300 `}>
                        <div className="card-body p-6">

                            <div className="flex  gap-4 items-start">

                                <h3 className="card-title text-lg font-semibold text-neutral">{habit.name}</h3>
                                <input
                                    type="checkbox"
                                    checked={habit.completed}
                                    onChange={() => toggleHabitCompletion(habit.id)}
                                    className="checkbox checkbox-success"
                                />
                                <div className=" dropdown dropdown-left absolute top-0 right-0 mr-2">
                                    <div tabIndex={0} role="button" className="">...</div>
                                    <ul tabIndex={0} className="dropdown-content menu  bg-black/60   rounded-box z-[1]  shadow">
                                        <li onClick={() => openModal(habit)}><a>Edit</a></li>
                                        <li onClick={() => openConfirmationModal(habit)}><a>Delete</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className='w-full flex   justify-between my-3 gap-2  '>
                                <HabitStat
                                    label="Completed"
                                    bgColor='shadow-2xl shadow-teal-500'
                                    value="40"
                                    labelColor="font-mono"
                                    valueColor="font-mono "
                                />
                                <HabitStat label="Consistency" bgColor='shadow-2xl shadow-green-600 ' labelColor="font-mono "
                                    valueColor="font-mono" value={`${100} %`} />
                                <HabitStat
                                    label="Streak"
                                    bgColor='shadow-2xl shadow-primary'
                                    value="15"
                                    labelColor="font-mono "
                                    valueColor="font-mono"
                                />
                            </div>

                            <p className="text-white mt-2">{habit.goal}</p>
                            <div className="mt-4 space-y-3">
                                <CalendarHeatmap
                                    startDate={new Date(new Date().setMonth(new Date().getMonth() - 6))} // 6 months ago
                                    endDate={new Date()} // Today
                                    gutterSize={1.5}
                                    showWeekdayLabels={true}
                                    values={habit.history
                                        .filter(entry => entry.status === 'completed') // Filter for completed entries
                                        .map(entry => ({ date: entry.date, count: 1 })) // Map to date and count
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
                                            <Tippy key={value.date} placement='top' animation="scale-extreme" content={`Completed: ${value.date}`}>
                                                {element}
                                            </Tippy>
                                        );
                                    }}
                                />

                            </div>

                        </div>

                        {/* Big Check Icon when Completed */}
                        {habit.completed && (
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
                        onCancel={() => setIsModalOpen(false)}
                    />

                </div>
            )}

            {isConfirmationOpen && (
                <ConfirmationModal
                    isOpen={isConfirmationOpen}
                    onConfirm={confirmDeleteHabit}
                    onCancel={closeConfirmationModal}
                    message={
                        <>Are you sure you want to delete <span className="text-primary font-bold">{habitToDelete.name}</span>?</>
                    }

                />
            )}
        </div>
    );
}

