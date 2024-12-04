import React from 'react'

function HabitStat({ label, value }) {
    return (
        <div className="flex flex-col items-center justify-center p-4 bg-white/10 backdrop-blur-sm rounded-lg">
            <p className="text-sm text-gray-200">{label}</p>
            <p className="font-bold text-white text-xl">{value}</p>
        </div>
    )
}

export default function HeroSection() {
    return (
        <div className="relative min-h-full  overflow-hidden ">
            <div className="container mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8 max-w-full">
                <div className="grid gap-12 lg:grid-cols-2 lg:gap-8">
                    <div className="flex flex-col justify-center">
                        <h1 className="mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
                            Level Up Your Life with Habitect
                        </h1>
                        <p className="mb-8 text-xl">
                            Track habits, crush goals, and turn your life into an epic adventure. Gamify your growth and watch your progress soar!
                        </p>
                        <div>
                            <button className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-purple-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-150">
                                Start Your Journey
                            </button>
                        </div>
                    </div>
                    <div className="relative">
                        {/* Background circle should be confined to its parent container */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="h-64 w-64 max-w-full max-h-full rounded-full bg-blue-400 opacity-50 blur-3xl"></div>
                        </div>
                        <div className="relative flex items-center justify-center">
                            <div className="grid grid-cols-2 gap-8">
                                <HabitStat label="Daily Streak" value="7 Days" />
                                <HabitStat label="Goals Completed" value="15" />
                                <HabitStat label="Achievements" value="5 Unlocked" />
                                <div className="flex items-center justify-center p-4 bg-white/10 backdrop-blur-sm rounded-lg">
                                    <span className="text-4xl font-bold text-white">+10</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
