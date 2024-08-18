---
sidebar_position: 8
title: Portée et référence
---

## Affectation...

### par valeur

On duplique le contenu d'une variable dans un autre espace mémoire que l'on nomme.

```php
$leNombre1 = 20;
$leNombre2 = $leNombre1;
var_dump($leNombre1);
var_dump($leNombre2);
$leNombre1 = 3;
var_dump($leNombre1);
var_dump($leNombre2);
```

### par référence

On donne un alias à une variable. La seconde variable pointe le même espace mémoire.)

```php
$leNombre3 = 20;
$leNombre4 = &$leNombre3; //& en plus
var_dump($leNombre3);
var_dump($leNombre4);
$leNombre3 = 3;
var_dump($leNombre3);
var_dump($leNombre4);
```

## Portée des variables (locale vs globale)

```php
function laPorteeDesVariables(){
    $portee = "locale"; // Cette variable n'existe que dans la fonction
}

$portee = 'globale'; // Variable globale différente de la variable déclaré dans la fonction precedement
```

:::caution Comment faire en sorte que les deux variable soit identiques ?
    ```php
    Solution 1 : Retourner la valeur avec la fonction
     function laPorteeDesVariables(){
         $portee = "locale"; // Cette variable n'existe que dans la fct
         //return $portee; // Resout le pb de portée
     }

    // $portee = laPorteeDesVariables(); // On affecte la valeur du return dans la variable globale

    Solution 2 : Déclarée la variable dans la fonction comme étant globale == mauvaise pratique car risque d'effet de bord (affectation involontaire)
     function laPorteeDesVariables(){
         global $portee;
         $portee = "locale"; // Cette variable est globale
     }
     ```
:::
