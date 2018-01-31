FROM kyma/docker-nginx
ADD /dist /var/www/dist
ADD index.html /var/www
