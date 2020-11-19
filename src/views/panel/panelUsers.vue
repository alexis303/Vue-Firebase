<template>
  <v-layout align-center justify-center>
    <v-flex xs12>
      <v-card color="red" height="100px" v-if="rango =='user'"></v-card>

      <v-container v-if="rango == 'admin'" fill-height fluid grid-list-xl></v-container>

      <v-container fill-height fluid grid-list-xl>
        <v-row justify="center">
          <v-col cols="12">
            <material-card color="green" title="Usuarios">
              <v-card-title>
                Usuarios En el sistema
                <div class="flex-grow-1"></div>
                <v-text-field
                  v-model="search"
                  append-icon="mdi-table-search"
                  label="Buscar"
                  single-line
                  hide-details
                ></v-text-field>
              </v-card-title>

              <v-data-table :headers="headers" :items="personal" :search="search">
                <template v-slot:item.fotoPerfil="{item}">
                  <v-avatar>
                    <v-img :src="item.fotoPerfil"></v-img>
                  </v-avatar>
                </template>

                <template v-slot:item.action="{item}">
                  <v-icon medium class="mr-2" @click="datosdelapersona(item)">fa-user-edit</v-icon>

                  <v-icon medium @click="deleteItem(item)">fa-trash-alt</v-icon>
                </template>
              </v-data-table>
            </material-card>
          </v-col>
          <v-dialog v-model="editardatosuser" max-width="700px">
            <v-card>
              <v-card-title>
                <span class="headline">EDITAR DATOS DE USUARIO</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" md="4">
                      <v-text-field label="Nombre" v-model="edit.nombres" />
                    </v-col>

                    <v-col cols="12" md="4">
                      <v-text-field label="Apellido Paterno" v-model="edit.apellido1" />
                    </v-col>
                    <v-col cols="12" md="4">
                      <v-text-field label="Apellido Materno" v-model="edit.apellido2" />
                    </v-col>

                    <v-col cols="12" sm="6" md="4">
                      <v-text-field label="Email" v-model="edit.email" />
                    </v-col>

                    <v-col cols="12" sm="6" md="4">
                      <v-text-field label="Foto de Perfil" v-model="edit.fotoPerfil" />
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-layout align-center>
                        <v-switch
                          class="mx-2"
                          v-model="edit.cargo"
                          v-for="rango in datosRango"
                          :key="rango.id"
                          :label="rango.nombre"
                          :value="rango.nombre"
                        ></v-switch>
                      </v-layout>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <div class="flex-grow-1"></div>
                <v-btn color="blue darken-1" text @click="editardatosuser = false">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="save()">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>
      </v-container>
    </v-flex>
  </v-layout>
</template>
<script>
import { auth, db, firebase } from "@/firebase";
import { mapMutations, mapGetters, mapState } from "vuex";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
export default {
  name: "Usuarios",
  data() {
    return {
      menu: false,
      edit: {
        nombres: "",
        apellido1: "",
        apellido2: "",
        cargo: "",
        email: "",
        fotoPerfil: ""
      },

      defaultItem: {
        nombres: "",
        apellido1: "",
        apellido2: "",
        cargo: "",
        email: "",
        fotoPerfil: ""
      },

      fotosPerfilUser: [],
      vista: 1,
      editardatosuser: false,
      fechaNacimiento: null,
      show2: false,
      fechaMaxima: null,
      cargo: "user",
      datosRango: [],

      submitStatus: null,

      search: "",

      personal: [],

      headers: [
        { text: "foto de Perfil", value: "fotoPerfil" },
        { text: "RUN", value: "rut" },
        { text: "NOMBRE", value: "nombres" },
        { text: "APELLIDO PATERNO", value: "apellido1" },
        { text: "APELLIDO MATERNO", value: "apellido2" },
        { text: "CARGO", value: "cargo" },
        { text: "CORREO", value: "email" },
        { text: "ACCIONES ", value: "action" }
      ]
    };
  },

  computed: {
    rango() {
      if (this.usuario && this.usuario.cargo == "admin") {
        return "admin";
      } else if (this.usuario && this.usuario.cargo == "user") {
        return "user";
      } else this.usuario && this.usuario.cargo == "anonimo";

      return "anonimo";
    },

    ...mapState(["usuario"]),
    ...mapGetters("sesion", ["saludo"])
  },
  created() {
    this.consultarPersonal();
    this.consultarCargo();
  },
  methods: {
    ...mapMutations([
      "mostrarOcupado",
      "ocultarOcupado",
      "mostrarExito",
      "mostrarError",
      "mostrarAdvertencia"
    ]),

    datosdelapersona(item) {
      this.edit = Object.assign({}, item);
      this.editardatosuser = true;
    },

    async consultarCargo() {
      try {
        let docs = await db.collection("cargo").get();

        docs.forEach(doc => {
          this.datosRango.push(doc.data());
        });

        if (this.datosRango.length == 0) {
          this.mostrarAdvertencia("No hay rangos disponibles en el momento.");
        }
      } catch (error) {
        this.mostrarError(
          "Ocurrió un error consultando los rangos. Inténtalo más tarde."
        );
      }
    },
    async consultarPersonal() {
      this.personal =[];
      try {
        let docs = await db
          .collection("Usuarios")
          .where("oculto", "==", "false")
          .get();

        docs.forEach(doc => {
          this.personal.push(doc.data());
        });

        if (this.personal.length == 0) {
          this.mostrarAdvertencia("No hay personal disponibles en el momento.");
        }
      } catch (error) {
        this.mostrarError(
          "Ocurrió un error consultando los personal. Inténtalo más tarde."
        );
      }
    },

    async deleteItem(item) {
      Swal.fire({
        title: `Estas seguro de eliminar a ${item.nombres} ${item.apellido1}`,
        text: "Una vez eliminado no se podra recuperar",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Aceptar"
      }).then(result => {
        if (result.value) {
          Swal.fire(
            "Se a eliminado Correctamente al Usuario!",
            `${item.nombres} ${item.apellido1} ${item.apellido2}`,
            "success"
          ) &&
            db
              .collection("Usuarios")
              .doc(item.uid)
              .delete();
        }
           this.consultarPersonal();
      });   
    },

    async save() {
      this.personal = [];
      try {
        await db
          .collection("Usuarios")
          .doc(this.edit.uid)
          .update({
            nombres: this.edit.nombres,
            apellido1: this.edit.apellido1,
            apellido2: this.edit.apellido2,
            fotoPerfil: this.edit.fotoPerfil,
            email: this.edit.email,
            cargo: this.edit.cargo
          });
      } catch (error) {
        this.mostrarError("Ocurrió un error actualizando tus datos.");
      } finally {
        Swal.fire({
          icon: "success",
          text: "Los datos han sido actualizados correctamente",
          showConfirmButton: false,
          timer: 1500
        });
        this.editardatosuser = false
      }

      this.consultarPersonal();
    },

    close() {
      this.editardatosuser = false;
      setTimeout(() => {
        this.edit = Object.assign({}, this.defaultItem);
      }, 300);
    }
  }
};
</script>

<style >
</style>
