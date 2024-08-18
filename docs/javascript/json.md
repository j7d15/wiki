---
sidebar_position: 17
title: JSON
---
JSON (JavaScript Object Notation) est un **format d'échange de données textuel**. Il est utilisé pour représenter des structures de données.

:::note
Un objet JSON est uniquement un format de données.
:::

Il est populaire en raison de son style auto-descriptif, facile à comprendre, léger et compact.

Un fichier JSON ne contient que des propriétés. La notation JSON **nécessite l'usage des doubles quotes** `""`  autour des chaînes de caractères et des noms de propriétés pour être valide.

exemple :

```javascript
{
    "key1": "value1",
    "key2": 2,
    "key3": true,
    "key4": ["elt0", "elt1"],
    "key5": {
        "subkey1": "subvalue1"
    }
}
```

```javascript
    console.log(JSON.stringify(data)); //On transforme un objet en JSON
    console.log(JSON.parse(JSON.stringify(data)));//On transforme du json en objet js
```