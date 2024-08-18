---
sidebar_position: 1
title: Introduction
---

PHP (officiellement, ce sigle est un acronyme récursif pour **PHP Hypertext Preprocessor**) est un langage de programmation (plus précisément de scripts) conçu pour le développement d'applications web.

[Documentation : php.net](https://www.php.net/).

* On l'utilise pour créer des sites simples ou plus complexes comme des sites Ecommerce.
* Il existe de nombreux **CMS** (Content Management System, c'est-à-dire système de gestion de contenu) comme **wordpress**, magento ou encore drupal qui s'appuyent sur le PHP pour offrir la possibilité à des utilisateurs de créer un site web via une interface graphique sans obligatoirement mettre les main dans le code.
* Des frameworks (cadre de travail permettant de faciliter le développement d'un site web ou d'une application) comme Laravel et **Symfony** sont basés sur PHP.

:::danger Attention
PHP n'est pas fait pour les applications web en temps réel (Il vaut mieux s'orienter vers nodeJS) ni pour faire du développement d'IA ou du machine learning qui sera plus du resort d'un langage de programmation comme Python.
:::

## WAMP, MAMP et LAMP

PHP est un **langage** qui **s'exécute coté serveur** et qui génère le HTML et sert les fichiers CSS, JS, images etc..., qui seront ensuite envoyés au client. Le client ne reçoit pas le code PHP.

:::note Remarque
Un navigateur ne comprend que HTML, CSS et Js et peut afficher des images. Le PHP n'apparait pas aux yeux de l'utilisateur (c'est un langage de communication serveur).
:::

Travailler avec PHP en phase de développement sur notre ordinateur (c'est-à-dire en local sans utiliser un serveur qui se situe sur une autre machine) nécessite d'installé un **logiciel nous servant de serveur**. C'est à ce moment que rentre en jeu [WAMP](https://www.wampserver.com/) si vous ête sous windows, [MAMP](https://www.mamp.info/en/mamp/mac/) si vous êtes sur Mac et [LAMP](https://doc.ubuntu-fr.org/lamp) si vous êtes sous une distribution linux.

Ces suites de logiciels libres, utiles au développement et à l'hébergement d'un site Web sur une machine réunissent un **serveur Web (Apache)**, un **serveur de base de données (MySQL)** et son client qui permet de consulter et gérer le serveur **(PHPMyAdmin)** et un **langage de script (PHP)**.

:::note
Ajouter une nouvelle version de php dans WAMP avec ce [lien](https://wampserver.aviatechno.net/).
:::

## Configurer son environnement

### Extension IDE
Extension pour l'ide visual studio code qui aide les développeurs PHP : **PHP intelephense**.

### Installer PHP

On peut installer PHP sans passer pas MAMP, WAMP ou LAMP.

[Lien version PHP](https://www.php.net/downloads) (prendre version Thread Safe).

Ajouter PHP en variable d'environnement.

Verifier l'installation et la version avec la commande `php -v` depuis un terminal.


:::note commande
La commande est à écrire et exécuter dans un terminal qui pointe sur un dossier contenant un fichier index.php.
Lancer le serveur interne à PHP : `php -S localhost:8000`
:::

### Serveur Web

Le logiciel libre Apache est un **serveur HTTP** qui **répond à des requêtes** émises sur un réseau public (Internet) ou privé (intranet).

On peut l'installer sans passer pas MAMP, WAMP ou LAMP.

[Lien vers le site d'Apache.](https://httpd.apache.org/)

### Serveur de base de données

Il en existe plusieurs. Leur rôle est de **stocker de façon persistante des données**.
C'est-à-dire que si j'éteins l'ordinateur et que je le rallume les données sont toujours disponible.

On peut les installer sans passer pas MAMP, WAMP ou LAMP.

Un chapitre dans la partie SQL leur est consacré pour avoir plus de précision.

PHPMyAdmin est un client Web (et pas le seul :wink:) pour les systèmes de gestion de base de données MySQL. Il offre une interface graphique pour consulter et manipuler les bases de données.

:::note PhpMyAdmin
Pour accéder à PhpMyAdmin : dans l'url => localhost/phpmyadmin/
:::