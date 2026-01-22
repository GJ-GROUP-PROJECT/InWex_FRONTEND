import ManagerDashboard from "./(manager)/ManagerDashboard"
import StaffDashboard from "./(staff)/StaffDashboard"

const DashboardPage = async () => {
    const role = "manager"

    if (role === "manager") {
        return <ManagerDashboard />
    }

    return <StaffDashboard />
}

export default DashboardPage
