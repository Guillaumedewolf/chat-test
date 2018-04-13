<template>

  <div>
    <button v-if="etatConnexion == false" @click="signInGoogle">Sign in with Google</button>
    <button v-if="etatConnexion == true" @click="signOutButton">deco</button>
    <actifs v-if="etatConnexion == true"/>
    <div class="tchatZone">
      <chatBox v-if="etatConnexion == true" />
      <div id="centrerCSS"><inputEnvois  v-if="etatConnexion == true"/></div>
    </div>
  </div>
 
</template>

<script>

import firebase from 'firebase'
import chatBox from './components/chatBox'
import inputEnvois from './components/inputEnvois'
import actifs from './components/actifs'
import { db } from './main'





export default {
  name: 'App',
  components: {
    
    chatBox,
    inputEnvois,
    actifs
    
   
  },

  data () {
  return{
    loading: true,
    user: null,
    Connexion: this.etatConnexion
    
    
  }
    
    

},





methods: {

signInGoogle (){
            const provider = new firebase.auth.GoogleAuthProvider()
        firebase.auth().signInWithPopup(provider).then((result) => {
          this.etatConnexion = true
          db.collection('users').doc(firebase.auth().currentUser.uid).set({
            name: firebase.auth().currentUser.displayName,
            actif: true
          }).then(function() {
            console.log("Document successfully updated!");
      }).catch(function(error) {
    console.error("Error writing document: ", error);
      });
       
        }).catch(err => console.log(error))





          this.userName = firebase.auth().currentUser.displayName

          
          



    },
    signOutButton () {
        // modif actif

          db.collection('users').doc(firebase.auth().currentUser.uid).update({
            actif: false
          }).then(() => {
                  firebase.auth().signOut().then(() => {
                this.etatConnexion = false
              this.user = ''
              }).catch(err => console.log(error))
            console.log("Document successfully updated!");
      }).catch(err => {
    console.error("Error writing document: ", error);
      });

        

        
        
      }

},

updated () {
  this.user = this.userName
  // ajout de user

          
          
}


}



  

</script>

<style>
 .tchatZone{
  margin:auto;
 }
 #centrerCSS {
  margin:auto;
  margin-top: 10px;
  width: 500px;
 }
</style>
