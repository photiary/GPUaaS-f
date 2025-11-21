GPUaaS 를 모니터링하는 웹 어플리케이션 

# 페이지: Job 등록
CPU, GPU등 여러 사양의 노드를 선택하고 순차적으로 실행할 수 있도록 Job 정보를 등록한다.
Node 끼리는 연결할 수 있다.

- 도메인: job
- URL: /job/register
- 화면구성
    - 중앙 컨텐츠 영역에 선택한 Node Card 표시
    - 오른쪽 sidebar: Node Card (등록용)를 세로로 리스트를 표시
- Node Card 표시방법은 React-flow로 Node끼리 연결 가능
- 오른쪽 Node Card 리스트에 드래그앤드랍으로 Node들을 선택
- Job 정보는 debounce로 자동 저장
- GET /api/nodes를 호출하여 Node Card 표시

# 컴포넌트: Node Card (등록용)
Node 정보를 카드로 표현한다.

- 항목
  - label
  - Type: GPU, CPU
  - GPU 수
  - CPU 수