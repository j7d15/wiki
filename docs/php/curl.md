---
sidebar_position: 13
title: cURL
---

CURL signifie Client URL et c'est une bibliothèque qui vous permet d'effectuer des requêtes HTTP en PHP. Le but est entre autre de consommer une API (recupérer les données envoyées par un autre serveur aprés avoir fait une demande (appeler une URL)).

:::warning
Il existe un methode get_content mais celle ci est bloquée (pour raison de sécurité) sur plein de serveur d'ou le passage par cURL.
:::

## Methode GET

```php
$url = 'https://jsonplaceholder.typicode.com/users'; // url à laquelle on fait une demande et qui renverra une réponse

$request = curl_init(); // initialisation du cURL

curl_setopt($request, CURLOPT_URL, $url); // On pointe vers l'url
curl_setopt($request, CURLOPT_RETURNTRANSFER, true); // On demande qu'une réponse soit retournée.
curl_setopt($request, CURLOPT_SSL_VERIFYPEER, false); // Permet de retirer la verification SSL (si il y en a une)

if($response == false) { //Verifie l'erreur curl retournée
   echo 'Error : ' . curl_error($request);
}

$response = curl_exec($request); //On stock la réponse retourné dans une variable

$status = curl_getinfo($request, CURLINFO_HTTP_CODE); // Code du status de la réponse (200 si ça marche)

curl_close($request); // Fermeture du cURL (ne pas le faire provoque une fuite de donné et une utilisation de la mémoire du serveur)

$response = json_decode($response); // La réponse est en json donc on la décode

//On affiche les données de la reponse retournée
echo '<pre>';
echo $status;
print_r($response);
echo '</pre>';
```

## Les Autres méthodes HTTP

On peut egalement envoyer des données (POST) avec curl

```php
$user = [ //On crée une donnée
    'name' => 'John Doe',
    'username' => 'john',
    'email' => 'john@example.com'
];

$ch = curl_init($url);
curl_setopt_array($ch, [ //Cette fois on passe les options sous forme d'un array
    CURLOPT_POST => true, // On indique que l'on envoye des infos
    CURLOPT_POSTFIELDS => json_encode($user), // On encode en json
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPHEADER => array('Content-Type: application/json') // On indique dans l'entete que l'on envoie des données encodé en JSON
]);
$result = curl_exec($ch);
curl_close($ch);
//On affiche
var_dump ($result);
```
