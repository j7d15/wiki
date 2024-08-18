---
sidebar_position: 2
title: Les variables
---

## Avant de commencer

On utilise l'extension de fichier `.php`.
On peut écrire du html dans un fichier php.
Pour ecrire du php on utilise la balise `<?php ?>`.

:::warning
En PHP les instructions se terminent toujours par le symbole `;`.
:::

## Commentaires

```php
// Sur une ligne

# Sur une ligne

/* 
Plusieurs
lignes
*/
```

## Hello world

```php
<?php echo 'hello world'; ?> 
<?php
     echo '<br>'; 
    echo'<button>Boutton</button>'
?>
<?= 'hello world' ?>
```

## Variables

### Introduction

une variable nous permet de stocker temporairement des informations.
Chaque variable est identifiée par un nom unique commençant par un `$` en pouvant contenir lettres, chiffres et underscore(_).

:::note
Les chiffres sont autorisés mais pas en premier caractère.
Les noms de variables sont sensibles à la casse (majuscule et minuscule).
:::

```php
$name = 'Chaine de caractére'; //Declaration sans typage (=variable dynamique) et initialisation à la valeur "Chaine de caractére"
$age = 21;
$isAlive = true; // ou 1 (1 sera la valeur affiché si on fait un echo)
$height = 1.95;
$power = null;

//Afficher une variable
echo $name . '<br>' . $age; // Concatenation avec le .

//Obtenir le type d'une variable
echo '<br>' . gettype($name) . '<br>';
var_dump($age, $isAlive);

//Changer la valeur d'une variable
$name = 'Valeur de la variable $name modifiée.'; // Il suffit de la redefinir

// constantes
define('LASTNAME', 'Nom de famille');
echo LASTNAME;
```

### Les types

* String
* Integer => int
* Float/Double
* Boolean => bool
* Null
* Array
* Object
* Resource

Fonctions qui verifie le contenu d'une variable :

```php
is_string($age); // retourne false
is_int($age); // retourne true
is_bool($age);
is_double($age);
is_float($age);

// Fonction qui verifie si une variable est defini (n'est pas null)
isset($name); //true
isset($nickname); //false
```

### Les nombres
[documentation](https://www.php.net/manual/en/ref.math.php)

#### Déclarer et initialiser

```php
$a = 5;
$b = 4.5;
$c = $a + $b;
```

#### Operations arithmetiques

* `+`
* `-`
* `*`
* `/`
* `%`

```php
echo '<br>' . ($a + $b * $b / 4.5) . '<br>'; // Priorité des opérations respectée
echo ($a % 2); // Retourne le reste de la division (utile pour savoir si un nombre est pair)
```

#### Opérateur d'assignations

* `+=`
* `-=`
* `*=`
* `/=`
* `%=`

```php
$a += $b; 
echo '<br>' . $a;
```

#### Opérateur d'incrementation et décrementation

* `++`
* `--`

```php
echo '<br>' . $a++; // n'incremente pas car fait le echo et incremente
echo '<br>' . ++$a; // incremente puis fait le echo
```

#### Fonctions

```php
// Vérification
is_double($a);
is_float(1.25);
is_int(1); is_integer(1); // Ce sont les mêmes fonctions
is_numeric("3.5"); // Verifie si un string peut etre convertie en nombre; retourne true

// Conversion (caster)
$strInteger = "33";
$Integer = (int)$strInteger; //caster
$Integer = intval($strInteger); //Via une fonction
echo '<br> Ceci est une conversion: ' . gettype($Integer) . '<br>';

// Fonctions utilisables sur les nombres (arrondir, puissance, absolue, troncature ...)
echo "abs(-15) " . abs(-15) . '<br>';
echo "pow(2,  3) " . pow(2, 3) . '<br>'; //pow(base, exposant)
echo "sqrt(16) " . sqrt(16) . '<br>'; // Racine carrée
echo "max(2, 7, 4, 3) " . max(2, 7, 4, 3) . '<br>';
echo "min(2, 3) " . min(2, 3) . '<br>';
echo "round(2.4) " . round(2.4) . '<br>'; //arrondie
echo "round(2.6) " . round(2.6) . '<br>'; //arrondie
echo "floor(2.6) " . floor(2.6) . '<br>'; // Arrondie toujours à l'inférieur
echo "ceil(2.4) " . ceil(2.4) . '<br>'; // Arrondie toujours au supérieur

// Formatter des nombres
$number = 123456789.12345;
echo number_format($number, 2, '.', ',') . '<br>'; //number_format(variable, nombreDeChiffreApresVirgule, 'separateurDecimal', 'separateurDesMilliers')
```

### Les chaines de caractéres

[documentation](https://www.php.net/manual/en/ref.strings.php)

#### Déclarer et initialiser

```php
$greeting = "Bonjour";
```

#### Concaténation et affichage

```php
echo $greeting . ', <br>' . $name; // ''Affiche du texte
echo '<br>';
echo "$greeting, <br> $name"; // "" gére l'interpretation des variables
```

#### Fonctions

```php 
$string = "    Hello World      ";
echo '<br>'; // PHP_EOL correspond à un retour chariot (\n)
echo "1 - " . strlen($string) . '<br>' . PHP_EOL; //Taille de la chaine de caractere (length)
// HTML ignore les espaces avant et aprés une chaine à l'affichage mais ce n'est pas le cas lorsque l'on stock dans des variables PHP
echo '2 - ' . trim($string) . '<br>' . PHP_EOL; // Enleve les espaces avant et aprés le premier et dernier caractére de la chaine
echo '3 - ' . ltrim($string) . '<br>' . PHP_EOL; // Enleve les espaces avant le premier caractére de la chaine(l = left)
echo '4 - ' . rtrim($string) . '<br>' . PHP_EOL; // Enleve les espaces aprés le dernier caractére de la chaine (r = right)
echo '5 - ' . str_word_count($string) . '<br>' . PHP_EOL; // Compte le nombre de mot
echo '6 - ' . strrev($string) . '<br>' . PHP_EOL; // Inverse l'ordre des lettres
echo '7 - ' . strtoupper($string) . '<br>' . PHP_EOL; // Passe toutes les caractéres en majuscule
echo '8 - ' . strtolower($string) . '<br>' . PHP_EOL; // Passe toutes les caractéres en minuscule
echo '9 - ' . ucfirst('hello') . '<br>' . PHP_EOL; // Passe le premier caractéres en majuscule
echo '10 - ' . lcfirst('HELLO') . '<br>' . PHP_EOL; // Passe le premier caractéres en minuscule
echo '11 - ' . ucwords('hello world') . '<br>' . PHP_EOL; // Passe le premier caractéres de chaque mot en majuscule
echo '12 - ' . strpos($string, 'world') . '<br>' . PHP_EOL; // Renvoie la position du premier caractére si il trouve la séquence world dans la variable (World)
echo '13 - ' . stripos($string, 'world') . '<br>' . PHP_EOL; // Comme strpos mais insensible à la casse.
echo '14 - ' . substr($string, 8) . '<br>' . PHP_EOL; // Extrait une chaine de caractére (8 correspond au debut de la position à extraire et il va jusqu'a la fin)
echo '15 - ' . str_replace('World', 'PHP', $string) . '<br>' . PHP_EOL; // Remplace une chaine par une autre
echo '16 - ' . str_ireplace('world', 'PHP', $string) . '<br>' . PHP_EOL; // ... insensible à la casse

// Ecrire sur plusieurs ligne et gestion des sauts de lignes
$longText = "Bonjour,
    Je veux <b>écrire</b> sur ...
    plusieurs lignes.";
    echo '1 - ' . $longText . '<br>';
    echo '2 - ' . nl2br($longText) . '<br>'; // Respect les espaces et saut de ligne
    echo '3 - ' . htmlentities($longText) . '<br>' . PHP_EOL; // Protége de l'injection html
    echo '4 - ' . nl2br(htmlentities($longText)) . '<br>' . PHP_EOL;
    echo '5 - ' . html_entity_decode(htmlentities($longText)) . '<br>' . PHP_EOL; // Repere les balises html dans un texte et les appliquent à la page
    echo '6 - ' . htmlspecialchars($longText) . '<br>' . PHP_EOL;

```
