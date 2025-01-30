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
  { name: "Seahorse", rarity: "common", cost: 35, icon: SeahorseIcon, size: "small" },
  { name: "Clownfish", rarity: "common", cost: 45, icon: ClownfishIcon, size: "small" },
  { name: "Crab", rarity: "common", cost: 55, icon: CrabIcon, size: "small" },

  // Mid-Level Creatures (Uncommon)
  { name: "Jellyfish", rarity: "rare", cost: 70, icon: JellyfishIcon, size: "small" },
  { name: "Piranha", rarity: "rare", cost: 90, icon: PiranhaIcon, size: "small" },
  { name: "Stingray", rarity: "rare", cost: 95, icon: StingrayIcon, size: "small" },

  // Advanced Creatures (Rare)
  { name: "Starfish", rarity: "epic", cost: 120, icon: StarfishIcon, size: "small" },
  { name: "Dolphin", rarity: "epic", cost: 140, icon: DolphinIcon, size: "small" },
  { name: "Octopus", rarity: "epic", cost: 160, icon: OctopusIcon, size: "small" },
  { name: "Sea Turtle", rarity: "epic", cost: 175, icon: SeaTurtleIcon, size: "small" },
  { name: "Shark", rarity: "epic", cost: 220, icon: SharkIcon, size: "small" },

  // High-Level Creatures (Legendary)
  { name: "Whale", rarity: "legendary", cost: 250, icon: WhaleIcon, size: "small" },
  { name: "Kraken", rarity: "legendary", cost: 280, icon: KrakenIcon, size: "small" },
  { name: "Axolotl", rarity: "legendary", cost: 310, icon: AxolotlIcon, size: "small" },
  { name: "Triturus", rarity: "legendary", cost: 360, icon: TriturusIcon, size: "small" },
];

export const GROWTH_COSTS = {
  common: {
    level2: 20,
    level3: 40,
  },
  rare: {
    level2: 40,
    level3: 70,
  },
  epic: {
    level2: 70,
    level3: 120,
  },
  legendary: {
    level2: 120,
    level3: 240,
  },
};


