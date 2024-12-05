import React from 'react'

export default function HabitStat({ icon, label, value }) {
    return (
        <div className="flex flex-col items-center justify-center p-4 bg-white/10 backdrop-blur-sm rounded-lg">
            <p className="text-sm text-gray-200">{label}</p>
            <p className="font-bold text-white text-xl">{value}</p>
        </div>
    )
}
