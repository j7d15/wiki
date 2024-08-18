---
sidebar_position: 1
title: Introduction
---

Linux est une famille entière de systèmes d’exploitation Unix open-source (à code source ouvert), qui sont basés sur le noyau Linux.

Depuis sa première publication en 1991, Linux n’a cessé de gagner en popularité en raison de sa nature open-source. Les gens peuvent librement le modifier et le redistribuer sous leur propre nom.

## Distrubutions

Les distributions (ou distros) les plus populaires basés sur Linux sont Ubuntu, Fedora, Mint, Debian, et d’autres.

## Shell

Lorsque vous utilisez un système d’exploitation Linux, vous devez utiliser un shell pour intéragir avec le kernel (noyau du systéme). Le Shell est une interface qui vous donne accès aux services du système. 

La plupart des distributions Linux utilisent une interface utilisateur graphique (GUI) comme shell, principalement pour faciliter l’utilisation par les utilisateurs.

Cela étant dit, il est recommandé d’utiliser une interface en ligne de commande (CLI) car elle est plus puissante et plus efficace. En tapant des commandes texte, vous pourrez effectuer les tâches qui nécessitent un processus en plusieurs étapes via l’interface graphique, en quelques secondes seulement. 

## Systéme de fichier

Système de fichiers (FS) : façon de stocker les informations et de les organiser dans des fichiers. Différentes méthodes permettent d'associer un nom de fichier à son contenu.

:::note fat
Dans le cas du système de fichiers FAT, ancien système de fichiers de MS-DOS et de Windows encore largement utilisé sur les supports amovibles comme les clés USB, chaque répertoire contient une table associant les noms de fichiers à leur taille et un index pointant vers la table d'allocation de fichiers, une zone réservée du disque indiquant pour chaque bloc de données l'index du bloc suivant du même fichier.
:::

:::success système UNIX
Les fichiers et les répertoires sont identifiés par un numéro unique, le numéro d'inode. Ce numéro permet d'accéder à une structure de données (inode) regroupant toutes les informations sur un fichier.

Inode (contraction d’index et node) : structure de données contenant des informations à propos d'un fichier. Les inodes contiennent notamment les métadonnées des fichiers, et en particulier celles concernant les droits d'accès. (Commande pour afficher inode : `ls -i mon-fichier.txt`)
:::

Les métadonnées les plus courantes sous UNIX sont :
* Droits d'accès en lecture, écriture et exécution selon l'utilisateur, le groupe, ou les autres ;
* Dates de dernier accès de modification
* Taille du fichier ;

### Nom de fichier

Le nom d'un fichier est une chaîne de caractères, souvent de taille limitée. Aujourd'hui, quasiment l'ensemble des caractères du répertoire Unicode est généralement utilisable, mais certains caractères spécifiques ayant un sens pour le système d'exploitation peuvent être interdits ou déconseillés. C'est le cas par exemple pour les caractères « : », « / » ou « \ » sous Windows.

Sous Windows et dans les environnements graphiques, le nom d'un fichier possède en général un suffixe (extension) séparé par un point qui est fonction du contenu du fichier : .txt pour du texte par exemple. De cette extension va dépendre le choix des applications prenant en charge ce fichier. Toutefois, sous Linux/Unix, dans les systèmes en ligne de commande et dans les langages de programmation, l'extension fait simplement partie du nom de fichier, son format est détecté par le type MIME inscrit de façon transparente dans l'en-tête des fichiers (exemple de type MIME: Content-Type: text/plain).

* Racine sous windows : C:\ est la racine de votre disque dur ; D:\ de votre lecteur cd …
* Racine sous linux : /

* Architecture sous windows : C:\Program Files\Winzip
* Architecture sous linux : /usr/bin/

* *bin : contient des programmes (exécutables) susceptibles d'être utilisés par tous les utilisateurs de la machine.*
* *dev : Ce dossier contient des sous-dossiers qui « représentent » chacun un périphérique (ex lecteur CD).*
* *etc : fichiers de configuration.*
* *home : répertoires personnels des utilisateurs. C'est dans ce dossier que vous placerez vos fichiers personnels.*
