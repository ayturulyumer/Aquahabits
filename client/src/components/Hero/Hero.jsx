

import HabitStat from '../HabitStat/HabitStat.jsx'
import HabitCard from '../HabitCard/HabitCard.jsx'
import Roadmap from '../Roadmap/Roadmap.jsx'

const painPointsData = {
    title: "Traditional way:",
    issues: [
        "Set unrealistic goals.",
        "Focus on discipline alone",
        "No feedback or rewards",
        "Feel guilty for failing"

    ]

}

const solutionPointsData =
{
    title: "With Habitect:",
    solutions: [
        "Build momentum with micro-habits",
        "Enjoy streaks, points, and rewards",
        "Get kudos for progress, big or small",
        "Achieve without burnout by seeing your small victories"
    ]
}




export default function HeroSection() {
    return (
        <div className="relative min-h-screen bg-custom-gradient  overflow-hidden">
            <div className="container mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8 max-w-full h-full">
                <div className="grid gap-12  py-24 lg:grid-cols-2 lg:gap-8 h-full">
                    <section className="relative h-full flex flex-col gap-2 justify-center items-center">
                        <h1 className="mb-4 text-4xl text-center font-extrabold tracking-tight sm:text-5xl md:text-7xl">
                            Level Up Your Life with <span className="font-light text-[#A4E1D4] tracking-normal">Habitect</span>
                        </h1>
                        <p className="mb-8 text-xl text-center">
                            Track habits, crush goals, and turn your life into an epic adventure. Gamify your growth and watch your progress soar!
                        </p>
                        <div className='z-50'>
                            <button className="btn  btn-md btn-outline text-white">
                                Get Started
                            </button>
                        </div>
                    </section>
                    <section className="relative h-full">
                        <div className="absolute inset-0 flex items-center justify-center z-0">
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
                    </section>
                    <div className="absolute hidden lg:block bottom-[2060px]  left-0 w-full">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-fit">
                            <defs>
                                <linearGradient id="customGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" style={{ stopColor: '#202639', stopOpacity: 1 }} />
                                    <stop offset="100%" style={{ stopColor: '#3F4C77', stopOpacity: 1 }} />
                                </linearGradient>
                            </defs>
                            <path
                                fill="url(#customGradient)"
                                d="M0,192L48,165.3C96,139,192,85,288,85.3C384,85,480,139,576,144C672,149,768,107,864,112C960,117,1056,171,1152,160C1248,149,1344,75,1392,37.3L1440,0L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                            ></path>
                        </svg>
                    </div>

                </div>
                <section className='relative mt-20 max-w-6xl mx-auto z-40 font-extrabold  text-center  '>
                    <h1 className='text-4xl text-center font-extrabold sm:text-4xl md:text-6xl'>
                        Tired of failing your <span className='italic text-yellow-200'>New Year’s resolutions</span> every year?
                    </h1>

                    <div className='grid md:grid-cols-2  gap-8 mt-20 max-w-4xl mx-auto '>
                        <HabitCard linethrough="linethrough" style="red" labelText={painPointsData.title} listItems={painPointsData.issues} />
                        <HabitCard style="green" labelText={solutionPointsData.title} listItems={solutionPointsData.solutions} />
                    </div>
                </section>
                <section className='flex justify-center w-screen mt-36 '>
                    <Roadmap />
                </section>
            </div>
        </div>
    )
}
