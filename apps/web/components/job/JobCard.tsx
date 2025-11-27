import * as React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@workspace/ui/components/card'
import { Badge } from '@workspace/ui/components/badge'
import { JobResponse, deleteJob } from '@/app/job/jobAPI'
import dayjs from 'dayjs'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@workspace/ui/components/dropdown-menu'
import { Button } from '@workspace/ui/components/button'
import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react'

interface JobCardProps {
  job: JobResponse
  onDeleted?: () => void
}

export function JobCard({ job, onDeleted }: JobCardProps) {
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

  const handleDelete = async () => {
    try {
      await deleteJob(job.id)
      if (onDeleted) {
        onDeleted()
      }
    } catch (error) {
      console.error('Failed to delete job', error)
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{job.name}</CardTitle>
        <div className="flex items-center gap-2">
          <Badge variant={job.status === 'RUNNING' ? 'default' : 'secondary'}>{job.status}</Badge>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Pencil className="mr-2 h-4 w-4" />
                <span>Update</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleDelete} className="text-red-600 focus:text-red-600">
                <Trash2 className="mr-2 h-4 w-4" />
                <span>Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-muted-foreground text-xs">{durationInfo}</div>
      </CardContent>
    </Card>
  )
}
