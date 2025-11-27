'use client'

import React, { useEffect, useRef } from 'react'
import { AppSidebar } from '@/components/template/app-sidebar.tsx'
import { SiteHeader } from '@/components/template/site-header.tsx'
import { SidebarInset, SidebarProvider } from '@workspace/ui/components/sidebar'
import { JobSidebar } from '@/components/job/JobSidebar'
import { JobCanvas } from '@/components/job/JobCanvas'
import { useJobStore } from '@/components/job/store'
import { postJob } from '../jobAPI'

// Debounce hook implementation
function useDebounce(effect: () => void, dependencies: any[], delay: number) {
  useEffect(() => {
    const handler = setTimeout(() => effect(), delay)
    return () => clearTimeout(handler)
  }, [...dependencies, delay]) // eslint-disable-line react-hooks/exhaustive-deps
}

export default function JobRegisterPage() {
  const { nodes, edges, saveJob, reset, setJobId, setJobInfo, jobName, jobDescription } = useJobStore()
  const initialized = useRef(false)

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true
      reset()
      postJob({ name: 'New Job' })
        .then((job) => {
          setJobId(job.id)
          setJobInfo(job.name, job.description || '')
        })
        .catch((err) => {
          console.error('Failed to create initial job', err)
        })
    }
  }, [reset, setJobId, setJobInfo])

  // Auto-save when nodes, edges, or job info changes (debounce 1000ms)
  useDebounce(
    () => {
      saveJob()
    },
    [nodes, edges, jobName, jobDescription],
    1000
  )

  return (
    <SidebarProvider
      style={
        {
          '--sidebar-width': 'calc(var(--spacing) * 72)',
          '--header-height': 'calc(var(--spacing) * 12)',
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex h-[calc(100vh-var(--header-height))] flex-1 overflow-hidden">
          {/* Central Content Area: Canvas */}
          <div className="bg-background relative h-full flex-1 border-r">
            <JobCanvas />
          </div>
          {/* Right Sidebar: Node Library */}
          <JobSidebar />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
