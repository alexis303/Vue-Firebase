<template>
  <v-container class="fondo" fluid fill-height>
    <v-layout justify-end>
      <v-flex class="d-none d-sm-flex" sm5 md8 lg9 xl9>
        <v-img :src="require('@/assets/boda.jpg')"></v-img>
      </v-flex>

      <v-flex xs12 sm7 md4 lg3 xl3>
        <v-card class="fondo-login" tile>
          <v-card-text>
            <div class="text-center">
              <v-avatar>
                <img src="https://vuetifyjs.com/apple-touch-icon-180x180.png" alt="avatar" />
              </v-avatar>
            </div>
          </v-card-text>
          <v-card-text>
            <div class="blanco">
              <h2>Nueva Contraseña</h2>
            </div>
          </v-card-text>
        <v-snackbar v-model="notificar.visible" :color="notificar.color" :timeout="3000" dark top>
          {{notificar.mensaje}}
          <v-btn text @click="notifica.visible = false">
            Cerrar
          </v-btn>
        </v-snackbar>

          <v-card-text dark>
            <div class="blanco">
              <h4>Ingresa una nueva Contraseña para {{ email }}</h4>
            </div>
          </v-card-text>

          <div>
            <v-card-text>
              <v-text-field
                v-model="f1.password"
                :error-messages="erroresPassword"
                @blur="$v.f1.password.$touch"
                type="password"
                label="Contraseña"
                outlined
                dark
              ></v-text-field>
              <v-text-field
                v-model="f1.passwordConfirm"
                :error-messages="erroresPasswordConfirm"
                @blur="$v.f1.passwordConfirm.$touch"
                type="password"
                label="Confirmar Contraseña"
                outlined
                dark
              ></v-text-field>
            </v-card-text>
            <v-card-text>
              <v-btn
                color="#431fc7"
                :disabled="$v.f1.$invalid"
                @click="cambiarPassword"
                dark
                block
              >Aceptar</v-btn>
            </v-card-text>
          </div>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { auth } from "@/firebase";
import {
  required,
  minLength,
  maxLength,
  sameAs
} from "vuelidate/lib/validators";
 
export default {
  data() {
    return {
      actionCode: "",
      email: "",
      f1: {
        password: "",
        passwordConfirm: ""
      }
    };
  },
  validations: {
    f1: {
      password: {
        required,
        minLength: minLength(6),
        maxLength: maxLength(12)
      },
      passwordConfirm: {
        required,
        sameAsPassword: sameAs("password")
      }
    }
  },
  computed: {
    erroresPassword() {
      let errores = [];
      if (!this.$v.f1.password.$dirty) {
        return errores;
      }
      if (!this.$v.f1.password.required) {
        errores.push("Ingresa una contraseña");
      }
      if (!this.$v.f1.password.minLength) {
        errores.push("Ingresa una contraseña de al menos 6 caracteres");
      }
      if (!this.$v.f1.password.maxLength) {
        errores.push("Ingresa una contraseña de como máximo 12 caracteres");
      }

      return errores;
    },
    erroresPasswordConfirm() {
      let errores = [];
      if (!this.$v.f1.passwordConfirm.$dirty) {
        return errores;
      }
      if (!this.$v.f1.passwordConfirm.required) {
        errores.push("La confirmacion de contraseña es requerida");
      }

      if (!this.$v.f1.passwordConfirm.sameAsPassword) {
        errores.push("Las contraseñas ingresadas no coinciden");
      }

      return errores;
    },
    notificar() {
      return this.$store.state.notificar;
    }
  },

  methods: {
    async validar() {
      let mode = this.$route.query.mode;
      this.actionCode = this.$route.query.oobCode;

      switch (mode) {
        case "verifyEmail":
          try {
            await auth.applyActionCode(this.actionCode);
            let notificar = {
              mensaje:
                "Email validado con Éxito. ingresa tus credenciales para continuar.",
              visible: true
            };

            this.$store.commit("notificacionExito", notificar);

            setTimeout(() => {
              this.$router.push({ name: "login" });
            }, 3000);

          } catch (error) {
            let notificar = {
              mensaje: "Error al validar tu dirección de Email.",
              visible: true
            };

            this.$store.commit("notificacionError", notificar);
          }

          break;
        case "resetPassword":
          try {
            this.email = await auth.verifyPasswordResetCode(this.actionCode);

               let notificar = {
              mensaje: "Se le envio un Email para autorizar el cambio de contraseña",
              visible: true
            };

            this.$store.commit("notificacionInfo", notificar);

          } catch (error) {

            let notificar = {
              mensaje: "No fue posible leer el código de restablecimiento de contraseña",
              visible: true
            };

            this.$store.commit("notificacionError", notificar);

          }
          break;
      }
    },

    register() {
      this.$router.push({ name: "register" });
    },
    async cambiarPassword() {
      try {
        await auth.confirmPasswordReset(this.actionCode, this.f1.password);
        
            let notificar = {
              mensaje: "Contraseña cambiada exitosamente :D",
              visible: true
            };

            this.$store.commit("notificacionExito", notificar);

            setTimeout(() => {
               this.$router.push({ name: "login" });
            }, 3000);

      } catch (error) {

          let notificar = {
              mensaje: "No fue posible cambiar la contraseña :c ,Intente mas tarde",
              visible: true
            };

            this.$store.commit("notificacionError", notificar);

            setTimeout(() => {
               this.$router.push({ name: "login" });
            }, 3000);

      }
    }
  },
  created() {
    this.validar();
  }
};
</script>