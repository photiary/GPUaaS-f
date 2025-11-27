import { Card, CardContent, CardHeader, CardTitle } from '@workspace/ui/components/card'
import { Badge } from '@workspace/ui/components/badge'
import { cn } from '@workspace/ui/lib/utils'

interface NodeCardProps {
  label: string
  type: string
  gpuCount?: number
  cpuCount?: number
  className?: string
}

export function NodeCard({ label, type, gpuCount, cpuCount, className }: NodeCardProps) {
  return (
    <Card className={cn('w-full', className)}>
      <CardHeader className="p-4 pb-2">
        <div className="flex items-center justify-between gap-2">
          <CardTitle className="truncate text-sm font-medium" title={label}>
            {label}
          </CardTitle>
          <Badge variant={type === 'GPU' ? 'default' : 'secondary'} className="shrink-0">
            {type}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="text-muted-foreground p-4 pt-2 text-xs">
        <div className="flex flex-col gap-1">
          {gpuCount !== undefined && gpuCount > 0 && <div>GPU: {gpuCount}</div>}
          <div>CPU: {cpuCount} Cores</div>
        </div>
      </CardContent>
    </Card>
  )
}
