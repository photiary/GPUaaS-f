# 페이지: Job 등록

- 신규 등록 진입시 '새 Job 생성' API를 호출하여 신규 데이터를 생성한다.
- 오늘쪽 sidebar에 다음 항목 추가
  - Job name을 입력할 수 있다.
  - Job description을 입력할 수 있다. 
  - debounce로 자동 저장

# 컴포넌트: Node Card (등록용)

- Node를 선택하여 Node를 캔버스에 드래그하여 추가하면 다음과 같이 카드의 기능이 추가된다.
  - Node Card에 라벨을 입력할 수 있도록 한다.
  - Node Card 오른쪽 상단에 삭제 아이콘을 표시한다.
  - '컨테이너 생성' API를 호출하여 컨테이너 정보를 생성한다.
- Canvas에 있는 Node를 변경하면 debounce로 자동 `putContainer`한다.
- Node 끼리 연결하면 `postJobEdge` API를 호출하여 Edge 정보를 생성한다.
- Edge를 선택하고 키보드 'delete'를 누르면 Edge를 `deleteJobEdge`API를 호출하여 삭제한다.
- Node 삭제 아이콘을 클릭하면 `deleteContainer` API를 호출하여 삭제한다. 연결된 Edge가 있으면 'deleteJobEdge' API를 호출하여 Edge도 삭제한다.

# 컴포넌트: Job Card

- 오른쪽 상단에 '...' 버튼을 추가하고 클릭 시, Dropdown 메뉴를 표시한다.
  - Dropdown 메뉴에는 'Update'과 'Delete' 메뉴 항목이 있다.
  - Delete 메뉴 항목을 클릭 시, 해당 Job 데이터를 삭제한다.
  - 각 메뉴 앞에는 항목에 맞는 아이콘을 표시한다.
  - Delete 메뉴는 붉은색으로 표시한다.