<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app temporary fill-height>
      <v-list dense>
        <v-list-item :to="name ='/home/bienvenido'">
          <v-list-item-action>
            <v-icon>fa-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Inicio</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item class="hidden-md-and-up" v-if="usuario.cargo == 'admin'" :to="name='/paneladministracion'">
          <v-list-item-action>
            <v-icon>fa-user-cog</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Administración</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item :to="name ='/home/perfilUser'">
          <v-list-item-action>
            <v-icon>account_box</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Perfil</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item :to="name ='/home/formulario'">
          <v-list-item-action>
            <v-icon>fa-clipboard-list</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Crear evento</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-group prepend-icon="event">
          <template v-slot:activator>
            <v-list-content>
              <v-list-item-title>Eventos creados</v-list-item-title>
            </v-list-content>
          </template>
          <v-divider></v-divider>
          <v-list-item
            class="ml-3"
            v-for="n in ArrayEventos "
            :key="n.id"
            :to="{ name: 'evento', params: { id: n.id } }"
          >
            <v-list-item-action>
              <v-icon>{{n.icon}}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{n.evento}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
        <v-divider></v-divider>
        <v-list-item :to="name ='/home/listas'">
          <v-list-item-action>
            <v-icon>fa-list-alt</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Ver eventos</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <template v-slot:append>
        <div class="pa-2">
          <v-btn @click="salir()" color="primary" block>
            <v-icon left>fa-power-off</v-icon>Cerrar Sesion
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <v-app-bar app :color="colorPag" dark>
      <v-app-bar-nav-icon class="bs" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-layout>
        <v-toolbar-title class="font-weight-medium bs">Lista regalo</v-toolbar-title>
      </v-layout>

      <v-spacer></v-spacer>

      <v-layout justify-end >
       
        <v-btn text icon>
          <v-icon  class="bs">fa-bell</v-icon>
        </v-btn>

        <v-btn text icon medium :to="name ='/home/perfilUser'" class="mr-2 elevation-7"  > 
           <v-avatar >
          <img  :src="usuario.fotoPerfil" max-width="100" max-height="auto" />
        </v-avatar>
        </v-btn>

        <span  class="mt-3 bs">{{ usuario.nombres}} </span>
      </v-layout>
    </v-app-bar>

    <main class="page-content">
      <router-view />
    </main>
    <v-footer class="mt-5" :color="colorPag" dense app>
            <span class="white--text bs ">&copy; 2019</span>
  <v-layout align-end justify-end >
      <v-spacer></v-spacer>
           <v-btn class="hidden-md-and-down" text icon v-if="usuario.cargo == 'admin'" :to="name='/paneladministracion'">
          <v-icon class="bs" color="#777777">fa-user-cog</v-icon>
        </v-btn>
  </v-layout>
    </v-footer>
  </v-app>
</template>

<script scoped>
import { mapActions, mapState } from "vuex";
import { firebase, db } from "@/firebase";

export default {
  name:"Homes",
  data: () => ({
    colorPag:"",
    drawer: false,
    datosUsuario: {
      nombreUsuario: "",
      fotoPerfil: "",
      id: ""
    },
    datos: [],
    ArrayEventos: []
  }),
  created() {
    
    this.traerUsuario();
    this.TraerEventos();
     this.datitos();
     this.bn();
  },
    watch:{


      'evento':function(newVal, oldVal) {
         
            this.datitos();
            
            
            
 
  },

  
      'vista32':function(newVal, oldVal) {
         
            this.bn();
            
            
            
 
  },

    },

  methods: {

bn(){
if(this.vista32 == '1'){
   this.$store.state.evento = null
}else{

}

    
},


    datitos(){
            if(this.evento ==null){
            this.Principal();
            }else{
    
        this.colorPag = this.evento.color;

          }
          },
    ...mapActions(["cerrarSesion"]),
    salir() {
      this.cerrarSesion();
      this.menu = false;
      this.$router.push({ name: "principal" });
    },

    async traerUsuario() {
      var user = firebase.auth().currentUser;

      if (user != null) {
        this.datosUsuario.id = user.uid;
      }
    },
    async Principal() {
      this.datos = [];

      try {
        let resultado = await db.collection("PagPrincipal").get();

        resultado.docs.forEach(doc => {
          this.colorPag = doc.data().colors
          this.datos.push(doc.data());
        });
      } catch (error) {}
    },

    async TraerEventos() {
      try {
        let docs = await db
          .collection("Eventos")
          .where("usuario", "==", this.usuario.uid)
          .get();
        docs.forEach(doc => {
          this.ArrayEventos.push(doc.data());
        });
      } catch (error) {
        alert(error);
      }
    }
  },
  computed: {
    ...mapState(["usuario","evento","vista32"])
  }
};
</script>

<style>
.fondo {
  margin: 0px !important;
  padding: 0px !important;
  background-repeat: no-repeat, repeat;
  background-size: cover;
  max-height: 100vh;
}

.bs {
  text-shadow: 2px 2px 4px #000000;
}

.carmesi {
  color: #e51a4c;
}
.oscuro {
  width: 100%;
  background-image: url("../assets/background.jpg");
  background-size: cover;
}

.card-anim:hover {
  transform: scale(1.15);
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.6);
}
.card-anim {
  transition: 0.5s ease;
  margin: 30px;
}
</style>