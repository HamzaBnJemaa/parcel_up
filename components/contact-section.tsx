"use client"

import { useRef, useEffect, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Mail, Phone, MapPin, Send, Sparkles } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (!sectionRef.current || !headerRef.current || !contentRef.current) return

    const ctx = gsap.context(() => {
      // Header animation
      gsap.from(".header-element", {
        x: -60,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.3,
      })

      // Content animation
      if (contentRef.current && contentRef.current.children) {
        gsap.from(contentRef.current.children, {
          y: 50,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.2,
          delay: 0.3,
        })
      }

      // Floating elements animation
      gsap.to(".floating-element", {
        y: -20,
        duration: 3.5,
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true,
      })

      // Background elements fade in
      gsap.from(".bg-element", {
        opacity: 0,
        scale: 0.8,
        duration: 1.5,
        ease: "power2.out",
        delay: 0.5,
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Success animation
    gsap.fromTo(
      ".success-message",
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.7)" }
    )
    
    // Reset form
    setFormData({ name: "", email: "", message: "" })
    setIsSubmitting(false)
    
    // Hide success message after 3 seconds
    setTimeout(() => {
      gsap.to(".success-message", {
        opacity: 0,
        scale: 0,
        duration: 0.3,
      })
    }, 3000)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <section 
      ref={sectionRef} 
      id="contact" 
      className="relative min-h-screen flex flex-col justify-center py-12 px-6 md:px-24 lg:px-32 overflow-hidden"
      style={{ height: '100vh', maxHeight: '100vh' }}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl bg-element" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/3 rounded-full blur-3xl bg-element" />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(90deg,_#000_1px,_transparent_1px),_linear-gradient(180deg,_#000_1px,_transparent_1px)] bg-[size:40px_40px]" />
      </div>

      {/* Floating decorative elements */}
      <div className="absolute top-20 right-20 w-4 h-4 bg-accent/30 rounded-full floating-element" />
      <div className="absolute bottom-32 left-10 w-6 h-6 border border-accent/20 rounded-full floating-element" />
      <div className="absolute top-40 left-1/4 w-3 h-3 bg-accent/20 rounded-full floating-element" />

      {/* Section header */}
      <div ref={headerRef} className="mb-16 md:mb-20">
        <div className="header-element flex items-center gap-3 mb-3">
          <Sparkles className="w-5 h-5 text-accent" />
          <span className="font-mono text-sm uppercase tracking-[0.4em] text-accent">05 / CONTACT</span>
        </div>
        <h1 className="font-[var(--font-bebas)] text-6xl md:text-8xl lg:text-9xl tracking-tight header-element leading-[0.85]">
          GET IN TOUCH
        </h1>
        <div className="header-element mt-6">
          <div className="h-1 w-24 bg-accent" />
          <p className="font-mono text-lg text-muted-foreground mt-4 max-w-2xl">
            Ready to bring your vision to life? Let's create something extraordinary together.
          </p>
        </div>
      </div>

      {/* Contact content - Better spaced layout */}
      <div ref={contentRef} className="grid md:grid-cols-2 gap-12 lg:gap-20 max-w-7xl w-full flex-grow">
        {/* Left column - Contact info */}
        <div className="space-y-12">
          <div className="group transition-all duration-500 hover:translate-x-2">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-accent/10 rounded-xl group-hover:bg-accent/20 transition-colors duration-300">
                <Mail className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">EMAIL US</h3>
                <a
                  href="mailto:parcelup@gmail.com"
                  className="font-[var(--font-bebas)] text-4xl md:text-5xl tracking-tight hover:text-accent transition-colors duration-300 block mt-2"
                >
                  parcelup@gmail.com
                </a>
              </div>
            </div>
          </div>

          <div className="group transition-all duration-500 hover:translate-x-2">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-accent/10 rounded-xl group-hover:bg-accent/20 transition-colors duration-300">
                <Phone className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">CALL US</h3>
                <a
                  href="tel:+1234567890"
                  className="font-[var(--font-bebas)] text-4xl md:text-5xl tracking-tight hover:text-accent transition-colors duration-300 block mt-2"
                >
                  +1 (234) 567-890
                </a>
              </div>
            </div>
          </div>

          <div className="group transition-all duration-500 hover:translate-x-2">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-accent/10 rounded-xl group-hover:bg-accent/20 transition-colors duration-300">
                <MapPin className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">VISIT US</h3>
                <p className="font-mono text-base leading-relaxed mt-2 text-accent/80">
                  123 Design Street<br />
                  Studio 45B<br />
                  San Francisco, CA 94102
                </p>
              </div>
            </div>
          </div>

          {/* Info box */}
          <div className="mt-8 p-6 bg-background/50 border border-muted-foreground/10 rounded-2xl backdrop-blur-sm">
            <h4 className="font-mono text-sm uppercase tracking-[0.2em] text-muted-foreground mb-3">QUICK RESPONSE</h4>
            <p className="font-mono text-base leading-relaxed">
              We respond within <span className="text-accent font-semibold">24 hours</span> on business days. 
              For urgent matters, please call directly.
            </p>
          </div>
        </div>

        {/* Right column - Contact form */}
        <div className="space-y-8">
          <div>
            <h2 className="font-[var(--font-bebas)] text-5xl md:text-6xl tracking-tight mb-6">SEND MESSAGE</h2>
            <p className="font-mono text-lg text-muted-foreground leading-relaxed mb-8 max-w-lg">
              Tell us about your project, your vision, or just say hello. We're excited to hear from you and 
              discuss how we can work together.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="group">
              <label htmlFor="name" className="font-mono text-sm uppercase tracking-[0.2em] text-muted-foreground block mb-4">
                YOUR NAME
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-0 py-4 bg-transparent border-0 border-b-2 border-muted-foreground/20 focus:border-accent focus:outline-none font-mono text-xl transition-all duration-300 placeholder:text-muted-foreground/40 text-accent"
                placeholder="John Doe"
              />
            </div>

            <div className="group">
              <label htmlFor="email" className="font-mono text-sm uppercase tracking-[0.2em] text-muted-foreground block mb-4">
                EMAIL ADDRESS
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-0 py-4 bg-transparent border-0 border-b-2 border-muted-foreground/20 focus:border-accent focus:outline-none font-mono text-xl transition-all duration-300 placeholder:text-muted-foreground/40 text-accent"
                placeholder="john@example.com"
              />
            </div>

            <div className="group">
              <label htmlFor="message" className="font-mono text-sm uppercase tracking-[0.2em] text-muted-foreground block mb-4">
                YOUR MESSAGE
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={4}
                className="w-full px-0 py-4 bg-transparent border-0 border-b-2 border-muted-foreground/20 focus:border-accent focus:outline-none font-mono text-xl transition-all duration-300 resize-none placeholder:text-muted-foreground/40 text-accent"
                placeholder="Tell us about your project..."
              />
            </div>

            {/* Enhanced Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative w-full px-8 py-5 bg-accent text-background font-mono text-base uppercase tracking-[0.3em] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 overflow-hidden rounded-lg hover:shadow-2xl hover:shadow-accent/30"
            >
              {/* Main button content */}
              <span className="relative z-10 flex items-center gap-3 transition-all duration-300 group-hover:text-accent group-hover:scale-105">
                {isSubmitting ? "SENDING..." : "SEND MESSAGE"}
                <Send className="w-5 h-5 transition-all duration-300 group-hover:rotate-45 group-hover:text-accent" />
              </span>
              
              {/* White overlay that slides in on hover */}
              <span className="absolute inset-0 bg-background transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              
              {/* Border overlay */}
              <span className="absolute inset-0 border-2 border-accent rounded-lg group-hover:border-background transition-colors duration-300" />
              
              {/* Glow effect */}
              <span className="absolute inset-0 bg-accent/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>

            {/* Success message */}
            <div className="success-message fixed md:absolute top-8 right-8 px-6 py-3 bg-green-500/90 text-white font-mono text-base rounded-xl shadow-2xl z-50 opacity-0 scale-0">
              ✨ Message sent successfully!
            </div>
          </form>

          {/* Quick contact links */}
          <div className="pt-8 border-t border-muted-foreground/10">
            <p className="font-mono text-sm uppercase tracking-[0.2em] text-muted-foreground mb-4">
              PREFER DIRECT CONTACT?
            </p>
            <div className="flex flex-wrap gap-6">
              <a
                href="mailto:parcelup@gmail.com"
                className="font-mono text-base text-accent hover:text-accent/70 transition-colors flex items-center gap-2"
              >
                <Mail className="w-4 h-4" />
                Email Directly
              </a>
              <a
                href="tel:+1234567890"
                className="font-mono text-base text-accent hover:text-accent/70 transition-colors flex items-center gap-2"
              >
                <Phone className="w-4 h-4" />
                Call Now
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer note */}
      <div className="mt-16 pt-8 border-t border-muted-foreground/10">
        <p className="font-mono text-sm uppercase tracking-[0.3em] text-muted-foreground text-center">
          LET'S CREATE SOMETHING AMAZING • CONTACT US TODAY
        </p>
      </div>
    </section>
  )
}