FROM nginx:alpine
COPY default.conf /etc/nginx/conf.d/default.conf
COPY --from=frontend /usr/share/nginx/html /usr/share/nginx/html
