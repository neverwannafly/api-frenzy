FROM nginx:latest

COPY ./reverse-proxy.conf /etc/nginx/conf.d/reverse-proxy.conf
EXPOSE 8000
STOPSIGNAL SIGTERM
CMD ["nginx", "-g", "daemon off;"]
