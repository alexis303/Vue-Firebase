<template>
  <v-container class="fondo" fluid fill-height>
    <v-layout justify-center>
      <v-flex class="d-none d-sm-flex">
        <v-img :src="require('@/assets/fondo.jpg')">
          <!--campo verificacion email-->
          <v-container fill-height>
            <v-layout align-center justify-center>
              <v-flex xs12 sm8 md6 lg6 xl4>
                <v-card class="elevation-3">
                  <v-toolbar color="success" dark card dense >
                    <v-toolbar-title>Confirma tu dirección de correo</v-toolbar-title>
                  </v-toolbar>

                  <v-card-text>
                    <span>Te hemos enviado un correo de verificación a la dirección especificada.</span>
                  </v-card-text>

                  <v-card-actions>
                    <v-card>
                      <v-btn color="#431fc7" dark @click="reenviarEmail()">Reenviar Email</v-btn>
                    </v-card>

                    <v-spacer></v-spacer>

                    <v-card>
                      <v-btn color="#FF5252" dark @click="enviandoLogin()">Volver al Login</v-btn>
                    </v-card>
                  </v-card-actions>
                </v-card>
              </v-flex>
            </v-layout>
           <v-snackbar v-model="notificar.visible" dark :color="notificar.color" :timeout="3000" top>
             {{notificar.mensaje}}
              <v-btn @click="notificar.visible = false" text >
                Cerrar
              </v-btn>
           </v-snackbar>
          </v-container>
        </v-img>
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script>
import { auth } from "@/firebase";

export default {
  data() {
    return {
      
    }
  },
  methods: {
    async reenviarEmail() {
      try {
        await auth.currentUser.sendEmailVerification();

          let notificar ={
            mensaje:"Se envio un correo de verificación de cuenta",
            visible:true
          }

        this.$store.commit('notificacionInfo',notificar);
         
     
      } catch (error) {
           let notificar ={
            mensaje:"Ocurrio un error mientras se reenviaba el correo, intentelo mas tarde",
            visible:true
          }

        this.$store.commit('notificacionError',notificar);
      }
    },
    enviandoLogin() {
      this.$router.push({ name: "login" });
    },
  },
  computed: {
    notificar() {
      return this.$store.state.notificar;
    }
  }
};
</script>

<style>
.Titulo {
  align-content: center;
  color: #ffffff;
  font-size: 1.1rem;
}
</style>
