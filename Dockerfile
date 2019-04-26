FROM node:8 as build

WORKDIR /usr/src/app
COPY package.json ./

RUN npm install

COPY . .
RUN npm run-script build prod

FROM nginx
COPY --from=build /usr/src/app/build /var/www
COPY nginx.conf /etc/nginx/nginx.conf