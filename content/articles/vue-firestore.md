---
title: Utilisation de Cloud Firestore dans Vue avec vue-firestore
img: https://camo.githubusercontent.com/666ffbf500f42c71b7de76f68d1181062b9921b99942029166f5cd098f5f8bf0/68747470733a2f2f692e696d6775722e636f6d2f6b6930726272582e706e67
alt: nice image
author: 
  name: alligator.io
  bio: https://alligator.io/
  img: https://alligator.io/images/front-end-cover.png
tags: 
  - vuejs
---



Cloud Firestore est le successeur spirituel de la populaire base de données en temps réel de Firebase. Bien qu'il existe de nombreuses différences clés que vous pouvez lire ici , les principales qui ressortent sont: un modèle de données plus structuré , des requêtes indexées plus robustes et des opérations par lots atomiques .

Nous utiliserons les @firebase namespaced packages (pour réduire la taille de notre bundle) ainsi que vue-firestore pour certaines liaisons simples de Vue .

## Installation

Si vous souhaitez ignorer l'installation et y accéder directement, voici une boîte de codes et tout ce dont vous avez besoin, ajoutez simplement votre configuration Firebase.

Si vous partez de zéro, utilisez le modèle vue-cli de votre choix ( webpack-simple est un bon modèle ).

Ensuite, installez tout ce dont vous aurez besoin pour obtenir ce ‘fired’ up 🔥🚀
```
$ npm install @firebase/app @firebase/firestore vue-firestore --save
```
Remarque: nous utilisons les namespaced packages pour éviter d'importer la bibliothèque Firebase complete.

## Configurer Firebase

Vous devrez obtenir les informations d'identification de votre projet à partir de la console Firebase en accédant à Ajouter Firebase à votre application Web.

Une fois que vous avez les informations d'identification, créez firebase.jspour initialiser Firestore, en remplaçant les données d'espace réservé par les vôtres.

firebase.js
```
import { firebase } from "@firebase/app";
import "@firebase/firestore";

const firebaseApp = firebase.initializeApp({
  apiKey: "xxxxxxxxxxxxxxxxxxxxxxxxxxx",
  authDomain: "your-project.firebaseapp.com",
  databaseURL: "https://your-project.firebaseio.com",
  projectId: "your-project",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "xxxxxxxxxxxx"
});

export const db = firebaseApp.firestore();
```
Si vous ne l'avez pas fait, ajoutez Cloud Firestore à votre projet dans la console Firebase en accédant à Base de données> Premiers pas> Essayer Firestore Beta .
Ajouter à Vue avec vue-firestore

Dans index.jsle make let que Vue utilisevue-firestore
```
index.js

import Vue from 'vue';
import App from './App';
import VueFirestore from 'vue-firestore';

// turns off the 'You are running Vue in development mode.' msg
Vue.config.productionTip = false;

Vue.use(VueFirestore);

new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
})
```
Maintenant pour la magie. Remplacez tout ce qui se trouve App.vuepar ce qui suit:

App.vue
```
<template>
  <div id="app">
    <div>
      <input type="text"
        v-model="newReptile"
        @keyup.enter="addReptile">
      <button  @click="addReptile">
        Add Reptile
      </button>
    </div>
    <ul class="reptileList">
      <li v-for="reptile in reptiles" >
        {{ reptile.name }} -
        <button @click="deleteReptile(reptile)">
          Remove
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
  import { db } from './firebase';

  export default {
    name: 'app',
    data() {
      return {
        reptiles: [],
        newReptile: ''
      }
    },
    firestore() {
      return {
        reptiles: db.collection('reptiles'),
      }
    },
    methods: {
      addReptile: function() {
        this.$firestore.reptiles.add(
          {
            name: this.newReptile,
            timestamp: new Date()
          }
        );
        this.newReptile = '';
      },
      deleteReptile: function(reptile) {
        this.$firestore.reptiles.doc(reptile['.key']).delete();
      }
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
  .reptileList {
    list-style: none;
  }
</style>
```
Alors que se passe-t-il ici? Nous importons une référence à notre base de données à partir de firebase.js et utilisons  firestore() à partir de vue-firestore pour lier notre collection de 'reptiles' en temps réel. Nous créons une addReptile méthode qui utilise add() de sorte que nous n'ayons pas à nous soucier de générer des identifiants de document. Dans ce cas, nous générons un horodatage afin que le tri soit plus facile à l'avenir.

Enfin, nous ajoutons une méthode deleteReptile qui prend un objet reptile en entrée. L'ingredient secret est la .key propriété nécessaire pour supprimer (ou mettre à jour) un document. Cela est possible car la collection de reptiles sera retournée dans ce format normalisé:

[
    {
        ".key": "-Jtjl482BaXBCI7brMT8",
        "name": "alligator",
        "timestamp": "February 3, 2018 at 9:05:15 AM UTC-5"
    },
    {
        ".key": "-JtjlAXoQ3VAoNiJcka9",
        "name": "crocodile",
        "timestamp": "February 3, 2018 at 9:08:28 AM UTC-5"
    }
]

Si tout fonctionne correctement, votre base de données et votre application devraient ressembler à ceci:

![aperçu de l'application Firestore](https://d33wubrfki0l68.cloudfront.net/cc38de7ea70ab735b01f608289b4724c57deb2e7/6fed3/images/vuejs/vue-cloud-firestore/vue-firestore-sample.gif)
                

👉 Votre application est maintenant 🔥
