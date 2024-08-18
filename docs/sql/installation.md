---
sidebar_position: 2
title: Installation
---

Le SQL est un langage il n'est pas nécessaire de l'installer. En revanche il est nécessaire d'installer un SGBDR qui contient le serveur de BDD et donc ultimement les BDD.

## MySQL

Prochainement...

## PostgreSQL

Installation du serveur PostgreSQL sous linux :

* https://doc.ubuntu-fr.org/postgresql (facile mais moins bien)
* https://www.postgresql.org/download/linux/debian/ (plus complet)

```shell title="extrait second site"
sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'
wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -
sudo apt-get update
sudo apt-get -y install postgresql
```
