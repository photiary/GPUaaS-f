import { useCallback, useRef } from 'react'
import {
  ReactFlow,
  Background,
  Controls,
  useReactFlow,
  ReactFlowProvider,
  Edge,
  Connection,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'

import { useJobStore } from './store'
import { CanvasNode } from './CanvasNode'

const defaultNodeTypes = {
  customNode: CanvasNode,
}

interface JobCanvasProps {
  readOnly?: boolean
  nodeTypes?: Record<string, any>
}

function JobCanvasContent({ readOnly, nodeTypes = defaultNodeTypes }: JobCanvasProps) {
  const reactFlowWrapper = useRef<HTMLDivElement>(null)
  const { screenToFlowPosition } = useReactFlow()
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect, addNode, onReconnect: onReconnectAction } = useJobStore()

  const edgeReconnectSuccessful = useRef(true)

  const onReconnectStart = useCallback(() => {
    edgeReconnectSuccessful.current = false
  }, [])

  const onReconnect = useCallback(
    (oldEdge: Edge, newConnection: Connection) => {
      edgeReconnectSuccessful.current = true
      onReconnectAction(oldEdge, newConnection)
    },
    [onReconnectAction]
  )

  const onReconnectEnd = useCallback(
    (_: MouseEvent | TouchEvent, edge: Edge) => {
      if (!edgeReconnectSuccessful.current) {
        onEdgesChange([{ id: edge.id, type: 'remove' }])
      }
      edgeReconnectSuccessful.current = true
    },
    [onEdgesChange]
  )

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }, [])

  const onDrop = useCallback(
    async (event: React.DragEvent) => {
      if (readOnly) return // Prevent drop in read-only mode

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
    [addNode, screenToFlowPosition, readOnly]
  )

  const onEdgeClick = useCallback((event: React.MouseEvent, edge: Edge) => {
    console.log('Edge selected:', edge)
  }, [])

  const onEdgesDelete = useCallback((edges: Edge[]) => {
    if (readOnly) return
    console.log('Edges deleted:', edges)
  }, [readOnly])

  return (
    <div className="h-full w-full" ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={readOnly ? undefined : onNodesChange}
        onEdgesChange={readOnly ? undefined : onEdgesChange}
        onConnect={readOnly ? undefined : onConnect}
        onReconnect={readOnly ? undefined : onReconnect}
        onReconnectStart={readOnly ? undefined : onReconnectStart}
        onReconnectEnd={readOnly ? undefined : onReconnectEnd}
        nodeTypes={nodeTypes}
        onDragOver={readOnly ? undefined : onDragOver}
        onDrop={readOnly ? undefined : onDrop}
        onEdgeClick={onEdgeClick}
        onEdgesDelete={readOnly ? undefined : onEdgesDelete}
        nodesDraggable={!readOnly}
        nodesConnectable={!readOnly}
        elementsSelectable={true} 
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  )
}

export function JobCanvas(props: JobCanvasProps) {
  return (
    <ReactFlowProvider>
      <JobCanvasContent {...props} />
    </ReactFlowProvider>
  )
}
