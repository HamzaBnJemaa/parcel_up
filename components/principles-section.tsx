"use client"

import { useRef, useEffect } from "react"
import Image from "next/image"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

// Company logos - user will add their own logos later
const companies = [
  { name: "Company 1", logo: "/placeholder-logo.svg" },
  { name: "Company 2", logo: "/placeholder-logo.svg" },
  { name: "Company 3", logo: "/placeholder-logo.svg" },
  { name: "Company 4", logo: "/placeholder-logo.svg" },
  { name: "Company 5", logo: "/placeholder-logo.svg" },
  { name: "Company 6", logo: "/placeholder-logo.svg" },
]

// Duplicate array for seamless infinite scroll
const duplicatedCompanies = [...companies, ...companies]

export function PrinciplesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const marqueeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !headerRef.current) return

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
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // Infinite scroll animation
  useEffect(() => {
    if (!marqueeRef.current) return

    const marquee = marqueeRef.current
    let animation: gsap.core.Tween | null = null
    
    // Wait a tick for layout to settle
    const timeoutId = setTimeout(() => {
      // Calculate the width of one set of logos
      const children = Array.from(marquee.children) as HTMLElement[]
      if (children.length === 0) return

      const logoCount = companies.length
      let totalWidth = 0
      
      // Sum up width of first set (half the children)
      for (let i = 0; i < logoCount; i++) {
        const child = children[i]
        if (child) {
          totalWidth += child.offsetWidth
        }
      }
      
      // Add gap spacing (gap-16 = 4rem = 64px, gap-24 on md = 6rem = 96px)
      const gapWidth = typeof window !== "undefined" && window.innerWidth >= 768 ? 96 : 64
      totalWidth += gapWidth * (logoCount - 1)

      animation = gsap.to(marquee, {
        x: -totalWidth,
        duration: 30,
        ease: "none",
        repeat: -1,
      })
    }, 100)

    return () => {
      clearTimeout(timeoutId)
      if (animation) {
        animation.kill()
      }
    }
  }, [])

  return (
    <section ref={sectionRef} id="principles" className="relative py-32 pl-6 md:pl-28 pr-6 md:pr-12 overflow-hidden">
      {/* Section header */}
      <div ref={headerRef} className="mb-16">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">07 / Companies</span>
        <h2 className="mt-4 font-[var(--font-bebas)] text-5xl md:text-7xl tracking-tight">COMPANIES WE'VE WORKED WITH</h2>
      </div>

      {/* Moving logos marquee */}
      <div className="relative overflow-hidden">
        <div
          ref={marqueeRef}
          className="flex items-center gap-16 md:gap-24 will-change-transform"
          style={{ width: "fit-content" }}
        >
          {duplicatedCompanies.map((company, index) => (
            <div
              key={`${company.name}-${index}`}
              className="flex-shrink-0 opacity-60 hover:opacity-100 transition-opacity duration-300"
              style={{ width: "120px", height: "60px", position: "relative" }}
            >
              <Image
                src={company.logo}
                alt={company.name}
                fill
                className="object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                unoptimized
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
