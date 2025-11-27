import { Handle, Position, NodeProps } from '@xyflow/react'
import { NodeCard } from './NodeCard'
import { AppNode, useJobStore } from './store'

export function CanvasNode({ id, data }: NodeProps<AppNode>) {
  const { updateNodeLabel, removeNode } = useJobStore()

  return (
    <div className="relative w-[200px]">
      <Handle type="target" position={Position.Top} className="bg-primary border-background h-3 w-3 border-2" />
      <NodeCard
        label={data.label}
        type={data.type}
        gpuCount={data.gpuCount}
        cpuCount={data.cpuCount}
        className="border-primary/50 shadow-sm"
        onLabelChange={(newLabel) => updateNodeLabel(id, newLabel)}
        onDelete={() => removeNode(id)}
      />
      <Handle type="source" position={Position.Bottom} className="bg-primary border-background h-3 w-3 border-2" />
    </div>
  )
}
