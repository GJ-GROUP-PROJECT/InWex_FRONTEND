import ManagerDashboard from "./(role)/(manager)/ManagerDashboard"
import StaffDashboard from "./(role)/(staff)/StaffDashboard"

const DashboardPage = async () => {
    const role = "manager"

    if (role === "manager") {
        return <ManagerDashboard />
    }

    return <StaffDashboard />
}

export default DashboardPage
