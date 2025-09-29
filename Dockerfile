FROM node:20-bookworm-slim
RUN apt-get update && apt-get install -y --no-install-recommends \
    git ca-certificates openssh-client \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /workspace
COPY package.json package-lock.json ./
RUN npm ci

# wrangler 사용을 위한 설치
RUN npm i -g wrangler@latest

# nx - project.json에서 설정한 target(ex. nx build)의 명령어로 산출된 값들을 캐싱목적으로 저장.
# 이 폴더를 docker 컨테이너 상에서 /workspace/.nx-cache로 고정 - 추후 action/caches 등으로 이용
ENV NX_CACHE_DIRECTORY=/workspace/.nx-cache