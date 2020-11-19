<template>
  <v-container fill-height fluid mt-12>
    <v-row justify="center" v-model="editarNombresApellidoFechaTag">
      <v-col cols="12" md="12">
        <material-card class="v-card-profile">
          <v-layout align-center justify-center>
            <v-hover>
              <template v-slot:default="{ hover }">
                <v-card
                  flat
                  style=" top: -44px;
    margin-bottom: -24px; border-radius: 100px; "
                  height="150"
                >
                  <img
                    :src="usuario.fotoPerfil"
                    style=" border-radius: 100px;"
                    width="150"
                    height="150"
                  />
                  <v-fade-transition>
                    <v-overlay v-if="hover" absolute color="#036358">
                      <v-btn @click="cambiarFoto = true" color="white" outlined icon x-large>
                        <v-icon>fa-camera</v-icon>
                      </v-btn>
                    </v-overlay>
                  </v-fade-transition>
                </v-card>
              </template>
            </v-hover>
          </v-layout>

          <v-dialog v-model="cambiarFoto" max-width="1200">

            <v-card>

              <v-layout wrap justify-center align-center fill-height>


                    <v-col cols="12" md="6">
                     
                <v-flex xs12 pr-2>
                  <v-card>
                    <v-toolbar color="primary" dark card>
                      <samp v-if="vista==1">Foto de Perfil Actual</samp>
                      <samp v-if="vista==2">Vista Previa</samp>
                    </v-toolbar>
                    <v-card-text>
                      <v-layout justify-center>
                        <v-img v-show="vista == 1" :src="usuario.fotoPerfil" alt="Foto de Perfil"></v-img>
                        <div v-show="vista == 2" ref="vistaPrevia" class="vistaPrevia"></div>
                      </v-layout>
                    </v-card-text>
                    <v-layout v-show="vista == 2" justify-center>
                      <v-flex xs3>
                        <v-btn @click="limpiar" fab small dark color="error">
                          <v-icon>fa-times</v-icon>
                        </v-btn>
                      </v-flex>
                      <v-flex xs3>
                        <v-btn fab small @click="guardarImagen" color="success">
                          <v-icon>fa-check</v-icon>
                        </v-btn>
                      </v-flex>
                    </v-layout>
                  </v-card>
                </v-flex>
                    </v-col>


      <v-col cols="12" md="6">
                           <v-flex xs12>
                  <v-card flat >

                    <v-tabs color="primary" dark icons-and-text>
                      <v-tab>
                        Subir Foto Perfil
                        <v-icon>mdi-apple-icloud</v-icon>
                      </v-tab>
                      <v-tab-item>
                        <file-pond
                          v-if="vista == 1"
                          @addfile="cargarImagen"
                          instant-upload="false"
                          fileValidateTypeLabelExpectedTypes="Se esperaba {allButLastType} o {lastType}"
                          labelFileTypeNotAllowed="Agrega una imagen .png o .jpg"
                          accepted-file-types="image/jpeg, image/png"
                          label-idle="Selecciona o arrastra una imagen..."
                        ></file-pond>
                        <v-responsive v-if="vista == 2">
                          <img ref="imagenOriginal" src alt class="edicionImagen" />
                        </v-responsive>
                      </v-tab-item>
                      <v-tab v-if="fotosPerfil.length > 0">
                        Galería
                        <v-icon>mdi-camera-retake-outline</v-icon>
                      </v-tab>
                      <v-tab-item v-if="fotosPerfil.length > 0">
                        <v-layout wrap justify-start>
                          <v-flex xs6 sm6 lg4 v-for="foto in fotosPerfil" :key="foto.id">
                            <v-card class="ma-3">
                              <v-card-text>
                                <v-img :src="foto.url" alt="Foto Perfil"></v-img>
                                <v-layout class="mt-3">
                                  <v-flex xs6>
                                    <v-layout justify-start>
                                      <v-icon
                                        v-if="foto.url == usuario.fotoPerfil"
                                        color="green"
                                        medium
                                      >fa-check-circle</v-icon>
                                      <v-icon
                                        v-else
                                        color="grey"
                                        @click="seleccionarFotoPerfil(foto.url)"
                                        medium
                                      >fa-check-circle</v-icon>
                                    </v-layout>
                                  </v-flex>
                                  <v-flex xs6>
                                    <v-layout justify-end>
                                      <v-icon
                                        v-if="foto.url != usuario.fotoPerfil"
                                        medium
                                        @click="preguntarEliminarImagen(foto)"
                                      >fa-trash</v-icon>
                                    </v-layout>
                                  </v-flex>
                                </v-layout>
                              </v-card-text>
                            </v-card>
                          </v-flex>
                        </v-layout>
                        <v-dialog v-model="preguntaEliminar" max-width="400" persistent>
                          <v-card>
                            <v-card-text
                              class="title"
                            >La foto se eliminará permanentemente, ¿Deseas Continuar?</v-card-text>
                            <v-btn color="secondary" flat @click="preguntaEliminar = false">Cancelar</v-btn>
                            <v-btn flat @click="eliminarImagen">Eliminar</v-btn>
                          </v-card>
                        </v-dialog>
                      </v-tab-item>
                    </v-tabs>
                  </v-card>
                </v-flex>
                    </v-col>


          
              </v-layout>
            </v-card>
          </v-dialog>

          <v-card-text class="text-center">
            <h6 class="overline mb-3">{{usuario.cargo}}</h6>

            <h4
              class="font-weight-light"
            >{{usuario.nombres}} {{usuario.apellido1}} {{usuario.apellido2}}</h4>

            <p
              class="font-weight-light"
            >Don't be scared of the truth because we need to restart the human foundation in truth And I love you like Kanye loves Kanye I love Rick Owens’ bed design but the back is...</p>

            <v-btn @click="solicitudPassword = true" color="success">Cambiar contaraseña</v-btn>
          </v-card-text>
        </material-card>

        <v-dialog v-model="solicitudPassword" max-width="400" persistent>
          <v-card>
            <v-toolbar color="primary" dark card>
              <v-toolbar-title>Restablecer Contraseña</v-toolbar-title>
            </v-toolbar>
            <v-card-text
              class="subheading"
            >Ingresa la dirección de email con la cual te registraste.</v-card-text>
            <v-card-text>
              <v-text-field
                disabled
                label="Email"
                autofocus
                v-model="email"
                :error-messages="erroresEmailEnvio"
                @blur="$v.email.$touch()"
              ></v-text-field>
            </v-card-text>

            <v-card-text>
              <v-layout>
                <v-flex xs6>
                  <v-layout justify-start>
                    <v-btn @click="solicitudPassword = false">Cancelar</v-btn>
                  </v-layout>
                </v-flex>
                <v-flex xs6>
                  <v-layout justify-end>
                    <v-btn
                      color="secondary"
                      @click="enviarSolicitudPassword"
                      :depressed="$v.email.$invalid"
                      :disabled="$v.email.$invalid"
                    >Enviar</v-btn>
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-col>
      <v-col cols="12" md="8">
        <material-card color="green" title="Edit Profile" text="Complete your profile">
          <v-form>
            <v-container class="py-0">
              <v-layout wrap column>
                <v-flex xs5 md4 lg4>
                  <v-text-field
                    outlined
                    label="Nombre"
                    v-model="f2.nombres"
                    :error-messages="erroresNames"
                    @blur="$v.f2.nombres.$touch()"
                  />
                </v-flex>

                <v-flex xs5 md4 lg4>
                  <v-text-field
                    outlined
                    :error-messages="erroresApellido1"
                    @blur="$v.f2.apellido1.$touch()"
                    v-model="f2.apellido1"
                    label="Apellido Paterno"
                  />
                </v-flex>

                <v-flex xs5 md4 lg4>
                  <v-text-field
                    outlined
                    :error-messages="erroresApellido2"
                    @blur="$v.f2.apellido2.$touch()"
                    v-model="f2.apellido2"
                    label="Apellido Materno"
                  />
                </v-flex>

                <v-flex cols="12" class="text-right">
                  <v-btn
                    color="#4caf50"
                    @click="guardarNombresApellidoFechaTag"
                    :disabled="$v.f2.$invalid"
                    dark
                    class="mb-12"
                  >Actualizar Perfil</v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </v-form>
        </material-card>
      </v-col>
      <div></div>
    </v-row>
  </v-container>
</template>

<script>
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

import { nombreCompuesto } from "@/utilidades/validaciones.js";
import {
  required,
  email,
  minLength,
  maxLength
} from "vuelidate/lib/validators";
import { mapMutations, mapState, mapGetters } from "vuex";
import { auth, db, storage } from "@/firebase";
import vueFilePond from "vue-filepond";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import "filepond/dist/filepond.min.css";

import Cropper from "cropperjs/dist/cropper";
import "cropperjs/dist/cropper.css";

import uuidv4 from "uuid/v4";

const FilePond = vueFilePond(FilePondPluginFileValidateType);

export default {
  components: { FilePond },
  data() {
    return {
      fotosPerfil: [],
      vista: 1,
      cropper: null,
      email: "",
      solicitudPassword: false,
      cambiarFoto: false,
      preguntaEliminar: false,

      f2: {
        nombres: "",
        apellido1: "",
        apellido1: "",
        rut: ""
      }
    };
  },

  created() {
    this.consultarFotosPerfil();
  },
  computed: {
    ...mapState({ usuario: state => state.usuario }),

    editarNombresApellidoFechaTag() {
      this.f2.nombres = this.usuario.nombres;
      this.f2.apellido1 = this.usuario.apellido1;
      this.f2.apellido2 = this.usuario.apellido2;
      this.email = this.usuario.email;
    },

    erroresEmailEnvio() {
      let errores = [];
      if (!this.$v.email.$dirty) {
        return errores;
      }
      if (!this.$v.email.required) {
        errores.push("Ingresa tu email.");
      }
      if (!this.$v.email.email) {
        errores.push("Ingresa un email válido.");
      }
      return errores;
    },

    erroresNames() {
      let errores = [];
      if (!this.$v.f2.nombres.$dirty) {
        return errores;
      }
      if (!this.$v.f2.nombres.required) {
        errores.push("Ingrese un nombre");
      }
      if (!this.$v.f2.nombres.nombreCompuesto) {
        errores.push("Ingrese un nombre valido");
      }
      if (!this.$v.f2.nombres.minLength) {
        errores.push("Ingresa al menos 3 caracteres.");
      }
      if (!this.$v.f2.nombres.maxLength) {
        errores.push("Ingreso máximo de 15 caracteres.");
      }
      if (!this.$v.f2.nombres.nombreCompuesto) {
        errores.push("Ingresa un nombre válido.");
      }

      return errores;
    },

    erroresApellido1() {
      let errores = [];
      if (!this.$v.f2.apellido1.$dirty) {
        return errores;
      }
      if (!this.$v.f2.apellido1.required) {
        errores.push("Ingrese un apellido Paterno");
      }
      if (!this.$v.f2.apellido1.minLength) {
        errores.push("Ingresa al menos 3 caracteres.");
      }
      if (!this.$v.f2.apellido1.maxLength) {
        errores.push("Ingreso máximo de 15 caracteres.");
      }
      if (!this.$v.f2.apellido1.nombreCompuesto) {
        errores.push("Ingresa un apellido Paterno válido.");
      }
      return errores;
    },
    erroresApellido2() {
      let errores = [];
      if (!this.$v.f2.apellido2.$dirty) {
        return errores;
      }
      if (!this.$v.f2.apellido2.required) {
        errores.push("Ingrese un apellido Materno");
      }
      if (!this.$v.f2.apellido2.minLength) {
        errores.push("Ingresa al menos 3 caracteres.");
      }
      if (!this.$v.f2.apellido2.maxLength) {
        errores.push("Ingreso máximo de 15 caracteres.");
      }
      if (!this.$v.f2.apellido2.nombreCompuesto) {
        errores.push("Ingresa un apellido Materno válido.");
      }

      return errores;
    }
  },

  validations: {
    email: {
      required,
      email
    },

    f2: {
      nombres: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(15),
        nombreCompuesto
      },
      apellido1: {
        minLength: minLength(3),
        maxLength: maxLength(15),
        nombreCompuesto,
        required
      },
      apellido2: {
        minLength: minLength(3),
        maxLength: maxLength(15),
        nombreCompuesto,
        required
      }
    }
  },

  methods: {
    ...mapMutations(["actualizarFotoPerfil", "actualizarNombresApellidos"]),

    async enviarSolicitudPassword() {
      this.solicitudPassword = false;

      let ocupado = {
        visible: true,
        mensaje:
          "Enviando Solicitud', mensaje: 'Enviando solicitud de restablecimiento de constraseña..."
      };

      try {
        await auth.sendPasswordResetEmail(this.email);
        this.mostrarExito(
          "Se ha enviado la solicitu de restablecimiento de contraseña."
        );
      } catch (error) {
        this.mostrarError("Ocurrió un error enviando la solicitud.");
      } finally {
        this.$store.commit("mostrarOcupado", ocupado);
      }
    },

    async consultarFotosPerfil() {
        this.$store.state.vista32 = 1;
      this.fotoPerfil = [];

      try {
        let resultado = await db
          .collection("Usuarios")
          .doc(this.usuario.uid)
          .collection("fotos-perfil")
          .orderBy("fecha", "desc")
          .get();

        resultado.docs.forEach(doc => {
          this.fotosPerfil.push(doc.data());
        });
      } catch (error) {
        this.mostrarError("Ocurrió un error recuperando tu galería de fotos.");
      } finally {
      }
    },

    async seleccionarFotoPerfil(url) {
Swal.fire({
  position: 'top-end',
  icon: 'success',
  title: 'cargando foto seleccionada',
  showConfirmButton: false,
  timer: 1500
})
      try {
        await db
          .collection("Usuarios")
          .doc(this.usuario.uid)
          .update({ fotoPerfil: url });

        this.actualizarFotoPerfil(url);
      } catch (error) {
        this.mostrarError("Ocurrió un error seleccionando la imagen.");
      } finally {
        this.ocultarOcupado();
      }
    },

    async guardarNombresApellidoFechaTag() {
      if (
        this.f2.nombres == this.usuario.nombres &&
        this.f2.apellido1 == this.usuario.apellido1 &&
        this.f2.apellido2 == this.usuario.apellido2
      ) {
     Swal.fire({
  position: 'top-end',
  icon: 'info',
  text: 'Los datos son iguales no hay nececidad de guardarlos',
  showConfirmButton: false,
  timer: 1500
})
      }

      try {
        await db
          .collection("Usuarios")
          .doc(this.usuario.uid)
          .update({
            nombres: this.f2.nombres,
            apellido1: this.f2.apellido1,
            apellido2: this.f2.apellido2
          });

        this.actualizarNombresApellidos({
          nombres: this.f2.nombres,
          apellido1: this.f2.apellido1,
          apellido2: this.f2.apellido2
        });
      } catch (error) {
        this.mostrarError("Ocurrió un error actualizando tus datos.");
      } finally {
     Swal.fire({
  icon: 'success',
  text: 'Estamos guardando tus nombres y apellidos...',
  showConfirmButton: false,
  timer: 1500
})
      }
    },

    cargarImagen(error, archivo) {
      if (error) {
            Swal.fire({
  icon: 'error',
  title: 'Oops...',
  text: 'Pues a ocurrido un error no definido',
  showConfirmButton: false,
  timer: 1500
})
        return;
      }

      this.vista = 2;

      let reader = new FileReader();

      let vm = this;

      reader.onloadend = () => {
        vm.$refs.imagenOriginal.src = reader.result;
        vm.recortarImagen();
      };

      if (archivo) {
        if (archivo.file) {
          reader.readAsDataURL(archivo.file);
        }
      }
    },

    recortarImagen() {
      this.cropper = new Cropper(this.$refs.imagenOriginal, {
        preview: this.$refs.vistaPrevia,
        aspectRatio: 1,
        modal: false,
        guides: true,
        sized: false,
        zoomable: false,
        highlight: true,
        background: false,
        autoCrop: true
      });
    },

    async guardarImagen() {
 
      if (this.fotosPerfil.length < 4) {
        this.fotosPerfil = [];
        let canvas = this.cropper.getCroppedCanvas();
        let imagen = canvas.toDataURL("image/jpeg");
        let fotoId = uuidv4();

        try {
          let ref = storage.ref();
          let resultado = await ref
            .child(`Usuarios/${this.usuario.uid}/fotos-perfil/${fotoId}.jpg`)
            .putString(imagen, "data_url");

          let url = await resultado.ref.getDownloadURL();

          let fotoPerfil = {
            fotoId,
            fecha: new Date(),
            url,
            uid: this.usuario.uid
          };

          await db
            .collection("Usuarios")
            .doc(this.usuario.uid)
            .collection("fotos-perfil")
            .doc(fotoId)
            .set(fotoPerfil);

          await db
            .collection("Usuarios")
            .doc(this.usuario.uid)
            .update({ fotoPerfil: url });

          this.actualizarFotoPerfil(url);
          this.consultarFotosPerfil();
        } catch (error) {
 Swal.fire({
  icon: 'error',
  title: 'Oops...',
  text: 'Lo sentimos ha ocurrido un error inesperado',
})
        } finally {
          Swal.fire({
  icon: 'success',
  text: 'Tu foto se a guardado correctamente ',
  showConfirmButton: false,
  timer: 1500
})
        }
      } else {   
Swal.fire({
  icon: 'error',
  title: 'Oops...',
  text: 'Lo sentimos tienes un max de 4 imagenes para guardar elimina alguna para continuar',
})
      }
    },
    limpiar() {
      this.vista = 1;
      this.vistaPrevia = null;
    },

    preguntarEliminarImagen(foto) {
      this.fotoEliminar = foto;
      this.preguntaEliminar = true;
    },
    async eliminarImagen() {
      this.preguntaEliminar = false;

      try {
        await db
          .collection("Usuarios")
          .doc(this.usuario.uid)
          .collection("fotos-perfil")
          .doc(this.fotoEliminar.fotoId)
          .delete();

        await storage
          .ref()
          .child(
            `Usuarios/${this.usuario.uid}/fotos-perfil/${this.fotoEliminar.fotoId}.jpg`
          )
          .delete();

        let index = this.fotosPerfil.indexOf(this.fotoEliminar);
        this.fotosPerfil.splice(index, 1);
      } catch (error) {
        this.mostrarError("Ocurrió un error eliminando la imagen.");
      } finally {
        this.ocultarOcupado();
      }
    }
  }
};
</script>
<style>
.filepond--drop-label {
  font-size: 14pt !important;
}

.edicionImagen {
  width: 92%;
}

.vistaPrevia {
  width: 500px;
  height: 600px;
  overflow: hidden;
}
</style>
