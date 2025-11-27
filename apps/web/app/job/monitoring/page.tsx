'use client'

import React, { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { AppSidebar } from '@/components/template/app-sidebar.tsx'
import { SiteHeader } from '@/components/template/site-header.tsx'
import { SidebarInset, SidebarProvider } from '@workspace/ui/components/sidebar'
import { JobCanvas } from '@/components/job/JobCanvas'
import { useJobStore } from '@/components/job/store'
import { MonitoringNode } from '@/components/job/MonitoringNode'
import { fetchMonitorContainerMetrics, ContainerMetrics } from '@/app/job/jobAPI'

const nodeTypes = {
  customNode: MonitoringNode,
}

export default function JobMonitoringPage() {
  const searchParams = useSearchParams()
  const jobId = searchParams.get('jobId')
  const { loadJob, reset, updateNodeMetrics } = useJobStore()

  useEffect(() => {
    if (jobId) {
      reset()
      loadJob(jobId)
    }
  }, [jobId, loadJob, reset])

  useEffect(() => {
    if (!jobId) return

    const controller = new AbortController()
    const { signal } = controller

    fetchMonitorContainerMetrics(
      jobId,
      (metrics) => {
        if (Array.isArray(metrics)) {
          metrics.forEach((metric) => {
            updateNodeMetrics(metric.containerId, metric)
          })
        }
      },
      (error) => {
        console.error('SSE error:', error)
      },
      signal
    ).catch((err) => {
      if (!signal.aborted) {
        console.error('Monitor connection failed', err)
      }
    })

    return () => {
      controller.abort()
    }
  }, [jobId, updateNodeMetrics])

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
            <JobCanvas readOnly={true} nodeTypes={nodeTypes} />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
