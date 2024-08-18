---
sidebar_position: 3
title: Variables
---

:::danger
Les `;` ne sont pas obligatoires en JS pour terminer une instruction.
:::

## Définition

Une **variable** c'est un **espace que l'on réserve dans la mémoire** temporaire de l'ordinateur afin de **stocker une ou des informations**.

**Déclarer** une variable signifie réserver et donné un nom à un espace mémoire en vue de stocker une information par la suite.

**Initialiser** une variable signifie stocker une ou des informations dans l'espace mémoire.

:::note
On peut déclarer et initialiser une variable avec une seule instruction.
:::

## Var

[Le mot clef `var`](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Statements/var) indique qu'une variable s'apprête à être déclarée. Il est suvi du nom de la variable.

```javascript
var ancienneFaconsDeDeclarerUneVariable = "A l'ancienne"; // Toujours supporter par les navigateurs modernes.
```

:::danger Nommage
* Les noms peuvent contenir des lettres, ,nombres, underscores et dollar.
* Un nom commence soit par une lettre ou $ ou _ .
* Les noms sont sensibles à la casse (y est différent de Y).
* Certain mots clefs réservés ne peuvent pas être utilisés.
:::

## Let

[Documentation](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Statements/let).

```javascript
let variable; // Declarer une variable.
let maVariable = "kamelCase"; // Declarer une variable et l'initialiser.

maVariable = "Reaffectation de la variable" // Changer le contenu d'une variable.

console.log(maVariable); //Affiche la variable dans la console. (Onglet console quand on clique sur F12 après avoir ouvert le fichier dans son navigateur)
```

## Const

[Documentation](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Statements/const).

```javascript
const CONSTANTE = "Variable qui ne varie pas"; // Declarer une variable constante que l'on ne peut pas réaffecter.
```

:::danger La portée (scope)
`let` et `const` ont un contexte de bloc c'est-à-dire limité par les accolades {} d'une fonction, d'une coudition ou d'une boucle. En dehors des accolades elles seront inaccessible.

les variables définies via `var` ont un contexte de fonction. Autrement dit, seul les accolades d'une fonction définissent leur contexte et non celles des conditions. Leur contexte est donc global.
:::

## Les types de données

Il existe 6 types primitifs en JavaScript. Une variable en JavaScript peut contenir une de ces primitives ou un objet (dont les tableaux font partie) ou une fonction.

### String

Les chaines de caractère permettent de stocker des informations textuelles. Pour les déclarer, il faut englober leur contenu entre guillemets double ou simple ou des backticks (Alt Gr + 7).

```javascript
// Les strings = chaines de caracteres = "" ou '' ou ``
let string = "chaine de caractére";
let echapperUnCaractere = "J'echappe un caractere de cette facon ou alors \" le backslash juste avant le caractere marche aussi.";
let concatenation = "Une constante est une " + CONSTANTE + ".";
let concatenationAvecBacktick = `Une constante est une ${CONSTANTE}.`;
```

### Number

Comme leur nom l'indique, les Numbers servent à stocker des nombres. Pour les déclarer, il suffit d'attribuer leur valeur à une variable.

```javascript
// Number = nombre entier ou relatif 
let number = 1;
let number2 = 1.3;
```

### Boolean

Les booléens permettent de stocker si le statut d'un élément est vrai ou faux (true ou false).

```javascript
// Boolean = boolean = true ou false
let boolean = true;
```

### Array (tableau)

Les tableaux ou en anglais array permettent de stocker des informations sous forme de liste ordonnée.

```javascript
//array = tableau =[] (Index debute à 0)
let array = [1, "vraie", true, ['multidimension', 2]];
// object = Objet = {}
```

### Object

Un objet ou en anglais object est en quelque sorte une collection de variables ayant un lien entre elles. Ces variables sont alors connues sous le nom de **propriétés**. Chacune de ces propriétés contient une valeur lui étant propre. Ces valeurs peuvent prendre la forme d'une chaine de caractères, d'un nombre, d'un booléen, d'un tableau, d'une fonction ou encore même d'un autre objet.

```javascript
let object = {
    nom: "paul",
    age: 24,
    humain: true
};
console.log(typeof string); //Donne le type d'une variable (les tableaux sont des objets).
```

### Undefined et Null

Les variables ayant la valeur `undefined` sont des variables ayant été déclarée, mais n'ayant pas encore reçu de valeur.

```javascript
// La valeur undefined indique que la variable a été trouvée, mais qu’aucune valeur ne lui a encore été attribuée.
let undef;
console.log(typeof undef);
```

Une variable peut avoir la valeur null afin d'indiquer qu'elle existe, mais qu'elle ne contient actuellement aucune valeur.

```javascript
// Signifie que la variable n'a pas de valeur.
let nul = null;
```

:::note
Si la variable n’existe pas, un message d’erreur est retourné : `ReferenceError: nomVariable is not defined`.
:::

## Les opérateurs

### Mathematiques

* +,
* -,
* *,
* /,
* **(puissance),
* %(modulo)

```javascript
const sum = 3 + 3;
```

### Affectation

Afin de stocker une valeur dans une variable, il faut séparer son nom de sa valeur en utilisant le symbole `=` qui sert d'opérateur d'affectation.

:::caution
`=` N'a aucune valeur mathématiques en JavaScript.
:::

### Incrementation et décrémentation

* var++; (ajoute 1 à la variable nommée var)
* var += 2; (ajoute 2 à la variable nommée var)
* ++var; (ajoute 1 à la variable nommée var)
* var--; (soustrait 1 à la variable nommée var)
* var -= 2; (soustrait 2 à la variable nommée var)
* --var; (soustrait 1 à la variable nommée var)
* (var *= 3;) (multiplie par 3 la variable nommée var)

```javascript
let i = 1;
i++;
console.log(i);
```

### De comparaison

JavaScript permet de comparer des valeurs de différentes façons.

* `==` (comparaison de valeur),
* `===` (comparaison de valeur et de type),
* `!=` (difference de valeur),
* `!==` (difference de valeur et de type),
* `<` (plus petit que),
* `<=` (plus petit ou égale),
* `>` (plus grand que),
* `>=` (plus grand ou égale)

Exemple :
```javascript
if ( 3 < 1) {
    console.log('3 strictement plus petit que 1')
}
```

## Methodes sur les strings

```javascript
let string7 = "Quelques méthodes concernant les chaines de caractéres";
// Changer de type
console.log(parseInt("1")); // On passe de string à number (parseFloat())
console.log(isNaN(string7)); // Si pas un nombre renvoie true
console.log(string7.length); //Donne la taille de la chaine (espace compris) (length commence à 1)
console.log(string7.indexOf("les")); //Renvoie la position de la premiére occurence. Si il n'en trouve pas il renvoie -1
console.log(string7.slice(2)); //Coupe les 2 premiéres lettres
console.log(string7.slice(2, 5)); //Garde que ce qui se trouve entre la 2eme lettre et la 5eme
console.log(string7.split(' ')); //Renvoie un tableau qui contient chaque mot (découpage selon l'espace ' ');
console.log(string7.toLowerCase());
console.log(string7.toUpperCase());
console.log(string7.replace("méthodes", "trucs"));
```

## Méthodes sur les numbers

```javascript
let number7 = 14.21;
console.log(number7.toFixed(1)); //Garde 1 chiffre après la virgule
console.log(parseInt(number7)); // On passe de string à number (parseFloat())

//Math est un objet natif de JavaScript qui contient plein de méthodes
console.log(Math.PI);
console.log(Math.floor(number7)); //Entier plus petit (aide : Fleur plus basse que le ciel)
console.log(Math.ceil(number7)); //Entier plus grand (aide : ciel plus haut que la fleur)
console.log(Math.round(number7)); //Arrondie
console.log(Math.pow(2,7)); //2^7
console.log(Math.sqrt(16)); //Raccine carré
console.log(Math.random()); //Chiffre entre 0 et 1 exclu
```
