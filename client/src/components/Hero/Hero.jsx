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
                    <div className="flex flex-col gap-2 justify-center  items-center">
                        <h1 className="mb-4 text-4xl  text-center font-extrabold  tracking-tight sm:text-5xl md:text-7xl">
                            Level Up Your Life with <span className="font-light text-[#50B0FF] tracking-normal">Habitect</span>
                        </h1>
                        <p className="mb-8 text-xl text-center">
                            Track habits, crush goals, and turn your life into an epic adventure. Gamify your growth and watch your progress soar!
                        </p>
                        <div className=''>
                            <button className="btn btn-md btn-outline  text-white">
                                Get Started
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
