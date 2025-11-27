import { Card, CardContent, CardHeader, CardTitle } from '@workspace/ui/components/card'
import { cn } from '@workspace/ui/lib/utils'

export interface JobMonitoringCardProps {
  label: string
  status?: string
  cpuUsage: number
  gpuUsage: number
  memoryUsage: number
  className?: string
}

export function JobMonitoringCard({
  label,
  status,
  cpuUsage,
  gpuUsage,
  memoryUsage,
  className,
}: JobMonitoringCardProps) {
  const isRunning = status === 'RUNNING'

  if (isRunning) {
    return (
      <div className={cn('card-wrapper-running w-[240px]', className)}>
        <div className="card-content-running">
          <Card className="h-full border-0 shadow-none bg-transparent">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex justify-between items-center">
                <span>{label}</span>
                <div className="flex flex-col items-end">
                  <span className="text-xs text-blue-500 font-semibold uppercase">{status}</span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span>GPU</span>
                  <span>{gpuUsage.toFixed(1)}%</span>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span>CPU</span>
                  <span>{cpuUsage.toFixed(1)}%</span>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span>Memory</span>
                  <span>{memoryUsage.toFixed(1)}%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <Card className={cn('w-[240px]', className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium flex justify-between items-center">
          <span>{label}</span>
          <div className="flex flex-col items-end">
            {status && <span className="text-xs text-muted-foreground uppercase">{status}</span>}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span>GPU</span>
            <span>{gpuUsage.toFixed(1)}%</span>
          </div>
        </div>
        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span>CPU</span>
            <span>{cpuUsage.toFixed(1)}%</span>
          </div>
        </div>
        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span>Memory</span>
            <span>{memoryUsage.toFixed(1)}%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
