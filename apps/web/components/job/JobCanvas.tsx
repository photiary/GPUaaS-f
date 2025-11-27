import { useCallback, useRef } from 'react'
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useReactFlow,
  ReactFlowProvider,
  Edge,
  Connection,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'

import { useJobStore } from './store'
import { CanvasNode } from './CanvasNode'

const nodeTypes = {
  customNode: CanvasNode,
}

function JobCanvasContent() {
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

  const onEdgeClick = useCallback((event: React.MouseEvent, edge: Edge) => {
    console.log('Edge selected:', edge)
  }, [])

  const onEdgesDelete = useCallback((edges: Edge[]) => {
    console.log('Edges deleted:', edges)
  }, [])

  return (
    <div className="h-full w-full" ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onReconnect={onReconnect}
        onReconnectStart={onReconnectStart}
        onReconnectEnd={onReconnectEnd}
        nodeTypes={nodeTypes}
        onDragOver={onDragOver}
        onDrop={onDrop}
        onEdgeClick={onEdgeClick}
        onEdgesDelete={onEdgesDelete}
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
