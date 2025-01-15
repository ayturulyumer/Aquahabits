import { useState } from "react";
import Button from "../Button/Button.jsx";
import { useForm } from "../../hooks/useForm.jsx";

const DAYS_OF_WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const READY_TO_GO_HABITS = [
    'Walk 🚶‍♂️',
    'Workout 🏋️‍♀️',
    'Read 📖',
    'Code 💻',
    'Meditate 🧘',
    'Yoga 🧘‍♀️',
    'Journal ✍️',
];

export default function HabitForm({ habit = {}, addOrUpdateHabit, onCancel }) {
    const { values, changeHandler, onSubmit } = useForm(
        {
            name: habit.name || "",
            goal: habit.goal || "",
            frequency: habit.frequency || "Daily",
            selectedDays: habit.selectedDays || [],
            history: habit.history || [],
            // Only include _id if the habit exists (i.e., we're editing)
            ...(habit ? { _id: habit._id } : {}),
        },
        addOrUpdateHabit
    );

    // Handle frequency changes and reset `selectedDays` if switched to "daily"
    const handleFrequencyChange = (e) => {
        const frequency = e.target.value;
        changeHandler({
            target: {
                name: "frequency",
                value: frequency,
            },
        });
        if (frequency === "daily") {
            // Clear selectedDays if the frequency is daily
            changeHandler({
                target: {
                    name: "selectedDays",
                    value: [],
                },
            });
        }
    };

    const handleDayChange = (day, isSelected) => {
        const updatedDays = isSelected
            ? [...values.selectedDays, day]
            : values.selectedDays.filter((d) => d !== day);

        changeHandler({ target: { name: "selectedDays", value: updatedDays } });
    };


    return (
        <form
            onClick={(e) => e.stopPropagation()}
            onSubmit={onSubmit}
            className="max-w-72 md:max-w-md mx-4 p-4 bg-base-300 rounded-box"
        >
            {/* Habit Name */}
            <div className="form-control w-full mb-4">
                <label className="label">
                    <span className="label-text">Habit Name</span>
                </label>
                <input
                    type="text"
                    name="name"
                    placeholder="e.g. I will code for 15 minutes"
                    className="input input-bordered w-full"
                    value={values.name}
                    onChange={changeHandler}
                    required
                />
            </div>

            {/* Ready-To-Go Habits */}
            <div className="mb-4 w-full">
                <div className="flex py-4 gap-2 overflow-x-scroll md:overflow-x-hidden md:grid md:grid-cols-3 md:gap-2">
                    {READY_TO_GO_HABITS.map((habitOption) => (
                        <button
                            key={habitOption}
                            type="button"
                            className="btn btn-md"
                            onClick={() =>
                                changeHandler({ target: { name: "name", value: habitOption } })
                            }
                        >
                            {habitOption}
                        </button>
                    ))}
                </div>
            </div>

            {/* Goal */}
            <div className="form-control w-full mb-4">
                <label className="label">
                    <span className="label-text">Goal</span>
                </label>
                <textarea
                    name="goal"
                    className="textarea textarea-bordered h-24"
                    placeholder="What's your goal with this habit ?"
                    value={values.goal}
                    onChange={changeHandler}
                ></textarea>
            </div>

            {/* Frequency */}
            <div className="form-control w-full mb-4">
                <label className="label">
                    <span className="label-text">Frequency</span>
                </label>
                <select
                    name="frequency"
                    className="select select-bordered w-full"
                    value={values.frequency}
                    onChange={handleFrequencyChange}
                >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                </select>
            </div>

            {/* Weekly Frequency: Select Days */}
            {values.frequency === "weekly" && (
                <div className="mb-4">
                    <label className="label">
                        <span className="label-text">Select Days</span>
                    </label>
                    <div className="flex py-4 gap-2 overflow-x-scroll md:overflow-x-hidden md:grid md:grid-cols-2 ">
                        {DAYS_OF_WEEK.map((day) => (
                            <div key={day} className="form-control">
                                <label className="label cursor-pointer justify-start gap-2">
                                    <input
                                        type="checkbox"
                                        className="checkbox checkbox-sm checkbox-success"
                                        checked={values.selectedDays.includes(day)}
                                        onChange={(e) => handleDayChange(day, e.target.checked)}
                                    />
                                    <span className="label-text">{day}</span>
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Buttons */}
            <div className="flex justify-between gap-2">
                <Button
                    onClick={onCancel}
                    type="button"
                    className="btn btn-error text-white"
                >
                    Cancel
                </Button>
                <Button type="submit" className="btn btn-primary">
                    {habit._id ? "Update Habit" : "Create Habit"}
                </Button>
            </div>
        </form>
    );
}
