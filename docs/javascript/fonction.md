---
sidebar_position: 7
title: Fonctions
---

[Une fonction](https://developer.mozilla.org/fr/docs/Web/JavaScript/Guide/Functions) c'est un espace qui à un nom comme une variable mais qui contient de la logique (c'est à dire une suite d'instructions à executer).

On utilise les fonctions quand on sait qu'on va devoir utiliser plusieurs fois la même suite logique d'instructions. On évite ainsi de répéter plein de fois la même logique et si on a besoin d'effectuer un changement on le fait à un seul endroit pour que ça se répercute dans tous le projet.

:::note Un code sec et musclé
DRY : don't repeat yourself ! Ne pas se répéter c'une philosophie consistant à éviter la redondance de code au sein d'une application (un gain de temps lors de la maintenance, de la mise en place des tests et du débogage).
:::

## Déclaration

Déclarer (=créer) une fonction (ne se joue pas au moment de la déclaration).

```javascript
function pleinDInstruction(){ 
    //instructions (condition, boucle, calcul, création de variables ... de la logique ...);
    console.log(test);
}

//Dans les parenthéses on peut mettre des parametres (ce sont des variables que l'on recupére au moment de l'appel de la fct et qu'on utilisera dans les instructions de la fct)
function square(nombre) {
    // L'instruction return spécifie la valeur qui est renvoyée par la fonction.
    return nombre * nombre;
}
```

## Jouer la fonction

Appeller une fonctions (la jouer) pour executer le code qu'elle contient.

```javascript
pleinDInstruction();
square(3);
```

:::note Vocabulaire
`square(7);` Le nombre 7 est un **argument** que l'on place en **paramétre** de la fonction square
:::

## Fonction fléchée

Une expression de fonction fléchée permet d'utiliser une syntaxe plus concise que les expressions de fonctions classiques. C'est une façons plus moderne de déclarer une fonction.

```javascript
const fonctionFlechee = (param) => {
    console.log("Je suis une fonction ... " + param);
}

fonctionFlechee("flechée.");
fonctionFlechee("franchement sympa!!!");
```

## Notion de retour

```javascript
function calc(x, y){
    return x + y; //Les ligne de codes après un return ne s'execute pas.
}

calc(2, 7.3);
```

## Fonction auto jouée

```javascript
//Fonction qui se joue toute seule au chargement de la page 
(function quiSeJoueTouteSeul() { //lui donner un nom n'est pas necessaire (function () { 
    console.log("Inutile de m'appeler je suis déjà là.")
})();

//Une fonction anonyme qui se joue toute seul en version flechée
(() => {
    console.log("Fonction anonyme qui se joue toute seule")
})();
```

:::note Organiser son code
On évite de dépasser 20 lignes dans une fonction (dans le cas contraire on la fragmente en plusieurs fonctions).
:::

## Portée des variables

```javascript
//Si on déclare une variable hors d'une fct sa portée est globale

function testPorteeDesVar() {
    let a = 3; // Variable qui a un scope(portée) uniquement de la fonction
    console.log(a); // marchera
    return a + 1;
}
// console.log(a); ne marchera pas car on est en dehors de la portée de a
```

## Fonction générative

La déclaration `function*` permet de définir [un générateur](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Statements/function*) (aussi appelé une fonction génératrice). Un générateur est un objet `Generator`.

Les générateurs sont des fonctions qu'il est possible de quitter puis de reprendre. Le contexte d'un générateur (les liaisons avec ses variables) est sauvegardé entre les reprises successives.

```javascript

// function* nom([param1[, param2[, … paramN]]]) {
//   instructions
// }

function* generator(i) {
  yield i;
  yield i + 10;
}

const gen = generator(10);

console.log(gen.next().value);
// Expected output: 10

console.log(gen.next().value);
// Expected output: 20
```

Lorsqu'on appelle une fonction génératrice, son corps n'est pas exécuté immédiatement, c'est un itérateur qui est renvoyé pour la fonction. Lorsque la méthode next() de l'itérateur est appelée, le corps de la fonction génératrice est utilisé jusqu'à ce que la première expression yield soit trouvée. Cette expression définira la valeur à renvoyer pour l'itérateur. 

```javascript
function* creerID() {
  var index = 0;
  while (true) {
    yield index++;
  }
}

var gen = creerID();

console.log(gen.next().value); // 0
console.log(gen.next().value); // 1
console.log(gen.next().value); // 2
console.log(gen.next().value); // 3
```

Si on utilise yield*, on pourra déléguer la génération des valeurs à une autre fonction génératrice. La méthode next() renvoie un objet dont la propriété value contient la valeur générée et une propriété done qui indique si le générateur a produit sa dernière valeur ou non. Lorsqu'on appelle la méthode next() avec un argument, cela reprendra l'exécution de la fonction génératrice et remplacera la valeur de l'expression yield (là où l'exécution avait été interrompue) avec la valeur de l'argument passé à next().

```javascript
function* autreGenerateur(i) {
  yield i + 1;
  yield i + 2;
  yield i + 3;
}
function* generateur(i) {
  yield i;
  yield* autreGenerateur(i);
  yield i + 10;
}

var gen = generateur(10);

console.log(gen.next().value); // 10
console.log(gen.next().value); // 11
console.log(gen.next().value); // 12
console.log(gen.next().value); // 13
console.log(gen.next().value); // 20
```
