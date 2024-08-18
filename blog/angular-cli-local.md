---
slug: angular-cli-non-global
title: Travailler avec Angular sans installer globalement la CLI
date: 2023-08-19T02:43
authors: admin
tags: [Angular, CLI]
description: Travailler sur un projet Angular sans installer globalement la CLI. C'est pas compliqué ... promis 😉!
keywords: [Angular, CLI]
---

Pour tester ou quand on travaille rarement avec Angular qui est un framework frontend de JavaScript on peut rechigner à installer globalement le CLI comme le propose la [documentation](https://angular.io/cli#installing-angular-cli). Voici comment utiliser la CLI sans l'installer globalement :

<!--truncate-->

## Créer un projet

Npx est installé en même temps que npm (qui est lui-même installé en même temps que l'environnement d'exécution [node](https://nodejs.org/fr)). Npx est un outil inclus dans npm qui permet l'exécution de packages Node.js et il va télécharger momentanément la CLI Angular pour exécuter la commande ng new qui permet de [créer un nouveau projet Angular](https://angular.io/cli#basic-workflow).

```shell
# Le flag -p précéde la dépendance qui sera télécharger et exécuter avec npx
npx -p @angular/cli ng new nom-appli
``` 

## La CLI dans un projet

Facile quand on comprend bien le fonctionnement et le rôle du fichier package.json.
La clef devDependencies contient une référence à la CLI d'Angular donc le dossier node_modules contient le code de la CLI.

```json
  "devDependencies": {
    "@angular/cli": "~16.2.0"
  }
```

Jetons un coup d'oeil aux scripts du projet qui sont également dans le fichier package.json.

```json
  "scripts": {
    "ng": "ng",
    "start": "ng serve",
    "build": "ng build",
    "watch": "ng build --watch --configuration development",
    "test": "ng test"
  }
```

On peut donc utiliser la CLI avec la commande `npm run ng` et même lancer le serveur de développement avec `npm run start ` (ou `npm start`).

```shell
# Exemple pour créer un composant : la commande de la documentation qui est ng g c nom-composant devient 
npm run ng g c nom-composant
```

:::caution
N'oubliez pas d'ouvrir le terminal dans le dossier du projet angular (qui contient le fichier package.json et donc le dossier node_modules avec le code de la CLI).
:::

Voilà qui devrait vous suffire pour vous passer de l'installation de CLI en global 😉 !!! 
