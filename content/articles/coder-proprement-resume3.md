---
title: Résumé détaillé du livre “Coder proprement” de Rober C. Martin — 3ème Partie
img: https://images.unsplash.com/photo-1537420327992-d6e192287183?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80
alt: nice image
author: 
  name: Trésor Mvumbi
  bio: Dev
  img: https://miro.medium.com/fit/c/262/262/0*2AmkdmLwUPuJA6xw.jpg
tags: 
  - dev
---
**Chapitre 8: Délimitation de frontières**

Ce court chapitre focalise sur comment intégrer ou interfacer proprement des librairies externes. Le principe important à retenir ici est d'éviter d'exposer publiquement les structures de données ou fonctions de tierces parties. L'exemple suivant illustre les genres de problèmes que peut causer l'exposition d'une structure de données tierce.

```
// Mauvais exemple
class Universite {
  public Map<String, Etudiant> etudiants = new HashMap<String, Etudiant>();
}

// Bon example
class Universite {
  private Map<String, Etudiant> etudiants = new HashMap<String, Etudiant>();
  
  Etudiant lireEtudiant(String codeEtudiant) {
    return etudiants.get(codeEtudiant);
  }

  ...
}
```

La classe Université enregistre les informations sur les étudiants dans une "Map" qui est un tableau associatif où une clé est associée à un objet de type Etudiant. Il peut être tentant d'exposer publiquement directement le map d'étudiants aux utilisateurs de la classe Université. Cette approche permet d'avoir un code très concis mais malheureusement s'accompagne de problèmes suivants:

-   il est impossible d'implémenter des restrictions sur l'ajout, la modification et la lecture d'étudiants. Il ne sera pas possible par exemple de limiter le nombre d'étudiants à ajouter à l'université car la structure Map qui est exposée ici ne donne pas cette fonctionnalité;
-   Il est difficile de faire évoluer la classe Université car remplacer la classe Map par une autre brisera le code client qui utilise la classe Université;
-   Si l'implémentation de la classe Map évolue dans le future, les codes qui exploitent la classe Université doivent changer aussi.

Sur le bon exemple, l'implémentation interne de la classe Université est cachée en rendant le map d'étudiants privée. Avec cette approche, l'utilisateur de la classe Université ne connaît pas la structure utilisée en interne pour stocker les étudiants. Le client de la classe Université utilise une interface beaucoup plus simple et ne dépend pas du Map.

**Chapitre 9: Les tests unitaires**

L'écriture de code propre nécessite souvent d'améliorer incrémentalement et progressivement les codes sources. Les tests unitaires sont donc très importants car ils permettent d'apporter des modifications sans la crainte de casser les fonctionnalités existantes. Ce chapitre partage quelques principes qui aident à écrire des tests unitaires faciles à lire et maintenir.

L'auteur partage l'acronyme F.I.R.S.T. qui permet de se rappeler facilement de 5 principes importants qu'un bon test unitaire devrait satisfaire :

-   Fast: le test doit s'executer rapidement;
-   Indépendant: les tests doivent pouvoir s'exécuter dans n'importe quel ordre, et l'exécution d'un test ne doit pas impacter le résultat d'un autre test;
-   Répétable: plusieurs exécutions du même test doit produire le même résultat;
-   Self-validating: un test doit soit passer, soit echouer;
-   Timely: un test doit pouvoir être écrit rapidement.

Une façon de coder des tests concis et lisible est de créer des utilitaires qui permettent de cacher certaines complexités qui ne sont pas directement liées au test actuel. Avec Java par exemple, la librairie [lombok](https://projectlombok.org/) permet de faciliter la création des objets à utiliser dans les tests.

```
// Mauvais exemple
@Test
public void testerQueEnregistrerEtudiantRetourneErreurQuandAgeEstInvalide() {
  Etudiant marc = new Etudiant();
  marc.setPrenom(“Marc”);
  marc.setNom(“Kalala”);
  marc.setPostnom(“Nzita”);
  marc.setAge(21);

  // reste du test
}

// Bon exemple
@Test
public void testerQueEnregistrerEtudiantRetourneErreurQuandAgeEstInvalide() {
  Etudiant marc = creerEtudiant();

  // reste du test
}
```

Le pattern préparer-exécuter-vérifier consiste à regrouper le code pour le test en trois grandes parties afin de rendre le code plus compréhensible:

-   préparer: définir les données à utiliser pour le test;
-   executer: appeler la fonction en train d'être testée;
-   vérifier: s'assurer que le résultat retourné correspond au résultat escompté.

```
// Bon exemple
@Test
public void testerQueAdditionnerRetourneUnResultatCorrecte() {
    // préparer
    int nombre1 = 8;
    int nombre2 = 2;
    Mathematique math = new Mathematique();

    // executer
    int resultat = math.additionner(nombre1, nombre2);

    // vérifier
    assertEquals(resultat, 10);
}
```

Enfin le dernier principe à retenir de ce chapitre est de tester un seul concept ou condition par test unitaire. Cette règle permet d'écrire des tests concis, faciles à lire et qui vérifient une seule fonctionnalité à la fois.

```
// Mauvais example
@Test(expected = Exception.class)
public void testerQueDiviserRetourneUnResultatCorrecte() {
    // préparer
    int nombre1 = 8;
    int nombre2 = 2;
    Mathematique math = new Mathematique();

    // executer
    int resultat = math.diviser(nombre1, nombre2);

    // vérifier
    assertEquals(resultat, 4);

    // préparer
    int nombre3 = 0;
    
    // executer
    int resultat = math.diviser(nombre1, nombre3);
}

// Bon example
@Test
public void testerQueDiviserAvecUnDenominateurNonNullRetourneUnResultatCorrecte() {
    // préparer
    int nombre1 = 8;
    int nombre2 = 2;
    Mathematique math = new Mathematique();

    // executer
    int resultat = math.diviser(nombre1, nombre2);

    // vérifier
    assertEquals(resultat, 4);
}

@Test(expected = Exception.class)
public void testerQueDiviserAvecUnDenominateurNullRetourneUneException() {
    // préparer
    int nombre1 = 8;
    int nombre2 = 0;
    Mathematique math = new Mathematique();

    // executer
    int resultat = math.diviser(nombre1, nombre2);
}
```

**Chapitre 10: Les classes**

Les classes permettent de définir la structure de données ainsi que le comportement des objets; ils jouent donc un rôle important dans la programmation orientée objet. Ce chapitre partage quelques principes qui permettent de concevoir et écrire des classes propres.

Principe de responsabilité unique: chaque classe doit encapsuler une seule responsabilité; elle doit avoir une seule raison de changer. Le programme devrait être composé de plusieurs petites classes spécialisées qui collaborent entre elles plutôt que d'une poignée de classes larges qui font plusieurs choses.

Principe de la cohésion: une classe doit avoir un petit nombre de variables d'instance et chaque méthode devrait manipuler une ou plusieurs de ces variables. Trop de variables peut être un signe qu'une classe est beaucoup trop complexe et devrait être subdivisée.

```
// Mauvais exemple
class Employe {
  String prenom;
  String nom;
  Date dateNaissance;
  String numeroAppartement;  
  String avenue;
  String commune;
  String ville;
  ...
}

// Bon exemple
class Employe {
  String prenom;
  String nom;
  Date dateNaissance;

  Addresse addresse;
  …
}

class Addresse {
  String numeroAppartement;  
  String avenue;
  String commune;
  String ville;
}
```

Principe ouvert-fermé: une classe doit être ouvert l'extension mais fermée aux modifications. Ajouter une nouvelle fonctionnalité devrait se faire en ajoutant du code; pas en modifiant du code existant. Ce principe est important car ajouter des nouvelles fonctionnalités à une méthode existante la rend plus complexe et augmente le risque de violer le principe de responsabilité unique.