

export default function HabitStat({
    icon,
    label,
    value,
    bgColor = 'bg-white/10', // Default background color
    labelColor = 'text-gray-200', // Default label color
    valueColor = 'text-white', // Default value color
}) {
    return (
        <div className={`flex flex-col items-center justify-center p-4 ${bgColor} rounded-lg`}>
            {/* Icon (if you want to use the icon prop, you can include it here) */}
            {icon && <div className="mb-2">{icon}</div>}

            <p className={`text-sm ${labelColor}`}>{label}</p>
            <p className={`font-medium text-xl ${valueColor}`}>{value}</p>
        </div>
    )
}
