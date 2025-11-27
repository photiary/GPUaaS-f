'use client'

import React, { useEffect } from 'react'
import { AppSidebar } from '@/components/template/app-sidebar.tsx'
import { SiteHeader } from '@/components/template/site-header.tsx'
import { SidebarInset, SidebarProvider } from '@workspace/ui/components/sidebar'
import { JobSidebar } from '@/components/job/JobSidebar'
import { JobCanvas } from '@/components/job/JobCanvas'
import { useJobStore } from '@/components/job/store'

// Debounce hook implementation
function useDebounce(effect: () => void, dependencies: any[], delay: number) {
  useEffect(() => {
    const handler = setTimeout(() => effect(), delay)
    return () => clearTimeout(handler)
  }, [...dependencies, delay]) // eslint-disable-line react-hooks/exhaustive-deps
}

export default function JobRegisterPage() {
  const { nodes, edges, saveJob } = useJobStore()

  // Auto-save when nodes or edges change (debounce 1000ms)
  useDebounce(
    () => {
      if (nodes.length > 0) {
        saveJob()
      }
    },
    [nodes, edges],
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
