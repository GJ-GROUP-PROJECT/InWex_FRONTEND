import { api } from "@/lib/api"
import { Staff } from "@/lib/types/types"
import { createContext, useCallback, useContext, useEffect, useState } from "react"
import { useAuth } from "./AuthContext"

export type StaffContextType = {
    staffs: Staff[]
    isLoading: boolean
    error: string | null
    fetchStaff: (showLoading?: boolean) => Promise<void>
    fetchStaffBySearch: (query: string, showLoading?: boolean) => Promise<void>
}

export const StaffContext = createContext<StaffContextType | undefined>(undefined)

export const StaffProvider = ({ children }: { children: React.ReactNode }) => {
    const [staffs, setStaffs] = useState<Staff[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const { user } = useAuth()

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

    return (
        <StaffContext.Provider
            value={{
                staffs,
                isLoading,
                error,
                fetchStaff,
                fetchStaffBySearch,
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