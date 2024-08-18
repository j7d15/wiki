---
sidebar_position: 1
title: Introduction
---

## Contexte

Avec **npm (Node package manager)**, nous pouvons **installer des paquets (packages)** dans nos **projets JavaScript**.

Un paquet (ou librairie ou bibliothèque) est un répertoire contenant un ou plusieurs bouts de code JavaScript utilisés pour ajouter diverses fonctionnalités au projet. Quand le paquet devient nécessaire au fonctionnement du projet on parle de **dépendance**. 

La CLI (Interface de ligne de commande) NPM s'installe en même temps que l'environnement exécution [NodeJs](https://nodejs.org/fr).

On exécute la CLI de NPM depuis un terminal pour **installer ou désinstaller des paquets** et gérer les versions ou les dépendances.

:::note Le Registre NPM
Tout paquet ou module que vous installez à l’aide de la CLI de npm est téléchargé depuis le [registre public de npm](https://www.npmjs.com/). C'est une immense base de données qui contient la liste et la documentation des paquets disponibles.

Attention** certains paquets peuvent être malveillants ** il faut donc être vigilant lors de l'installation de dépendance en se fiant au **nombre d'utilisations**, à la dernière **date de mise à jour** et au nombre d'étoiles sur GitHub si disponible de chaque paquet.
:::

## Le package.json

Chaque projet utilisant NPM contient un fichier** package.json**. Il est situé dans le répertoire racine et il simplifie l’identification, la gestion et l’installation des dépendances du projet.

### Ajouter le fichier package.json

Ouvrir le terminal à la racine du projet.

```shell
npm init -y
```

Ensuite il suffit d'ouvrir le fichier package.json et de le configurer.

```json
{
  "name": "nom-du-projet",
  "version": "1.0.0",
  "description": "Une description",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "dependencies": {
    "express": "^4.17.1"
  },
  "author": "Moi",
  "license": "MIT",
}
```

### Description du package.json

* La clef name définit le nom du paquet. Il doit comporter moins de 214 caractères et être composé uniquement de lettres minuscules.
* La version spécifie la version actuelle du projet.
* La description permet de mettre un message décrivant le projet
* La clef main spécifie le point d’entrée ou le fichier principal de votre projet. Si cette propriété est laissée vide, npm définira automatiquement sa valeur à index.js.
* La clef scripts contient des commandes qui exécutent des tâches pour votre projet. Un utilisateur de npm peut tirer parti de ce champ pour transmettre des arguments au CLI sans avoir à les retaper en utilisant `npm run nom-clef-script`.
* La clef dependencies répertorie toutes les dépendances utilisées dans le projet. Lorsque vous installez un paquet à l’aide de la commande `npm install nom-paquet`, ce paquet sera automatiquement listé ici.
* Utilisez la clef author (auteur) pour indiquer le créateur du projet.
* Utilisez la clef license pour indiquer la licence du projet.

## Version d'une dépendance

```json
{
  "dependencies": {
    "express": "^4.17.1"
  }
}
```
`version majeur.version mineur. version patch`

`^` signifie que si on fait un npm update la version mineur et le patch seront mis à jours dans le node_modules et dans le package.json mais la version majeur ne peut pas changer.
`~` signifie que si on fait un npm update la version du patch sera mis à jours.


### Les dépendances vs les dépendances de développement

les dépendances (Dependencies) et les dépendances de développement (devDependencies) sont des champs de package.json qui répertorient tous les paquets dont dépend un projet.

Le champ dependency comprend tous les paquets tiers nécessaires au fonctionnement de votre projet.

D’autre part, la propriété devDependency contient les paquets qui ne sont nécessaires que pendant le développement.

Les dépendances sont installées via la commande `npm install` ou `npm i` avec le flag `--save`. (Le flag n'est plus nécessaire dans les nouvelles version de NPM)

Les dépendances de développement sont installées via la commande `npm install` avec le flag `--save-dev`.