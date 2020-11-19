<template>
  <v-container>
      <v-snackbar dark v-model="notificar.visible" :color="notificar.color" top  :timeout="10000">
          {{notificar.mensaje}}
          <v-btn text @click="notificar.visible = false">Cerrar</v-btn>
        </v-snackbar>
    <v-card>
      <v-card-text>
        <h2>Mantenedor Preguntas Frecuentes</h2>
      </v-card-text>
    </v-card>
 
         
    <v-data-table :headers="headers" :items="desserts" sort-by="nombre" class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Lista Preguntas Frecuentes</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>

          <v-btn @click="dialog=true" dark class="mt-5 mb-5" x-small="" fab color="orange">
            <v-icon>fa-plus</v-icon>
          </v-btn>
          <div class="flex-grow-1"></div>
        </v-toolbar>
      </template>
      <template v-slot:item.action="{ item }">
        <v-icon class="mr-2" @click="editarPregunta(item)">fa-pen</v-icon>
        <v-icon @click="deleteItem(item)">fa-trash</v-icon>
      </template>
    </v-data-table>

<!--  ----------------------- DIALOG AGREGAR PREGUNTA ------------------ -->
     
    <v-dialog persistent v-model="dialog" max-width="600">
      <v-layout justify-center>
        <v-card width="600">
          <v-toolbar color="primary" dark>
            <v-toolbar-title>
              <h3 class="merienda"> Agregar Pregunta </h3>
            </v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-layout row wrap justify-center>
              <v-flex xs11>
                <v-text-field v-model="f1.preguntas" outlined label="Pregunta"></v-text-field>
              </v-flex>
              <v-flex xs11>
                <v-textarea v-model="f1.respuestas" outlined label="Respuestas"></v-textarea>
              </v-flex>
            </v-layout>
          </v-card-text>

          <v-card-text>
            <v-layout justify-end>
              <v-btn color="red" @click="cerrar()" dark class="ma-2">Cancelar</v-btn>
              <v-btn color="success" @click="subirPregunta()" dark class="ma-2" >Subir Pregunta</v-btn>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-layout>
    </v-dialog>

    <!--  ----------------------- DIALOG EDITAR PREGUNTA ------------------ -->
    <v-dialog persistent v-model="dialog2" max-width="600">
      <v-layout justify-center>
        <v-card width="600">
          <v-toolbar color="primary" dark>
            <v-toolbar-title>
              <h3 class="merienda"> Editar Pregunta </h3>
            </v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-layout row wrap justify-center>
              <v-flex xs11>
                <v-text-field v-model="f1Edit.preguntas" outlined label="Pregunta"></v-text-field>
              </v-flex>
              <v-flex xs11>
                <v-textarea v-model="f1Edit.respuestas" outlined label="Respuestas"></v-textarea>
              </v-flex>
            </v-layout>
          </v-card-text>

          <v-card-text>
            <v-layout justify-end>
              <v-btn color="red" @click="cerrar2()" dark class="ma-2">Cancelar</v-btn>
              <v-btn color="success" @click="subirEditarPregunta()" dark class="ma-2" >Editar Pregunta</v-btn>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-layout>
    </v-dialog>
  </v-container>
</template>

<script>

import { firebase, db, storage } from "@/firebase";
import { mapActions, mapState, mapMutations } from "vuex";
let catRef = db.collection("PagPrincipal").doc("f7Yu5r4qrnida8WytKkr").collection("PregFrecuentes");
let ref = storage.ref();
import uuidv4 from "uuid/v4";
export default {
  data: () => ({
    files: [],
    dialog: false,
    dialog2: false,
    headers: [
      {
    text: "Pregunta",
        align: "left",
        sortable: false,
        value: "Pregunta"
      },
      { text: "Respuesta", value: "Respuesta" },
      { text: "Opciones", value: "action", sortable: false }
    ],
    f1: {
      TituloF:"Agregar Pregunta",
      preguntas: "",
      respuestas: "",

    },
    defaultItem: {
      preguntas: "",
      respuestas: "",
    },
    f1Edit: {
      idPreg:"",
      preguntas: "",
      respuestas: ""
    },
    editedIndex: -1,
    desserts: [],
    eventox: null
  }),

  created() {
    this.mostrarDatos();
  },

  computed: {
      ...mapState(["evento", "ocupado", "notificar"]),
      
    formTitle() {
      return this.editedIndex === -1 ? "Agregar Pregunta" : "Editar Pregunta";
    }
  },



  methods: {
      ...mapState(["evento", "ocupado", "notificar"]),
    
    cerrar(){
        this.f1.preguntas ="",
        this.f1.respuestas ="",
        this.dialog = false
    },
    cerrar2(){
        this.f1Edit.preguntas ="",
        this.f1Edit.respuestas ="",
        this.dialog2 = false
    },
    //  ------------------------ AGREGAR PREGUNTA ---------------------
    async subirPregunta() {
        let idPregunta = uuidv4();
        try {
            let preg = {
              idPregunta,
              Pregunta: this.f1.preguntas,
              Respuesta: this.f1.respuestas
            };
            await db
            .collection("PagPrincipal")
            .doc("f7Yu5r4qrnida8WytKkr")
            .collection("PregFrecuentes")
            .doc(idPregunta)
            .set(preg);

         let notificacion = {
          visible: true,
          mensaje: "Se agregó la pregunta con éxito.",
          color: "success"
        };

        this.$store.commit("notificacionExito", notificacion);
        this.cerrar()
       
        this.mostrarDatos()
       
      } catch (error) {
        let notificacion = {
          visible: true,
          mensaje: "Error al agregar la pregunta.",
          color: "error"
        };
        this.$store.commit("notificacionError", notificacion);
      } 
    },

// ------------------------------- EDITAR PREGUNTAS --------------------------

     editarPregunta(item, f1Edit) {
       this.dialog2 = item;
      this.dialog2 = true;
      this.f1Edit.preguntas = item.Pregunta;
      this.f1Edit.respuestas = item.Respuesta;
      this.f1Edit.idPreg = item.idPregunta;
     },

    async subirEditarPregunta(){
        try {
        let pregun = {
          idPregunta: this.f1Edit.idPreg,
          Pregunta: this.f1Edit.preguntas,
          Respuesta: this.f1Edit.respuestas,
    
        };

        db.collection("PagPrincipal")
          .doc("f7Yu5r4qrnida8WytKkr")
          .collection("PregFrecuentes")
          .doc(this.f1Edit.idPreg)
          .set(pregun);

        

        let notificacion = {
          visible: true,
          mensaje: "Se editó la Pregunta con éxito.",
          color: "success"
        };
        this.cerrar2()
        this.$store.commit("notificacionExito", notificacion);
       
        this.mostrarDatos();
      } catch (error) {
        let notificacion = {
          visible: true,
          mensaje: "Error al editar la pregunta.",
          color: "error"
        };
        this.$store.commit("notificacionError", notificacion);
      }
    },
//    ---------------------------- ELIMINAR PREGUNTA-----------------
    async deleteItem(item){
        
        try {
            
            db.collection("PagPrincipal")
            .doc("f7Yu5r4qrnida8WytKkr")
            .collection("PregFrecuentes")
            .doc(item.idPregunta)
            .delete();

            let notificacion = {
            visible: true,
            mensaje: "Se eliminó la pregunta con éxito.",
            color: "success"
            };

            this.$store.commit("notificacionExito", notificacion);
            
             this.mostrarDatos()
      } catch (error) {
        let notificacion = {
          visible: true,
          mensaje: "Error al eliminar la pregunta.",
          color: "error"
        };
        this.$store.commit("notificacionError", notificacion);
      } 
    },

    // ------------------------------ MOSTRAR TODAS LAS PREGUNTAS ---------------------
    async mostrarDatos() {
       this.desserts= [],
       catRef.get().then(snapshot => {
        snapshot.forEach(doc => {
          this.desserts.push(doc.data());
        });
      });
    }
  }
};
</script>

<style >
    
.merienda {
  color: white;
  font-family: "Merienda", cursive;
}
</style>