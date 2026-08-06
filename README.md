# Interactive Guidebook

모던 웹 인터랙션과 애니메이션을 위한 컴포넌트 라이브러리 및 가이드북입니다. Framer Motion, GSAP, Tailwind CSS를 활용하여 다양한 인터랙티브 요소들을 구현하고 문서화했습니다.

## 🚀 주요 기능

### Typography (타이포그래피)

- **타이핑 텍스트**: 자연스러운 타이핑 애니메이션
- **스크램블 텍스트**: 문자가 랜덤하게 섞이며 나타나는 효과
- **마그네틱 텍스트**: 마우스에 반응하는 마그네틱 텍스트
- **등장 텍스트**: 한 글자씩 등장하는 텍스트
- **글리치 텍스트**: 글리치(Glitch) 스타일의 텍스트 애니메이션
- **모프링 텍스트**: 모프링(Morphing) 스타일의 텍스트 애니메이션
- **스크롤 마퀴 텍스트**: 스크롤 마크리(Scroll Marquee) 스타일의 텍스트 애니메이션
- **스크롤 트리거 텍스트**: 스크롤에 반응하는 텍스트
- **클립 텍스트**: 클립 효과가 적용된 텍스트
- **3D 텍스트**: 깊이감 있는 그림자와 회전 효과의 3D 텍스트
- **물감 채우기 텍스트**: 물감이 채워지는 듯한 텍스트 효과

### Interaction (인터랙션)

- **틸트 카드**: 마우스 움직임에 반응하는 3D 카드
- **패럴럭스 이미지**: 스크롤에 따라 움직이는 패럴럭스 이미지
- **스크롤 줌 배경**: 스크롤에 따라 배경이 줌 인/아웃 되는 효과
- **스티키 축소 효과**: 스크롤에 따라 섹션이 축소되는 효과
- **스크롤 포트폴리오 카드**: 세로 스크롤로 가로 카드가 슬라이드되는 효과
- **스티키 스택 섹션**: 스크롤 시 섹션들이 상단에 고정되며 스택되는 효과
- **다이나믹 아일랜드**: iOS Dynamic Island 스타일의 확장 가능한 인터랙티브 컴포넌트

### Cursor (커서)

- **커스텀 이미지 커서**: 텍스트에 호버 시 이미지가 나타나는 효과
- **오버레이 커서**: 오버레이 형태의 커스텀 커서
- **마그네틱 커서**: 마그네틱 효과가 적용된 커서

### Background (배경)

- **노이즈 그레인 배경**: 노이즈 그레인 텍스처가 적용된 배경 효과
- **도트 그리드 배경**: 도트 그리드 패턴의 인터랙티브 배경

### Card (카드)

- **글래스모피즘 카드**: 유리 질감(Glassmorphism)의 반투명 카드

## 🛠️ 기술 스택

- **Framework**: Next.js 15.3.8 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animation**: Framer Motion, GSAP
- **Testing**: Jest, React Testing Library
- **UI Components**: Material-UI (MUI)
- **Code Highlighting**: React Syntax Highlighter

## 📦 설치 및 실행

### 필수 요구사항

- Node.js 18.0.0 이상
- npm, yarn, pnpm 또는 bun

### 설치

```bash
# 의존성 설치
npm install
# 또는
yarn install
# 또는
pnpm install
# 또는
bun install
```

### 개발 서버 실행

```bash
# 개발 서버 시작
npm run dev
# 또는
yarn dev
# 또는
pnpm dev
# 또는
bun dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

### 빌드 및 배포

```bash
# 프로덕션 빌드
npm run build

# 프로덕션 서버 시작
npm run start

# 린트 검사
npm run lint

# 테스트 실행
npm run test

# 테스트 감시 모드
npm run test:watch
```

## 📁 프로젝트 구조

```
interactive-guidebook/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── docs/              # 문서 페이지
│   │   │   ├── typography/    # 타이포그래피 컴포넌트 문서
│   │   │   ├── interaction/   # 인터랙션 컴포넌트 문서
│   │   │   ├── cursor/        # 커서 컴포넌트 문서
│   │   │   ├── background/    # 배경 컴포넌트 문서
│   │   │   ├── card/          # 카드 컴포넌트 문서
│   │   │   └── components/    # 문서 공통 컴포넌트
│   │   ├── playground/        # 플레이그라운드
│   │   └── globals.css        # 전역 스타일
│   ├── components/            # 재사용 가능한 컴포넌트
│   │   └── common/           # 공통 컴포넌트
│   │       ├── docs-controls/ # 문서 데모 컨트롤 UI
│   │       ├── effects/      # 효과 컴포넌트
│   │       └── framer-motion/ # Framer Motion 컴포넌트
│   │           ├── background/ # 배경 관련 컴포넌트
│   │           ├── card/     # 카드 관련 컴포넌트
│   │           ├── cursor/   # 커서 관련 컴포넌트
│   │           └── typography/ # 타이포그래피 컴포넌트
│   ├── hooks/                # 커스텀 훅
│   ├── types/                # TypeScript 타입 정의
│   ├── utils/                # 유틸리티 함수
│   ├── data/                 # 샘플 데이터
│   ├── constants/            # 상수 정의
│   └── styles/               # 스타일 관련 모듈
└── public/                   # 정적 파일
```

## 🎨 디자인 시스템

Tailwind CSS v4의 CSS-first 방식을 사용하며, 디자인 토큰은 별도 설정 파일 없이 `src/app/globals.css`의 `@theme` 블록에서 정의합니다.

### 색상

- **Background**: `#171717` (다크 배경)
- **Foreground**: `#fff` (기본 텍스트)

### 폰트

- **Sans**: Pretendard (기본 폰트, 시스템 폰트 폴백 포함)

### 반응형 브레이크포인트

Tailwind CSS v4 기본 브레이크포인트(`sm` 640px ~ `2xl` 1536px)를 사용합니다.

## 🔧 개발 가이드라인

### 스타일링

- Tailwind CSS v4 사용
- 모바일 - 태블릿 - PC 순으로 반응형 고려
- GSAP, Framer Motion, SVG 적극 활용
- 스티키 섹션 사용 시 부모 요소에 `overflow-hidden` 금지

### Next.js

- `useState`, `useEffect` 사용 시 'use client' 명시
- 문서 페이지(`page.tsx`)는 인터랙티브 데모 특성상 대부분 클라이언트 컴포넌트('use client')로 작성됨. 인터랙션이 없는 페이지는 서버 컴포넌트 유지
- `window` 속성 사용 전 타입 체크 필수

### 폴더 구조

- `src/app/docs`: 개발한 컴포넌트의 문서 작성
- `src/components`: 컴포넌트 폴더
- `src/components/common`: 공용 컴포넌트

## 🧪 테스트

프로젝트는 Jest와 React Testing Library를 사용하여 테스트를 작성합니다.

```bash
# 모든 테스트 실행
npm run test

# 테스트 감시 모드
npm run test:watch
```

## 📚 문서

각 컴포넌트의 상세한 사용법과 예제는 `/docs` 경로에서 확인할 수 있습니다.

- **Typography**: `/docs/typography/[component-name]`
- **Interaction**: `/docs/interaction/[component-name]`
- **Cursor**: `/docs/cursor/[component-name]`
- **Background**: `/docs/background/[component-name]`
- **Card**: `/docs/card/[component-name]`

## 🤝 기여하기

1. 이 저장소를 포크합니다
2. 새로운 기능 브랜치를 생성합니다 (`git checkout -b feature/amazing-feature`)
3. 변경사항을 커밋합니다 (`git commit -m 'Add some amazing feature'`)
4. 브랜치에 푸시합니다 (`git push origin feature/amazing-feature`)
5. Pull Request를 생성합니다

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

## 🔗 관련 링크

- [Next.js Documentation](https://nextjs.org/docs)
- [Framer Motion Documentation](https://www.framer.com/motion/)
- [GSAP Documentation](https://greensock.com/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
