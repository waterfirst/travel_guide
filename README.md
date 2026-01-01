# 경기도 월간 여행 가이드 🗺️

Plan - Generator - Healer 방식으로 개발된 경기도 여행 추천 웹 애플리케이션입니다.
**매월 자동으로 새로운 여행지가 업데이트됩니다!**

## 🌟 주요 기능

### 4가지 여행 타입
1. **퇴근 후 불멍** - 친구 2-3명과 당일치기 불멍 코스 (5개)
2. **부모님과 온천** - 당일치기 효도 온천 코스 (5개)
3. **1박2일 온천 힐링** - 온천과 휴식 중심 힐링 여행 (5개)
4. **혼자 드라이브** - 자차로 떠나는 자유로운 드라이브 (5개)

### 제공 정보
- 📍 상세한 여행 일정 및 경로
- 💰 항목별 예상 비용 계산
- 🍽️ 코스 근처 맛집 추천
- 🏨 숙박 시설 정보 (1박2일 코스)
- 🌤️ 날씨 기반 코스 추천
- 📷 실제 여행지 이미지 (Unsplash)

## 🔄 자동 업데이트

**매월 1일 00:00 UTC (한국시간 09:00)에 Gemini API를 사용하여 새로운 여행 코스가 자동 생성됩니다!**

- GitHub Actions를 통한 완전 자동화
- 계절과 월별 날씨에 맞는 여행지 추천
- 실제 경기도 지역 기반 데이터

### 수동 업데이트 방법

```bash
# 스크립트 디렉토리로 이동
cd scripts

# Gemini API 의존성 설치
npm install @google/generative-ai

# 환경변수 설정 (Windows)
set GOOGLE_API_KEY=your_api_key_here

# 환경변수 설정 (Mac/Linux)
export GOOGLE_API_KEY=your_api_key_here

# 여행지 생성 스크립트 실행
node generate-monthly-courses.js
```

## 🚀 데모

웹사이트: [https://waterfirst.github.io/travel_guide/](https://waterfirst.github.io/travel_guide/)

## 📊 프로젝트 구조

```
travel_guide/
├── .github/
│   └── workflows/
│       ├── deploy.yml           # 배포 자동화
│       └── monthly-update.yml   # 매월 자동 업데이트
├── frontend/                    # React + TypeScript + Vite
│   ├── src/
│   │   ├── components/         # UI 컴포넌트
│   │   ├── pages/              # 페이지 컴포넌트
│   │   ├── types/              # TypeScript 타입 정의
│   │   └── App.tsx             # 메인 앱
│   └── dist/                   # 빌드 결과물
├── scripts/                     # 자동화 스크립트
│   └── generate-monthly-courses.js  # Gemini API로 여행지 생성
├── data/                        # 여행 코스 데이터
│   ├── courses.json            # 20개 여행 코스
│   ├── restaurants.json        # 맛집 정보
│   └── accommodations.json     # 숙박 정보
└── docs/                        # 문서
```

## 🛠️ 기술 스택

### Frontend
- React 19
- TypeScript 5
- Vite 7
- Tailwind CSS 4

### Automation
- Gemini 1.5 Flash API (월간 여행지 자동 생성)
- GitHub Actions (CI/CD)

### 배포
- GitHub Pages
- 자동 배포 (main 브랜치 푸시 시)

## 💻 로컬 개발

### 사전 요구사항
- Node.js 20+
- npm

### 설치 및 실행

```bash
# 저장소 클론
git clone https://github.com/waterfirst/travel_guide.git
cd travel_guide

# 프론트엔드 의존성 설치
cd frontend
npm install

# 개발 서버 실행
npm run dev
```

브라우저에서 `http://localhost:3000` 접속

### 빌드

```bash
cd frontend
npm run build
```

## 📝 개발 방법론

이 프로젝트는 **Plan - Generator - Healer** 방식으로 개발되었습니다:

1. **Plan (계획)**: 프로젝트 요구사항 분석 및 아키텍처 설계
2. **Generator (생성)**: Gemini API를 활용한 데이터 자동 생성
3. **Healer (치료)**: 자동화된 워크플로우를 통한 검증 및 배포

## 🗓️ 월간 업데이트 프로세스

1. **매월 1일 00:00 UTC** - GitHub Actions 트리거
2. **Gemini API 호출** - 현재 월에 적합한 여행지 생성
3. **데이터 검증** - JSON 형식 및 필수 필드 확인
4. **자동 커밋 & 푸시** - git commit 및 push
5. **자동 배포** - GitHub Pages에 배포

## 🔐 보안

- **GOOGLE_API_KEY는 GitHub Secrets에 안전하게 저장**
- 소스코드에는 절대 포함되지 않음
- GitHub Actions에서만 접근 가능

### Secrets 설정 방법

1. GitHub 저장소 → Settings
2. Secrets and variables → Actions
3. New repository secret
4. Name: `GOOGLE_API_KEY`
5. Value: 실제 Gemini API 키 입력

## 📁 데이터 구조

### 여행 코스 (Course)
```typescript
interface Course {
  id: string;
  type: 'bonfire' | 'spa-day' | 'spa-overnight' | 'solo-drive';
  title: string;
  description: string;
  thumbnail: string;  // Unsplash 이미지 URL
  duration: string;
  distance: number;
  estimatedCost: { min: number; max: number };
  itinerary: Itinerary[];
  restaurants: string[];
  accommodations?: string[];
  bestWeather: string[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
}
```

## 🚢 배포

### 자동 배포
- `main` 브랜치에 push 시 자동으로 GitHub Pages에 배포
- 배포 URL: [https://waterfirst.github.io/travel_guide](https://playwrite-test-nu.vercel.app/)/

### 수동 배포
```bash
cd frontend
npm run build
git add dist
git commit -m "Build: 수동 배포"
git push origin main
```

## 📄 라이선스

ISC

## 👥 기여자

- Claude Code Agent (개발)
- Gemini API (월간 여행지 자동 생성)

## 📞 문의

프로젝트에 대한 문의사항이 있으시면 Issues를 통해 연락 주세요.

---

**Made with ❤️ using Plan - Generator - Healer methodology + Gemini API**
