---
sidebar_position: 4
title: Tableaux
---

En programmation, un tableau (array en anglais) est une façon de stocker proprement une liste d'éléments (des nombres, des variables, etc.) sous un seul nom de variable. Ces éléments sont numérotés avec des indices (index en anglais).

:::note
un tableau est un objet.
:::

## Déclaration

On définit les valeurs d'un tableau par une liste d'éléments entre crochets séparés par des virgules.

```javascript
let spys = ["Sean Connery", 1, "Daniel Craig", 3, "Pierce Brosnan", 2, {film: 'No Time To Die'}];
let espions = ["OSS117"]; // Un tableau avec un seul élément
```

## Accession

On peut avoir accès aux éléments dans un tableau en utilisant la notation crochet

```javascript
console.log(spys[0]); //Sean Connery
console.log(spys[0][2]); //a
console.log(spys[6].film)//No Time To Die (Les accolades représentent un objet)
```

## Methodes

Les tableaux sont des objets semblables à des listes qui possèdent des méthodes qui permettent enre autre de parcourir et de modifier leur contenu.

### Ajouter à la fin du tableau

```javascript
console.log(spys.push("Austin Power"));
```

### Ajouter au début du tableau

```javascript
console.log(spys.unshift("Ethan"));
```

### Supprimer le dernier élément du tableau

```javascript
console.log(spys.pop());
```

### Supprimer le premier élément du tableau

```javascript
console.log(spys.shift());
```

### Autres méthodes

```javascript
console.log(spys.concat(espions));// Fusionner 2 tableaux
console.log([...spys, ...espions]);// Fusionner 2 tableaux (... est le spread operator)
console.log(spys.join(", ")); //Transformer un tableau en string avec séparateur
console.log(spys.slice(1)); //Recup le premier elts du tableau
console.log(spys.slice(2, 5)); //Recup les elts entre les positions 2 et 5 du tableau
console.log(spys.indexOf("Pierce Brosnan")); //Pour chaque elts du tableau faire :
spys.forEach((spy) => {
    console.log(spy);
})

console.log(spys.every((spy) => {
    spy === "Luke"; // Est ce que chaque elts du tableau vaut exactement le string Luke ? renverra false
}));

console.log(spys.some((spy) => {
    spy === "Luke"; // Est ce que un elts du tableau vaut exactement le string Luke ? renverra false
}));


console.log(spys.splice(1,1, "Roger Moore"));

 let numbers = [1, 7, 14, 21, 28];

console.log(numbers.reduce((x, y) => x + y)); //Utile pour faire des calcules avec tous les elts du tableaux (ici on additionne tous les elts)

console.log(numbers.filter((number) => number > 10)); //Filtre et garde que les chiffres > 10

console.log(numbers.sort()); //Réarrange les elts (Tous les chiffres commençant par 1 puis par 2 etc)
console.log(numbers.sort((a, b) => b - a)); //Réarrange les elts (plus grand au plus petit)
console.log(numbers.sort((a, b) => a - b)); //Réarrange les elts (plus petit au plus grand)
console.log(numbers.sort((a, b) => 0.5 - Math.random())); //Un elt aléatoire
//(On peut chainer les méthodes)

console.log(numbers.map((number) => console.log(number))); //Equivalent à un forEach

let abc = 'abc-abc-abc-abc';
console.log(abc.split('-')); //Scinde en tableau a partir du symbole indiqué (ce symbole apparaitra dans aucun des tableaux)
console.log(numbers.join('/')); //join joint les elts d'un tableau en utilisant un separateur

```

## Destructuring

L'affectation par décomposition (destructuring en anglais) est une expression JavaScript qui permet d'extraire (unpack en anglais) des données d'un tableau ou d'un objet grâce à une syntaxe spécifique.

L'intérêt de l'assignation par décomposition est de pouvoir lire une structure entière en une seule instruction.

```javascript
let array5 = [1, 2, 7];

let [x, y, z] = array5; //Stock les valeurs d'un tableau dans des variables
console.log(x, y, z);
```
