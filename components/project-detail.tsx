"use client"

import { useRef, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { type Project } from "@/lib/projects"
import { SideNav } from "@/components/side-nav"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ExternalLink, Github, ArrowLeft } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

export function ProjectDetail({ project }: { project: Project }) {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !headerRef.current || !contentRef.current || !imageRef.current) return

    const ctx = gsap.context(() => {
      // Header slide in from left
      gsap.fromTo(
        headerRef.current,
        { x: -60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
        },
      )

      // Content fade in
      gsap.fromTo(
        contentRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          delay: 0.2,
        },
      )

      // Image fade in
      gsap.fromTo(
        imageRef.current,
        { scale: 1.05, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          delay: 0.4,
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <main className="relative min-h-screen">
      <SideNav />
      <div className="grid-bg fixed inset-0 opacity-30" aria-hidden="true" />
      
      <section ref={sectionRef} className="relative z-10 py-32 pl-6 md:pl-28 pr-6 md:pr-12">
        {/* Back button */}
        <div className="mb-12">
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-accent transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Portfolio
          </Link>
        </div>

        {/* Header */}
        <div ref={headerRef} className="mb-16">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
            {project.medium}
          </span>
          <h1 className="mt-4 font-[var(--font-bebas)] text-5xl md:text-7xl lg:text-8xl tracking-tight">
            {project.title}
          </h1>
        </div>

        {/* Image */}
        {project.image && (
          <div ref={imageRef} className="mb-16 relative w-full aspect-video overflow-hidden border border-border/40">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Content */}
        <div ref={contentRef} className="max-w-4xl">
          {/* Description */}
          <div className="mb-12">
            <p className="font-mono text-sm md:text-base text-muted-foreground leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-4">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "group inline-flex items-center gap-2 border border-border/40 px-6 py-3 font-mono text-xs uppercase tracking-widest text-foreground",
                  "hover:border-accent hover:text-accent transition-all duration-200"
                )}
              >
                <Github className="w-4 h-4" />
                GitHub
                <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              </a>
            )}
            {project.behance && (
              <a
                href={project.behance}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "group inline-flex items-center gap-2 border border-border/40 px-6 py-3 font-mono text-xs uppercase tracking-widest text-foreground",
                  "hover:border-accent hover:text-accent transition-all duration-200"
                )}
              >
                Behance
                <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              </a>
            )}
            {project.website && (
              <a
                href={project.website}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "group inline-flex items-center gap-2 border border-border/40 px-6 py-3 font-mono text-xs uppercase tracking-widest text-foreground",
                  "hover:border-accent hover:text-accent transition-all duration-200"
                )}
              >
                Website
                <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              </a>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}

