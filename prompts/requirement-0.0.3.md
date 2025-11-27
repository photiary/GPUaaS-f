# 컴포넌트: Job Monitoring Card

- 컨테이너의 상태가 'RUNNING'이면, 다음 테두리 모션 템플릿을 참고하여 현재 프로젝트 버전에 맞게 리소스를 수정하여 효과 추가, 주요 색상은 테마의 파랑색 계열

### 테두리 모션 템플릿
```
<div class="flex h-[100vh] w-[100vw] flex-col items-center justify-center bg-slate-950 text-white">
  <div class="card-wrapper h-[200px] w-[200px]">
    <div class="card-content flex items-center justify-center text-xs">
      <div class="max-w-[60%] text-center">Check out <a href="https://youtube.com/@codinglyio" class="font-semibold underline" target="_blank">Codingly</a> on YouTube</div>
    </div>
  </div>
</div>
```

```
@layer utilities {
  /* Act as a border */
  .card-wrapper {
    @apply relative overflow-hidden rounded-2xl bg-gradient-to-b from-slate-700 to-slate-800;
  }

  /* Gradient */
  .card-wrapper::before {
    background: conic-gradient(
      rgba(244, 114, 182, 0.4) 0deg,
      rgba(192, 132, 252, 0.4) 0deg,
      transparent 80deg
    );

    @apply absolute left-[-25%] top-[-25%] h-[150%] w-[150%] animate-border-spin content-[''];
  }

  /* Body */
  .card-content {
    @apply absolute left-[1px] top-[1px] h-[calc(100%-2px)] w-[calc(100%-2px)] rounded-2xl bg-gradient-to-b from-slate-800 to-slate-900;
  }
}
```

```
/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      keyframes: {
        'border-spin': {
          '100%': {
            transform: 'rotate(-360deg)',
          },
        },
      },
      animation: {
        'border-spin': 'border-spin 7s linear infinite',
      },
    },
  },
  plugins: [],
}
```

- 항목
    - 오른쪽 상단에 컨테이너의 상태를 표시