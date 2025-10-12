import { useState, useEffect } from 'react'
import { Link } from "react-router-dom"

import GamifyIcon from "../../svg/gamify-icon.svg"
import JourneyIcon from "../../svg/journey-icon.svg"

import HabitCard from '../HabitCard/HabitCard.jsx'
import Roadmap from '../Roadmap/Roadmap.jsx'
import Pricing from '../Pricing/Pricing.jsx'

import Accordion from '../Accordion/Accordion.jsx'
import Button from '../Button/Button.jsx'
import LandingAquariumGrid from '../AquariumGrid/LandingAquariumGrid.jsx'

import { painPointsData, solutionPointsData } from '../../utils/constants.js'

const GRID_SIZE = 2


export default function HeroSection() {
    const words = ["fun", "exciting", "rewarding", "engaging"];
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [typedText, setTypedText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const [pause, setPause] = useState(false); // New state to handle the pause
    const [grid, setGrid] = useState(
        Array(GRID_SIZE)
            .fill(null)
            .map(() => Array(GRID_SIZE).fill(null))
    );

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
                    <p className="mb-3 leading-relaxed  font-mono font-medium text-center w-11/12 ">
                        Make growth fun and simple with gamified habits
                    </p>
                    <Link to="/login">

                        <div className='z-50  '>
                            <Button isWide iconRight={GamifyIcon} iconAlt='Joystick Icon' className='text-white uppercase hover:-rotate-3 transition-transform duration-300 ease-in-out'>Gamify now</Button>
                        </div>
                    </Link>
                </section>

                <section className="relative  flex flex-col gap-4 justify-center items-center">
                    <p className='font-mono  font-medium  italic'>Discover who’s hiding underwater <span className='animate-bounce inline-block'>👀</span></p>
                    <div className="grid  grid-cols-4 max-w-xs bg-gradient-to-b rounded-lg from-blue-800  to-blue-950 w-full gap-0 relative">
                        <LandingAquariumGrid grid={grid} />
                    </div>
                </section>
            </div>

            <section className='relative my-28 max-w-6xl mx-auto z-40 font-extrabold text-center lg:mt-40'>
                <h1 className="text-balance text-4xl font-bold leading-[1.1] tracking-tight sm:text-4xl md:text-4xl lg:text-7xl">
                    Tired of setting goals and never following through?
                </h1>
                <div className="mx-auto mt-12 max-w-3xl space-y-3 text-pretty text-xl leading-relaxed text-foreground/80 sm:text-xl">
                    <p>You've tried planners, apps, and morning routines.</p>
                    <p className="font-medium text-foreground">None of it stuck.</p>
                </div>
                <div className='grid md:grid-cols-2 gap-8 mt-20 max-w-8xl mx-auto'>
                    <HabitCard style="red" labelText={painPointsData.title} listItems={painPointsData.issues} />
                    <HabitCard style="green" labelText={solutionPointsData.title} listItems={solutionPointsData.solutions} />
                </div>
                <div className='z-50 mt-10 '>
                    <Button isWide iconRight={JourneyIcon}  className='text-white shadow-xl  uppercase '>Start Free </Button>
                </div>
            </section>

            <section className=''>
                {/* <Roadmap /> */}
                {/* <Pricing /> */}
            </section>
            <section className='my-28'>
                <Accordion />
            </section>
        </div>
    );
}

