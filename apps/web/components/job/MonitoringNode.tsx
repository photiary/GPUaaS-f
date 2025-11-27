import { Handle, Position, NodeProps } from '@xyflow/react'
import { JobMonitoringCard } from './JobMonitoringCard'
import { AppNode } from './store'

export function MonitoringNode({ id, data }: NodeProps<AppNode>) {
  return (
    <div className="relative w-[240px]">
      <Handle
        type="target"
        position={Position.Top}
        className="bg-primary border-background h-3 w-3 border-2"
        isConnectable={false}
      />
      <JobMonitoringCard
        label={data.label}
        status={data.status}
        cpuUsage={data.metrics?.cpuUsage || 0}
        gpuUsage={data.metrics?.gpuUsage || 0}
        memoryUsage={data.metrics?.memoryUsage || 0}
        className="border-primary/50 shadow-sm"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="bg-primary border-background h-3 w-3 border-2"
        isConnectable={false}
      />
    </div>
  )
}
