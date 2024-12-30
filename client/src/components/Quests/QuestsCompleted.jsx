

export function QuestsCompleted({ missions }) {
    return (
        <section className="mt-12">
            <h2 className="text-2xl font-bold mb-4 text-success">Completed Quests</h2>
            <ul className="space-y-2">
                {missions.map((mission) => (
                    <li key={mission.id} className="alert alert-success">
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div>
                            <h3 className="font-bold">{mission.title}</h3>
                            <p className="text-sm">{mission.description}</p>
                        </div>
                        <div className="flex-none">
                            <div className="badge badge-primary">+{mission.points} pearls</div>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    );
}

