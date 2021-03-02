---
title: Symfony 5.2 & PHP 8 sous Docker en 5 minutes
img: https://res.cloudinary.com/practicaldev/image/fetch/s--FQKPl2W2--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://thepracticaldev.s3.amazonaws.com/i/0ipvap7rri2p55pjk6d7.jpg
alt: nice image
author: 
  name: Damien
  bio: Freelance Developer Medium
  img: https://miro.medium.com/fit/c/680/680/1*8E5XkMm217nI5RHc9yvumg.jpeg
tags: 
  - docker
---

![Image for post](https://miro.medium.com/max/60/1*EsbQttoYgkeudt4uxBjzLg.png?q=20)

![Image for post](https://miro.medium.com/max/1420/1*EsbQttoYgkeudt4uxBjzLg.png)

Docker / Symfony 5.2 / PHP 8

Prérequis
=========

-   Docker sur sa machine ([Mac](https://docs.docker.com/docker-for-mac/install/), [Ubuntu](https://docs.docker.com/engine/install/ubuntu/), [Windows](https://docs.docker.com/docker-for-windows/install/))
-   Docker-compose <https://docs.docker.com/compose/install/>

Etape 1: Création de l'arborescence du projet
=============================================

L'idée est de séparer la partie "infrastructure" que représente le sous ensemble (Nginx, PHP8 et Docker) de la partie applicative qui est Symfony.

On commence par créer quelques répertoires dont on va avoir besoin pour notre projet.
````
mkdir ~/demo-symfony-php8 && cd ~/demo-symfony-php8
mkdir infra && mkdir infra/php && mkdir infra/nginx && mkdir infra/logs && mkdir infra/logs/nginx
mkdir symfony
````
Si tout se passe bien, à la fin du tuto vous devriez vous retrouver avec l'arborescence suivante

![Arborescence du projet à la fin du tutoriel](https://miro.medium.com/max/28/1*cdxvE6JX8vHMqRbBLyziCg.png?q=20)

![Arborescence du projet à la fin du tutoriel](https://miro.medium.com/max/226/1*cdxvE6JX8vHMqRbBLyziCg.png)

Etape 2: PHP 8
==============

On se place dans le répertoire infra/php pour créer le Dockerfile.\
Il a pour but de faire tourner un container sur PHP8 en RC3, la toute dernière version à ce jour.\
On y ajoute composer, qui va nous permettre de récupérer Symfony plus tard.
````
cd ~/demo-symfony-php8/infra/php\
vim Dockerfile
````
Contenu du Dockerfile:
````
FROM php:8.0.0RC3-fpm-alpine
RUN apk --update --no-cache add git
RUN docker-php-ext-install pdo_mysql
COPY --from=composer /usr/bin/composer /usr/bin/composer
WORKDIR /var/www
CMD composer install ;  php-fpm
EXPOSE 9000

````

Etape 3: Nginx
==============

On se place ensuite dans le repertoire infra/nginx pour y configurer notre serveur à l'aide des 2 fichiers:

Le **Dockerfile** pour faire tourner Nginx sur sa version Alpine

````
cd ~/demo-symfony-php8/infra/nginx\
vim Dockerfile
````

````
FROM nginx:alpine
WORKDIR /var/www
CMD ["nginx"]
EXPOSE 80
````
Le fichier **nginx.conf** pour configurer notre serveur Nginx

````
vim nginx.conf
````
````
user nginx;
worker_processes  4;
daemon off;

error_log  /var/log/nginx/error.log warn;
pid        /var/run/nginx.pid;

events {
    worker_connections  1024;
}

http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;
    access_log  /var/log/nginx/access.log;
    sendfile        on;
    keepalive_timeout  65;

    server {
        listen 80 default_server;
        listen [::]:80 default_server ipv6only=on;

        server_name localhost;
        root /var/www/public;
        index index.php index.html index.htm;

        location / {
            try_files $uri $uri/ /index.php$is_args$args;
        }

        location ~ \.php$ {
            try_files $uri /index.php =404;
            fastcgi_pass php-fpm:9000;
            fastcgi_index index.php;
            fastcgi_buffers 16 16k;
            fastcgi_buffer_size 32k;
            fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
            fastcgi_read_timeout 600;
            include fastcgi_params;
        }

        location ~ /\.ht {
            deny all;
        }
    }
}
````

Etape 4: Création du docker-compose et du .env
==============================================

On se place dans le répertoire "infra" et on créer le fichier .env pour ajouter quelques variables d'environnement, que l'on utilisera à travers le docker-compose (principalement pour configurer Symfony ).

````
cd ~/demo-symfony-php8/infra\
vim .env
````

````
APP_FOLDER=../symfony
APP_ENV=dev
APP_SECRET=24e17c47430bd2044a61c131c1cf6990
````

On créer ensuite le fichier docker-compose.yml, pour réunir et configurer nos 2 containers.
````
vim docker-compose.yml
````

````
version: '3'

services:
    php:
        container_name: "php-fpm"
        build:
            context: ./php
        environment:
            - APP_ENV=${APP_ENV}
            - APP_SECRET=${APP_SECRET}
        volumes:
            - ${APP_FOLDER}:/var/www

    nginx:
        container_name: "nginx"
        build:
            context: ./nginx
        volumes:
            - ${APP_FOLDER}:/var/www
            - ./nginx/nginx.conf:/etc/nginx/nginx.conf
            - ./logs:/var/log
        depends_on:
            - php
        ports:
            - "80:80"
````
docker-compose.yml

A ce stade, il ne nous reste plus qu'à construire nos images et tout allumer en executant la commande suivante. Cette commande doit être exécutée dans le repertoire où se trouve le fichier *docker-compose.yml*

````
docker-compose up -d --build
````

![Image for post](https://miro.medium.com/max/60/1*WsuR5ZKvNsHWPD3xKMA4oQ.png?q=20)

![Image for post](https://miro.medium.com/max/488/1*WsuR5ZKvNsHWPD3xKMA4oQ.png)

````
docker-compose up -d
````

Si tout se passe bien, à la fin vous devriez avoir 2 containers en cours d'execution

![Image for post](https://miro.medium.com/max/60/1*Eoos8Xs1P1ThZG2py2XR4A.png?q=20)

![Image for post](https://miro.medium.com/max/568/1*Eoos8Xs1P1ThZG2py2XR4A.png)

docker-compose ps

Etape 5: Symfony 5
==================

Récupérerons maintenant les sources du projet Symfony.\
Souvenez-vous, dans la configuration du container php du fichier docker-compose.yml, nous avons partagé le volume pour que le repertoire symfony de notre projet pointe dans /var/www du container php.

![Image for post](https://miro.medium.com/max/60/1*VEe1JceAYGyq1n0YZc6nsg.png?q=20)

![Image for post](https://miro.medium.com/max/332/1*VEe1JceAYGyq1n0YZc6nsg.png)

Composer étant installé sur ce container, il ne reste plus qu'à lancer la commande suivante à l'interieur du container PHP pour installer Symfony dans sa version 5.2 supportant PHP8.\
Ici on installe la version light de Symfony, correspondant plutôt à une application console ou API.\
**Attention, cette version est en développement, elle n'est pas du tout faite pour être utilisé pour démarrer un projet.**

````
docker-compose run php composer create-project symfony/skeleton:"5.2.x@dev" .
````

![Image for post](https://miro.medium.com/max/58/1*U0vgdIRQvKH5pwlcDhLCpA.png?q=20)

![Image for post](https://miro.medium.com/max/411/1*U0vgdIRQvKH5pwlcDhLCpA.png)

docker-compose run php bin/console about

And voila ! En ouvrant votre navigateur sur <http://localhost/> vous devriez voir la homepage Symfony

![Image for post](https://miro.medium.com/max/60/1*HoMzHzygP1dpVi2l6X9fqw.png?q=20)

![Image for post](https://miro.medium.com/max/1042/1*HoMzHzygP1dpVi2l6X9fqw.png)

Les sources du projet [**https://github.com/drochette/symfony5.2-php8**](https://github.com/drochette/symfony5.2-php8)