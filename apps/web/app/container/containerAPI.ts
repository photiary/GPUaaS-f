// Generated API layer for App Container domain based on web-api-swagger.json
import { publicApi } from '@workspace/core/api'

export interface ContainerRequest {
  label: string
  description?: string
  sequence?: number
  status?: string
  config?: string
  positionX?: number
  positionY?: number
  jobId?: string
  nodeId?: string
}

export interface ContainerResponse {
  id: string
  label: string
  description?: string
  sequence?: number
  status?: string
  config?: string
  positionX?: number
  positionY?: number
}

/**
 * 컨테이너 생성
 * POST /api/containers
 *
 * @param data ContainerRequest
 * @returns ContainerResponse
 */
export const postContainer = async (data: ContainerRequest) => {
  const response = await publicApi.post('/api/containers', data)
  return response.data as ContainerResponse
}

/**
 * 컨테이너 상세 조회
 * GET /api/containers/{containerId}
 *
 * @param containerId 컨테이너 ID (UUID)
 * @returns ContainerResponse
 */
export const fetchContainer = async (containerId: string) => {
  const response = await publicApi.get(`/api/containers/${containerId}`)
  return response.data as ContainerResponse
}

/**
 * 컨테이너 수정
 * PUT /api/containers/{containerId}
 *
 * @param containerId 컨테이너 ID (UUID)
 * @param data ContainerRequest
 * @returns ContainerResponse
 */
export const putContainer = async (containerId: string, data: ContainerRequest) => {
  const response = await publicApi.put(`/api/containers/${containerId}`, data)
  return response.data as ContainerResponse
}

/**
 * 컨테이너 삭제
 * DELETE /api/containers/{containerId}
 *
 * @param containerId 컨테이너 ID (UUID)
 * @returns void
 */
export const deleteContainer = async (containerId: string) => {
  const response = await publicApi.delete(`/api/containers/${containerId}`)
  return response.data as any
}
