---
sidebar_position: 6
title: Boucles
---

Les boucles (également appelé itérations) permettent de répéter des actions simplement et rapidement.

Il y a différentes sortes de boucles mais elles ont toutes en commun de répèter une action un certain nombre de fois (ce nombre peut éventuellement être zéro). 

## Tant que (while)

L'instruction while permet de créer une boucle qui s'exécute tant qu'une condition de test est vérifiée. La condition est évaluée **avant** d'exécuter l'instruction contenue dans la boucle.

```javascript
let w = 0;

while(w < 10) { //Tant que w plus petit que 10 on répéte les instructions entre accolades
    w++; //Incrementer W a chaque tour de boucle sinon c'est la boucle infinie
    console.log('w vaut : ' + w);
}
```

## faire Tant que (do while)

L'instruction do...while crée une boucle qui exécute une instruction jusqu'à ce qu'une condition de test ne soit plus vérifiée. La condition est testée **après** que l'instruction soit exécutée, *le bloc d'instructions défini dans la boucle est donc exécuté au moins une fois*.

```javascript
// avantage par rapport a while : on execute le code entre accolade au moins une fois car on vérifie la condition aprés
let d = 0;

do { //Tant que w plus petit que 10 on répéte les instructions entre accolades
    d++; //Incrementer W a chaque tour de boucle sinon c'est la boucle infinie
    console.log('d vaut : ' + d);
} while(d < 7)
```

## Pour (for)

Une boucle for répète des instructions jusqu'à ce qu'une condition donnée ne soit plus vérifiée.

```javascript
for (i = 0; i < 5; i++) {
    console.log('i vaut : ' +i);
}
```

## Pour dans le cas d'un tableau (for of)

L'instruction for...of crée une boucle qui fonctionne avec les objets itérables (les tableaux entre autre). La boucle parcourt l'objet et les valeurs de ses différents éléments.

```javascript
elts = [1, 2, 3];

for (const elt of elts) {
    console.log(elt);
}
```

## Pour chaque (forEach)

La méthode forEach() permet d'exécuter une fonction donnée sur chaque élément du **tableau**.

```javascript
// pour chaque elt d'un tableau
const letters = ['a', 'b', 'c'];

letters.forEach((letter) => { //Pour chaque lettre nommée letter dans le tableau letters
    console.log(letter);
});
```