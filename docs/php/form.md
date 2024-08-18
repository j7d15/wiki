---
sidebar_position: 9
title: Les formulaires
---

```php
<!DOCTYPE html>
<html lang="fr">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Traiter les formulaires</title>
    </head>
    <body>

        <?php 
            //POST ($_POST[] est une superglobale).
            //Récupere les données d'un formulaire HTML de façon invisible pour l'utilisateur.
            //print_r($_POST); //Pour voir le tableau fourni par la superglobale.
            if(isset($_POST)){
                echo "Titre : " . $_POST['title'];
            }

            //GET ($_GET[] est une superglobale).
            //Récupere les données d'un formulaire HTML de façon visible en passant des paramétres d'URL.
            //print_r($_GET); //Pour voir le tableau fourni par la superglobale.
            if(isset($_GET)){
                echo "name : " . $_GET['name'];
            }
        ?>

        <form method="post"> 
            <input type="text" name="title">
            <input type="text" name="year">
            <button type="submit">Soumettre</button>
        </form>

        <br>

        <form method="get">
            <input type="text" name="name">
            <input type="password" name="password"> <!--Mauvaise idée : le mdp est visible en clair dans l'url -->
            <button type="submit">Soumettre</button>
        </form>
    </body>
</html>
```
