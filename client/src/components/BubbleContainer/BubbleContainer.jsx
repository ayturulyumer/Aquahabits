import { useMemo } from "react";

export default function BubbleContainer() {
    const bubbles = useMemo(() => {
        const bubbleArray = [];
        for (let i = 0; i < 10; i++) {
            bubbleArray.push(
                <div
                    key={`bubble-${i}`}
                    className="bubble"
                    style={{
                        animationDelay: `${Math.random() * 2}s`,
                        bottom: `${Math.random() * 100}px`,
                        left: `${Math.random() * 100}%`,
                    }}
                ></div>
            );
        }
        return bubbleArray;
    }, []); // No dependencies, ensures bubbles are created once

    return <div>{bubbles}</div>;
}
