---
sidebar_position: 11
title: Programmation orienté objet
---

La programmation orientée objet (POO)  est un paradigme de programmation informatique (c'est à dire une façon de coder). Ce style d'organisation consiste en la création et l'interaction d'objet.

objet =  regroupement de valeurs et de fonctions.

## Classe

Une **classe** est une définition qui contient le nom des propriétés qu’on pourra manipuler ainsi que des méthodes.

* Les **propriétés**, ce sont des variables internes à cette définition dans lesquelles on stocke des valeurs.
* Les **méthodes** : ce sont des fonctions internes à la classe.

Le fait de créer un objet à partir d’une classe s’appelle **instancier** une classe.

:::note Nommage
Le nom de la **classe** est écrit en **PascalCase**, qui équivaut au UpperCamelCase. 

C’est une bonne pratique qui fait partie des **PSR (PHP Standards Recommendations)**, en particulier PSR-1 et PSR-12. 

Les **propriétés** et les **méthodes** doivent être écrites au format **camelCase**.
:::

:::success readonly
À partir de PHP 8.1.0, une propriété peut être déclarée avec le modificateur readonly, qui empêche la modification de la propriété après l'initialisation. ` public readonly int $price`
:::

### Instancier un objet

Créer une instance, c'est créer un objet à partir d'une classe.

C'est à dire : 

* l’allocation et l'initialisation de données ;
* le stockage en mémoire du nouvel objet pour suivre son état ;
* la construction d’une référence de l’objet pour le manipuler. 

```php
<?php

$date = new DateTime;
```

:::danger
Les objets se comparent de manière un peu différente des autres types de variables. Si vous créez 2 objets issus de la même classe, que vous leur assignez les mêmes valeurs et les comparez simplement (==), vous vérifiez que les 2 éléments possèdent les mêmes propriétés et les mêmes valeurs. Si vous testez strictement (===), alors vous vérifiez que vous êtes en train de manipuler la même instance.
:::

### Accéder au propriétés et méthodes

Pour accéder aux propriétés ou aux méthodes d’une classe, on utilise le symbole  `->`.

```php
<?php
 
$date = new DateTime;
echo $date->format('d/m/Y');

# effectuer du chaînage
$formatedDate = $date->modify('+1 day')->format('d/m/Y');
echo $formatedDate;
```

### Définir une classe

```php
<?php

declare(strict_types=1); # instruction demandant à PHP d'être exigeant avec le typage

class Pont
{
   public float $longueur = 0;
   public float $largeur;

    public function getSurface(): float
   {
    # $this nous permet de faire références aux valeurs portées par l'instances.
       return $this->longueur * $this->largeur;
   }
}

$pont = new Pont;
$pont->longueur = 263.0;
$pont->largeur = 15.0;

var_dump($pont);
var_dump($surface);
```

### Visibilité

La visibilité d'une propriété, d'une méthode ou (à partir de PHP 7.1.0) une constante peut être définie en préfixant sa déclaration avec un mot-clé : **public**, **protected**, ou **private**.

* public, permet d'indiquer que la propriété ou la méthode sera accessible à l'intérieur mais aussi à l'extérieur de la classe
* private, permet d'indiquer que la propriété ou la méthode sera accessible à l'intérieur de la classe seulement
* protected, permet d'indiquer que la propriété ou la méthode sera accessible à l'intérieur de la classe et des classes héritées

## Encapsulation

L’intérêt d’utiliser les getters et les setters est qu’il est toujours possible de récupérer la longueur, de la modifier mais en s’assurant d’effectuer certains contrôles avant (définis dans le setter).

```php
<?php

declare(strict_types=1);

class Pont
{
   private string $unite = 'm²';
  
   private float $longueur;
   private float $largeur;
  
  # getter ou accesseur
  public function getLongueur(): float {
        return $this->longueur;
  }

   # setter ou mutateur
   public function setLongueur(float $longueur): void
   {
       if ($longueur < 0) {
           trigger_error(
               'La longueur est trop courte. (min 1)',
               E_USER_ERROR
           );
       }
      
       $this->longueur = $longueur;
   }
}

$towerBridge = new Pont;
$towerBridge->setLongueur(286.0);
$towerBridge->setLongueur(-286.0);
```

### Statique

Pour utiliser une méthode sans instance, elle doit être déclarée statique.

Lorsqu’une propriété est déclarée statique, la valeur qu’elle contient sera partagée pour toutes les instances. En réalité, PHP possède une mémoire liée à la classe au lieu de l’instance. Ce que l’on va faire, c’est manipuler la valeur liée à la classe.

```php
<?php

declare(strict_types=1);

class Pont
{
    //  les constantes ne sont pas préfixées par $ et par convention sont écrites en UPPER_SNAKE_CASE
    // Une constante est statique, on utilise le mot-clé self
    private const UNITE = 'm²';

    // Définition de la propriété statique. Elle sera partagée
   public static int $nombrePietons = 0;

   public static function validerTaille(float $taille): bool
   {
       if ($taille < 50.0) {
           trigger_error(
               'La longueur est trop courte. (min 50m)',
               E_USER_ERROR
           );
       }
      
       return true;
   }

   # utiliser le mot cléselfpour cibler une méthode statique de classe, lorsque vous l'appelez depuis une instance de cette même classe.
       public function setLongueur(float $longueur): void
   {
       self::validerTaille($longueur);
      
       $this->longueur = $longueur;
   }

}

# Pour dire à PHP que nous souhaitons faire référence à un élément de la classe, il faut utiliser ::
var_dump(Pont::validerTaille(150.0));
var_dump(Pont::validerTaille(20.0));
```

### Méthodes magiques

Elles sont reconnaissables parce qu'elles sont préfixées par deux underscores. Ces méthodes sont prédéfinies par PHP, et sont appelées automatiquement dans la plupart des cas. 

* __destruct
* __construct
* __clone  
* __toString
* __invoke
* __sleep
* __wakeup
* __serialize
* __unserialize
* __get
* __set
* __isset
* __unset
* __call

```php title="constructeur et destructeur"
<?php
 
declare(strict_types=1);
 
class Pont
{
    private float $longueur;
    private float $largeur;
 
    # méthode appelée automatiquement par PHP lorsque vous créez une instance
    // public function __construct(float $longueur, float $largeur)
    // {
    //     $this->longueur = $longueur;
    //     $this->largeur = $largeur;
    // }

    #  Forme courte depuis PHP8
    public function __construct(private float $longueur, private float $largeur)
    {
    }

     # La méthode __destruct est appelée automatiquement lorsque l’objet est supprimé de la mémoire, ce qui est fait à chaque fois que le script se termine. Il existe deux autres moyens de le déclencher manuellement : en supprimant l’objet avec unset  ou en remplaçant le contenu de la variable qui y fait référence.
}
 
$towerBridge = new Pont(286.0, 62.0);
var_dump($towerBridge);
```

## Héritage

L'héritage nous permet d’accéder aux propriétés et méthodes d’une classe 'parent' depuis les 'enfants' pour éviter de dupliquer du code dans différentes classes.

`Admin extends User` signifiera donc que nos administrations bénéficieront de toutes les propriétés et méthodes de la classe  `User`.

```php
<?php
 
declare(strict_types=1);
 
class User
{
    // protected  permet de fermer à l'extérieur, mais d'ouvrir à l'héritage. 
    protected const STATUS_ACTIVE = 'active';
    protected const STATUS_INACTIVE = 'inactive';

    public static $nombreUtilisateursInitialisés = 0;
 
    public function __construct(public string $username, public string $status = self::STATUS_ACTIVE)
    {
    }

    // protected  permet de fermer à l'extérieur, mais d'ouvrir à l'héritage. 
    protected function setStatus(string $status): void
    {
        if (!in_array($status, [self::STATUS_ACTIVE, self::STATUS_INACTIVE])) {
            trigger_error(sprintf('Le status %s n\'est pas valide. Les status possibles sont : %s', $status, implode(', ', [self::STATUS_ACTIVE, self::STATUS_INACTIVE])), E_USER_ERROR);
        };

        $this->status = $status;
    }

    protected function getStatus(): string
    {
        return $this->status;
    }
}
 
class Admin extends User
{
    public static $nombreAdminInitialisés = 0;

    // Ajout d'un tableau de roles pour affiner les droits des administrateurs :)
    public function __construct(public string $username, public array $roles = [], public string $status = self::STATUS_ACTIVE)
    {
    }
 
    // Méthode d'ajout d'un rôle, puis on supprime les doublons avec array_filter.
    public function addRole(string $role): void
    {
        $this->roles[] = $role;
        $this->roles = array_filter($this->roles);
    }
 
    // Méthode de renvoie des rôles, dans lequel on définit le rôle ADMIN par défaut.
    public function getRoles(): array
    {
        $roles = $this->roles;
        $roles[] = 'ADMIN';
 
        return $roles;
    }

    public function setRoles(array $roles): void
    {
        $this->roles = $roles;
    }

    # Accédez aux méthodes de la classe parente
    public function printCustomStatus()
    {
        echo "L’administrateur {$this->username} a pour statut : ";
        $this->printStatus(); // on appelle printStatus du parent depuis la classe enfant
    }

    // mise à jour des valeurs des propriétés statiques de la classe courante avec `self`, et de la classe parente avec `parent`
    public static function nouvelleInitialisation()
    {
        self::$nombreAdminInitialisés++; // classe Admin
        # Pour faire référence à un parent, vous devez utiliser le nouveau mot clé parent. Il permet de faire référence à une classe parente.
        parent::$nombreUtilisateursInitialisés++; // classe User
        
}

$admin = new Admin('Lily');
# vous pouvez accéder aux propriétés de la classe parente de la même manière qu'avant, avec la flèche -> (Il en va de même pour les propriétés statiques.)
$admin->printStatus();


Admin::nouvelleInitialisation(); // Appel d'une méthode statique
var_dump(Admin::$nombreAdminInitialisés, Admin::$nombreUtilisateursInitialisés, User::$nombreUtilisateursInitialisés);

var_dump(User::$nombreAdminInitialisés); // ceci ne marche pas.
```

Dans cet exemple, nous avons utilisé l'héritage entre 2 classes. Nous pouvons continuer ainsi de manière infinie afin d'avoir un enfant d'un enfant, d'un enfant, d'un enfant, …, d’une classe parente.

### Surcharge

PHP vous permet également de réécrire une méthode existante d’un parent, dans une classe enfant. On parle de surcharge. 

Que vous permet de faire PHP, et que vous impose-t-il lorsque vous réécrivez/surchargez une méthode existante dans une classe parente ? Pour commencer, sa signature doit rester compatible avec la méthode d'origine :

* vous ne pouvez pas enlever des arguments ;
* vous pouvez ajouter un argument uniquement s'il est optionnel ;
* Vous pouvez changer le type d'un argument uniquement s'il est compatible avec le type d'origine (voir un exemple) ;
* vous pouvez changer le type de retour de la méthode uniquement s'il est compatible avec le type d'origirotected

### Abstraction

En utilisant le mot clé `abstract`, vous pouvez imposer à une classe d'être héritée.

Une classe abstraite ne peut plus être instanciée seule, et peut contenir des méthodes abstraites.

Une méthode abstraite doit être implémentée dans les classes enfants, ou alors celle-ci doit aussi être abstraite.

Vous pouvez également interdire l’héritage à l’aide du mot clé `final` sur une classe ou sur une méthode.

```php
<?php

declare(strict_types=1);

abstract class User
{
    public const STATUS_ACTIVE = 'active';
    public const STATUS_INACTIVE = 'inactive';

    public function __construct(public string $email, public string $status = self::STATUS_ACTIVE)
    {
    }

    public function setStatus(string $status): void
    {
        assert(
            in_array($status, [self::STATUS_ACTIVE, self::STATUS_INACTIVE]),
            sprintf('Le status %s n\'est pas valide. Les status possibles sont : %s', $status, [self::STATUS_ACTIVE, self::STATUS_INACTIVE])
        );
    
        $this->status = $status;
    }
    
    public function getStatus(): string
    {
        return $this->status;
    }
    
    # Quand le mot clé abstract se situe devant le mot clé class, on peut aussi l’utiliser devant une méthode de classe ! Cela permet de déclarer la signature de la méthode (visibilité, statique ou non, nom, arguments, et type de retour) comme nécessaire, mais nous n'écrivons pas son comportement. Nous terminons là par un ‘;’, nous ne mettons pas d’accolades, et pas de code non plus. Pas tout de suite. Nous exprimons juste que cette méthode doit exister dans les classes enfants, sans dire comment elle fonctionne. C’est à la classe enfant de porter cette responsabilité.
    abstract public function getUsername(): string;
}

// Interdire l'héritage d'une classe
final class Admin extends User
{
    // Ajout d'un tableau de roles pour affiner les droits des administrateurs :)
    public function __construct(string $email, string $status = self::STATUS_ACTIVE, public array $roles = [])
    {
        parent::__construct($email, $status);
    }

    // Lorsque vous décidez de déclarer des méthodes abstraites, vous devez impérativement écrire leur logique dans une classe enfant, sous peine de recevoir l'erreur suivante
    public function getUsername(): string
    {
        return $this->email;
    }
}

class Player extends User
{
    // Ajout d'un tableau de roles pour affiner les droits des administrateurs :)
    public function __construct(string $email, public string $username, string $status = self::STATUS_ACTIVE)
    {
        parent::__construct($email, $status);
    }

    // ...
    
    public function getUsername(): string
    {
        return $this->username;
    }
}
```

## Classe en readonly

Nous avons maintenant la possibilité sur PHP 8.1 de définir toute une classe en lecture seule. Pratique lorsque l'on a plusieurs attributs.

```php
readonly class Quote
{
    public function __construct(
        public int $price,
        public string $customer
    ) {}
}
$quote = new Quote(999.99, , 'John Doe');
$quote->price = 1000; // Cannot modify readonly property Quote::$price
```

## Namespace (espace de nom)

**Une classe ne devrait posséder qu’une seule responsabilité**. Il en va de même pour les méthodes qui la composent.

Du coup, parfois il se trouve que deux classes utilisées pour une action similaire et différente à la fois existent dans votre code.

Commençons à partir d’un  *Message*  pour un forum et d’un  *Message*  pour une messagerie interne : deux classes différentes avec le même nom.

Sauf qu'en PHP, il est **interdit d'avoir deux classes portant le même nom** !

on va encapsuler nos classes dans des "espaces" réservés. On encapsule dans l'espace   Forum  pour la première, et l'espace   Messenger  pour la seconde. Ces espaces concernent surtout le nom de nos classes, c'est pour ça que ça s'appelle les espaces de noms. Il permettent de regrouper des classes sous un même nom, et surtout d’empêcher les ambiguïtés.

```php
<?php

declare(strict_types=1);

namespace Forum;
class Message
{}

namespace Messenger;
class Message
{}
```

Pour faire référence à une classe en particulier, vous devez préfixer son nom par son espace de noms :

*À partir du moment où une classe fait partie d'un espace nommé, vous ne pouvez plus y faire référence uniquement par son nom, vous êtes obligé d'y faire référence avec son espace de noms.*

```php
<?php

declare(strict_types=1);

namespace Forum {
   class Message
   {}
}

namespace Messenger {
   class Message
   {}
}

namespace {
   $forumMessage = new Forum\Message;
   $messengerMessage = new Messenger\Message;
  
   var_dump($forumMessage::class);
   var_dump($messengerMessage::class);

   $date = new \DateTime(); # PHP possède un espace de nom global représenté par un anti-slash
}
```

:::danger
lorsqu'un espace de noms est déclaré dans un fichier, tout le code de ce fichier doit faire partie d'un espace de noms. 

Si il y a un seul namespace dans ce fichier des accolades pour délimiter le namespace sont inutiles car tout le code qui suit dans le fichier appartient au namespace.
:::

:::success
Une pratique courante est de définir l’espace de nom dans lequel on se trouve au début du fichier, puis de préciser les classes provenant des autres espaces de nom (avec le mot-cléuse) en dessous. Ensuite, on y met notre code.
:::

### Importer un espace de nom

Pour importer une classe d'un espace de noms différent, on utilise le mot clé  `use`.

```php
<?php

namespace App\Domain\Messenger {
   class Message
   {}
}

namespace {
   use App\Domain\Messenger\Message;
  
   $messengerMessage = new Message;
   var_dump($messengerMessage::class);
}
```

### Autoload (chargement automatisé)

Dans la bibliothèque SPL de PHP se trouve une fonction nommée   `spl_autoload_register`.

Grâce à `spl_autoload_register`, les classes et donc les fichiers sont chargés uniquement lorsque c'est nécessaire ! Moins à parser, et moins à interpréter, donc de meilleures performances et moins de consommation de mémoire ! 

:::note
Le comportement décrit ci dessus va à l'encontre du fonctionnement de PHP qui est un langage interprété ! Il va charger, lire, parser, analyser et interpréter tous les fichiers demandés à chaque requête que vous faites en temps normal (même si on place des requires dans une condition il analyse le fichier optionnelement appeler). Plus votre application va grandir, pire les performances seront.
:::

Puisque nous écrivons nos espaces de noms comme des chemins de répertoire, si notre arborescence de fichier correspond, alors on peut automatiser le chargement des fichiers :

```php
# Si tu n’arrives pas à charger une classe, voici la fonction que tu peux exécuter pour tenter de la trouver”. La fonction en question est spl_autoload_register et fait un require_once de la classe à partir de son nom complet.

<?php

spl_autoload_register(static function(string $fqcn) {
   // $fqcn contient Domain\Forum\Message
   // remplaçons les \ par des / et ajoutons .php à la fin.
   // on obtient Domain/Forum/Message.php
   $path = str_replace('\\', '/', $fqcn).'.php';

   // puis chargeons le fichier
   require_once($path);
});

use Domain\Forum\Message;

$forumMessage = new Message;
```

:::success
Cette façon de répartir son code en fichiers et répertoires, et d'accorder les espaces de noms, est d'ailleurs très bien détaillé dans la recommandation standard de PHP **PSR-4**.
:::

## Trait (depuis php 5.4)

En PHP il n’est pas possible d’hériter de deux classes ou plus. On peut toutefois utiliser des traits. Plutôt qu'un héritage multiple, on va offrir un moyen d'injecter du code dans une classe par le biais d'un trait.

Comme une classe, un trait :

* possède un nom ;
* peut posséder des propriétés ;
* peut posséder des méthodes ;
* propose de l'abstraction et de la staticité.

En plus de cela, un trait peut :

* modifier la visibilité d'une méthode ou d'une propriété ;
* créer des   `Alias`  de méthode et de propriété en cas de conflit ;
* être composé de plusieurs autres traits.

En revanche, **un trait ne peut pas être instancié**.‌

```php
class Mobile{ // A ecrire dans un autre fichier et inclure ici ensuite

    function power(){
        echo "Unlimited power !!! <br>";
    }
}

trait Lightsaber{ // A ecrire dans un autre fichier et inclure ici ensuite

    function laser(){
        echo "A lightsaber in my pocket";
    }

}

//Que se passe t'il si le trait à une fonction du même nom qu'une fonction contenu dans la classe qu'il hérite (erreur)

trait Pistolaser{ // A ecrire dans un autre fichier et inclure ici ensuite

    function laser(){
        echo "Pew Pew !!!";
    }

}

class Smartphone extends Mobile{
    use Lightsaber, Pistolaser{
        Lightsaber::laser insteadOf Pistolaser; //Indique que la methode de Lightsaber prime sur son homonyme.
        Pistolaser::laser as shoot; // Change le nom de la methode pour l'utiliser dans la classe sans confusion
    }
    // Peut avoir plein de trait (et même ajouter des traits dans des traits)
}

$phone = new Smartphone;
$phone->power();
$phone->laser();
$phone->shoot();
```

### Possibilité de définir des constantes

Avec PHP 8.2, vous pourrez déclarer des constantes dans les traits.

```php
trait PrincingTrait
{
    public const MIN_PRICE = 100;
    public const MAX_PRICE = 1000;
}
```

## Interface

Elles se déclarent avec le mot clé `interface` et ne peuvent contenir que des signatures de méthode.

Quand vous écrivez une méthode, vous lui donnez un nom, une visibilité, des arguments avec des types, obligatoires ou optionnels, des valeurs par défaut, et un type de retour. Tout ça, c'est la **signature**.

Contrairement à l'extension de classe, **vous pouvez implémenter plusieurs interfaces en même temps** avec le mot clé `implement`!

**Une interface peut hériter de plusieurs interfaces** avec le mot clé  `extends`  !

```php
<?php


namespace Domain\Display;


use Domain\User\User;


interface MessageInterface extends otherInterface, anOtherinterface
{
   public function getContent(): string;
   public function getAuthor(): User;
}
```

Toute classe utilisant cette interface sera obligée d'avoir les méthodes  `getContent` et  `getAuthor` qui renverront une chaîne de caractères et un utilisateur. Peu importe la classe, et peu importent son implémentation, son code.

```php
<?php
declare(strict_types=1);


namespace Forum;

use Domain\Display\MessageInterface;

class Message implements MessageInterface, otherInterface
{
    // ... implémentation des méthodes de l'interface
}
```

```php
<?php

declare(strict_types=1);

namespace use Domain\Display;

class MessagePrinter
{
   public static function printMessage(MessageInterface $message) # Tant que notre code garantit que l'objet passé en argument est issu d'une classe utilisant l'interface, alors ça marchera.
   {
       echo sprintf('%s %s', $message->getContent(), $message->getAuthor()->name);
   }
}
```

## Gestion des erreurs

Remontez un cas d'erreur avec le mot clé throw et instancions des objets  `Exception` avec un message et un code d'identification unique, pour qu'un programme puisse les distinguer. :

```php
<?php


/**
* @var string $text le contenu du message
* @return bool true en cas de succès
* @throw Exception on error
*/
function sendEmail(string $text): bool
{   
   if (/*on simule que l’envoie du message réussie*/ false)
   {
       // l’exception jetée avec son message et son code d’erreur
       throw new Exception('L\'envoi du mail a échoué', '22eb3737-3f43-497e-9912-a737975072ea');
   }   
  
   return true;
}
/**
* @var string $text le contenu du message
* @return bool true en cas de succès
* @throw Exception on error
*/
function sendNotification(string $text): bool
{
   if (/*on simule que l’envoie de notification échoue*/ true)
   {
       throw new Exception('L\'envoi de la notification a échoué', 'f3259929-61b2-44d0-a3d6-b855890c0726');
   } 
  
   return true;
}


/**
* @var string $text le contenu du message
* @return bool true en cas de succès
* @throw Exception on error
*/
function sendMessage(string $text): bool
{
   if (10 > strlen($text)) {
       throw new Exception('Le texte est trop court', '02bc3998-b9ff-431e-9058-8ab333ff7742');
   }


   sendEmail($text);
   sendNotification($text);
  
   return true;
}

if (!sendMessage('Hello, ici Greg "pappy" Boyington')) {
   // Avec les Exceptions, en cas d’erreur, ce code n’est plus jamais appelé contrairement à avant, avec l’envoie de booléen.
}
```

Pour attraper une exception, il faut utiliser une nouvelle structure : `try { ... } catch (Exception $e) { ... }`.

* Entre les accolades du `try`, on va mettre le code qui potentiellement peut jeter une exception. 
* `catch` se comporte comme une fonction, car entre parenthèses on mettra un argument typé `Exception`, qui sera appelé en cas d’exception lancée dans le `try`.
* Dans les accolades du   catch, le code à exécuter en cas d'interception d'une exception,  généralement un moyen de traiter l'erreur reçue.
* `try...catch`  propose une structure permettant d'identifier la classe d'exception utilisée. 

Dans PHP, par défaut il n'existe que la classe  `Exception` . MAIS la librairie SPL (la même que pour le chargement automatique), qui est embarquée avec PHP, en propose d'autres.

Elle propose 2 classes qui étendent `Exception : `LogicException` et `RuntimeException`. Ainsi qu'une dizaine d'autres qui découlent de ces deux-ci, que vous pouvez voir dans la [documentation PHP](https://www.php.net/manual/fr/spl.exceptions.php).

:::note
Lorsque vous voulez expliquer à un développeur qu'il n'a pas correctement utilisé le code, et qu'il doit effectuer un changement dans son code, alors vous devez utiliser une LogicException. Si vous voulez exprimer une erreur suite à une saisie utilisateur, qui ne pourrait pas être détectée autrement que durant l’exécution, et donc qu'un simple message d'explication suffit, alors vous devrez utiliser une RuntimeException.‌ 
:::

### Créez des exceptions personnalisées

```php
<?php


class EmailSendingErrorException extends RuntimeException
{
   public $message = 'Impossible d\'envoyer l\'email.';
}


class NotificationSendingErrorException extends RuntimeException
{
   public $message = 'Impossible d\'envoyer la notification.';
}


class ShortText extends RuntimeException
{
   public $message = 'Le texte fourni est trop court.';
}


/**
* @var string $text le contenu du message
* @return bool true en cas de succès
* @throw Exception on error
*/
function sendEmail(string $text): bool
{   
   if (/*envoie du message échoue*/ true)
   {
       throw new EmailSendingErrorException();
   }   
  
   return true;
}
/**
* @var string $text le contenu du message
* @return bool true en cas de succès
* @throw Exception on error
*/
function sendNotification(string $text): bool
{
   if (/*envoie de notification échoue*/ true)
   {
       throw new NotificationSendingErrorException();
   } 
  
   return true;
}


/**
* @var string $text le contenu du message
* @return bool true en cas de succès
* @throw Exception on error
*/
function sendMessage(string $text): bool
{
   if (10 > strlen($text)) {
       throw new ShortTextException();
   }


   try {
       sendNotification($text);
   } catch (NotificationSendingErrorException $e) {
       // Envoyez vous une alerte
       // pour vous prévenir que les notifications ne marche pas ;)
   } finally {
       // finally permet d'exécuter du code quoi qu'il arrive :)
       sendEmail($text);
       // si une exception est jetée par sendEmail,
       // Le return n'est jamais exécuté
       return true;
   }
}


try {
   sendMessage('Hello, ici Greg "pappy" Boyington');
} catch (ShortTextException $e) {
   echo $e->message;
} catch (EmailSendingErrorException $e) {
   echo 'Une erreur est survenue lors de l\'envoi du message, nos équipes ont été prévenues, veuillez réessayer plus tard';
} catch (Exception $e) {
   echo 'Une erreur inattendue est survenue, nos équipes ont été prévenues, veuillez réessayer plus tard';
}
```

**Il est possible d’enchaîner les catch** pour gérer les différents types d’erreurs.

Le **bloc finally** placé après le(s) bloc(s) catch permet d’exécuter du code, qu’il y ait eu des erreurs, ou non.
