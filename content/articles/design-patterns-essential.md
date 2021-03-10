---
title: Design patterns : l’indispensable à savoir
img: https://www.profocustechnology.com/wp-content/uploads/2016/02/design-pattern-1.jpg
alt: nice image
author: 
  name: Mehdi Zed
  bio: Je suis un dev
  img: https://pbs.twimg.com/profile_images/1203463243429302273/iBWJdFfK_400x400.jpg
tags: 
  - dev
---

Design patterns : l'indispensable à savoir
==========================================

Les design patterns sont inévitables pour tous les développeurs. Si tu ne les connais pas, sache que tu les utilises déjà sans le savoir. Il y a des choses indispensables à savoir pour ne pas être complètement perdu au milieu du champ des design patterns. Ça te servira toute ta carrière, peu importe ton poste.

### Concept

En Français, on dit "patrons de conception".

**Absolument tout le monde écrit et dit design patterns, sa traduction anglaise.** Il y a de fervents défenseurs de la langue française donc soit pas perdu avec ça.

**Un design pattern est une façon standard de résoudre un problème de conception logiciel récurrent.**

Concrètement, les problèmes d'organisation de code que tu rencontres aujourd'hui, des armées de développeur les ont eus avant toi. Avec le temps, ils ont laissé ces concepts de solution pour ton code.

**En prenant un peu de hauteur, n'importe qui peut observer ces concepts et les utiliser.**

![](https://i.imgflip.com/2f2vee.jpg)

Et j'utilise pas le mot concept au hasard. Un design pattern te donne une direction, une façon d'organiser les choses dans ton code.

**C'est pas stackoverflow copier/coller et on serre les fesses pour que ça marche.**

Tu dois t'inspirer fortement de la philosophie de fonctionnement du design pattern pour implémenter une solution optimisée pour ton application.

### Utilité

J'ai lu quelque part qu'un bon développeur n'a pas besoin de connaitre les design patterns.

Apparemment, un développeur, un vrai de vrai, va naturellement les réinventer. Via son cerveau supérieur, au fur à et mesure de la création de son code parfait dans son application divine.

**C'est faux et rempli d'égo.**

Les design patterns sont le fruit de nombreuses années de travail. De nombreux débats et tests sur des applications réelles. De nombreux bouquins depuis 1994. Y'a même du développeur drama avec les anti-patterns et les paquets de variants pour chaque design pattern.

Bref, beaucoup de convulsion de beaucoup de personnes pendant beaucoup de temps, pour essayer de trouver des solutions optimisées.

**Connaitre les design patterns te permet d'avoir des concepts de solutions fiables et testées pour tout type de problème de conception logiciel.**

Les design patterns ont aussi leur langage à eux bien spécifique. C'est très impressionnant quand t'y connait rien.

Quelques mois après avoir rejoint mon premier travail, j'ai participé à une réunion pour la conception du prochain système. Très vite, ils ont commencé à parler de **Façade** pour gérer la tonne de sous-systèmes déjà existants, d'un **Adaptateur** pour connecter une librairie externe et d'un **Observateur** pour les notifications.

**Je ne comprenais rien et je me demandais si j'avais vraiment ma place dans cette pièce rempli d'extraterrestre.**

![](https://fangirlish.com/wp-content/uploads/2020/07/signs.jpg)

J'ai pas émis un son de la réunion.

**Connaitre les design patterns te permet d'échanger et de parler le même langage avec les développeurs autour de toi.**

Et crois-moi, ça c'est plus qu'important si tu veux participer à l'effort dans ton équipe. Alors, évidement pas besoin de tous les connaitre par cœur. Mais avoir les concepts en tête fait toute la différence.

Surtout qu'aujourd'hui, on se retrouve avec un catalogue plutôt impressionnant.

### Portée

Au siècle dernier, la fameuse "[bande des quatre](https://www.journaldev.com/31902/gangs-of-four-gof-design-patterns)" (j'invente rien) a conjointement posé [un bouquin](https://amzn.to/3sYqDZ5) de plus de 400 pages sur la table. À l'intérieur, **23 design patterns** différents. Ils règlent la plupart des problèmes de conceptions logicielles récurrents.

**Alors, je ne te conseille pas du tout ce bouquin.**

Je le trouve complexe et pas très intuitif. Je te conseille très fortement [**Head First Design Pattern**](https://amzn.to/39WVKeK) à la place. Plus simple, mieux expliqué et moins cher en plus. On en reparle plus tard.

Tu t'imagines bien qu'on va pas passer sur [la liste des 23](http://geekswithblogs.net/subodhnpushpak/archive/2009/09/18/the-23-gang-of-four-design-patterns-.-revisited.aspx) et les expliquer un par un dans cet article. Ça serait une lecture de plusieurs heures. Le bouquin dont je viens de te parler et plus adapté pour ça.

Par contre, on va faire une vue d'ensemble pour l'indispensable à savoir. D'abord il faut savoir que les design patterns sont répartis en trois grandes catégories :

#### Design patterns de création

Ils se concentrent sur les façons d'instanciation et de configuration des objets et des classes. Aucune stratégie dans la gestion de création des classes, et ton appli va tôt au tard être remplie [de sataneries](https://www.jesuisundev.com/les-pires-bouts-de-code/).

**Les design patterns de création optimisent la réutilisation et la flexibilité.**

On va pas mal toucher aux concepts d'encapsulation et de gestion/dissimulation de classe concrète avec de l'abstraction. Si tu trouves tout ça compliqué, je vais bientôt faire un article d'introduction à l'architecture logiciel. Ça va être tout de suite plus clair à ce moment-là.

#### Design patterns structurels

Ils se concentrent sur l'organisation des relations entre tous les composants d'un système. Aucune stratégie dans ces relations entrainera un échange d'information lent et/ou défectueux.

**Les design patterns structurels optimisent la simplicité et l'efficacité de la communication dans un système.**

On va principalement faire le lien entre des interfaces et abstraire l'accès à des fonctionnalités dans un système.

#### Design patterns comportementaux

Ils se concentrent sur la répartition des responsabilités entre les composants d'un système. Aucune stratégie dans les responsabilités entrainera des classes et des objets faisant tout et n'importe quoi, par exemple [les fameux god object](https://en.wikipedia.org/wiki/God_object).

**Les design patterns comportementaux optimisent la responsabilité des acteurs dans un système.**

On va définir des comportements via des abstractions qui vont séparer chacun des acteurs dans des responsabilités bien spécifiques.

### Concrètement : Singleton (le mal-aimé)

Comme je te disais, on va pas faire les 23. Mais je trouve ça important de te montrer un exemple concret. Ne serait-ce que pour savoir à quoi ça ressemble.

**J'ai décidé de te parler du design pattern de création Singleton.**

Pourquoi lui en particulier ? J'ai en ma possession trois raisons.

-   Il est très **facile** à comprendre et à implémenter**.** Le code est court, facilement reproductible et praticable. C'est parfait pour une introduction en douceur.
-   C'est l'un des **plus utilisés** donc le connaitre est obligatoire
-   C'est un design pattern très décrié. Il est considéré par énormément de monde comme un **anti-pattern**.

Ça va me permettre de te parler de cette notion d'anti-pattern et des inconvénients des design patterns de façon plus générale.

**Car oui, c'est de loin le design pattern qui choque le plus les développeurs.**

![](https://decider.com/wp-content/uploads/2017/07/signs-lead.png)

Imaginons, tu as une grosse appli qui utilise de façon importante une base de données pour fonctionner. Jusqu'ici rien de fou.

Mais très vite, cette base de données devient une ressource partagée dans l'ensemble de l'application. Dans plein d'endroits différents. Une nouvelle classe est créée à chaque fois et chaque instanciation accède à la même donnée en même temps.

**Il y a un beau potentiel de chaos dans cette situation.**

Il nous faudrait une façon de faire pour avoir une seule instance d'accès à la base donnée. Peu importe pour qui et peu importe depuis où. De plus, il faudrait protéger cette instance contre l'écrasement pour être sûr d'utiliser toujours la même.

C'est exactement ce que nous permet de faire le design pattern Singleton !
```
// database.js

'use strict'

const path = require('path')

const config = path.resolve('config.json')

const databaseSingleton = (()  =>  {

const myDatabase = require('myDatabase')

let instance

function  init  ()  {

const client = myDatabase.createClient(config)

return client

}

return  {

getInstance: ()  =>  {

if  (!instance)  {

instance = init()

}

return instance

}

}

})()

module.exports = { databaseSingleton }

// use example, in a another file

const database = require(path.resolve('database'))

const firstDatabaseInstance = database.databaseSingleton.getInstance()

assert.instanceOf(firstDatabaseInstance, Object)

const secondDatabaseInstance = database.databaseSingleton.getInstance()

assert.instanceOf(secondDatabaseInstance, Object)

assert.deepEqual(firstDatabaseInstance, secondDatabaseInstance)
```
Le concept central de ce design pattern à bien comprendre c'est ce qui se passe dans la fonction getInstance.

Le client n'est censé utiliser que cette fonction. Dans cette fonction, on vérifie si l'instance de la base de données existe déjà. **Si oui on retourne l'existante, sinon on la créer via la fonction interne init.** Enfin, on a plus qu'à retourner l'instance.

Concept très simple, mais très efficace !

Maintenant qu'on a compris le concept on peut le transposer à n'importe quel langage. Pourquoi pas en Python ?

class  DatabaseSingleton(object):

_instance = None

def __new__(cls):

if cls._instance is None:

cls._instance = object.__new__(cls)

return cls._instance

first_database_instance = DatabaseSingleton()

second_database_instance = DatabaseSingleton()

assert first_database_instance is second_database_instance

Et juste comme ça on impose une seule instance pour l'accès à la base de données dans toute l'application et en plus on la protège !

Allez je te dessine même un schéma pour que tu percutes bien ce qui se passe.

![](https://i.imgur.com/cpQEHr5.png)

Et du coup c'est super cette histoire non ?\
Pourquoi tout le monde déteste autant les singletons alors ?

### Inconvénients

Avant de parler spécifiquement du singleton, il faut que tu saches que les design patterns de manière générale sont souvent critiqués.

-   **La première critique c'est qu'ils sont souvent utilisés à tort et **à** travers.**

Souvent les développeurs les foutent de partout dans une folie de suringénierie pour prouver à tout le monde qu'ils sont super forts. Si le scénario a la moindre corrélation avec un design pattern, tu peux être sûr que le développeur va essayer de le faire rentrer de force comme un gros sale.

**Ça crée beaucoup de complexité pour gérer des choses pourtant simples à la base.**

-   **La seconde critique c'est qu'ils sont souvent utilisés tels quels.**

Et là, on revient à ce que je te racontais au début de l'article. Un design pattern c'est d'abord un concept à comprendre. Pas un bout de code à copier/coller et à faire rentrer coûte que coûte tel quel sans prendre en compte les besoins de ton application.

**Ça crée beaucoup de solutions inefficaces car non adaptées au produit.** Beaucoup de bruit inutile, des choses qui n'ont rien à faire là.

![](https://montages.no/files/2015/02/scon2a-600x322.jpg)

La dernière critique est la source de grand débat et de grand drama dans la communauté des développeurs. Certains design patterns seraient carrément l'inverse de leur définition !

### Anti-pattern

Un anti-pattern est une solution standard à un problème de programmation récurrent qui serait en fait un véhicule pour de mauvaises pratiques.

**Et le design pattern singleton est le parfait exemple.**

Tu peux tracer une ligne sur le sol, pour ou contre le singleton, tu trouveras toujours des développeurs pour argumenter dessus. Il y a de nombreuses raisons à ça.

-   **Pas adapté au mutlithreaded**

Dans un environnement multithreaded (c++ par exemple) il doit être traité de façon particulière. Sans ce travail en plus, plusieurs instances pourraient être créées malgré la protection. Le rendant complètement inutile et du même dangereux.

-   **Violation de principe de conception [SOLID](https://fr.wikipedia.org/wiki/SOLID_(informatique))**

Le singleton est responsable de plusieurs choses en même temps, violant ainsi le principe de responsabilité unique. Il ya beaucoup de débats sur le fait qu'il violerait également le principe ouvert/fermé. On va pas entrer là-dedans mais encore une fois sache qu'un article sur l'architecture logiciel est prévu.

-   **Utilisation des variables globales**

L'application de ce design pattern introduit un état global dans le domaine d'application. C'est considéré comme très mauvais, car cet état global ne se soucie pas du reste de l'application.

-   **Plus compliqué à tester**

Le problème avec ce système d'instance unique c'est justement que l'instance est unique. Et quand tu te trouves dans le contexte des tests et que tu souhaites une nouvelle instance à chaque test, c'est très vite très chiant à gérer.

Bref, le Singleton est considéré comme une satanerie.

![](https://i.pinimg.com/originals/46/1b/65/461b652ddbb48d3cc68b37250ef27bed.jpg)

Ce qui est drôle par contre, c'est que le singleton est utilisé par presque tout le monde, presque partout. En fait, c'est le premier que tu es censé apprendre puisque c'est le plus simple. **Du coup, la plupart des développeurs s'arrêtent là.**

Et s'arrêter là, c'est une énorme erreur.

### Aller plus loin

Malgré l'exemple discutable du Singleton, il faut savoir que la plupart des design patterns sont très utiles et surtout très utilisés. Les développeurs autour de toi vont les utiliser et surtout ils vont venir t'en parler.

**Mais surtout, tôt ou tard, des problèmes de conception vont se présenter à toi.** Ils vont être de plus en plus importants et de plus en plus dangereux. L'utilisation des design patterns est le meilleur outil pour te défendre.

![](https://bmoviebffs.com/wp-content/uploads/2018/05/Merrill-at-the-bat.jpg)

**Il n'y a aucune autre ressource gratuite ou payante qui a aussi bien fonctionné sur moi que le bouquin [Head First Design Pattern](https://amzn.to/39WVKeK).** C'est ma forte recommendation du jour.

En fait, le principale argument de ce bouquin c'est sa façon très imagé de faire rentrer les concepts dans la tête. J'adore faire des schémas pour comprendre les choses car je suis un peu bête. Les auteurs ont compris comment bien faire ça aussi.

La parfaite manière d'utiliser des schémas et des illustrations avant d'aller plus concrètement dans du code. Et tout se fait de façon progressive pour les plus juniors. Ce qui était hyper agréable pour mon niveau sur le sujet à l'époque.

Les exemples de code sont en Java, mais on s'en fout. J'ai jamais appris ou fait du Java de toute ma vie, j'ai absolument tout compris du livre. **Tu vas surtout observer des schémas et débloquer des concepts dans la tête !**

Pour te donner une idée, les design patterns que je vois le plus dans mes projets de tous les jours sont : **Singleton, Fabrique et Fabrique Abstraite, Adaptateur, Décorateur, Façade, Itérateur, Observateur**.

Si tu es nouveau dans le sujet et/ou que tu souhaites une ressource concrète dans les mains pour bien comprendre le sujet une fois pour toutes, c'est [un must read](https://amzn.to/39WVKeK) !