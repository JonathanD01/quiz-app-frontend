FROM node:20-alpine3.19 AS first_build

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . /app

RUN npm run build

FROM nginx:1.26.1-alpine

COPY ./nginx/default.conf /etc/nginx/nginx.conf

COPY --from=first_build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]