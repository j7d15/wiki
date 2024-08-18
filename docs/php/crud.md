---
sidebar_position: 14
title: CRUD
---

## Prérequis : Base de données

On crée une base de données `user` contenant 4 champs : 
* id, 
* email, 
* password et 
* roles. 

On crée 2 users avec sql :
```sql
 INSERT INTO `user` (`id`, `email`, `password`, `roles`) VALUES ('1', 'azlan.test.fr', 'azerty', '[\"ROLE_USER\"]'), ('2', 'zlan.test.fr', 'wxcvbn', '[\"ROLE_ADMIN\"]');
```

## Connection à la base de données

:::note
On utilise PDO car universel. Mysqli est uniquement lié au bdd mysql.
:::

```php
//Constantes
define('DBHOST', 'localhost');
define('DBNAME', 'tuto-php2021');
define('DBUSER', 'root');
define('DBPASS', '');

//DSN de connexion (dsn = data source name)
$dsn = "mysql:dbname=" . DBNAME .";host=" . DBHOST; 

//Assurer la connexion
try{
    $db = new PDO($dsn, DBUSER, DBPASS); // On instancie la classe PDO
    echo 'Connexion établie avec succée.';
    $db->exec("SET NAMES utf8"); //On s'assure d'envoyer les données avec l'encodage UTF8
    $db->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC); //parametrage du fectch par defaut
}catch(PDOException $e){
    die("Erreur : " . $e->getMessage()); //Affiche un message d'erreur si echec de la connection
}
```

## CRUD avec requetes préparées et nommées(create, read, update, delete)

CRUD (create, read, update, delete) (créer, lire, mettre à jour, supprimer) est un acronyme mnémotechnique pour les quatre fonctions de base du stockage persistant des données.

:::note
Les requetes préparées protéges des injections sql.
:::

## Lire

```php
//---------R(read)------------------
//Afficher l'utilisateur avec l'id = 1 (si plusieurs champs on recupére un tableau au final que l'on affiche avec un foreach)
$sqlR = "SELECT * FROM `user` WHERE `id`=:id"; //Requete en sql avec :id qui est un paramétre nommé
$request = $db->prepare($sqlR); // On prépare la requete
$request->bindValue(":id", 1, PDO::PARAM_INT); // On associé la valeur int 1 au paramétre nommé (on utilise PDO::PARAM_STR si string)
$request->execute(); // On execute la requête
$user = $request->fetchAll();
// On affiche
echo '<pre>';
var_dump($user);
echo '</pre>';
```

## Créer

```php
//---------C(create)------------------
$sqlC = "INSERT INTO `user`(`id`, `email`, `password`, `roles`) VALUES (:id, :email,:pass, :roles)"; //Requete en sql
// même code que pour R mais sans le fectchAll)
```

## Mettre à jour

```php
//---------U(update)------------------
$sqlU = "UPDATE `user` SET `email`=:email,`password`=:pass,`roles`=:roles WHERE id = :id"; //Requete en sql
// même code que pour R mais sans le fectchAll)
```

## Supprimer

```php
//---------D(delete)------------------
$sqlD = "DELETE FROM `user` WHERE id = :id"; //Requete en sql
// même code que pour R mais sans le fectchAll)
```
