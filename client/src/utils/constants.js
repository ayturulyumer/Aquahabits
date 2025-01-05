import AxolotlIcon from "../assets/axolotl.png";
import ClownfishIcon from "../assets/clownfish.png";
import DolphinIcon from "../assets/dolphin.png";
import JellyfishIcon from "../assets/jellyfish.png";
import KrakenIcon from "../assets/kraken.png";
import OctopusIcon from "../assets/octopus.png";
import PiranhaIcon from "../assets/piranha.png";
import SeahorseIcon from "../assets/seahorse.png";
import SeaTurtleIcon from "../assets/seaturtle.png";
import SharkIcon from "../assets/shark.png";
import StingrayIcon from "../assets/stingray.png";
import TriturusIcon from "../assets/triturus.png";
import WhaleIcon from "../assets/whale.png";
import CrabIcon from "../assets/crab.png";
import StarfishIcon from "../assets/starfish.png";

export const accordionItems = [
  {
    title: "What is actually Habitect?",
    content:
      "Habitect is a gamified habit tracking app that helps you build and maintain positive habits by turning your daily routines into exciting quests and challenges.",
  },
  {
    title: "Can i track multiple habits at once ?",
    content:
      "Yes! With Habitect, you can track multiple habits simultaneously.",
  },
  {
    title: "Is there a mobile app available?",
    content:
      "Currently, Habitect is available as a web application optimized for both desktop and mobile browsers.",
  },
];

export const painPointsData = {
  title: "Why Building Habits is Hard",
  issues: [
    "Lack of motivation and consistency",
    "Absence of immediate rewards",
    "Difficulty in tracking progress",
    "Overwhelming when trying to change multiple habits",
  ],
};

export const solutionPointsData = {
  title: "How Habitect Transforms it",
  solutions: [
    "Gamified experience to boost motivation",
    "Instant rewards and achievements",
    "Visual progress tracking and analytics",
    "Gradual habit stacking for sustainable change",
  ],
};

export const ITEM_TYPES = [
  // Easy Creatures to Unlock (Common)
  { name: "Seahorse", rarity: "common", cost: 50, icon: SeahorseIcon, size: "small", level: 1 },
  { name: "Clownfish", rarity: "common", cost: 60, icon: ClownfishIcon, size: "small", level: 1 },
  { name: "Crab", rarity: "common", cost: 70, icon: CrabIcon, size: "small", level: 1 },

  // Mid-Level Creatures (Uncommon)
  { name: "Jellyfish", rarity: "uncommon", cost: 100, icon: JellyfishIcon, size: "small", level: 1 },
  { name: "Piranha", rarity: "uncommon", cost: 120, icon: PiranhaIcon, size: "small", level: 1 },
  { name: "Stingray", rarity: "uncommon", cost: 130, icon: StingrayIcon, size: "small", level: 1 },

  // Advanced Creatures (Rare)
  { name: "Starfish", rarity: "rare", cost: 150, icon: StarfishIcon, size: "small", level: 1 },
  { name: "Dolphin", rarity: "rare", cost: 180, icon: DolphinIcon, size: "small", level: 1 },
  { name: "Octopus", rarity: "rare", cost: 200, icon: OctopusIcon, size: "small", level: 1 },
  { name: "Sea Turtle", rarity: "rare", cost: 220, icon: SeaTurtleIcon, size: "small", level: 1 },

  // High-Level Creatures (Legendary)
  { name: "Shark", rarity: "legendary", cost: 300, icon: SharkIcon, size: "small", level: 1 },
  { name: "Whale", rarity: "legendary", cost: 350, icon: WhaleIcon, size: "small", level: 1 },
  { name: "Kraken", rarity: "legendary", cost: 400, icon: KrakenIcon, size: "small", level: 1 },
  { name: "Axolotl", rarity: "legendary", cost: 450, icon: AxolotlIcon, size: "small", level: 1 },
  { name: "Triturus", rarity: "legendary", cost: 500, icon: TriturusIcon, size: "small", level: 1 },
];

export const GROWTH_COSTS = {
  common: {
    level2: 30,
    level3: 60,
  },
  uncommon: {
    level2: 50,
    level3: 100,
  },
  rare: {
    level2: 80,
    level3: 150,
  },
  legendary: {
    level2: 150,
    level3: 300,
  },
};


