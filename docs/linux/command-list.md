---
sidebar_position: 3
title: Commandes listes
---

## commandes de base

### Définition

Une commande Linux est un programme ou un utilitaire qui s’exécute sur la ligne de commande (CLI). Elle est similaire à l’application Invite de commande de Windows.

**Les commandes Linux sont sensibles à la casse.**

**Les commandes Linux sont exécutées sur le terminal en appuyant sur Entrée à la fin de la ligne.**

### Syntaxe générale

`Nom commande [option(s)] [paramètre(s)]`

1. Nom **commande** : c’est la règle que vous souhaitez exécuter.
1. Option ou le **drapeau** : modifie le fonctionnement de la commande. Pour l’invoquer, utilisez des tirets (-) ou des doubles tirets (-).
1. Paramètre ou **argument** : spécifie toute information nécessaire à la commande.

:::success
* En appuyant sur tab on peut auto-compléter un nom de fichier ou dossier
* On peut se déplacer dans l'**historique** des commandes avec les fléches `haut` et `bas` du clavier
* ctrl + l nettoye le terminal
:::

### sudo

Abréviation de `superuser do`, sudo est l’une des commandes de base les plus populaires de Linux, qui vous permet d’effectuer des tâches nécessitant des autorisations administratives ou de super utilisateur.

Lors de l’utilisation de sudo, le système demande aux utilisateurs de s’authentifier avec un mot de passe

### pwd

Utilisez la commande pwd pour trouver le chemin de votre répertoire de travail actuel.

### cd

Pour naviguer dans les fichiers et les répertoires de Linux, utilisez la commande cd.

```shell
cd NameOfDirectory/NameOfFile

cd .. # monte d’un répertoire.
cd- # permet de revenir au répertoire précédent.

cd ~ # Retourne au répoertoire home (=mes documents de windows)
cd # Retourne au répoertoire home
```

### ls

La commande ls répertorie les fichiers et les répertoires d’un système.

Si elle est exécutée sans drapeau ni paramètre, cette commande affiche le contenu du répertoire de travail actuel.

```shell
ls #  affiche le contenu du répertoire de travail actuel
ls /chemin #Pour afficher le contenu d’autres répertoires
ls -a # affiche les fichiers cachés en plus des fichiers visibles.
ls -lh # affiche la taille des fichiers dans des formats facilement lisibles, tels que MB, GB et TB.
```

### cat

Elle énumère, combine et écrit le contenu des fichiers sur la sortie standard.

```shell
cat filename.txt. # affiche le contenu du fichier
cat > nomfichier.txt # crée un nouveau fichier.
cat nomfichier1.txt nomfichier2.txt > nomfichier3.txt # fusionne nomfichier1.txt et nomfichier2.txt et stocke le résultat dans nomfichier3.txt.
```

### cp

La commande cp permet de copier des fichiers ou des répertoires et leur contenu.

```shell
cp nomfichier.txt /home/nomd’utilisateur/Documents # Pour copier un fichier du répertoire actuel vers un autre
cp nomfichier1.txt nomfichier2.txt nomfichier3.txt /home/nomd’utilisateur/Documents # Pour copier des fichiers dans un répertoire, entrez les noms des fichiers suivis du répertoire de destination

cp nomfichier1.txt nomfichier2.txt # Pour copier le contenu d’un fichier dans un nouveau fichier du même répertoire, entrez cp suivi du fichier source et du fichier de destination

cp -Rf /home/username/Documents /home/username/Documents_backup # Pour copier un répertoire entier, passez l’option -R avant de taper le répertoire source, suivi du répertoire de destination
# -r récursivement ; -f force
```

### Commande mv

La commande mv sert principalement à déplacer et à renommer des fichiers et des répertoires.

```shell
mv nom_de_fichier.txt /home/nom_d’utilisateur/Documents # déplacer un fichier
mv ancien_nom_de_fichier.txt nouveau_nom_de_fichier.txt # renommer un fichier
mv nom_dossier /chemin/documents # Déplacer un dossier
```

### mkdir

La commande mkdir permet de créer un ou plusieurs répertoires en une seule fois et de définir les autorisations pour chacun d’entre eux.

```shell
mkdir nom_du_répertoire #  créer un répertoire
mkdir -p Musique/Chansons # créer un sous répertoire et le répertoire parent si il n'existe pas

mkdir -m777 nom_du_répertoire # -m définit les droits d’accès aux fichiers. Ici, pour créer un répertoire avec des autorisations complètes de lecture, d’écriture et d’exécution pour tous les utilisateurs
```

### rmdir

Pour supprimer définitivement un répertoire **vide**.

```shell
rmdir mydir
```

### rm

La commande rm est utilisée pour supprimer des fichiers dans un répertoire.

```shell
rm nomfichier
rm nomfichier1 nomfichier2 nomfichier3 # supprimer plusieurs fichiers

rm -i nomfichier # demande au système de confirmer la suppression d’un fichier
rm -r nomdossier # supprime les fichiers et les répertoires de manière récursive
```

### touch

La commande touch permet de créer un fichier vide

```shell
touch web.html
```

### locate

```shell
locate nameOf # list all the file and program which contain this name
# need to install a package : sudo apt install mlocate

#scan system before a search : 
sudo updatedb
```

### netstat

la commande netstat liste les ports de service ouverts sur une machine ainsi que les connexions établies.

On peut donc facilement vérifier tous les services actifs d’une machine et s’assurer qu’ils fonctionnement correctement. 

flag :

* -t: liste les ports TCP
* -u: filtre les ports UDP
* -l: filtre les ports en écoute
* -n: permet d’afficher les adresses IP sans résolution de noms DNS
* -p: permet d’afficher le nom du programme et le PID lié au processus
* -r: permet d’afficher les routes empruntées par les paquets
* -e: permet d’afficher les statistiques Ethernet
* -f: permet d’afficher les noms complets (aussi appelés noms FQDN)
* -s: affiche les statistiques par protocole (soit IP, IPv6, ICMP…)
* -i: affiche les statistiques pour l’ensemble des interfaces
* `-I<Inter>`: affiche les statistiques pour l’interface en paramètre
* -o: permet d’afficher les timers pour toutes les connexions
* -M: affiche les connexions utilisant des mécanismes de MASQUERADE
* -Z: affiche les contextes SELinux (lorsque celui-ci est actif)

```shell
netstat –a # afficher l’intégralité des connexions
netstat –tl # filtrer les connexions TCP en écoute
netstat -lnp # liste les programmes et leur port d'écoute

 netstat –tan|grep LISTEN # affichage des connexions TCP en écoute
 netstat -lnp|grep :8080  # affichage du programme sur le port 8080

netstat -taupeln|grep LISTEN #pour pouvoir trouver les ports en écoute sur le serveur

netstat -r # afficher la table de routage. Cela permet de visualiser à la fois la passerelle (s’il y en a une), ainsi que les différentes routes réparties sur les différentes interfaces
```

### kill
Utilisez la commande kill pour mettre fin manuellement à un programme qui ne répond pas. 
Elle signale les applications qui se comportent mal et leur demande de fermer leurs processus.

```shell
killall -9 node # Tue tous les processus node. -9 force le processus à ce fermer.
killall node # Tue tous les processus node.

kill -9 PID # Ou PID est l'id du programme à kill

xkill # Le curseur deviens un x et il ferme le prgramme cliqué
```

### CURL

```shell
curl -O https://v4.cdnpk.net/videvo_files/video/free/video0483/large_watermarked/_import_60d962f06b3ef8.86089157_FPpreview.mp4 && curl -O https://v4.cdnpk.net/videvo_files/video/free/2019-01/large_watermarked/190111_04_TaksinBridge_Drone_02_FPpreview.mp4 && curl -O https://v4.cdnpk.net/videvo_files/video/free/video0453/large_watermarked/_1011__import_FPpreview.mp4
```

### lsof

```shell
lsof -i -P -n | grep LISTEN # liste tout les ports actifs
```

### clear

```shell
clear
```

### apt

Sous Ubuntu, on n'a pas de programmes d'installation ; on a ce qu'on appelle des paquets.

Un paquet est une sorte de dossier zippé qui contient tous les fichiers du programme.

sont rassemblés au même endroit sur un même serveur appelé dépôt (repository) (serveur par défaut indiqué dans un fichier src caché dans les dossiers linux. Le server par défaut peut être changé)

paquet : c'est un programme « prêt à l'emploi », l'équivalent des programmes d'installation sous Windows en quelque sorte ;

dépendance : un paquet peut avoir besoin de plusieurs autres paquets pour fonctionner, on dit qu'il a des dépendances ;

dépôt : c'est le serveur sur lequel on va télécharger nos paquets.

```shell
apt-get update # pour mettre notre cache à jour (a faire de temps en temps)

apt-cache search votrerecherche # utile pour rechercher dans le cache (donc en local=rapide) un paquet

sudo apt-get install nomprogramme # Installer un paquet
apt-get remove nomprogramme # desinstaller un paquet
apt-get autoremove nomprogramme # supprime aussi les dépendances inutiles

apt-get upgrade # mets a jours tout les programmes installé en comprarant avec les versions en cache

sudo apt update && sudo apt upgrade # Mise à jour du systéme
```

### Alias

Les alias sont des commandes que vous créez et qui sont automatiquement transformées en d'autres commandes.

```shell
alias # liste tous les alias définie
alias ll='ls -l' # crée un alias

#il faut relancer une console pour que les modifications soient prises en compte
```

Chercher le fichier .bashrc (prendre celui dans home car celui dans etc est global pour tous les utilisateurs). C'est lui qui contient les alias et on peut en créer en éditant ce fichier.

### Afficher dans le terminal

```shell
head -n 3 nameOfFile.ext # affiche les trois premiéres lignes d'un fichier
tail -n 5 nameOfFile.ext # affiche les trois derniéres lignes d'un fichier
```

### Ouvrir dans l'éditeur nano

```shell
nano nameOfFile.ext 
# Créer le fichier si il n'existe pas
#ctrl+x puis la touche y pour sauvegarder les changement puis la touche entrée pour quitter nano
```

### Chercher

```shell
which nameOfAProgram # Donne le chemin vers le binaire d'une commande ou d'un programme
whereis nameOfAProgram # Donne le chemin vers le binaire d'une commande ou d'un programme avec plus de détails

sudo find / -iname nameOf # Cherche dans le dossier / le string nameOf sans tenir compte de la casse

grep 'text to search' nameOfFile.txt # Cherche du terxte dans un fichier
```

### Ecrire 

```shell
echo "text to write" # Ecrire dans le terminal
printf "text to\nwrite" # Ecrire dans le terminal en prenant en compte des caractéres spéciaux
echo "text to write" > nameOfFile.txt # Ecrire dans un fichier
```

### Permission

```shell
chmod 755 nameOfFile.txt # change les permissions d'un fichier
chmod +x nameOfFile.ext # Donner uniquement le droit d'éxecution
```

### Executer un script

```shell
./script.ext
```

### htop

```shell
sudo apt instal htop

htop # Affiche tous les processus actifs qui peuvent être arrété
```

### Commande ping

```shell
ping google.com # Teste si la communication vers un serveur distant est possible 
# ctrl-c pour stopper
```

### Autres

```shell
date # Retourne la date

cal # Affiche un calendrier

bc # Calculette dans le terminal
quit # Pour quitter la calculette
```




