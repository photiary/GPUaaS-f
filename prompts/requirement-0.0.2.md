# 컴포넌트: Job Card

- 카드를 클릭하면 Job Monitoring화면 으로 이동한다.

# 화면: Job Monitoring

- 도메인: job
- URL: /job/monitoring
- Job API, Container API, Edge API를 호출하여 Container와 Edge를 React flow로 표현한다.
- React Flow 노드 컨테이너 표시 카드는 Job Monitoring Card를 사용한다.
- 모니터링 화면으로 Job의 내용을 수정할 수 없다.
- 'fetchMonitorContainerMetrics'를 사용하여 Container의 메트릭을 조회하여 Job Monitoring Card의 사용률을 실시간으로 업데이트한다. (Server side event로 구독한다.)

## fetchMonitorContainerMetrics 포맷

[{"containerId":"6c26aa44-b012-4ae1-aaf9-acdbbb99f495","timestamp":"2025-11-27T12:11:23.811181Z","cpuUsage":45.55558696795977,"gpuUsage":41.23355034166117,"memoryUsage":10.695070712146283},{"containerId":"22412ea2-5606-4448-aeaf-ef7e8ae6f580","timestamp":"2025-11-27T12:11:23.811280Z","cpuUsage":59.083773220994416,"gpuUsage":38.96071463510017,"memoryUsage":38.52367747655671}]

# 컴포넌트: Job Monitoring Card
- 항목
    - label
    - Type: GPU, CPU
    - GPU 사용률
    - CPU 사용률
    - Disk 사용률