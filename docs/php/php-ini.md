---
sidebar_position: 15
title: Fichier de configuration
---

## Configuration globale de PHP

Le comportement de PHP est conditionné par la façon dont il est configuré.
La configuration de PHP peut être modifiée en partie par appel à des fonctions mais elle est définie par défaut dans un fichier baptisé par défaut php.ini (pouvant éventuellement faire appel à d'autres fichiers de configuration).

Le fichier de configuration (php.ini) est lu par PHP au démarrage.

### Trouver le fichier ini

#### Via un fichier php
Le plus simple dans le cas de l'utilisation de PHP dans un site web, c'est de faire appel à la fonction `phpinfo();`.

La ligne "Loaded Configuration File" vous donne le chemin du fichier php.ini.

Si ce fichier php.ini fait appel à d'autres fichiers, ceux-ci sont listés dans la ligne "additionnal .ini files parsed".

#### Via la ligne de commande

vous pouvez déterminer l'emplacement du fichier php.ini utilisé en tapant la commande suivante `php --ini`.

La ligne "Loaded Configuration File" vous donne le chemin du fichier php.ini.

Si ce fichier php.ini fait appel à d'autres fichiers, ceux-ci sont listés dans la ligne "additionnal .ini files parsed".

### Le contenu du fichier

#### Commentaires

; tout texte sur une ligne, situé après un point-virgule ";" est ignoré.

```ini
;extension_dir = "ext"
extension=curl
```

## Stocker des informations sécurisées en PHP

[Source](https://www.youtube.com/watch?v=L5E2HSHrDjw)

```shell title=".env"
DATABASE_HOSTNAME=localhost
DATABASE_USERNAME=db_username
DATABASE_PASSWORD=db_password
DATABASE_NAME=db_name
```

```shell title=".gitignore"
.env # Mettre un fichier .env.example pour laisser une trace de la structure du fichier attendue.
```

```ini title="config.ini"
[database]
hostname = localhost
username = db_username
password = db_password
database = db_name
```

```json title="config.json"
{
    "database": {
        "hostname": "localhost",
        "username": "db_username",
        "password": "db_password",
        "database": "db_name"
    }
}
```

```php title="config.php"
<?php

define("DATABASE_HOSTNAME", "localhost");
define("DATABASE_USERNAME", "db_username");
define("DATABASE_PASSWORD", "db_password");
define("DATABASE_NAME", "db_name");

$config = [
    "database" => [
        "hostname" => "localhost",
        "username" => "db_username",
        "password" => "db_password",
        "database" => "db_name"
    ]
];
```

```yaml title="config.yaml"
# Lecture compliquée en PHP donc mauvaise idée (third party librarie pour parser le fichier)
database:
    hostname: localhost
    username: db_username
    password: db_password
    database: db_name
```

```php title="index.php"
<?php

// Hardcoded values
/*
$hostname = "localhost";
$username = "db_username";
$password = "db_password";
$database = "db_name";
$mysqli = new mysqli($hostname,
                     $username,
                     $password,
                     $database);
*/

// Settings defined in PHP - constants and an array
/*
require __DIR__ . "/config.php";
$mysqli = new mysqli(DATABASE_HOSTNAME,
                     DATABASE_USERNAME,
                     DATABASE_PASSWORD,
                     DATABASE_NAME);
$mysqli = new mysqli($config["database"]["hostname"],
                     $config["database"]["username"],
                     $config["database"]["password"],
                     $config["database"]["database"]);
*/

// INI file
// $config = parse_ini_file(__DIR__ . "/config.ini", true);

// .env (https://github.com/vlucas/phpdotenv)
require __DIR__ . "/vendor/autoload.php";

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

$mysqli = new mysqli(getenv("DATABASE_HOSTNAME"),
                     getenv("DATABASE_USERNAME"),
                     getenv("DATABASE_PASSWORD"),
                     getenv("DATABASE_NAME"));

$mysqli = new mysqli($_ENV["DATABASE_HOSTNAME"],
                     $_ENV["DATABASE_USERNAME"],
                     $_ENV["DATABASE_PASSWORD"],
                     $_ENV["DATABASE_NAME"]);
```
