FROM nginx:1.24.0

LABEL maintainer=FrankDong

WORKDIR /usr/src/app/

COPY ./docker/nginx.conf /etc/nginx/nginx.conf

COPY ./docs-dist /usr/share/nginx/html/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]