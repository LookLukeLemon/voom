# Base on offical NGINX Alpine image
FROM nginx:alpine

# Remove any existing config files
RUN rm /etc/nginx/conf.d/*

RUN apk add --update curl && \
    rm -rf /var/cache/apk/*
# Copy config files
# *.conf files in conf.d/ dir get included in main config
COPY ./nginx/default.conf /etc/nginx/conf.d/

# Launch NGINX
CMD [ "nginx", "-g", "daemon off;" ]    