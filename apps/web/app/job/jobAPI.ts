// Generated API layer for Jobs domain based on web-api-swagger.json
import { publicApi } from '@workspace/core/api'
import { fetchEventSource } from '@microsoft/fetch-event-source'

export interface ContainerMetrics {
  containerId: string
  timestamp: string
  cpuUsage: number
  gpuUsage: number
  memoryUsage: number
}

export interface JobRequest {
  name: string
  description?: string
  requestedGpus?: number
  requestedCpus?: number
  requestedMemory?: number
  metadata?: string
}

export interface JobResponse {
  id: string
  name: string
  description?: string
  status?: string
  submitTime?: string
  startTime?: string
  endTime?: string
  requestedGpus?: number
  requestedCpus?: number
  requestedMemory?: number
  metadata?: string
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

export interface SimpleContainerResponse {
  id: string
  label: string
  gpuCores?: number
  cpuCores?: number
  memoryMb?: number
  diskGb?: number
}

export interface ContainerEdgeRequest {
  sourceContainerId?: string
  targetContainerId?: string
  edgeKey?: string
  label?: string
  condition?: string
  isActive?: boolean
}

export interface ContainerEdgeResponse {
  id: string
  jobId: string
  sourceContainerId?: string
  targetContainerId?: string
  edgeKey?: string
  label?: string
  condition?: string
  isActive?: boolean
  createdAt?: string
  updatedAt?: string
}

/**
 * Job 목록 조회
 * GET /api/jobs
 *
 * @returns JobResponse[]
 */
export const fetchJobs = async () => {
  const response = await publicApi.get('/api/jobs')
  return response.data as JobResponse[]
}

/**
 * 새 Job 생성
 * POST /api/jobs
 *
 * @param data JobRequest
 * @returns JobResponse
 */
export const postJob = async (data: JobRequest) => {
  const response = await publicApi.post('/api/jobs', data)
  return response.data as JobResponse
}

/**
 * Job 상세 조회
 * GET /api/jobs/{jobId}
 *
 * @param jobId Job ID (UUID)
 * @returns JobResponse
 */
export const fetchJob = async (jobId: string) => {
  const response = await publicApi.get(`/api/jobs/${jobId}`)
  return response.data as JobResponse
}

/**
 * Job 수정
 * PUT /api/jobs/{jobId}
 *
 * @param jobId Job ID (UUID)
 * @param data JobRequest
 * @returns JobResponse
 */
export const putJob = async (jobId: string, data: JobRequest) => {
  const response = await publicApi.put(`/api/jobs/${jobId}`, data)
  return response.data as JobResponse
}

/**
 * Job 삭제
 * DELETE /api/jobs/{jobId}
 *
 * @param jobId Job ID (UUID)
 * @returns void
 */
export const deleteJob = async (jobId: string) => {
  const response = await publicApi.delete(`/api/jobs/${jobId}`)
  return response.data as any
}

/**
 * 지정한 Job을 수동으로 시작
 * POST /api/jobs/{jobId}/start
 *
 * @param jobId Job ID (UUID)
 * @returns JobResponse
 */
export const postStartJob = async (jobId: string) => {
  const response = await publicApi.post(`/api/jobs/${jobId}/start`)
  return response.data as JobResponse
}

/**
 * 실행 중인 Job을 수동으로 중지
 * POST /api/jobs/{jobId}/stop
 *
 * @param jobId Job ID (UUID)
 * @returns JobResponse
 */
export const postStopJob = async (jobId: string) => {
  const response = await publicApi.post(`/api/jobs/${jobId}/stop`)
  return response.data as JobResponse
}

/**
 * 컨테이너 엣지 목록 조회
 * GET /api/jobs/{jobId}/edges
 *
 * @param jobId Job ID (UUID)
 * @returns ContainerEdgeResponse[]
 */
export const fetchJobEdges = async (jobId: string) => {
  const response = await publicApi.get(`/api/jobs/${jobId}/edges`)
  return response.data as ContainerEdgeResponse[]
}

/**
 * 컨테이너 엣지 등록
 * POST /api/jobs/{jobId}/edges
 *
 * @param jobId Job ID (UUID)
 * @param data ContainerEdgeRequest
 * @returns ContainerEdgeResponse
 */
export const postJobEdge = async (jobId: string, data: ContainerEdgeRequest) => {
  const response = await publicApi.post(`/api/jobs/${jobId}/edges`, data)
  return response.data as ContainerEdgeResponse
}

/**
 * 컨테이너 엣지 상세 조회
 * GET /api/jobs/{jobId}/edges/{edgeId}
 *
 * @param jobId Job ID (UUID)
 * @param edgeId Edge ID (UUID)
 * @returns ContainerEdgeResponse
 */
export const fetchJobEdge = async (jobId: string, edgeId: string) => {
  const response = await publicApi.get(`/api/jobs/${jobId}/edges/${edgeId}`)
  return response.data as ContainerEdgeResponse
}

/**
 * 컨테이너 엣지 수정
 * PUT /api/jobs/{jobId}/edges/{edgeId}
 *
 * @param jobId Job ID (UUID)
 * @param edgeId Edge ID (UUID)
 * @param data ContainerEdgeRequest
 * @returns ContainerEdgeResponse
 */
export const putJobEdge = async (jobId: string, edgeId: string, data: ContainerEdgeRequest) => {
  const response = await publicApi.put(`/api/jobs/${jobId}/edges/${edgeId}`, data)
  return response.data as ContainerEdgeResponse
}

/**
 * 컨테이너 엣지 삭제
 * DELETE /api/jobs/{jobId}/edges/{edgeId}
 *
 * @param jobId Job ID (UUID)
 * @param edgeId Edge ID (UUID)
 * @returns void
 */
export const deleteJobEdge = async (jobId: string, edgeId: string) => {
  const response = await publicApi.delete(`/api/jobs/${jobId}/edges/${edgeId}`)
  return response.data as any
}

/**
 * 특정 Job의 컨테이너 목록 조회
 * GET /api/jobs/{jobId}/containers
 *
 * @param jobId Job ID (UUID)
 * @returns ContainerResponse[]
 */
export const fetchJobContainers = async (jobId: string) => {
  const response = await publicApi.get(`/api/jobs/${jobId}/containers`)
  return response.data as ContainerResponse[]
}

/**
 * 특정 Job의 컨테이너 상태 실시간 모니터링 (SSE)
 * GET /api/jobs/{jobId}/containers/state
 *
 * @param jobId Job ID (UUID)
 * @returns 서버 응답 객체 (SSE)
 */
export const fetchMonitorContainerState = async (jobId: string) => {
  const response = await publicApi.get(`/api/jobs/${jobId}/containers/state`)
  return response.data as any
}

/**
 * 특정 Job의 컨테이너 메트릭스 실시간 모니터링 (SSE)
 * GET /api/jobs/{jobId}/containers/metrics
 *
 * @param jobId Job ID (UUID)
 * @param onMessage 데이터 수신 콜백
 * @param onError 에러 콜백
 * @param signal AbortSignal
 */
export const fetchMonitorContainerMetrics = async (
  jobId: string,
  onMessage: (data: ContainerMetrics[]) => void,
  onError: (err: any) => void,
  signal?: AbortSignal
) => {
  await fetchEventSource(`/api/jobs/${jobId}/containers/metrics`, {
    method: 'GET',
    headers: {
      Accept: 'text/event-stream',
    },
    signal: signal,
    async onopen(response) {
      // Content-Type 확인
      const contentType = response.headers.get('content-type');
      console.log('Content-Type:', contentType);
      if (response.ok) {
        return
      } else {
        throw new Error(`Failed to connect: ${response.statusText}`)
      }
    },
    onmessage(msg) {
      if (msg.event === 'keep-alive' || msg.data === 'ok') {
        return
      }
      if (msg.data) {
        try {
          const parsedData = JSON.parse(msg.data) as ContainerMetrics[]
          onMessage(parsedData)
        } catch (e) {
          console.error('Failed to parse metrics data:', e)
        }
      }
    },
    onerror(err) {
      onError(err)
    },
  })
}

/**
 * 전체 Job 상태 실시간 모니터링 (SSE)
 * GET /api/jobs/monitor
 *
 * @returns 서버 응답 객체 (SSE)
 */
export const fetchMonitorAllJobs = async () => {
  const response = await publicApi.get('/api/jobs/monitor')
  return response.data as any
}
