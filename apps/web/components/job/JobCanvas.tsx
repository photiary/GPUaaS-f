import { useCallback, useRef } from 'react'
import { ReactFlow, Background, Controls, MiniMap, useReactFlow, ReactFlowProvider } from '@xyflow/react'
import '@xyflow/react/dist/style.css'

import { useJobStore } from './store'
import { CanvasNode } from './CanvasNode'

const nodeTypes = {
  customNode: CanvasNode,
}

function JobCanvasContent() {
  const reactFlowWrapper = useRef<HTMLDivElement>(null)
  const { screenToFlowPosition } = useReactFlow()
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect, addNode } = useJobStore()

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }, [])

  const onDrop = useCallback(
    async (event: React.DragEvent) => {
      event.preventDefault()

      const type = event.dataTransfer.getData('application/reactflow')
      if (!type) return

      const nodeInfo = JSON.parse(type)

      // check if the dropped element is valid
      if (!nodeInfo || !nodeInfo.id) {
        return
      }

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      })

      await addNode(nodeInfo, position)
    },
    [addNode, screenToFlowPosition]
  )

  return (
    <div className="h-full w-full" ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        onDragOver={onDragOver}
        onDrop={onDrop}
        fitView
      >
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  )
}

export function JobCanvas() {
  return (
    <ReactFlowProvider>
      <JobCanvasContent />
    </ReactFlowProvider>
  )
}
