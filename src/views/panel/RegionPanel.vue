<template >
<v-layout row wrap>
    <v-flex >
        <v-container >
                   <v-col cols="12">
            <material-card color="green" >
              <v-card-title>
                Regiones En el sistema
                <div class="flex-grow-1"></div>
                <v-text-field
                  v-model="search"
                  append-icon="mdi-table-search"
                  label="Buscar"
                  single-line
                  hide-details
                ></v-text-field>
              </v-card-title>
              <v-layout justify-center align-center>
                  <v-flex >
                <v-layout  justify-end align-end>
                       <v-btn @click="cargardatosRegion" class="ma-2" color="success">CARGAR REGION</v-btn>
                </v-layout>
                 
                  </v-flex>
              </v-layout>

          <v-data-table :headers="headers" :items="datosRegiones" :search="search">
            
                <template v-slot:item.action="{item}">
                  <v-icon medium class="mr-2" title="Editar Region" @click="datosRegion(item)">fa-user-edit</v-icon>
                  <v-icon medium class="mr-2" title="Eliminar Region" @click="deleteItem(item)">fa-trash-alt</v-icon>
                  <v-icon medium  class="mr-2" title="Agregar Ciudad" @click="agregarCiudades(item)">fa-plus-square</v-icon>
                </template>
              </v-data-table>

              <v-select
               item-text="nombre"
                v-model="sortBys"
                
                flat
                solo-inverted
                hide-details
                :items="datosRegiones"
                prepend-inner-icon="search"
                label="Categorias"
              ></v-select>
 <v-dialog v-model="RegionD" max-width="700px">
            <v-card>
              <v-card-title>
                <span class="headline">Informacion actual </span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" md="4">
                      <v-text-field label="Id" v-model="edit.id" />
                    </v-col>

                    <v-col cols="12" md="4">
                      <v-text-field label="Nombre de la Region" v-model="edit.nombre" />
                    </v-col>
              
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <div class="flex-grow-1"></div>
                <v-btn color="blue darken-1" text @click="RegionD = false">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="EditarC()">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-dialog v-model="cargarRegion" max-width="700px">
            <v-card>
              <v-card-title>
                <span class="headline">Ingresa los datos correspondientes </span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" md="4">
                      <v-text-field label="Id" v-model="guardar.id" />
                    </v-col>

                    <v-col cols="12" md="4">
                      <v-text-field label="Nombre de la Region" v-model="guardar.nombre" />
                    </v-col>
              
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <div class="flex-grow-1"></div>
                <v-btn color="blue darken-1" text @click="cargarRegion = false">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="guardarRegion()">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>


            </material-card>
          </v-col>
          

        </v-container>
    </v-flex>
     <v-dialog
        v-model="verDialogAgregar"
        max-width="800px"
        transition="dialog-transition"
    >
        <v-card >
                  <v-toolbar color="primary" dark>
          <v-toolbar-title>Cargar Ciudades</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-simple-table>
           <v-col cols="12" md="12">
                      <v-text-field label="Agrega una ciudad a esat region" v-model="ciudadR" />
           </v-col>

<v-layout >
    <v-flex >
        <v-card>
               <v-data-table :headers="headersCiudades" :items="consultarC" >

                <template v-slot:item.action="{item}">
                  <v-icon medium title="Eliminar Ciudad" @click="deleteItemCiudad(item)">fa-trash-alt</v-icon>
                </template>
              </v-data-table>
        </v-card>
    </v-flex>
</v-layout>

          </v-simple-table>
          <v-layout row wrap justify-end class="mt-3">
                <v-btn color="blue"  text @click="verDialogAgregar = false">Cancel</v-btn>
                <v-btn color="blue"  text @click="agregarCiudad()">Guardar</v-btn>
          </v-layout>
        </v-card-text>
        </v-card>
    </v-dialog>
</v-layout>
        
    
</template>
<script>
import uuidv4 from "uuid/v4";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { auth, db, firebase } from "@/firebase";
export default {
    name:'Regiones',
    data(){
        return{
            ciudadR:'',
            search:'',
            datosRegiones:[],
            consultarC:[],
            RegionD:false,
            cargarRegion:false,
            verDialogAgregar:false,
            guardar:{
            id:"",
            nombre:""},
             agregar:{},
            edit:{},
        headers: [
        { text: "ID", value: "id" },
        { text: "NOMBRE", value: "nombre" },
        { text: "ACCIONES ", value: "action" }
      ],
        headersCiudades: [
        { text: "Ciudades", value: "nombre" },
        { text: "ACCIONES ", value: "action" }
      ]

           
        }
    },
    methods:{
       async consultarCiudades(){
this.consultarC=[];
  try{
          
        let resultado = await db.collection("Region")
                        .doc(this.agregar.idRegion)
                        .collection("Ciudades")
                        .get();

       resultado.docs.forEach(doc => {
          this.consultarC.push(doc.data());
        });
  }catch{

  }
  },
          agregarCiudades(item){
       this.verDialogAgregar =true
         this.agregar = Object.assign({}, item);
         this.consultarCiudades();

    },
           async agregarCiudad(){
   
     let idCiudad = uuidv4();
     let id = this.agregar.idRegion
     let fracesHD = {
       id,
        idCiudad,
        nombre: this.ciudadR,
      }

try{
  if(this.ciudadR==""){
 Swal.fire({
        title: `No hay nada para guardar`,
        text: "Antes de guardar agrega una Ciudad",
        icon: "warning",
      })
  }else{
    await   db.collection("Region")
          .doc(this.agregar.idRegion)
          .collection("Ciudades")
          .doc(idCiudad)
          .set(fracesHD)

    this.ciudadR =''
    this.consultarCiudades();
  }
 


}catch{

}
      
  },
       // aqui es donde consulto la Region 
    async consultarRegion() {
        this.datosRegiones=[];
      try {
        let docs = await db.collection("Region")
                        .orderBy('nombre')
                        .get();

        docs.forEach(doc => {
          this.datosRegiones.push(doc.data());
        });

        if (this.datosRegiones.length == 0) {
                    Swal.fire({
          icon: "info",
          text: "no se a encontrado datos",
          showConfirmButton: false,
          timer: 1500
        });
        }
      } catch (error) {
              Swal.fire({
          icon: "warning",
          text: "no se a encontrado datos",
          showConfirmButton: false,
          timer: 1500
        });
      }
    },
       datosRegion(item) {
      this.edit = Object.assign({}, item);
      this.RegionD = true;
    },
    cargardatosRegion(){
     this.cargarRegion = true;
    },
         // aqui es donde guardo la Region 
    async guardarRegion(){
    let idRegion = uuidv4();
        let RegionG = {
        idRegion,
        id: this.guardar.id,
        nombre: this.guardar.nombre,
      }
        await db.collection('Region')
        .doc(RegionG.idRegion)
        .set(RegionG)
        this.consultarRegion();
        this.guardar.id =""
        this.guardar.nombre =""
    },
        async EditarC() {
      this.personal = [];
      try {
        await db
          .collection("Region")
          .doc(this.edit.idRegion)
          .update({
             id: this.edit.id,
             nombre: this.edit.nombre,
          });
      } catch (error) {
        this.mostrarError("Ocurrió un error actualizando los datos.");
      } finally {
        Swal.fire({
          icon: "success",
          text: "Los datos han sido actualizados correctamente",
          showConfirmButton: false,
          timer: 1500
        });
  
      }

       this.consultarRegion();
    },
     // aqui es donde elimino la Ciudad 
     async deleteItemCiudad(item) {
      Swal.fire({
        title: `Estas seguro de eliminar a la Ciudad! ${item.nombre}`,
        text: "Una vez eliminado no se podra recuperar",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Aceptar"
      }).then(result => {
        if (result.value) {
          Swal.fire(
            "Se a eliminado Correctamente la Ciudad!",
            `${item.nombre} `,
            "success"
          ) &&
                      db.collection("Region")
                        .doc(this.agregar.idRegion)
                        .collection("Ciudades")
                        .doc(item.idCiudad)
                        .delete();
        }
         this.consultarCiudades();
      });   
    },

    // aqui es donde elimino la region 
       async deleteItem(item) {
      Swal.fire({
        title: `Estas seguro de eliminar a la Region! ${item.nombre}`,
        text: "Una vez eliminado no se podra recuperar",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Aceptar"
      }).then(result => {
        if (result.value) {
          Swal.fire(
            "Se a eliminado Correctamente la Region!",
            `${item.nombre} `,
            "success"
          ) &&
            db
              .collection("Region")
              .doc(item.idRegion)
              .delete();
        }
         this.consultarRegion();
      });   
    },


    },
    computed:{

    },
    created(){
        this.consultarRegion();
    }
    
}
</script>
<style >
    
</style>