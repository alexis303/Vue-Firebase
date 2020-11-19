<template>
  <v-layout
    row
    wrap
  >
    <v-flex>
      <v-card v-for="P in PortadaL" flat
          :key="P.id">

        <v-img
        
          
          aspect-ratio="4.2"
          align-center
          justify-center
          dark
          :src="P.imagen"
        >
          <v-layout
            align-center
            justify-center
            fill-height
          >
            <v-flex>
              <h1
              
                class="display-2 font-weight-thin mb-4 text-center bs merienda"
              >{{P.titulo}}</h1>
              <v-flex>
                <h4 class="font-italic text-center bs merienda">{{P.descripcion}}</h4>
              </v-flex>
            </v-flex>
          </v-layout>
        </v-img>


 <v-container > 
                  <v-row class="ma-2">
                    <v-col cols="12" md="4">
                      <v-text-field label="Titulo" :maxlength="50" v-model="edit.titulo" />
                    </v-col>
             <v-col cols="12" md="4">
                        
                         <v-file-input

    accept="image/png, image/jpeg, image/bmp"
    placeholder="CARGAR IMAGEN"
    prepend-icon="fa-camera"
    label="Portada"
    v-model="selectedFile"
  ></v-file-input>
                   

                    </v-col>
<v-btn class="mt-5" @click="subir()"> Guardar Imagen</v-btn>
                                       <v-progress-circular v-show="ver ==true"
                                      class="mx-5 "
      :rotate="360"
      :size="100"
      :width="15"
      :value="UploadValue"
      color="teal"
    >
{{UploadValue}}
    </v-progress-circular>
                    <v-col cols="12" md="12">
                      <v-textarea label="Descripcion" :maxlength="200" v-model="edit.descripcion" />
                    </v-col>
       
                 <v-btn @click="guardardatos">Guardar</v-btn>
                  </v-row>
                </v-container>

      </v-card>

    </v-flex>
  </v-layout>

</template>
<script>
import {firebase, auth, db, storage } from "@/firebase";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
export default {
   name: "Listaspanel",
    
  data() {
    return {
      UploadValue:0,
       PortadaL:[],
       edit:{},
       selectedFile:null,
       url:'',
       ver : false
    }
  },
  created(){
  this.Portada();
  },
  methods:{
onFileSelected(event){
    this.selectedFile = event.target.files[0];

},


       async Portada() {
      this.PortadaL = [];

      try {
        let resultado = await db.collection("ListaPortada")
                                .get();

        resultado.docs.forEach(doc => {
          this.PortadaL.push(doc.data());
        
        });
         this.edit = Object.assign({}, this.PortadaL[0]);
      } catch (error) { }
    },
   async subir(){
   
     this.ver =true;

         let ref = storage.ref();
        var storageRef =  firebase.storage().ref(`foto/XD/hola.jpg`);
        let task = storageRef.put(this.selectedFile);
        
      task.on(
        "state_changed",
        snapshot => {
          let porcentaje = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
this.UploadValue = porcentaje;

console.log(this.UploadValue)
        },
        error => {
          console.log(error);
        },
        () => {
          task.snapshot.ref.getDownloadURL().then(url=>{
           this.url = url;
            console.log("la imagen tiene el link :" + url);

           db.collection('ListaPortada')
          .doc(this.edit.id)
          .update({
            imagen: url
          });    
          this.Portada();
          });
       
           this.UploadValue = 0
           this.ver =false;
             this.url =''
             this.selectedFile =null
           

        },

      ); 
    
   },

  async  guardardatos(){
            await db.collection('ListaPortada')
           .doc(this.edit.id)
          .update({
            titulo: this.edit.titulo,
            descripcion: this.edit.descripcion,
          });
            this.Portada();
                 Swal.fire({
          icon: "success",
          text: "Los datos han sido actualizados correctamente",
          showConfirmButton: false,
          timer: 1500
        });
    }
  }
}

</script>
<style >


</style>