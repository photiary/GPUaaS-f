// Generated API layer for Resource Node domain based on web-api-swagger.json
import { publicApi } from '@workspace/core/api'

export interface NodeRequest {
  name: string
  type: string
  gpuCount?: number
  cpuCores?: number
  memoryCapacity?: number
  status?: string
}

export interface NodeResponse {
  id: string
  name: string
  type: string
  gpuCount?: number
  cpuCores?: number
  memoryCapacity?: number
  status?: string
  lastHeartbeat?: string
}

/**
 * 리소스 노드 목록 조회
 * GET /api/nodes
 *
 * @returns NodeResponse[]
 */
export const fetchNodes = async () => {
  const response = await publicApi.get('/api/nodes')
  return response.data as NodeResponse[]
}

/**
 * 리소스 노드 등록
 * POST /api/nodes
 *
 * @param data NodeRequest
 * @returns NodeResponse
 */
export const postNode = async (data: NodeRequest) => {
  const response = await publicApi.post('/api/nodes', data)
  return response.data as NodeResponse
}

/**
 * 리소스 노드 상세 조회
 * GET /api/nodes/{nodeId}
 *
 * @param nodeId 노드 ID (UUID)
 * @returns NodeResponse
 */
export const fetchNode = async (nodeId: string) => {
  const response = await publicApi.get(`/api/nodes/${nodeId}`)
  return response.data as NodeResponse
}

/**
 * 리소스 노드 수정
 * PUT /api/nodes/{nodeId}
 *
 * @param nodeId 노드 ID (UUID)
 * @param data NodeRequest
 * @returns NodeResponse
 */
export const putNode = async (nodeId: string, data: NodeRequest) => {
  const response = await publicApi.put(`/api/nodes/${nodeId}`, data)
  return response.data as NodeResponse
}

/**
 * 리소스 노드 삭제
 * DELETE /api/nodes/{nodeId}
 *
 * @param nodeId 노드 ID (UUID)
 * @returns void
 */
export const deleteNode = async (nodeId: string) => {
  const response = await publicApi.delete(`/api/nodes/${nodeId}`)
  return response.data as any
}
