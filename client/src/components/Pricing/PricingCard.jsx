import React, { useState } from 'react';

export default function PricingCard({
    title,
    description,
    price,
    features,
    buttonText,
    onButtonClick,
    showPerMonth = true
}) {
    const [isLifetime, setIsLifetime] = useState(false); // State to track checkbox status

    // Handle checkbox toggle
    const handleToggle = () => {
        setIsLifetime(!isLifetime); // Toggle the lifetime state
    };

    return (
        <div className="bg-gray-800 flex flex-col rounded-lg shadow-lg p-6 transform hover:scale-105 transition duration-300">
            <div className="mb-8">
                {/* Title changes based on the checkbox state */}
                <h3 className="text-4xl mb-4 place-self-center font-semibold text-white">
                    {isLifetime ? 'Lifetime' : title}
                </h3>
                <div className="form-control items-center">
                    <label className="flex align-middle gap-4 cursor-pointer">
                        {/* Handle checkbox change */}
                        <input
                            type="checkbox"
                            className="toggle toggle-primary"
                            defaultChecked={isLifetime}
                            onChange={handleToggle}
                        />
                        <span className="label-text">Pay once, own it forever.</span>
                    </label>
                </div>
            </div>
            <div className="mb-8">
                {/* Price changes based on the checkbox state */}
                <span className="text-5xl font-extrabold text-white">
                    {isLifetime ? '$44.99' : price}
                </span>
                {showPerMonth && !isLifetime && <span className="text-xl font-medium text-gray-400">/mo</span>}
            </div>
            <ul className="mb-8 space-y-4 text-gray-400">
                {features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                        <svg
                            className="h-6 w-6 text-green-500 mr-2"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                        <span>{feature}</span>
                    </li>
                ))}
            </ul>
            <button
                className="block w-full py-3 px-6 text-center rounded-md text-white font-medium bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                onClick={onButtonClick}
            >
                {buttonText}
            </button>
        </div>
    );
}
