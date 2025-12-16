"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Menu, X } from "lucide-react"

const navItems = [
  { id: "hero", label: "Index" },
  { id: "services", label: "Services" },
  { id: "work", label: "Portfolio" },
  { id: "team", label: "Team" },
  { id: "contact", label: "Contact" },
  { id: "schedule", label: "Schedule" },
  { id: "principles", label: "Controlled" },
  { id: "colophon", label: "Colophon" },
]

export function SideNav() {
  const [activeSection, setActiveSection] = useState("hero")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.3 },
    )

    navItems.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setIsMobileMenuOpen(false)
    }
  }

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="fixed left-0 top-0 z-50 h-screen w-16 md:w-20 hidden md:flex flex-col justify-center border-r border-border/30 bg-background/80 backdrop-blur-sm">
        <div className="flex flex-col gap-6 px-4">
          {navItems.map(({ id, label }) => (
            <button key={id} onClick={() => scrollToSection(id)} className="group relative flex items-center gap-3">
              <span
                className={cn(
                  "h-1.5 w-1.5 rounded-full transition-all duration-300",
                  activeSection === id ? "bg-accent scale-125" : "bg-muted-foreground/40 group-hover:bg-foreground/60",
                )}
              />
              <span
                className={cn(
                  "absolute left-6 font-mono text-[10px] uppercase tracking-widest opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:left-8 whitespace-nowrap",
                  activeSection === id ? "text-accent" : "text-muted-foreground",
                )}
              >
                {label}
              </span>
            </button>
          ))}
        </div>
      </nav>

      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden fixed top-6 right-6 z-[60] w-12 h-12 flex items-center justify-center bg-background/90 backdrop-blur-sm border border-border/50 rounded-sm"
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      <div
        className={cn(
          "md:hidden fixed inset-y-0 right-0 z-50 w-64 bg-background/95 backdrop-blur-sm border-l border-border/30 transition-transform duration-300",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <nav className="flex flex-col gap-2 p-8 pt-24">
          {navItems.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              className={cn(
                "group relative flex items-center gap-4 p-3 transition-colors duration-200",
                activeSection === id ? "text-accent" : "text-muted-foreground hover:text-foreground",
              )}
            >
              <span
                className={cn(
                  "h-1.5 w-1.5 rounded-full transition-all duration-300",
                  activeSection === id ? "bg-accent scale-125" : "bg-muted-foreground/40",
                )}
              />
              <span className="font-mono text-xs uppercase tracking-widest">{label}</span>
            </button>
          ))}
        </nav>
      </div>

      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-background/50 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  )
}
