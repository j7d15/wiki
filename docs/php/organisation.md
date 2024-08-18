---
sidebar_position: 10
title: Organisation du code en plusieurs fichiers
---

:::note
Le but est de rester DRY (don't repeat yourself).
:::

## Include et require

On extrait le code répéter dans un fichier php et on l'inclue dans un autre fichier avec :

```php
<?php include "chemin-du-fichie-a-inclure.php" ?> <!--renvoie erreur mais continu lecture code et affichage si fichier non trouvé-->
<?php require "chemin-du-fichie-a-inclure.php" ?> <!--renvoie erreur fatal si fichier non trouvé et arrete l'execution-->

<?php include_once "chemin-du-fichie-a-inclure.php" ?> <!--Si déjà inclu une fois le fichier n'est pas réinclu -->
<?php require_once "chemin-du-fichie-a-inclure.php" ?> <!--Si déjà inclu une fois le fichier n'est pas réinclu -->
```

## Aparté sur les Chemins

* /partial/file.php part de la racine du projet.
* ./partial/file.php part de la racine du projet.
* partial/file.php part du dossier actuel.
* ../file.php permet de remonter 1 fois dans l'arboresence depuis le dossier ou l'on est.
* ../../file.php permet de remonter 2 fois dans l'arboresence depuis le dossier ou l'on est.

## Travailler avec le systéme de fichier

Un système de fichiers définit la manière dont les fichiers sont nommés, stockés et récupérés sur un périphérique de stockage.
Il gère des opérations telles que la gestion du stockage, le nommage des fichiers, les répertoires/dossiers, les métadonnées, les règles d’accès, permissions et privilèges.

[documentation](https://www.php.net/manual/en/book.filesystem.php)

```php
// Constante magique (constante déclaré automatiquement et qui change selon le contexte du programme)
echo __DIR__ . '<br>'; // Affiche le chemin du dossier ou l'on est
echo __FILE__ . '<br>'; // Affiche le chemin du fichier
echo __LINE__ . '<br>'; // Affiche à quelle ligne se trouve cette ligne dans la page html

// Créer un dossier
mkdir('test');

// Renomer un dossier
rename('test', 'test2'); Renomme test en test2

// Supprmier un dossier
rmdir('test2');

// Lire des fichiers et dossiers dans un dossier
$files = scandir('./');
echo '<pre>';
var_dump($files);
echo '</pre>';

// file_get_contents, file_put_contents (necessite un fichier lorem.txt contenant du texte)
$lorem = file_get_contents('lorem.txt'); //Stock le contenu textuelle du fichier dans une variable
echo $lorem;
echo '<br>';
file_put_contents('lorem.txt', "Ajoute cette ligne de texte au debut du fichier lorem.txt" . PHP_EOL . $lorem);

// file_get_contents depuis une URL (Depuis un fichier distant)
$jsonContent = file_get_contents('https://jsonplaceholder.typicode.com/users');
$users = json_decode($jsonContent);
var_dump($users);

// Verifier si un fichier existe
file_exists('lorem.txt'); // false

// Obtenir la taille du fichier
filesize('lorem.txt');

// Supprimer un fichier (Supprimer une image par exemple)
unlink('lorem.txt');
```
