FROM node:18 AS build
WORKDIR /app
COPY visioncheck-frontend/package.json visioncheck-frontend/package-lock.json visioncheck-frontend/
WORKDIR /app/visioncheck-frontend
RUN npm install
RUN npm run build:web

FROM nginx:alpine
COPY --from=build /app/visioncheck-frontend/dist /usr/share/nginx/html
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
