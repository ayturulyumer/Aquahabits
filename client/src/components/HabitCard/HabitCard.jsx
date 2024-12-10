export default function HabitCard({ linethrough, style, labelText, listItems }) {
    // Define styles for green and red card variations

    const styles = {
        green: "border-primary text-primary",
        red: "border-red-300  text-red-300",
    };

    return (
        <div
            className={`card rounded-box  border bg-gray-800 backdrop-blur-lg ${styles[style]}`}
        >
            <div className="card-body space-y-2">
                <h3 className={`${linethrough ? "line-through" : ""} text-3xl font-bold`}>{labelText}</h3>
                <ul className="space-y-5  mb-8  list-disc text-lg   text-yellow-50">
                    {listItems?.map((item, index) => (
                        <li className=" leading-loose" key={index}>{item}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
