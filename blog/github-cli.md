---
slug: github-cli
title: Installer et utiliser la CLI de GitHub
date: 2023-08-10T18:12
authors: admin
tags: [GitHub CLI, CLI, GitHub, Git]
description: GitHub CLI est un outil open source permettant d’utiliser GitHub à partir du terminal de votre ordinateur.
keywords: [GitHub CLI, CLI, GitHub, Git]
---

GitHub CLI est un outil open source permettant d’utiliser GitHub à partir du terminal de votre ordinateur.

<!--truncate-->

[Documentation](https://cli.github.com/manual/).

## Installation

[Lien vers les installateurs](https://github.com/cli/cli#installation).

Pour Windows, il suffit de télécharger et d'exécuter l'installateur MSI disponible à cette [adresse](https://github.com/cli/cli/releases/tag/v2.32.1) selon les caractéristiques de votre machine.

## Configuration

:::note
Nécessite un compte [GitHub](https://github.com/). L'identifiant et le mot de passe seront utiles pour la configuration.
:::

* Ouvrir un terminal.
* Saisir la commande `gh auth login` dans le terminal. (gh permet d'accéder à la CLI (exemple: `gh status`))
* Répondre aux questions qui permettent de connecter son compte GitHub.

## Les commandes

[Liste compléte des commandes](https://cli.github.com/manual/gh).

### Lister les repo distants

[Documentation](https://cli.github.com/manual/gh_repo_list)

```git
gh repo list
```

### Créer un repo

[Documentation](https://cli.github.com/manual/gh_repo_create).

:::warning Exécuter la commande au bon endroit
Ouvrir le terminal dans le bon dossier car la commande suivante clone le repo sur votre ordinateur !
:::

```git
# Créer un nouveau repo distant privé nommé nom-projet et le cloner en local 
gh repo create nom-projet --private --clone
```

### Supprimer un repo

[Documentation](https://cli.github.com/manual/gh_repo_delete).

```git
# Obtenir l'autorisation nécessaire pour faire une demande de suppression. (nécessite s'authentifier depuis une fenêtre du navigateur web)
gh auth refresh -s delete_repo
# Supprimer un repo distant 
gh repo delete nom-projet --yes
```

### Cloner un repo

[Documentation](https://cli.github.com/manual/gh_repo_clone)

```git
gh repo clone lien

# gh repo clone lien-url.git
# gh repo clone https://github.com/nom-profil/nom-dossier-sur-github.git
# gh repo clone https://github.com/nom-organization/nom-dossier-sur-github.git
```
