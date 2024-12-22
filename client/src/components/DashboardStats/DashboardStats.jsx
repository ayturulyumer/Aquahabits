import React from 'react';

function DashboardSingleStat({ icon, title, value, description, iconClass = "text-primary", descriptionClass = "text-accent" }) {
    return (
        <div className="stat shadow">
            <div className={`stat-figure  ${iconClass}`}>
                {icon}
            </div>
            <div className="stat-title my-1">{title}</div>
            <div className={`stat-value  my-2 ${iconClass}`}>{value}</div>
            <div className={`stat-desc my-1 ${descriptionClass}`}>{description}</div>
        </div>
    );
}

function DashboardStats() {
    const stats = [
        {
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="inline-block h-8 w-8 stroke-current"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    ></path>
                </svg>
            ),
            title: "Habits Completed",
            value: "0/15",
            description: "21% more than last month",
        },
        {
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="inline-block h-8 w-8 stroke-current"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                    ></path>
                </svg>
            ),
            title: "Active habits",
            value: "5",
            description: "21% more than last month",
        },
        {
            icon: (
                <div className="avatar online">
                    <div className="w-16 rounded-full">
                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" alt="User Avatar" />
                    </div>
                </div>
            ),
            title: "Streak",
            value: "7 days",
            description: "31 tasks remaining",
        },
    ];

    return (
        <div className="stats stats-vertical my-2 mx-4 grid   md:stats-horizontal shadow  ">
            {stats.map((stat, index) => (
                <DashboardSingleStat
                    key={index}
                    icon={stat.icon}
                    title={stat.title}
                    value={stat.value}
                    description={stat.description}
                    iconClass={stat.iconClass}
                    descriptionClass={stat.descriptionClass}
                />
            ))}
        </div>
    );
}

export default DashboardStats;
