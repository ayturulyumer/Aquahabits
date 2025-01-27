import DashboardShell from "../../components/DashboardShell/DashboardShell.jsx"
import DashboardHeader from "../../components/DashboardHeader/DashboardHeader.jsx"
import { Outlet } from "react-router-dom"

export default function Dashboard() {
    return (
        <DashboardShell >
            <DashboardHeader />
            <Outlet />
        </DashboardShell>
    )
}
