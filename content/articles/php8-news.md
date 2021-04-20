---
title: Les nouvelles fonctionnalités de PHP 8
img: https://portfolio-gl.fr/wp-content/uploads/2020/06/PHP8fb-1200x630-2.png
alt: php8 image
author: 
  name: ionos
  bio: ionos
  img: https://www.ionos.fr/digitalguide/fileadmin/templates/images/ionos_logo.svg
tags: 
  - php
---

Les nouvelles fonctionnalités de PHP 8
--------------------------------------

La nouvelle version de PHP est dotée de nouvelles fonctionnalités qui offriront aux développeurs Web de nombreuses possibilités supplémentaires. Voici un résumé des principales améliorations apportées par rapport aux versions précédentes.

### Compilateur JIT

La plus grande innovation est le compilateur JIT, qui améliore sensiblement les performances. PHP n'est pas compilé, mais interprété ligne par ligne. Le compilateur JIT (JIT = Just in Time) **compile des parties du code pendant l'exécution** et agir donc comme une version en cache du code.

Cette nouvelle fonctionnalité de PHP 8 a déjà été testée de manière assez impressionnante par [Pedro Escudero](https://levelup.gitconnected.com/how-fast-is-php-8-going-to-be-f7fdc111cd6 "Rapport sur le compiler JIT"). Ce dernier a utilisé un script simple pour comparer les versions 5.3, 7.4 et 8 (avec et sans JIT). Ainsi, il a exécuté le script 100 fois dans chacune des versions et a ensuite calculé le temps moyen nécessaire à l'exécution.

Les valeurs moyennes suivantes ont donc été obtenues :

| Version | Temps en secondes |
| --- | --- |
| 5.3 | 0.64574003219604 |
| 7.4 | 0.10253500938416 |
| 8 (sans JIT) | 0.098223924636841 |
| 8 (avec JIT) | 0.053637981414795 |

Si le passage de la version 7.4 à la version 8 sans JIT ne fait pas grande différence, la différence par rapport à la version 8 avec JIT est significative. Le compilateur JIT permet **une amélioration des performances de plus de 45 %**.

### Type Union

Les types Union ont déjà fait leur apparition dans d'autres langages comme C/C++, TypeScript ou Haskell. Ici, deux types ou plus peuvent former une union et tout type mentionné peut être utilisé. Dans le code en soi, on pourrait par exemple avoir :

```
public function foo(Foo|Bar $input): int|float;
```

Cependant, il existe une restriction, car *void* ne peut pas faire partie d'un type union, car il ne produit pas de valeur de retour. En outre, les unions nulles peuvent être déclarées avec les mentions *|null* ou *?* , comme dans cet exemple :

```
public function foo(Foo|null $foo): void;
public function bar(?Bar $bar): void;
```

### Static return type

Static est un nom de classe spécial ; dans la nouvelle version, il devient un type Return valide en plus de *self* & *parent*.

### WeakMap

WeakRefs a déjà été ajouté à PHP 7.4. PHP 8 livre maintenant avec WeakMaps l'extension de cette fonction. WeakMaps et WeakRefs peuvent être utilisés pour supprimer des objets lorsque seul le cache fait référence aux classes d'entités des objets. Cela permet **d'économiser des ressources lors de la manipulation des objets**. Un exemple tiré de la documentation :

```
class FooBar {
    private WeakMap $cache;
    public function getSomethingWithCaching(object $obj) {
        return $this->cache[$obj] ??= $this->computeSomethingExpensive($obj);
    }
    // ...
}
```

### ::class appliqué aux objets

Dans les versions précédentes, il fallait utiliser *get_class()* pour attribuer une classe aux objets. Maintenant, vous pouvez appliquer *::class* aux objets, ce qui permet de réduire la taille du code source.

### Stringable interface

La Stringable interface est automatiquement ajoutée aux classes qui implémente la méthode __*toString()*. Auparavant, cette étape devait être effectuée manuellement. Dans le code en soi, voilà à quoi cela ressemble :

```
class Foo
{
    public function __toString(): string
    {
        return 'foo';
    }
}
function bar(Stringable $stringable) { /* ... */ }
bar(new Foo());
bar('abc');
```

### Fonction fdiv()

Avec la nouvelle fonction fdiv(), une division par 0 est autorisée. Vous obtenez alors *INF*, *-INF* ou *NAN* comme valeur de retour.

### Type annotations

PHP 8 comprend des annotations de types correctes pour toutes les fonctions et méthodes internes.

### Type errors

Auparavant, seules les fonctions définies par l'utilisateur déclenchaient les *TypeErrors*, les fonctions internes émettaient un avertissement et *null*. Avec PHP 8, la majorité des fonctions internes renvoient également des *TypeErrors*.

### Nouvelle classification des engine-warnings

Jusqu'à présent, on notait de nombreuses erreurs qui n'apparaissaient que sous forme de warning ou de note. Une mise à jour a maintenant été effectuée. Une [liste complète des nouveaux messages d'erreur PHP](https://wiki.php.net/rfc/engine_warnings "Liste officielle des avertissements sur PHP") est disponible dans la documentation.

### @ ne supprime plus les fatal errors

Au lieu de supprimer les erreurs avec l'opérateur @, comme c'était le cas auparavant, vous pouvez maintenant paramétré *display_errors=Off* sur le serveur.

### Signatures correctes des méthodes magiques

Dans les versions précédentes de PHP, il était possible d'écrire des méthodes magiques avec des signatures qui ne correspondaient pas à la signature attendue, par exemple *__clone(): float* oder *__isset(): Closure*. Depuis l'introduction du PHP 7.0, l'utilisation correcte des méthodes magiques n'a été vérifiée que de manière aléatoire. Divers contrôles de paramètres et de valeurs de retour ont été ajoutés à la nouvelle version afin de garantir l'exactitude des signatures.