
export default function HabitStat({
    icon,
    label,
    value,
    consistencyPercent,
    bgColor = 'bg-white/10',
    labelColor = 'text-gray-200',
    valueColor = 'text-white',
}) {
    // Example percentage change — you can make this dynamic based on your data.
    const percentageChange = label.toLowerCase() === 'consistency' ? consistencyPercent : null;

    return (
        <div className={`flex min-w-10 flex-col items-center justify-center p-2 ${bgColor} rounded-lg`}>
            {icon && <div className="mb-2">{icon}</div>}
            <p className={`text-xs ${labelColor}`}>{label}</p>
            <p className={`text-md font-sans font-bold ${valueColor}`}>{value}</p>

            {percentageChange !== null && (
                <span className={`text-[10px] tracking-widest font-semibold  font-sans text-center ${percentageChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {percentageChange >= 0 ? '▲' : '▼'} {`${Math.abs(percentageChange)}%`}
                </span>
            )}
        </div>
    );
}
