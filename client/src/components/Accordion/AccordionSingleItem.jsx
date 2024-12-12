import { useRef, useEffect } from "react"

const ChevronIcon = ({ color }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
)

export default function AccordionSingleItem({ title, content, isOpen, onClick }) {
    const contentRef = useRef(null)

    useEffect(() => {
        if (contentRef.current) {
            contentRef.current.style.maxHeight = isOpen ? `${contentRef.current.scrollHeight}px` : '0'
        }
    }, [isOpen])

    return (
        <div className="border-b border-black   ">
            <button
                className="flex justify-between items-center w-full py-4 px-6 text-left"
                onClick={onClick}
                aria-expanded={isOpen}
            >
                <span className="text-lg font-medium tracking-wider text-white">{title}</span>
                <span
                    className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'
                        }`}
                >
                    <ChevronIcon color={isOpen ? "#98FF98" : "#000000"} />
                </span>
            </button>
            <div
                ref={contentRef}
                className="overflow-hidden transition-all duration-300 ease-in-out"
                style={{ maxHeight: 0 }}
            >
                <div className="p-6 bg-gray-800/50 rounded-t-3xl text-md text-gray-400 ">
                    <p>{content}</p>
                </div>
            </div>
        </div>
    )
}
