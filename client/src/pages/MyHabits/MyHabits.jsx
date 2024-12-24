import { useState } from 'react';
import confetti from 'canvas-confetti';


const initialHabits = [
    { id: 1, name: 'Drink Water', frequency: 'Daily', completed: false, streak: 5, goal: '8 glasses' },
    { id: 2, name: 'Exercise', frequency: '3x per week', completed: false, streak: 2, goal: '30 minutes' },
    { id: 3, name: 'Read', frequency: 'Daily', completed: true, streak: 10, goal: '30 pages' },
    { id: 4, name: 'Meditate', frequency: 'Daily', completed: false, streak: 7, goal: '15 minutes' },
    { id: 5, name: 'Learn a Language', frequency: '5x per week', completed: true, streak: 15, goal: '20 new words' },
];

export default function MyHabits() {
    const [habits, setHabits] = useState(initialHabits);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingHabit, setEditingHabit] = useState(null);

    const toggleHabitCompletion = (id) => {
        const updatedHabits = habits.map(habit =>
            habit.id === id ? { ...habit, completed: !habit.completed } : habit
        );

        // Play sound if habit is completed
        const habit = updatedHabits.find(habit => habit.id === id);
        if (habit.completed) {
            const audio = new Audio('/success-sound.mp3');
            audio.volume = 0.05
            audio.play();

            // Trigger confetti
            confetti({
                particleCount: 50, // Number of particles
                spread: 80,         // Spread of the confetti
                origin: { x: 0.5, y: 0.7 }, // Origin at the center of the screen
                colors: ['#ffa500', '#ff6347', '#32cd32', '#1e90ff', '#800080'], // Orange, tomato red, lime green, dodger blue, purple

            });
        } else {
            const audio = new Audio('/uncheck-sound.mp3');
            audio.volume = 0.05
            audio.play();
        }

        setHabits(updatedHabits);
    };

    const addOrUpdateHabit = (habit) => {
        if (habit.id) {
            setHabits(habits.map(h => h.id === habit.id ? habit : h));
        } else {
            setHabits([...habits, { ...habit, id: Date.now(), streak: 0 }]);
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
                <button onClick={() => openModal()} className="btn btn-primary">Add New Habit</button>
            </div>

            {/* Habit Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {habits.map(habit => (
                    <div key={habit.id} className={`card bg-base-500 border-y border-primary shadow-xl hover:shadow-2xl transition-shadow duration-300`}>
                        <div className="card-body p-6">
                            <div className="flex justify-between items-start">
                                <h3 className="card-title text-lg font-semibold text-neutral">{habit.name}</h3>
                                <div className="badge badge-ghost">{habit.frequency}</div>
                            </div>
                            <p className="text-secondary mt-2">{habit.goal}</p>
                            <div className="mt-4 space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium">Streak</span>
                                    <div className="flex items-center space-x-2">
                                        <span className="text-xl font-bold text-success">{habit.streak}</span>
                                        <span className="text-sm text-secondary">days</span>
                                    </div>
                                </div>
                                <progress
                                    className="progress progress-success w-full"
                                    value={habit.streak}
                                    max="30"
                                ></progress>
                            </div>
                            <div className="card-actions justify-between items-center mt-4">
                                <label className="cursor-pointer label space-x-2">
                                    <span className="label-text">Completed Today</span>
                                    <input
                                        type="checkbox"
                                        checked={habit.completed}
                                        onChange={() => toggleHabitCompletion(habit.id)}
                                        className="checkbox checkbox-success"
                                    />
                                </label>
                                <button onClick={() => openModal(habit)} className="btn btn-ghost btn-sm">Edit</button>
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
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-base-100 p-6 rounded-lg shadow-xl w-full max-w-md">
                        <h3 className="text-xl font-semibold mb-4 text-primary">{editingHabit ? 'Edit Habit' : 'Add New Habit'}</h3>
                        <HabitForm
                            habit={editingHabit || {}}
                            onSubmit={addOrUpdateHabit}
                            onCancel={() => setIsModalOpen(false)}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

function HabitForm({ habit, onSubmit, onCancel }) {
    const [formData, setFormData] = useState(habit);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        setFormData({});
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-neutral-content">Habit Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name || ''}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                />
            </div>
            <div>
                <label htmlFor="description" className="block text-sm font-medium text-neutral-content">Description</label>
                <textarea
                    id="description"
                    name="description"
                    value={formData.description || ''}
                    onChange={handleChange}
                    rows="3"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                ></textarea>
            </div>
            <div>
                <label htmlFor="frequency" className="block text-sm font-medium text-neutral-content">Frequency</label>
                <select
                    id="frequency"
                    name="frequency"
                    value={formData.frequency || ''}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                >
                    <option value="">Select frequency</option>
                    <option value="Daily">Daily</option>
                    <option value="Weekly">Weekly</option>
                    <option value="3x per week">3x per week</option>
                    <option value="5x per week">5x per week</option>
                    <option value="Custom">Custom</option>
                </select>
            </div>
            <div>
                <label htmlFor="goal" className="block text-sm font-medium text-neutral-content">Goal</label>
                <input
                    type="text"
                    id="goal"
                    name="goal"
                    value={formData.goal || ''}
                    onChange={handleChange}
                    placeholder="e.g., 10,000 steps"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                />
            </div>
            <div className="flex justify-end space-x-3">
                <button type="button" onClick={onCancel} className="btn btn-ghost">Cancel</button>
                <button type="submit" className="btn btn-primary">{habit.id ? 'Update' : 'Add'} Habit</button>
            </div>
        </form>
    );
}
