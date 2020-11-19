import Vue from 'vue';
import '@fortawesome/fontawesome-free/css/all.css'
import Vuetify from 'vuetify/lib';
import es from 'vuetify/es5/locale/es';
import 'material-design-icons-iconfont/dist/material-design-icons.css' // Ensure you are using css-loader
Vue.use(Vuetify);

Vue.use(Vuetify);

export default new Vuetify({

  
  theme: {
      options: {
        customProperties: true,
      },
    themes: {
      light: {
        primary: '#ee4455',
        secondary: '#424242',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107',
      },
    },
  },
    lang: {
      locales: { es },
      current: 'es',
    },
  icons: {
    iconfont: 'fa',
  },
});
