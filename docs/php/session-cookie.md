---
sidebar_position: 15
title: Sessions et cookies
---

Techniques pour sauver temporairement des données pour un utilisateur spécifique.

En PHP le cookie est sauvegardé coté client, la session coté serveur.

## Session

```php title="En PHP"
session_start(); // debute une session (sauve un id session en cookie) (necessaire au début de chaque page voulant accéder à la session)

echo session_id(); // afficher l'id de la session

$_SESSION['counter'] = $_SESSION['counter'] ?? 0; // Stocker une valeur dans une variable en session. (utilisation de la super globale) : Si la var counter existe ne rien faire sinon l'initialiser à 0

$_SESSION['counter']++; // Ajouter +1 au compteur counter stocker en session

// La donné une fois sauvée reste en session jusqu'a ce qu'on la ferme ou qu'on la retire.

//unset($_SESSION['name']); // Supprime manuellement la donné ciblée.
//session_unset(); // Supprime toute les données de session
// session_destroy(); Supprime la session. Un session_start() est necessaire pour recréer une session.

echo '<pre>';
var_dump($_SESSION);
echo '/<pre>';
```

```html title="En HTML"
<p>Page visitée <?= $_SESSION['counter'] ?> fois pendant cette session.</p>
```

A retenir :
- chaque session à un id différent (ce qui permet d'éviter la confusion entre les connexions).
- à chaque page où notre session doit être active, on doit placer un session_start en tout début de page (avant tout code HTML).
- toutes les variables enregistrées au cours de notre session, seront accessibles dans les pages de notre session.
- n'oubliez JAMAIS de détruire vos variables de session lors de la déconnexion.

## Cookie

Usage : personnalisation, organisation de session et traque

```php
// Créer un cookie
setcookie('name', 'J', time()+60); //setcookie('key', 'value', durée maximum); (temps présent +60secondes)

// Le mettre à jour
setcookie('name', 'JD', time()+3600); // On crée un cookie en utilisant la m^me key qu'un cookie existant mais en changeant la valeur. (temps présent + 1heure)

// Le supprimer
setcookie('name', 'JD', time()-1);// On crée un cookie en utilisant la m^me key qu'un cookie existant mais en changeant la durée. (il y a une seconde)

```
