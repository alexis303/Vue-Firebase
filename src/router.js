import Vue from 'vue'
import Router from 'vue-router'
import {auth} from '@/firebase'
import Home from './views/Home.vue'
import NotFound from './views/NotFound.vue'
import Evento from './views/Evento.vue'
import AccionesEmail from "./views/usuario/AccionesEmail.vue";
import EnvioVerificacionEmail from "./views/usuario/EnvioVerificacionEmail.vue";
import Login from './views/usuario/Login.vue'
import Register from './views/usuario/Register.vue'
import PaginaPrincipal from './views/PaginaPrincipal.vue'
import Formulario from './views/Formulario.vue'
import PanelAdministracion from './views/PanelAdministracion.vue'
import panelUsers from './views/panel/panelUsers.vue'
import panelEdicion from './views/panel/panelEdicion.vue'
import NoSabesComoHacerlo from './views/panel/NoSabesComoHacerlo.vue'
import CategoriaEvento from './views/panel/CategoriaEvento.vue'
import CategoriaRegalo from './views/panel/CategoriaRegalo.vue'
import eventos from './views/panel/Eventos.vue'
import Ventas from './views/panel/Ventas.vue'
import FracesPanel from './views/panel/FracesPanel.vue'
import PreguntasFrecuentes from './views/panel/PreguntasFrecuentes.vue'
import RegionPanel from './views/panel/RegionPanel.vue'
import ListasPresentacion from './views/panel/ListasPresentacion.vue'
import perfilUser from './views/usuario/perfilUser.vue'
import PrincipalHome from './views/principal.vue'
import Listas from './views/Listas.vue'
import store from './store'




Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home,
      meta: {
        autenticado: true
      },
      children:[
        {
          path: "perfilUser",
          name: "perfilUser",
          component: perfilUser
        },
        {
          path: "bienvenido",
          name: "bienvenido",
          component: PrincipalHome
        },
        {
          path: 'formulario',
          name: 'formulario',
          component: Formulario,
        },
        

        {
          path: 'listas',
          name: 'listas',
          component: Listas,
        },

      ]
    }, 
    {
      meta: {
        autenticado: false
      },
      path:'/home/evento/:id',
      name:'evento',
      component:Evento,
    },
    {
      path:'/PanelAdministracion',
      name:'paneladministracion',
      component:PanelAdministracion,
      meta: {
        autenticado: true,
        cargo:true
        
      },
      children:[
        {
          path: "panelUsers",
          name: "panelUsers",
          component: panelUsers
        },
        {
          path: "categoriaEvento",
          name: "CategoriaEvento",
          component: CategoriaEvento
        },
        {
          path: "categoriaRegalo",
          name: "CategoriaRegalo",
          component: CategoriaRegalo
        },
        {
          path: "ventas",
          name: "Ventas",
          component: Ventas
        },
        {
          path: "eventos",
          name: "eventos",
          component: eventos
        }, {
          path: "PreguntasFrecuentes",
          name: "PreguntasFrecuentes",
          component: PreguntasFrecuentes
        },
        {
          path: "paneledicion",
          name: "paneledicion",
          component: panelEdicion
        },
        {
          path: "NoSabesComoHacerlo",
          name: "NoSabesComoHacerlo",
          component: NoSabesComoHacerlo
        },
        {
          path: "regionpanel",
          name: "regionpanel",
          component: RegionPanel
        },
        {
          path: "fracespanel",
          name: "fracespanel",
          component: FracesPanel
        },
        {
          path: "listaspresentacion",
          name: "listaspresentacion",
          component: ListasPresentacion
        },


        
      ]
       

    },
    {
      path:'/',
      name:'principal',
      component:PaginaPrincipal,
    },

    {
      path: '/login',
      name: 'login',
      component: Login,
      meta:{
        seccionactiva: true
      },
      
      
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta:{
        seccionactiva: true
      },
    },
    {
      path: '/emailVerification',
      name: 'EnvioVerificacionEmail',
      component: EnvioVerificacionEmail,
    },
    {
      path: '/sesion/acciones-email',
      name: 'acciones-email',
      component: AccionesEmail,
      meta:{
        sinAcceso: true
      }
    }, 
    {
      path: '/404',
      name: '404',
      component: NotFound
    },
    {
      path:'*',
      component: NotFound
    }
  ]
})


router.beforeEach((to, from, next) => {

  if (to.matched.some(record => record.meta.seccionactiva)) {
    if (!store.state.usuario) {
      next()

    } else {
      next({
        path: 'home/bienvenido'
      })
    }
  } else {
    next()
  }
})


router.beforeEach((to, from, next) => {
  let user = auth.currentUser

  if(to.matched.some(record => record.meta.autenticado)) {
    if(user) {
      if(user.providerData[0].providerId == 'password' && !user.emailVerified) {
        next({ name: 'EnvioVerificacionEmail' })
      }
      else {
        next()
      }
    }
    else {
      next({ name: 'login' })
    }
  }
  else {
    next()
  }
})

router.beforeEach((to, from, next) => {

  if (to.matched.some(record => record.meta.seccionactiva)) {
    if (!store.state.usuario) {
      next()

    } else {
      next({
        name: 'home'
      })
    }
  } else {
    next()
  }
})

router.beforeEach((to, from, next) => {

  if (to.matched.some(record => record.meta.cargo)) {
    if (store.state.usuario.cargo=='admin') {
      next()

    } else {
      next({
        name: 'perfil'
      })
    }
  } else {
    next()
  }
})


router.beforeEach((to, from, next) => {

  if (to.matched.some(record => record.meta.seccionactiva)) {
    if (!store.state.usuario) {
      next()

    } else {
      next({
        name: 'home'
      })
    }
  } else {
    next()
  }
})


export default router
