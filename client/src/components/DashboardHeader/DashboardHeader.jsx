

function DashboardHeader({ toggleSidebar }) {
  return (
    <header className="flex items-center justify-between px-4 py-4 border-b border-accent">
      <div className="flex items-center">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-md hover:bg-primary hover:text-secondary focus:outline-none focus:ring focus:ring-primary transition-colors duration-200"
          aria-label="Toggle Sidebar"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <h1 className="ml-4 text-2xl font-bold ">Habitect</h1>
      </div>
      <div className="flex items-center space-x-4">
        <span className="text-sm font-medium">Welcome, Hero!</span>
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success text-neutral">
          Level 5
        </span>
      </div>
    </header>
  );
}

export default DashboardHeader;

