---
sidebar_position: 3
title: Les tableaux
---

## Les bases

[documentation](https://www.php.net/manual/en/ref.array.php).

En programmation, un tableau est une collection d'éléments (des nombres, des variables, etc.). 

Ces éléments sont numérotés avec des indices (index, en anglais).

```php
// Declarer et initialiser un tableau
$fruits = array(); //Ancienne façon de déclarer un tableau
$animals = ['Dog', 'Cat', 'Bird'];

//Afficher un tableau dans le navigateur
var_dump($animals); // Pas trés lisible on utilise des balises html pour rendre l'affichage agréable (<pre>)
echo '<pre>';
var_dump($animals);
echo '</pre>';

// Extraire un element via son index (get)
echo $animals[0]; // Attention l'index commence à 0

// Ajouter un element via son index (set)
$animals[3] = 'Monkey';

// Verifier si le tableau contient un element à un index donné
isset($animals[1]); //true

// Taille du tableau
echo '<br>La taille du tableau est de: ' . count($animals);

// Ajouter un elts à la fin
$animals[] = 'Fish';
array_push($animals, 'Snake'); // Via une fonction

// Supprimer un elts à la fin
array_pop($animals);

// Ajouter un element au debut de tableau
array_unshift($fruits, 'Apple');

// Supprimer un element au debut de tableau
array_shift($fruits);

// Transformer une chaine de caractére en tableau
$food = 'Milk,Chocolate,Vegetable';
$foods = explode(",",$food);
echo '<br>';
var_dump($foods);

// Transformer un tableau en chaine de caractére
$ingredient = implode(", ", $foods);
echo '<br>';
var_dump($ingredient);

// Vérifier si un element existe dans un tableau
echo '<br>';
var_dump(in_array('Spider', $animals)); // Retourne false

// Obtenir l'index d'un element dans un tableau
echo '<br>';
var_dump(array_search('Dog', $animals));

// Fusionner 2 tableaux
$arrayMerge = array_merge($animals, $foods); // A partir de PHP 7.4 on peut ecrire [...$animals, ...$foods];
echo '<br> Fusion : ';
var_dump($arrayMerge);

// Filtrer par ordre alphabetique (ou ordre numerique avec des nombres)
sort($arrayMerge); // rsort (pour avoir dans l'ordre inverse)
echo '<pre>';
var_dump($arrayMerge);
echo '</pre>';
```

## Les tableaux associatifs

```php
// Créer un tableau associatif (tableau clefs=>valeur)
$pets = [
    'nb-species' => 48800,
    'class' => 'Arachnida',
    'subphylum' => 'Arthropoda', // Arthropoda est un phylum ce qui est corrigé plus bas.
    'predators' => ['Guepe', 'Reptile'],
];
echo '<pre>';
print_r($pets); // ou var_dump();
echo '</pre>';
// Obtenir un element par sa clef (get)
echo $pets['class'].'<br>';

// Changer un element en utilisant sa clef (set)
$pets['subphylum'] = 'Chelicerata';

//Operateur de coalescence null 
if (!isset($pets['phylum'])){ //(avant php 7.4)
    $pets['phylum'] = 'Arthropoda';
}
$pets['phylum'] ??= 'Arthropoda'; //(depuis php 7.4) (?? verifie si la valeur est "set")
echo 'Phylum : ' . $pets['phylum'].'<br>';

// Vérifier si le tableau à une clef spécifique
echo '<pre>';
var_dump(isset($pets['nb-species']));  // Tester en modifiant par 'localization'
echo '</pre>';

// Afficher les clefs
echo '<pre>';
var_dump(array_keys($pets));
echo '</pre>';

// Afficher les valeurs
echo '<pre>';
var_dump(array_values($pets));
echo '</pre>';

// Trier un tableau associatif par valeur et par clef
ksort($pets); // ksort, krsort, asort, arsort
echo '<pre>';
var_dump($pets);
echo '</pre>';
```

## Les tableau multi-dimensionnels

```php
// Déclarer un tableau multi-dimensionnels
$todos = [
    ['title' => 'faire le ménage', 'isCompleted' => false],
    ['title' => 'faire les courses', 'isCompleted' => false],
    ['title' => 'laver la voiture', 'isCompleted' => true]
];

echo '<pre>';
var_dump($todos);
echo '</pre>';

// Afficher la valeur d'une autre dimension
echo '<pre>';
var_dump($todos[1]['isCompleted']); // Affiche false
echo '</pre>';
```
