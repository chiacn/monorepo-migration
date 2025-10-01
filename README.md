# Monorepo Migration & CI/CD

## 프로젝트 개요

#### 1. 기존 개별 프로젝트인 [ next-blog ], [ text-to-diagram ] 프로젝트 nx 모노레포 프로젝트로 통합 (nx import)

- [next-blog](https://chiacn.github.io/gh-pages-next-blog/)
- [text-to-diagram](https://chiacn.github.io/gh-pages-text-diagram/)

#### 2. github action 기반 CI/CD 파이프라인 구축

---

### 1. 모노레포 프로젝트 통합

#### 프로젝트 구성

```
/
├── apps/
│   ├── next-blog/  # <----- (gh-pages 배포)
│   ├── groq-proxy/
│   └── text-to-diagram/ # <-----(gh-pages 배포)
├── libs/
│   └── flow/
│   ...
```

- **`apps/next-blog`**: Next.js 기반 개인 블로그
- **`apps/groq-proxy`**: Cloudflare Worker를 활용하여 외부 Groq API 요청을 처리
- **`apps/text-to-diagram`**: 입력된 텍스트를 LLM으로 분석 후 시각적인 다이어그램을 생성하는 프로젝트

---

### 2. Github action 기반 CI/CD 파이프라인 구축

#### 배포 흐름

1. monorepo migration **main branch** [푸시] →
2. [gh-pages-next-blog], [gh-pages-text-to-diagram] repository에 각각 자동 배포 (gh-pages)
3. Test : cloudflare worker 헬스체크 → 오류 시 재배포

---

#### 파이프라인 구성 (workflow)

```
1. Checkout → 소스 코드 가져오기
2. Cache Restore → node_modules / Nx 캐시 복구
3. Docker Build → 공통 실행 환경 이미지 빌드
4. Nx Build & Export → Next.js 앱 빌드/정적화
5. Worker Verify/Deploy → Cloudflare Worker 헬스체크 및 재배포 (정상 응답 없으면 wrangler로 자동 재배포)
6. GitHub Pages Deploy → 빌드된 정적 사이트를 gh-pages 브랜치로 푸시

```
