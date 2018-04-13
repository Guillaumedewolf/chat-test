<!-- zone envois message -->
<!-- ===================== template ===================== -->
<template>
		<input class="envoyerCSS" type="text" v-model="messageEnvoyer" @keyup.enter="envois">
</template>

<!-- ====================== script ========================== -->

<script>
import { db } from '../main'
import firebase from 'firebase'

export default { 

name: 'inputEnvois',

data () {
	return{
		messageEnvoyer: ''
	}
		
		

},
methods: {

	

envois () {
		db.collection("sections/section1/messages").add({
    envois: new Date,
    text: this.messageEnvoyer,
    expediteur: firebase.auth().currentUser.displayName
		})
		.then(function(docRef) {
		    console.log("Document written with ID: ", docRef.id);
		})
		.catch(function(error) {
		    console.error("Error adding document: ", error);
		});
	this.messageEnvoyer = ''
}





}

}




</script>

<!-- ====================== CSS ========================== -->

<style>
.envoyerCSS {
	margin: 0 auto;
	width: 500px;

}
	
</style>