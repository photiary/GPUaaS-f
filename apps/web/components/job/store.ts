import { create } from 'zustand'
import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  OnConnect,
  OnEdgesChange,
  OnNodesChange,
} from '@xyflow/react'
import { fetchNodes, NodeResponse } from '@/app/node/nodeAPI'

// 커스텀 노드 데이터 타입 정의
export type NodeData = {
  label: string
  type: string
  gpuCount?: number
  cpuCount?: number
  originalId: string // 원본 Node ID
}

// React Flow Node 타입 확장
export type AppNode = Node<NodeData>

interface JobState {
  jobId: string | null
  nodes: AppNode[]
  edges: Edge[]
  nodeLibrary: NodeResponse[]

  fetchNodeLibrary: () => Promise<void>

  setJobId: (id: string) => void
  onNodesChange: OnNodesChange<AppNode>
  onEdgesChange: OnEdgesChange
  onConnect: OnConnect

  addNode: (nodeInfo: NodeResponse, position: { x: number; y: number }) => void

  // Job 저장 관련 (debounce 처리는 컴포넌트나 미들웨어에서 할 수도 있지만 여기서는 일단 함수만 정의)
  saveJob: () => Promise<void>
  reset: () => void
}

export const useJobStore = create<JobState>((set, get) => ({
  jobId: null,
  nodes: [],
  edges: [],
  nodeLibrary: [],

  fetchNodeLibrary: async () => {
    try {
      const nodes = await fetchNodes()
      set({ nodeLibrary: nodes })
    } catch (error) {
      console.error('Failed to fetch node library:', error)
    }
  },

  setJobId: (id: string) => set({ jobId: id }),

  onNodesChange: (changes: NodeChange<AppNode>[]) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    })
    // 변경 발생 시 저장 트리거 (debounce는 사용하는 쪽에서 처리하거나 여기서 처리)
  },

  onEdgesChange: (changes: EdgeChange[]) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    })
  },

  onConnect: (connection: Connection) => {
    set({
      edges: addEdge(connection, get().edges),
    })
  },

  addNode: (nodeInfo: NodeResponse, position: { x: number; y: number }) => {
    const newNode: AppNode = {
      id: crypto.randomUUID(),
      type: 'customNode', // Custom Node Type
      position,
      data: {
        label: nodeInfo.name,
        type: nodeInfo.type,
        gpuCount: nodeInfo.gpuCount,
        cpuCount: nodeInfo.cpuCores,
        originalId: nodeInfo.id,
      },
    }

    set({
      nodes: [...get().nodes, newNode],
    })
  },

  saveJob: async () => {
    const { nodes, edges } = get()
    console.log('Saving job...', { nodes, edges })
    // 실제 API 호출 로직은 여기에 구현
    // 예: await postJob({ ... })
  },

  reset: () => {
    set({
      jobId: null,
      nodes: [],
      edges: [],
    })
  },
}))
