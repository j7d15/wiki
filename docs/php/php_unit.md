---
sidebar_position: 19
title: Php Unit
---
# PHP unit

**Les tests garantissent la qualité de votre code et de votre application.**
Ce travail de test va vous demander du développement en plus de ce que vous avez à produire pour que votre application fonctionne.

`PHPUnit` est la référence en matière de tests avec PHP ! Cet outil fournit tout une suite de classes et méthodes utiles pour faciliter l'écriture de tests.

## Installez PHPUnit avec Composer

```shell
composer require --dev phpunit/phpunit ^9 # php unit version 9
composer require phpunit/phpunit

composer require --dev symfony/phpunit-bridge # besoin d’installer une dépendance supplémentaire

# Si vous avez installé PHPUnit via Composer, l'exécutable pour y faire appel est situé dans le dossier vendor/bin de votre projet.

php bin/phpunit –help # Liste des commandes disponibles
.\vendor\bin\phpunit -help # Liste des commandes disponibles
```

## configuration de base de nos tests

Pour configurer le fonctionnement de nos tests nous allons passer par l'utilisation d'un fichier phpunit.xml à la racine du projet.

```xml
<?xml version="1.0" encoding="utf-8" ?>
<phpunit colors="true">
    <testsuite name="Mes super tests">
        <directory>./tests</directory>
    </testsuite>
    <filter>
        <whitelist proceessUncoveredFromWhitelist="true">
            <directory suffix=".php">src/</directory>
        </whitelist>
    </filter>
</phpunit>
```

## Obtenez le rapport de couverture de code

la couverture de code (code coverage report) est une mesure utilisée pour décrire le taux de code source testé d’un programme lorsqu’il est testé par une suite de tests particulière.

Concrètement, écrire un test, c'est exécuter le code à tester, c'est-à-dire :

* Instancier une classe.
* Appeler une méthode en lui passant des paramètres (si besoin).
* En vérifier la sortie.

```shell
# Générer le rapport sous forme de pages HTML dans le dossier le dossier test-coverage qui n'a pas besoin d'être créé au préalable car PHPUnit s'en charge).
php bin/phpunit --coverage-html var/log/test/test-coverage
# Si xdebug n'est pas installé, vous aurez l'erreur suivante lors de la génération du rapport : “Error: No code coverage driver is available”.
ls -lah var/log/test/test-coverage # Ouvrir le fichier index.html dans le nav
```

## premiers tests unitaires

On est dans un projet symfony.

### Classe a tester
```php
<?php
namespace App\Entity;
class Product
{
    const FOOD_PRODUCT = 'food';
    private $name;
    private $type;
    private $price;
    public function __construct($name, $type, $price)
    {
        $this->name = $name;
        $this->type = $type;
        $this->price = $price;
    }
    public function computeTVA()
    {
        // on souleve une exception qui necessite un test
        if ($this->price < 0) {
            throw new Exception('The TVA cannot be negative.');
        }

        // deux  return  :  il va falloir deux tests pour faire en sorte que tous les cas soient couverts.
       if (self::FOOD_PRODUCT == $this->type) {
          return $this->price * 0.055;
       }
       return $this->price * 0.196;
    }
}
```

### Classe de test

Concrètement, du fait que nous étendons la classe  `PHPUnit\Framework\TestCase`  , nous avons la possibilité d'appeler la méthode  `assertSame`  qui prend en paramètres deux valeurs : la valeur attendue et le résultat du code exécuté. Le résultat devrait être 1.1 (puisque  20*0.055 = 1.1  ).

```php
<?php
namespace App\Tests\Entity;
use App\Entity\Product;
use PHPUnit\Framework\TestCase;
class ProductTest extends TestCase
{
    // bien nommer vos méthodes de test
    public function testcomputeTVAFoodProduct()
    {
                $product = new Product('Un produit', Product::FOOD_PRODUCT, 20);
       $this->assertSame(1.1, $product->computeTVA()); // Assertion : proposition supposée vraie.
    }

     public function testComputeTVAOtherProduct()
    {
          $product = new Product('Un autre produit', 'Un autre type de produit', 20);
        $this->assertSame(3.92, $product->computeTVA());
    }

    // Tester le soulevement de l'exception
    public function testNegativePriceComputeTVA()
    {
                $product = new Product('Un produit', Product::FOOD_PRODUCT, -20);
       $this->expectException('Exception');
       $product->computeTVA();
    }
}
```

### Lancer le test

```shell
php bin/phpunit # Lance tous les tests
php bin/phpunit --filter=testComputeTVAOtherProduct # lance le test testComputeTVAOtherProduct
```

## Créez une suite de tests avec des valeurs définies : les data providers

Il est intéressant de s'assurer que son code fonctionne avec une suite de valeurs en entrée différentes, sans pour autant avoir à créer une méthode de test différente.

Grâce à l'annotation `@dataprovider`, PHPUnit est en mesure de récupérer les données via la méthode indiquée dans l'annotation (pricesForFoodProduct). Cette dernière doit retourner un tableau de tableaux, avec autant d'éléments que de paramètres que l'on souhaite passer à la méthode de test qui recevra les données pour les exploiter.

```php
<?php
namespace App\Tests\Entity;
use App\Entity\Product;
use PHPUnit\Framework\TestCase;
class ProductTest extends TestCase
{
   /**
   * @dataProvider pricesForFoodProduct
   */
      public function testcomputeTVAFoodProduct($price, $expectedTva)
   {
              $product = new Product('Un produit', Product::FOOD_PRODUCT, $price);
                       $this->assertSame($expectedTva, $product->computeTVA());
   }
   public function pricesForFoodProduct()
   {
      return [
         [0, 0.0],
         [20, 1.1],
         [100, 5.5]
      ];
   }
   // Au moment où PHPUnit appelle la méthode testcomputeTVAFoodProduct celle-ci sera appelée trois fois de suite
}
```

```shell
php bin/phpunit --filter=testcomputeTVAFoodProduct
```

## Modifiez les règles de comportement de PHPUnit

Il est possible de configurer la manière dont PHPUnit doit se comporter lors du lancement des tests.

La modification du fichier de configuration peut servir à afficher les couleurs lors des tests, choisir le dossier de tests par défaut ...

Dans un projet Symfony, le fichier responsable de la configuration est contenu à la racine du projet, dans le fichier **phpunit.xml.dist**. Libre à vous de le modifier pour en modifier les règles.

## Mock, Dummy et Stub (doublures)

Le principe d'un test unitaire est surtout de ne pas dépendre d'un système externe. Il va falloir donc falloir créer une doublure d'un systéme externe.

* Un “mock” est un objet créé à partir d'un type de classe dont vous maîtrisez entièrement le comportement.
* Un “dummy” est un objet un peu particulier qui remplit un contrat.
* Un “stub” est un “dummy” auquel on ajoute un comportement.

```php
<?php
<?php
namespace App\Tests;
use PHPUnit\Framework\TestCase;
use Symfony\Component\HttpFoundation\Request;
class ClassTest extends TestCase
{
   public function testExemple()
   {
      $request = new Request();
      // Ligne suivante = dummy
      $client = $this->getMock('GuzzleHttp\Client'); // Attention, si une méthode est appelée sur cet objet,  null  sera retourné.
      // Ligne suivante = stab : elle concerne une methode d'un objet
      $client->method('get')->willReturn($request); // indiquez ce que la méthode d'un objet doit toujours retourner lorsqu'elle est appelée.
      
      // Il est tout à fait possible de faire en sorte que la méthode get retourne à son tour un dummy. Pour ce faire, il suffit de remplacer la ligne $request = new Request(); par $request = $this->getMock('Symfony\Component\HttpFoundation\Request');

        // assertion dans un mock
       $client
         ->expects($this->once()) // On s’attend à ce que la méthode  get  soit appelée une fois au moment où le code à tester sera exécuté (en plus de retourner un objet  Request  ).
         ->method('get')
         ->willReturn($request);
   }
}
```

### Objet complexe

Si vous avez besoin de tester les méthodes d'une classe qui requiert des dépendances difficiles à construire, il est pratique de créer une doublure au lieu d'instancier la dépendance en question.

Exemple 1 : constructeur d'une dépendance compliqué

```php
<?php
namespace App\Tests\Folder;
use PHPUnit\Framework\TestCase;
class ExempleClassTest extends TestCase
{
   public function testExemple()
   {
      $serializer = $this
         ->getMockBuilder('JMS\Serializer\Serializer')
         ->disableOriginalConstructor()
         ->getMock();
      $classToTest = new ExempleClass($serializer); // Un serializer disponible et malléable, à utiliser dans vos tests autant que vous le souhaitez.
   }
}
```

Exemple 2 : Maîtriser le retour d'une méthode appelée par le code original

```php
<?php
namespace AppBundle\Security;
class GithubUserProvider extends UserProviderInterface
{
   private $client;
   public function __construct(Client $client)
   {
      $this->client = $client;
   }
   public function loadUserByUsername($username)
   {
        $response = $this->client->get('https://api.github.com/user?access_token='.$username);
        //  nous effectuons une requête HTTP GET auprès de GitHub (le service externe dans notre exemple). Or, dans un test unitaire, vous devez faire attention à ne pas être tributaire d'une communication auprès d'un service externe, qui pourrait être défaillante.
   }
}
```

```php
<?php
namespace App\Tests\Folder;
use App\Security\GithubUserProvider;
use PHPUnit\Framework\TestCase
class GithubUserProviderTest extends TestCase
{
   public function testLoadUserByUsername()
   {
      $response = …; // Ce que l'on souhaite recevoir.
        $client = $this->getMockBuilder('GuzzleHttp\Client')
         ->disableOriginalConstructor() // on demande à PHPUnit de ne pas faire appel au constructeur original de la classe
         ->getMock();
      $client
         ->method('get')
         ->willReturn($response);
      // …
        $githubUserProvider = new GithubUserProvider($client);
      $githubUserProvider->loadUserByUsername('xxxxx');
      // Assertions du test
      // …
   }
}
```

## Factorisez le code

La méthode **setUp** est une méthode que l'on peut surcharger pour exécuter des instructions avant chaque test de la classe.

Il est également possible d'intervenir à chaque fin de test (après chaque méthode de test de la classe) grâce à la méthode **tearDown**. 

```php
<?php
namespace App\Tests\Security;

use App\Entity\User;
use App\Security\GithubUserProvider;
use GuzzleHttp\Client;
use JMS\Serializer\Serializer;
use PHPUnit\Framework\MockObject\MockObject;
use PHPUnit\Framework\TestCase;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\StreamInterface;

class GithubUserProviderTest extends TestCase
{
    private MockObject | Client | null $client;
    private MockObject | Serializer | null $serializer;
            private MockObject | StreamInterface | null $streamedResponse;
    private MockObject | ResponseInterface | null $response;

    public function setUp(): void
    {
                                $this->client = $this->getMockBuilder('GuzzleHttp\Client')
            ->disableOriginalConstructor()
            ->setMethods(['get'])
            ->getMock();
        $this->serializer = $this
            ->getMockBuilder('JMS\Serializer\Serializer')
            ->disableOriginalConstructor()
            ->getMock();
        $this->streamedResponse = $this
            ->getMockBuilder('Psr\Http\Message\StreamInterface')
            ->getMock();
        $this->response = $this
        
->getMockBuilder('Psr\Http\Message\ResponseInterface')
            ->getMock();
    }

    public function testLoadUserByUsernameReturningAUser()
    {
        $this->client
            ->expects($this->once())
            ->method('get')
            ->willReturn($this->response);
 
        $this->response
            ->expects($this->once())
            ->method('getBody')
            ->willReturn($this->streamedResponse);

        $this->streamedResponse
            ->expects($this->once())
            ->method('getContents')
            ->willReturn('foo');

        $userData = [
            'login' => 'a login',
            'name' => 'user name',
            'email' => 'adress@mail.com',
            'avatar_url' => 'url to the avatar',
            'html_url' => 'url to profile'
        ];
        $this->serializer
            ->expects($this->once())
            ->method('deserialize')
            ->willReturn($userData);

                      $githubUserProvider = new GithubUserProvider($this->client, $this->serializer);
                                        $user = $githubUserProvider->loadUserByUsername('an-access-token');

                $expectedUser = new User($userData['login'], $userData['name'], $userData['email'], $userData['avatar_url'], $userData['html_url']);
        $this->assertEquals($expectedUser, $user);
        $this->assertEquals('App\Entity\User', get_class($user));
    }

    public function testLoadUserByUsernameThrowingException()
    {
        $this->client
            ->expects($this->once())
            ->method('get')
            ->willReturn($this->response);

        $this->response
            ->expects($this->once())
            ->method('getBody')
            ->willReturn($this->streamedResponse);

        $this->streamedResponse
            ->expects($this->once())
            ->method('getContents')
            ->willReturn('foo');

        $this->serializer
            ->expects($this->once())
            ->method('deserialize')
            ->willReturn([]);

        $this->expectException('LogicException');

        $githubUserProvider = new GithubUserProvider($this->client, $this->serializer);
                      
        $githubUserProvider->loadUserByUsername('an-access-token');
    }

    // Il est important de remettre l'ensemble des variables à null à chaque fin de test pour que la mémoire du système ne soit pas trop encombrée.
    public function tearDown() : void
    {
        $this->client = null;
        $this->serializer = null;
        $this->streamedResponse = null;
        $this->response = null;
    }
}
```

## Trouvez ce qu’il faut tester (TDD)

L'une des problématiques récurrentes dans l'écriture de tests est le temps à passer sur l'écriture de ceux-ci.

Écrire des tests demande une grande rigueur avec vous-même : en effet, il faut prendre le temps de lister ce qu'il faut tester, écrire ces tests, et surtout les maintenir à jour. Ce n'est pas une mince affaire !

Vous pouvez écrire vos tests à différents moments au cours de votre cycle projet :

* avant d'écrire votre code fonctionnel (On parle de Test Driven Development : **TDD**.);
* après avoir écrit votre code fonctionnel ;
* lorsqu'un bug est détecté.


## Intégration continue

Avec un test, vous cherchez à faire en sorte de valider automatiquement le fonctionnement de votre code et le fonctionnement de votre application en général.

L'**intégration continue passe par un outil** (un logiciel comme jenkins). Cet outil est chargé de lancer un ou plusieurs logiciels qui sont eux-mêmes en charge de valider un aspect de l'application (tests unitaires, tests fonctionnels, tests d'intégration, tests de performances… et bien d'autres). C'est une solution pour faire en sorte que les **tests soient lancés de façon systématique avant un événement important**. Cet événement peut être la fusion d'une branche Git sur laquelle vous avez travaillé dans la branche master (qui doit toujours être stable), ou encore avant un déploiement en (pré)production.