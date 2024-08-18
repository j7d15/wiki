---
slug: mode-sombre-css-js
title: Créer un thème interactif avec JavaScript et CSS
date: 2023-08-05T23:00
authors: admin
tags: [CSS, JS, thème, thème sombre]
description: Comment créer un thème clair et un thème sombre rapidement sans avoir à charger deux feuilles de styles différentes et sans recharger la page ?
keywords: [thème, thème css, thème js, thème interactif]
---

Comment créer un thème clair et un thème sombre rapidement sans avoir à charger deux feuilles de styles différentes et sans recharger la page ?

<!--truncate-->

Le principe est d'utiliser JavaScript pour modifier la valeur d'un attribut data sur la balise html du document html.

Selon la valeur, le sélecteur css défini un jeu de couleurs différent.

```html title="index.html"
<!DOCTYPE html>
<html lang="fr" data-theme>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Thème</title>
        <link rel="stylesheet" href="style.css">
        <script defer src="app.js"></script>
    </head>
    <body>
        <h1 class="test">Je change de couleur !!!</h1>

        <button id="btn">Cliquer ici</button>
    </body>
</html>
```

```css title="style.css"
:root {
    --primary: black;
    --secondary: whitesmoke;
}

body {
    background-color: var(--secondary);
}

.test {
    color: var(--primary);
}

html[data-theme="dark"] {
    --primary: whitesmoke;
    --secondary: black;
}
```

```js title="app.js"
document.querySelector('#btn').addEventListener('click', () => {
    const theme = document.querySelector('html');
    if (theme.dataset.theme === 'dark') {
        theme.dataset.theme = '';
    } else {
        theme.dataset.theme = 'dark';
    }
})
```
