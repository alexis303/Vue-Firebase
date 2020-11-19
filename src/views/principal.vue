   <template>
  <v-card flat>
    <v-card flat v-for="a in datos" :key="a.id">
     

     <v-img class="elevation-4"  height="300" :src="a.fotoPortada">
        <v-layout text-center align-center justify-center wrap fill-height>
          <v-flex xs12>
            <h1 color="primary" class="mb-2 tituloPer font-weight-medium text--white bs">{{a.Titulo}}</h1>
            <h1 class="subtitulo-perfil font-weight-medium  bs  mr-5 ml-5">{{a.descripcion}}.</h1>
          </v-flex>
        </v-layout>
      </v-img>
    

      <v-container class="mb-10 mt-6 ">
        <v-layout id="comenzar" text-center class="pt-5" wrap>
          <v-flex xs12>
            <h1 class="display-1 font-weight-thin ">Comenzemos...</h1>
            <v-layout align-center justify-center>
              <div class="hr-title"></div>
            </v-layout>
          </v-flex>
          <v-flex xs12>
            <p class="pt-2">Escoge la celebración que deseas festejar.</p>
          </v-flex>
        </v-layout>
        
        <v-item-group :color="a.colors"> 
          <v-layout row wrap justify-center>
            <v-flex xs4 md2 v-for="n in eventos" :key="n.id" class="ma-2 celebration-img elevation-8">
              <v-item class v-slot:default="{ active, toggle } ">
                <v-card class="d-flex align-center"  dark height="300" @click="listasx(n)">
                  <v-flex xs12>
                    <v-img :src="n.imagen" height="300"  >
                      <v-layout row wrap align-center justify-center fill-height>
                        <v-flex xs12>
                          <h3 class="text-center font-weight-medium bs" >{{n.nombre}}</h3>
                        </v-flex>
                      </v-layout>
                    </v-img>
                  </v-flex>
                </v-card>
              </v-item>
            </v-flex>

          </v-layout>
        </v-item-group>

        <v-expand-transition>
          <v-sheet v-if="evento != null" color="grey lighten-4" height="200" tile>
            <v-layout fill-height align-center justify-center column>
              <v-flex xs12 class="mt-5">
                <h3 class="title font-weight-medium  bs text-center">Seleccionaste {{ evento }}</h3>
                <h4 class="font-weight-medium  bs tetx-center">{{descripcion}}</h4>
              </v-flex>
              <v-btn color="primary" @click="Formulario" class="ma-2">crear lista</v-btn>
              <v-btn color="success" @click="listas()" class="mb-5 pl-5 pr-6">ver listas</v-btn>
            </v-layout>
          </v-sheet>
        </v-expand-transition>
      </v-container>

      <v-card flat :color="a.colors" class="elevation-4" dark>
        <v-container fluid id="pasos" class="white--text">
          <v-layout text-center>
            <v-flex xs12>
              <h2 class="mt-10 display-1 font-weight-thin bs">¿No sabes cómo hacerlo?</h2>
              <v-layout align-center justify-center>
                <div class="hr-title"></div>
              </v-layout>
              <p class="pt-2 bs">Conoce los pasos para utilizar nuestro servicio.</p>
            </v-flex>
          </v-layout>

          <v-layout align-center justify-center wrap class="mb-10">
            <v-flex xs12>
              <v-layout v-if="vista == 1" row>
                <v-flex v-for="i in pasosfestejado" :key="i.id" md3>
                  <v-layout align-center justify-center text-center column>
                    <v-avatar size="20vh" class="ma-2 elevation-3">
                      <img :src="i.fotoDescripcion" alt="John" />
                    </v-avatar>
                    <p class="bs">{{i.descripcion}}</p>
                  </v-layout>
                </v-flex>
              </v-layout>

              <v-layout v-if="vista == 2" row>
                <v-flex v-for="item in pasosinvitado" :key="item" md3>
                  <v-layout align-center justify-center text-center column>
                    <v-avatar size="20vh" class="ma-4">
                      <img :src="item.fotoDescripcion" alt="John" />
                    </v-avatar>
                    <p>{{item.descripcion}}</p>
                  </v-layout>
                </v-flex>
              </v-layout>
              <v-layout text-center align-center justify-center>
                <v-flex xs12 sm6>
                  <v-layout justify-end>
                    <v-btn
                      elevation="2"
                      class="mt-4 mr-4 bs"
                      width="20vh"
                      color="primary"
                      @click="actualizarPasos(-1)"
                    >Festejado
                    </v-btn>
                  </v-layout>
                </v-flex>

                <v-flex xs12 sm6>
                  <v-layout justify-start>
                    <v-btn
                      elevation="2"
                      class="mt-4 ml-4 bs"
                      width="20vh"
                      color="primary"
                      @click="actualizarPasos(1)"
                    >Invitado</v-btn>
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>

      <v-container v-show="desserts != 0">
        <v-layout text-center class="mt-4">
          <v-flex xs12>
            <h2 class="display-1 font-weight-thin">Preguntas Frecuentes</h2>
            <v-layout align-center justify-center>
              <div class="hr-title"></div>
            </v-layout>
            <p
              class="pt-2"
            >Descubre cuales son las preguntas más frecuentes que hacen nuestros clientes</p>
          </v-flex>
        </v-layout>
        <v-layout textpad class="mt-4">
          <v-flex>
            <v-expansion-panels popout focusable color="#0099ff">
              <v-expansion-panel v-for=" item in desserts" :key="item">
                <v-expansion-panel-header>{{item.Pregunta}}</v-expansion-panel-header>
                <v-expansion-panel-content>{{item.Respuesta}}</v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-flex>
        </v-layout>
      </v-container>

      <v-container class="mb-5">
        <v-layout text-center>
          <v-flex xs12>
            <h2 class="mt-10 display-1 font-weight-thin">Calificaciones</h2>
            <v-layout align-center justify-center>
              <div class="hr-title"></div>
            </v-layout>
            <p class="pt-2">Conoce algunas aprecioaciones sobre nuestros servicios</p>
            <v-layout text-left row>
              <v-flex v-for="(item, index) in calificaciones" :key="index" xs12 sm6 md4>
                <v-container>
                  <v-card>
                    <v-img position="top" class="white--text" height="200px" :src="item.img">
                      <v-card-title class="align-end fill-height">{{item.nombre}}</v-card-title>
                    </v-img>

                    <v-card-text>
                      <span>Ejemplo Titulo</span>
                      <br />
                      <span class="text--primary">
                        <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat quos sunt, minima facilis maxime beatae ratione hic quo quaerat.</span>
                      </span>
                    </v-card-text>

                    <v-card-actions>
                      <v-btn text color="orange">Leer Más</v-btn>
                      <v-btn text color="orange">Ver Perfil</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-container>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-container>

      <v-layout text-center class="mt-4">
        <v-flex xs12>
          <v-card flat>
            <h2 class="display-1 font-weight-thin ">{{a.titulomensaje}}</h2>
            <v-layout align-center justify-center>
              <div class="hr-title"></div>
            </v-layout>
            <p class="pt-2">{{a.mensaje}}</p>

            <v-layout wrap align-center justify-center >
              <v-flex xs12 >
                <v-card flat :color="a.colors" dark >
                  <v-layout wrap >
                    <v-flex xs12 md6>
                      <v-parallax height="300"  :src="a.fotoConocenos"></v-parallax>
                    </v-flex>
                    <v-flex xs12 md6>
                      <v-card-text class="bs">{{a.conocenos}}</v-card-text>
                    </v-flex>
                  </v-layout>
                </v-card>
              </v-flex>
            </v-layout>
          </v-card>
        </v-flex>
      </v-layout>
      <v-card height="50" ></v-card>

    </v-card>
  </v-card>
</template>

  <script>
import Home from "@/views/PaginaPrincipal.vue";
import { firebase, db } from "@/firebase";
import { mapActions, mapState } from "vuex";
let catRef = db
  .collection("PagPrincipal")
  .doc("f7Yu5r4qrnida8WytKkr")
  .collection("PregFrecuentes");
let EvenetosRef = db.collection("categoriaEventos");
export default {
  name: "PrincipalHOME",
  data() {
    return {
      icons: [
        "fab fa-facebook",
        "fab fa-twitter",
        "fab fa-google-plus",
        "fab fa-instagram"
      ],
      popout: false,
      focusable: false,
      datos: [],
      desserts: [],
      vista: 1,
      evento: null,
      menu: [
        { icon: "fa-user", title: "Iniciar Sesion", ruta: "login" },
        { icon: "fa-address-card", title: "Registrate", ruta: "register" },
        {
          icon: "fa-grin-beam-sweat",
          title: "¿Cómo lo hago?",
          parte: "#pasos"
        },
        { icon: "fa-sign-in-alt", title: "Comenzar YA", parte: "#comenzar" }
      ],
      eventos: [],

      pasosfestejado: [],
      pasosinvitado: [],

      calificaciones: [
        {
          img:
            "https://cdn.rapzilla.com/wp-content/uploads/2017/01/gawvi-in-the-water.JPG",
          nombre: "Gabriel Azucena"
        },
        {
          img:
            "https://cdn.rapzilla.com/wp-content/uploads/2017/01/gawvi-in-the-water.JPG",
          nombre: "Gabriel Azucena"
        },
        {
          img:
            "https://cdn.rapzilla.com/wp-content/uploads/2017/01/gawvi-in-the-water.JPG",
          nombre: "Gabriel Azucena"
        }
      ],

      lorem: `Lorem ipsum dolor sit amet, mel at clita quando. Te sit oratio vituperatoribus, nam ad ipsum posidonium mediocritatem, explicari dissentiunt cu mea. Repudiare disputationi vim in, mollis iriure nec cu, alienum argumentum ius ad. Pri eu justo aeque torquatos.`
    };
  },
  created() {
    this.mostrarDatosPregunta();
    this.Principal();
    this.mostrarDatos();
    this.PrincipalPasosFestejados();
    this.PrincipalPasosInvitados();
  },
  watch: {
    $methods() {
      this.Principal();
      this.mostrarDatos();
      this.mostrarDatosPregunta();
      this.PrincipalPasosFestejados();
    },
        'evento': function (newVal, oldVal) {
 
    this.Principal();
    },
  },

  methods: {
      listasx(m) {
      this.$store.state.evento = m;
      this.$router.push({ path: "/home/listas"});
    },
    async Principal() {
        this.$store.state.vista32 = 1;
      this.datos = [];

      try {
        let resultado = await db.collection("PagPrincipal").get();

        resultado.docs.forEach(doc => {
          this.datos.push(doc.data());
        });
      } catch (error) {}
    },
    async PrincipalPasosFestejados() {
      try {
        let resultado = await db
          .collection("PagPrincipal")
          .doc("f7Yu5r4qrnida8WytKkr")
          .collection("pasosaSeguir")
          .orderBy("id", "asc")
          .get();

        resultado.docs.forEach(doc => {
          this.pasosfestejado.push(doc.data());
        });
      } catch (error) {}
    },
    async PrincipalPasosInvitados() {
      try {
        let resultado = await db
          .collection("PagPrincipal")
          .doc("f7Yu5r4qrnida8WytKkr")
          .collection("pasosaSeguirInvitado")
          .orderBy("id", "asc")
          .get();

        resultado.docs.forEach(doc => {
          this.pasosinvitado.push(doc.data());
        });
      } catch (error) {}
    },

    async mostrarDatosPregunta() {
      (this.desserts = []),
        catRef.get().then(snapshot => {
          snapshot.forEach(doc => {
            this.desserts.push(doc.data());
          });
        });
    },

    actualizarPasos(pasos) {
      this.vista += pasos;

      if (this.vista > 2) {
        this.vista = 2;
      } else if (this.vista < 1) {
        this.vista = 1;
      }
    },
    mostrarDatos() {
      EvenetosRef.get().then(snapshot => {
        snapshot.forEach(doc => {
          this.eventos.push(doc.data());
        });
      });
    },
    Formulario() {
      this.$store.state.evento = this.evento;
      this.$router.push({ name: "formulario" });
    },
    listas() {
      this.$store.state.evento = this.evento;
      this.$router.push({ name: "listas" });
    }
  }
};
</script>
  <style>
.hr-title {
  height: 1px;
  width: 10%;
  background-color: aqua;
}
.celebration-caption {
  color: white;
  vertical-align: end;
}
.link-terminos {
  text-decoration: none !important;
  color: white !important;
}
.celebration-img {
  filter: brightness(70%);
}
.celebration-img:hover {
  transition: 0.5s ease;
  transform: scale(1.05);
  filter: brightness(100%);
}
.bs {
  text-shadow: 2px 2px 4px #000000;
}
.merienda {
  color: white;
  font-family: "Merienda", cursive;
}
.meriendaB {
  color: #a93673;
  font-family: "Merienda", cursive;
}
.nada1{
  border-radius: 0px !important;
}
.tituloPer {
  color: white;
  font-size: 3vw;
}
.subtitulo-perfil {
  color: white;
  font-size: 1.3vw;
}
</style>