# FROM node:current-alpine3.19

# WORKDIR /app

# COPY . .

# RUN npm i --production

# RUN npm run build

# ENTRYPOINT npm run start
FROM node:current-alpine3.19 as builder
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:current-alpine3.19 as runner

WORKDIR /app

COPY --from=builder /app/package.json .
COPY --from=builder /app/package-lock.json .
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

ENTRYPOINT node server.js