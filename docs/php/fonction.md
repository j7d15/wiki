---
sidebar_position: 6
title: Les fonctions
---

Une fonction correspond à une série cohérente d’instructions qui ont été créées pour effectuer une tâche précise.

## Declarer une fonction

Un nom de fonction valide commence par une lettre ou un underscore, suivi par un nombre quelconque de lettres, de nombres ou de underscores (insensible à la casse).

```php
function hello()
{
    echo 'Hello Tim.<br>';
}
```

## Appeler une fonction

Pour exécuter le code contenu dans une fonction, il va falloir appeler la fonction.

```php
hello();
```

## Declarer et appeler une fonction avec des arguments

Souvent, les fonctions vont avoir besoin d’informations qui leurs sont externes, c’est-à-dire d’informations qui ne se situent pas dans la définition de la fonction pour fonctionner correctement.

Les informations qu’on va passer à une fonction sont appelées des arguments. Nous allons toujours passer les arguments dans les parenthèses de notre fonction.

:::note Quelles différences entre un paramètre et un argument ?
 On parlera de paramètre lors de la définition d’une fonction. Un paramètre sert à indiquer qu’une fonction va avoir besoin d’un argument pour fonctionner mais ne correspond pas à une valeur effective : ce n’est qu’un prête nom. 
 
 Un argument en revanche correspond à la valeur effective passée à une fonction.
:::

```php
function hi($user)
{
    echo "Hi $user. <br>";
}

hi('Barbara');
```

## Typage

```php
function welcome(string $mrs, string $mr) : void
{
    echo " Welcom Mrs $mrs and Mr. $mr. <br>";
}

welcome('Kyle', 'Wayne');
```

## Retour de la fonction

Les valeurs sont renvoyées en utilisant une instruction de retour optionnelle avec le mot clef `return`. 
Tous les types de variables peuvent être renvoyés, tableaux et objets compris. Cela fait que **la fonction finit son exécution immédiatement** et passe le contrôle à la ligne appelante.

```php
function sum(int $a, int $b): int 
{
    return $a + $b;
}

echo '<br> Je fais une addition : ' . sum(3, 2);
```
