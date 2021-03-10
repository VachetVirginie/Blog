---
title: Résumé détaillé du livre “Coder proprement” de Rober C. Martin — 1ère Partie
img: https://miro.medium.com/max/408/1*9HPVAYPt7W_-hTgbAM3-Lg.jpeg
alt: nice image
author: 
  name: Trésor Mvumbi
  bio: Dev
  img: https://miro.medium.com/fit/c/262/262/0*2AmkdmLwUPuJA6xw.jpg
tags: 
  - dev
---

Cet article est la première partie d'un résumé détaillé du livre "Coder proprement" de Robert C. Martin. Cette première partie couvre trois chapitres. Robert, surnommé oncle Bob, est un dinosaure dans la programmation avec plus de 40 années d'expérience. Le livre qu'il a écrit constitue une référence dans le secteur. Dans "Coder proprement", oncle Bob explique avec beaucoup de détails ce qu'il considère du "code propre" et comment le produire. Les principes et opinions qu'il partage se basent sur ses décennies d'expériences à programmer.

Cet article est un condensé de principes phares; il peut être utilisé comme aide mémoire sans enlever la nécessité de lire le livre (que j'encourage fortement). Ce résumé propose d'autres exemples de codes beaucoup plus concis par rapport au livre afin de faciliter la compréhension des principes. Les codes illustrés sont écrits en Java, mais les principes peuvent s'appliquer à la plupart de langages.

Liens amazon pour se procurer le livre:

[Version originale](https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882) (en anglais)

[Traduction française](https://www.amazon.fr/Coder-proprement-Robert-C-Martin/dp/232600227X/ref=pd_lpo_sbs_14_t_1/257-8725096-5892903?_encoding=UTF8&psc=1&refRID=VZ6CQAPQHTC6QRXSSKMQ)

![Image for post](https://miro.medium.com/max/48/1*9HPVAYPt7W_-hTgbAM3-Lg.jpeg?q=20)

![Image for post](https://miro.medium.com/max/408/1*9HPVAYPt7W_-hTgbAM3-Lg.jpeg)

**Chapitre 2: Nomenclature des variables, fonctions et classes**

Les noms jouent un rôle crucial dans la lisibilité de codes sources. Ce chapitre est un recueille de principes simples à suivre pour choisir des noms qui rendent le code plus facile à comprendre et maintenir.

Utiliser des noms qui révèlent clairement l'intention et le rôle de variables, fonctions ou classes.
```
// Mauvais exemple
List liste1 = new ArrayList<>();

// Bon exemple
List nomsClients = new ArrayList<>();
```
Ne pas hésiter d'utiliser des noms long car un nom kilométrique et expressif est mieux qu'un nom court et énigmatique.
```
// Mauvais exemple
double aMoyEl;

// Bon exemple
double ageMoyenEleves;
```
Faire une distinction significative entre les noms qui référencent des concepts similaires.
```
// Mauvais exemple
public Route calculerRoute(Noeud noeud1, Noeud noeud2) {...}

// Bon exemple
public Route calculerRoute(Noeud source, Noeud destination) {...}
```
Eviter d'utiliser des valeurs numériques dans le code directement, les remplacer plutôt par des constantes avec des noms qui clarifient leur signification.
```
// Mauvais exemple
double surfaceCercle = 3.14 * rayon ^ 2;

// Bon exemple
final double PI = 3.14;
double surfaceCercle = PI * rayon ^ 2;
```
Utiliser des noms ou phrases nominales pour nommer les classes et variables.
```
// Mauvais exemple
class ConvertirEnDate {...} // ne pas utiliser un verbe pour nommer une classe

// Bon exemple
class ConvertisseurDate {...}
```
Utiliser des verbes ou des phrases verbales commençant par le verbe pour nommer les méthodes ou fonctions. Le nom doit pouvoir exprimer l'action que la fonction fait.
```
// Mauvais exemple
public double calculDeSalaire(){...}

// Bon exemple
public double calculerSalaire(){...}
```
Garder une certaine consistance dans la façon de nommer les fonctions. Par exemple, utiliser les même verbes lorsque le contexte est similaire.
```
// Mauvais exemple
public String lirePrenom() {...}
public String obtenirNom() {...}

// Bon exemple
public String lirePrenom() {...}
public String lireNom() {...}
```
Pour les fonction avec un seul argument, essayer de former des belles combinaisons verbe/nom qui rendent le code plus lisible.
```
// Bon exemple
public void payer(Employe employe) {...}
...
payer(martin); // ce code est facile à lire

// Mauvais exemple
faireLaPaie(martin);
view raw

```
**Chapitre 3: Les fonctions**

Les fonctions permettent d'organiser le code en plusieurs modules réutilisables et jouent un rôle important dans l'architecture de programmes informatiques. Ce chapitre est une collection des principes permettant d'utiliser optimalement les fonctions.

Une fonction doit faire une et une seule chose, et le faire bien. Sur l'exemple ci-dessous, la fonction principale qui calcul la surface totale fait trop de choses à la fois: elle implémente aussi le calcul de la surface du cercle et du rectangle. Elle peut être améliorée en créant deux nouvelles fonctions pour calculer la surface du cercle et du rectangle. Et en bonus, les deux nouvelles fonctions peuvent être ré-utilisées ailleurs.

```
// Mauvais exemple
double calculerSurfaceTotale() {
  double surfaceCercle =  PI * rayon ^ 2;
  double surfaceRectangle = longeur * largeur;
  return surfaceCercle + surfaceRectangle;
}

// Bon exemple
double calculerSurfaceTotale() {
  double surfaceCercle =  calculerSurfaceCercle(rayon);
  double surfaceRectangle = calculerSurfaceRectangle(longeur,largeur);
  return surfaceCercle + surfaceRectangle;
}
```
Les fonctions doivent idéalement avoir 20 lignes ou moins, et pas plus de 100 lignes. Au delà de cette limite, il devient nécessaire de revoir le code pour s'assurer que la fonction ne fait qu'une seule chose. Dans la même veine, une fonction ne doit pas idéalement dépasser deux niveaux d'imbrications. Le code suivant utilise 3 niveaux d'imbrications pour calculer la cote totale d'une salle de classe. La fonction sur l'exemple peut être simplifiée en créant une nouvelle méthode séparée pour calculer la cote totale par étudiant et ainsi garder un seul niveau d'imbrication. Le code initial a nécessité plusieurs niveaux d'imbrications parce la fonction faisait plusieurs choses à la fois.

```
// Mauvais exemple
int calculerCoteTotale() {
  int coteTotale = 0;
  for(Etudiant etudiant: etudiants) { // 1ère imbrication
     int coteEtudiant = 0;
     for(Cours cours: etudiant.lireListeCours()) { // 2ème imbrication
       for(Examen examen: cours.lireListeExamens()) { // 3ème imbrication
         coteEtudiant += examen.lireCote();
       }
     } 
     coteTotale += coteEtudiant;
  }
  return coteTotale;
}

// Bon exemple
int calculerCoteTotale() {
  int coteTotale = 0;
  for(Etudiant etudiant: etudiants) { // 1ère imbrication
     int coteEtudiant = etudiant.calculerCote();
     coteTotale += coteEtudiant;
  }
  return coteTotale;
}
```

Le code doit pouvoir être lu comme un narratif du haut vers le bas; commencer par implémenter les concepts généraux et ensuite détailler leur implémentation plus bas.

```
/ Mauvais exemple
double calculerSurfaceProvince();
double calculerSurfacePays();
double calculerSurfaceVille();

// Bon exemple
double calculerSurfacePays();
double calculerSurfaceProvince();
double calculerSurfaceVille();
```
Utiliser un nombre minimal d'arguments pour une fonction; idéalement 3 au maximum. Un nombre élevé d'arguments peut parfois indiquer le besoin de restructurer le code. Sur l'exemple ci-dessous, ajouter une nouvelle classe qui encapsule toutes les propriétés d'un étudiant permet de limiter le nombre d'arguments de la fonction enregistrerEtudiant.

```
// Mauvais exemple
public void enregistrerEtudiant(String prenom, String nom, String postnom, int age) {...}

// Bon exemple
public void enregistrerEtudiant(Etudiant etudiant) {...}
...
Class Etudiant {
  String prenom, nom, postnom;
  int age;
  ...
}
```
Une fonction ne doit pas modifier un ou plusieurs arguments pour retourner le résultat. Modifier un argument produit un code qui n'est pas intuitive à lire car les paramètres de la fonction sont conçus pour être des sources d'entré de données et non de sorti.

```
// Mauvais exemple
public void calculerSurfaceRectangle(Double longeur, Double largeur, Double resultat) {
  resultat = longeur * largeur;
}

// Bon exemple
public Double calculerSurfaceRectangle(Double longeur, Double largeur) {
  return longeur * largeur;
}
```
Les fonctions ne doivent pas avoir des "effets secondaires". L'auteur met un accent sur le fait que les effets secondaires constituent des mensonges car le nom de la fonction promet de faire une chose mais son implémentation fait autre chose. Sur l'exemple ci-dessous, la fonction calculerSalaire enregistre aussi l'employé dans la base données; une action qui n'est pas explicite lorsqu'on regarde le nom de la fonction. Les effets secondaires constituent des sources de confusion et peuvent causer des bugs qui sont très difficile à tracer. Sur le code ci-dessous, il est improbable de penser aller chercher un problème lié à l'enregistrement dans une function qui s'intitule calculerSalaire.

```
// Mauvais exemple
double salaire = calculerSalaire(john);
...
double calculerSalaire(Employe employe) {
   double resultat = nombreJoursOuvrables * salaireJournalier;
   enregistrerEmploye(employe); // effet secondaire !!
   return resultat;
}

// Bon exemple
double salaire = calculerSalaire(john);
...
enregistrerEmploye(employe);
...
double calculerSalaire(Employe employe) {
   return nombreJoursOuvrables * salaireJournalier;
}
```
**Chapitre 4: Les commentaires**

L'auteur a une position assez tranchée sur les commentaires: ils constituent un "mal nécessaire" pour compenser l'incapacité de s'exprimer clairement en utilisant seulement le code. Oncle Bob recommande donc avant d'écrire un commentaire, de prendre d'abord le temps de réfléchir sur comment rendre le code tellement claire qu'il n'est pas nécessaire d'ajouter un commentaire.

> "Ne pas commenter des mauvais codes, il faut les réécrire" Brian W. Kernighan et P.J. Plaugher

Mettre à jour les commentaires lorsque le code change demande des efforts et de la discipline; c'est pourquoi dans la pratique, les commentaires finissent par perimer et dans le pire de cas, ils deviennent incorrects et source de confusion. Un code avec des commentaires incorrectes est pire qu'un code sans commentaire du tout; car le code dira toujours ce qu'il fait ("le code ne ment jamais", pour citer l'auteur). Par conséquent, éviter par tout moyen de devoir recourir aux commentaires, sauf dans les cas suivants où commenter est compréhensible:

-   Notes légales: comme le copyright par exemple;
-   Javadocs pour les API publiques;
-   Explication de l'intention sur les expressions régulières;
-   Les commentaires 'TODO' et 'FIXME' où l'on note les choses à faire dans le future pour ne pas oublier;
-   Tirer l'attention sur certains codes sensibles dont la modification pourrait créer des problèmes.

Les commentaires suivants ne sont pas acceptable:

-   Journal de modifications: ne pas ajouter dans le code source une historique de modifications faite sur le code; utiliser un outil de contrôle de code sources (comme git) pour ça;
-   Commentaires bruyants qui re-disent des choses évidentes clairement exprimées par le code;
-   Commentaires qui peuvent être évité lorsqu'on utilise une bonne nomenclature pour une variable ou une fonction;
-   Commentaires signalant la fin d'une fonction: ceci est une indication qu'une fonction est beaucoup trop long;
-   Codes commentés: il faut les supprimer tout simplement. S'il y a besoin d'y recourir dans le future, ils peuvent être retrouvé par l'outil de contrôle de codes sources;

Eviter l'utilisation de langages codés (tel que l'HTML) dans les commentaires. [Voici un lien](https://stackoverflow.com/questions/15560777/does-html-in-javadoc-comments-reduce-the-readability-is-so-whats-the-altern) (en anglais) qui discute avec un peu plus en détail les avantages et désavantages d'utiliser du HTML dans les commentaires, et le bien fondé de cette règle.