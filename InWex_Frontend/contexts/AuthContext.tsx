"use client"

import { api } from "@/lib/api"
import { LoginValues } from "@/lib/schemas/validation/login.schema"
import { Roles, UserData } from "@/lib/types/types"
import axios from "axios"
import { useRouter } from "next/navigation"
import { createContext, useCallback, useContext, useState, useEffect } from "react"
import { toast } from "sonner"

type AuthContextType = {
    user: UserData | null
    role: Roles | null
    isLoading: boolean
    login: (data: LoginValues) => Promise<void>
    logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<UserData | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        try {
            const stored = localStorage.getItem("UserData")
            if (stored) {
                setUser(JSON.parse(stored))
            }
        } catch (error) {
            console.error("Error parsing user data:", error)
        } finally {
            setIsLoading(false)
        }
    }, [])


    const login = useCallback(async (data: LoginValues) => {
        try {
            const res = await api.post("/accounts/login", data)
            toast.success("Login successful!")
            localStorage.setItem("UserData", JSON.stringify(res.data))
            localStorage.setItem("token", res.data.token)
            document.cookie = `token=${res.data.token}; path=/; max-age=${60 * 60 * 24 * 365 * 69};`
            setUser(res.data)
            router.push("/dashboard")
        }
        catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(
                    error.response?.data?.non_field_errors?.[0] || "Login failed"
                )
            } else {
                toast.error("Something went wrong")
            }
        }
    }, [router])

    const logout = useCallback(async () => {
        try {
            await api.post("/accounts/logout")
        }
        catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.detail || "Logout Failed")
            }
            else {
                toast.error("Unexpected error occurred")
            }
        }
        finally {
            localStorage.removeItem("UserData")
            localStorage.removeItem("token")
            document.cookie = "token=; path=/; max-age=0"
            setUser(null)
            router.push("/auth")
        }
    }, [router])

    return (
        <AuthContext.Provider
            value={{
                user,
                role: user?.roles || null,
                isLoading,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}