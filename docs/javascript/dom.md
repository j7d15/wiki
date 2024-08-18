---
sidebar_position: 9
title: Le DOM
---

## Document Objet Model (DOM) 

En JavaScript la page du navigateur est représentée sous forme d'un ensemble d'objets. 

Manipuler le DOM permet d'interagir avec la page web.

## L'inspecteur 🔍

L'inspecteur présent dans tous les navigateur web moderne (on l'ouvre avec un clique droit sur la page et inspecter) permet de voir le code de la page.

* code html et css dans elements.
* les fichiers reçus par le navigateur depuis le serveur (images, ico (pour les icones), ttf(pour les fonts), html, css, js ...) sont listés dans l'onglet sources.
* Les erreurs javascript sont visibles dans l'onglet console. Cette console de développement permet d'entrer des instructions à la volée, de consulter les données en mémoire ou d'explorer les fonctions et variables disponibles.

## Lier des feuilles js

```javascript
// balise à mettre dans le html juste avant la balise fermante du body
<script src="lien/vers/le/JS.js"></script> 

//  balise à mettre dans la balise head du html. L'attribut defer permet de charger le js une fois le document html chargé.
<script defer src="lien/vers/le/JS.js"></script>

```

## Les selecteurs

Les sélecteurs permettent de cibler un élément en fonction de la présence d'un attribut sur la balise HTML.

:::success
L'objet document est généré automatiquement à la création de la page. querySelector est une de ses méthodes.
:::

```javascript
//Avec le . on appel des methodes de l'objet document.
const selectBalise2 = document.querySelector('p');
const selectClass2 = document.querySelector('.class');
const selectId = document.getElementById('id');
const selectId2 = document.querySelector('#id');
const selectFormInput = document.querySelector('input[type="text"]');

const selectBalise = document.getElementsByTagName('p');
const selectClass = document.getElementsByClassName('class');
const selectAll = document.querySelectorAll('.  p');
```

## Injections

:::caution Ordre de priorité
Si on défini deux fois la même information concernant une balise on surchage l'information (le dernier qui parle a raison) sauf qu'il y a un ordre de priorité.

Attribut de la balise > #id > .class > baliseHTML () 
:::

:::note Surcharge
la surcharge fonctionne à des niveaux équivalents en partant du principe que l'on peut redefinir une valeur a la réecrivant plus loin dans le code) 
:::

```javascript
//De styles ----------------
document.querySelector('#id').style.background = "red";
document.querySelector('#id').style.wdth = "100%";
document.querySelector('#id').style.wdth = 100 + "%"; //On concaténe avec l'unité su la valeur provient d'une variable par exemple
//De classes ----------------
document.querySelector('#id').classList.add("nom-d-une-classe-definie-en-css"); //ajoute
document.querySelector('#id').classList.remove("nom-d-une-classe-definie-en-css"); //supprimer
document.querySelector('#id').classList.toggle("nom-d-une-classe-definie-en-css"); //Ajoute si absent, supprime si présent
//De textes
document.querySelector('#id').innerHTML = '<p>Du texte et ces balises qui seront interprétés</p>';
document.querySelector('#id').innerText = 'Que du texte';
```

## Ecouteurs d'evenements

```javascript
document.querySelector('#id').addEventListener('click', functionName);
document.querySelector('#id').addEventListener('click', () =>{

});

window.addEventListener('mousemove', (e) =>{ //window est l'element qui est au dessus de document dans l'arborescence de la page (au dessus du DOM). e est l'evenement que l'on passe en paramétre de fonction (il renferme plein d'informations)
    console.log(e); //e est un objet
    console.log(e.target);//target est l'elt survolé; 
    console.log(e.pageX);//position de la souris sur l'axe des x en px; 
    console.log(e.pageY);//position de la souris sur l'axe des y en px; 
});

window.addEventListener('mousedown', functionName); //Quand on appuye sur le bouton de la souris
window.addEventListener('mouseup', functionName); //Quand on relache (et que le bonton n'est pas appuyé) le bouton de la souris
window.addEventListener('mouseenter', functionName); //Quand on survole l'element (si on le quitte on garde la modif) (necessite mouseout pour annuler ce que l'on a fait(si on le souhaite))
window.addEventListener('mouseout', functionName); //Quand on arrete de survoler l'element
window.addEventListener('mouseover', functionName); //Quand on survole l'element (et uniquement quand on le survole si on le quitte on perd la modif)
window.addEventListener('scroll', functionName); 
window.addEventListener('load', functionName); // La fonction se joue une fois que tous le document a été chargé. 
window.addEventListener('input', (e) =>{ //Listener à mettre sur un input qui se déclenche a chaque symbole ajouté dans l'input
    console.log(e.target.value); //Recup ce qui se trouve dans le champ imput
});

document.addEventListener('keypress', (e) =>{
    console.log(e);
    console.log(e.key);//Touche appuyé ; 
}); 

function functionName(){
    //Fait des trucs ... 
}
```

## Bubbling vs Usecapture

:::note 
Par default l'EventListener est en bubbling.
:::

```javascript
//Bubbling (se declenche en dernier)
document.addEventListener('keypress', (e) =>{
    console.log(e);
}, false); 
//Usecapture (se déclence en premier)
document.addEventListener('keypress', (e) =>{
    console.log(e);
}, true); 

//Stop propagation (empechera un autre evenement click d'etre declenché quand celui ci sera joué)
document.addEventListener('click', (e) =>{
    e.stopPropagation();
}); 

//Supprimer un eventListener
document.removeEventListener('click', functionName);
```

## Jouer des sons

```javascript
//Les navigateurs bloquent les sons joués automatiquements
//Il faut déclencher le son suite à un clique sur un élément html
const audio = new Audio('chemin/de/laudio.mp3');
audio.play();
```

## SetProperty

```javascript
selectId.style.setProperty("--varName", 100 +"px"); //Permet de remplacer en css la --varName avec la valeur donné en second parametre (en css à la place de la valeur on met var(--varName))
```

## Creation d'elements

```javascript
let card = document.createElement('img'); //Créer l'element carte
card.setAttribute('src', 'assets/images/back.png'); // Ajouter un attribut
card.setAttribute('data-id', i); // Ajouter un attribut
board.appendChild(card); //Inserer l'element créer dans la page (Entre les balises de l'element ciblé avec board)

//https://developer.mozilla.org/fr/docs/Web/API/Element/insertAdjacentHTML
```

## Dataset

```javascript
//en html (ajout de l'attribut data-cequonveut)
//<h3 data-value="la-value" id="3">Test</h3>

//en js
const h3 = document.getElementById("3");
console.log(h3.dataset); //Liste tous les attributs data-
console.log(h3.dataset.value); //donne la valeur de l'attribut data-value
```
