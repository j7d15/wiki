---
slug: bash
title: Bash
date: 2024-07-02T12:57
authors: admin
tags: [Bash, Shebang]
description: Bash est l’un des outils de scripting les plus populaires disponibles sous Unix.
keywords: [Bash, Shebang]
---

Bash est l’un des outils de scripting les plus populaires disponibles sous Unix. C’est l’acronyme de **Bourne Again Shell**. C’est un outil puissant pour tout utilisateur de Linux ou administrateur système.
<!--truncate-->
:::note
Le **shell** (ou interface système en français) est essentiel pour lancer des programmes informatiques. Il reçoit des commandes textuelle données par un utilisateur pour les envoyer au système d’exploitation qui se chargera de les exécuter.

Shell signifie enveloppe ou coque en français : à l’inverse du noyau d’un ordinateur, le shell désigne la couche la plus haute de toutes les interfaces des systèmes Unix (Linux, macOS).

*Sur la plupart des systèmes Linux, un programme appelé bash (qui signifie Bourne Again SHell) agit en tant que programme shell. Sur macOS et Windows, le shell est accessible par l’application Terminal.*
:::

Unix a 2 grandes catégories de shells.

* Bourne-type shell
* C shell

C'est catégorie on des sous classes.

Bash est facilement disponible sur presque toutes les versions de Linux et ne nécessite aucune installation séparée. La liste des shells disponibles peut être vérifiée en tapant la commande suivante :

```shell
cat /etc/shells

/bin/bash # Le résultat si Bourne Again shell
# Autres résultat possibles
/bin/sh # Le résultat si Bourne shel ou Bourne shel qui sont du Bourne Shell
/bin/tcsh # Le résultat si TENEX (TOPS) C shell (tcsh) qui est du C shell
/bin/csh # Le résultat si C shell
```

Les fonctions Bash peuvent :

* Éliminer les tâches répétitives
* Gagner du temps
* Donne une séquence d’activités bien structurée, modulaire et organisée.
* Avec les fonctions, nous pouvons fournir des valeurs dynamiques aux commandes en utilisant des arguments de ligne de commande
* Peut simplifier les commandes complexes en une seule opération
* Une fois créé, il peut être exécuté un nombre illimité de fois par n’importe qui
* Les flux logiques peuvent être créés en utilisant des fonctions bash
* Les fonctions Bash peuvent être exécutées au démarrage du serveur ou en ajoutant une tâche cron programmée
* Les commandes peuvent être déboguées
* Peut avoir des commandes shell interactives

## Shebang

Le **shebang**, représenté par `#!`, est un **en-tête d'un fichier texte** qui indique au système d'exploitation (de type Unix) que ce fichier n'est pas un fichier binaire mais un **script** (ensemble de commandes) ; *sur la même ligne est précisé l'interpréteur permettant d'exécuter ce script*.

**Pour assurer la portabilité, ces caractères sont toujours positionnés au tout début du fichier (aucun espace/blanc n'est autorisé avant #!).**


```javascript
#!/usr/bin/env node

console.log("Coucou le monde");

```

Tout de suite après le shebang se trouve un chemin d'accès (exemple : #!/bin/sh). Il est possible d'ajouter une espace entre le point d'exclamation et le début du chemin d'accès.

Le chemin d'accès est le chemin vers le programme qui interprète les commandes de ce script, qu'il soit un shell, un langage de script, un langage de programmation ou un utilitaire. On peut ajouter des options qu'il reconnaît (par exemple -x pour un shell pour afficher le détail de son exécution). Ensuite, cet interpréteur de commandes exécute les commandes du script, en commençant au début (ligne 1), en ignorant les commentaires.

```shell title="exemple de shebangs"
#!/bin/sh -x
#!/bin/bash
#!/usr/bin/perl
#!/usr/bin/tcl
#!/bin/sed -f
#!/usr/awk -f
#!/usr/bin/python -O
```

## Commandes

### Intro

Laisser des commentaires dans le fichier en ajoutant le symbole `#`

```shell
man bash # pages du manuel de bash

touch exempleDeFonction.sh # créer un fichier .sh
nano exempleDeFonction.sh # ouvir dans nano
```

Les scripts Bash supportent :

* Fonction
* Boucle while
* Boucle for
* Instruction conditionnelle
* Fonction ET
* Fonction OU
* L’instruction Case

Dans un script bash `&&` représente un ET logique, tandis que `||` représente un OU logique.

Chaque script de Bash doit commencer par la ligne `#!/bin/bash`

### Premiers exemples

```shell title="Syntaxe fonction"
#!/bin/bash
function nomDuFonction {
    premiere commande
    deuxieme command
}

# Syntaxe alternative
function nomDuFonction {
    premiere commande
    deuxieme command
}
```

#### Execution

```shell title="test.sh"
#!/bin/bash
fonctiondetest(){
   echo "Ma première fonction"
}
fonctiondetest
```

On execute le script en cliquant sur le fichier.

#### Argument

```shell
#!/bin/bash
exempleDeFonction () {
    mkdir -p $1
    cd $1
}
# $1 représente l’argument.
# Pour appeler l'exemple on doit donc préciser $1 lors de l'appel de la fonction
exempleDeFonction monRepertoire
#Désormais, monRepertoire est un nom de répertoire valide à créer. 
```

Si vous vérifiez le répertoire de travail actuel en utilisant la commande `pwd`, vous pouvez voir que vous vous trouvez actuellement dans le répertoire monRepertoire nouvellement créé.

#### Saisie interactive

La saisie interactive est effectuée en utilisant `read` pour les deux nombres.

le résultat est imprimé en utilisant `$?` qui stocke la valeur de retour de la fonction $sum.

Les fonctions Bash retournent toujours une seule valeur.

```shell
#!/bin/bash
addition(){
   sum=$(($1+$2))
   return $sum
}
read -p "Entrez un numéro : " int1
read -p "Entrez un numéro : " int2
add $int1 $int2
echo "Le résultat est : " $?
```

#### for

```shell
#!/bin/bash
for (( count=10; count>0; count-- ))
do
echo -n "$count "
done

# Le résultat de cette boucle sera :
# 10 9 8 7 6 5 4 3 2 1
```

#### if elseif

```shell
#!/bin/bash
echo "Entrez un numéro valide"
read n
if [ $n -eq 101 ];
then
echo "Voici le premier numéro"
elif [ $n -eq 510 ];
then
echo "Voici le deuxième numéro"
elif [ $n -eq 999 ];
then
echo "Voici le troisième numéro"
else
echo "Aucun numéro ici"
fi
```

#### Case

`;;` sépare chaque bloc d’instructions.

```shell
#!/bin/bash
echo "Entrez un numéro valide"
read n
case $n in
101)
Echo "Voici le premier numéro" ;;
510)
echo "Voici le deuxième numéro" ;;
999)
echo "Voici le troisième numéro" ;;
*)
echo "Aucun numéro ici" ;;
esac
```

#### While et if

```shell
#!/bin/bash
isvalid=true
count=1
while [ $isvalid ]
do
echo $count
if [ $count -eq 3 ];
then
break
fi
((count++))
done

# Le résultat sera :
#1
#2
#3
```
