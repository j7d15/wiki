---
sidebar_position: 5
title: Conditions
---

Les conditions permettent d'exécuter des instructions selon si une condition est vérifiée ou non.

## Si sinon

L'instruction si sinon (if…else) exécute une instruction si une condition donnée est équivalente à vrai. Si la condition est équivalente à faux, ce sera l'instruction de la clause optionnelle else qui sera exécutée.

```javascript
let x = 1;
let y = 2;
let z = 3;
let xy = "2";

if(z<y) { // tester avec x<y et !z<y et y == xy et y === xy et(|| signifie OU) y === xy || x<y et(&& signifie ET) y === xy && x<y
    console.log('Si la condtion z < y est vrai (true)');
}else if(y<z){
    console.log('Sinon si le nombre stock" dans la variable y strictement plus petit que le nombre stocké dans la variable z');
}else{
    console.log('Le code dans ce bloque s\'éxécute si les conditions précédentes ont toutes retournées false');
}
```

### Condition sur une ligne

```javascript
// Execute le console.log que si condition renvoie true
if (x == y) console.log('x égale y');
```

### Ternaire

L'opérateur (ternaire) conditionnel est le seul opérateur JavaScript qui comporte trois opérandes. Cet opérateur est fréquemment utilisé comme raccourci pour la déclaration d'instruction si sinon.

`condition ? exprSiVrai : exprSiFaux;`

```javascript
x == y ? console.log("C'est vrai") : console.log('C\'est faux');
```

## Switch

L'instruction switch évalue une expression et, selon le résultat obtenu et le cas associé, exécute les instructions correspondantes.

```javascript
let variable = "Vue";

switch (variable) {
    case "Angular": //Si variable a pour valeur Angular on joue le console log
        console.log("Angular");
        break; // Le break stop l'execution sans lui des qu'un cas est déclenché les cas suivants seraient joué même si ils ne correpondent pas
    case "React":
        console.log("React");
        break;
    default: //Executé si aucun cas déclenché
        console.log("Vue ou Svelte ou autre");
}
```
