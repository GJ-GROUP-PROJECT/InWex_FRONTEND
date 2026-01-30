"use client"

import { useEffect } from "react"

export default function ScrollSpy() {
    useEffect(() => {
        const obs = (els: NodeListOf<Element>, cb: IntersectionObserverCallback, opts?: IntersectionObserverInit) => {
            const o = new IntersectionObserver(cb, opts)
            els.forEach(el => o.observe(el))
            return o
        }

        const sectionObs = obs(
            document.querySelectorAll("section[id]"),
            es => es.forEach(e => e.isIntersecting && history.replaceState(null, "", `#${e.target.id}`)),
            { threshold: 0.6 }
        )

        const top = document.getElementById("top")
        const topObs = top && obs(
            document.querySelectorAll("#top"),
            ([e]) => e.isIntersecting && history.replaceState(null, "", "/")
        )

        return () => {
            sectionObs.disconnect()
            topObs?.disconnect()
        }
    }, [])

    return null
}