<template>
  <v-container>
    <v-card>
      <v-card-text>
        <h2>Mantenedor Categoría de Eventos</h2>
      </v-card-text>
    </v-card>
    <v-data-table :headers="headers" :items="ArrayCategoria" sort-by="nombre" class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Lista Tipos de Evento</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <div class="flex-grow-1"></div>
          <v-btn @click="dialog = true" color="primary" dark class="mb-2" v-on="on">
            <v-icon small class="mr-1">fa-plus</v-icon>Agregar
          </v-btn>
        </v-toolbar>
      </template>

      <template v-slot:item.imagen="{ item }">
        <v-img
          :src="item.imagen"
          height="80"
          width="80"
          contain
          :lazy-src="`https://picsum.photos/10/6?image=${n * 5 + 10}`"
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
      <template v-slot:item.icono="{ item }">
        <v-icon>{{item.icono}}</v-icon>
      </template>
      <template v-slot:item.action="{ item }">
        <v-btn @click="verCategoria(item)" small color="warning" class="ma-1">
          <v-icon small>fa-eye</v-icon>
        </v-btn>
        <v-btn @click="editarItem(item)" small color="success" class="ma-1">
          <v-icon small>fa-pen</v-icon>
        </v-btn>

        <v-btn @click="eliminarCategoria(item)" small color="error" class="ma-1">
          <v-icon small>fa-trash</v-icon>
        </v-btn>
        <v-btn @click="carrgarGaleria(item)" small color="info" class="ml-10">
          <v-icon small>fa-images</v-icon>
        </v-btn>

        <!-- <v-icon class="mr-2" @click="editItem(item)">fa-account-edit</v-icon>
        <v-icon @click="deleteItem(item)">fa-delete</v-icon>-->
      </template>
    </v-data-table>

    <!-- Dialog de subir imagen a categoria  -->
    <v-dialog v-model="upload" max-width="900px">
      <v-card width="900" color="#ffffff">
        <v-layout justify-center wrap>
          <v-flex xs10>
            <v-card class="ma-3">
              <v-toolbar :color="subir.color" dark>
                <v-toolbar-title>Galeria del evento</v-toolbar-title>
              </v-toolbar>

              <v-card class="ma-3">
                <v-toolbar :color="subir.color" dark>
                  <v-toolbar-title>Subir imagenes para eventos</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                      <v-flex xs12>
                          <v-col>
                            <span>Subir Foto de Regalo</span>
                            <file-pond
                              v-if="vistaX2 == 1"
                              @addfile="cargarImagen4"
                              instant-upload="false"
                              fileValidateTypeLabelExpectedTypes="Se esperaba {allButLastType} o {lastType}"
                              labelFileTypeNotAllowed="Agrega una imagen .png o .jpg"
                              accepted-file-types="image/jpeg, image/png"
                              label-idle="Selecciona o arrastra una imagen..."
                            ></file-pond>
                            <v-responsive v-if="vistaX2 == 2">
                              <img ref="imagenOriginal4" src alt class="edicionImagen" />
                            </v-responsive>
                            <v-layout row wrap class="ma-5" v-show="vistaX2 == 2">
                              <v-btn @click="limpiar()" color="primary">cancelar imagen</v-btn>
                              <v-spacer></v-spacer>
                            </v-layout>
                          </v-col>
                        </v-flex>
     
                  <v-layout v-if="vistaX2 == 2" wrap justify-center class="mt-3">
                    <v-btn :color="read.color" @click="subirGaleria()" dark>Subir</v-btn>
                  </v-layout>
                </v-card-text>
              </v-card>
              <v-card-text>
    <v-responsive
      class="overflow-y-auto"
      max-height="600"
    >
                       <v-lazy
          v-model="isActive"
          :options="{
            threshold: .5
          }"
          min-height="200"
          transition="fade-transition"
        >
                <v-row>
                  <v-col v-for="n in ArrayImagenes" :key="n.id" class="d-flex child-flex" cols="4">
                    <v-card flat tile class="d-flex">
                      <v-layout justify-center wrap>
                        <v-flex xs12>
                          <v-img
                            :src="n.urlImagen"
                            :lazy-src="`https://picsum.photos/10/6?image=${n * 5 + 10}`"
                            aspect-ratio="1"
                            class="grey lighten-2"
                          >
                          <v-btn @click="vercontenidoE(n)" icon>  <v-icon >fa-eye</v-icon> </v-btn>
                        
                            <template v-slot:placeholder>
                              <v-row class="fill-height ma-0" align="center" justify="center">
                                <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                              </v-row>
                            </template>
                          </v-img>
                        </v-flex>
                        <v-flex  xs12 class="mt-1" >
                          <v-layout justify-center>
                            <v-btn
                              @click="EliminarImagenForm(n)"
                              :color="subir.color"
                              fab
                              cols="1"
                              small
                              dark
                            >
                              <v-icon small>fa-trash</v-icon>
                            </v-btn>
                          </v-layout>
                        </v-flex>
                      </v-layout>
                    </v-card>
                  </v-col>
                </v-row>
                        </v-lazy>
      </v-responsive>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-card>
    </v-dialog>

    <!-- Dialog del agregar Categoria -->

    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">{{ formTitle }}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="12">
                <v-text-field v-model="Categoria.nombre" label="Nombre"></v-text-field>
              </v-col>
                <v-col cols="12" sm="12">
                <v-textarea outlined v-model="Categoria.descripcion" label="Descripcion"></v-textarea>
              </v-col>
              <v-col cols="12" sm="6">
                <v-layout align-center justify-center wrap>
                  <v-flex xs10>
                    <v-text-field v-model="Categoria.color" @click="colores=true" label="Color"></v-text-field>
                  </v-flex>
                  <v-flex xs2>
                    <v-icon :color="Categoria.color">fa-palette</v-icon>
                  </v-flex>
                </v-layout>
              </v-col>
              <v-col cols="12" sm="6">
                <v-layout align-center justify-center wrap>
                  <v-flex xs10>
                    <v-text-field
                      v-model="Categoria.icono"
                      label="Icono"
                      placeholder="Busca iconos en Font Awesome"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs2>
                    <v-icon>fa-icons</v-icon>
                  </v-flex>
                </v-layout>
              </v-col>

              <v-flex xs12>
                <v-checkbox
                  v-model="Categoria.pareja"
                  color="primary"
                  label="¿Mas de un festejado?"
                ></v-checkbox>
              </v-flex>

              <v-layout row wrap justify-center>
                <v-flex xs12>
                       <v-col  cols="12" md="12">
                <v-col
                >
                <span>Subir Foto de Evento</span>
                  <file-pond
                    v-if="vista == 1"
                    @addfile="cargarImagen2"
                    instant-upload="false"
                    fileValidateTypeLabelExpectedTypes="Se esperaba {allButLastType} o {lastType}"
                    labelFileTypeNotAllowed="Agrega una imagen .png o .jpg"
                    accepted-file-types="image/jpeg, image/png"
                    label-idle="Selecciona o arrastra una imagen..."
                  ></file-pond>
                  <v-responsive v-if="vista == 2">
                    <img
                      ref="imagenOriginal2"
                      src
                      alt
                      class="edicionImagen"
                    />
                  </v-responsive>
                  <v-layout row wrap   v-show="vista == 2">
                      <v-btn @click="limpiar2()">cancelar imagen</v-btn>
                  <v-spacer></v-spacer>
                  </v-layout>

                </v-col>

            
              

               </v-col>
                </v-flex>
                <v-flex xs12>
                  <v-img
                    :src="imageUrl"
                    height="150"
                    v-if="imageUrl"
                    :lazy-src="`https://picsum.photos/10/6?image=${n * 5 + 10}`"
                    aspect-ratio="1"
                    class="grey lighten-2"
                  >
                    <template v-slot:placeholder>
                      <v-row class="fill-height ma-0" align="center" justify="center">
                        <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                      </v-row>
                    </template>
                  </v-img>
                </v-flex>
              </v-layout>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="blue darken-1" text @click="dialog = false">Cancelar</v-btn>
          <v-btn color="blue darken-1" text @click="crearCategoria">Guardar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Dialog del color picker -->

    <v-dialog v-model="colores" max-width="300">
      <v-card>
        <v-color-picker flat show-swatches v-model="Categoria.color"></v-color-picker>
        <v-card-text>
          <v-layout row wrap justify-center>
            <v-btn class="mt-2" @click="colores = false;Categoria.color = ''" color text>cancelar</v-btn>
            <v-btn class="mt-2" @click="colores = false" color text>guardar</v-btn>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- Dialog del editar Categoria -->

    <v-dialog v-model="editar" max-width="500px">
      <v-card>
                 <v-toolbar :color="edit.color" dark>
                <v-toolbar-title>Editar Categoria evento {{edit.nombre}}</v-toolbar-title>
              </v-toolbar>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="12">
                <v-text-field  maxlength="60" v-model="edit.nombre" label="Nombre"></v-text-field>
              </v-col>

               <v-col cols="12" sm="12">
                <v-textarea outlined   maxlength="250" v-model="edit.descripcion" label="descripcion"></v-textarea>
              </v-col>
              <v-col cols="12" sm="6">
                <v-layout align-center justify-center wrap>
                  <v-flex xs10>
                 <v-menu
       
          v-model="colorP"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          full-width
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
       <v-layout row wrap>
             
              
                
            <v-text-field
              v-model="edit.color"
              label="Color"
              persistent-hint
              v-on="on"
            >
            </v-text-field>
       </v-layout>
              
          </template>
             <v-color-picker
                    class="ma-2"
                    v-model="edit.color"
                    :mode.sync="mode"
                    show-swatches
                    swatches-max-height="300px"
                    hide-inputs
                    @input="colorP = false"
                  ></v-color-picker>
      
        </v-menu>
                  </v-flex>
                  <v-flex xs2>
                    <v-icon :color="edit.color">fa-palette</v-icon>
                  </v-flex>
                </v-layout>
              </v-col>
              <v-col cols="12" sm="6">
                <v-layout align-center justify-center wrap>
                  <v-flex xs10>
                    <v-text-field
                      v-model="edit.icono"
                      label="Icono"
                      placeholder="Busca iconos en Font Awesome"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs2>
                    <v-icon>fa-icons</v-icon>
                  </v-flex>
                </v-layout>
              </v-col>
              <v-flex xs12>
                <v-checkbox v-model="edit.pareja" color="primary" label="¿Mas de un festejado?"></v-checkbox>
              </v-flex>
              <v-layout row wrap justify-center>
                <v-flex xs12>
                         <v-col cols="12" md="12">
                <span>Editar Foto</span>
                  <file-pond
                    v-if="vistaX == 1"
                    @addfile="cargarImagen3"
                    instant-upload="false"
                    fileValidateTypeLabelExpectedTypes="Se esperaba {allButLastType} o {lastType}"
                    labelFileTypeNotAllowed="Agrega una imagen .png o .jpg"
                    accepted-file-types="image/jpeg, image/png"
                    label-idle="Selecciona o arrastra una imagen..."
                  ></file-pond>
                  <v-responsive  v-if="vistaX == 2">
                    <img
                      ref="imagenOriginal3"
                      src
                      alt
                      class="edicionImagen"
                    />
                  </v-responsive>
                  <v-layout row wrap class="ma-2">
                      <v-btn color="accent"  v-if="vistaX == 2" @click="limpiar3()">cancelar imagen</v-btn>
                  <v-spacer  v-if="vistaX == 2"></v-spacer>
                  <v-btn  v-if="vistaX == 2" color="primary" @click="guradarsolofoto3()">guardar Imagen</v-btn>
                  </v-layout>
              </v-col>
     
                </v-flex>
            
              </v-layout>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="blue darken-1" text @click="editar = false">Cancelar</v-btn>
          <v-btn color="blue darken-1" text @click="EditarInfo()">Guardar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- dialog de ver -->
    <v-dialog v-model="ver" max-width="500px" transition="dialog-transition">
      <v-card max-width="600px">
        <v-toolbar dense :color="read.color" dark>
          <v-toolbar-title>
            <h3>{{read.nombre}}</h3>
          </v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-layout wrap>
            <v-flex xs12 class="mt-3">
              <h3>nombre del evento: {{read.nombre}}</h3>
            </v-flex>
            <v-flex xs12 class="mt-3">
              <v-img :src="read.imagen"></v-img>
            </v-flex>
            <v-flex xs12>
              <h4>Icono del evento</h4>
              <v-icon>{{read.icono}}</v-icon>
            </v-flex>

            <v-flex xs12 class="mt-3">
              <h4>color del evento:</h4>
              <v-card :color="read.color" width="30" height="30"></v-card>
            </v-flex>
            <v-flex xs12>
              <v-checkbox
                disabled
                v-model="read.pareja"
                color="primary"
                label="¿Mas de un festejado?"
              ></v-checkbox>
            </v-flex>

                 <v-flex xs12 class="mt-3">
              <h3>Descripción: {{read.descripcion}}</h3>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="verfotoEF"
     
     
      transition="dialog-transition"
    > 
    <v-layout row  justify-center>
       <v-btn color="primary" @click="verfotoEF = false" icon><v-icon>fa-times</v-icon> </v-btn>
         <v-card>
         
        <v-img max-width="1000" max-height="1000" :src="lafotoquesevera"></v-img>
      </v-card>
    </v-layout>
   
    </v-dialog>

    <!-- Dialog del estado ocupado -->

    <v-dialog v-model="ocupado.visible" hide-overlay persistent width="500">
      <v-card>
        <v-toolbar color="primary" dark class="mb-5" v-show="ocupado.titulo">
          <v-toolbar-title>{{ocupado.titulo}}</v-toolbar-title>
        </v-toolbar>
        <v-card-text class="mb-4">{{ocupado.mensaje}}</v-card-text>
        <v-progress-linear indeterminate></v-progress-linear>
      </v-card>
    </v-dialog>

    <v-snackbar dark v-model="notificar.visible" :color="notificar.color" top :timeout="10000">
      {{notificar.mensaje}}
      <v-btn text @click="notificar.visible = false">Cerrar</v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import { firebase, auth, db, storage } from "@/firebase";
import uuidv4 from "uuid/v4";

import vueFilePond from "vue-filepond";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import "filepond/dist/filepond.min.css";

import Cropper from "cropperjs/dist/cropper";
import "cropperjs/dist/cropper.css";
const FilePond = vueFilePond(FilePondPluginFileValidateType);

import Swal from "sweetalert2";

export default {
  data: () => ({
    ver: false,
    verfotoEF:false,
    lafotoquesevera:"",
    upload: false,
      mode: 'hexa',

    edit: {
     
    },
    read: {
      imagen: "",
      nombre: "",
      color: "",
      id: "",
      icono: "",
      pareja: "",
      descripcion:""
    },
    colores: false,
    editar: false,
    type: "hex",
    vista: 1,
    vistaX:1,
    vistaX2:1,
    dialog: false,
    headers: [
      {
        text: "Nombre",
        align: "left",
        sortable: false,
        value: "nombre"
      },
      { text: "Imagen", value: "imagen" },
      { text: "Color", value: "color" },
      { text: "Icono", value: "icono" },
      { text: "Opciones", value: "action", sortable: false }
    ],
    Categoria: {
      nombre: "",
      imagen: "",
      color: "",
      icono: "",
      pareja: false,
      descripcion:"",
    },
    ArrayImagenes: [],
    subir:{},
    url: "",
    file: "",
    uploadFile: "",
    picture: "",
    editedIndex: -1,
    ArrayCategoria: [],
    photo: null,
    photo_url: null,
    dialog: false,
    imageName: "",
    imageUrl: ""
  }),

  created() {
    this.mostrarDatos();
  },

  computed: {
     ...mapState(["evento", "ocupado", "notificar", "usuario"]),
    formTitle() {
      return this.editedIndex === -1 ? "Agregar Categoría" : "Editar Categoría";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  methods: {
    vercontenidoE(n){
    this.verfotoEF =true
            this.lafotoquesevera =  n.urlImagen
    },
   

    editarItem(item) {
           this.edit = Object.assign({}, item)
           this.editar = true;
           this.CargarImagenes();
    },

    async selectFile() {
      this.file = this.$refs.file.files[0];
    },

    verCategoria(item) {
    this.read = Object.assign({}, item)
      this.ver = true;
    },
    // subir imagen ------------------------------------------------------------------------------------------------------->

     limpiar4() {
      this.vistaX2 = 1;
      this.vistaPrevia4 = null;
    },
recortarImagen4() {
      this.cropperX2 = new Cropper(this.$refs.imagenOriginal4, {
        preview: this.$refs.vistaPrevia4,
        aspectRatio: (16 / 9),
        modal: false,
        guides: true,
        sized: true,
        zoomable: false,
        highlight: true,
        background: true,
        autoCrop: true
      });
    },
    cargarImagen4(error, archivo) {
      if (error) {
        this.mostrarError("Ocurrió un error leyendo la imagen.");
        return;
      }

      this.vistaX2 = 2;

      let reader = new FileReader();

      let vm = this;

      reader.onloadend = () => {
        vm.$refs.imagenOriginal4.src = reader.result;
        vm.recortarImagen4();
      };
      

      if (archivo) {
        if (archivo.file) {
          reader.readAsDataURL(archivo.file);
        }
      }
    },
    carrgarGaleria(item){
 this.subir = Object.assign({}, item)
this.upload =true;
this.CargarImagenes() 
    },

    async subirGaleria() {
      let id = uuidv4();
      let canvas = this.cropperX2.getCroppedCanvas();
      let imagen = canvas.toDataURL("image/jpeg");
      let ref = storage.ref();
     let ruta = this.subir.nombre
      try {

          let resultado = await ref .child(`TipoEventos/eventos/${ruta}/${id}.jpg`) 

        
        .putString(imagen, "data_url");
        let url = await resultado.ref.getDownloadURL();
  
        let fotosE = {
        id,
        urlImagen: url,
      }
      console.log("1")
      try {
              console.log("2")
        await db
             db.collection("categoriaEventos")
          .doc(this.subir.id)
          .collection("ImagenesForm")
          .doc(id)
          .set(fotosE);
        this.limpiar();
     this.CargarImagenes();
      } catch (error) {
      } finally {

      }
      
    
     }catch(error){

       alert(error)

     }

  
    },

    EliminarImagenForm(n) {

            Swal.fire({
        title: "¿Estas seguro?",
        text: "¡esta accion no se puede revertir!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "¡Si, eliminar!"
      }).then(result => {
        if (result.value) {
 try {
          var eliminar = firebase.storage().refFromURL(n.urlImagen);
           eliminar
          .delete()

        db.collection("categoriaEventos")
          .doc(this.subir.id)
          .collection("ImagenesForm")
          .doc(n.id)
          .delete();

   
        this.CargarImagenes();
      } catch (error) {

        alert(error)
      }
        }
      });



    },
   async EditarInfo(){
       let categoria = {
        nombre: this.edit.nombre,
        color: this.edit.color,
        icono: this.edit.icono,
        pareja: this.edit.pareja,
        descripcion: this.edit.descripcion,
        
      };

       await db.collection('categoriaEventos')
          .doc(this.edit.id)
          .update(categoria);
          this.mostrarDatos();
    },



    async CargarImagenes() {
      this.ArrayImagenes = [];
      try {
       let docs =  await db
          .collection("categoriaEventos")
          .doc(this.subir.id)
          .collection("ImagenesForm")
          .get()
          
              docs.forEach(doc => {
          this.ArrayImagenes.push(doc.data());
        });
      } catch (error) {}
    },

    // Pipe de agregar categoria ------------------------------------------------------------------------------------------------------->
    async crearCategoria() {
      
      if(this.Categoria.nombre != " "&&this.Categoria.descripcion!=" "&& this.Categoria.color!=" " &&this.vista==2){
let canvas = this.cropper.getCroppedCanvas();
      let imagen = canvas.toDataURL("image/jpeg");
      
      let id = uuidv4();

         let ref = storage.ref();
        let resultado = await ref

          .child(`TipoEventos/eventos/${id}.jpg`)
          .putString(imagen, "data_url");
        let url = await resultado.ref.getDownloadURL();
        
          let categoria = {
        imagen: url,
        nombre: this.Categoria.nombre,
        descripcion: this.Categoria.descripcion,
        color: this.Categoria.color,
        icono: this.Categoria.icono,
        pareja: this.Categoria.pareja,
        id
      };
        try {
        await db
          .collection("categoriaEventos")
          .doc(id)
          .set(categoria);
              this.mostrarDatos();
        this.limpiar();
      } catch (error) {
        alert(error);
      } finally {
    
      }

      }else{
         Swal.fire({
  icon: 'error',
  title: 'Ohoooo ',
  text: 'has intentado guardar un Evento sin todos los datos necesarios.',
})
      }
    
    },

   
    async guradarsolofoto3() {
      
           var eliminar = firebase.storage().refFromURL(this.edit.imagen);
           eliminar
          .delete()

     let canvas = this.cropperx.getCroppedCanvas();
      let imagen = canvas.toDataURL("image/jpeg");
      let fotoId = uuidv4();
      try {
        let ref = storage.ref();
        let resultado = await ref
          .child(`TipoEventos/eventos/${fotoId}.jpg`)
          .putString(imagen, "data_url");
        let url = await resultado.ref.getDownloadURL();
        await db.collection('categoriaEventos')
          .doc(this.edit.id)
          .update({

            imagen: url
          });
           this.mostrarDatos();
       this.vistaX = 1;
      this.vistaPrevia3 = null;
         } catch{

          }
       
    },

  

    async eliminarCategoria(item) {
      Swal.fire({
        title: "¿Estas seguro?",
        text: "¡esta accion no se puede revertir!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "¡Si, eliminar!"
      }).then(result => {
        if (result.value) {
          try {
            db.collection("categoriaEventos")
              .doc(item.id)
              .collection("ImagenesForm")
              .get()
              .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                  try {
                    let ref = storage.ref();

                    let fotoRef = ref.child(
                      `TipoEventos/eventos/${item.nombre}/${doc.data().id}.jpg`
                    );
                    console.log(fotoRef);
                    fotoRef.delete();
                    db.collection("categoriaEventos")
                      .doc(item.id)
                      .collection("ImagenesForm")
                      .doc(doc.data().id)
                      .delete();
                  } catch (error) {
                    alert(error);
                  }
                });
              });
            this.eliminarCategoria2(item);
          } catch (error) {
            alert("Error al eliminar");
          }
        }
      });
    },

    async eliminarCategoria2(item) {
      var eliminar = firebase.storage().refFromURL(item.imagen);
      try {
        eliminar
          .delete()
          .then(() => {
   
          })
          .catch(function(error) {
            alert(error);
          });
        await db
          .collection("categoriaEventos")
          .doc(item.id)
          .delete();
        Swal.fire(
          "¡Eliminado!",
          "¡esta categoria de evento de elimino con exito! c:"
        );
      } catch (error) {
        alert(error);
      } finally {
        this.mostrarDatos();
      }
    },
    //fin de eliminar categoria ----------------------------------------------------------------------------------------------------->
    limpiar() {
      var me = this;
      me.Categoria.nombre = "";
      me.Categoria.descripcion = "";
      me.Categoria.color = "";
      me.Categoria.imagen = "";
      me.Categoria.pareja  = false;
      me.url = "";
      me.Categoria.icono = "";
      me.edit.nombre = "";
      me.edit.imagen = "";
      me.edit.color = "";
      me.edit.icono = "";
      me.imageName = "";
      me.imageUrl = "";
      me.edit.pareja  =false;
      me.vista = 1;
      me.vistaPrevia2 = null;
            me.vistaX2 = 1;
      me.vistaPrevia4 = null;
    },

    pickFile() {
      this.$refs.image.click();
    },
    limpiar2() {
      this.vista = 1;
      this.vistaPrevia2 = null;
    },
   recortarImagen2() {
      this.cropper = new Cropper(this.$refs.imagenOriginal2, {
        preview: this.$refs.vistaPrevia2,
        aspectRatio: (1,3),
        modal: false,
        guides: true,
        sized: true,
        zoomable: false,
        highlight: true,
        background: true,
        autoCrop: true
      });
    },
    cargarImagen2(error, archivo) {
      if (error) {
        this.mostrarError("Ocurrió un error leyendo la imagen.");
        return;
      }

      this.vista = 2;

      let reader = new FileReader();

      let vm = this;

      reader.onloadend = () => {
        vm.$refs.imagenOriginal2.src = reader.result;
        vm.recortarImagen2();
      };
      

      if (archivo) {
        if (archivo.file) {
          reader.readAsDataURL(archivo.file);
        }
      }
    },


 recortarImagen3() {
      this.cropperx = new Cropper(this.$refs.imagenOriginal3, {
        preview: this.$refs.vistaPrevia3,
        aspectRatio: (1,3),
        modal: false,
        guides: true,
        sized: true,
        zoomable: false,
        highlight: true,
        background: false,
        autoCrop: true
      });
    },
    cargarImagen3(error, archivox) {
      if (error) {
        this.mostrarError("Ocurrió un error leyendo la imagen.");
        return;
      }

      this.vistaX = 2;

      let reader = new FileReader();

      let vm = this;

      reader.onloadend = () => {
        vm.$refs.imagenOriginal3.src = reader.result;
        vm.recortarImagen3();
      };
      

      if (archivox) {
        if (archivox.file) {
          reader.readAsDataURL(archivox.file);
        }
      }
    },
          limpiar3() {
      this.vistaX = 1;
      this.vistaPrevia3 = null;
    },
    async mostrarDatos() {
      this.ArrayCategoria = [];
      await db
        .collection("categoriaEventos")
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            this.ArrayCategoria.push(doc.data());
          });
        });
    }
  }
};
</script>

<style>
.filepond--drop-label {
  font-size: 14pt !important;
}
.edicionImagen {
  width: 100%;
}
.transparente {
  background-color: #ffffff00;
}
</style>