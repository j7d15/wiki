---
slug: docker
title: Installer et utiliser Docker
date: 2024-06-24T00:12
authors: admin
tags: [Docker]
description: Docker est un outil qui peut empaqueter une application et ses dépendances dans un conteneur isolé, qui pourra être exécuté sur n'importe quel serveur.
keywords: [Docker]
---

Docker est une plateforme permettant de lancer certaines applications dans des **conteneurs logiciels**.
<!--truncate-->
Docker est un outil qui peut **empaqueter une application et ses dépendances dans un conteneur isolé**, qui pourra être exécuté sur n'importe quel serveur. Il ne s'agit pas de virtualisation, mais de conteneurisation, une forme plus légère qui s'appuie sur certaines parties de la machine hôte pour son fonctionnement.

Un conteneur Docker, à l'opposé de machines virtuelles traditionnelles, ne requiert aucun système d'exploitation séparé et n'en fournit aucun. Il s'appuie plutôt sur les fonctionnalités du noyau et utilise l'isolation de ressources (comme le processeur, la mémoire, les entrées et sorties et les connexions réseau) ainsi que des espaces de noms séparés pour isoler le système d'exploitation tel que vu par l'application.

**L'objectif d'un conteneur est le même que pour un serveur dédié virtuel** : héberger des services sur un même serveur physique tout en les isolant les uns des autres. Un conteneur est cependant moins figé qu'une machine virtuelle en matière de taille de disque et de ressources allouées.

**Un conteneur permet d'isoler chaque service** : le serveur web, la base de données, des applications pouvant être exécutées de façon indépendante dans leur conteneur dédié, contenant uniquement les dépendances nécessaires. Chaque conteneur peut être relié aux autres par des réseaux virtuels.

:::success Machine virtuelle vs conteneur
Une machine virtuelle s’apparente à un système d’exploitation complet, d’une taille de plusieurs gigaoctets, permettant le partitionnement des ressources d’une infrastructure. Un conteneur délivre uniquement les ressources nécessaires à une application.

Le conteneur partage le kernel de son OS avec d’autres conteneurs. C’est une différence avec une machine virtuelle, utilisant un hyperviseur pour distribuer les ressources hardware (contrairement à un hyperviseur, un moteur de conteneur n’a pas besoin d’émuler un système d’exploitation complet.).
:::

## WSL et virtualisation

### WSL

[`wsl --install`](https://learn.microsoft.com/fr-fr/windows/wsl/install)

### Installer Docker

[Installation](https://docs.docker.com/desktop/install/windows-install/)

## Terminologie

**Registre** : Serveur ou sont stocké les multiple images

**Image** : C'est un modèle en lecture seule, utiliser pour créer des conteneurs Docker. Elle est composée de plusieurs couches empaquetant toutes les installations, dépendances, bibliothèques, processus et codes d’application nécessaires pour un environnement de conteneur pleinement opérationnel.

**Conteneur** : Instance d'une image en cours d'utilisation. En lançant un conteneur, on ajoute une couche inscriptible sur l’image. Ceci permet de stocker tous les changements apportés au conteneur durant le runtime.

## Commandes de bases

* `docker -v` : Version de docker engine installée

[Lien vers la documentation.](https://docs.docker.com/)

[Lien registre.](https://hub.docker.com/search?image_filter=official&q=)

### Lister images et conteneurs

* `docker ps` ou `docker container ls` : [Affiche tous les conteneurs démarrés](https://docs.docker.com/engine/reference/commandline/container_ls/)
    * `docker ps -a` : Affiche tous les conteneurs (conteneurs lancés puis stoppés apparaitront)
* `docker image ls` : Affiche toutes les images

### Démarrer stopper et nettoyer conteneurs/images

* `docker pull nomimage` : Récupérer une image depuis le registre
* `docker image rm identifiantdelimage` : Supprimer une image en utilisant son ID (ID trouvable en faisant `docker image ls`)

* `docker run nomimage` : Execute une image
    * `docker run -p 127.0.0.1:8080:80/tcp nomimage` : [Redirige le port 80 vers le port 8080 pour accéder au conteneur en tcp](https://docs.docker.com/engine/reference/commandline/container_run/#publish)
    * `docker --name nom_donner -d run -p 127.0.0.1:8080:80/tcp nomimage` : Execute une image avec le nom : nom_donner
    * `docker run --name nom_donner -it nomimage` : Remplace le terminal courant par celui de la machine virtuelle
    * `docker run -it --name nom_donner -p 8080:80 -v /root/site/:/var/www/html/ php:apache` : Créer un conteneur basé sur l'image php:apache en liant le port du conteneur 80 sur le port 8080 de notre machine et en liant le dossier /root/site/ de notre machine au dossier /var/www/html/ du container
* `docker start nomcontainer` : Redemarrer un conteneur qui a déja été utilisé mais éteint
    * `docker attach nomcontainer` : Remplace le terminal courant par celui de la machine virtuelle
* `docker stop nom_donner` : Arrete l'execution d'un conteneur en utilisant son nom
* `docker rm nom_donner` : Supprimer un conteneur en utilisant son nom

### Bonus
* `docker exec -it nomcontainer nomcommande` : Execute une commande sur un container et affiche le résultat dans ce terminal (n'ouvre pas le terminal du container)

## Docker-compose

Créer un ficher `docker-compose.yaml` et un dossier nommé php dans un dossier vide.

```yaml title="docker-compose.yaml"
version: '3.8' # Version de compose utilisé

services:
    php: # Alias
        image: php:8.2-apache # On utilise un tag de l'image php trouvable dans le registre https://hub.docker.com/_/php/tags?page=1&name=apache (contient linux apache et php)
        container_name: php82 # Donne un nom au container
        ports:
            - 8000:80 # Regroupe sur le port 8000 ce qui par défaut se lance sur le port 80
        volumes: ./php:/var/www/html # Root le dossier php qui est au même niveau que le fichier docker-compose.yaml sur le dossier /var/www/html du container qui sert a apache a mettre des fichiers en lignes
        build:
            context: .
            dockerfile: Dockerfile # Chemin vers le fichier de configuration voir ci dessous
    db:
        image: mysql:8.0
        container_name: mysql8
        command: --default-authentification-plugin=mysql_native_password
        environment:
            MYSQL_ROOT_PASSWORD=pass
            MYSQL_DATABASE=demo
            MYSQL_USER=test
            MYSQL_PASSWORD=pass
        ports:
            - 3307:3306
    phpma:
        image: phpmyadmin/phpmyadmin
        container_name: phpmyadmin
        environment:
            PMA_ARBITRARY: 1
            PMA_HOST: db
            PMA_USER: root
            PMA_PÄSSWORD: pass
            UPLOAD_LIMIT: 20M
        ports:
            - 8899:80    
```

Créer un ficher `docker-compose.yaml` et un dossier nommé app dans un dossier vide. Dans le dossier app on fait un npm i de express et pg

Ajouter au meme niveau que le fichier `docker-compose.yaml` un fichier `.dockerignore` contenant une seule ligne : /node_modules

```yaml title="Exemple 2 : docker-compose.yaml"
version: '3.8'

services:
    web:
        build: .
        command: npm run start
        ports:
            - "3000:3000"
        depends_on:
            - postgres
        environment:
            DATABASE_URL: postgres://dbuser:dbpass@postgres/dbdemo
    postgres:
        image: postgres:16
        environment:
            POSTGRES_USER: dbuser
            POSTGRES_PASSWORD: dbpass
            POSTGRES_DB: dbdemo
```

* `docker-compose up` : Lecture du fichier docker-compose.yaml et execution des instructions
    * `docker-compose up -d` : Lecture du fichier docker-compose.yaml et execution des instructions (-d permet de detacher et de lancer le container en tache de fond)
* `docker-compose stop` : Stop le conteneur lancé
* `docker-compose down` : Stop le conteneur lancé (attention supprimera les données du projet)

```yaml title="Exemple 3 : docker-compose.yaml"
# ne necessite pas de dockerfile
version: '3'
services:
 web:
   image: wordpress:4.6
   depends_on:
    - mysql
   environment:
    - WORDPRESS_DB_HOST=mysql:3306
    - WORDPRESS_DB_USER=root
    - WORDPRESS_DB_PASSWORD=root
    - WORDPRESS_DB_NAME=wordpress
   ports:
    - 8080:80
   volumes:
    - ./plugins/:/var/www/html/wp-content/plugins/
   networks:
     vulnetwork:
       ipv4_address: 10.7.0.5
   container_name: wordpress
 mysql:
   image: mysql:5
   environment:
    - MYSQL_ROOT_PASSWORD=root
   networks:
     vulnetwork:
       ipv4_address: 10.7.0.4
   container_name: mysql
 metasploit:
   image: metasploitframework/metasploit-framework:latest
   environment:
    DATABASE_URL: postgres://postgres@db:5432/msf?pool=200&timeout=5
   links:
    - db
   ports:
    - 4444:4444
   tty: true
   stdin_open: true
   networks:
     vulnetwork:
       ipv4_address: 10.7.0.3
   container_name: metasploit
 db:
   image: postgres:10-alpine
   volumes:
    - pg_data:/var/lib/postgresql/data
   environment:
    POSTGRES_HOST_AUTH_METHOD: trust
   networks:
     vulnetwork:
       ipv4_address: 10.7.0.2
   container_name: db

volumes:
 pg_data:
   driver: local
networks:
  vulnetwork:
    driver: bridge
    ipam:
      config:
        - subnet: 10.7.0.0/16
          gateway: 10.7.0.1
```

## Dockerfile

Le dockerfile est un **fichier de commandes**.

Créer un ficher `Dockerfile` au même niveau que le fichier `docker-compose.yaml`.

``` title="Dockerfile"
FROM php:8.2-apache # Image sur laquelle on veut faire la configuration

RUN apt-get update && apt-get upgrade -y # Mise a jours de linux
RUN docker-php-ext-install mysqli pdo pdo_mysql && docker-php-ext-enable mysqli pdo_mysql # Installer et activer les extension PHP nommées mysql et pdo

EXPOSE 80 # Indique le port à exposer
```

``` title="Exemple 2 : Dockerfile"
FROM node:21

WORKDIR /usr/src/app

COPY ./app/package.json ./

RUN npm i

COPY ./app .

EXPOSE 3000
```

* `docker build -t demo/demo` : Va créer une image en se basant sur le Dockerfile présent ou pointe le terminal



