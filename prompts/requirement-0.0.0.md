GPUaaS 를 모니터링하는 웹 어플리케이션

# 페이지: Job 등록

CPU, GPU등 여러 사양의 노드를 선택하고 순차적으로 실행할 수 있도록 Job 정보를 등록한다.
Job을 구성하는 Container를 React flow(@xyflow/react)로 표현한다.

- React flow 참조사이트 https://reactflow.dev/learn

- 도메인: job
- URL: /job/register
- 화면구성
  - 중앙 컨텐츠 영역에 선택한 Node Card 표시한다.
  - 오른쪽 sidebar: Node Card (등록용)를 사용하여 세로로 리스트를 표시한다.
- GET /api/nodes를 호출하여 Node Card 표시
- 오른쪽 Node Card 리스트에 드래그앤드랍으로 Node들을 선택할 수 있다. (선택한 Node는 Container라고 칭한다.)
- 컨테이너끼리 연결하는 정보는 Container Edge로 정보로 관리한다.
- Job 정보는 debounce로 자동 저장
- Job 정보는 선택한 Node 정보를 기반으로 저장된다.

# 컴포넌트: Node Card (등록용)

Node 정보를 카드로 표현한다.
Shadcn Card 컴포넌트를 사용하고 React-flow에서 사용할 수 있도록 한다.

- 항목
  - label
  - Type: GPU, CPU
  - GPU 수
  - CPU 수

# 페이지: Job 카드 목록

- 화면타이틀: Job List
- Job카드를 4개씩 세로 표시한다.

# 컴포넌트: Job Card (Job 카드 목록용)

- 항목
  - Label
  - Status tag
    - Start time ~ End time 소요시간
