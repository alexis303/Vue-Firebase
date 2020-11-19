<template>
<div id="app">
  <v-app id="inspire">
    <v-app-bar
  
      app
      clipped-left
      color="amber"
    >
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <span class="title ml-3 mr-5">ADMINISTRACION&nbsp;<span class="font-weight-light"></span></span>
      <v-layout align-end justify-end >
      <v-sapacer></v-sapacer>
           <v-btn class="hidden-md-and-down" text icon :to="name='/home/bienvenido'">
          <v-icon>fa-home</v-icon>
        </v-btn>
         <v-btn class="hidden-md-and-down" text icon  @click="salir">
          <v-icon>fa-door-open</v-icon>
        </v-btn>
  </v-layout>
    </v-app-bar>
    <v-navigation-drawer
      width="300"
      v-model="drawer"
      app
      clipped
      color="grey lighten-4"
    >
      <v-list
        dense
        class="grey lighten-4"
      >
      <v-list >
      <v-img   height="150px"    class="white--text align-end" :src="usuario.fotoPerfil">  <v-card-title dark > {{usuario.nombres}}</v-card-title>  </v-img>
      </v-list>
        <template v-for="(item, i) in items">
          <v-layout
            v-if="item.heading"
            :key="i"
            row
            align-center
          >
            <v-flex xs6>
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
            </v-flex>
            <v-flex
              xs6
              class="text-xs-right"
            >
              <v-btn
                small
                text
              >edit</v-btn>
            </v-flex>
          </v-layout>
          <v-divider
            v-else-if="item.divider"
            :key="i"
            dark
            class="my-3"
          ></v-divider>
          <v-list-item
            v-else
            :key="i"
          :to="name =item.ruta">
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="grey--text">
                {{ item.text }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>

    <main class="page-content">
            <router-view/>
        </main>
  </v-app>
</div>
</template>
<script>
import { mapMutations, mapState, mapActions } from "vuex";
export default {
    data(){
        return{

    drawer: null,
    items: [
      { icon: 'fas fa-users', text: 'Usuarios' ,ruta:'/paneladministracion/panelUsers'},
      { icon: 'fas fa-dollar-sign', text: 'Compras' ,ruta:'/paneladministracion/ventas'},
      { icon: 'fas fa-birthday-cake', text: 'Categorias Evento' ,ruta:'/paneladministracion/categoriaEvento'},
      { icon: 'fas fa-gift', text: 'Categorias Regalo' ,ruta:'/paneladministracion/categoriaRegalo' },
      { icon: 'fas fa-calendar-day', text: 'Eventos' ,ruta:'/paneladministracion/eventos' },
      { icon: 'fas fa-comment-dots', text: 'Preguntas Frecuentes' ,ruta:'/paneladministracion/PreguntasFrecuentes' },
      { divider: true },
      { icon: 'archive', text: 'Archive' },
      { icon: 'delete', text: 'Trash' },
      { divider: true },
      { icon: 'settings', text: 'Panel Principal',ruta:'/paneladministracion/paneledicion'  },
        { icon: 'fas fa-grin-beam-sweat', text: '¿No sabes como hacerlo?',ruta:'/paneladministracion/NoSabesComoHacerlo'  },
      { icon: 'fa-image', text: 'Lista Portada', ruta:'/paneladministracion/listaspresentacion' },
      { icon: 'help', text: 'Help' },
      { icon: 'fa-city', text: 'Regiones y Ciudades',ruta:'/paneladministracion/regionpanel' },
      { icon: 'fa-comment-medical', text: 'Fraces',ruta:'/paneladministracion/fracespanel' },
    ],

        }
    },
    computed: {
        ...mapState({ usuario: state => state.usuario }),
    },
    methods:{
      ...mapActions(["cerrarSesion"]),
    salir() {
      this.cerrarSesion();
      this.menu = false;
      this.$router.push({ name: "principal" });
    },
    }
}
</script>