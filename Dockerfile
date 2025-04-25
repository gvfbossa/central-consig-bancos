FROM node:20 AS builder

WORKDIR /app

RUN npm install -g @angular/cli

COPY package*.json ./
RUN npm install --legacy-peer-deps --force

COPY . .
RUN ng build --base-href / --output-path=dist

FROM nginx:alpine

COPY --from=builder /app/dist/ /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
