<template>
  <v-container class="fondo" fluid fill-height>
    <v-layout justify-center>
      <v-flex class="d-none d-sm-flex">
        <v-img :src="require('@/assets/fondo.jpg')">
          <!--campo verificacion email-->
          <v-container fill-height>
            <v-layout align-center justify-center>
              <v-flex xs8 sm6 md5 lg4 xl2>
                <v-card class="elevation-3">
                  <v-toolbar  dark card dense >
                    <v-toolbar-title>Página no encontrada...</v-toolbar-title>
                  </v-toolbar>

                  <v-card-text>
                    <span>Verifica que la dirección de correo sea válida.</span>
                  </v-card-text>
                  <v-card-actions>
                    <v-card>
                      <v-btn color="#FF5252" dark @click="login()">Volver</v-btn>
                    </v-card>
                  </v-card-actions>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-img>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {

  methods: {
    login(){
      this.$router.push({ name: 'login'})
    },
  },

}
</script>
