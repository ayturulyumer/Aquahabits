import { useState } from "react";
export default function HabitForm({ habit, onSubmit, onCancel }) {
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
