import * as React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@workspace/ui/components/card'
import { Badge } from '@workspace/ui/components/badge'
import { JobResponse } from '@/app/job/jobAPI'
import dayjs from 'dayjs'

interface JobCardProps {
  job: JobResponse
}

export function JobCard({ job }: JobCardProps) {
  const durationInfo = React.useMemo(() => {
    if (!job.startTime) return 'Pending'

    const start = dayjs(job.startTime)
    const end = job.endTime ? dayjs(job.endTime) : null

    const formattedStart = start.format('YYYY-MM-DD HH:mm')

    if (end) {
      const formattedEnd = end.format('HH:mm')
      const diff = end.diff(start, 'minute')
      return `${formattedStart} ~ ${formattedEnd} (${diff}분)`
    } else {
      return `${formattedStart} ~ (Running)`
    }
  }, [job.startTime, job.endTime])

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{job.name}</CardTitle>
        <Badge variant={job.status === 'RUNNING' ? 'default' : 'secondary'}>{job.status}</Badge>
      </CardHeader>
      <CardContent>
        <div className="text-muted-foreground text-xs">{durationInfo}</div>
      </CardContent>
    </Card>
  )
}
