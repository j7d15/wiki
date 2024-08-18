---
sidebar_position: 3
title: Les bases
---

:::info Convention 
Les mots clefs en SQL s'écrivent en majuscule. (On peut utiliser l'extension de fichier .sql)
:::

:::danger MySQL vs PostgreSQL
Les noms de tables et colonnes sont renseignés entre `backtick` et les string entre 'simple quote' ou "double quotes" avec MySQL.

Les noms de tables et colonnes sont renseignés entre "doubles quotes" et les string entre 'simple quote' avec PostgreSQL.
:::

## Bases de données(BDD)

* Créer une BDD
```sql
CREATE DATABASE database_name;

-- Mysql
CREATE DATABASE `database_name`;
```
* Supprimer une BDD
```sql
DROP DATABASE database_name;

-- Mysql
DROP DATABASE IF EXISTS `database_name`;
```
* Utiliser une BDD (Permet au gestionnaire de savoir dans quelle base de données les requêtes vont être exécutées.)
```sql
 USE database_name;
```

## Tables

* Créer une table
```sql
 CREATE TABLE table_name(
    first_column INT NOT NULL,
    second_column VARCHAR(255)
);

-- Mysql
CREATE TABLE `chat` (
        `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
        `text` VARCHAR(255) NOT NULL,
        `editable` boolean,
        `sender` int,
        `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
        `updated_at` DATETIME ON UPDATE CURRENT_TIMESTAMP
    );

-- Postgresql
CREATE TABLE "employe"(
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(80) NOT NULL DEFAULT 'Barbossa',
    "email" VARCHAR(255) UNIQUE, --255 n'est pas la limite supérieur avec postgreSQL ni MySql sur les dernières versions mais c'est la limite historique qu'on conserve en cas de changement de bdd dans un projet.
    "age" SMALLINT,
    "timestamp_date" TIMESTAMP DEFAULT timezone('Europe/Paris', NOW())
);
```

* Modifier (altérer) une table
```sql
ALTER TABLE table_name ADD another_column VARCHAR(255);
```

* Supprimer le contenu d'une table (Supprime **toutes** les données d'une table)
```sql
ALTER TABLE table_name ADD another_column VARCHAR(255);
```

* Supprimer une table
```sql
DROP TABLE IF EXISTS table_name;

-- Mysql
DROP TABLE IF EXISTS `table_name`;
```

## CRUD

CRUD est l'acronyme de Create(Créer), Read(Lire), Update(Modifier), Delete(Supprimer).

* C Create(Créer)
```sql
INSERT INTO table_name (first_column) VALUES (value);

INSERT INTO table_name (first_column, another_column) VALUES (value, value);

INSERT INTO table_name (first_column) VALUES (value), (value), (value);

-- postgresql
INSERT INTO "employe"("name", "email", "age") VALUES (null, 'davy@jones.org', 400);

INSERT INTO "employe"("name", "email", "age") VALUES
('Jack', 'jack@gmail.com', 54),
('Will', 'will@gmail.com', 45),
('Elizabeth', 'elize@gmail.com', 42);
-- ' Sert d'échappement ex: l''oiseau
```

* R Read(Lire)
```sql
SELECT * FROM nom_table;

SELECT first_column, another_column FROM nom_table;

-- postgresql
SELECT * FROM "employe";
SELECT "name" FROM "employe";
SELECT "name", "email" FROM "employe";
SELECT "name", "email" FROM "employe" WHERE "name" = 'Jack';
SELECT "name" FROM "employe" WHERE "age" < 43;  -- =, <, >, <=, >=, !=, <>
SELECT * FROM "employee" ORDER BY "id"; -- Sort les enregistrements dans l'ordre croissant de leur id
```

* U Update(Modifier)
```sql
-- Sans Where tout les enregistrements seront modifiés!!!!!!!!!!!!!!
UPDATE table_name SET first_column=value WHERE another_column=value;

--postgresql
UPDATE "employe" SET "age" = 42 WHERE "id" = 2;
UPDATE "employe" SET "email" = 'sparrow@gmail.com' WHERE "name" = 'Jack';
```

* D Delete(Supprimer)
```sql
-- Sans Where tout les enregistrements seront supprimés!!!!!!!!!!!!!!
DELETE FROM table_name WHERE another_column=value;

--postgresql
DELETE FROM "employe" WHERE "id" = 1;
DELETE FROM "employe" WHERE "id" > 1;
DELETE FROM "employe" WHERE "id" = 1 OR "id" = 3;
DELETE FROM "employe" WHERE "id" BETWEEN 1 AND 3;
```

:::danger
Sans la clause `where` tous les enregistrements seront modifiés ou supprimés !!!!!!!!!!!!!!
:::

## CONTRAINTES
Principe : contrôle la donnée avant qu'elle soit enregistrée dans la table.

* CHECK Verifie une condition sur le champ avant d'insérer l'enregistrement dans la BDD
* NOT NULL Le champ ne pourra jamais être vide
* UNIQUE Assure que le champ contient une valeur unique (la valeur ne peut être présente 2 fois dans la même colonne)
* PRIMARY KEY et FOREIGN KEY Ajoute une clef sur la colonne correspondante (voir chapitre : associations)
