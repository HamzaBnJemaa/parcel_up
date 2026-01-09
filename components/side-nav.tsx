"use client"

import { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import { Menu, X, Home, Settings, UserCircle, UserRound   , MessageSquare, Calendar, Shield, Info } from "lucide-react"

const navItems = [
  { id: "hero", label: "Landing", icon: Home },
  { id: "services", label: "Services", icon: Settings },
  { id: "work", label: "Portfolio", icon: UserCircle }, // Changed from Briefcase to UserCircle
  { id: "team", label: "Team", icon: UserRound    },
  { id: "contact", label: "Contact", icon: MessageSquare },
  { id: "schedule", label: "Schedule", icon: Calendar },
  { id: "principles", label: "Controlled", icon: Shield },
  { id: "colophon", label: "Colophon", icon: Info },
]

export function SideNav() {
  const [activeSection, setActiveSection] = useState("hero")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [showScrollLabel, setShowScrollLabel] = useState(false)
  const [scrollLabelId, setScrollLabelId] = useState<string | null>(null)
  const scrollLabelTimerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const newSectionId = entry.target.id
            setActiveSection(newSectionId)
            
            // Only show scroll label if not hovering over any item
            if (!hoveredId) {
              setScrollLabelId(newSectionId)
              setShowScrollLabel(true)
              
              // Clear any existing timer
              if (scrollLabelTimerRef.current) {
                clearTimeout(scrollLabelTimerRef.current)
              }
              
              // Set timer to hide label after 3 seconds
              scrollLabelTimerRef.current = setTimeout(() => {
                setShowScrollLabel(false)
                setScrollLabelId(null)
              }, 3000)
            }
          }
        })
      },
      { threshold: 0.3 },
    )

    navItems.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => {
      observer.disconnect()
      if (scrollLabelTimerRef.current) {
        clearTimeout(scrollLabelTimerRef.current)
      }
    }
  }, [hoveredId])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setIsMobileMenuOpen(false)
      
      // Show scroll label for clicked section
      setScrollLabelId(id)
      setShowScrollLabel(true)
      
      // Clear any existing timer
      if (scrollLabelTimerRef.current) {
        clearTimeout(scrollLabelTimerRef.current)
      }
      
      // Set timer to hide label after 3 seconds
      scrollLabelTimerRef.current = setTimeout(() => {
        setShowScrollLabel(false)
        setScrollLabelId(null)
      }, 3000)
    }
  }

  const handleMouseEnter = (id: string) => {
    setHoveredId(id)
    // Hide scroll label when hovering
    setShowScrollLabel(false)
    if (scrollLabelTimerRef.current) {
      clearTimeout(scrollLabelTimerRef.current)
      scrollLabelTimerRef.current = null
    }
  }

  const handleMouseLeave = () => {
    setHoveredId(null)
  }

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="fixed left-0 top-0 z-50 h-screen w-16 md:w-20 hidden md:flex flex-col justify-center border-r border-border/30 bg-background/80 backdrop-blur-sm">
        <div className="flex flex-col gap-6 px-4">
          {navItems.map(({ id, label, icon: Icon }) => {
            const isActive = activeSection === id
            const isHovered = hoveredId === id
            const isScrollLabelShowing = showScrollLabel && scrollLabelId === id
            
            return (
              <button 
                key={id} 
                onClick={() => scrollToSection(id)}
                onMouseEnter={() => handleMouseEnter(id)}
                onMouseLeave={handleMouseLeave}
                className="group relative flex items-center gap-3"
              >
                <div className="relative flex items-center justify-center">
                  {/* Hover background effect */}
                  <div className={cn(
                    "absolute inset-0 rounded-md transition-all duration-300",
                    (isHovered || isActive) 
                      ? "bg-accent/10 scale-110" 
                      : "bg-transparent"
                  )} />
                  
                  {/* Icon container */}
                  <div className="relative z-10 p-2">
                    <Icon
                      size={20}
                      className={cn(
                        "transition-all duration-300",
                        isActive 
                          ? "text-accent scale-110" 
                          : "text-muted-foreground/60",
                        isHovered && "scale-110",
                        isHovered && !isActive && "text-foreground/80",
                        isScrollLabelShowing && "text-accent scale-110"
                      )}
                      strokeWidth={isActive || isHovered || isScrollLabelShowing ? 2 : 1.5}
                    />
                  </div>

                  {/* Active indicator line */}
                  <div
                    className={cn(
                      "absolute -right-1.5 top-1/2 h-0 w-0.5 -translate-y-1/2 rounded-full transition-all duration-300",
                      isActive 
                        ? "h-4 bg-accent" 
                        : "group-hover:h-2.5 group-hover:bg-foreground/40"
                    )}
                  />
                </div>

                {/* Label - shows on hover OR scroll trigger */}
                <span
                  className={cn(
                    "absolute left-10 font-mono text-xs font-medium uppercase tracking-wider transition-all duration-200 pointer-events-none z-50",
                    // Position and opacity
                    isHovered || isScrollLabelShowing
                      ? "opacity-100 left-12 bg-background/90 backdrop-blur-sm px-3 py-1.5 rounded-md border shadow-sm"
                      : "opacity-0 group-hover:opacity-100 group-hover:left-12",
                    // Colors
                    isActive || isScrollLabelShowing
                      ? "text-accent border-accent/20"
                      : "text-foreground border-border"
                  )}
                >
                  {label}
                </span>
              </button>
            )
          })}
        </div>
      </nav>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden fixed top-6 right-6 z-[60] w-12 h-12 flex items-center justify-center bg-background/90 backdrop-blur-sm border border-border/50 rounded-sm transition-all duration-200 hover:border-accent/50 hover:bg-accent/5"
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? (
          <X className="w-5 h-5 transition-transform duration-200 rotate-90" />
        ) : (
          <Menu className="w-5 h-5 transition-transform duration-200" />
        )}
      </button>

      {/* Mobile Navigation */}
      <div
        className={cn(
          "md:hidden fixed inset-y-0 right-0 z-50 w-64 bg-background/95 backdrop-blur-sm border-l border-border/30 transition-transform duration-300",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <nav className="flex flex-col gap-1 p-6 pt-24">
          {navItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              className={cn(
                "group relative flex items-center gap-4 p-3 rounded-lg transition-all duration-200",
                activeSection === id 
                  ? "bg-accent/10 text-accent border border-accent/20" 
                  : "text-muted-foreground hover:text-foreground hover:bg-accent/5",
              )}
            >
              <div className="relative">
                <Icon
                  size={18}
                  className={cn(
                    "transition-all duration-200",
                    activeSection === id && "scale-110"
                  )}
                  strokeWidth={activeSection === id ? 2 : 1.5}
                />
                {activeSection === id && (
                  <div className="absolute -right-1 -top-1 h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                )}
              </div>
              <span className="font-mono text-sm uppercase tracking-widest flex-1 text-left">
                {label}
              </span>
              {activeSection === id && (
                <div className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-background/50 backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  )
}