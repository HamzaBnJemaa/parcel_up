"use client"

import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !headerRef.current || !contentRef.current) return

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

      // Content fade in
      gsap.from(contentRef.current, {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="contact" className="relative py-32 pl-6 md:pl-28 pr-6 md:pr-12">
      {/* Section header */}
      <div ref={headerRef} className="mb-24">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">05 / Contact</span>
        <h2 className="mt-4 font-[var(--font-bebas)] text-5xl md:text-7xl tracking-tight">GET IN TOUCH</h2>
      </div>

      {/* Contact content */}
      <div ref={contentRef} className="grid md:grid-cols-2 gap-16 max-w-5xl">
        {/* Left column - Contact info */}
        <div className="space-y-12">
          <div>
            <h3 className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-4">Email</h3>
            <a
              href="mailto:hello@parcelup.com"
              className="font-[var(--font-bebas)] text-3xl md:text-4xl tracking-tight hover:text-accent transition-colors duration-300"
            >
              hello@parcelup.com
            </a>
          </div>

          <div>
            <h3 className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-4">Phone</h3>
            <a
              href="tel:+1234567890"
              className="font-[var(--font-bebas)] text-3xl md:text-4xl tracking-tight hover:text-accent transition-colors duration-300"
            >
              +1 (234) 567-890
            </a>
          </div>

          <div>
            <h3 className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-4">Location</h3>
            <p className="font-mono text-sm leading-relaxed">
              123 Design Street
              <br />
              Studio 45B
              <br />
              San Francisco, CA 94102
            </p>
          </div>
        </div>

        {/* Right column - Message */}
        <div className="space-y-6">
          <p className="font-mono text-sm text-muted-foreground leading-relaxed">
            Have a project in mind? We'd love to hear about it. Whether you're looking for brand identity, digital
            products, or strategic design consultation, we're here to help bring your vision to life.
          </p>
          <p className="font-mono text-sm text-muted-foreground leading-relaxed">
            Drop us a message and we'll get back to you within 24 hours.
          </p>

          {/* Decorative element */}
          <div className="pt-8">
            <div className="h-[1px] bg-accent w-24" />
          </div>
        </div>
      </div>
    </section>
  )
}
