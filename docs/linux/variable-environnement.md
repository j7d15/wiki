---
sidebar_position: 2
title: Variable d'environnement
---

Variable d’environnement = variables dynamiques utilisées par les différents processus d’un système d’exploitation (Windows, Unix...). Elles servent à communiquer des informations entre les programmes qui ne se trouvent pas sur la même ligne hiérarchique, et qui ont donc besoin d'une convention pour se communiquer mutuellement leurs choix.

## Les variables d'environnement les plus courantes

Que ce soit sous Linux ou Windows, il y a des variables d'environnement prédéfinies. Voici les plus courantes :

* HOSTNAME : nom d'hôte
* PWD : répertoire de travail actuel, c'est-à-dire le répertoire dans lequel on se situe (d'un point de vue du shell)
* HOME : emplacement du répertoire personnel de l'utilisateur, que l'on appelle son "home"
* SHELL : interpréteur de commandes actuel (bash, zsh, ...)
* LOGNAME : nom de l'utilisateur actuellement connecté.
* UID : identifiant unique de l'utilisateur (par exemple : 1000). Information visible dans le fichier /etc/passwd.

Cette liste n'est pas exhaustive et peut varier d'une distribution à une autre.

### Lecture

```shell
# Nous pouvons, sous Linux, voir les variables d'environnement qui sont présentes par défaut
printenv
# Nous pouvons, sous Linux, voir les variables d'environnement qui sont présentes par défaut
env
# Utilisez cette commande pour parcourir la liste progressivemen
printenv | less
```
:::note Remarque
Les variables d'environnement sont dynamiques, c'est à dire que leurs valeurs peuvent chacune changer en fonction de divers paramètres comme l'utilisateur, l'endroit où l'on se trouve sur le serveur, le langage que nous utilisons : `printenv PWD` change de valeur selon là ou pointe le terminal
:::

### Modification

```shell title='modification temporaire'
# Pour "transformer" la variable shell en variable d'environnement, nous devons utiliser la commande export
export SCRIPTS=/home/kali/scripts/
# À tout moment, nous pouvons afficher la valeur de cette variable
echo $SCRIPTS
```

:::caution
Attention, il est important de préciser que cette variable d'environnement n'est disponible que pour la session en cours !
:::

```shell title='modification persistante'
# Une variable d'environnement peut être persistante pour un seul utilisateur ou pour tous les utilisateurs de la machine. A vous de voir, selon vos besoins.
# Pour que ce soit persistant pour votre utilisateur actuel, vous devez ajouter la commande export dans le fichier "/home/$USER/.bashrc" de l'utilisateur en cours.
nano /home/$USER/.bashrc

# Ajouter  la ligne: export SCRIPTS=/home/kali/scripts/

# Recharger le fichier
source ~/.bashrc

```

```shell title='modification persistante'
# Pour créer une variable d'environnement pour tous les utilisateurs vous devez créer un fichier ".sh" dans le répertoire suivant : /etc/profile.d/
sudo nano /etc/profile.d/var.sh

# Ajouter  la ligne: export SCRIPTS=/home/kali/scripts/
```

## Suppression

La suppression d'une variable peut se faire avec la commande "unset" qui est faite pour effacer complètement une variable d'environnement (pour la session en cours !)

```shell
# Pour créer une variable d'environnement pour tous les utilisateurs vous devez créer un fichier ".sh" dans le répertoire suivant : /etc/profile.d/
unset SCRIPTS
```

Pour supprimer une variable d'environnement de façon définitive, pensez à retirer sa déclaration dans le fichier ".bashrc".
