"use client"

import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const teamMembers = [
  {
    name: "Alex Morgan",
    role: "Creative Director",
    image: "/creative-director-portrait.png",
  },
  {
    name: "Sarah Chen",
    role: "Lead Designer",
    image: "/professional-portrait-designer.jpg",
  },
  {
    name: "Marcus Rodriguez",
    role: "Senior Developer",
    image: "/professional-portrait-developer.png",
  },
  {
    name: "Emma Wilson",
    role: "Product Strategist",
    image: "/professional-portrait-strategist.jpg",
  },
  {
    name: "David Kim",
    role: "UX Researcher",
    image: "/professional-portrait-researcher.jpg",
  },
  {
    name: "Lisa Park",
    role: "Brand Manager",
    image: "/professional-portrait-manager.jpg",
  },
]

export function TeamSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !headerRef.current || !gridRef.current) return

    const ctx = gsap.context(() => {
      // Header slide in
      gsap.from(headerRef.current, {
        x: -60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      })

      // Team members fade in with stagger
      const members = gridRef.current?.querySelectorAll(".team-member")
      gsap.from(members, {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="team" className="relative py-32 pl-6 md:pl-28 pr-6 md:pr-12">
      {/* Section header */}
      <div ref={headerRef} className="mb-24">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">03 / Team</span>
        <h2 className="mt-4 font-[var(--font-bebas)] text-5xl md:text-7xl tracking-tight">WHO WE ARE</h2>
      </div>

      {/* Team grid */}
      <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16">
        {teamMembers.map((member, index) => (
          <article key={index} className="team-member group">
            {/* Image container */}
            <div className="relative aspect-square overflow-hidden bg-muted mb-6 border border-border/50">
              <img
                src={member.image || "/placeholder.svg"}
                alt={member.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Member info */}
            <div className="space-y-2">
              <h3 className="font-[var(--font-bebas)] text-2xl md:text-3xl tracking-tight group-hover:text-accent transition-colors duration-300">
                {member.name}
              </h3>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">{member.role}</p>
            </div>

            {/* Decorative line */}
            <div className="mt-4 h-[1px] bg-border w-12 group-hover:w-full transition-all duration-500" />
          </article>
        ))}
      </div>
    </section>
  )
}
