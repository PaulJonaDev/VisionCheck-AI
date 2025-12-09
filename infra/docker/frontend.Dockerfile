FROM node:18 AS build
WORKDIR /app
COPY VisionCheckAI/package.json VisionCheckAI/package-lock.json VisionCheckAI/
WORKDIR /app/VisionCheckAI
RUN npm install
RUN npm run build:web

FROM nginx:alpine
COPY --from=build /app/VisionCheckAI/dist /usr/share/nginx/html
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]

