import { Card, CardContent, CardHeader, CardTitle } from '@workspace/ui/components/card'
import { Badge } from '@workspace/ui/components/badge'
import { cn } from '@workspace/ui/lib/utils'
import { Button } from '@workspace/ui/components/button'
import { Input } from '@workspace/ui/components/input'
import { Trash2 } from 'lucide-react'

interface NodeCardProps {
  label: string
  type: string
  gpuCount?: number
  cpuCount?: number
  className?: string
  onLabelChange?: (newLabel: string) => void
  onDelete?: () => void
}

export function NodeCard({ label, type, gpuCount, cpuCount, className, onLabelChange, onDelete }: NodeCardProps) {
  return (
    <Card className={cn('w-full', className)}>
      <CardHeader className="p-4 pb-2">
        <div className="flex items-center justify-between gap-2">
          {onLabelChange ? (
            <Input
              value={label}
              onChange={(e) => onLabelChange(e.target.value)}
              className="h-7 px-2 text-sm font-medium"
              placeholder="Node Label"
            />
          ) : (
            <CardTitle className="truncate text-sm font-medium" title={label}>
              {label}
            </CardTitle>
          )}
          <div className="flex items-center gap-1">
            <Badge variant={type === 'GPU' ? 'default' : 'secondary'} className="shrink-0">
              {type}
            </Badge>
            {onDelete && (
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-red-600 hover:text-red-700 hover:bg-red-50"
                onClick={onDelete}
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            )}
          </div>
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
