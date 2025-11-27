import { Handle, Position, NodeProps } from '@xyflow/react'
import { NodeCard } from './NodeCard'
import { AppNode } from './store'

export function CanvasNode({ data }: NodeProps<AppNode>) {
  return (
    <div className="relative w-[200px]">
      <Handle type="target" position={Position.Top} className="bg-primary border-background h-3 w-3 border-2" />
      <NodeCard
        label={data.label}
        type={data.type}
        gpuCount={data.gpuCount}
        cpuCount={data.cpuCount}
        className="border-primary/50 shadow-sm"
      />
      <Handle type="source" position={Position.Bottom} className="bg-primary border-background h-3 w-3 border-2" />
    </div>
  )
}
