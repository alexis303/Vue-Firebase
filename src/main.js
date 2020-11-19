import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuelidate from 'vuelidate'
import {
  auth
} from './firebase'
import vuetify from './plugins/vuetify';
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import VueCurrencyFilter from 'vue-currency-filter'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueCryptojs from 'vue-cryptojs'
 


Vue.config.productionTip = false
Vue.use(VueAxios, axios);
Vue.use(VueCryptojs);
Vue.use(vuelidate);
Vue.use(VueCurrencyFilter);
Vue.use(VueCurrencyFilter, {
  symbol: '$',
  thousandsSeparator: '.',
  fractionSeparator: ',',
  symbolPosition: 'front',
  symbolSpacing: true
})

auth.onAuthStateChanged(user => {
  if (user) {
    store.dispatch('iniciarSesion', user.uid)
      .then(() => {
        iniciarVue()
      })
  } else {
    store.dispatch('cerrarSesion')
      .then(() => {
        iniciarVue()
      })
  }
})

let vue = null

function iniciarVue() {
  if (!vue) {
    vue = new Vue({
      store,
      router,
      vuetify,
      render: h => h(App)
    }).$mount('#app')
  }
}