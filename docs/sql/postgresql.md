---
sidebar_position: 6
title: Postgresql via la CLI
---

PostgreSQL est un serveur (SGBD) qui permet de se connecter à différentes bases de données. 

Par défaut, seul l'utilisateur postgres peut se connecter.

**Toutes les opérations d'administration se font, au départ, avec l'utilisateur postgres**.

## Bases

On va utiliser la **CLI psql** qui est spécifique à PostgreSQL pour accéder à une base de données.

Il existe un superUser créé sur le système d’exploitation au moment de l’installation de PostgreSQL. Cet utilisateur s’appelle `postgres` et il a tous les droits.

*Commandes à éxécuter depuis un terminal.*

* `sudo -i -u postgres ` : Pour se connecter à un terminal en tant que superuser postgres
    * -i (--login): change l'environnement du shell (terminal) pour connecter un nouvel utilisateur sur ce dernier (en l'occurence postgres)
    * -u : spécifie le nom d’utilisateur
* `psql`    Pour lancer l'invite de commande SQL de PostgreSQL
    * -h : spécifie le nom d’hôte du serveur PostgreSQL sur lequel vous voulez exécuter psql - par défaut, psql utilisera localhost
    * -U : spécifie le nom d’utilisateur PostgreSQL que vous voulez utiliser pour vous connecter - par défaut le nom d’utilisateur de l’OS
    * -d : spécifie le nom de la base de données sur laquelle vous voulez travailler - par défaut, psql utilisera le nom d’utilisateur
* `exit`     permettra, à la fin de cette session d'administration dans PostgreSQL, de reprendre la main en tant qu'utilisateur du système.

## Liste de commandes

Une fois connecté, on a accès à l’écriture de requête SQL standard, ainsi qu’à certaines commandes de psql :

* `\conninfo` = info de connexion
* `\du` = liste et décrit les utilisateurs
* `\l` = liste et décrit les bases de données
* `\q` = quitte psql
* `\d` = décrit les tables si on est connecté à une bdd ou `\dt`
* `\d promo` = décrit la table promo si on est connecté à une bdd
* `\d student` = décrit la table student si on est connecté à une bdd
* `\s` = history
* `\connect nombdd` = Se connecte à la base de données indiquées ou `\c`

### Créer un user

```shell
CREATE USER nomutilisateur WITH ENCRYPTED PASSWORD 'mdp';
```

### Supprimer un user

```shell
DROP USER IF EXISTS nomutilisateur;
```

### Créer une BDD

```shell
CREATE DATABASE nombdd WITH OWNER nomutilisateur;
```

### Supprimer une BDD

```shell
DROP DATABASE nombdd;
```

### Changer d'utilisateur et le connecter à une base

```shell
\q
psql -d nombdd -U nomutilisateur -h localhost
```

### Donner les droit un autre utilisateur

Si on crée une bdd et des tables avec l'utilisateur postgres on peut ajouter un autre utilisateur avec des droits en executant une liste de requetes.

```shell
GRANT CONNECT ON DATABASE atelier_jdr TO jdr; # Si on a pas mis WITH OWNER lors de la création de la BDD
GRANT USAGE ON SCHEMA public TO jdr; # Si on a pas mis WITH OWNER lors de la création de la BDD

GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO jdr; # Donne droit sur les tables
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO jdr; # Donne droit sur les séquences (nécessaire pour les colonnes de type SERIAL)
```

### Créer une table en ligne de commande

```sql
CREATE TABLE "movie" (
        "id" SERIAL PRIMARY KEY,
        "title" VARCHAR(100) NOT NULL,
        "year" INTEGER NOT NULL,
        "synopsis" TEXT,
        "created_at" TIMESTAMP NOT NULL DEFAULT NOW(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT NOW()
    );
```

:::note
Quand on liste les tables on a une table sequence utilisé par table utilisant le type SERIAL (sert au SGBD pour savoir ou il en est dans l'increment du serial)
:::

### Transaction

On va créer un fichier avec comme suffixe .sql et qui va contenir une suite d’instructions SQL qui vont permettre de reconstruire toute la structure d’une base de données.

Il serait intéressant par précaution que la base de données simule ce qui va se passer avec notre script avant de l’exécuter réellement. Comme ça, si il y a des erreurs dans le script, elle pourra tout arrêter et nous avertir que le script n’est pas valide. C'est le principe d'une transaction.

```sql title="migration/movies_structure.sql"
BEGIN;

        DROP TABLE IF EXISTS genre;
        DROP TABLE IF EXISTS movie;
        DROP TABLE IF EXISTS director;

        CREATE TABLE director (
            "id" SERIAL PRIMARY KEY,
            "firstname" VARCHAR(100) NOT NULL,
            "lastname" VARCHAR(100) NOT NULL
        );

        CREATE TABLE genre (
            "id" SERIAL PRIMARY KEY,
            "name" VARCHAR(255) NOT NULL
        );


        CREATE TABLE movie (
            "id" SERIAL PRIMARY KEY,
            "title" VARCHAR(100) NOT NULL,
            "year" INTEGER NOT NULL,
            "resume" VARCHAR(255) UNIQUE NOT NULL,
            "created_on" TIMESTAMP NOT NULL,
            "modified_on" TIMESTAMP
        );

    COMMIT;
```

:::danger
l’ordre des suppressions aura son importance si des tables ont des associations (clef étrangére - clef primaire).
:::

Dans le domaine de l'informatique, [ACID](https://fr.wikipedia.org/wiki/Propri%C3%A9t%C3%A9s_ACID) est un acronyme désignant les termes : Atomicité, Cohérence, Isolation et Durabilité. Ces quatre principes permettent d'assurer que les transactions de bases de données soient traitées de façon fiable.

* L'atomicité garantit que chaque transaction est traitée comme une seule "unité", qui réussit complètement ou échoue complètement *(si l'une des déclarations constituant une transaction échoue, la transaction entière échoue et la base de données reste inchangée)*.
* La cohérence garantit qu'une transaction ne peut faire passer la base de données que d'un état cohérent à un autre *( toute donnée écrite dans la base de données doit être valide selon les contraintes imposé lors de la création de la table/colonne)*
* Les transactions peuvent être exécutées simultanément, l'isolation garantit que l'exécution simultanée des transactions laisse la base de données dans le même état que celui qui aurait été obtenu si les transactions avaient été exécutées les une après les autres.
* La durabilité garantit qu'une fois qu'une transaction a été validée, elle le restera même en cas de défaillance du système (par exemple, une panne de courant ou un crash). Cela signifie généralement que les transactions terminées (ou leurs effets) sont enregistrées dans une mémoire non volatile comme un disque dur.

#### Migration

Une fois que le fichier de migration est prêt, on peut l’exécuter avec la commande psql en précisant un argument `-f chemin_vers_fichier` :

```shell
\q
# Faire un clique droit sur le fichier migration.sql puis selectionner copy path afin de copier le chemin vers le fichier dans le presse papier.
psql -U nomutilisateur -d nombdd -f ./migration/movies_structure.sql  # (psql -d test_db -U test -h localhost -f /var/www/html/promos/test/transaction.sql)
psql -U postgres -d nombdd -f ./migration/movies_structure.sql 

# Si permission denied => https://stackoverflow.com/questions/15520361/permission-denied-for-relation
# Si error for seq => https://stackoverflow.com/questions/9325017/error-permission-denied-for-sequence-cities-id-seq-using-postgres
# Si peer error => https://stackoverflow.com/questions/18664074/getting-error-peer-authentication-failed-for-user-postgres-when-trying-to-ge
psql
\c nombdd # pour se connecter en tant que postgres à la bdd
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO nomutilisateur; # Ici on met le nom d'un utilisateur
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO nomutilisateur; # Ici on met le nom d'un utilisateur
\q
psql -U nomutilisateur -d nombdd -h localhost -W -f ./migration/movies_structure.sql # -W force affichage mdp

```

### Seeding

Le pré-remplissage d’une base de données s’appelle le seeding.

```sql
BEGIN;
    DELETE FROM genre;
    INSERT INTO genre (name) VALUES
        ('comedie'),
        ('thriller'),
        ('horreur'),
        ('aventure');
COMMIT;
```

#### Executer le seeding

Pour exécuter le seeding, il faut exécuter chacun des fichiers SQL les un a la suite des autres.

```shell
psql -U nomutilisateur -d nombdd -f ./migration/nombdd_genre.sql
# INSERT 0 1 signifie : For an INSERT command, the tag is INSERT oid rows, where rows is the number of rows inserted. oid used to be the object ID of the inserted row if rows was 1 and the target table had OIDs, but OIDs system columns are not supported anymore; therefore oid is always 0.
```

:::note
Une bonne habitude à prendre est de préfixer nos fichiers de seeding avec un entier qui indique dans quel ordre on doit les exécuter.
:::

:::note seeding vs fixtures
Fixture pour peupler bdd de dev

Seeding pour peupler bdd de prod
:::

### Dump

Le [dump](https://docs.postgresql.fr/10/app-pgdump.html) d’une base de données consiste à figer le temps. On va prendre une photo à l’instant T de la base de données et générer un script SQL qui permettrait de régénérer la base de données (structure + données) à partir de ce script. 

L’idée d’un dump est donc principalement de fournir un **système de backup**.

```shell
\q
pg_dump nombdd > ./dump/dump_nombdd.sql
# Attention au permission de droit d'écriture sous linux
pg_dump -U nomutilisateur -d nombdd > ./dump/dump_nombdd.sql
pg_dump -U postgres -d nombdd> export.sql
```
