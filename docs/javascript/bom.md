---
sidebar_position: 10
title: Le BOM
---

Le BOM, ou Browser Object Model va nous permettre d'accéder au navigateur, et notamment à la fenêtre ouverte actuellement.

:::note
Le DOM représente la structure et le contenu de la page alors que le BOM représente les fonctionnalités du navigateur.
:::

## Window

L'objet window représente la fenetre du navigateur.

```javascript
console.log(window.innerHeight); //Hauteur de la fenetre
console.log(window.scrollY);

window.open('https://google.com', "", "height=600, width=800"); // Ouvre une popup
window.close(); //Ferme la fenetre en cours
window.onload = () => {
    //logique;
};

alert('Hello'); // C'est en réalité window.alert('Hello');
confirm('Question ?'); //Alert qui permet de stopper une action
prompt("J'attend un input"); // A stocker dans une variable pour récupérer ce que l'utilisateur entre comme réponse

setTimeout(() => { //Compte à rebour avant de jouer la fonction
    //logique
}, 2000);

let interval = setInterval(() => { //Relance la fonction tous les 2 secondes
    //logique
}, 2000);
clearInterval(interval); //Stop l'interval
```

## Naviguation et control du navigateur

Le BOM nous permet entre autre de recharger une page, de changer d'URL et de se déplacer dans l'historique du navigateur.

```javascript
//location
console.log(location.href); // Donne l'URL de la page ou l'on est
console.log(location.host); // Donne l'hote (nom de domaine))
console.log(location.pathname); // Donne le chemin de la page (chemin après le nom de domaine)
console.log(location.search); // Donne le contenu et les param de la recherche (après le ? dans l'URL)

Location.replace('https://google.fr'); //Redirection

//Navigateur
console.log(navigator.userAgent);
//Peut servir à la geolocalisation (voir doc du MDN) (Les API font mieux)

//history
console.log(history); //Acceder à l'historique du navigateur
window.history.back(); //Revenir au dernier site visité
window.history.go(-2); //Revien 2 sites en arriére dans l'historique
```
