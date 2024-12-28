import { useState } from 'react';
import confetti from 'canvas-confetti';
import Button from '../../components/Button/Button.jsx';
import HabitForm from '../../components/HabitForm/HabitForm.jsx';
import editIcon from "../../svg/edit-icon.svg"
import addIcon from "../../svg/add-icon.svg"
import CalendarHeatmap from 'react-calendar-heatmap';
import "../../scss/Calendar.scss"


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




    const openModal = (habit = null) => {
        setEditingHabit(habit);
        setIsModalOpen(true);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-primary">My Habits</h2>
                <Button onClick={() => openModal()} iconRight={addIcon} iconAlt='Add Icon' className="btn mt-4 btn-primary ">Add Habit</Button>
            </div>

            {/* Habit Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {habits.map(habit => (
                    <div key={habit.id} className={`card mx-2 bg-base-500  border-primary  shadow-xl hover:shadow-2xl transition-shadow duration-300 hover:border-x`}>
                        <div className="card-body p-6">
                            <div className="flex justify-between items-start">
                                <h3 className="card-title text-lg font-semibold text-neutral">{habit.name}</h3>
                                <div className="badge badge-ghost ">{habit.frequency === "weekly" ? `${habit.selectedDays.length}x/week` : habit.frequency}</div>
                            </div>
                            <p className="text-secondary mt-2">{habit.goal}</p>
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
                                />

                            </div>
                            <div className="card-actions justify-around items-center mt-4">
                                <Button onClick={() => openModal(habit)} iconLeft={editIcon} isCircle className="btn-ghost"></Button>
                                <label className="cursor-pointer label space-x-2">
                                    <span
                                        className={`label-text transition-all duration-500 transform ${habit.completed ? "scale-110 opacity-100 " : "scale-95 "}`}
                                    >
                                        {habit.completed ? "Completed" : "Complete"}
                                    </span>
                                    <input
                                        type="checkbox"
                                        checked={habit.completed}
                                        onChange={() => toggleHabitCompletion(habit.id)}
                                        className="checkbox checkbox-primary transition-all duration-300"
                                    />
                                </label>
                            </div>
                        </div>

                        {/* Big Check Icon when Completed */}
                        {habit.completed && (
                            <div onClick={() => toggleHabitCompletion(habit.id)} className="absolute  top-0 left-0 w-full h-full flex items-center justify-center bg-black  cursor-pointer rounded-box bg-opacity-80 z-50">
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
        </div>
    );
}

