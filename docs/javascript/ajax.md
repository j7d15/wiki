---
sidebar_position: 12
title: Consommer une API
---

Envoyer des requêtes HTTP pour échanger des données entre le site web et un serveur.

## Vocabulaire : AJAX

L'AJAX (Asynchronous JavaScript + XML) permet de réaliser des **mises à jour de l'interface utilisateur sans devoir recharger** la page entière dans le navigateur. On utilise cette technique pour faire une requete à une API (on parle de consommer une API).

*De nos jours l'échange de ressources (données) avec une API se fait principalement en JSON qui est une chaine de texte qui représente un structure de données exploitable.*

## XMLHttpRequest

Les objets [XMLHttpRequest (XHR)](https://developer.mozilla.org/fr/docs/Web/API/XMLHttpRequest_API/Using_XMLHttpRequest) permettent d'interagir avec des serveurs. On peut récupérer des données à partir d'une URL sans avoir à rafraîchir complètement la page. Cela permet à une page web d'être mise à jour sans perturber les actions de l'utilisateur.

Pour envoyer une requête HTTP, on pourra :
1. Créer un objet XMLHttpRequest
1. Ouvrir une URL
1. Envoyer la requête

Lorsque la transaction sera terminée, l'objet XMLHttpRequest contiendra les informations de la réponse, comme son corps et le statut HTTP résultant.

:::note
Une requête envoyée avec XMLHttpRequest peut récupérer les données de façon asynchrone ou de façon synchrone. 

Le comportement obtenu est choisi avec le troisième argument optionnel async de la méthode XMLHttpRequest.open(). **Lorsque cet argument vaut true ou s'il n'est pas fourni, la requête est traitée de façon asynchrone.**

*Les requêtes synchrones ne peuvent pas être utilisées en dehors des workers, car elles bloqueraient l'interface principale.*
:::

```javascript
let req = new XMLHttpRequest();

function reqListener() {
    console.log(this.responseText);
}
req.onload = reqListener;
//req.open('get', './4data.txt', true);
//req.open('get', './4data.json', true);
//req.open('get', 'https://notreurl', true);
req.send();
```

```javascript title="Demo swapi"
// https://developer.mozilla.org/fr/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest
function reqListener() {
    console.log(this.responseText);
  }
  
  const req = new XMLHttpRequest();
  req.addEventListener("load", reqListener); // load = Le transfert de données est terminé. Toutes les données sont transmisent.
  req.open("GET", "https://swapi.dev/api/people/1");
  req.send();
```

:::note
Malgré son nom, XMLHttpRequest peut être utilisé afin de récupérer tout type de données et pas uniquement du XML.
:::

## Axios

[Axios](https://axios-http.com/fr/docs/intro) est un client HTTP basé sur les promesses compatibles avec node.js et les navigateurs.

Installation local avec npm : `npm i axios`

Utilisation depuis un cdn (content delivery network) distant : `<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <!--axios-->
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
    <script src="app.js"></script>
    
</head>
<body>
    
</body>
</html>
```

```javascript
// Axios
// https://axios-http.com/fr/docs/intro
axios.get('https://swapi.dev/api/people/2')
  .then(function (response) {
    // en cas de réussite de la requête
    console.log(response);
    console.log(response.data);
  })
  .catch(function (error) {
    // en cas d’échec de la requête
    console.log(error);
  })
  .finally(function () {
    // dans tous les cas
  });
```

## Fetch

[L'API Fetch](https://developer.mozilla.org/fr/docs/Web/API/Fetch_API/Using_Fetch) (en anglais, le verbe fetch signifie récupérer) fournit une méthode globale fetch() qui permet un accès aux ressources récupérées de façon asynchrone sur le réseau.

Fetch propose par rapport aux XMLHttpRequest un ensemble de fonctionnalités plus souples et plus puissantes. À la différence de XMLHttpRequest qui fonctionne à l'aide de fonctions de rappel (callbacks), l'API Fetch utilise les promesses.

:::danger
fetch() utilise un argument qui correspond au chemin de la ressource à récupérer et il ne renvoie pas directement une réponse avec un corps en JSON, mais une promesse qui est résolue en un objet Response.

L'objet Response ne contient pas directement le corps de la réponse en JSON mais fournit une représentation de l'ensemble de la réponse HTTP. Aussi, pour extraire le corps en JSON de l'objet Response, on utilise la méthode `json()`, qui renvoie une deuxième promesse dont la résolution fournit le résultat de l'analyse du corps de la réponse au format JSON.
:::

### Theorie

```javascript
fetch(url) // L'adresse URL des données à aller chercher
  .then(data => { // Attendre que les données soient reçues
    // Convertir les données au format désiré data.json()
  })
  .then(result => { // Attendre que les données soient converties
    // Faire du résultat ce que bon vous semble
  });
```

### Pratique

```javascript
fetch('4data.txt').then((res) => {
    console.log(res); // body qui contient le texte non lisible a cette étape
    res.text(); //permet de lire le contenu du body (fonctionne pour les fichier .txt)
}).then((data) => {
    console.log(data); //Permet de lire le texte contenu dans le body de la reponse et qui vaut le contenu du fichier texte
})

fetch('4data.json').then((res) => {
    console.log(res); // body qui contient le texte non lisible a cette étape
    res.json(); //permet de lire le contenu du body (fonctionne pour les fichier .json)
}).then((data) => {
    console.log(data); //Permet de lire le texte contenu dans le body de la reponse et qui vaut le contenu du fichier texte
})
```

La méthode `.catch()` permet d'indiquer quoi faire si le serveur ne répond pas ou s'il prend trop de temps à répondre.

```javascript
fetch(url) // L'url de la ressource à aller chercher
  .then(() => { // Attendre que la ressource soit reçue, et ensuite (then)
    // Traiter la ressource
  })
  .catch(err => { // Oh, oh le serveur ne répond pas
    // Activer le plan B
    console.log(err);
  });
```

### Objet d'options

La méthode fetch() permet l'utilisation optionnelle d'un deuxième paramètre, un objet init pour contrôler différents paramètres.

```javascript
const init = {
    method: "POST", // Par defaut c'est GET
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({ //JSON.stringify convertie en JSON (le type utilisé pour le corps doit correspondre à l'en-tête "Content-Type")
        key1: "Valeur1"
    }),
    mode: "cors", //Le «  Cross-origin resource sharing » (CORS) est un mécanisme qui consiste à ajouter des en-têtes HTTP afin de permettre à un agent utilisateur d'accéder à des ressources d'un serveur situé sur une autre origine que le site courant. Un agent utilisateur réalise une requête HTTP multi-origine (cross-origin) lorsqu'il demande une ressource provenant d'un domaine, d'un protocole ou d'un port différent de ceux utilisés pour la page courante.
    cache: "default",
    credentials: "same-origin",
}
```
### Démonstration

```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Les films Star Wars</title>
    <script defer src="app.js"></script>
</head>
<body>
    <h1>Les films Star Wars</h1>

    <h2>Listes des films</h2>
    <ul id="list"></ul>

    <h2>Rechercher par film</h2>
    <button id="ep4-btn">Episode 4</button>
    <button id="ep5-btn">Episode 5</button>
    <div id="detail">
        
    </div>
</body>
</html>
```

```javascript
const list = document.querySelector('#list');

getAllFilms();

function getAllFilms() {
    fetch(`https://swapi.dev/api/films/`) // http://id-apprenant-server.eddi.cloud:port/endpoint (Pour le front ils ont un lien en favoris pour y accéder)
    .then(response => {
        response.json().then(data => {
            console.log(data);
            data.results.forEach(film => {
                const li = document.createElement('li');
                li.innerText = film.title;
                list.appendChild(li);
            });
        });
    });
}

const detail = document.querySelector('#detail');

const ep4 = document.querySelector('#ep4-btn');
const ep5 = document.querySelector('#ep5-btn');

ep4.addEventListener('click', () => {getOneFilm(1)});
ep5.addEventListener('click', () => {getOneFilm(2)});

function getOneFilm(id) {

    detail.innerText = '';

    fetch(`https://swapi.dev/api/films/${id}`)
    .then(response => {
        response.json().then(movie => {
            console.log(movie);

            const h3 = document.createElement('h3');
            h3.innerText = movie.title;
            detail.appendChild(h3);

            const plot = document.createElement('p');
            plot.innerText = movie.opening_crawl;
            detail.appendChild(plot);

            const director = document.createElement('p');
            director.innerText = 'Director : ' + movie.director;
            detail.appendChild(director);

        });
    });
}

```

## Promesse et asynchrone

À défaut de pouvoir répondre immédiatement une fonction peut retourner une promesse. Cette approche est particulièrement utile lorsque la fonction en question contacte un serveur externe, puisque son délai de réponse peut varier.

*Si la promesse est respectée, la méthode .then() est ensuite appelée et la valeur de la réponse lui est passée en paramètre.
*Si la promesse est brisée et qu’une méthode .catch() est présente, elle est appelée et un message d’erreur lui est envoyé.

:::success
`then()/catch() `et `async/await` servent à gérer les promesses en JavaScript.
:::

:::note
async/await est une façon plus moderne d’écrire du code asynchrone cependant cette façon fait partie d’ECMAScript 2017 et n’est pas supportée par Internet Explorer et les vieux navigateurs
:::

```javascript
async function fetchData(){
    await fectch('monlien'); //On peut utiliser plusieur await d'affilé
    //attend que le await soit executé avant de faire la suite
    executeFonction();
};

const fectchDataFlechee = async () => { 
    await console.log('test'); 
    executeFonction();
};
```

```javascript title="exemples pratiques"
// (async function() {
//     const data = await fetch(`https://swapi.dev/api/films/5`).then(res=>res.json())
//     console.log(data);
//   })()

async function episodeTwoInfo() {
    const data = await fetch(`https://swapi.dev/api/films/5`).then(res=>res.json())
    console.log(data);
}

episodeTwoInfo();

async function afficherFilms() {
  const reponse = await fetch("http://example.com/films.json");
  const films = await reponse.json();
  console.log(films);
}
```

### Promesses multiples

```javascript
const userInfo = await getUserInfo();
const orders = await getOrders();

// Syntaxe alternative

const [userInfo, orders] = await Promise.all([getUserInfo(), getOrders()]);
```

## CORS

Le [Cross-origin resource sharing (CORS)](https://developer.mozilla.org/fr/docs/Web/HTTP/CORS) est un mécanisme qui consiste à ajouter des en-têtes HTTP afin de permettre à un agent utilisateur d'accéder à des ressources d'un serveur situé sur une autre origine que le site courant.

Le standard CORS est utilisé afin de permettre les requêtes multi-origines pour L'utilisation des API XMLHttpRequest ou Fetch.

Le standard CORS fonctionne grâce à l'ajout de nouveaux en-têtes HTTP qui permettent aux serveurs de décrire un ensemble d'origines autorisées pour lire l'information depuis un navigateur web.

```javascript title="exemple dans node"
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); //  Définit un URI qui peut accéder à la ressource. Le navigateur doit respecter cette contrainte. Pour les requêtes qui n'impliquent pas d'informations d'authentification, le serveur pourra indiquer un joker ("*") qui permet à n'importe quelle origine d'accéder à la ressource.
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // indique la ou les méthodes qui sont autorisées pour accéder à la ressource.
  next();
});

//Alternative (npm i cors) (https://www.npmjs.com/package/cors)
const cors = require('cors');
app.use(cors());
```

## Les Web API

Quand on code en JavaScript pour le web, il y a un grand nombre d'API disponibles. Les API web sont intégrées au navigateur web et permettent de rendre disponibles les données du navigateur et de son environnement afin de réaliser des choses complexes avec.

Les API (Application Programming Interfaces soit « interface de programmation d'application » en français) dans ce contexte sont des constructions de codes intégrées dans le navigateur permettant une mise en œuvre plus facile de fonctionnalités.

:::note
DOM, BOM et fetch sont des API.
:::

Chaque API JavaScript a son propre fonctionnement. Elles partagent toutefois des fonctionnalités communes et des thèmes similaires.

Les API interagissent avec le code en utilisant un ou plusieurs objets JavaScript, qui servent de conteneurs pour les données utilisées par l'API (contenues dans les propriétés d'objet), et la fonctionnalité rendue disponible par l'API (contenue dans des méthodes d'objet).

Voici ce que l'on peut faire avec les web API.

```javascript
//Client storage (stocker des données sur l'ordinateur client)

//Local storage (stockage de 10Mo en reglage par defaut)
//Stockage sous forme de clefs valeurs (utile pour le mode nuit d'un site par exemple. Persiste si on ferme le navigateur)
//On ne peut pas passer un objet ni un tableau (ne marche qu'avec les chaines de caracteres)
localStorage.data = "Je Stock la data"; //Stock la donnée (Aller voir dans l'inspecteur l'onglet application)

//localStorage.data = JSON.stringify(obj); //Transformera un objet en json (stockable)
//console.log(JSON.parse(localStorage.data)); //Recupere la donnée (Transforme le json en objet)

console.log(localStorage.data); //Recupere la donnée
localStorage.removeItem('data'); //Supprimer la donnée stockée

//Session Storage (stockage de ?Mo)
//Disparait dés que l'on ferme la page ou la fenetre du navigateur
sessionStorage.data = "55px"; // Créer une donnée stocké en session (Aller voir dans l'inspecteur l'onglet application)
console.log(sessionStorage.data); //Afficher l'info
sessionStorage.clear(); //Vider la session

//Cookies (stockage de 4Ko)
//Permet de stocker des tokens par exemple
document.cookie = "username=NomDeLUtilisateur";//Ajouter un cookie avec la syntaxe "clef=valeur" (Aller voir dans l'inspecteur l'onglet application)
document.cookie = "username=NomDeLUtilisateur;path=/; max-age=4500; secure; samesite"; //path sur quelle route le cookie sera généré; max-age ça durée en milliseconde; secure le cookie ne transitera que si le site est consulté en https.

```
