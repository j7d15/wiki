---
sidebar_position: 11
title: REGEX
---

Les expressions rationnelles (REGEX de l'anglais REGular EXpression) sont des motifs utilisés pour correspondre à certaines combinaisons de caractères au sein de chaînes de caractères.

```javascript
let mail = "test@test.fr";

//Search -------------------------------
console.log(mail.search(/test/)); //Renvoie 0 car trouve 'test'
console.log(mail.search(/123/)); //Renvoie -1 car trouve pas '123' dans mail

//replace -------------------------------
console.log(mail.replace(/test/, /admin/)); //remplace 'test' par 'admin'

//demo separateur des milliers
let separator = 123456789;
console(separator.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."));

//match ---------------------------------
console.log(mail.match(/Test/));//renvoie null car sensible à la casse
console.log(mail.match(/Test/i));//renvoie true car le modificateur i rend insensible à la casse

console.log(mail.match(/[a-z]/));//renvoie true car mail contient des lettres comprisent entre a et z
console.log(mail.match(/\w/));//renvoie true car mail contient des lettres comprisent entre a et z

//demo sur un mail
console.log(mail.match(/^[\w_-]+@[\w_-]+\.[a-z]{2,4}$/i))
```
