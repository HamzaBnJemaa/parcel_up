"use client"

import { useRef, useEffect } from "react"
import { cn } from "@/lib/utils"
import gsap from "gsap"

export function GlobalCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!cursorRef.current) return

    const cursor = cursorRef.current

    const handleMouseMove = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: "power3.out",
      })
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <div
      ref={cursorRef}
      className={cn(
        "pointer-events-none fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 z-50",
        "w-12 h-12 rounded-full border-2 border-accent bg-accent",
      )}
    />
  )
}
