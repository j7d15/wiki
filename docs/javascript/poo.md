---
sidebar_position: 13
title: Programation orientée objet
---

La programation orientée objet est un paradigme de programmation.

## Objet

Un objet c'est un conteneur qui va posséder un ensemble de propriétés et de méthodes qu’il est cohérent de regrouper.

Les objets sont reconaissables facilement en JavaScript grâce aux accolades et une structure clef : valeur.

:::note Méthode et fonction
En Programation orientée objet (POO) une fonction est appelé méthode et une variable propriété.
:::


``` javascript title="Declaration basique"
var personne = {};

// var monObjet = {
//   nomDuMembre1: valeurDuMembre1,
//   nomDuMembre2: valeurDuMembre2
// };
```

``` javascript title="Declaration d'un objet"
var personne = {
  //propriétés
  nom: {
    prenom: 'Rick',
    nomFamille: 'Sanchez'
  },  
  age: 32,
  sexe: "masculin",
  interets: ["Science", "Aventure"],
  //methodes
  bio() { 
    alert(this.interets[0]);
  },
  salutation: function () {
    alert("Bonjour ! Je suis " + this.nom.prenom + ".");
  },
};
```

``` javascript title="utiliser les membres"
personne.nom;
personne.nom.prenom;;
personne.age;
personne.interets[1];
personne.bio();
personne.salutation();

// Il y a une autre façon d'accéder aux membres de l'objet : la notation avec les crochets (utile si la propriété contient des '-').
personne["age"];
personne["nom"]["prenom"];
```

```javascript title="définir les membres"
//Maj valeurs
personne.age = 45;
personne["nom"]["nomFamille"] = "Wabadubula";

//Ajout de valeurs
personne["yeux"] = "noisette";
personne.auRevoir = function () {
  alert("Bye bye tout le monde !");
};
```

```javascript title="Supprimer une propriété"
// L'opérateur delete permet de retirer une propriété d'un objet.
const Employee = {
  firstname: 'Rick',
  lastname: 'Sanchez'
};

delete Employee.firstname;

console.log(Employee.firstname);// Expected output: undefined
```

```javascript title="Présence d'une propriété"
console.log ("index" in obj);
```

```javascript title="Parcourir un objet"
for (const key in obj){
    console.log(key); //Pour avoir les index
    console.log(obj[key]); // Pour avoir les valeurs
}
```

### Les méthodes proposées par JavaScript

Object est un objet natif de JS qui a ses propres méthodes.

```javascript
const keys = Object.keys(obj); // Liste toutes les clefs d'un objet dans un tableau
console.log(keys);

const values = Object.values(obj); // Liste toutes les valeurs d'un objet dans un tableau
console.log(values);

const nestedArray = Object.entries(obj); // Tableau contenant des tableaux pour chaque propriété ['key', 'value']
console.log(nestedArray);

//Fusionner des objets
const fusion = Object.assign({}, obj, obj2);
console.log(fusion); //Attention si le second tableau contient une clef identique au premier celle du premier talbeau est écrasé (pas de duplication denom de clef : elles sont uniques par objet)

// Empecher les modifications d'un objet
const unmodifiableObj = Object.freeze(obj);

//Empecher l'ajout de nouvelles clefs
const unexpendableObj = Object.seal(obj);
```

## Classe (ES6)

Les classes JavaScript ont été introduites avec ECMAScript 2015 (ES6). Elles sont un « sucre syntaxique ».

**Les classes servent de moule au objet.**

:::caution
Il est nécessaire de déclarer la classe avant de l'instancier.
:::

### Propriétés et méthodes

Le corps d'une classe est la partie contenue entre les accolades. C'est dans cette partie que l'on définit les propriétés d'une classe, ses méthodes et son constructeur.

:::note La visibilité public / private
* `#` devant un nom de propriété ou de méthode indique qu'elle est innaccessible en dehors de la classe.
* L'**absence** de `#` signifie que la propriété ou la méthode est publique et donc accessible à l'intérieur mais aussi à l'extérieur de la classe
:::

```javascript
 class Rectangle {

  hauteur = 0; // propriété publique avec initialisateur
  #largeur; // Propriété privée

  constructor(hauteur, largeur) {
    this.hauteur = hauteur;
    this.#largeur = largeur;
    this.perimetre = this.hauteur * 2 + this.largeur * 2;
  }

  methodePublique() {
    return 7;
  }

  #methodePrivee() {
    // Accessible que dans les autres méthodes de cette classe
    return 42;
  }

}

//Si on utilise les champs privés hors de la classe, cela génèrera une erreur.

const rec = new Rectangle(3,4);
console.log(rec.hauteur) //ok
console.log(rec.largeur) //PAS ok
```

### Encapsulation

Il est possible de créer des **accesseurs (getter)** et **mutateurs (setter)** pour accéder à une propriété privée en dehors de la classe.

L'encapsulation est un choix de conception qui offre un meilleur controle sur ce que l'on peut stocker dans une propriété.

```javascript
class Cla {
  #mes;

  get mes() { // Getter
    return `🎬${this.#mes}🛑`;
  }

  set mes(msg) { //Setter
  // Faire des modifs ou verif sur msg ici avant de set
  if (msg.length < 3) throw new Error('Trop courts');
    this.#mes = msg;
  }
}

const cla = new Cla();
cla.mes = "Message"; // Utilisation du setter
console.log(cla.mes); // Utilisation du getter
```

### Constructor

La méthode `constructor()` est une méthode spéciale qui permet de créer et d'initialiser les objet créés avec une classe. 

*Il ne peut y avoir qu'une seule méthode avec le nom "constructor" pour une classe donnée.*

```javascript
class Rectangle {
  constructor(hauteur, largeur) {
    this.hauteur = hauteur;
    this.largeur = largeur;
  }
}

new Rectangle(2,3); // Constructeur automatiquement appeler (hauteur 2 et largeur 3)
```

### Statique

Le mot-clé `static` permet de définir une méthode statique pour une classe. 
Les méthodes statiques sont appelées par rapport à la classe entière et non par rapport à une instance donnée.


```javascript
class Cla {
  static y = 'someValue';
  static #champPriveStatique;

  static st() {
    return 'static method has been called.';
  }

  static #methodePriveeStatique() {
    // …
  }
}

console.log(Cla.y);
console.log(Cla.st());
```

### Héritage

Le mot-clé `extends`, utilisé dans les déclarations de classes, permet de créer une **classe qui hérite d'une autre classe** (on parle aussi de sous-classe ou de classe-fille).

C’est pour éviter les répétitions qu’intervient la notion d’héritage. Grâce à elle on va pouvoir regrouper les points communs de nos classes au sein d’une classe parent et faire des classes enfants qui héritent de cette classe parent pour récupérer toutes ses propriétés et méthodes sans avoir à les redéfinir.

:::danger
* On étend la classe mère via le mot clé extends
* On appelle le constructeur parent via super()
* On ne peut étendre qu’une seule classe parent.

*Une classe enfant peut à son tour être une classe parent pour d’autres classes.*
:::

```javascript
class Animal {

  constructor(nom) {
    this.nom = nom;
  }

  move() {
    console.log(`${this.nom} se déplace.`);
  }
}

class Chien extends Animal {

  constructor(nom) {
    super(nom); // appelle le constructeur parent avec le paramètre
  }

  bark() {
    console.log(`${this.nom} aboie.`);
  }
}
```

## Destructuring

L'affectation par décomposition est une expression JavaScript qui permet d'extraire (unpack en anglais) des données d'un tableau ou d'un objet grâce à une syntaxe dont la forme ressemble à la structure du tableau ou de l'objet.

L'intérêt de l'assignation par décomposition est de pouvoir lire une structure entière en une seule instruction.

```javascript
let [a, b] = [10, 20];
console.log(a);// Expected output: 10
console.log(b);// Expected output: 20

const [a, b, ...rest] = [10, 20, 30, 40, 50];
console.log(rest);// Expected output: Array [30, 40, 50]

let { a, b } = { a: 10, b: 20 };
console.log(a); // 10
console.log(b); // 20

const { a, b, ...rest } = { a: 10, b: 20, c: 30, d: 40 };
console.log(a); // 10
console.log(b); // 20
console.log(rest); // {c: 30, d: 40}

let a, b;
[a, b] = [1, 2];
console.log(a); // 1
console.log(b); // 2
```
