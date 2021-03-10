---
title: Résumé détaillé du livre “Coder proprement” de Rober C. Martin — 2ème Partie
img: https://miro.medium.com/max/408/1*9HPVAYPt7W_-hTgbAM3-Lg.jpeg
alt: nice image
author: 
  name: Trésor Mvumbi
  bio: Dev
  img: https://miro.medium.com/fit/c/262/262/0*2AmkdmLwUPuJA6xw.jpg
tags: 
  - dev
---
## Chapitre 5: Formatage du code

La présentation du code a un impacte important sur sa lisibilité et maintenabilité. Ce chapitre aborde quelque principes qui permettent de proprement formater le code.

Dans un projet en équipe, il est important que tous les membres se mettent d’accord sur les règles qui gouverneront le format du code et qui devront être appliquées par tout le monde. Les environnements de développement moderne permettent de vérifier automatiquement que le code respecte des règles prédéfinies de formatage; cette fonctionnalité peut être exploitée pour s’assurer que le code produit est correctement formaté. Enfin, il existe des styles de formatage publique (comme celui de google) qui généralement ont fait leurs preuves et peuvent simplement être adoptés.

Formatage vertical: le code doit pouvoir se lire comme un narratif facile à suivre où les concepts généraux sont présentés en premier et les détails suivent après. Sur l’exemple qui suit, le lecteur doit pouvoir remarquer tout de suite que ce code calcul le poids total d’une voiture et que ceci nécessite de savoir le poids du moteur et celui du chassi.

```
// Mauvais exemple
public double calculerPoidsMoteur() {...}
public double calculerPoidsTotalVoiture() {...}
public double calculerPoidsChassi() {...}

// Bon exemple
public double calculerPoidsTotalVoiture() {...}
public double calculerPoidsMoteur() {...}
public double calculerPoidsChassi() {...}
```

Distance verticale: les codes qui sont conceptuellement liés ou similaires doivent être groupés verticalement afin de faciliter la lisibilité.

```
/ Mauvais exemple
public String lireNumeroAppartement() {...} 
public String lirePrenom() {...}
public String lireCommune() {...} 

public String lireNom() {...} 
public String lirePostnom() {...} 
public String lireAvenue() {...}


// Bon exemple
public String lirePrenom() {...}
public String lireNom() {...} 
public String lirePostnom() {...} 

public String lireNumeroAppartement() {...} 
public String lireAvenue() {...}
public String lireCommune() {...} 
```

Limiter le nombre maximum de caractères par ligne à entre 80 et 120. L’exemple suivant provient de stack overflow.

```
// Mauvais example
private static final Map<Class<? extends Persistent>, PersistentHelper> classeUtilitaire = new HashMap<Class<? extends Persistent>, PersistentHelper>();

// Bon example
private static final Map<Class<? extends Persistent>, PersistentHelper> classeUtilitaire
  = new HashMap<Class<? extends Persistent>, PersistentHelper>();
```

Distance horizontal: utiliser les espaces horizontaux pour associer ou grouper les concepts qui sont liés. Sur l’exemple ci-dessous, la multiplication a la précédence sur l’addition; en conséquence, grouper les multiplications permet de rendre la formule beaucoup plus lisible.

```
// Mauvais exemple
double resultat = 2 * x+x * y+10;

// Bon exemple
double resultat = 2*x + x*y + 10;
```

Ajouter des tabulations pour mettre en exergue la hiérarchie (classes, méthodes, structures de contrôle, etc.).

```
// Mauvais exemple
for(Etudiant etudiant: etudiants) {
if (etudiant.calculerMoyenneGenerale() >= 60) {
etudiant.monterDeClasse();
} else {
etudiant.recaller();
}
}

// Bon exemple
for(Etudiant etudiant: etudiants) {
  if (etudiant.calculerMoyenneGenerale() >= 60) {
    etudiant.monterDeClasse();
  } else {
    etudiant.recaller();
  }
}
```

## Chapitre 6: Les objets et structures de données

Ce court chapitre aborde la création de structures de données propre. Un de principes important à retenir de ce chapitre est que pour isoler (ou encapsuler) les données d’une classe, il ne suffit pas de rendre ses données privé et ajouter des méthodes publiques pour les acceder. L’exemple suivant qui provient du livre permet d’illustrer ce principe.

```
public interface Point {
  double lireX();
  double lireY();
  void ecrireCoordonneesCartesiennes(double x, double y);

  double lireRayon();
  double lireAngle();
  void ecrireCoordonneesPolaires(double rayon, double angle);
}
```

En regardant l’interface ci-dessus, il est impossible de connaître la structure de données interne utilisée pour stocker les coordonnées du point qui peut être cartésien ou polaire. Puisque ce détail d’implémentation n’est pas connu de l’utilisateur de cette interface, la structure de donnée interne du point peut changer sans impacter le code qui utilise cet interface.

## Chapitre 7: Gestion des erreurs

La plupart de langages évolués proposent un mécanisme de gestion des exceptions qui permet de capturer et gérer les erreurs ainsi que d’autres situations exceptionnelles durant l’exécution du programme. Ce chapitre partage quelque principes qui aident à tirer profit au maximum de ces mécanismes de gestion des exceptions.

La règle d’or est de toujours utiliser le machisme de gestion d’exception si langage le supporte. Eviter par exemple de retourner un code d’erreur comme résultat d’une fonction pour signaler un problème. Les exceptions permettent d’inclure des détails sur la cause du problème; ceci aide à gérer correctement les erreurs.

```
// Mauvais exemple
public int calculerAge(LocalDate dateNaissance) {
  if(dateEstAuFuture(dateNaissance)){
    return -1; // code d’erreur pour signaler que la date de naissance n’est pas valide
    // Note: ce code d’erreur ne fournit aucune information sur la cause du problème
  } else {
    return Period.between(dateNaissance, LocalDate.now()).getYears();
  }
}

// Bon exemple
public int calculerAge(LocalDate dateNaissance) throws DateNaissanceInvalideException {
  if(dateEstAuFuture(dateNaissance)) {
    throw new DateNaissanceInvalideException("La date de naissance ne peut pas être dans le future");
  } else {
    return Period.between(dateNaissance, LocalDate.now()).getYears();
  }
}
```

Créer des messages d’erreurs qui sont riche en information afin de faciliter la compréhension et la gestion d’erreurs.

```
// Mauvais exemple
throw new DateInvalideException("Erreur!");

// Bon exemple
throw new DateInvalideException("La date du rendez-vous ne peut pas être dans le passé");
```

Eviter de retourner ou passer null aux fonctions. Utiliser à la place une exception ou retourner une liste vide. NullPointerException est statistiquement l’exception la plus courante; respecter ce principe peut aider à minimiser l’occurrence de cette erreur.

```
// Mauvais exemple
public List<String> lireClients() {
    ...
    If (resultat.length == 0) {
      return null;
    } else {
      ...
    }
}

// Bon exemple
public List<String> lireClients() {
    ...
    If (resultat.length == 0) {
      return new ArrayList<>();
    } else {
      ...
    }
}
```