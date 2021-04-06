#Stage 0: Construcción de estáticos para ser utilizados en nginx

ARG image=node:15.13.0-alpine3.13
FROM ${image} as builder

WORKDIR /app

COPY package*.json .

RUN npm install --production

COPY . .

RUN npm run build

#Stage 1 : LLevar los archivos estáticos para ser utilizados por nginx.
FROM nginx:1.19.9-alpine

EXPOSE 80
COPY --from=builder /app/build/ /usr/share/nginx/html