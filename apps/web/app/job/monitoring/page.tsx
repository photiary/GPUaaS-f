'use client'

import React, { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { AppSidebar } from '@/components/template/app-sidebar.tsx'
import { SiteHeader } from '@/components/template/site-header.tsx'
import { SidebarInset, SidebarProvider } from '@workspace/ui/components/sidebar'
import { JobCanvas } from '@/components/job/JobCanvas'
import { useJobStore } from '@/components/job/store'

export default function JobMonitoringPage() {
  const searchParams = useSearchParams()
  const jobId = searchParams.get('jobId')
  const { loadJob, reset } = useJobStore()

  useEffect(() => {
    if (jobId) {
      reset()
      loadJob(jobId)
    }
  }, [jobId, loadJob, reset])

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
          <div className="bg-background relative h-full flex-1 border-r">
            <JobCanvas />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
