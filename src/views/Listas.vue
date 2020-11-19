<template>
  <v-app>
    <v-img
      class="elevation-4"
      v-show="ver == 2"
      aspect-ratio="4.2"
      align-center
      justify-center
      dark
      :src="PortadaE.imagen"
    >
      <v-layout align-center justify-center fill-height>
        <v-flex>
          <h1
            v-show="ver == 2"
            class="text-center mb-2 tituloPer font-weight-medium text--white bs"
          >{{PortadaE.nombre}}</h1>
          <v-flex v-show="ver == 2">
            <h4
              class="text-center subtitulo-perfil font-weight-medium bs mr-5 ml-5"
            >{{PortadaE.descripcion}}</h4>
          </v-flex>
        </v-flex>
      </v-layout>
    </v-img>

    <v-img
      class="elevation-4"
      v-show="ver == 1"
      v-for="P in PortadaL"
      :key="P.id"
      aspect-ratio="4.2"
     
      align-center
      justify-center
      dark
      :src="P.imagen"
    >
      <v-layout align-center justify-center fill-height>
        <v-flex>
          <h1
            v-show="ver == 1"
            class="text-center mb-2 tituloPer font-weight-medium text--white bs"
          >{{P.titulo}}</h1>
          <v-flex v-show="ver == 1">
            <h4
              class="text-center subtitulo-perfil font-weight-medium bs mr-5 ml-5"
            >{{P.descripcion}}</h4>
          </v-flex>
        </v-flex>
      </v-layout>
    </v-img>

    <v-container fluid class="mb-8">
      <v-layout wrap>
        <v-flex xs4>
          <v-card class="mx-2 mt-2 elevation-4">
            <v-text-field
              v-model="search"
              clearable
              flat
              solo-inverted
              hide-details
              prepend-inner-icon="search"
              label="Buscar"
            ></v-text-field>
          </v-card>
        </v-flex>

        <v-flex v-show="header != null" xs4 v-for="header in headers" :key="header">
          <v-card flat>
            <v-data-iterator
              :items-per-page.sync="itemsPerPage"
              :headers="headers"
              :items="filteredDesserts"
              item-key="name"
              hide-default-header
              hide-default-footer
              no-data-text
            >
              <template v-slot:header="{item}">
                <v-card flat v-if="filters.hasOwnProperty(header.value)" class="ma-2 elevation-4">
                  <v-select
                    class
                    flat
                    hide-details
                    solo-inverted
                    :prepend-inner-icon="header.icons"
                    :label="header.text"
                    multiple
                    clearable
                    :items="columnValueList(header.value)"
                    v-model="filters[header.value]"
                  ></v-select>
                </v-card>
              </template>
            </v-data-iterator>
          </v-card>
        </v-flex>
        <v-flex xs6 md3>
          <v-menu
            v-model="menu1"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            full-width
            max-width="290px"
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="menu1dato"
                label="Fecha inicio"
                readonly
                persistent-hint
                prepend-icon="event"
                @blur="date = parseDate(dateFormatted)"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              :max="fecha"
              :items="filtroporfecha"
              v-model="menu1dato"
              no-title
              @input="menu1 = false"
            ></v-date-picker>
          </v-menu>
        </v-flex>

        <v-flex xs6 md3>
          <v-menu
            v-model="menu2"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            full-width
            max-width="290px"
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="fecha"
                label="Fecha final"
                readonly
                persistent-hint
                prepend-icon="event"
                @blur="date = parseDate(dateFormatted)"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              :min="menu1dato"
              :items="filtroporfecha2"
              v-model="fecha"
              no-title
              @input="menu2 = false"
            ></v-date-picker>
          </v-menu>
        </v-flex>

<v-layout justify-center>
          <v-flex xs6 md4 class="mt-3 ml-6">
          <v-btn dark color="primary" @click="resetiar()">
            <v-icon class="mr-2">fa-redo-alt</v-icon>Limpiar filtros
          </v-btn>
        </v-flex>

        <v-flex xs6 md4 class="mt-3">
          <v-btn dark color="primary" @click="resetiar()">
            <v-icon class="mr-2">fa-clipboard</v-icon>Crear evento
          </v-btn>
        </v-flex>
</v-layout>
      </v-layout>

      <v-layout justify-center>
        <h1 class="font-weight-light bs blanco merienda">Eventos</h1>
  </v-layout>
           
          <v-data-iterator
            :headers="headers"
            :items="filteredDesserts"
            :items-per-page.sync="itemsPerPage"
            :page="pagination.page"
            hide-default-footer
            :search="search"
          >
        <template v-slot:default="props">

           <v-layout align-center justify-center wrap class="mb-10">
                        <v-flex xs12>

                <v-layout row ma-1>
                  <v-flex  v-for="E in props.items" :key="E.id">
                     <v-layout align-center justify-center text-center column>
                    <v-card max-width="358" class="ma-2">
                      <div class="containert">
                        <v-img class="white--text child align-end" height="200px" :src="E.portada">
                          <v-layout align-center>
                 
                            <v-layout wrap  class="r mb-3" justify-center>
                              <v-flex xs12>
                                <h2 class="text-center bs">{{E.festejado1}} </h2>
                              </v-flex>
                              <v-flex xs12 v-if="E.festejado2 != null">
                                <h3 class="text-center bs">&</h3>
                              </v-flex>
                              <v-flex xs12>
                                <h2 class="text-center bs">{{E.festejado2}}</h2>
                              </v-flex>
                             <v-flex xs12>
                                 <v-layout align-center>
                                  <v-layout justify-center>
                                    <v-icon  medium :color="E.colorCat">{{E.icon}}</v-icon>
                                  </v-layout>
                                </v-layout>
                             </v-flex> 
                            </v-layout>
                           
                          </v-layout>
                        </v-img>
                      </div>
                      <v-layout row wrap class="ma-2">
                        <v-layout row wrap mx-2>
                          <v-card-subtitle class="pb-0 align-end">{{E.evento}}</v-card-subtitle>
                        </v-layout>
                        <v-layout justify-end>
                          <v-card-subtitle
                            class="pb-0 align-end"
                            style="font-family: Georgia, serif"
                          >{{E.fecha}}</v-card-subtitle>
                        </v-layout>
                      </v-layout>

                      <v-card-text class="text--primary">
                        <div>{{E.descripcion| truncate}}</div>
                      </v-card-text>

                      <v-card-actions>
                        <v-btn color="orange" text @click="Share(E)" dark>
                          <v-icon small class="mr-1">fa-share</v-icon>Compartir
                        </v-btn>

                        <v-btn
                          v-show="E.private == false"
                          :color="E.colorCat"
                          text
                          dark
                          :to="{ name: 'evento', params: { id: E.id } }"
                        >
                          <v-icon small class="mr-1">fa-eye</v-icon>ver Evento
                        </v-btn>
                        <v-btn
                          v-show="E.private == true"
                          :color="E.colorCat"
                          text
                          @click="abrir(E.id)"
                        >ver Evento</v-btn>
                      </v-card-actions>
                    </v-card>
                     </v-layout>
                  </v-flex>
                </v-layout>
                </v-flex>
        </v-layout>
            </template>
            
          </v-data-iterator>
    </v-container>
    <div class="text-xs-center pt-2 md4 lg4">
      <v-pagination
        class="mb-10"
        v-model="pagination.page"
        :length="pages"
        :total-visible="6"
        circle
      ></v-pagination>
    </div>
    <v-dialog v-model="compartirQR" max-width="700px" transition="dialog-transition">
      <v-card>
        <v-toolbar :color="QRE.colorCat" dark>
          <v-toolbar-title>Hora de Compartir</v-toolbar-title>
        </v-toolbar>

        <v-container>
          <v-row>
            <v-col cols="12" md="6">
              <Qrcode size="316" :cls="qrCls" :value="url+QRE.id"></Qrcode>
            </v-col>

            <v-col cols="12" md="6">
              <v-card mx-4>
                <v-img class="white--text child align-end" height="200px" :src="QRE.portada">
                  <v-layout align-center>
                    <v-layout wrap>
                      <v-card-title class="r">{{QRE.festejado1}}</v-card-title>
                      <v-card height="10"></v-card>
                    </v-layout>
                    <v-layout align-center>
                      <v-layout justify-center>
                        <v-icon class="p" medium :color="QRE.colorCat">{{QRE.icon}}</v-icon>
                      </v-layout>
                    </v-layout>
                  </v-layout>
                </v-img>

                <v-layout row wrap class="ma-2">
                  <v-layout row wrap mx-2>
                    <v-card-subtitle class="pb-0 align-end">{{QRE.evento}}</v-card-subtitle>
                  </v-layout>
                  <v-layout justify-end>
                    <v-card-subtitle
                      class="pb-0 align-end"
                      style="font-family: Georgia, serif"
                    >{{QRE.fecha}}</v-card-subtitle>
                  </v-layout>
                </v-layout>
              </v-card>
            </v-col>

            <v-col cols="12" md="12">
              <facebook class="ma-1" :url="url+QRE.id" scale="3"></facebook>
              <twitter class="ma-1" :url="url+QRE.id" title="Ven y ve mi evento" scale="3"></twitter>
              <linkedin class="ma-1" :url="url+QRE.id" scale="3"></linkedin>
              <telegram class="ma-1" :url="url+QRE.id" scale="3"></telegram>
              <whats-app class="ma-1" :url="url+QRE.id" title="Hello" scale="3"></whats-app>
              <pinterest class="ma-1" :url="url+QRE.id" scale="3"></pinterest>
              <reddit class="ma-1" :url="url+QRE.id" scale="3" title="My Github"></reddit>
              <google class="ma-1" :url="url+QRE.id" scale="3"></google>
              <email class="ma-1" :url="url+QRE.id" subject="Hello" scale="3"></email>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="privado"
      persistent
      :overlay="false"
      max-width="500px"
      transition="dialog-transition"
    >
      <v-card>
        <v-toolbar color="primary" dark>
          <v-toolbar-title>Ingrese la contraseña</v-toolbar-title>
        </v-toolbar>
        <v-card-text class="mt-6">
          <v-text-field append-icon="fa-key" outlined label="contraseña" v-model="password"></v-text-field>
        </v-card-text>
        <v-card-text>
          <v-layout wrap justify-center>
            <v-btn fab small color="error" class="mr-3" @click="privado = false">
              <v-icon>fa-times</v-icon>
            </v-btn>
            <v-btn fab small color="success" class="ml-3" @click="ingresar()">
              <v-icon>fa-check</v-icon>
            </v-btn>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-app>
</template>
<script>
import {
  Facebook,
  Twitter,
  Linkedin,
  Pinterest,
  Reddit,
  Telegram,
  WhatsApp,
  Email,
  Google
} from "vue-socialmedia-share";
import Qrcode from "v-qrcode/src/index";
import { auth, db, storage } from "@/firebase";
import { mapActions, mapState } from "vuex";
import { filter } from "minimatch";
export default {
  name: "Listas",
  data() {
    return {
      compartitrF: "http://www.facebook.com/sharer.php?u=",
      url: "https://listaregalo-69a48.firebaseapp.com/home/evento/",
      QRE: {},
      ver: 1,
      compartirQR: false,
      PortadaL: [],
      PortadaE: [],
      pestaña: "",
      rangoprimario: "2018-01-01",
      rangosecundario: "3091-01-01",
      menu1dato: "",
      fecha: null,
      filters: {
        ciudad: [],
        TipoEvento: []
      },
      headers: [
        { icons: "fa-city", text: " CIUDAD", value: "ciudad" },
        { icons: "search", text: " CATEGORIAS", value: "TipoEvento" },
        { text: "apellidoFest", value: "apellidoFest" },
        { text: "nombre", value: "nombre" },
        { text: "hora", value: "hora" }
      ],
      search: "",
      pagination: { totalItems: 1, rowsPerPage: 10, page: 1 },
      EventosDatos: [],
      privado: false,
      password: null,
      password2: "",
      id: null
    };
  },
  components: {
    Qrcode,
    Facebook,
    Twitter,
    Linkedin,
    Pinterest,
    Reddit,
    Telegram,
    WhatsApp,
    Email,
    Google
  },

  watch: {
    evento: function(newVal, oldVal) {
      this.datitos();
    },

    rangoprimario: function(newVal, oldVal) {
      if(this.rangoprimario =='2018-01-02'){
 this.consultarEvento();
}else{
      this.consultarEvento();
}
    },
    //una vez que detecta un cambio en la variable prosede a ejecutar una acion
    rangosecundario: function(newVal, oldVal) {
      if(this.rangosecundario =='3091-01-02'){

}else{
      this.consultarEvento();
}
    }
  },
  created() {
    this.consultarEvento();
    this.datitos();
  },

  computed: {
    ...mapState(["evento", "vista"]),
    //se encarga de contar la cantidad de elemento exsistentes en el filteredDesserts posteriormente son utilizadas en la paginacion
    numberOfPages() {
      return (this.pagination.totalItems = Math.ceil(
        this.filteredDesserts.length
      ));
    },
    //filtros por fechas los cuales funcionan al momento que se le carga un dato desde el datepiker y despues son visualizadas por el watch
    filtroporfecha() {


 return (this.rangoprimario = this.menu1dato);

     
    },
    //filtros por fechas los cuales funcionan al momento que se le carga un dato desde el datepiker y despues son visualizadas por el watch
    filtroporfecha2() {

     return (this.rangosecundario = this.fecha);

   
    },

    // computed contine todo el objeto de EventosDatosen donde mediante filter realiza los filtros de datos este filteredDesserts es utilizado despues en una tabala
    filteredDesserts() {
      return this.EventosDatos.filter(d => {
        return Object.keys(this.filters).every(f => {
          return this.filters[f].length < 1 || this.filters[f].includes(d[f]);
        });
      });
    },

    // se encarga de dar el diseño de la paginacion de las listas
    pages() {
      if (
        this.pagination.rowsPerPage == null ||
        this.pagination.totalItems == null
      )
        return 0;

      return Math.ceil(
        this.pagination.totalItems / this.pagination.rowsPerPage
      );
    }
  },

  methods: {
    Share(E) {
      this.compartirQR = true;
      this.QRE = Object.assign({}, E);
    },

    resetiar() {
      this.filters.TipoEvento = "";
      this.filters.ciudad = "";
      this.ver = 1;
      this.$store.state.evento = null;
      this.menu1dato= "",
      this.fecha = ""
      this.rangoprimario= "2018-01-02",
      this.rangosecundario= "3091-01-02"
    },

    datitos() {
      if (this.evento == null) {
        this.ver = 1;
        this.Portada();
      } else {
        this.$store.state.vista32 = 2;
        this.ver = 2;
        this.PortadaL = [];
        this.filters.TipoEvento = "";
        this.filters.TipoEvento = this.evento.nombre;
        this.PortadaE = this.evento;
      }
    },

    async Principal() {
      this.datos = [];

      try {
        let resultado = await db.collection("PagPrincipal").get();

        resultado.docs.forEach(doc => {
          this.datos.push(doc.data());
        });
      } catch (error) {}
    },
    async Portada() {
      this.datos = [];

      try {
        let resultado = await db.collection("ListaPortada").get();

        resultado.docs.forEach(doc => {
          this.PortadaL.push(doc.data());
        });
      } catch (error) {}
    },

    //methods se encarga de saber cual es el filtro que ese a escogido para luego almacenarlo filteredDesserts y filtes
    columnValueList(val) {
      return this.EventosDatos.map(d => d[val]);
    },

    // methods encargado de pedor los datos ademas cuenta con los rangos de fechas para poder hacer filtros por estos
    async consultarEvento() {
      this.EventosDatos = [];

      try {
        let resultado = await db
          .collection("Eventos")
          ///esto seria para filtrar .where("fechaTermino", ">=", this.fecha)
          .where("fecha", ">=", this.rangoprimario)
          .where("fecha", "<=", this.rangosecundario)
          .orderBy("fecha", "desc")
          .get();

        resultado.docs.forEach(doc => {
          this.EventosDatos.push(doc.data());
        });
      } catch (error) {
        this.mostrarError("Ocurrió un error recuperando tu galería de fotos.");
      } finally {
      }
    },

    abrir(id) {
      this.id = id;
      this.privado = true;
    },
    async ingresar() {
      try {
        this.password2 = [];
        let com = await db
          .collection("Eventos")
          .where("id", "==", this.id)
          .get();

        com.docs.forEach(doc => {
          this.password2.push(doc.data());
        });

        if (this.password2[0].password == this.password) {
          this.$router.push({ name: "evento", params: { id: this.id } });
        }
      } catch (error) {
        alert(error);
      }
    }
  },

  filters: {
    truncate: function(value) {
      if (value.length > 80) {
        value = value.substring(0, 77) + "...";
      }

      return value;
    }
  }
};
</script>

<style>

.bs {
  text-shadow: 2px 2px 4px #000000;
}

.carmesi {
  color: #e51a4c;
}

.card-anim:hover {
  transform: scale(1.1);
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.6);
}
.card-anim {
  transition: 0.5s ease;
  margin: 30px;
}

.containert {
  position: relative;
  width: 358px;

  overflow: hidden;
  position: relative;

  display: inline-block;
}

.r {
  -webkit-transition: all 0.5s;
  -moz-transition: all 0.5s;
  -o-transition: all 0.5s;
  transition: all 0.5s;
}
.containert:hover .r,
.containert:focus .r {
  -ms-transform: scale(0);
  -moz-transform: scale(0);
  -webkit-transform: scale(0);
  -o-transform: scale(0);
  transform: scale(0.6);
  padding: 18px;
  height: -5px;
  width: 100vh;
  border-radius: 15px;
  background: rgba(0, 0, 0, 0.5);
}
.p {
  -webkit-transition: all 0.5s;
  -moz-transition: all 0.5s;
  -o-transition: all 0.5s;
  transition: all 0.5s;
}
.containert:hover .p,
.containert:focus .p {
  -ms-transform: scale(0);
  -moz-transform: scale(0);
  -webkit-transform: scale(0);
  -o-transform: scale(0);
  transform: scale(0.8);
  padding: 20px;
  margin-top: -10px;
  margin-left: -93px;
}

.child {
  -webkit-transition: all 0.5s;
  -moz-transition: all 0.5s;
  -o-transition: all 0.5s;
  transition: all 0.5s;
}
.containert:hover .child,
.containert:focus .child {
  -ms-transform: scale(1.2);
  -moz-transform: scale(1.2);
  -webkit-transform: scale(1.2);
  -o-transform: scale(1.2);
  transform: scale(1.2);
}
.containert:hover .child:before,
.container:focus .child:before {
  display: block;
}
.containert:hover span,
.containert:focus span {
  display: block;
}
.child:before {
  content: "";
  display: none;
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
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