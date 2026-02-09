FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .

ARG VITE_API_URL=https://incode-test-backend-production.up.railway.app
ENV VITE_API_URL=${VITE_API_URL}

RUN echo "Building with API URL: $VITE_API_URL"
RUN npm run build
RUN ls -la dist/ && echo "Build complete"

FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/dist /usr/share/nginx/html

RUN ls -la /usr/share/nginx/html/ && echo "Files copied to nginx"

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]