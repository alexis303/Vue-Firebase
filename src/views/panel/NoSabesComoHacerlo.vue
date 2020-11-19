  <template>
  <v-card flat>
     <v-snackbar dark v-model="notificar.visible" :color="notificar.color" top  :timeout="10000">
          {{notificar.mensaje}}
          <v-btn text @click="notificar.visible = false">Cerrar</v-btn>
        </v-snackbar>
    <v-card flat v-for="a in datos" :key="a.id">
      
      <v-card flat :color="a.colors" dark >
         <v-container fluid id="pasos" class="white--text" >
      <v-layout text-center>
        <v-flex xs12 >
          <h2 class="mt-10 display-1 font-weight-thin">¿No sabes cómo hacerlo?</h2>
          <v-layout align-center justify-center>
            <div class="hr-title"></div>
          </v-layout>
          <p class="pt-2">Conoce los pasos para utilizar nuestro servicio.</p>
        </v-flex>
        
      </v-layout>

      <v-layout align-center justify-center wrap class="mb-10">
        <v-flex xs12>
           
            <v-layout v-if="vista == 1"  row>
                <v-flex v-for="i in pasosfestejado" :key="i.id"  md3>
                <v-layout class="mt-5" align-center justify-center text-center column>
                    <v-avatar size="15vh" >
                    <img :src="i.fotoDescripcion" alt="John" />
                    </v-avatar>
                    <p>{{i.descripcion}}</p>
                    <v-layout>
                      <v-btn @click="EditFestejado(i)"><v-icon>fa-pen</v-icon></v-btn>
                    <v-btn @click="EliminarFestejado(i)"><v-icon>fa-trash</v-icon></v-btn>
                    </v-layout>
                    
                </v-layout>
                </v-flex>
            </v-layout>

          <v-layout v-if="vista == 1"  row>
              <v-btn @click="dialog=true" dark class="mt-5 mb-5" fab color="orange">
                <v-icon>fa-plus</v-icon>
              </v-btn>
          </v-layout>



          <v-layout v-if="vista == 2"  row>
            <v-flex v-for="item in pasosinvitado" :key="item.id" md3>
              <v-layout align-center justify-center text-center column>
                <v-avatar size="20vh" class="ma-4">
                  <img :src="item.fotoDescripcion" alt="John" />
                </v-avatar>
                <p>{{item.descripcion}}</p>
                <v-layout>
                      <v-btn @click="EditInvitado(item)"><v-icon>fa-pen</v-icon></v-btn>
                    <v-btn @click="EliminarInvitado(item)"><v-icon>fa-trash</v-icon></v-btn>
                    </v-layout>
              </v-layout>
            </v-flex>
          </v-layout>

          <v-layout v-if="vista == 2"  row>
              <v-btn @click="dialogInvitado=true" dark class="mt-5 mb-5" fab color="orange">
                <v-icon>fa-plus</v-icon>
              </v-btn>
          </v-layout>


          <v-layout text-center align-center justify-center>
            <v-flex xs12 sm6>
              <v-layout justify-end>
                <v-btn
                  elevation="0"
                  class="mt-4 mr-4"
                  width="20vh"
                  color="primary"
                  @click="actualizarPasos(-1)"
                >Festejado</v-btn>
              </v-layout>
            </v-flex>

            <v-flex xs12 sm6>
              <v-layout justify-start>
                <v-btn
                  elevation="0"
                  class="mt-4 ml-4"
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
  

     
   <!-- ****************************** MODAL´S DE FESTEJADOS********************************* -->

  </v-card>
      <!--  ----------------------- DIALOG AGREGAR NO SABES COMO HACERLO ------------------ -->
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
                <v-textarea v-model="f1.TituloNSCH" outlined label="Descripción"></v-textarea>
              </v-flex>
              <v-flex xs11>
                <v-text-field type="number" v-model="f1.posicion" outlined label="Posicion"></v-text-field>
              </v-flex>
                 <v-flex xs11 class="mt-5">
                <file-pond
                  v-if="vista2 == 1"
                  @addfile="cargarImagen2"
                  instant-upload="false"
                  fileValidateTypeLabelExpectedTypes="Se esperaba {allButLastType} o {lastType}"
                  labelFileTypeNotAllowed="Agrega una imagen .png o .jpg"
                  accepted-file-types="image/jpeg, image/png"
                  label-idle="Selecciona o arrastra una imagen..."
                ></file-pond>
                <v-responsive v-if="vista2 == 2">
                  <img ref="imagenOriginal2" src alt class="edicionImagen" />
                </v-responsive>
                <v-btn @click="limpiar()">cancelar imagen</v-btn>
              </v-flex>
            </v-layout>
          </v-card-text>

          <v-card-text>
            <v-layout justify-end>
              <v-btn color="red" @click="cerrar()" dark class="ma-2">Cancelar</v-btn>
              <v-btn color="success" @click="subirDatos()" dark class="ma-2" >Agregar</v-btn>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-layout>
    </v-dialog>


     <!--  ----------------------- DIALOG EDITAR NO SABES COMO HACERLO ------------------ -->
   <v-dialog persistent v-model="dialog2" max-width="600">
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
                <v-textarea v-model="f1Edit.TituloNSCH" outlined label="Descripción"></v-textarea>
              </v-flex>
              <v-flex xs11>
                <v-text-field type="number" v-model="f1Edit.posicion" outlined label="Posicion"></v-text-field>
              </v-flex>
               
            </v-layout>
          </v-card-text>

          <v-card-text>
            <v-layout justify-end>
              <v-btn color="red" @click="cerrar2()" dark class="ma-2">Cancelar</v-btn>
              <v-btn color="success" @click="subirEditarDatosFestejados()" dark class="ma-2" >Agregar</v-btn>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-layout>
    </v-dialog>




  <!-- ***************************** MODAL´S DE INVITADOS****************************** -->

   <!--  ----------------------- DIALOG AGREGAR NO SABES COMO HACERLO (INVITADO) ------------------ -->
   <v-dialog persistent v-model="dialogInvitado" max-width="600">
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
                <v-textarea v-model="f2.TituloNSCH" outlined label="Descripción"></v-textarea>
              </v-flex>
              <v-flex xs11>
                <v-text-field type="number" v-model="f2.posicion" outlined label="Posición"></v-text-field>
              </v-flex>
                 <v-flex xs11 class="mt-5">
                <file-pond
                  v-if="vista3 == 2"
                  @addfile="cargarImagen2INVITADO"
                  instant-upload="false"
                  fileValidateTypeLabelExpectedTypes="Se esperaba {allButLastType} o {lastType}"
                  labelFileTypeNotAllowed="Agrega una imagen .png o .jpg"
                  accepted-file-types="image/jpeg, image/png"
                  label-idle="Selecciona o arrastra una imagen..."
                ></file-pond>
                <v-responsive v-if="vista3 ==3">
                  <img ref="imagenOriginal2INVITADO" src alt class="edicionImagen" />
                </v-responsive>
                <v-btn @click="limpiarINVITADO()">cancelar imagen</v-btn>
              </v-flex>
            </v-layout>
          </v-card-text>

          <v-card-text>
            <v-layout justify-end>
              <v-btn color="red" @click="cerrarINVITADO()" dark class="ma-2">Cancelar</v-btn>
              <v-btn color="success" @click="subirDatosInvitado()" dark class="ma-2" >Agregar</v-btn>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-layout>
    </v-dialog>


     <!--  ----------------------- DIALOG EDITAR NO SABES COMO HACERLO (INVITADO) ------------------ -->
   <v-dialog persistent v-model="dialogInvitado2" max-width="600">
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
                <v-textarea v-model="f2Edit.TituloNSCH" outlined label="Descripción"></v-textarea>
              </v-flex>
              <v-flex xs11>
                <v-text-field type="number" v-model="f2Edit.posicion" outlined label="Posición"></v-text-field>
              </v-flex>
               
            </v-layout>
          </v-card-text>

          <v-card-text>
            <v-layout justify-end>
              <v-btn color="red" @click="cerrarInvitado2()" dark class="ma-2">Cancelar</v-btn>
              <v-btn color="success" @click="subirEditarDatosInvitados()" dark class="ma-2" >Agregar</v-btn>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-layout>
    </v-dialog>



  
   
   </v-card>
</template>

  <script>
import Home from "@/views/PaginaPrincipal.vue";
import { auth, db, storage } from "@/firebase";
import { mapActions, mapState, mapMutations } from "vuex";
let catRef = db.collection("PagPrincipal").doc("f7Yu5r4qrnida8WytKkr").collection("pasosaSeguir");



import vueFilePond from "vue-filepond";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import "filepond/dist/filepond.min.css";
import Cropper from "cropperjs/dist/cropper";
import "cropperjs/dist/cropper.css";
import uuidv4 from "uuid/v4";
const FilePond = vueFilePond(FilePondPluginFileValidateType);



export default {
  name:"PrincipalHOME",
  data() {
    return {
      
    f1:{
      TituloNSCH:"",
      posicion:""
    },
    f1Edit:{
      TituloNSCH:"",
      posicion:"",
      fotoDescripcion:"",
      fotoId:""
    },
    f2:{
      TituloNSCH:"",
      posicion:""
    },
    f2Edit:{
      TituloNSCH:"",
      posicion:"",
      fotoDescripcion:"",
      fotoId:""
    },
    

      popout: false,
      focusable: false,
      datos:[],
      desserts: [],
      vista: 1,
      vista2: 1,
      vista3: 2,
      evento: null,
      dialog: false,
      dialog2: false,
      dialogInvitado: false,
      dialogInvitado2: false,
      eventos: [],

      pasosfestejado: [],
      pasosinvitado: [],     
    };
  },
  created() {
    
    
    this.Principal();
    
    this.PrincipalPasosFestejados();
    this.PrincipalPasosInvitados();
  },
  computed: {
     ...mapState(["evento", "ocupado", "notificar"]),
  },
  
  methods: {

   limpiar() {
      this.vista2 = 1;
      this.vistaPrevia2 = null;
    },

    limpiarINVITADO() {
      this.vista3 = 2;
      this.vistaPrevia3 = null;
    },
    cerrar(){
      this.f1.TituloNSCH=""
      this.f1.posicion=""
      this.vista2 = 1
      this.vistaPrevia2 = null
      this.dialog = false
    },
    cerrar2(){
      this.dialog2 = false
    },

   
    cerrarInvitado2(){
      this.dialogInvitado2 = false
    },

    cerrarINVITADO(){
     
      this.f2.TituloNSCH=""
      this.f2.posicion=""
      this.vista3 = 2
      this.vistaPrevia3 = null
       this.dialogInvitado = false
    },


    // ---------------------------------------- EDITAR FESTEJADO NO SABES COMO HACERLO -------------------------------------

   async EditFestejado(i, f1Edit){
      this.dialog2= i
      this.dialog2=true
      this.f1Edit.TituloNSCH = i.descripcion;
      this.f1Edit.posicion = i.id;
      this.f1Edit.fotoId = i.fotoId;
      this.f1Edit.fotoDescripcion = i.fotoDescripcion
    },

      subirEditarDatosFestejados(){
        console.log(this.f1Edit.TituloNSCH)

       try {
        let PasosaSeguir = {
          descripcion: this.f1Edit.TituloNSCH,
          id: this.f1Edit.posicion,
          fotoId: this.f1Edit.fotoId,
          fotoDescripcion: this.f1Edit.fotoDescripcion
        };

        db.collection("PagPrincipal")
          .doc("f7Yu5r4qrnida8WytKkr")
          .collection("pasosaSeguir")
          .doc(this.f1Edit.fotoId)
          .set(PasosaSeguir);

        

        let notificacion = {
          visible: true,
          mensaje: "Se editó con éxito.",
          color: "success"
        };
        this.cerrar2()
        this.$store.commit("notificacionExito", notificacion);
       this.PrincipalPasosFestejados();
        
      } catch (error) {
        let notificacion = {
          visible: true,
          mensaje: "Error al editar.",
          color: "error"
        };
        this.$store.commit("notificacionError", notificacion);
      }



    },


    // ---------------------------------------- AGREGAR FESTEJADO NO SABES COMO HACERLO -------------------------------------

    async subirDatos(){
         let canvas = this.cropper.getCroppedCanvas();
      let imagen = canvas.toDataURL("image/jpeg");
      let fotoId = uuidv4();

        try {
        let ref = storage.ref();
        let resultadox = await ref
          .child(`Principal/f7Yu5r4qrnida8WytKkr/NoSabesComoHacerlo/${fotoId}.jpg`)
          .putString(imagen, "data_url");

        let url = await resultadox.ref.getDownloadURL();

        let fotoPerfil = {
          fotoId,
          fotoDescripcion: url,
          descripcion: this.f1.TituloNSCH,
          id: this.f1.posicion
        
        };

        await db
          .collection("PagPrincipal")
          .doc("f7Yu5r4qrnida8WytKkr")
          .collection("pasosaSeguir")
          .doc(fotoId)
          .set(fotoPerfil);

        let notificacion = {
          visible: true,
          mensaje: "Se agregó  con éxito.",
          color: "success"
        };
        this.$store.commit("notificacionExito", notificacion);
        this.cerrar()
         this.PrincipalPasosFestejados();
         
      } catch (error) {
        let notificacion = {
          visible: true,
          mensaje: "Error al agregar.",
          color: "error"
        };
        this.$store.commit("notificacionError", notificacion);
      }



    },

  
// ----------------------------- ELIMINAR NO SABES COMO HACERLO (FESTEJADO)-----------

EliminarFestejado(i){
   
      let ref = storage.ref();
      console.log(i.fotoId)
      let fotoRef = ref.child(
        `Principal/f7Yu5r4qrnida8WytKkr/NoSabesComoHacerlo/${i.fotoId}.jpg`
      );

      try {
        fotoRef.delete();
        db.collection("PagPrincipal")
          .doc("f7Yu5r4qrnida8WytKkr")
          .collection("pasosaSeguir")
          .doc(i.fotoId)
          .delete();

        let notificacion = {
          visible: true,
          mensaje: "Se eliminó con éxito.",
          color: "success"
        };
        this.PrincipalPasosFestejados();

        this.$store.commit("notificacionExito", notificacion);
      } catch (error) {
        let notificacion = {
          visible: true,
          mensaje: "Error al eliminar.",
          color: "error"
        };
        this.$store.commit("notificacionError", notificacion);
      }

},

// ---------------------------------------- AGREGAR INVITADO NO SABES COMO HACERLO -------------------------------------

    async subirDatosInvitado(){
         let canvas = this.cropper.getCroppedCanvas();
      let imagen = canvas.toDataURL("image/jpeg");
      let fotoId = uuidv4();

        try {
        let ref = storage.ref();
        let resultadox = await ref
          .child(`Principal/f7Yu5r4qrnida8WytKkr/NoSabesComoHacerlo/SeccionInvitado/${fotoId}.jpg`)
          .putString(imagen, "data_url");

        let url = await resultadox.ref.getDownloadURL();

        let fotoPerfil = {
          fotoId,
          fotoDescripcion: url,
          descripcion: this.f2.TituloNSCH,
          id: this.f2.posicion
        
        };

        await db
          .collection("PagPrincipal")
          .doc("f7Yu5r4qrnida8WytKkr")
          .collection("pasosaSeguirInvitado")
          .doc(fotoId)
          .set(fotoPerfil);

        let notificacion = {
          visible: true,
          mensaje: "Se agregó  con éxito.",
          color: "success"
        };
        this.$store.commit("notificacionExito", notificacion);
         this.PrincipalPasosInvitados();
         this.cerrarINVITADO()
      } catch (error) {
        let notificacion = {
          visible: true,
          mensaje: "Error al agregar.",
          color: "error"
        };
        this.$store.commit("notificacionError", notificacion);
      }



    },




// ----------------------------- ELIMINAR NO SABES COMO HACERLO (INVITADO)-----------

EliminarInvitado(item){


  
   
      let ref = storage.ref();
      console.log(item.fotoId)
      let fotoRef = ref.child(
        `Principal/f7Yu5r4qrnida8WytKkr/NoSabesComoHacerlo/SeccionInvitado/${item.fotoId}.jpg`
      );

      console.log(fotoRef)
      try {
        fotoRef.delete();
        db.collection("PagPrincipal")
          .doc("f7Yu5r4qrnida8WytKkr")
          .collection("pasosaSeguirInvitado")
          .doc(item.fotoId)
          .delete();

        let notificacion = {
          visible: true,
          mensaje: "Se eliminó con éxito.",
          color: "success"
        };
        this.PrincipalPasosInvitados();
        
        this.$store.commit("notificacionExito", notificacion);
      } catch (error) {
        let notificacion = {
          visible: true,
          mensaje: "Error al eliminar.",
          color: "error"
        };
        this.$store.commit("notificacionError", notificacion);
      } 

},

 // ---------------------------------------- EDITAR INVITADO NO SABES COMO HACERLO -------------------------------------

   async EditInvitado(item, f2Edit){
      this.dialogInvitado2= item
      this.dialogInvitado2=true
      this.f2Edit.TituloNSCH = item.descripcion;
      this.f2Edit.posicion = item.id;
      this.f2Edit.fotoId = item.fotoId;
      this.f2Edit.fotoDescripcion = item.fotoDescripcion
    },

      subirEditarDatosInvitados(){
        console.log(this.f2Edit.TituloNSCH)

       try {
        let PasosaSeguir = {
          descripcion: this.f2Edit.TituloNSCH,
          id: this.f2Edit.posicion,
          fotoId: this.f2Edit.fotoId,
          fotoDescripcion: this.f2Edit.fotoDescripcion
        };

        db.collection("PagPrincipal")
          .doc("f7Yu5r4qrnida8WytKkr")
          .collection("pasosaSeguirInvitado")
          .doc(this.f2Edit.fotoId)
          .set(PasosaSeguir);

        

        let notificacion = {
          visible: true,
          mensaje: "Se editó con éxito.",
          color: "success"
        };
        
        this.$store.commit("notificacionExito", notificacion);
       this.PrincipalPasosInvitados();
        this.cerrarInvitado2()
      } catch (error) {
        let notificacion = {
          visible: true,
          mensaje: "Error al editar.",
          color: "error"
        };
        this.$store.commit("notificacionError", notificacion);
      }



    },





// **********************************************************

    
  async Principal() {
    this.datos=[];
    this.pasosfestejado=[]
      try {
        let resultado = await db.collection("PagPrincipal")
                                .get();

        resultado.docs.forEach(doc => {
          this.datos.push(doc.data());
        });
              
        
      } catch (error) {
       
      }

    },


    async PrincipalPasosFestejados() {
      this.pasosfestejado=[]
      try {
        let resultado = await db.collection("PagPrincipal")
                                .doc("f7Yu5r4qrnida8WytKkr")
                                .collection("pasosaSeguir")
                                .orderBy("id", "asc")
                                .get();

        resultado.docs.forEach(doc => {
          this.pasosfestejado.push(doc.data());
        });
              
        
      } catch (error) {
       
      }

    },


    async PrincipalPasosInvitados() {
      
       this.pasosinvitado= []
      try {
        let resultado = await db.collection("PagPrincipal")
                                .doc("f7Yu5r4qrnida8WytKkr")
                                .collection("pasosaSeguirInvitado")
                                .orderBy("id", "asc")
                                .get();

        resultado.docs.forEach(doc => {
          this.pasosinvitado.push(doc.data());
          console.log(doc.data())
        });
      } catch (error) {
       
      }
    },

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
      this.vista2 = 2;
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

// --------------------------------------------

     recortarImagen2INVITADO() {
      this.cropper = new Cropper(this.$refs.imagenOriginal2INVITADO, {
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

    cargarImagen2INVITADO(error, archivo) {
      if (error) {
        this.mostrarError("Ocurrió un error leyendo la imagen.");
        return;
      }
      this.vista3 = 3;
      let reader = new FileReader();
      let vm = this;
      reader.onloadend = () => {
        vm.$refs.imagenOriginal2INVITADO.src = reader.result;
        vm.recortarImagen2INVITADO();
      };
      if (archivo) {
        if (archivo.file) {
          reader.readAsDataURL(archivo.file);
        }
      }
    },


   

    actualizarPasos(pasos) {
      this.vista += pasos;

      if (this.vista > 2) {
        this.vista = 2;
      } else if (this.vista < 1) {
        this.vista = 1;
      }
    },
   

    
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
</style>