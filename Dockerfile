FROM node:22.15.0-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN --mount=type=cache,target=/root/.npm npm install

COPY . .
RUN npm run build

FROM nginx:stable-alpine

WORKDIR /usr/share/nginx/html
COPY --from=builder /app/dist .

WORKDIR /etc/nginx/conf.d
COPY nginx.conf default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]