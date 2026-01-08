"use client"

import { useRef, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { format } from "date-fns"
import { SideNav } from "@/components/side-nav"

gsap.registerPlugin(ScrollTrigger)

interface Booking {
  id: string
  name: string
  phone: string
  email: string
  date: Date
  hour: string
  minute: string
  createdAt: Date
}

export default function SchedulePage() {
  const router = useRouter()
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLDivElement>(null)
  
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [hour, setHour] = useState<string>("")
  const [minute, setMinute] = useState<string>("00")
  const [name, setName] = useState<string>("")
  const [phone, setPhone] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [bookings, setBookings] = useState<Booking[]>([])
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Load bookings from localStorage on mount
  useEffect(() => {
    if (typeof window === "undefined") return
    
    const stored = localStorage.getItem("schedule-bookings")
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        setBookings(
          parsed.map((b: any) => ({
            ...b,
            date: new Date(b.date),
            createdAt: new Date(b.createdAt),
          }))
        )
      } catch (e) {
        console.error("Error loading bookings:", e)
      }
    }
  }, [])

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

  // Generate hours (9:00 AM to 6:00 PM)
  const hours = Array.from({ length: 10 }, (_, i) => {
    const hourNum = i + 9
    return hourNum.toString().padStart(2, "0")
  })

  const minutes = ["00", "15", "30", "45"]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedDate || !hour || !name || !phone || !email) {
      return
    }

    const newBooking: Booking = {
      id: Date.now().toString(),
      name,
      phone,
      email,
      date: selectedDate,
      hour,
      minute,
      createdAt: new Date(),
    }

    const updatedBookings = [...bookings, newBooking]
    setBookings(updatedBookings)
    
    // Save to localStorage with proper date serialization
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "schedule-bookings",
        JSON.stringify(
          updatedBookings.map((b) => ({
            ...b,
            date: b.date.toISOString(),
            createdAt: b.createdAt.toISOString(),
          }))
        )
      )
    }

    // Reset form
    setSelectedDate(undefined)
    setHour("")
    setMinute("00")
    setName("")
    setPhone("")
    setEmail("")
    setIsSubmitted(true)

    setTimeout(() => {
      setIsSubmitted(false)
      router.push("/")
    }, 3000)
  }

  // Disable past dates
  const disabledDates = (date: Date) => {
    return date < new Date(new Date().setHours(0, 0, 0, 0))
  }

  return (
    <main className="relative min-h-screen">
      <SideNav />
      <div className="grid-bg fixed inset-0 opacity-30" aria-hidden="true" />
      
      <section ref={sectionRef} id="schedule" className="relative z-10 py-32 pl-6 md:pl-28 pr-6 md:pr-12">
        {/* Section header */}
        <div ref={headerRef} className="mb-24">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">06 / Schedule</span>
          <h2 className="mt-4 font-[var(--font-bebas)] text-5xl md:text-7xl tracking-tight">BOOK AN APPOINTMENT</h2>
        </div>

        {/* Booking form */}
        <div ref={formRef} className="max-w-5xl">
          <form onSubmit={handleSubmit} className="space-y-12">
            {/* Date and Time Selection */}
            <div className="grid md:grid-cols-2 gap-12">
              {/* Calendar */}
              <div className="space-y-6">
                <div>
                  <Label htmlFor="date" className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-4 block">
                    Select Date
                  </Label>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={disabledDates}
                    className="rounded-md border border-border"
                  />
                  {selectedDate && (
                    <p className="mt-4 font-mono text-xs text-muted-foreground">
                      Selected: {format(selectedDate, "EEEE, MMMM d, yyyy")}
                    </p>
                  )}
                </div>
              </div>

              {/* Time Selection */}
              <div className="space-y-6">
                <div>
                  <Label htmlFor="hour" className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-4 block">
                    Select Time
                  </Label>
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <Select value={hour} onValueChange={setHour}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Hour" />
                        </SelectTrigger>
                        <SelectContent>
                          {hours.map((h) => (
                            <SelectItem key={h} value={h}>
                              {h}:00
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex-1">
                      <Select value={minute} onValueChange={setMinute}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Minute" />
                        </SelectTrigger>
                        <SelectContent>
                          {minutes.map((m) => (
                            <SelectItem key={m} value={m}>
                              {m}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  {hour && (
                    <p className="mt-4 font-mono text-xs text-muted-foreground">
                      Time: {hour}:{minute}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Client Information */}
            <div className="space-y-6">
              <Label className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground block mb-6">
                Client Information
              </Label>
              <div className="grid md:grid-cols-1 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="font-mono text-xs text-muted-foreground">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    className="font-mono"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="font-mono text-xs text-muted-foreground">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter your phone number"
                    className="font-mono"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="font-mono text-xs text-muted-foreground">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="font-mono"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <Button
                type="submit"
                disabled={!selectedDate || !hour || !name || !phone || !email}
                className="font-mono text-xs uppercase tracking-[0.3em] px-8 py-6 h-auto rounded-none border border-accent bg-transparent text-accent hover:bg-accent hover:text-accent-foreground transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitted ? "APPOINTMENT BOOKED" : "BOOK APPOINTMENT"}
              </Button>
              {isSubmitted && (
                <p className="mt-4 font-mono text-xs text-accent">
                  Your appointment has been successfully scheduled!
                </p>
              )}
            </div>
          </form>

          {/* Note */}
          <div className="mt-12 max-w-2xl">
            <p className="font-mono text-xs text-muted-foreground leading-relaxed">
              All times are in PST (Pacific Standard Time). Please ensure all information is correct before submitting.
              You will receive a confirmation email shortly.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
