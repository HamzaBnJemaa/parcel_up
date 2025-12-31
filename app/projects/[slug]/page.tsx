import { notFound } from "next/navigation"
import { projects } from "@/lib/projects"
import { ProjectDetail } from "@/components/project-detail"

// Enable dynamic route segment
export const dynamicParams = true

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }))
}

export default async function ProjectPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> | { slug: string } 
}) {
  // Await params (Next.js 15+ uses Promise, Next.js 14 uses direct object)
  const resolvedParams = await Promise.resolve(params)
  const project = projects.find((p) => p.slug === resolvedParams.slug)

  if (!project) {
    notFound()
  }

  return <ProjectDetail project={project} />
}

