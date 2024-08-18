---
sidebar_position: 2
title: Commandes
---

### version et aide

```shell
git --version # Afficher la version de git
git --help  # Afficher la liste des commandes git

# Utiliser la lettre q pour quitter l’interface quand la ligne (end) apparait
```

### git config

 On l’utilise pour configurer les préférences de l’utilisateur : son adresse email, l’algorithme utilisé pour diff, le nom d’utilisateur et le format de fichier etc.

```shell
git config --global user.email sam@google.com # utilisée pour définir le mail d’un utilisateur (Apparait dans un commit)
git config --global user.name "votreNom" # utilisée pour définir le nom d’un utilisateur (Apparait dans un commit)

git config # liste des commandes de config

git config -l # résume les informations renseignées dans config

git config –global color.ui auto #Change la couleur des lignes du terminal de commande bash installer en même temps que GIT
```

#### Alias de commande

```shell
git config –global alias.c "commit -m"

git c "message" # Alias de la commande git commit -m "message"
```

### git init

Cette commande est utilisée pour créer un nouveau dépôt GIT.

```shell
git init
```

### git clone

Clone un dépôt distant en local dans un répertoire nouvellement créé du même nom

```shell
git clone lien
```

### git diff

Sert à visualiser les modifications sur la branche depuis le dernier commit pour les fichiers qui n'ont pas subit un git add.

```shell
git diff # tous les changements

git diff fichier.extension # indique les changement pour un fichier spécifique
```

### git add

Permet de traquer un fichier.

```shell
git add . # Ajoute tous les fichiers modifiés
git add fichier.txt # Ajoute le fichier nommée fichier.txt
```

### git rm

Permet de ne plus traquer un fichier.

```shell
git rm fichier.txt

git rm -r --cached # Pour retirer tous les fichiers traqués (-r sert à faire des récursives)
```

### git commit

Permet de faire un checkpoint des modifications pour les fichiers traqués.

```shell
git commit –m "Message"

git commit --amend -m "New commit message" # Changer le message du dernier commit

git add file.ext
git commit --amend --no-edit # Ajouter le fichier file.ext dans le dernier commit dans modifier le message du dernier commit
```

### git status

La commande git status affiche la liste des fichiers modifiés ainsi que les fichiers qui doivent encore être ajoutés ou validés.

```shell
git status
```

### git remote

Cette commande remote permet à un utilisateur de se connecter à un dépôt distant ou de les lister.

```shell
git remote add origin <adresse.ip> # Cette commande permet à l’utilisateur de connecter le dépôt local à un serveur distant avec l'alias origin
git remote add test <adresse.ip> # Cette commande permet à l’utilisateur de connecter le dépôt local à un serveur distant avec l'alias test

git remote -v # répertorie les dépôts distants actuellement configurés
```

### git log

L’ exécution de cette commande génère le log d’une branche.

```shell
git log

git log --oneline # un git log avec un meilleur affichage

git log --graph --all # Permet d'avoir un meilleur affichage
git log --graph --all --reflog # un git log avec un meilleur affichage
```

### git push

Un simple push envoie les modifications locales de la branche sur laquelle on se trouve vers le dépot distant.

```shell
git push
git push origin
git push -u origin master
```

### git pull

Pour fusionner toutes les modifications présentes sur le dépôt distant dans le répertoire de travail local.

```shell
git pull
```

### git branch

La commande git branch peut être utilisée pour répertorier ou supprimer des branches en local.

```shell
git branch # Pour répertorier toutes les branches en local
# le * indique sur quelle brnach on se trouve
git branch -r #Pour répertorier les branches distantes
git branch -a #Pour répertorier les branches locales et distantes

git branch –d nom-branche # Pour supprimer une branche

```

### git checkout

#### Changer de branche

La commande git checkout peut être utilisée pour créer des branches ou pour basculer entre elles.

```shell
git checkout -b nom-branche # créer une branche et se mettre dessus

git checkout nom-branche # Pour passer simplement d’une branche à une autre
```

#### Changer de version du projet

Peut aussi être utiliser pour se déplacer entre différents commits d'une branche (revenir à la version du projet d'un ancien commit).

```shell
git log # Affichera tous les commits avec le hash-du-commit qui permet de les identifier
git checkout hash-du-commit # Basculer vers ce checkpoint spécifique
```

#### Recupérer la version d'ancien(s) fichier(s)

On peut restorer les fichiers à un ancien état de l'historique en utilisant les commandes suivantes (laissera une trace des versions intermédiaires dans l'historique des commits):

```shell
git checkout hash-du-commit . # Va restorer tous les fichiers a l'état du commit indiqué sans déplacer le head vers l'ancien commit.
# git checkout hash-du-commit nom-fichier-ou-dossier
git commit -m 'ne brisera pas l'histotique des commits'
```


### git delete branch

La commande git checkout peut être utilisée pour créer des branches ou pour basculer entre elles.

```shell
# Depuis une autre branche
git branch --delete old-branch-name
git branch -d old-branch-name
```

#### Revenir a l'état du dernier commit

```shell
git reset HEAD --hard # Pour revenir à l'état du dernier commit
```

#### Supprimer le dernier commit

```shell
git reset --hard HEAD~1 # Supprime le dernier et tout les changements effectuer

git reset --soft HEAD~1 # Supprime le dernier commit mais conserve les changements en les mettant dans la staging area (comme si on avait fait un git add sur tous les fichiers modifiés)
```

### git merge

Cette commande permet de fusionner 2 branches en créant un nouveau commit sur la branche qui reçoit.

```shell
# Ajouter les commits de la branche hotfix à celle de master
git checkout master # se mettre sur la branche qui va recevoir les infos
git merge hotfix # indiquer la branche qui va transmettre
git branch -d hotfix # Supprimer la branche qui a transmis
```


### git rebase

[Video](https://www.youtube.com/watch?v=f1wnYdLEpgI)

C'est comme merge qui rajoute l'historique des commits de la branche qu'on veut fusionner sur la branche qui recoit le code.

```shell
git checkout master # se mettre sur la branche qui va recevoir les infos
git rebase hotfix # indiquer la branche qui va transmettre
```

#### Supprimer un ancien commit (drop)

[Video](https://www.youtube.com/watch?v=Z6oBzXWxa8Q)

```shell
# Voir la video de demonstration
git rebase -i HEAD~2 # Affichera les différentes commandes disponibles dans le terminal (drop)
```


#### Modifier le commentaire d'un ancien commit (reword)

[Video](https://www.youtube.com/watch?v=ElRzTuYln0M)

```shell
# Voir la video de demonstration
git rebase -i HEAD~2 # Affichera les différentes commandes disponibles dans le terminal (reword)
```

#### Encore plus de rebase

[source](https://www.youtube.com/watch?v=ElRzTuYln0M)
