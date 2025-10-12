"use client"

export default function HabitCard({ style, labelText, listItems }) {
  const isRed = style === "red"
  const Icon = isRed ? (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 transition-transform group-hover:scale-110 text-red-600 dark:text-red-400"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ) : (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 transition-transform group-hover:scale-110 text-emerald-600 dark:text-emerald-400"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2l4 -4m6 2a9 9 0 11-18 0a9 9 0 0118 0z" />
    </svg>
  )

  const borderClasses = isRed
    ? "border-red-200/60 bg-gradient-to-br from-red-50/80 to-red-100/40 shadow-red-100/50 hover:border-red-300/80 hover:shadow-red-200/60 dark:border-red-900/40 dark:from-red-950/30 dark:to-red-900/20 dark:shadow-red-950/50 dark:hover:border-red-800/60"
    : "border-emerald-200/60 bg-gradient-to-br from-emerald-50/80 to-emerald-100/40 shadow-emerald-100/50 hover:border-emerald-300/80 hover:shadow-emerald-200/60 dark:border-emerald-900/40 dark:from-emerald-950/30 dark:to-emerald-900/20 dark:shadow-emerald-950/50 dark:hover:border-emerald-800/60"

  const titleColor = isRed ? "text-red-900 dark:text-red-100" : "text-emerald-900 dark:text-emerald-100"
  const dotColor = isRed ? "bg-red-500 dark:bg-red-400" : "bg-emerald-500 dark:bg-emerald-400"
  const textColor = isRed ? "text-red-900/90 dark:text-red-100/90" : "text-emerald-900/90 dark:text-emerald-100/90"

  return (
    <div
      className={`group relative rounded-lg border-2 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${borderClasses}`}
    >
      <div className="mb-6">
        <div className="flex items-center gap-3">
          {Icon}
          <h3 className={`text-2xl font-bold ${titleColor}`}>{labelText}</h3>
        </div>
      </div>

      <div>
        <ul className="space-y-4">
          {listItems.map((item, index) => (
            <li key={index} className="flex items-start gap-3">
              <div className={`mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full ${dotColor}`} />
              <span className={`text-base leading-relaxed ${textColor}`}>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
