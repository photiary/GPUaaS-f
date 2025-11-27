import { Card, CardContent, CardHeader, CardTitle } from '@workspace/ui/components/card'
import { cn } from '@workspace/ui/lib/utils'

export interface JobMonitoringCardProps {
  label: string
  type: string
  cpuUsage: number
  gpuUsage: number
  memoryUsage: number
  className?: string
}

export function JobMonitoringCard({
  label,
  type,
  cpuUsage,
  gpuUsage,
  memoryUsage,
  className,
}: JobMonitoringCardProps) {
  return (
    <Card className={cn('w-[240px]', className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium flex justify-between items-center">
          <span>{label}</span>
          <span className="text-xs text-muted-foreground uppercase">{type}</span>
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
