

export default function HabitStat({
    icon,
    label,
    value,
    bgColor = 'bg-white/10', // Default background color
    labelColor = 'text-gray-200', // Default label color
    valueColor = 'text-white', // Default value color
}) {
    return (
        <div className={`flex min-w-10 flex-col  items-center justify-center p-2 ${bgColor} rounded-lg`}>
            {/* Icon (if you want to use the icon prop, you can include it here) */}
            {icon && <div className="mb-2">{icon}</div>}

            <p className={`text-xs  ${labelColor}`}>{label}</p>
            <p className={`text-md ${valueColor}`}>{value}</p>
        </div>
    )
}
