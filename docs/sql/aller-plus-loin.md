---
sidebar_position: 5
title: Aller plus loin
---

## Index

[Index permet de gagner en performance lors des requetes select qui utilisent la colonne indexée.](https://www.youtube.com/watch?v=vYpiLn3JXiA)

* Cout en performance lors de l'insertion de données car recrée l'annuaire d'index mais gain lors de la lecture de données utilisant l'index.
* Cout en espace disque.

```sql
CREATE UNIQUE INDEX name_of_index ON table_name(column_name);

DROP index name_of_index;
```

## Trigger

[Fait une action quand un déclencheur est activer.](https://www.youtube.com/watch?v=aw1Q47vSaCc)

* Cout en performance.

```sql
CREATE TRIGGER name_of_trigger AFTER UPDATE ON table_name WHERE new.column_name != old.column_name 
BEGIN
    UPDATE table_name SET count_column = count_column + 1 WHERE id = OLD.id; 
END; -- Declencher lors d'une modification d'un enregistrement si column_name a une valeur modifier. Ajoutera 1 a une colonne servant de counter.

DROP TRIGGER name_of_trigger; -- Supprimer trigger
```

## Transaction

Il serait intéressant par précaution que la base de données simule ce qui va se passer avec notre script avant de l’exécuter réellement.

Si une requetes échoue dans une transaction on revient à l'état stable de la base de données donc avant le début de la requetes. Comme ça, si il y a des erreurs dans le script, elle pourra tout arrêter et nous avertir que le script n’est pas valide. *(donc tout réussit ou tout échoue)*. 

```sql
BEGIN;
-- Requetes SQL
COMMIT;
```

### Principes ACID

Dans le domaine de l'informatique, [ACID](https://fr.wikipedia.org/wiki/Propri%C3%A9t%C3%A9s_ACID) est un acronyme désignant les termes : Atomicité, Cohérence, Isolation et Durabilité. Ces quatre principes permettent d'assurer que les transactions de bases de données soient traitées de façon fiable.

* L'atomicité garantit que chaque transaction est traitée comme une seule "unité", qui réussit complètement ou échoue complètement *(si l'une des déclarations constituant une transaction échoue, la transaction entière échoue et la base de données reste inchangée)*.
* La cohérence garantit qu'une transaction ne peut faire passer la base de données que d'un état cohérent à un autre *( toute donnée écrite dans la base de données doit être valide selon les contraintes imposé lors de la création de la table/colonne)*
* Les transactions peuvent être exécutées simultanément, l'isolation garantit que l'exécution simultanée des transactions laisse la base de données dans le même état que celui qui aurait été obtenu si les transactions avaient été exécutées les une après les autres.
* La durabilité garantit qu'une fois qu'une transaction a été validée, elle le restera même en cas de défaillance du système (par exemple, une panne de courant ou un crash). Cela signifie généralement que les transactions terminées (ou leurs effets) sont enregistrées dans une mémoire non volatile comme un disque dur.

## Principes de base de la normalisation des bases de données

La [normalisation](https://www.ionos.fr/digitalguide/hebergement/aspects-techniques/normalisation-base-de-donnees/) correspond au processus d’organisation des données dans une base de données relationnelle. Ce processus comprend la création de tables et l’établissement de relations entre celles-ci conformément à des règles conçues à la fois pour protéger les données et pour rendre la base de données plus flexible grâce à l’élimination de la redondance et des dépendances incohérentes.

Il existe plusieurs règles de normalisation des bases de données. Chaque règle est appelée une « forme normale ». Si la première règle est respectée, la base de données est dite « en première forme normale ». Si les trois premières règles sont respectées, la base de données est considérée comme étant en troisième forme normale.

*Comme c’est le cas avec de nombreuses règles et spécifications formelles, les scénarios réels ne permettent pas toujours une conformité parfaite.*

### Première forme normale (1NF)

Une table dans une base de données relationnelle répond à la première forme normale (1NF) lorsqu’elle remplit les critères suivants :

* Toutes les données sont atomiques
* Toutes les colonnes du tableau contiennent des valeurs identiques

Un ensemble de données est considéré comme atomique si chaque élément d’information est affecté à un champ de données distinct.

La procédure suivante devrait être mise en œuvre pour normaliser ces sections :

* Divisez toutes les données multivaleurs en colonnes séparées.
* Vérifier la similitude des valeurs de chaque colonne.

*Une valeur est considérée comme atomique selon le contexte de son utilisation. S’il n’est pas nécessaire de séparer le prénom et le nom de famille, le nom complet d’une personne peut être considéré comme atomique. Mais dans la pratique, il est préférable de diviser les valeurs en plusieurs parties en unités aussi petites que possible.*

### Deuxième forme normale (2NF)

Une table conforme à la deuxième forme normale doit satisfaire à toutes les exigences de la première forme normale en plus de celles qui suivent :

* Chaque attribut non clé doit être entièrement fonctionnel, en fonction de la clé primaire.
* Relation clefs primaire - étrangére

Les clés sont utilisées dans les bases de données relationnelles pour identifier de façon unique les enregistrements de données ( également nommés lignes ou tuples). Une telle clé peut représenter les valeurs d’une seule colonne ou les valeurs combinées de plusieurs colonnes.

*Le lien via la clé étrangère permet d’interroger les deux tables ensemble en liant les enregistrements. C’est ce qu’on appelle une jointure.*

### Troisième forme normale (3NF)

* Aucune colonne non clé ne peut faire référence à une colonne non clé d'une autre table.

### Autres formes de normalisation

Il existe une quatrième forme normale, également nommée « Boyce Codd Normal Form » (BCNF) et une cinquième forme normale, mais elles sont rarement prises en compte en pratique. Le non-respect de ces règles peut engendrer une structure de base de données imparfaite, sans toutefois nuire à ses performances.
