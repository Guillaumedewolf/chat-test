<!-- zone affichage message -->
<!-- ===================== template ===================== -->
<template>
	<div id="tchat">
		<button @click="ancienMessageAfficher">ancien message</button>
		<button v-if="listeMessagesLongueur > 30" @click="ancienMessageSpprimer">moins</button>
		<ul class="listeMessage">
			<li class="messageCSS" v-for="message in listeMessages">
				<div v-if="message[1] == user" class="userCSS"><b>moi</b>: {{ message[0] }}</div>
				<div v-else ><b>{{ message[1] }}</b>: {{ message[0] }}</div></li>
		</ul>
	</div>
</template>

<!-- ====================== script ========================== -->

<script>

import { db } from '../main'
import firebase from 'firebase'


export default { 

name: 'chatBox',

data () {
	return	{
		listeMessages: [],
		listeMessagesLongueur: 0,
		limitMessage : 20,
		user: ''
		
		
	}
},

methods: {
	afficherMessage () {
	db.collection("sections/section1/messages").orderBy("envois", "desc").limit(this.limitMessage).onSnapshot(querySnapshot => {

			this.listeMessages.splice(0,this.listeMessages.length)
        querySnapshot.forEach(doc => {
        	var infoMsg = [doc.data().text,doc.data().expediteur]
           this.listeMessages.push(infoMsg)
        });

        this.listeMessages.reverse()
        this.listeMessagesLongueur = this.listeMessages.length
        window.scroll(0,10000)
        
        
    });
},
ancienMessageAfficher(){
	this.limitMessage += 10
	this.afficherMessage()
	this.listeMessagesLongueur = this.listeMessages.length
	
},
ancienMessageSpprimer(){
	this.listeMessagesLongueur = this.listeMessages.length
	this.listeMessages.splice(0,10)
	this.limitMessage += -10
	
	
}

},

created (){
	this.afficherMessage()
	this.user = firebase.auth().currentUser.displayName
	
}




}




</script>

<!-- ====================== CSS ========================== -->

<style>
	#tchat {
		height: 600px;
		width: 500px;
		overflow: scroll;
		margin:auto;
	}
	.messageCSS {
		padding:5px;
		list-style: none;
	}

	.userCSS {
		margin-left: 200px;
	}

</style>