FROM node:18 AS build
WORKDIR /app
COPY frontend/package.json frontend/package-lock.json frontend/
WORKDIR /app/frontend
RUN npm install
RUN npm run build:web

FROM nginx:alpine
COPY --from=build /app/frontend/dist /usr/share/nginx/html
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
