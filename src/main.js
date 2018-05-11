// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.



import Vue from 'vue'
import firebase from 'firebase/app'
import 'firebase/firestore'
import VueFire from 'vuefire'
import App from './App'
import linkify from 'vue-linkify'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import EmojiConvertor from 'emoji-js/lib/emoji.js'



export const emojiConvertor = new EmojiConvertor();







// import GoogleAuth from 'vue-google-auth'

// explicit installation required in module environments
Vue.use(VueFire)
// activation DB
 var config = {
   apiKey: "AIzaSyCTgLAxSweaSst3pIxqhJ9pql3T1LrdBQA",
    authDomain: "test-chat-188d8.firebaseapp.com",
    databaseURL: "https://test-chat-188d8.firebaseio.com",
    projectId: "test-chat-188d8",
    storageBucket: "test-chat-188d8.appspot.com",
    messagingSenderId: "1012304882000"
}

const settings = {timestampsInSnapshots: true}
var firebaseApp = firebase.initializeApp(config)
export const db = firebase.firestore()
db.settings(settings)

export const storage = firebase.storage();



Vue.config.productionTip = false



// variable global



Vue.mixin({
  data: function() {
    return {
      get etatConnexion() {
        return false;
      },
      get userName() {
        return '';
      }
    }
  }
})



Vue.directive('linkified', linkify)
Vue.use(BootstrapVue);


/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
  
  
})



