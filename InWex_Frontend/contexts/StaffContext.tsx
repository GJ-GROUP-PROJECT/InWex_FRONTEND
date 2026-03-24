import { api } from "@/lib/api"
import { Staff } from "@/lib/types/types"
import { createContext, useCallback, useContext, useEffect, useState } from "react"
import { useAuth } from "./AuthContext"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { AssignWarehouseValues } from "@/lib/schemas/staff/assignWarehouse.schema"
import axios from "axios"

export type AssignRoleValues = {
    is_manager: boolean
    is_warehouse_staff: boolean
    is_active: boolean
}

export type StaffContextType = {
    staffs: Staff[]
    isLoading: boolean
    error: string | null
    fetchStaff: (showLoading?: boolean) => Promise<void>
    fetchStaffBySearch: (query: string, showLoading?: boolean) => Promise<void>
    assignWarehouse: (payload: AssignWarehouseValues, assignmentId?: number) => Promise<void>
    assignRole: (staffId: number, payload: AssignRoleValues) => Promise<void>
    updateStaff: (staffId: number) => Promise<void>
    deleteStaff: (staffId: number) => Promise<void>
}

export const StaffContext = createContext<StaffContextType | undefined>(undefined)

const extractErrorMessage = (err: unknown, fallback: string): string => {
    if (axios.isAxiosError(err)) {
        const data = err.response?.data
        return Array.isArray(data)
            ? data[0]
            : data?.detail ?? data?.[0] ?? fallback
    }
    return fallback
}

export const StaffProvider = ({ children }: { children: React.ReactNode }) => {
    const [staffs, setStaffs] = useState<Staff[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const { user } = useAuth()
    const router = useRouter()

    const fetchStaff = useCallback(async (showLoading = true) => {
        if (showLoading) setIsLoading(true)
        setError(null)
        try {
            const res = await api.get('api/warehouse/get-staff')
            setStaffs(res.data)
        } catch (err) {
            setError(extractErrorMessage(err, "Failed to fetch staff"))
        } finally {
            if (showLoading) setIsLoading(false)
        }
    }, [])

    const fetchStaffBySearch = useCallback(async (query: string, showLoading = true) => {
        if (showLoading) setIsLoading(true)
        setError(null)
        try {
            const res = await api.get(`api/warehouse/staff-search?name=${query}`)
            setStaffs(res.data)
        } catch (err) {
            setError(extractErrorMessage(err, "Failed to search staff"))
        } finally {
            if (showLoading) setIsLoading(false)
        }
    }, [])

    useEffect(() => {
        if (!user) {
            setStaffs([])
            setError(null)
        }
    }, [user])

    const assignWarehouse = useCallback(async (payload: AssignWarehouseValues, assignmentId?: number) => {
        try {
            if (assignmentId) {
                await api.put(`warehouse/warehouse-staff/${assignmentId}`, payload)
            } else {
                await api.post('warehouse/warehouse-staff', payload)
            }
            await fetchStaff(false)
            toast.success("Warehouse assigned successfully")
        } catch (err) {
            toast.error(extractErrorMessage(err, "Failed to assign warehouse"))
        }
    }, [fetchStaff])

    const assignRole = useCallback(async (staffId: number, payload: AssignRoleValues) => {
        try {
            await api.patch(`accounts/assign-role/${staffId}`, payload)
            await fetchStaff(false)
            toast.success("Role updated successfully")
        } catch (err) {
            toast.error(extractErrorMessage(err, "Failed to update role"))
        }
    }, [fetchStaff])

    const updateStaff = useCallback(async (staffId: number) => {
        try {
            await api.post(`warehouse/warehouse-staff/${staffId}`)
            await fetchStaff(true)
            toast.success("Staff updated successfully")
            router.push("/dashboard/staff")
        } catch (err) {
            setError(extractErrorMessage(err, "Failed to update staff"))
            toast.error(extractErrorMessage(err, "Failed to update staff"))
        }
    }, [fetchStaff, router])

    const deleteStaff = useCallback(async (staffId: number) => {
        try {
            await api.delete(`accounts/appoint-staff/${staffId}`)
            await fetchStaff(true)
            toast.success("Staff deleted successfully")
            router.push("/dashboard/staff")
        } catch (err) {
            toast.error(extractErrorMessage(err, "Failed to delete staff"))
        }
    }, [fetchStaff, router])

    return (
        <StaffContext.Provider
            value={{
                staffs,
                isLoading,
                error,
                fetchStaff,
                fetchStaffBySearch,
                assignWarehouse,
                assignRole,
                updateStaff,
                deleteStaff
            }}
        >
            {children}
        </StaffContext.Provider>
    )
}

export const useStaff = () => {
    const context = useContext(StaffContext)
    if (!context) throw new Error("useStaff must be used within StaffProvider")
    return context
}