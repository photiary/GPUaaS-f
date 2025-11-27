import { useEffect } from 'react'
import { useJobStore } from './store'
import { NodeCard } from './NodeCard'
import { NodeResponse } from '@/app/node/nodeAPI'
import { Input } from '@workspace/ui/components/input'
import { Textarea } from '@workspace/ui/components/textarea'
import { Label } from '@workspace/ui/components/label'

export function JobSidebar() {
  const { nodeLibrary, fetchNodeLibrary, jobName, jobDescription, setJobInfo } = useJobStore()

  useEffect(() => {
    fetchNodeLibrary()
  }, [fetchNodeLibrary])

  const onDragStart = (event: React.DragEvent, node: NodeResponse) => {
    event.dataTransfer.setData('application/reactflow', JSON.stringify(node))
    event.dataTransfer.effectAllowed = 'move'
  }

  return (
    <aside className="bg-muted/10 flex h-full w-[300px] flex-col border-l">
      <div className="bg-background border-b p-4 space-y-4">
        <div>
          <h2 className="text-lg font-semibold mb-4">Job Details</h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="job-name">Job Name</Label>
              <Input
                id="job-name"
                value={jobName}
                onChange={(e) => setJobInfo(e.target.value, jobDescription)}
                placeholder="Enter job name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="job-desc">Description</Label>
              <Textarea
                id="job-desc"
                value={jobDescription}
                onChange={(e) => setJobInfo(jobName, e.target.value)}
                placeholder="Enter job description"
                className="min-h-[80px]"
              />
            </div>
          </div>
        </div>
      </div>
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
