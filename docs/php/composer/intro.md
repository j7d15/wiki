---
sidebar_position: 1
title: Introduction
---

## Introductioon

Composer est un **gestionnaire de dépendances** (bibliothèques nécessaires au bon fonctonnement d'un projet) écrit en **PHP**. Il permet d'**installer**, de **désinstaller** et de** mettre à jour** les paquets ou les bibliothèques (synonyme de librairie) dont le projet a besoin en utilisant un terminal.

L'intéret des dépendances c'est de profiter de bouts de codes écrit par d'autre developpeur afin de ne pas avoir à tout recréer dans nos applications web.

## Installation

:::note PHP
PHP doit être présent sur la machine qui accueil composer.
:::

### Windows

L'installation de [Composer](https://getcomposer.org/) se fait, sous windows avec un [installateur téléchargeable](https://getcomposer.org/download/) depuis le site officiel de l'outil.

### Linux

Pour linux l'installation se fait tous simplement en éxecutant quelques [commandes](https://getcomposer.org/download/) depuis le terminal.

## Packagist (registre)

[Packagist](https://packagist.org/) est un registre qui contient la liste des paquets téléchargeable avec composer.

:::danger
Attention** certains paquets peuvent être malveillants ** il faut donc être vigillant lors de l'installation de dépendance en se fiant au **nombre d'utilisation**, à la derniére **date de mise à jour** et au **nombre d'étoiles** de chaque paquet.
:::

## Composer.json

Le fichier composer.json se trouve à la racine d'un projet qui utilise ce gestionnaire.
Ce fichier contient la liste des paquets (dépendances) qui doivent être téléchargés.

:::note Interopérabilité
Le [symbole du signe d’insertion (^)](https://getcomposer.org/doc/articles/versions.md#version-range) qui précéde les numéro de version des paquets indique une interopérabilité maximale. Cela signifie que Composer mettra toujours à jour le paquet jusqu’à ce qu’une certaine version brise le paquet d’une manière ou d’une autre.

Dans notre cas, la plage de mise à jour du paquet est `>=1.0.9 <2.0.0`, car la version 2.0.0 brisera la rétrocompatibilité. Pour des informations détaillées sur le versionnage dans Composer, consultez la page de documentation.
:::

## Les dépendances vs les dépendances de développement

les dépendances (clef require) et les dépendances de développement (clef require-dev) sont des champs de composer.json qui répertorient tous les paquets dont dépend le projet.

La clef `require` comprend tous les paquets tiers nécessaires au fonctionnement de votre projet.

D’autre part, la clef `require-dev` contient les paquets qui ne sont nécessaires que pendant le développement.

Les dépendances sont installées via la commande `composer require`.

Les dépendances de développement sont installées via la commande `composer require` avec le flag `--dev`.
