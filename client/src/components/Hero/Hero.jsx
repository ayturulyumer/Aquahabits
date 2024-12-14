import { useState, useEffect } from 'react'

import GamifyIcon from "../../svg/gamify-icon.svg"

import HabitStat from '../HabitStat/HabitStat.jsx'
import HabitCard from '../HabitCard/HabitCard.jsx'
import Roadmap from '../Roadmap/Roadmap.jsx'
import Pricing from '../Pricing/Pricing.jsx'

import Accordion from '../Accordion/Accordion.jsx'
import Button from '../Button/Button.jsx'


const painPointsData = {
    title: "Challenges in building lasting habits:",
    issues: [
        "Setting unrealistic expectations",
        "Relying solely on discipline",
        "Lacking feedback or rewards",
        "Feeling discouraged after failure"
    ]
}

const solutionPointsData = {
    title: "A smarter way to build lasting habits:",
    solutions: [
        "Start with small, manageable habits",
        "Gamify the process",
        "Celebrate every step forward",
        "Focus on small wins to avoid burnout"
    ]
}





export default function HeroSection() {
    const words = ["fun", "exciting", "rewarding", "engaging"];
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [typedText, setTypedText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const [pause, setPause] = useState(false); // New state to handle the pause

    useEffect(() => {
        let typingSpeed = 150;

        if (pause) {
            typingSpeed = 2000;
        } else if (isDeleting) {
            typingSpeed = 100;
        }

        const currentWord = words[currentWordIndex];
        const updateText = setTimeout(() => {
            if (!pause) {
                if (!isDeleting && typedText !== currentWord) {
                    setTypedText(currentWord.slice(0, typedText.length + 1));
                } else if (isDeleting && typedText !== "") {
                    setTypedText(currentWord.slice(0, typedText.length - 1));
                } else if (!isDeleting && typedText === currentWord) {
                    setPause(true);
                } else if (isDeleting && typedText === "") {
                    setIsDeleting(false);
                    setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
                }
            } else {
                setPause(false); // End pause after 2 seconds
                setIsDeleting(true); // Start deleting
            }
        }, typingSpeed);

        return () => clearTimeout(updateText);
    }, [typedText, isDeleting, pause, currentWordIndex, words]);

    return (
        <div className="container mx-auto px-2 py-16 sm:px-6 sm:py-24 lg:px-4 max-w-full h-full">
            <div className="grid gap-12 py-24 lg:grid-cols-2 lg:gap-8 h-full">
                <section className="relative flex flex-col justify-center items-center gap-3">
                    <h1 className="mb-4 text-3xl font-black -tracking-wider  leading-none text-left w-11/12    md:w-full md:font-semibold md:text-5xl  lg:text-6xl lg:w-10/12">
                        Building lasting habits is easier when it's
                        <span className="relative inline-block ml-2 mt-2 bg-base-100 rounded-xl transform">
                            <span className="relative z-10 px-2 py-1 text-primary font-mono font-black ">
                                {typedText}
                                <span className="animate-pulse text-white text-md">|</span>
                            </span>
                        </span>
                    </h1>
                    <p className="mb-3 leading-relaxed font-medium text-center w-11/12 ">
                        Make growth fun and simple with gamified habits
                    </p>
                    <div className='z-50  '>
                        <Button isWide iconRight={GamifyIcon} iconAlt='Joystick Icon' className='text-secondary hover:-rotate-3 transition-transform duration-300 ease-in-out'>Gamify now</Button>
                    </div>
                </section>

                <section className="relative  flex justify-center items-center">
                    <div className="absolute inset-0 flex items-center justify-center z-0">
                        <div className="h-64 w-64 max-w-full max-h-full rounded-full bg-blue-400 opacity-50 blur-3xl"></div>
                    </div>

                    <div className="relative flex items-center justify-center">
                        <div className="grid grid-cols-2 gap-8">
                            <HabitStat label="Daily Streak" value="7 Days" />
                            <HabitStat label="Goals Completed" value="15" />
                            <HabitStat label="Achievements" value="5 Unlocked" />
                            <div className="flex items-center justify-center p-4 bg-white/10 backdrop-blur-sm rounded-lg">
                                <span className="text-4xl font-bold text-neutral">+10</span>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <section className='relative my-28 max-w-6xl mx-auto z-40 font-extrabold text-center lg:mt-40'>
                <h2 className='text-3xl text-center font-extrabold sm:text-4xl md:text-5xl'>
                    Tired of setting goals and never following through?
                </h2>
                <div className='grid md:grid-cols-2 gap-8 mt-20 max-w-4xl mx-auto'>
                    <HabitCard style="red" labelText={painPointsData.title} listItems={painPointsData.issues} />
                    <HabitCard style="green" labelText={solutionPointsData.title} listItems={solutionPointsData.solutions} />
                </div>
                <h3 className='my-8 text-2xl leading-relaxed font-medium'>
                    We get it. Building lasting habits is tough, especially when you feel like you're just spinning your wheels.
                </h3>
                <h3 className='my-8 leading-relaxed font-medium'>But it doesn't have to be </h3>
            </section>

            <section className='grid  grid-cols-1 md:grid-cols-2'>
                <Roadmap />
                <Pricing />
            </section>
            <section className='my-28'>

                <Accordion />
            </section>
        </div>
    );
}

