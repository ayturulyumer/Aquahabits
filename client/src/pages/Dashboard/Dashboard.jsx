import DashboardShell from "../../components/DashboardShell/DashboardShell.jsx"
import DashboardHeader from "../../components/DashboardHeader/DashboardHeader.jsx"
import DashboardContent from "../../components/DashboardContent/DashboardContent.jsx"
import { Outlet } from "react-router-dom"

export default function Dashboard() {
    return (
        <DashboardShell>
            <DashboardHeader />
            {/* <DashboardContent /> */}
            <Outlet />
        </DashboardShell>
    )
}
