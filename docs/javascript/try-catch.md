---
sidebar_position: 15
title: Try and catch
---

L'instruction try...catch regroupe des instructions à exécuter et définit une réponse si l'une de ces instructions provoque une exception.

```javascript
try{ //Essaye d'executé le code de ce bloc
    maFonction();
}catch { //Si le try ne marche pas execution du code dans le catch
    console.log("Apel à maFonction() a échoué")
} finally { //Se joue tout le temps
    console.log("Quoi qu'il arrive ce bloc s'execute");
}

//Throw (Renvoie quelque chose)

function isNumber(x){
    if(isNaN(x)) {
        throw new Error("Not a number");
    }else {
        console.log('C\'est un nombre')
    }
}

try {
    isNumber("2D");
} catch (error) {
    console.log(error);
}
```

## Définition

L'instruction try...catch regroupe des instructions à exécuter et définit une réponse si l'une de ces instructions provoque une exception.

## Try and Catch

Une clause `catch` contient les instructions à exécuter si une **exception** est levée par une instruction du bloc try. On souhaite généralement que le bloc try se déroule sans problème. Si toutefois une erreur se produit, on veut pouvoir contrôler ce qui se passe et on transmet donc le contrôle au bloc catch. Si une instruction contenue dans le bloc try (ou une fonction appelée depuis le bloc try) renvoie une exception, le contrôle sera immédiatement passé à la clause catch. Si aucune exception n'est levée, la clause catch ne sera pas utilisée.

## Finally

La clause `finally` s'exécute après le bloc try et après le bloc catch (si celui-ci a été déclenché) mais avant les instructions qui suivent. Les instructions de cette clause sont toujours exécutées, qu'il y ait eu ou non une exception de déclenchée et/ou d'interceptée.

:::note
Il est possible d'imbriquer plusieurs instructions try. Si un try imbriqué ne possède pas de clause catch, la clause catch du try du niveau supérieur sera utilisée (et ainsi de suite).
:::

## Throw

L'instruction `throw` permet de lever une exception définie par l'utilisateur. L'exécution de la fonction courante sera stoppée (les instructions situées après l'instruction throw ne seront pas exécutées) et le contrôle sera passé au premier bloc catch de la pile d'appels. Si aucun bloc catch ne se trouve dans les fonctions de la pile d'appels, le programme sera terminé.
