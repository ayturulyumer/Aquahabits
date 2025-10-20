
import { Link } from "react-router-dom"
import Button from "../Button/Button.jsx"
import showcaseVideo from '../../assets/videos/showcase.mp4';
export default function Showcase() {

    return (
        <section className="grid gap-12 py-24 lg:grid-cols-2 lg:gap-8 h-full">
            {/* Left: Video */}
            <div className="relative flex flex-col justify-center items-center gap-4">
                <video
                    className="w-full rounded-xl shadow-lg max-w-md"
                    autoPlay
                    muted
                    loop
                    playsInline
                >
                    <source src={showcaseVideo} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>

            </div>

            {/* Right: Copy */}
            <div className="relative flex flex-col justify-center items-start gap-4">
                <h2 className="mb-4 text-3xl font-black -tracking-wider leading-none w-11/12 md:text-5xl lg:text-6xl lg:w-10/12 text-left font-mono text-blue-200">
                    Turn Your Daily Habits Into a Living Aquarium
                </h2>
                <p className="mb-3 leading-relaxed font-medium text-left text-base-content w-11/12">
                    Track habits, complete quests, level up your fish, and watch your underwater world grow. Every small win comes alive!
                </p>
                <ul className="mb-6 space-y-2 text-base-content font-medium">
                    <li className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-green-400" />
                        Tick habits - streaks unlocked!
                    </li>
                    <li className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-yellow-600" />
                        Complete quests - grab shiny rewards!
                    </li>
                    <li className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-purple-500" />
                        Level up your fish - watch them grow!
                    </li>
                </ul>
                <Link to="/login">
                    <Button
                        isWide
                        className="text-white uppercase hover:-rotate-3 transition-transform duration-300 ease-in-out"
                    >
                        Build your aquarium
                    </Button>
                </Link>
            </div>
        </section>


    )
}
