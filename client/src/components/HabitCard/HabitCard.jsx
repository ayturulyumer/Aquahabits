export default function HabitCard({ style, labelText, listItems }) {
  

    const styles = {
        green: "border-primary text-primary",
        red: "border-red-300  text-red-300",
    };

    return (
        <div
            className={`card rounded-box  border bg-gray-800 backdrop-blur-lg ${styles[style]}`}
        >
            <div className="card-body  space-y-2">
                <h3 className=" text-3xl text-left font-medium">{labelText}</h3>
                <ul className="space-y-5  mb-8  list-disc font-normal text-left  ">
                    {listItems?.map((item, index) => (
                        <li className="leading-normal tracking-wider   text-white" key={index}>{item}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
