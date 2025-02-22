import { useState } from "react"

import { accordionItems } from "../../utils/constants.js"
import AccordionSingleItem from "./AccordionSingleItem.jsx"

export default function Accordion() {
    const [openIndex, setOpenIndex] = useState(null)

    const handleItemClick = (index) => {
        setOpenIndex(openIndex === index ? null : index)
    }
    return (
        <div className="w-full mt-8 max-w-4xl mx-auto  rounded-lg overflow-hidden">
            <h1 className="text-4xl mb-4 text-center">FAQ</h1>
            {accordionItems.map((item, index) => (
                <AccordionSingleItem
                    key={index}
                    title={item.title}
                    content={item.content}
                    isOpen={openIndex === index}
                    onClick={() => handleItemClick(index)} />
            ))}
        </div>
    )
}
