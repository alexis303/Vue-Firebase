<template>
<v-layout row wrap>
    <v-flex >
              <v-card-title>
                Fraces En el sistema
                <div class="flex-grow-1"></div>
                <v-text-field
                  v-model="search"
                  append-icon="mdi-table-search"
                  label="Buscar"
                  single-line
                  hide-details
                ></v-text-field>
              </v-card-title>

        <v-data-table :headers="headers" :items="datosEvento" :search="search">
                 <template v-slot:item.imagen="{ item }">
        <v-img
          :src="item.imagen"
          height="80"
          width="80"
          contain
          aspect-ratio="1"
          class="grey lighten-2"
        >
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
            </v-row>
          </template>
        </v-img>
      </template>
            <template v-slot:item.color="{ item }">
        <v-card :color="item.color" width="30" height="30"></v-card>
      </template>
                <template v-slot:item.action="{item}">
                  <v-icon  class="mr-2" title="Editar Ciudad" @click="agregarFrase(item)">fa-plus-square</v-icon>
                </template>
              </v-data-table>
              
    </v-flex>
    <v-dialog
        v-model="verDialogAgregar"
        max-width="800px"
        transition="dialog-transition"
    >
        <v-card >
                  <v-toolbar color="primary" dark>
          <v-toolbar-title>Cargar Fraces</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-simple-table>
           <v-col cols="12" md="12">
                      <v-text-field label="Agrega una frase a este evento " v-model="fraceM" />
           </v-col>

<v-layout >
    <v-flex >
        <v-card>
               <v-data-table :headers="headersFraces" :items="consultaF" >

                <template v-slot:item.action="{item}">
                  <v-icon medium title="Eliminar Ciudad" @click="deleteItem(item)">fa-trash-alt</v-icon>
                </template>
              </v-data-table>
        </v-card>
    </v-flex>
</v-layout>

          </v-simple-table>
          <v-layout row wrap justify-end class="mt-3">
                <v-btn color="blue"  text @click="verDialogAgregar = false">Cancel</v-btn>
                <v-btn color="blue"  text @click="guardarFrace()">Guardar</v-btn>
          </v-layout>
        </v-card-text>
        </v-card>
    </v-dialog>
</v-layout>
        
    
</template>
<script>
import uuidv4 from "uuid/v4";
import {auth, firebase, db, storage } from "@/firebase";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
export default {
    name:"Fraces",
    data(){
        return{
             search:'',
            agregar:{},
            verDialogAgregar:false,
            fraceM:"",
        datosEvento:[],
        consultaF:[],
              headers: [
        { text: "NOMBRE", value: "nombre" },
        { text: "Imagen", value: "imagen" },
        { text: "Color", value: "color" },
        { text: "ACCIONES ", value: "action" }
      ],
              headersFraces: [
        { text: "FRACES", value: "nombre" },
        { text: "ACCIONES ", value: "action" }
      ]

        }
    },
    methods:{
    async consultarEvento() {
      try {
        let docs = await db.collection("categoriaEventos")
                           .get();

        docs.forEach(doc => {
          this.datosEvento.push(doc.data());
        });

        if (this.datosRango.length == 0) {
          this.mostrarAdvertencia("No hay rangos disponibles en el momento.");
        }
      } catch (error) {}
    },
    agregarFrase(item){
       this.verDialogAgregar =true
         this.agregar = Object.assign({}, item);
         this.consultarFraces();

    },
       async guardarFrace(){
   
     let idfrace = uuidv4();

     let fracesHD = {
        idfrace,
        nombre: this.fraceM,
      }

try{
  if(this.fraceM==""){
 Swal.fire({
        title: `No hay nada para guardar`,
        text: "Antes de guardar agrega una frace",
        icon: "warning",
      })
  }else{
    await   db.collection("categoriaEventos")
          .doc(this.agregar.id)
          .collection("Fraces")
          .doc(idfrace)
          .set(fracesHD)

    this.fraceM =''
    this.consultarFraces();
  }
 


}catch{

}
      
  },
 async consultarFraces(){
this.consultaF=[];
  try{
          
        let resultado = await db.collection("categoriaEventos")
                        .doc(this.agregar.id)
                        .collection("Fraces")
                        .get();

       resultado.docs.forEach(doc => {
          this.consultaF.push(doc.data());
        });
  }catch{

  }


  },
  async deleteItem(item) {
      Swal.fire({
        title: `Estas seguro de eliminar a ${item.nombre}`,
        text: "Una vez eliminado no se podra recuperar",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Aceptar"
      }).then(result => {
        if (result.value) {
          Swal.fire(
            "Se a eliminado Correctamente la ciudad!",
            `${item.nombre}`,
            "success"
          ) &&
           db.collection("categoriaEventos")
                        .doc(this.agregar.id)
                        .collection("Fraces")
                        .doc(item.idfrace)
                        .delete();
        }
           this.consultarFraces();
      });   
    },

    },
    created(){
        
       this.consultarEvento();
    },

    
}
</script>