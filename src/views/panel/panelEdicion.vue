<template>
  <v-layout>
 <v-flex>
      <v-card flat >
          <v-img aspect-ratio="1.7" height="300" :src="edit.fotoPortada">
        <v-layout text-center align-center justify-center wrap fill-height>
          <v-flex xs12>
            <h1 color="primary" class="mb-2 text--white merienda bs">{{edit.Titulo}}</h1>
            <p class="subtitle-1 text--white merienda bs">{{edit.descripcion}}</p>
          </v-flex>
        </v-layout>
      </v-img>
      </v-card>
      <v-card>
            <v-card-title>
        Gestion Pagina Principal
        <div class="flex-grow-1"></div>
      </v-card-title>
          <v-container>

            <v-row>
              
          <v-col
                  cols="12"
                  md="7"
              >
                <v-text-field
                  label="Titulo"
                  v-model="edit.Titulo"
                  maxlength="35"
                />
              </v-col>
                     <v-col  cols="12" md="4">
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
             
                    <v-icon class="mx-2" :color="edit.colors">fa-palette</v-icon>
                
            <v-text-field
              v-model="edit.colors"
              label="Color"
              persistent-hint
              v-on="on"
            >
            </v-text-field>
       </v-layout>
              
          </template>
             <v-color-picker
                    class="ma-2"
                    v-model="edit.colors"
                    :mode.sync="mode"
                    show-swatches
                    swatches-max-height="300px"
                    hide-inputs
                    @input="colorP = false"
                  ></v-color-picker>
      
        </v-menu>
   
                </v-col>
            

              <v-col  cols="12"
                      md="12">
                <v-textarea
                  outlined
                  class="purple-input"
                  label="Mensaje"
                  v-model="edit.descripcion"
                      maxlength="190"
                />
              </v-col>        

             <v-col  cols="12" md="7">
                <v-col
                >
                <span>Subir Foto de Portada</span>
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
                  <v-layout row wrap>
                      <v-btn @click="limpiar2()">cancelar imagen</v-btn>
                  <v-spacer></v-spacer>
                  <v-btn @click="guradarsolofoto()">guardar Imagen</v-btn>
                  </v-layout>

                </v-col>

            
              

               </v-col>
      
                     <v-col cols="12" class="text-right" >
                <v-btn color="success" @click="save()">
                  GUARDAR
                </v-btn>
              </v-col>
                         </v-row>
          </v-container>
<v-card flat>
    <v-layout text-center class="mt-4">
        <v-flex xs12>
          <v-card flat>
            <h2 class="display-1 font-weight-thin">{{datos[0].titulomensaje}}</h2>
            <v-layout align-center justify-center>
              <div class="hr-title"></div>
            </v-layout>
            <p class="pt-2">{{datos[0].mensaje}}</p>

            <v-layout wrap align-center justify-center>
              <v-flex xs12>
                <v-card flat :color="edit.colors" dark>
                  <v-layout wrap>
                    <v-flex xs12 md6>
                      <v-parallax height="300" :src="edit.fotoConocenos"></v-parallax>
                    </v-flex>
                    <v-flex xs12 md6>
                      <v-card-text>{{edit.conocenos}}</v-card-text>
                    </v-flex>
                  </v-layout>
                </v-card>
              </v-flex>
            </v-layout>
          </v-card>
        </v-flex>
        
      </v-layout>
          <v-card-title>
        Gestion Pagina Principal Conocenos.
        <div class="flex-grow-1"></div>
      </v-card-title>


<v-card flat>
  <v-container>
    <v-row>
       <v-col
                  cols="12"
                  md="4"
              >
                <v-text-field
                  label="Titulo"
                  v-model="edit.titulomensaje"
                  maxlength="50"
                />
              </v-col>
        <v-col
                  cols="12"
                  md="8"
              >
                <v-text-field
                  label="Sub Titulo"
                  v-model="edit.mensaje"
                  maxlength="120"
                />
              </v-col>

       <v-col  cols="12"
                      md="12">
                <v-textarea
                  outlined
                  class="purple-input"
                  label="Mensaje"
                  v-model="edit.conocenos"
                   maxlength="750"
                />
              </v-col>
              
                <v-col cols="12" md="6">
                <span>Subir Foto de Portada</span>
                  <file-pond
                    v-if="vistaX == 1"
                    @addfile="cargarImagen3"
                    instant-upload="false"
                    fileValidateTypeLabelExpectedTypes="Se esperaba {allButLastType} o {lastType}"
                    labelFileTypeNotAllowed="Agrega una imagen .png o .jpg"
                    accepted-file-types="image/jpeg, image/png"
                    label-idle="Selecciona o arrastra una imagen..."
                  ></file-pond>
                  <v-responsive v-if="vistaX == 2">
                    <img
                      ref="imagenOriginal3"
                      src
                      alt
                      class="edicionImagen"
                    />
                  </v-responsive>
                  <v-layout row wrap>
                      <v-btn @click="limpiar3()">cancelar imagen</v-btn>
                  <v-spacer></v-spacer>
                  <v-btn @click="guradarsolofoto3()">guardar Imagen</v-btn>
                  </v-layout>
              </v-col>
              <v-col cols="12" class="text-right" >
                <v-btn color="success" @click="save()">
                  GUARDAR
                </v-btn>
              </v-col>
              
    </v-row>
  </v-container>
</v-card>

</v-card>
      
      </v-card>
 
    <v-card flat>
      <v-footer padless>
        <v-card flat width="100%" tile class="white--text text-center" :color="edit.colors">
          <v-card-text >
       <v-layout align-center justify-center>
         <v-flex >
                <v-btn  v-for="I in datosFooter" :key="I.id" class="mx-4 white--text" icon>
              <v-icon size="24px">{{I.icons}}</v-icon>
            </v-btn>
         </v-flex>
       </v-layout>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-text class="white--text">
            {{ new Date().getFullYear() }} —
            <strong>{{edit.tituloFooter}}</strong>
          </v-card-text>
        </v-card>
      </v-footer>



               <v-card-title>
        Gestion Pagina Principal Footer.
        <div class="flex-grow-1"></div>
      </v-card-title>
<v-container>
    <v-row>
       <v-col
                  cols="12"
                  md="8"
              >
                <v-text-field
                  label="Titulo"
                  v-model="edit.tituloFooter"
                  maxlength="50"
                />
              </v-col>
              
       <v-col
                  cols="12"
                  md="4"
              >
           
           <v-btn @click="agregarIcon()">Agregar Iconos</v-btn>
              </v-col>

       <v-dialog
         v-model="agregaI"
         max-width="1000px"
         transition="dialog-transition"
       >
         <v-card>
      <v-card-title>
      Agrega o eliminja un Icono
        <div class="flex-grow-1"></div>
      </v-card-title>

           <v-container>
             <v-row> 

 <v-col
                  cols="12"
                  md="3"
              >
                <v-text-field
                  label="Agrega un icono"
                  v-model="Iconoredes"
                  maxlength="50"
                />
   <v-flex xs1 class="mt-4">
                        <v-tooltip v-model="show" right max-width="400">
                          <template v-slot:activator="{ on }">
                            <v-btn href="https://fontawesome.com/icons?d=gallery" icon v-on="on">
                              <v-icon color="grey lighten-1">fa-info-circle</v-icon>
                            </v-btn>
                          </template>
                          <span> si no sabes de donde sacar este dato prueba ingresar a https://fontawesome.com/icons?d=gallery</span>
                        </v-tooltip>
                      </v-flex>
              </v-col>
               <v-col cols="12"
                  md="3"
              >
 <v-menu
       
          v-model="colorF"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          full-width
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
       <v-layout row wrap>
             
                    <v-icon class="mx-2" :color="coloricono">fa-palette</v-icon>
                
            <v-text-field
              v-model="coloricono"
                label="Agrega un color al icono"
              persistent-hint
              v-on="on"
            >
            </v-text-field>
       </v-layout>
              
          </template>
             <v-color-picker
                    class="ma-2"
                    v-model="coloricono"
                    :mode.sync="mode"
                    show-swatches
                    swatches-max-height="300px"
                    hide-inputs
                    @input="colorF = false"
                  ></v-color-picker>
      
        </v-menu>
              </v-col>
                   <v-col
                  cols="12"
                  md="6"
              >
                <v-text-field
                  label="Agrega la URL de este icono"
                  v-model="rutaiconp"
                />
              </v-col>
             </v-row>  
             
           </v-container>


                   <v-card-text>
          <v-simple-table>
          

<v-layout >
    <v-flex >
        <v-card>
               <v-data-table :headers="headers" :items="datosFooter" >

                <template v-slot:item.action="{item}">
                  <v-icon medium title="Eliminar Ciudad" @click="eliminaricon(item)">fa-trash-alt</v-icon>
                </template>
              </v-data-table>
        </v-card>
    </v-flex>
</v-layout>

          </v-simple-table>
          <v-layout row wrap justify-end class="mt-3">
                <v-btn color="blue"  text @click="agregaI = false">Cancel</v-btn>
                <v-btn color="blue"  text @click="subirRedessocciales()">Guardar</v-btn>
          </v-layout>
        </v-card-text>

         </v-card>


       </v-dialog>
                 </v-row>
  </v-container>

    </v-card>

    </v-flex>

  </v-layout>

</template>
<script>
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

import Home from "@/views/PaginaPrincipal.vue";
import { auth, db, storage } from "@/firebase";
import { mapActions, mapState } from "vuex";

import vueFilePond from "vue-filepond";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import "filepond/dist/filepond.min.css";

import Cropper from "cropperjs/dist/cropper";
import "cropperjs/dist/cropper.css";

import uuidv4 from "uuid/v4";

const FilePond = vueFilePond(FilePondPluginFileValidateType);

export default {
  components: { Home },
  name: "PanelEDI",
  data() {
    return {
      edit: {
        Titulo: '',
        descripcion: ''
      },
      Iconoredes:'',
       rutaiconp:'',
       tituloFooter:'',
       coloricono:'',
      vista: 1,
      vistaX: 1,
      mode: 'hexa',
      color: '',
      editarD: false,
      agregaI:false,
      datosFooter:[],
      datos: [],
      headers: [
       { text: "ID", value: "idRedes" },
        { text: "COLOR", value: "coloricon" },
       { text: "ICONO", value: "icons" },
       { text: "URL ", value: "url" },
        { text: "ACCIONES ", value: "action" }
      ],

    }
  },
  methods: {
    recortarImagen2() {
      this.cropper = new Cropper(this.$refs.imagenOriginal2, {
        preview: this.$refs.vistaPrevia2,
        aspectRatio: NaN,
        modal: false,
        guides: true,
        sized: true,
        zoomable: true,
        highlight: true,
        background: false,
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
        aspectRatio: NaN,
        modal: false,
        guides: true,
        sized: true,
        zoomable: true,
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
    limpiar2() {
      this.vista = 1;
      this.vistaPrevia2 = null;
    },
      limpiar3() {
      this.vistaX = 1;
      this.vistaPrevia3 = null;
    },
    
    async Principal() {
      this.datos = [];
      try {
        let resultado = await db.collection("PagPrincipal")
          .get();

        resultado.docs.forEach(doc => {
          this.datos.push(doc.data());



        });
   this.edit = Object.assign({},  this.datos[0])

      } catch (error) {

      }

    },
    CargarDatos() {
     
      this.editarD = true
    },

    async guradarsolofoto() {
      if(this.vista == 1){
        Swal.fire(
  'No se Guarda tu foto?',
  'Agrega una primero',
  'question'
)

      }else{

        let canvas = this.cropper.getCroppedCanvas();
      let imagen = canvas.toDataURL("image/jpeg");
      let fotoId = uuidv4();
      try {
        let ref = storage.ref();
        let resultado = await ref
          .child(`Principal/principal.jpg`)
          .putString(imagen, "data_url");
        let url = await resultado.ref.getDownloadURL();
        await db.collection('PagPrincipal')
          .doc(this.edit.idPag)
          .update({

            fotoPortada: url
          });


      }
      catch (error) {
         Swal.fire({
  icon: 'error',
  title: 'Ohoooo edit ocurrido un error inesperado',
  text: 'Ocurrió un error actualizando tus datos.',
})
      }
      finally {
                Swal.fire({
  icon: 'success',
  title: 'se edit cargado la imagen de Principal',
  showConfirmButton: false,
  timer: 1500
})
        this.Principal();
      };

      }
    },

    async guradarsolofoto3() {

if(this.vistaX == 1){

Swal.fire(
  'No se Guarda tu foto?',
  'Agrega una primero',
  'question'
)

}else{

     let canvas = this.cropperx.getCroppedCanvas();
      let imagen = canvas.toDataURL("image/jpeg");
      let fotoId = uuidv4();
      try {
        let ref = storage.ref();
        let resultado = await ref
          .child(`Principal/conosenos.jpg`)
          .putString(imagen, "data_url");
        let url = await resultado.ref.getDownloadURL();
        await db.collection('PagPrincipal')
          .doc(this.edit.idPag)
          .update({

            fotoConocenos: url
          });


      }
      catch (error) {
       Swal.fire({
  icon: 'error',
  title: 'Ohoooo edit ocurrido un error inesperado',
  text: 'Ocurrió un error actualizando tus datos.',
})
      }
      finally {

        Swal.fire({
  icon: 'success',
  title: 'se edit cargado la imagen de Conocenos',
  showConfirmButton: false,
  timer: 1500
})
        this.Principal();
      };
}





    },

        async FooterPrincipal() {
      this.datosFooter = [];
      try {
        let resultado = await db.collection("PagPrincipal")
                                       .doc('f7Yu5r4qrnida8WytKkr')
                                 .collection("Footer")
                                 .get();

        resultado.docs.forEach(doc => {
          this.datosFooter.push(doc.data());



        });

      } catch (error) {

      }

    },
    agregarIcon(){
    this.agregaI= true
    },

async subirRedessocciales() {
        let idRedes = uuidv4();
        try {
            let preR = {
              idRedes,
              coloricon: this.coloricono,
              icons: this.Iconoredes,
              url: this.rutaiconp
            };
            await db
            .collection("PagPrincipal")
                  .doc('f7Yu5r4qrnida8WytKkr')
            .collection("Footer")
            .doc(idRedes)
            .set(preR);
  this.FooterPrincipal()
  this.coloricono=''
  this.Iconoredes=''
  this.rutaiconp=''

         let notificacion = {
          visible: true,
          mensaje: "Se agregó con éxito.",
          color: "success"
        };

        this.$store.commit("notificacionExito", notificacion);
        this.cerrar()
       
    
       
      } catch (error) {
        let notificacion = {
          visible: true,
          mensaje: "Error al agregar ",
          color: "error"
        };
        this.$store.commit("notificacionError", notificacion);
      } 
    },

 async eliminaricon(item) {
      Swal.fire({
        title: `Estas seguro de eliminar `,
        text: "Una vez eliminado no se podra recuperar",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Aceptar"
      }).then(result => {
        if (result.value) {
          Swal.fire(
            "Se a eliminado Correctamente ",
          
            "success"
          ) &&
                       db.collection("PagPrincipal")
                       .doc('f7Yu5r4qrnida8WytKkr')
                        .collection("Footer")
                        .doc(item.idRedes)
                        .delete();
        }
         this.FooterPrincipal();
      });   
    },


    async save() {

      try {

        await db.collection('PagPrincipal')
              .doc(this.edit.idPag)
          .update({
            Titulo: this.edit.Titulo,
            colors: this.edit.colors,
            descripcion: this.edit.descripcion,
            conocenos: this.edit.conocenos,
            titulomensaje: this.edit.titulomensaje,
            mensaje :this.edit.mensaje,
            tituloFooter: this.edit.tituloFooter,

          });
          this.limpiar2()
          this.limpiar3()
          this.editarD = false
          Swal.fire({

  icon: 'success',
  title: 'Los datos han sido cargados correctamente',
  showConfirmButton: false,
  timer: 1500
})

      }
      catch (error) {
            Swal.fire({
  icon: 'error',
  title: 'Ohoooo edit ocurrido un error inesperado',
  text: 'Ocurrió un error actualizando tus datos.',
})
      }
      finally {
        this.Principal();

      };


      this.close()

    },
  },
  created() {
    this.Principal();
    this.FooterPrincipal();
  },




}
</script>
<style >
.edicionImagen {
  width: 92%;
}


</style>