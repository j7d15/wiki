---
sidebar_position: 4
title: Notions avancées
---

## FILTRES ET CONDITIONS
* LIMIT
```sql
-- Limiter le nombre d'enregistrement à selectionner
SELECT * FROM nom_table LIMIT 2;

--postgresql
SELECT * FROM "movie" LIMIT 2;
SELECT * FROM "movie" OFFSET 2;  -- Systéme de pagination
SELECT * FROM "movie" LIMIT 2 OFFSET 2;
```

* ALIAS de colonne
```sql
-- Renommer une colonne
SELECT first_column AS 'ALIAS', second_column AS 'ANOTHER ALIAS' FROM nom_table;

--postgresql
SELECT title AS titre, rate note FROM "movie";
SELECT title AS titre, rate * 2 AS note_sur_10 FROM "movie";
```

* ORDER BY
```sql
-- Changer l'ordre d'affichage des enregistrements selectionnés (ordre numerique ou alphabetique)
SELECT * FROM table_name ORDER BY first_column;

-- Ordre ascendant (celui par défaut)
SELECT * FROM table_name ORDER BY first_column ASC;

-- Ordre descendant
SELECT * FROM table_name ORDER BY first_column DESC;

--postgresql
SELECT * FROM "movie" ORDER BY "rate" DESC, "title" ASC;
```

* Distinct
```sql
-- Selectionner les enregistrements en ommetant les enregistrements identiques pour le champ distinct (selectionner que la premiere apparition dans la table et ommet les autres).
SELECT DISTINCT first_column FROM table_name;
```

* Filtre LIKE
```sql
-- Permet de chercher des correspondances (% = n'importe quelle chaine de caractére) (recherche tous les enregistrement avec le texte indiqué)
SELECT * FROM table_name WHERE first_column LIKE '%str%';

--postgresql
SELECT * FROM "movie" WHERE "title" LIKE 'Les%'; --Commence par Les
SELECT * FROM "movie" WHERE "title" LIKE '%s'; -- Termine par s
SELECT * FROM "movie" WHERE "title" LIKE '%na%'; -- na n'importe ou dans le string
SELECT * FROM "movie" WHERE LOWER("title") LIKE '%shark%';
```

* Ou
```sql
SELECT * FROM table_name WHERE first_column LIKE '%str%' OR second_column=value;

--postgresql
SELECT * FROM "movie" WHERE ("rate" >= 2 AND "rate" < 5) OR "rate" = 0; -- AND (et) OR (ou)
```

* ET
```sql
SELECT * FROM table_name WHERE first_column LIKE '%str%' AND second_column=value;

--postgresql
SELECT * FROM "movie" WHERE ("rate" >= 2 AND "rate" < 5) OR "rate" = 0; -- AND (et) OR (ou)
```

* ENTRE
```sql
SELECT * FROM table_name WHERE first_column BETWEEN value AND value;

--postgresql
SELECT * FROM movie WHERE rate BETWEEN 0 AND 3;
```

* EST NULL
```sql
SELECT * FROM table_name WHERE first_column IS NULL;
```

* ALIAS de table
```sql
-- Renommer une table (utile lors des jointures car les requetes sont longues) (voir HAVING pour un exemple)
SELECT nt.first_column FROM nom_table AS nt;
```

## Requetes imbriquées

S'appuyer sur le retour d'une requete pour en effectuer une autre.

```sql
# Prochainenement
```

## FONCTIONS d'aggregation

Principe : Applique une fonction sur la requete afin de retourné le resultat du traitement effectué par la fonction.
[Source](https://sql.sh/fonctions/agregation)

:::note Group by
Toutes ces fonctions prennent tout leur sens lorsqu’elles sont utilisée avec la commande GROUP BY qui permet de filtrer les données sur une ou plusieurs colonnes.

GROUP BY regoupe les enregistrements par id **avant** de lancer la fonction.

SELECT country_name FROM "movie" GROUP BY "country_name";
:::

Les fonctions d’agrégation sont des fonctions idéales pour effectuer quelques statistiques de bases sur des tables. Les principales fonctions sont les suivantes :

* AVG
```sql
-- Retourne une seule ligne qui correspond à la moyenne des données de first_column
SELECT AVG(first_column) FROM table_name;

--postgresql
SELECT "country_name" AS pays, AVG("rate") AS note 
FROM "movie" GROUP BY "country_name";
```

* SUM
```sql
-- Retourne une seule ligne qui correspond à l'addition des données de first_column
SELECT SUM(first_column) FROM table_name;
```

* [COUNT](https://sql.sh/fonctions/agregation/count)
```sql
-- La fonction COUNT() possède une subtilité. Pour compter le nombre total de ligne d’une table, il convient d’utiliser * qui signifie que l’ont cherche à compter le nombre d’enregistrement sur toutes les colonnes.
SELECT COUNT(*) FROM table;
SELECT id_column, COUNT(id_column) FROM table_name GROUP BY id_column; -- Il est aussi possible de connaitre le nombre d’enregistrement sur une colonne en particulier. Les enregistrements qui possèdent la valeur nul ne seront pas comptabilisé.

--postgresql
SELECT "country_name" AS pays, COUNT(*) AS "nombre_de_films" FROM "movie" GROUP BY "country_name";

```

* MIN
* MAX

* HAVING
```sql
-- HAVING et WHERE ont le même rôle cependant la condition WHERE s'execute avant un GROUP BY alors que HAVING s'execute après.
SELECT b.first_column AS alias, COUNT(a.id_column) AS another_alias
FROM table_name AS b
LEFT JOIN another_table_name AS a ON b.id_column = a.second_column
GROUP BY b.id_column 
HAVING another_alias=1;
```
