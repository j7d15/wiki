---
sidebar_position: 5
title: Les boucles
---

## La boucle tant que : while

La signification d'une **boucle while** est simple.

PHP exécute l'instruction tant que l'expression de la boucle while est évaluée comme `true`. *La valeur de l'expression est vérifiée à chaque début de boucle*, et, si la valeur change durant l'exécution de l'instruction, l'exécution ne s'arrêtera qu'à la fin de l'itération.

```php
//while (true) { Boucle infini a ne surtout pas executer
    // instructions
//}

// La boucle tant que avec un compteur : while (Pour passer dans la boucle il faut que la condition soit vérifier en premier)
$counter = 0; 
while ($counter < 10) {
    echo 'while ' . $counter . '<br>';
    $counter++;
}
```

## La boucle faire tant que : do while

Les **boucles do-while** ressemblent beaucoup aux boucles while, mais l'*expression est testée à la fin de chaque itération* plutôt qu'au début. 

La principale différence par rapport à la boucle while est que *la première itération de la boucle do-while est toujours exécutée*.

```php
# On passe au moins une fois dans la boucle avant de verifier la condition
$counter = 0;
do {
    echo ' Do While ' . $counter . '<br>';
    $counter++;
} while ($counter < 10);
```

## La boucle pour : for

La boucle **for** s'utilise avec la syntaxe suivante: instruction for, suivi d'une parenthèse ouvrante, suivi de la *condition initiale (l'initialisation)*, suivi d'un point-virgule, suivi de *la condition nécessaire à la poursuite de l'exécution de la boucle*, suivi d'un point-virgule, suivi de l'*opération à effectuer avant le nouveau test de condition*, suivi d'une parenthèse fermante et enfin l'instruction (ou le bloc d'instructions) à exécuter (tant que la condition est vérifiée).

```php
for ($i = 0; $i < 10; $i++) {
    echo 'for ' . $i . '<br>';
}
```

## La boucle pour chaque : foreach

L'**instruction itérative foreach** est une **fonction**. Elle est utilisable pour parcourir un tableau.

```php
$heroes = ["Nightwing", "Batgirl", "Superman", "Catwoman"];

// Afficahge sans l'index
foreach ($heroes as $hero) {
    echo $hero . '<br>';
}
// Affichage de l'index
foreach ($heroes as $i => $hero) {
    echo $i . ' ' . $hero . '<br>';
}
```

## Iterer dans un tableau associatif

```php
$person = [
    'firstname' => 'Bruce',
    'lastname' => 'Wayne',
    'surname' => 'Batman',
    'age' => 42,
    'hobbies' => ['Sciences', 'Sports'],
];
foreach ($person as $key => $value) {
    if ($key === 'hobbies') {
        break; // Empecher l'affichage des hobbies
    }
    echo $key . ' ' . $value . '<br>'; // Afficher la clef et la valeur associée
}

// if (is_array($value)) {
//     implode(",", $value); // afficher les valeurs du tableau hobbies
// } else {
//     echo $key . ' ' . $value . '<br>'; // Afficher la clef et la valeur associée
// }
```