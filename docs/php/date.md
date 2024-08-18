---
sidebar_position: 7
title: Les dates
---

La fonction PHP `date()` permet d’obtenir une date selon le format de notre choix.

Cette fonction peut prendre deux arguments. Le premier argument correspond au format de date souhaité et est obligatoire. Le deuxième argument est facultatif et c'est un Timestamp relatif à la date qu’on souhaite retourner.

Si le Timestamp est omis, alors la fonction date() se basera sur la date courante du serveur.

```php
// Afficher la date du jour
echo date('Y-m-d H:i:s') . '<br>';

// Afficher la date d'hier
echo date('Y-m-d H:i:s', time() - 60 * 60 * 24) . '<br>';

// Jouer avec les formats: https://www.php.net/manual/en/function.date.php
echo date('F j Y, H:i:s') . '<br>';

// Afficher le timestamp (Standard qui désigne le nombre de secondes écoulées depuis le 1er janvier 1970. Avantages et inconveniants : http://www.timestamp.fr/)
echo time() . '<br>';

// Parse (modifier) une date: https://www.php.net/manual/en/function.date-parse.php
$dateString = '2020-02-06 12:45:35';
$parsedDate = date_parse($dateString); 
echo '<pre>';
var_dump($parsedDate);
echo '</pre>';

// Parse date depuis un format: https://www.php.net/manual/en/function.date-parse-from-format.php
$dateString = 'February 4 2020 12:45:35';
$parsedDate = date_parse_from_format('F j Y H:i:s', $dateString);
echo '<pre>';
var_dump($parsedDate);
echo '</pre>';
```
