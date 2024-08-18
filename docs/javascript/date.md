---
sidebar_position: 8
title: Les dates
---

```javascript
let date = new Date(); //Prend la date du jours
let timestamp = Date.parse(date);//Date.parse()transforme une date en timestamp timestamp : Nombre de milliseconde écoulé de puis le premier janvier 1970 (on utilise ce format car pratique pour les calculs sur les dates)
let isoString = date.toISOString(); //Format standard souvent rencontré

function dateParser(chaine) { //Formater les dates
    let newDate = new Date(chaine).toLocaleDateString("fr-FR", {
        year: "numeric",
        month: "long", //Ou "short" ou "numeric"
        day: "numeric",
        hour: "numeric",
        minute: "numeric"
    });
    return newDate;
}
console.log(dateParser(timestamp));
console.log(dateParser(date));
console.log(dateParser(isoString));

const dateDestructuring = (chaine) => {
    let newDate = chaine.split('T')[0]; //Garde le premier tableau suite a la coupure au niveau de la letre 'T'
    newDate = newDate.split("-"); //Pour séparer en 3 tableaux selon le tiret
    let [y, m, d] = newDate;
    return(d, m, y).join("/");
}

console(dateDestructuring(isoString));
```
