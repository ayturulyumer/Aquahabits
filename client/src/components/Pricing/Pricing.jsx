
import PricingCard from "./PricingCard.jsx";

export default function Pricing() {
    const plans = [
        {
            title: "Monthly",
            description: "Get started with our basic features.",
            price: "$4.99",
            features: ["Track Unlimited Habits", "Progress Dashboard", "Daily Reminders", "Build your Aquarium" , "Complete Quests"],
            buttonText: "Gamify your journey",
            onButtonClick: () => alert("Start your journey"),
            showPerMonth: true
        },
    ];

    return (
        <section className="py-12">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-extrabold italic sm:text-5xl">
                        A journey of a thousand miles begins with a single step
                    </h2>
                </div>
                <div className="grid grid-cols-1 gap-8 ">
                    {plans.map((plan, index) => (
                        <PricingCard key={index} {...plan} />
                    ))}
                </div>
            </div>
        </section>
    );
};

