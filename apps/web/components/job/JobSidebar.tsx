import { useEffect } from 'react'
import { useJobStore } from './store'
import { NodeCard } from './NodeCard'
import { NodeResponse } from '@/app/node/nodeAPI'

export function JobSidebar() {
  const { nodeLibrary, fetchNodeLibrary } = useJobStore()

  useEffect(() => {
    fetchNodeLibrary()
  }, [fetchNodeLibrary])

  const onDragStart = (event: React.DragEvent, node: NodeResponse) => {
    event.dataTransfer.setData('application/reactflow', JSON.stringify(node))
    event.dataTransfer.effectAllowed = 'move'
  }

  return (
    <aside className="bg-muted/10 flex h-full w-[300px] flex-col border-l">
      <div className="bg-background border-b p-4">
        <h2 className="text-lg font-semibold">Node Library</h2>
        <p className="text-muted-foreground text-xs">Drag nodes to the canvas</p>
      </div>
      <div className="flex-1 space-y-3 overflow-y-auto p-4">
        {nodeLibrary.map((node) => (
          <div
            key={node.id}
            draggable
            onDragStart={(event) => onDragStart(event, node)}
            className="cursor-grab active:cursor-grabbing"
          >
            <NodeCard
              label={node.name}
              type={node.type}
              gpuCount={node.gpuCount}
              cpuCount={node.cpuCores}
              className="hover:border-primary transition-colors"
            />
          </div>
        ))}
      </div>
    </aside>
  )
}
