---
sidebar_position: 1
title: Introduction
---

## Définition

Le **SQL (Structured Query Language)** est un langage permettant de communiquer avec une **base de données(BDD)**.

## SGBD et SGBDR

Un SGBD (Système de Gestion de Bases de Données) est un logiciel qui stocke des données de façon organisées et cohérentes. Un SGBDR (Système de Gestion de Bases de Données Relationnelles) est un type particulier de SGBD.

On utilise le SQL dans les systèmes de gestion de base de données relationnelles(SGBDR).

 Dans les SGBDR, l'information est organisée dans des tableaux à deux dimensions appelés des **relations** (ou tables).

On peut relier les tables qui composent une base de données les une aux autres via des clefs étrangères (foreign Key).

*Microsoft SQL Server, PostgreSQL, SQLite, MySql, MariaDB* sont des SGBDR.

## Client de BDD

Il existe différents clients de SGDB comme SQL Server Management Studio (SSMS), SQL Developer, PHPMyAdmin et Adminer qui offrent une interface graphique pour interagir avec le serveur de base de données. Ces clients facilite l'administration des bases de données.

## SQL VS NoSQL

Le terme **NoSQL (Not Only SQL)** désigne les différents types de bases de données **non relationnelles**. Ces bases de données stockent les données dans un format différent. La structure est moins strict qu'avec une SGBDR.

Exemple : Si je stocke des employés en BDD avec une SGBDR chaque employé sera basé sur le même modèle (nom, prénom, age ...). Dans le cas d'une base de données non relationnelle chaque employé peut être basé sur un modéle différent ce qui rend la lecture des données chaotique car variable d'un employé à l'autre.

*Cassandra, Redis ou MongoDB* sont des bases de données non relationnelles.

L'avantage du NoSQL c'est sa capacité à gérer un volume important de données rapidement mais en contrepartie le stockage prend plus de place (de nos jours ce n'est plus un problème mais il y a quelques décennies le prix de l'espace de stockage été tout autre).

## Description d'une BDD dans un SGBDR

Une base de donnée c'est un ** ensemble de tables**(tableaux) contenant **des enregistrements **(lignes) avec **différents champs**(colonnes). Une table (également appelé relation), c'est comme une feuille de calcul dans un tableur comme excel.

## Type de commandes SQL

* DDL Data Definition Language (défini la structure de la BDD)
    * CREATE, DROP, ALTER, TRUNCATE

* DML Data Manipulation Language (permet d’écrire dans la base et donc de modifier les données)
    * INSERT, UPDATE, DELETE, MERGE

* DCL Data Control Language (permet de gérer les droits d’accès aux données)
    * GRANT, REVOKE

* TCL Transaction Control Language (permet de gérer l'intégrité des données)
    * COMMIT, ROLLBACK, SAVEPOINT

* DQL Data Query Language (permet de lire les données dans la base à l’aide de requêtes)
    * SELECT

## Type de données

* [MySQL](https://dev.mysql.com/doc/refman/8.0/en/data-types.html)
* [Postgresql](https://www.postgresqltutorial.com/postgresql-tutorial/postgresql-data-types/)