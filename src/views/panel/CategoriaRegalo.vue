<template>
  <v-container>
    <v-card>
      <v-card-text>
        <h2>Mantenedor Categoría de Regalos</h2>
      </v-card-text>
    </v-card>
    <v-data-table :headers="headers" :items="ArrayCategoria" sort-by="nombre" class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Lista Tipos de Regalos</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <div class="flex-grow-1"></div>
          <v-btn @click="add = true" color="primary" dark class="mb-2">
            <v-icon small class="mr-1">fa-plus</v-icon>Agregar
          </v-btn>
        </v-toolbar>
      </template>
      <template v-slot:item.action="{ item }">
        <v-btn @click="openEdit(item)" dark small color="success" class="ma-1">
          <v-icon small>fa-pen</v-icon>
        </v-btn>
        <v-btn @click="openDelete(item)" dark small color="error" class="ma-1">
          <v-icon small>fa-trash</v-icon>
        </v-btn>
        <v-btn @click="openGift(item)" dark small color="info" class="ma-1 ml-10">
          <v-icon small>fa-gifts</v-icon>
        </v-btn>
        <v-btn @click="openList(item)" dark small color="purple" class="ma-1 ml-2">
          <v-icon small>fa-clipboard</v-icon>
        </v-btn>
      </template>
    </v-data-table>
    <v-dialog
      v-model="add"
      persistent
      :overlay="false"
      max-width="500px"
      transition="dialog-transition"
    >
      <v-card max-width="500px">
        <v-card-title>Agregar una nueva categoria de regalo</v-card-title>
        <v-card-text>
          <v-container>
            <v-layout row wrap>
              <v-flex>
                <v-text-field
                  v-model="categoria.nombre"
                  label="Nombre de la nueva categoria de regalos"
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout justify-end>
              <v-btn color="blue darken-1" text @click="add = false">Cancelar</v-btn>
              <v-btn color="blue darken-1" text @click="addCategoria">Guardar</v-btn>
            </v-layout>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="edit"
      persistent
      :overlay="false"
      max-width="500px"
      transition="dialog-transition"
    >
      <v-card max-width="500px">
        <v-card-title>editar una nueva categoria de regalo</v-card-title>
        <v-card-text>
          <v-container>
            <v-layout row wrap>
              <v-flex>
                <v-text-field
                  v-model="categoria.nombre"
                  label="Nombre de la nueva categoria de regalos"
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout justify-end>
              <v-btn color="blue darken-1" text @click="edit = false">Cancelar</v-btn>
              <v-btn color="blue darken-1" text @click="editCategoria">Guardar</v-btn>
            </v-layout>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- Subir regalos a cada categoria -->
    <v-dialog v-model="gift" max-width="1000px">
      <v-card width="1000" color="#ffffff">
        <v-layout justify-center wrap>
          <v-flex xs11>
            <v-card class="ma-3">
              <v-toolbar dark color="purple">
                <v-toolbar-title>Regalos de esta categoría</v-toolbar-title>
              </v-toolbar>

              <v-card class="ma-3">
                <v-toolbar dark color="purple">
                  <v-toolbar-title>Crear regalos para esta categoría</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                  <v-container>
                    <v-layout wrap>
                      <v-flex xs5 class="mr-4">
                        <v-text-field v-model="regalo.nombre" label="Nombre"></v-text-field>
                      </v-flex>
                      <v-flex xs5>
                        <v-text-field v-model="regalo.precio" label="Precio"></v-text-field>
                      </v-flex>
                      <v-layout row wrap justify-center>
                        <v-flex xs12>
                          <v-col>
                            <span>Subir Foto de Regalo</span>
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
                              <img ref="imagenOriginal2" src alt class="edicionImagen" />
                            </v-responsive>
                            <v-layout row wrap class="ma-5" v-show="vista == 2">
                              <v-btn @click="limpiar2()" color="primary">cancelar imagen</v-btn>
                              <v-spacer></v-spacer>
                            </v-layout>
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
                    </v-layout>
                  </v-container>
                  <v-layout wrap justify-center class="mt-3">
                    <v-btn @click="addRegalo1" color="purple" dark>Crear regalo</v-btn>
                  </v-layout>
                </v-card-text>
              </v-card>
              <v-layout v-show="this.cantidadderegalos > 1" justify-center>
                <v-flex xs6>
                  <v-card class="mx-10 mt-2 my-4">
                    <v-text-field
                      v-model="buscar"
                      outlined
                      hide-details
                      append-icon="search"
                      label="Buscar"
                    ></v-text-field>
                  </v-card>
                </v-flex>
              </v-layout>

              <v-responsive class="overflow-y-auto" max-height="600">
                <v-lazy
                  v-model="isActive"
                  :options="{
            threshold: .5
          }"
                  min-height="200"
                  transition="fade-transition"
                >
                  <v-data-iterator
                    :headers="headers"
                    :items="ArrayRegalos"
                    hide-default-header
                    hide-default-footer
                    :search="buscar"
                    no-data-text
                  >
                    <template v-slot:default="props">
                      <v-layout align-center justify-center wrap class="mb-10">
                        <v-flex xs12>
                          <v-layout row ma-1>
                            <v-flex v-for="card in props.items" :key="card.id" md4 class="my-2">
                              <v-layout align-center justify-center text-center column>
                                <v-card>
                                  <v-img
                                    :src="card.urlImagen"
                                    class="white--text align-end"
                                    gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                                    max-width="270"
                                    min-width="270"
                                    min-height="270"
                                    max-height="270"
                                  >
                                    <v-card-title>{{card.nombre}}</v-card-title>
                                    <v-card-text class="subheader">${{card.precio | currency}}</v-card-text>
                                  </v-img>

                                  <v-card-actions>
                                    <v-layout align-center justify-center>
                                      <v-btn
                                        @click="eliminarRegalo(card)"
                                        color="error"
                                        fab
                                        x-small
                                      >
                                        <v-icon small>fa-trash</v-icon>
                                      </v-btn>
                                    </v-layout>
                                  </v-card-actions>
                                </v-card>
                              </v-layout>
                            </v-flex>
                          </v-layout>
                        </v-flex>
                      </v-layout>
                    </template>
                  </v-data-iterator>
                </v-lazy>
              </v-responsive>
            </v-card>
          </v-flex>
        </v-layout>
      </v-card>
    </v-dialog>
    <v-dialog v-model="list" persistent max-width="700px" transition="dialog-transition">
      <v-card width="700px">
        <v-data-table
          :headers="regalos"
          :items="ArrayRegalos"
          :items-per-page="10"
          sort-by="nombre"
          :search="buscar"
          class="elevation-1"
        >
          <template v-slot:top>
            <v-toolbar flat color="white">
              <v-toolbar-title>Lista de regalos</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <div class="flex-grow-1"></div>
              <v-text-field class="mt-4" append-icon="search" label="Buscar" v-model="buscar"></v-text-field>
            </v-toolbar>
          </template>

          <template v-slot:item.urlImagen="{ item }">
            <img :src="item.urlImagen" width="100" height="100'" />
          </template>
          <template v-slot:item.precio="{ item }">
            <p>${{item.precio | currency}}</p>
          </template>
          <template v-slot:item.categoria="{ item }">
            <p>{{item.categoria}}</p>
          </template>
        </v-data-table>

        <v-card-text>
          <v-layout wrap justify-end>
            <v-btn color="success" class="mt-2" text @click="changeList">Cambiar modal</v-btn>
            <v-btn color="success" class="mt-2" text @click="closeList">Cerrar</v-btn>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>

import vueFilePond from "vue-filepond";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import "filepond/dist/filepond.min.css";

import Cropper from "cropperjs/dist/cropper";
import "cropperjs/dist/cropper.css";
const FilePond = vueFilePond(FilePondPluginFileValidateType);

import { mapMutations, mapState } from "vuex";
import { firebase, auth,db, storage } from "@/firebase";
import uuidv4 from "uuid/v4";
import Swal from "sweetalert2";
export default {
  data() {
    return {
       headers: [
        { value: 'nombre' },
        { value: 'precio' },
        { value: 'urlImagen' },

      ],
      cantidadderegalos:null,
      vista:1,
      add: false,
      edit: false,
      gift: false,
      list: false,
      ArrayCategoria: [],
      ArrayRegalos: [],
      categoria: {
        nombre: "",
        id: ""
      },
      regalo: {
        nombre: "",
        imagen: "",
        precio: "",
        categoria: "",
        idCategoria: ""
      },
      editadoE:{},
      headers: [
        {
          text: "Nombre",
          align: "left",
          sortable: false,
          value: "nombre"
        },
        { text: "Opciones", value: "action", sortable: false }
      ],
      regalos: [
        {
          text: "Nombre",
          align: "left",
          sortable: false,
          value: "nombre"
        },
        { text: "Imagen", value: "urlImagen", sortable: false },
        { text: "Precio", value: "precio", sortable: false },
        { text: "Categoría", value: "categoria", sortable: false }
      ],
      buscar:"",
      imageUrl: "",
      imageName: ""
    };
  },
  created() {
    this.getDatos();
  },
  methods: {

async eliminarRegalo(card){
 Swal.fire({
        title: `Estas seguro de eliminar el regalo  `+card.nombre,
        text: "Una vez eliminado no se podra recuperar",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Aceptar"
      }).then(result => {
        if (result.value) {
          Swal.fire(
            "Se a eliminado Correctamente el regalo "+ card.nombre,
          
            "success"
          );
          
     try{
      let ref = storage.ref();
      let fotoRef = ref.child(  `Regalos/${this.editadoE.nombre}/${card.id}.jpg`);
      fotoRef.delete()

}catch(error){
alert(error)
}

               db.collection("categoriaRegalos")
              .doc(this.editadoE.id)
              .collection("RegalosCat")
              .doc(card.id)
              .delete();
             this.getRegalos(); 
        }
       
      }); 
},


    async addCategoria() {
      let id = uuidv4();
      let categoria = {
        nombre: this.categoria.nombre,
        id
      };

      try {
        await db
          .collection("categoriaRegalos")
          .doc(id)
          .set(categoria);
      } catch (error) {
        alert(error);
      } finally {
        this.getDatos();
        this.categoria.nombre = "";
        this.add = false;
      }
    },

    openEdit(item) {
      this.edit = true;
      this.categoria.nombre = item.nombre;
      this.categoria.id = item.id;
      
    },
    async editCategoria() {
      try {
        let categoria = {
          nombre: this.categoria.nombre,
          id: this.categoria.id
        };

        await db
          .collection("categoriaRegalos")
          .doc(this.categoria.id)
          .set(categoria);
      } catch (error) {
        alert(error);
      } finally {
        this.edit = false;
        this.categoria.nombre = "";
        this.categoria.id = "";
        this.getDatos();
      }
    },
    openDelete(item) {
      Swal.fire({
        title: "¿Estas seguro?",
        text: "Esta accion no se podra revertir",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, ¡Eliminar!"
      }).then(result => {
        if (result.value) {
          try {
            db.collection("categoriaRegalos")
              .doc(item.id)
              .collection("RegalosCat")
              .get()
              .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                  try {
                    let ref = storage.ref();

                    let fotoRef = ref.child(
                      `Regalos/${item.nombre}/${doc.data().id}.jpg`
                    );

                    fotoRef.delete();
                    db.collection("categoriaRegalos")
                      .doc(item.id)
                      .collection("RegalosCat")
                      .doc(doc.data().id)
                      .delete();
                  } catch (error) {
                    alert(error);
                  }
                });
              });
            this.deleteCategoria(item);
          } catch (error) {
            alert("Error al eliminar");
          }
        }
      });
    },
    openGift(item) {
      this.gift = true;
      this.regalo.categoria = item.nombre;
      this.regalo.idCategoria = item.id;

         this.editadoE = Object.assign({}, item)
      this.getRegalos();
    },

    openList(item) {
      this.list = true;
      this.regalo.categoria = item.nombre;
      this.regalo.idCategoria = item.id;
      this.getRegalos();
    },
    changeList(){
      this.list = false;
      this.gift = true;
    },
    async deleteCategoria(item) {
      try {
        await db
          .collection("categoriaRegalos")
          .doc(item.id)
          .delete();
        Swal.fire(
          "¡Eliminado!",
          "¡esta categoria de evento de elimino con exito! c:"
        );
      } catch (error) {
        alert(error);
      } finally {
        this.getDatos();
      }
    },
   limpiar2() {
      this.vista = 1;
      this.vistaPrevia2 = null;
    },
recortarImagen2() {
      this.cropper = new Cropper(this.$refs.imagenOriginal2, {
        preview: this.$refs.vistaPrevia2,
        aspectRatio: (1,1),
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

    async addRegalo1() {
      if(this.regalo.categoria !=""&&this.regalo.nombre!=""&&this.regalo.precio!=""&& this.vista==2){
let id = uuidv4();


    let canvas = this.cropper.getCroppedCanvas();
      let imagen = canvas.toDataURL("image/jpeg");

      try {
        let ref = storage.ref();
        let resultado = await ref
          .child(`Regalos/${this.regalo.categoria}/${id}.jpg`)
          .putString(imagen, "data_url");
        let url = await resultado.ref.getDownloadURL();

        let regalo = {
        id,
        urlImagen: url,
        categoria: this.regalo.categoria,
        nombre: this.regalo.nombre,
        precio: this.regalo.precio
      };
      try {
        await db
          .collection("categoriaRegalos")
          .doc(this.regalo.idCategoria)
          .collection("RegalosCat")
          .doc(id)
          .set(regalo);
      } catch (error) {
      } finally {
        this.limpiar();
        this.getRegalos();
      }
      
    
     }catch(error){

     }
      }else{
         Swal.fire({
  icon: 'error',
  title: 'Ohoooo ',
  text: 'has intentado guardar un Regalo sin todos los datos necesarios.',
})
      }

    },

    closeList(){

      this.buscar = null
      this.list = false
    },

    pickFile() {
      this.$refs.image.click();
    },



    async getDatos() {
      try {
        this.ArrayCategoria = [];
        await db
          .collection("categoriaRegalos")
          .get()
          .then(snapshot => {
            snapshot.forEach(doc => {
              this.ArrayCategoria.push(doc.data());
            });
          });
      } catch (error) {
        alert(error);
      }
    },
    async getRegalos() {
      this.ArrayRegalos = [];
      try {
        await db
          .collection("categoriaRegalos")
          .doc(this.regalo.idCategoria)
          .collection("RegalosCat")
          .get()
          .then(snapshot => {
            snapshot.forEach(doc => {
              this.ArrayRegalos.push(doc.data());

             this.cantidadderegalos  = this.ArrayRegalos.length
            });
          });
      } catch (error) {
        alert(error);
      }
    },
    limpiar(){
       this.regalo.nombre = "";
        this.regalo.precio = "";
        this.regalo.imagen = "";
        this.imageName = "";
        this.imageUrl = "";
           this.vista = 1;
      this.vistaPrevia2 = null;
    }
  }
};
</script>

<style>
</style>