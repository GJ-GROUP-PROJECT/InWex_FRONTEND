import { api } from "@/lib/api"
import { Staff } from "@/lib/types/types"
import { createContext, useCallback, useContext, useEffect, useState } from "react"
import { useAuth } from "./AuthContext"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { AssignWarehouseValues } from "@/lib/schemas/staff/assignWarehouse.schema"

export type StaffContextType = {
    staffs: Staff[]
    isLoading: boolean
    error: string | null
    fetchStaff: (showLoading?: boolean) => Promise<void>
    fetchStaffBySearch: (query: string, showLoading?: boolean) => Promise<void>
    assignWarehouse: (payload: AssignWarehouseValues) => Promise<void>
    updateStaff: (staffId: number) => Promise<void>
    deleteStaff: (staffId: number) => Promise<void>
}

export const StaffContext = createContext<StaffContextType | undefined>(undefined)

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
        }
        catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred")
        }
        finally {
            if (showLoading) setIsLoading(false)
        }
    }, [])

    const fetchStaffBySearch = useCallback(async (query: string, showLoading = true) => {
        if (showLoading) setIsLoading(true)
        setError(null)

        try {
            const res = await api.get(`api/warehouse/staff-search?name=${query}`)
            setStaffs(res.data)
        }
        catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred")
        }
        finally {
            if (showLoading) setIsLoading(false)
        }
    }, [])

    useEffect(() => {
        if (!user) {
            setStaffs([])
            setError(null)
        }
    }, [user])

    const assignWarehouse = useCallback(async (payload: AssignWarehouseValues) => {
        try {
            await api.post('warehouse/warehouse-staff', payload)
            await fetchStaff(false)
            toast.success("Warehouse assigned successfully")
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Failed to assign warehouse")
        }
    }, [fetchStaff])

    const updateStaff = useCallback(async (staffId: number) => {
        try {
            await api.put(`warehouse/warehouse/${staffId}`)
            await fetchStaff(true)
            toast.success("Warehouse updated successfully")
            router.push("/dashboard/warehouses")
        }
        catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred")
        }
    }, [fetchStaff, router])

    const deleteStaff = useCallback(async (staffId: number) => {
        try {
            await api.delete(`/warehouse/warehouse/${staffId}`)
            await fetchStaff(true)
            toast.success("Warehouse deleted successfully")
            router.push("/dashboard/warehouses")
        }
        catch (err) {
            toast.error(err instanceof Error ? err.message : "Failed to delete warehouse")
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