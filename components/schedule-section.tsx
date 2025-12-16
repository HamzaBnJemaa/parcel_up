"use client"

import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const availability = [
  { day: "Monday", hours: "09:00 - 18:00", status: "available" },
  { day: "Tuesday", hours: "09:00 - 18:00", status: "available" },
  { day: "Wednesday", hours: "09:00 - 18:00", status: "available" },
  { day: "Thursday", hours: "09:00 - 18:00", status: "available" },
  { day: "Friday", hours: "09:00 - 17:00", status: "available" },
  { day: "Saturday", hours: "Closed", status: "unavailable" },
  { day: "Sunday", hours: "Closed", status: "unavailable" },
]

export function ScheduleSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const scheduleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !headerRef.current || !scheduleRef.current) return

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

      // Schedule items stagger in
      const items = scheduleRef.current?.querySelectorAll(".schedule-item")
      gsap.from(items, {
        x: -40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: scheduleRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="schedule" className="relative py-32 pl-6 md:pl-28 pr-6 md:pr-12">
      {/* Section header */}
      <div ref={headerRef} className="mb-24">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">06 / Schedule</span>
        <h2 className="mt-4 font-[var(--font-bebas)] text-5xl md:text-7xl tracking-tight">WHEN WE'RE AVAILABLE</h2>
      </div>

      {/* Schedule list */}
      <div ref={scheduleRef} className="max-w-3xl space-y-1">
        {availability.map((item, index) => (
          <div
            key={index}
            className="schedule-item group flex items-center justify-between py-6 border-b border-border/30 transition-colors duration-300 hover:border-accent/50"
          >
            <div className="flex items-baseline gap-6">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground w-8">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="font-[var(--font-bebas)] text-2xl md:text-3xl tracking-tight group-hover:text-accent transition-colors duration-300">
                {item.day}
              </h3>
            </div>

            <div className="flex items-center gap-4">
              <span
                className={`font-mono text-sm ${
                  item.status === "available" ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {item.hours}
              </span>
              <div
                className={`w-2 h-2 rounded-full ${
                  item.status === "available" ? "bg-accent" : "bg-muted-foreground/30"
                }`}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Note */}
      <div className="mt-12 max-w-2xl">
        <p className="font-mono text-xs text-muted-foreground leading-relaxed">
          All times are in PST (Pacific Standard Time). For urgent inquiries outside business hours, please email us and
          we'll respond as soon as possible.
        </p>
      </div>
    </section>
  )
}
