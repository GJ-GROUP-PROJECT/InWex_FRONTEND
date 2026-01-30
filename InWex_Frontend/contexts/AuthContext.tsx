"use client"

import { Roles, UserData } from "@/lib/types"
import { useRouter } from "next/navigation"
import { createContext, useCallback, useContext, useState } from "react"

type AuthContextType = {
    user: UserData | null
    role: Roles | null
    isLoading: boolean
    logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const getUserFromStorage = (): UserData | null => {
    if (typeof window === "undefined") return null

    try {
        const stored = localStorage.getItem("UserData")
        return stored ? JSON.parse(stored) : null
    } catch (error) {
        console.error("Error parsing user data:", error)
        return null
    }
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<UserData | null>(getUserFromStorage)
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const logout = useCallback(() => {
        localStorage.removeItem("UserData")
        setUser(null)
        router.push("/login")
    }, [router])

    return (
        <AuthContext.Provider
            value={{
                user,
                role: user?.roles || null,
                isLoading,
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