FROM ubuntu:24.04

RUN sed -i 's/http:\/\/archive.ubuntu.com/http:\/\/mirrors.tuna.tsinghua.edu.cn/g' /etc/apt/sources.list.d/ubuntu.sources && \
    apt update && \
    apt -y install locales && echo "zh_CN.GB18030 GB18030" > /etc/locale.gen && locale-gen && \
    apt -y install tzdata && ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && \
    apt -y install curl zip && curl -fsSL https://bun.sh/install | bash

# ldd /root/.cache/puppeteer/chrome/linux-131.0.6778.108/chrome-linux64/chrome | grep not

RUN apt -y install \
  libnss3 \
  libatk1.0-0 \
  libatk-bridge2.0-0 \
  libcairo2 \
  libglib2.0-0t64 \
  libcups2 \
  libdbus-1-3 \
  libxcomposite1 \
  libxdamage1 \
  libpango-1.0-0 \
  libasound2t64 \
  libxfixes3 \
  libxrandr2 \
  libdrm2 \
  libxrandr2 \
  libgbm1 \
  libxkbcommon0

ENV PATH="/root/.bun/bin:${PATH}"
 
WORKDIR /app

COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile

COPY . .

ENV NODE_ENV=production

ENTRYPOINT [ "bun", "run", "scripts/fetchTimeline.ts" ]
