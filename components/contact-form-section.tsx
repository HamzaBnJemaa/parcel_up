"use client"

import { useRef, useEffect, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

gsap.registerPlugin(ScrollTrigger)

export function ContactFormSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLDivElement>(null)

  const [name, setName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [subject, setSubject] = useState<string>("")
  const [message, setMessage] = useState<string>("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (!sectionRef.current || !headerRef.current || !formRef.current) return

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

      // Form fade in
      gsap.from(formRef.current, {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: formRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name || !email || !subject || !message) {
      return
    }

    setIsSubmitting(true)

    // TODO: Replace with your email service or API endpoint
    // For now, this creates a mailto link which the user can configure
    // You can integrate with services like FormSpree, SendGrid, or create an API route
    try {
      // Example: Create mailto link (browser will open email client)
      const mailtoLink = `mailto:parcelup@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
      )}`
      
      // Option 1: Open mailto (works but requires user's email client)
      // window.location.href = mailtoLink

      // Option 2: Store in localStorage for now (replace with API call)
      const formData = {
        name,
        email,
        subject,
        message,
        timestamp: new Date().toISOString(),
      }

      // Store submissions (you can replace this with an API call)
      if (typeof window !== "undefined") {
        const existingSubmissions = localStorage.getItem("contact-submissions")
        const submissions = existingSubmissions ? JSON.parse(existingSubmissions) : []
        submissions.push(formData)
        localStorage.setItem("contact-submissions", JSON.stringify(submissions))
      }

      // Reset form
      setName("")
      setEmail("")
      setSubject("")
      setMessage("")
      setIsSubmitted(true)

      setTimeout(() => setIsSubmitted(false), 5000)
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section ref={sectionRef} id="contact-form" className="relative py-32 pl-6 md:pl-28 pr-6 md:pr-12">
      {/* Section header */}
      <div ref={headerRef} className="mb-24">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">08 / Contact</span>
        <h2 className="mt-4 font-[var(--font-bebas)] text-5xl md:text-7xl tracking-tight">GET IN TOUCH</h2>
      </div>

      {/* Contact Form */}
      <div ref={formRef} className="max-w-3xl">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Name and Email Row */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="contact-name" className="font-mono text-xs text-muted-foreground">
                Name
              </Label>
              <Input
                id="contact-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="font-mono"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-email" className="font-mono text-xs text-muted-foreground">
                Email
              </Label>
              <Input
                id="contact-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                className="font-mono"
                required
              />
            </div>
          </div>

          {/* Subject */}
          <div className="space-y-2">
            <Label htmlFor="contact-subject" className="font-mono text-xs text-muted-foreground">
              Subject
            </Label>
            <Input
              id="contact-subject"
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="What is this about?"
              className="font-mono"
              required
            />
          </div>

          {/* Message */}
          <div className="space-y-2">
            <Label htmlFor="contact-message" className="font-mono text-xs text-muted-foreground">
              Message
            </Label>
            <Textarea
              id="contact-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell us what you'd like to discuss..."
              className="font-mono min-h-32 resize-none"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <Button
              type="submit"
              disabled={!name || !email || !subject || !message || isSubmitting}
              className="font-mono text-xs uppercase tracking-[0.3em] px-8 py-6 h-auto rounded-none border border-accent bg-transparent text-accent hover:bg-accent hover:text-accent-foreground transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "SENDING..." : isSubmitted ? "MESSAGE SENT" : "SEND MESSAGE"}
            </Button>
            {isSubmitted && (
              <p className="mt-4 font-mono text-xs text-accent">
                Thank you! Your message has been sent. We'll get back to you soon.
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  )
}
