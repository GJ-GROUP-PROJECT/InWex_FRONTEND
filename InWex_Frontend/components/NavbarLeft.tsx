"use client"

import { useEffect, useState } from "react"
import { createPortal } from "react-dom"

interface NavbarLeftProps {
    children: React.ReactNode
}

export const NavbarLeft = ({ children }: NavbarLeftProps) => {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    const container = document.getElementById("navbar-left")

    return container ? createPortal(children, container) : null
}