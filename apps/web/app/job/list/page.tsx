'use client'

import React, { useEffect, useState, useCallback } from 'react'
import { AppSidebar } from '@/components/template/app-sidebar'
import { SiteHeader } from '@/components/template/site-header'
import { SidebarInset, SidebarProvider } from '@workspace/ui/components/sidebar'
import { fetchJobs, JobResponse } from '@/app/job/jobAPI'
import { JobCard } from '@/components/job/JobCard'
import { Button } from '@workspace/ui/components/button'
import Link from 'next/link'
import { PlusIcon } from 'lucide-react'

export default function Page() {
  const [jobs, setJobs] = useState<JobResponse[]>([])

  const refreshJobs = useCallback(() => {
    fetchJobs().then(setJobs).catch(console.error)
  }, [])

  useEffect(() => {
    refreshJobs()
  }, [refreshJobs])

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
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 px-4 py-4 md:gap-6 md:py-6 lg:px-6">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold tracking-tight">Job List</h1>
                <Link href="/job/register">
                  <Button>
                    <PlusIcon className="mr-2 h-4 w-4" />
                    New
                  </Button>
                </Link>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {jobs.map((job) => (
                  <JobCard key={job.id} job={job} onDeleted={refreshJobs} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
