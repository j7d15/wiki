---
sidebar_position: 8
title: MCD MLD et MERISE
---

## MERISE

MERISE est une méthode dédiée à la modélisation qui analyse la structure à informatiser en termes de systèmes. L’avantage de cette méthode est qu’elle permet de cadrer le projet informatique et de discuter en se comprenant entre utilisateurs et informaticiens.

Avec cette méthode on peut réaliser des modèles et notamment des MCD et MLD.

### MCD

Le MCD (Modèle Conceptuel des Données) est utilisé pour décrire sous forme d’un schéma les données relatives à un sujet que l’on doit traiter. Le MCD ne tient pas compte du SGBD.

### MLD

L’étape MLD (Modèle Logique de Données) se situe chronologiquement juste après l’étape MCD et revient à représenter le MCD sous une forme compréhensible par un SGBD.

On y trouve les clefs primaires notée PK et les clefs étrangéres notées FK. Le type des colonnes est en adéquation avec le SGBD utilisé.

![MCD et MLD](/img/sql/mcd-mld.png)

:::danger UML dans tout ça
UML est un langage qui permet de créer des diagrammes. MERISE une méthode. MCD et MLD des modèles que l’on met en place à l’aide de la méthode MERISE. Ce ne sont donc pas des notions à mettre en opposition. Dans les faits ce sont des notions complémentaires mais il n’est pas rare qu’en entreprise on ne retrouve pas l’intégralité de celle ci.
:::
