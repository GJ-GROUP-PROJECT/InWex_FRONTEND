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
    selectedStaff: Staff | null
    isLoading: boolean
    error: string | null
    fetchStaffs: (showLoading?: boolean) => Promise<void>
    fetchStaff: (staffId: number, showLoading?: boolean) => Promise<void>
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
    const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const { user } = useAuth()
    const router = useRouter()

    const fetchStaffs = useCallback(async (showLoading = true) => {
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

    const fetchStaff = useCallback(async (staffId: number, showLoading = true) => {
        if (showLoading) setIsLoading(true)
        setError(null)
        try {
            const res = await api.get(`api/warehouse/get-staff-detail-for-warehouse?staff=${staffId}`)
            const data = Array.isArray(res.data) ? res.data[0] : res.data
            setSelectedStaff(data ?? null)
        } catch (err) {
            setError(extractErrorMessage(err, "Failed to fetch staff details"))
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
            setSelectedStaff(null)
            setError(null)
        }
    }, [user])

    const assignWarehouse = useCallback(async (payload: AssignWarehouseValues, assignmentId?: number) => {
        if (assignmentId) {
            await api.put(`warehouse/warehouse-staff/${assignmentId}`, payload)
        } else {
            await api.post('warehouse/warehouse-staff', payload)
        }
        toast.success("Warehouse assigned successfully")
    }, [])

    const assignRole = useCallback(async (staffId: number, payload: AssignRoleValues) => {
        await api.patch(`accounts/assign-role/${staffId}`, payload)
        toast.success("Role updated successfully")
    }, [])

    const updateStaff = useCallback(async (staffId: number) => {
        try {
            await api.post(`warehouse/warehouse-staff/${staffId}`)
            await fetchStaffs(true)
            toast.success("Staff updated successfully")
            router.push("/dashboard/staff")
        } catch (err) {
            setError(extractErrorMessage(err, "Failed to update staff"))
            toast.error(extractErrorMessage(err, "Failed to update staff"))
        }
    }, [fetchStaffs, router])

    const deleteStaff = useCallback(async (staffId: number) => {
        try {
            await api.delete(`accounts/appoint-staff/${staffId}`)
            toast.success("Staff deleted successfully")
        } catch (err) {
            toast.error(extractErrorMessage(err, "Failed to delete staff"))
        }
    }, [])

    return (
        <StaffContext.Provider
            value={{
                staffs,
                selectedStaff,
                isLoading,
                error,
                fetchStaffs,
                fetchStaff,
                fetchStaffBySearch,
                assignWarehouse,
                assignRole,
                updateStaff,
                deleteStaff,
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