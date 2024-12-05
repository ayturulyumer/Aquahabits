export default function HabitCard({ style, labelText, listItems }) {
    // Define styles for green and red card variations

    const styles = {
        green: "border-green-300 bg-green-950/10 text-green-300",
        red: "border-red-300 bg-red-700/10 text-red-300",
    };

    return (
        <div
            className={`card rounded-box w-96 h-96 backdrop-blur-lg ${styles[style]}`}
        >
            <div className="card-body space-y-2">
                <h3 className="text-3xl font-bold">{labelText}</h3>
                <ul className="space-y-5 font-medium mb-8 list-disc  text-white">
                    {listItems?.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
