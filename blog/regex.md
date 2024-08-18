---
slug: regex
title: Les expressions régulières (REGEX)
date: 2024-02-12T16:07
authors: admin
tags: [Regex, expressions régulières]
description: Docker est un outil qui peut empaqueter une application et ses dépendances dans un conteneur isolé, qui pourra être exécuté sur n'importe quel serveur.
keywords: [Regex, expressions régulières]
---

Les **expressions régulières** également dites **rationnelles**, ou plus communément nommée **regex** pour **regular expressio**n sont des outils très puissants et très utilisés pour représenter des modèles de chaînes de caractère possibles : on peut les retrouver dans de nombreux langages comme le *PHP* et le *JavaScript*.
<!--truncate-->
## Définition

**Le role des REGEX dans nos programmes sera de controller la composition d'une chaine de caractères en se basant sur l'analyse de motifs**. Elle permettra de répondre à la question suivante par exemple : Est-ce que la syntaxe de cette adresse mail est conforme ?

Les expressions régulières ont la qualité de pouvoir être décrites par des formules et si cet outil est très puissant, il est relativement difficile à appréhender car les expressions régulières peuvent prendre des formes complexes.

Exemple : `+#^[a-zA-Z-]+@[a-zA-Z-]+\.[a-zA-Z]{2,6}$#+`

## Ecrire une regex

### Caractères de début et fin de chaîne
Les caractères de début et de fin de chaîne, respectivement `^` et `$`, représentent, comme leur nom l'indique, le début et la fin de la chaîne.

`^Bonjour` recherchera Bonjour en debut de chaine et `bonjour$` en fin de chaine.

### OU

Si nous voulons rechercher, dans un texte, les mots chocolat et pastèque, nous devrons alors utiliser la barre verticale `|`.
Ainsi la regex suivante sélectionnera toutes les occurrences de chocolat et pastèque : `chocolat|pastèque`.
La regex suivante sélectionnera tout le mot chocolat en début de texte et pastèque à n'importe quelle position: `^chocolat|pastèque`.

### Ensembles de caractères

 nous voulons chercher dans notre texte, les mots : mots, mats, mits, mets.
 Nous pourrions utiliser cette regex sans ensemble de caractéres: `mots|mats|mits|mets`.
 Cette même regex avec les ensembles de caractères : `m[eoai]ts`.

 Les ensembles de caractères permettent aussi d'exclure des caractères grâce à l'accent circonflexe `^`.
 La regex suivante : `m[^oai]ts` sélectionnera seulement le mots mets.

### Les intervalles

* L'intervalle `[a-z]` est équivalent à l'ensemble des lettres minuscules allant de a à z.
* L'intervalle `[A-Z]` est équivalent à l'ensemble des lettres majuscule allant de A à Z.
* L'intervalle `[0-9]` est équivalent à l'ensemble des chiffres allant de 0 à 9.
* L'intervalle `[a-z0-9]` est équivalent à l'ensemble des lettres minuscules allant de a à z ou des chiffres de 0 à 9.

### Les quantificateurs

Les quantificateurs sont des caractères qui indiquent le nombre de répétitions du caractère ou de la suite de caractère qui les précèdent.
Le quantificateur, dans sa forme explicite, peut s'écrire de 4 façons :

* `{min,max}` : le nombre de répétitions varie entre la valeur minimale et la valeur maximale incluses.
* `{min,}` : le nombre de répétitions varie entre la valeur minimale incluse et l'infini.
* `{,max}` : le nombre de répétitions varie entre 0 et la valeur maximale incluse.
* `{nombre}` : le nombre de répétitions correspond au nombre marqué entre les accolades.

L'exemple suivant permet de 7 lettres consécutives : `[a-zA-Z]{7}`.

### Échappement

Comme avec les langages de programmation comme JavaScript et PHP, on peut échapper un symbole dans une chaine de caractère avec le symbole `\` .
Les symboles concernées sont : `^ $ \ . | { } [ ] ( ) ? # ! + * `.

### Ensembles préconçus

Un ensemble préconçu est une façon très simple de représenter plusieurs intervalles.

* L''ensemble `.` est équivalent à n'importe quel caractère.
* L''ensemble `\w` est équivalent à `[a-zA-Z0-9_]`.
* L''ensemble `\d` est équivalent à `[0-9]`.

Finalement `m\wts` est équivalent à `m[a-zA-Z0-9_]ts`

### Quantificateurs préconçus

* Le quantificateur `*` est équivalent à `{0,}`.
* Le quantificateur `+` est équivalent à `{1,}`.
* Le quantificateur `?` est équivalent à `{,1}`.

### Drapeaux

Se place après le dernier `/` de l'expression réguliére pour modifier son comportement.

* `g` Capture globale utile pour les recherches de multiple occurence
* `i` Insensible à la casse
* `ig` Pour faire des combinaisons de drapeaux

## Des liens utiles

Une référence vers le site de microsoft qui propose un aide-mémoire plus complet sur le sujet :
[aide-mémoire](https://learn.microsoft.com/fr-fr/dotnet/standard/base-types/regular-expression-language-quick-reference)

Gardez à l'esprit que lorsque la rédaction d'une regex s'impose on se précipite sur les moteurs de recherche et on utilise des alliés pour controller notre travail ou nos trouvailles.

[Voici un site permettant de tester des REGEX](https://regex101.com/)

[Un autre site qui peut s'avérer utile et au nom évocateur](https://ihateregex.io/)

## Demonstration

```javascript title="Regex mail"
function testRegex(str)
{
    // Avec JS on utilise / pour terminer et débuter une REGEX et pas de # ou @ comme on peut l'avoir dans d'autre langage.
    regexp = /^[a-zA-Z-]+@[a-zA-Z-]+\.[a-zA-Z]{2,6}$/;
    if (regexp.test(str))
    {
        console.log("true");
    }
    else
    {
        console.log("false");
    }
}
testRegex('Bonjour, je suis developpeur.');
testRegex('jack@gmail.com');
```

```javascript title="Tester la presence de Bonjour"
function testRegex(str)
{
    regexp = /Bonjour/;
    if (regexp.test(str))
    {
        console.log("true");
    }
    else
    {
        console.log("false");
    }
}
testRegex('Bonjour, je suis developpeur.');
testRegex('Hola ! Bonjour.');
```

```javascript title="Tester Bonjour en debut de mail"
function testRegex(str)
{
    regexp = /^Bonjour/;
    if (regexp.test(str))
    {
        console.log("true");
    }
    else
    {
        console.log("false");
    }
}
testRegex('Bonjour, je suis developpeur.');
testRegex('Hola ! Bonjour.');
```

```javascript title="Tester Le ou |"
function testRegex(str)
{
    regexp = /developpeur|Hola/;
    if (regexp.test(str))
    {
        console.log("true");
    }
    else
    {
        console.log("false");
    }
}
testRegex('Bonjour, je suis developpeur.');
testRegex('Hola bonjour.');
```

```javascript title="Tester les ensemble de caractères à inclure dans la recherche"
function testRegex(str)
{
    regexp = /m[eoai]ts/;
    if (regexp.test(str))
    {
        console.log("true");
    }
    else
    {
        console.log("false");
    }
}
testRegex('mots,mats, mits, mets');
testRegex('mais');
```

```javascript title="Tester les ensemble de caractères à exclure dans la recherche"
function testRegex(str)
{
    regexp = /m[^eoai]ts/;
    if (regexp.test(str))
    {
        console.log("true");
    }
    else
    {
        console.log("false");
    }
}
testRegex('mots,mats, mits, mets');
testRegex('myts');
```

```javascript title="Tester les intervalles en cherchant la présence de nombres"
function testRegex(str)
{
    regexp = /[0-9]/;
    if (regexp.test(str))
    {
        console.log("true");
    }
    else
    {
        console.log("false");
    }
}
testRegex('Y a 1 nombre');
testRegex('Y a pas de nombres.');
```

```javascript title="Tester les quantificateurs"
function testRegex(str)
{
    regexp = /[0-9]{2}/;
    if (regexp.test(str))
    {
        console.log("true");
    }
    else
    {
        console.log("false");
    }
}
testRegex('Y a 1 nombre');
testRegex('Y a pas de nombres.');
testRegex('Y a 10 nombres');
```

```javascript title="Tester la présence de nombres avec les ensemble préconcus"
function testRegex(str)
{
    regexp = /\d/;
    if (regexp.test(str))
    {
        console.log("true");
    }
    else
    {
        console.log("false");
    }
}
testRegex('123aze');
testRegex('123');
testRegex('aze');
```
