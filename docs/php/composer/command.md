---
sidebar_position: 2
title: Commandes
---

## Version

```shell
composer
```

## Installer une dépendance

```shell
composer require nom-paquet
composer require --dev nom-paquet # Pour une dépendance utile uniquement en phase de developpement
```

Après l’exécution de la commande ci-dessus, votre projet contiendra deux nouveaux fichiers le **composer.json** et le **composer.lock** et un dossier nommé vendor.

Le dossier vendor contient le code des dépendances du projet.
On ne le versionne pas car il est trop volumineux. Ca implique que lorsqu'on récupére un projet sur GitHub et qu'on le clone, le dossier vendor (donc le code des dépendances) est absent.

Pour réinstaller les dépendances il suffit d'éxecuter la commande :

```shell
composer install
composer install --no-dev # En production pour ne pas installer les dépendances de developpement
```

Sans précisions supplémentaire cette commande va lire les informations du composer.json pour télécharger les dépendances nécessaire au projet.

## Mise à jour des dépendances

```shell
composer update # Toutes les dépendances

composer update nom-paquet # Une dépendance spécifique
```

En exécutant la commande update, Composer met également à jour les fichiers composer.json et composer.lock pour qu’ils correspondent à l’état actuel des dépendances de votre projet.

## Supprimer une dépendance

```shell
composer remove nom-paquet
```

## Script

Afin de simplifier le démarrage de votre projet et d'éviter à avoir à retaper les même commandes à chaque fois, vous pouvez utiliser la partie script de votre fichier composer.json.

```shell
"scripts": {
    "nom-clef-script": "la commande"
}
```

Jouer une script avec la commande :
```shell
composer run-script nom-clef-script
```