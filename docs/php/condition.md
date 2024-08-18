---
sidebar_position: 4
title: Les conditions
---

## If else

Avec la condition `if`, nous restons relativement limités puisque cette condition nous permet seulement d’exécuter un bloc de code selon que le résultat d’un test soit évalué à true.

La structure conditionnelle `if…else` va être plus complète que la condition if puisqu’elle va permettre d’exécuter un premier bloc de code si un test renvoie true ou un autre bloc de code dans le cas contraire.

```php
$age = 20;
$salary = 300000;

// La condition if
if ($age == 20) {
    echo "1";
}

// Syntaxe spéciale : la condition if qui contient une seul instruction
if ($age === 20) echo "1";

// Comparaison de valeur : différence entre == et ===
$age == 20; // true (Comparaison de valeurs)
$age == '20'; // true

$age === 20; // true (Comparaison de type et valeurs)
$age === '20'; // false

// La condition if-else
if ($age > 20) {
    echo "Plus de 2O ans";
} else {
    echo "Moins de 21 ans";
}

// La condition if-elseif-else
if ($age > 20) {
    echo "Plus de 2O ans";
} elseif ($age === 20) {
    echo "20 ans";
} else {
    echo "Moins de 20 ans";
}

// Comparaison de valeur : et (https://www.php.net/manual/en/language.operators.logical.php)
if ($age > 20 && $salary === 300000) {

}
// Comparaison de valeur : ou
if ($age > 20 || $salary === 300000) {

}

// Syntaxe spéciale : La ternaire
echo $age < 22 ? 'Jeune' : 'Vieux';
echo '<br>';

// Syntaxe spéciale : La ternaire courte
$myAge = $age ?: 18; // Equivalent à "$age ? $age : 18"
```

## Opérateur de coalescence null

L'opérateur de coalescence null (??) a été ajouté comme un sucre syntaxique pour les cas de besoin les plus communs d'utiliser une troisième conjonction avec la fonction isset(). Il retourne le premier opérande s'il existe et n'a pas une valeur null sinon il retourne le second opérande.

```php
// Opérateur de coalescence null
$var = isset($name) ? $name : 'John'; // si name est declaré on prend le nom déclaré sinon on prend la valeur 'John'
$var = $name ?? 'John'; // Identique à la ligne du dessus
echo $var.'<br>';
```

## Switch

L'instruction switch équivaut à une série d'instructions if.

```php
$userRole = 'admin'; // admin, editor, user

switch ($userRole) {
    case 'admin': // Si la var $userRole prend la valeur 'admin' alors ...
        echo 'Le tout puissant admin.<br>'; // Une seule instruction
        break; // necessaire sinon le cas suivant sera executé
    case 'editor':
        echo 'Celui qui peut editer l\'histoire.<br>';
        break;
    case 'user':
        echo 'L\'utilisateur.<br>';
        break;
    default:
        echo 'Role inconnu.<br>';
}
```
