# 컴포넌트: Job Card

- 카드를 클릭하면 Job Monitoring화면 으로 이동한다.

# 화면: Job Monitoring

- 도메인: job
- URL: /job/monitoring
- Job API, Container API, Edge API를 호출하여 Container와 Edge를 React flow로 표현한다.
- React Flow 노드 컨테이너 표시 카드는 Job Monitoring Card를 사용한다.
- 모니터링 화면으로 Job의 내용을 수정할 수 없다.

# 컴포넌트: Job Monitoring Card
- 항목
    - label
    - Type: GPU, CPU
    - GPU 수
    - CPU 수