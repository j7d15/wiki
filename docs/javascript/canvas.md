---
sidebar_position: 14
title: Canvas
---

`<canvas>` est une balise HTML qui peut être utilisé pour dessiner des éléments graphiques à l'aide de JavaScript.

```html title="html"
<canvas id="canvas"></canvas>
<!-- Le styliser avec css en donnant une width et une height -->
```

```javascript title="js"
function draw() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "rgb(200, 0, 0)"; //Défini la couleur
    ctx.fillRect(50, 50, 50, 50); //Dessiner un carré (Les 2 premier chiffres en paramétres indique la position, les 2 suivants la dimension du rectangle)
    ctx.fillStyle = "rgb(0, 200, 0)";
    ctx.fillRect(50, 50, 50, 50); // fillRect(x, y, largeur, hauteur)

    ctx.clearRect(50, 50, 50, 50); //Rend une zone blanche ou les couleurs n'ont pas d'effet

    ctx.strokeRect(125, 75, 50, 50); // Dessiner une ligne

    ctx.fillStyle = "rgba(0, 200, 0, 0.8)"; //Choisir une couleur
    ctx.beginPath();
    ctx.moveTo(180, 150); //Placer la pointe du 'stylo'
    ctx.lineTo(100, 75); //Premier trait
    ctx.lineTo(100, 150); //Second trait
    ctx.fill();//Pour le remplir de la couleur choisie 
}
window.addEventListener("load", draw);
```
