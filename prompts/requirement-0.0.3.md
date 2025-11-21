# Theme

- **체크박스에 체크된 요소를 적용하라.**
- 정의한 스타일 요소로 Shadcn Components를 다음 tailwindcss 기능을 요소를 선택하여 디자인 하라.

# Style

Neon Lamp

## 'sidebar-inset' Texture
- [x] 최대한 절제하고, 불필요한 노이즈 없이 컬러와 미세한 빛 번짐으로 깊이를 표현하라.
- [ ] 거친 종이 질감과 노이즈를 추가하고 미세한 빛 번즘으로 깊이를 표현하라.

## 'card' Texture
- [x] 카드 표면에는 매우 약한 상향 그라데이션을 적용하여 입체감을 표현한다.

# Tailwindcss features

## Spacing
- padding
- margin

## Typography
- font-family
- font-size
- font-smoothing
- font-style
- font-weight
- font-stretch
- font-variant-numeric
- letter-spacing
- line-clamp
- line-height
- list-style-image
- list-style-position
- list-style-type
- text-align
- color
- text-decoration-line
- text-decoration-color
- text-decoration-style
- text-decoration-thickness
- text-underline-offset
- text-transform
- text-overflow
- text-wrap
- text-indent
- vertical-align
- white-space
- word-break
- overflow-wrap
- hyphens
- content

## Backgrounds
- background-attachment
- background-clip
- background-color
- background-image
- background-origin
- background-position
- background-repeat
- background-size

## Borders
- border-radius
- border-width
- border-color
- border-style
- outline-width
- outline-color
- outline-style
- outline-offset

## Effects
- box-shadow
- text-shadow
- opacity
- mix-blend-mode
- background-blend-mode
- mask-clip
- mask-composite
- mask-image
- mask-mode
- mask-origin
- mask-position
- mask-repeat
- mask-size
- mask-type

## Filters
- filter
- blur
- brightness
- contrast
- drop-shadow
- grayscale
- hue-rotate
- invert
- saturate
- sepia
- backdrop-filter
- blur
- brightness
- contrast
- grayscale
- hue-rotate
- invert
- opacity
- saturate
- sepia

## Transitions & Animation
- transition-property
- transition-behavior
- transition-duration
- transition-timing-function
- transition-delay
- animation

## Transforms
- backface-visibility
- perspective
- perspective-origin
- rotate
- scale
- skew
- transform
- transform-origin
- transform-style
- translate

# 다음 요소 추가 검토

- Decoration elements
- Motion effects
- Gradients (Backgrounds, Typography, Borders)
- Background pattern (8px, *.svg)
- 위,아래 다른 스타일의 중첩 레이어로 배경 디자인

# 입체감

위 스타일에 정의에 맞게 다음 기법을 조합하여 입체감을 표현한다.

1. 그림자(Shadow) 활용
    - Drop Shadow
      shadow-md / shadow-lg → 떠 있는 듯한 효과
      다크 모드에서는 살짝 밝은 shadow-white/5 같은 밝은 그림자도 사용 가능
    - Inset Shadow
      shadow-inner → 안으로 눌린 듯한 효과

2. 그라데이션(Gradient) 배경
    - 배경에 subtle한 linear-gradient 추가
      예: 위쪽은 조금 밝고, 아래쪽은 살짝 어두운 톤 bg-gradient-to-b from-slate-700 to-slate-800 → 빛이 위에서 내려오는 듯한 깊이감

3. 보더(Border) 디테일
    - 이중 보더 효과
      바깥쪽은 어두운 라인 (border-slate-900), 안쪽은 밝은 라인 (border-slate-600) → 입체감과 레이어 구분
    - 하이라이트 보더
      위쪽 보더만 밝게 (border-t border-white/10) 주면 은은한 빛 반사 느낌

4. 글로우 & 라이트 효과
    - 포커스 시 아웃라인 + 글로우
      focus:ring-2 focus:ring-indigo-500/50 → 사용자 시선이 집중되는 입체적 효과
    - 내부 아이콘(돋보기)에 살짝 발광 효과 추가 가능

5. 유리(Glassmorphism) / 뉴모피즘(Neumorphism) 스타일
    - Glassmorphism
      bg-slate-800/70 backdrop-blur → 반투명 유리 같은 깊이감
    - Neumorphism
      shadow-[4px_4px_10px_rgba(0,0,0,0.4),-4px_-4px_10px_rgba(255,255,255,0.05)] → 돌출되거나 눌린 듯한 입체 박스