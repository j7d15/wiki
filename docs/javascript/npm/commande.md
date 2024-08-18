---
sidebar_position: 2
title: Les commandes
---

## Version

```shell
npm -v
```

## Initialiser un projet
 
Cette commande crée le fichier package.json et le remplie selon nos réponses aux questions qui s'affiche dans le terminal.

```shell
npm init
```

Le flag -y nous évite les questions.

```shell
npm init -y
npm init --yes
```

:::note
On peut toujours modifier le fichier package.json depuis l'ide pour le personnaliser.
:::

## Installer des paquets

### Dépendance

Pour ajouter un paquet à votre projet, exécutez l’une de ces commandes :

```shell
npm install nom-paquet
npm i nom-paquet
npm i --save nom-paquet # Le drapeau n'est plus necessaire avec les nouvelles versions de npm (avant sans le drapeau aucune info n'était écrite dans le fichier package.json)

npm i --save-exact nom-paquet # Indiquera la version exact donc sans le ^ ou ~ dans le fichier package.json exemple : "webpack": "5.1.3"
```

Le package.json inclura le nom du packet et sa version dans la clef dependencies.

```caution
Cette commande installera le module express dans le dossier node_modules du répertoire racine du projet. Notez que node_modules n’apparaîtra qu’après l’installation du premier paquet.

Le node_modules ne doit pas être versionné ! Ajoutez le au fichier .gitignore si vous utilisez git.
```

### Dépendance de développement

```shell
npm install nom-paquet --save-dev 
```

Le package.json inclura le nom du packet et sa version dans la clef devDependencies.

### Dépendance globale

Si vous souhaitez installer un paquet npm à utiliser à partir de la ligne de commande sur tout votre système (donc dans n'importe quel dossier de votre machine) :

```shell
npm install nom-paquet --global
npm i nom-paquet -g
```

## Mise à jour de NPM

### NPM

Pour mettre à jour votre gestionnaire de paquets Node lui-même, exécutez la commande suivante :

```shell
npm install npm@latest -g
```

### Dépendance
Pour que votre code restent sûrs et stables, mettez régulièrement à jour les paquets locaux et globaux téléchargés depuis le registre npm.

Avant de mettre à jour un paquet npm, vérifiez si l’un d’entre eux est périmé. Vous pouvez vérifier quels paquets npm de votre projet ou système ont des mises à jour disponibles en exécutant cette commande depuis le répertoire racine :

```shell
npm outdated
```

Pour vérifier si des paquets globaux sont périmés dans le système, exécutez la commande suivante :

```shell
npm outdated -g --depth=0
```

Pour mettre à jour tous les paquets de votre projet, exécutez cette commande depuis la ligne de commande :

```shell
npm update
# Pour mettre à jour tous les paquets globaux
npm update -g
```

Pour mettre à jour un seul module, entrez ceci :

```shell
npm update nom-paquet
# Pour mettre à jour un seul paquet global
npm update -g nom-paquet
```

## Les scripts

Afin de simplifier le démarrage de votre projet et d'éviter à avoir à retaper les même commandes à chaque fois, vous pouvez utiliser la partie script de votre fichier package.json.

```json
"scripts": {
    "dev": "nodemon app.js",
    "start": "node app.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  }
```

Les scripts enregistrés de cette manière-là pourront ensuite être lancé depuis le terminal à l'aide de la commande :

```shell
npm run dev
npm run start # npm start fonctionne aussi mais c'est une exception
npm run test
```

## Node_modules

Le dossier node_modules contient le code des dépendances du projet.
On ne le versionne pas car il est trop volumineux. Ça implique que lorsqu'on récupère un projet sur GitHub et qu'on le clone, le dossier node_modules (donc le code des dépendances) est absent.

Pour réinstaller les dépendances il suffit d'exécuter la commande :

```shell
npm install
# Ou son raccourcie :
npm i

npm install --omit=dev # This will install only dependencies, and not devDependencies
```

Sans précisions supplémentaires cette commande va lire les informations du package.json pour télécharger les dépendances nécessaires au projet.

:::note
Ca veut dire qu'en local on peut supprimer le dossier node_modules sans risque puisqu'avec une simple commande on peut le créer une nouvelle fois.
:::
