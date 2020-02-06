# stage 1
FROM node:latest as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm audt fix
RUN npm run build --prod

# stage 2
FROM nginx:stable-alpine
COPY --from=node /app/dist/inventory-assets /usr/share/nginx/html