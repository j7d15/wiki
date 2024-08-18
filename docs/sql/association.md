---
sidebar_position: 5
title: Associations
---

## Les clefs

* PRIMARY KEY : Identifiant unique qui permet d'identifier de façon unique chaque enregistrement de la table.

:::note
- Une clé primaire peut être composée d'une ou de plusieurs colonnes de la table. 
- Deux lignes distinctes de la table ne peuvent pas avoir les mêmes valeurs dans les colonnes définies comme clé primaire. 
- Il est possible de définir pour une même table plusieurs contraintes d'unicité, mais au plus une seule clé primaire.
- La clef primaire dit que cette colonne contient une information unique pour l'enregistrement mais ne génére pas cette information d'ou l'ajout d'un type permettant l'increment sur la colonne en question.
:::

```sql
-- auto-increment : Ajoute automatiquement 1 à chaque nouvel enregistrement.
 CREATE TABLE table_name(
    id INT NOT NULL AUTO_INCREMENT,
    PRIMARY KEY (id)
);

 CREATE TABLE table_name(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY
);

--postgresql (auto_increment équivaut à serial)
CREATE TABLE "movie"(
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(50)
);
```

:::success
L'ensemble constitué d'une clé primaire et d'une clé étrangère sert à établir des associations (relations) entre tables.
:::

* FOREIGN KEY : Clef qui fait réference à une clef primaire d'une autre table. Permet de mettre en place des associations.
```sql
 CREATE TABLE table_name(
    first_column INT NOT NULL,
    second_column VARCHAR(255)
    FOREIGN KEY (second_column) REFERENCES another_table_name(id)
);

CREATE TABLE table_name(
    first_column INT NOT NULL,
    second_column VARCHAR(255) REFERENCES another_table_name(id)
);

--postgresql
CREATE TABLE "session_movie"(
    "session_id" INT REFERENCES "session"("id"),
    "movie_id" INT REFERENCES "movie"("id")
);
```
:::caution
Si il y a une association entre les tables produit et categorie:
* on ne peut pas insérer une ligne dans la table produit avec un id de catégorie qui n'existe pas dans la table categorie;
* on ne peut pas supprimer une ligne de la table categorie si au moins une ligne de la table produit a une valeur d'id de catégorie correspondant à la ligne à supprimer.
:::

:::danger
La contrainte de clé étrangère est un des principes fondamentaux des bases de données relationnelles : Oracle, Microsoft SQL Server, PostgreSQL, MariaDB, etc.

Sur MySQL, il faut utiliser le moteur **InnoDB** pour obtenir cette fonctionnalité. Actuellement le moteur MyISAM ne gère pas les clés étrangères.
:::

## JOINTURES

:::danger
Il n'est pas nécessaire qu'une association entre les tables soit en places pour faire des jointures.
:::
Idée : Les jointures consistent à associer des lignes de 2 tables en associant l’égalité des valeurs d’une colonne d’une première table par rapport à la valeur d’une colonne d’une seconde table.
[Source](https://sql.sh/cours/jointures)

* JOIN = INNER JOIN
```sql
-- jointure interne pour retourner les enregistrements quand la condition est vrai dans les 2 tables.
SELECT * FROM table_name JOIN another_table_name ON table_name.first_column=another_table_name.first_column;
SELECT * FROM table_name INNER JOIN another_table_name ON table_name.first_column=another_table_name.first_column;

--postgresql
CREATE TABLE "department"(
    "id" SERIAL PRIMARY KEY, -- Clef primaire = valeur colonne unique et pas plusieurs clef primaire par table
    "name" VARCHAR(50) NOT NULL
);

CREATE TABLE "employee"(
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(80),
    "department_id" INT
);

INSERT INTO "department"("name") VALUES
('biologie'),
('informatique'),
('physique');

INSERT INTO "employee"("name", "department_id") VALUES
('Jackson', 2);

SELECT "employee"."name" AS "Nom de l'employé", "department"."name" AS "Service"
FROM "employee"
JOIN "department"
ON "employee"."department_id" = "department"."id";
/* Ca marche aussi dans l'autre sens entre FROM et JOIN
SELECT "employee"."name" AS "Nom de l'employé", "department"."name" AS "Service"
FROM "department"
JOIN "employee"
ON "employee"."department_id" = "department"."id";
*/

SELECT "movie"."name", "session"."type"
FROM "session"
JOIN "movie"
ON "movie"."id" = "session"."movie_id";
```

* LEFT JOIN
```sql
-- table_name est a gauche de l'expression LEFT JOIN donc tous ses enregistrements apparaitront dans la selection même si ils ne 'matchent' pas avec un enregistrement de la table à droite de l'expression LEFT JOIN.
SELECT * FROM table_name LEFT JOIN another_table_name ON table_name.first_column=another_table_name.first_column;
```

* RIGHT JOIN
```sql
-- Même principe que le LEFT JOIN (on liste tous les champs de la table à droite de l'expression RIGHT JOIN même si ils n'ont aucunes correspondance avec la table de gauche sur la colonne indiqué)
SELECT * FROM table_name RIGHT JOIN another_table_name ON table_name.first_column=another_table_name.first_column;
```

* OUTTER JOIN
```sql
-- Prochainement
```

:::note
Relation est un synonyme de table dans une base de données.
:::

En conception de base de données, on dit qu'une **association (relationship) explicite les liens entre plusieurs tables**.

[Il existe 3 associations différentes](https://medium.com/@emekadc/how-to-implement-one-to-one-one-to-many-and-many-to-many-relationships-when-designing-a-database-9da2de684710).

## Associations

:::success
L'ensemble constitué d'une clé primaire et d'une clé étrangère sert à établir des associations (relations) entre tables.
:::

### One-to-many (many-to-one)

Une association plusieurs-à-un détermine que plusieurs enregistrements d'une table sont en relation avec une seule valeur d'une autre table.

Dans une table contenant les commandes des clients et une table contenant les clients, plusieurs commandes peuvent correspondre à un même client mais plusieurs clients ne peuvent pas correspondre à une seule commande.

Pour mettre l'association en place il suffit dans une des tables d'ajouter un champs qui correspond à la clef primaire de l'autre table.

```sql
CREATE TABLE "department"(
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(50) NOT NULL
);

CREATE TABLE "employee"(
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(80),
    "department_id" INT REFERENCES "department"("id") --clef étrangére
);

INSERT INTO "department"("name") VALUES
('biologie'),
('informatique'),
('physique');

INSERT INTO "employee"("name", "department_id") VALUES
('Jackson', 2),
('Jack', 2),
('Samantha', 3);

SELECT "employee"."name" AS "Nom de l'employé", "department"."name" AS "Service"
FROM "employee"
JOIN "department"
ON "employee"."department_id" = "department"."id";
```


### One-to-one

Une association un-à-un indique que pour chaque enregistrement d'une table peut avoir un enregistrement d'une autre table qui lui est lié.

Dans une table contenant les clients et une table contenant l'adresse de ces clients, une seule adresse pourra correspondre à un seul client et un seul client pourra correspondre à aucune ou une seule adresse.

Pour mettre l'association en place il suffit dans une des tables d'ajouter un champs qui correspond à la clef primaire de l'autre table et de le rendre unique.

```sql
CREATE TABLE "badge"(
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(20) NOT NULL
);

CREATE TABLE "employee"(
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(80),
    "badge_id" INT UNIQUE REFERENCES "badge"("id")
);

INSERT INTO "badge"("name") VALUES
('niv1-sg1'),
('niv1-sg1-2');

INSERT INTO "employee"("name", "badge_id") VALUES
('Jackson', 1);

SELECT "employee"."name" AS "Employé", "badge"."name" AS "Badge"
FROM "employee"
JOIN "badge"
ON "employee"."badge_id" = "badge"."id";
```

### Many-to-many

une association multivaleur détermine que pour chaque enregistrement d'une table, il peut y avoir aucun, un ou plusieurs enregistrements d'une autre table qui lui soit liés.

Un livre peut être écrit par plusieurs auteurs, et un auteur peut avoir écrit plusieurs livres.

Pour mettre l'association en place une **table intermédiaire** contenant les clefs primaires de chaque table est créée.

```sql
CREATE TABLE "movie"(
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(50)
);

CREATE TABLE "session"(
    "id" SERIAL PRIMARY KEY,
    "type" VARCHAR(10)
);

CREATE TABLE "movie_session"(
    "id" SERIAL PRIMARY KEY,
    "movie_id" INT REFERENCES "movie"("id"),
    "session_id" INT REFERENCES "session"("id")
);

INSERT INTO "movie"("name") VALUES
('La Mome'),
('De rouille et d''os');

INSERT INTO "session"("type") VALUES
('IMAX'),
('ICE');

INSERT INTO "movie_session"("movie_id", "session_id")  VALUES
(1,1),
(1,2),
(2,1),
(2,2);

SELECT "movie"."name", "session"."type"
FROM "movie"
JOIN "movie_session"
ON "movie"."id" = "movie_session"."movie_id"
JOIN "session"
ON "session"."id" = "movie_session"."session_id";

/* Version raccoucie de la jointure précédente
SELECT m.name, s.type
FROM movie m
JOIN movie_session i
ON m.id = i.movie_id
JOIN session s
ON s.id = i.session_id;
*/
```
