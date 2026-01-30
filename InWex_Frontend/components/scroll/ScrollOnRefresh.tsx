"use client"

import { useEffect } from "react"

export default function ScrollOnRefresh() {
    useEffect(() => {
        const hash = window.location.hash
        if (!hash) return

        const target = document.querySelector(hash)
        if (!target) return

        setTimeout(() => {
            target.scrollIntoView({
                behavior: "smooth",
                block: "start",
            })
        }, 100)
    }, [])

    return null
}