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
  reconnectEdge,
} from '@xyflow/react'
import { fetchNodes, NodeResponse } from '@/app/node/nodeAPI'
import { putJob, postJobEdge, deleteJobEdge, putJobEdge } from '@/app/job/jobAPI'
import { postContainer, putContainer, deleteContainer, ContainerRequest } from '@/app/container/containerAPI'

// Debounce를 위한 타임아웃 맵
const updateTimeouts = new Map<string, NodeJS.Timeout>()

const debouncedPutContainer = (containerId: string, data: ContainerRequest) => {
  if (updateTimeouts.has(containerId)) {
    clearTimeout(updateTimeouts.get(containerId))
  }

  const timeout = setTimeout(async () => {
    try {
      await putContainer(containerId, data)
      updateTimeouts.delete(containerId)
    } catch (error) {
      console.error('Failed to update container:', error)
    }
  }, 500) // 500ms debounce

  updateTimeouts.set(containerId, timeout)
}

// 커스텀 노드 데이터 타입 정의
export type NodeData = {
  label: string
  type: string
  gpuCount?: number
  cpuCount?: number
  originalId: string // 원본 Node ID
  containerId?: string
}

// React Flow Node 타입 확장
export type AppNode = Node<NodeData>

interface JobState {
  jobId: string | null
  jobName: string
  jobDescription: string
  nodes: AppNode[]
  edges: Edge[]
  nodeLibrary: NodeResponse[]

  fetchNodeLibrary: () => Promise<void>

  setJobId: (id: string) => void
  setJobInfo: (name: string, description: string) => void
  onNodesChange: OnNodesChange<AppNode>
  onEdgesChange: OnEdgesChange
  onConnect: OnConnect
  onReconnect: (oldEdge: Edge, newConnection: Connection) => void

  addNode: (nodeInfo: NodeResponse, position: { x: number; y: number }) => Promise<void>
  updateNodeLabel: (nodeId: string, label: string) => void
  removeNode: (nodeId: string) => void

  // Job 저장 관련 (debounce 처리는 컴포넌트나 미들웨어에서 할 수도 있지만 여기서는 일단 함수만 정의)
  saveJob: () => Promise<void>
  reset: () => void
}

export const useJobStore = create<JobState>((set, get) => ({
  jobId: null,
  jobName: '',
  jobDescription: '',
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
  setJobInfo: (name: string, description: string) => set({ jobName: name, jobDescription: description }),

  onNodesChange: (changes: NodeChange<AppNode>[]) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    })

    const { nodes, jobId } = get()

    changes.forEach((change) => {
      if (change.type === 'position') {
        const node = nodes.find((n) => n.id === change.id)
        if (node && node.data.containerId) {
          debouncedPutContainer(node.data.containerId, {
            label: node.data.label,
            positionX: node.position.x,
            positionY: node.position.y,
            jobId: jobId || undefined,
            nodeId: node.data.originalId,
          })
        }
      }
    })
  },

  onEdgesChange: (changes: EdgeChange[]) => {
    const { jobId } = get()

    changes.forEach((change) => {
      if (change.type === 'remove' && jobId) {
        deleteJobEdge(jobId, change.id).catch((error) => {
          console.error('Failed to delete edge:', error)
        })
      }
    })

    set({
      edges: applyEdgeChanges(changes, get().edges),
    })
  },

  onConnect: (connection: Connection) => {
    const { nodes, jobId } = get()
    const tempId = crypto.randomUUID()

    set({
      edges: addEdge({ ...connection, id: tempId }, get().edges),
    })

    const sourceNode = nodes.find((n) => n.id === connection.source)
    const targetNode = nodes.find((n) => n.id === connection.target)

    if (jobId && sourceNode?.data.containerId && targetNode?.data.containerId) {
      postJobEdge(jobId, {
        sourceContainerId: sourceNode.data.containerId,
        targetContainerId: targetNode.data.containerId,
      })
        .then((response) => {
          set((state) => ({
            edges: state.edges.map((e) => (e.id === tempId ? { ...e, id: response.id } : e)),
          }))
        })
        .catch((error) => {
          console.error('Failed to create edge:', error)
          set({ edges: get().edges.filter((e) => e.id !== tempId) })
        })
    }
  },

  onReconnect: (oldEdge: Edge, newConnection: Connection) => {
    const { nodes, jobId } = get()

    set({
      edges: reconnectEdge(oldEdge, newConnection, get().edges),
    })

    const sourceNode = nodes.find((n) => n.id === newConnection.source)
    const targetNode = nodes.find((n) => n.id === newConnection.target)

    if (jobId && sourceNode?.data.containerId && targetNode?.data.containerId) {
      putJobEdge(jobId, oldEdge.id, {
        sourceContainerId: sourceNode.data.containerId,
        targetContainerId: targetNode.data.containerId,
      }).catch((error) => {
        console.error('Failed to update edge:', error)
        // Revert the change if update failed
        // This might be complex, but at least log the error
      })
    }
  },

  addNode: async (nodeInfo: NodeResponse, position: { x: number; y: number }) => {
    const { jobId } = get()
    let containerId: string | undefined

    if (jobId) {
      try {
        const container = await postContainer({
          label: nodeInfo.name,
          jobId: jobId,
          nodeId: nodeInfo.id,
          positionX: position.x,
          positionY: position.y,
        })
        containerId = container.id
      } catch (error) {
        console.error('Failed to create container:', error)
      }
    } else {
      console.warn('Job ID is missing, adding node without container creation')
    }

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
        containerId: containerId,
      },
    }

    set({
      nodes: [...get().nodes, newNode],
    })
  },

  updateNodeLabel: (nodeId: string, label: string) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === nodeId) {
          return { ...node, data: { ...node.data, label } }
        }
        return node
      }),
    })

    const node = get().nodes.find((n) => n.id === nodeId)
    const { jobId } = get()

    if (node && node.data.containerId) {
      debouncedPutContainer(node.data.containerId, {
        label: label,
        positionX: node.position.x,
        positionY: node.position.y,
        jobId: jobId || undefined,
        nodeId: node.data.originalId,
      })
    }
  },

  removeNode: (nodeId: string) => {
    const { nodes, edges, jobId } = get()
    const nodeToRemove = nodes.find((n) => n.id === nodeId)

    if (!nodeToRemove) return

    if (nodeToRemove.data.containerId) {
      deleteContainer(nodeToRemove.data.containerId).catch((error) => {
        console.error('Failed to delete container:', error)
      })
    }

    set({
      nodes: nodes.filter((node) => node.id !== nodeId),
      edges: edges.filter((edge) => edge.source !== nodeId && edge.target !== nodeId),
    })
  },

  saveJob: async () => {
    const { jobId, jobName, jobDescription, nodes, edges } = get()
    console.log('Saving job...', { jobId, jobName, jobDescription, nodes, edges })

    if (jobId) {
      try {
        await putJob(jobId, {
          name: jobName || 'New Job',
          description: jobDescription,
        })
      } catch (error) {
        console.error('Failed to save job:', error)
      }
    }
  },

  reset: () => {
    set({
      jobId: null,
      jobName: '',
      jobDescription: '',
      nodes: [],
      edges: [],
    })
  },
}))
