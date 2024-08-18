---
slug: mailhog
title: Intercepter des mail en local avec mailhog
date: 2023-08-07T12:18
authors: admin
tags: [mail, mailhog]
---

## Présentation de MailHog

MailHog est un outil de test d'e-mail qui permet d'installer et de configurer très facilement un serveur d'e-mail local. MailHog met en place un faux serveur SMTP.
<!--truncate-->
Un « serveur SMTP » est un serveur de messagerie qui achemine sur Internet des emails d'un expéditeur à un ou plusieurs destinataires selon les règles du protocole réseau SMTP

## Installation

prendre version Amd64 sur le github.
Lancer l'exe

## Accéder à la boite mail

Ouvrir `localhost:8025` dans un navigateur.

## Configuration projet php (PHPMailer)

```php
$mail->Port = 1025;
```

## Configuration projet symfony

```shell
MAILER_DSN=smtp://localhost:1025
```
