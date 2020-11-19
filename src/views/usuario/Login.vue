 <template>
  <v-container class="fondo" fluid fill-height>
    <v-layout justify-end>
      <v-flex class="d-none d-sm-flex" sm7 md7 lg9 xl9>
        <v-img :src="require('@/assets/fondo.jpg')"></v-img>
      </v-flex>
      <v-flex xs12 sm5 md5 lg3 xl3>
        <v-card class="fondo-login" tile>
          <v-card-text>
            <div class="text-center">
              <v-avatar>
                <img src="https://vuetifyjs.com/apple-touch-icon-180x180.png" alt="avatar" />
              </v-avatar>
            </div>
          </v-card-text>
          <v-card-text>
            <v-text-field v-model="login.email" :error-messages="erorresEmail" @blur="$v.login.email.$touch" label="Correo Electronico" outlined dark></v-text-field>
            <v-text-field v-model="login.password" @keyup.enter="ingresar" :error-messages="erroresPassword" @blur="$v.login.password.$touch" label="Contraseña"  type="password" outlined dark></v-text-field>
            <v-checkbox dark label="¿Recordar cuenta?"></v-checkbox>
            <span>
              <a href="#" @click="solicitudPassword = true">¿Olvidate tu contraseña?</a>
            </span>
          </v-card-text>
          <v-card-text>
            <v-btn color="#431fc7" :disabled="$v.login.$invalid" @click="ingresar()" dark app block>Iniciar Sesión</v-btn>
            <v-btn color="error" dark app block class="mt-3" :to="{name: 'principal'}" >cancelar</v-btn>
          </v-card-text>

          <v-card-text>
            <v-layout justify-center>
              <v-btn color="#431fc7" dark class="mr-1" @click="registrarFacebook()">
                <v-icon>fab fa-facebook-square</v-icon>
              </v-btn>
              <v-btn color="error" dark class="ml-1" @click="registrarGoogle()">
                <v-icon>fab fa-google</v-icon>
              </v-btn>       
            </v-layout>
          </v-card-text>
          <v-card-text class="ml-4">
            
            <span class="blanco">
              ¿No tienes una cuenta?
              <router-link :to="{name:'register'}" >registrate</router-link>
            </span>
          </v-card-text>
        </v-card>

                             <!-- MODAL PARA RECUPERAR CONTRASEÑA -->
        <v-dialog v-model="solicitudPassword" max-width="400" persistent>
          <v-card color="#222222">
            <v-toolbar  dark card>
              <v-toolbar-title>
                Reestrablecer Contraseña
              </v-toolbar-title>
            </v-toolbar>   
            <span>  </span>

            <v-card-text class="mt-3" >
              <span class="subheading subTitulo"  align-center justify-center>
                Ingresa la dirección de email con la cual te registraste.
              </span>
            </v-card-text>
 
            <v-card-text>
             <v-text-field label="Email" outlined color="#0099ff" dark  v-model="emailEnvio" :error-messages="erroresEmailEnvio" @blur="$v.emailEnvio.$touch()"></v-text-field>
            </v-card-text>    
            
            <v-card-text >
              <v-layout>
                 <v-flex  xs6>
                  <v-layout justify-start>
                    <v-btn color="#431fc7" dark @click="enviarSolicitudPassword" :disabled="$v.emailEnvio.$invalid">Enviar</v-btn>
                  </v-layout>
                </v-flex>
                <v-flex xs6>
                  <v-layout  justify-end>
                    <v-btn dark @click="solicitudPassword = false" color="primary">Cancelar</v-btn>
                  </v-layout>
                </v-flex>
               
              </v-layout>
            </v-card-text>
          </v-card>
        </v-dialog>
        <v-dialog v-model="ocupado.visible" hide-overlay persistent width="500">
            <v-card>
              <v-toolbar color="primary" dark class="mb-5">
                <v-toolbar-title>{{ocupado.titulo}}</v-toolbar-title>
              </v-toolbar>
              <v-card-text class="mb-4">{{ocupado.mensaje}}</v-card-text>
              <v-progress-linear indeterminate></v-progress-linear>
            </v-card>
          </v-dialog>
        <v-snackbar v-model="notificar.visible" :color="notificar.color" top dark :timeout="10000">
          {{notificar.mensaje}} 

          <v-btn text @click="notificar.visible = false" >Cerrar</v-btn>
        </v-snackbar>


      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { required,email,minLength,maxLength } from 'vuelidate/lib/validators'; 
import { firebase, auth, db } from "@/firebase";
import { mapMutations, mapGetters, mapState } from 'vuex'
export default {
  data() {
    return{
      login:{
         email:'',
      password:''
      },
      solicitudPassword: false,
      emailEnvio: ''
    }
  },

  validations:{
    login:{
       email:{
        required,
        email
      },
      password:{
        required,
        minLength:minLength(6),
        maxLength:maxLength(12)
      }
    }
    ,
      emailEnvio:{
        required,
        email
      }

  },
   computed:{
     //---------------//
    erorresEmail(){
      let errores= [];
      if(!this.$v.login.email.$dirty){return errores}
      if(!this.$v.login.email.required){errores.push('Ingresa tu correo electronico.')}
      if(!this.$v.login.email.email){errores.push('Ingresa un correo electronico válido')}
      return errores;

    },
    erroresEmailEnvio(){
      let errores= [];
      if(!this.$v.emailEnvio.$dirty){return errores}
      if(!this.$v.emailEnvio.required){errores.push('Ingresa tu correo electronico.')}
      if(!this.$v.emailEnvio.email){errores.push('Ingresa un correo electronico válido')}
      return errores;

    },
    erroresPassword(){
      let errores=[];
      if(!this.$v.login.password.$dirty){return errores}
      if(!this.$v.login.password.required){errores.push('Ingresa una contraseña')}
      if(!this.$v.login.password.minLength){errores.push('Ingresa una contraseña de al menos 6 caracteres')}
      if(!this.$v.login.password.maxLength){errores.push('Ingresa una contraseña de como máximo 12 caracteres')}

      return errores;
    },
    notificar(){
        return this.$store.state.notificar;
      },
      ocupado(){
         return this.$store.state.ocupado;
      }
   },

  methods: {
      ...mapMutations(['mostrarOcupado', 'ocultarOcupado', 'mostrarExito', 'mostrarError', 'mostrarAdvertencia','mostrarError']),
    //-------------------FACEBOOK---------------
    async registrarFacebook() {
      let provider = new firebase.auth.FacebookAuthProvider();

      provider.setCustomParameters({
        display: "popup"
      });

      auth.lenguageCode = "es";

      try {
        await auth.signInWithPopup(provider);
        this.$router.push({ path: "/home/bienvenido" });

      } catch (error) {
        this.mostrarError("ocurrio un error");
      }
    },
    //---------------------------GOOGLE-------------------------
    async registrarGoogle() {
      let provider = new firebase.auth.GoogleAuthProvider();
      provider.setCustomParameters({
        display: "popup"
      });
      auth.lenguageCode = "es";
      try {
        await auth.signInWithPopup(provider);
         this.$router.push({ path: "/home/bienvenido" });
       
      } catch (error) {
        this.mostrarError("ocurrio un error");
      }
    },
    //------------------------------Email--------------
    async ingresar(){
      if(this.$v.login.$invalid){
        this.$v.login.$touch()
        return;
      }
      let ocupado = {
        visible:true,
        titulo :'Validando credenciales',
        mensaje:'Estamos validando sus credenciales, esto podría demorar'

      }

      this.$store.commit('mostrarOcupado',ocupado);

      
      try{
         await auth.signInWithEmailAndPassword(
          this.login.email,
          this.login.password
        );
       this.$router.push({ path: "home/bienvenido" });
   
      }catch(error){

        switch (error.code) {
        case "auth/user-not-found":
          case "auth/wrong-password":
             var notificar ={
               mensaje:"Usuario no válido. Revisa tu correo y contraseña.",
               visible : true
             }

             this.$store.commit('notificacionError',notificar);
              this.$store.commit('ocultarOcupado');
            break;

          default:
                notificar ={
               mensaje:"Ocurrió un error validando la información.",
               visible : true
             }

             this.$store.commit('notificacionError',notificar);
            break;
        }
      } finally {
        this.$store.commit('ocultarOcupado');
      } 
    },
    //----------RECUPERAR CONTRASEÑA-------------
    async enviarSolicitudPassword(){
      this.solicitudPassword = false

      let notificar ={
               mensaje:"Enviando solicitud de restablecimiento de contraseña.",
               visible : true
             }

             this.$store.commit('notificacionInfo',notificar);
            
      try {
        await auth.sendPasswordResetEmail(this.emailEnvio)
        let notificar ={
               mensaje:"Se ha enviado la solicitud de restablecimiento de contraseña",
               visible : true
             }

             this.$store.commit('notificacionExito',notificar);
      } catch (error) {
            notificar = { 
               mensaje:"Ocurrio un error enviando la solicitud.",
               visible : true
             }

             this.$store.commit('notificacionError',notificar);
      }finally{
        this.emailEnvio = null;
      }

    },
    cancelar(){
      router.push({name:'principal'});
    }

    
  },
};
</script>

    
<style scoped>
.fondo {
  padding: 0px !important;
  overflow: hidden;
  background-repeat: no-repeat, repeat;
  background-size: cover;
  background-position: center;
  max-height: 100vh;
}

.fondo-login {
  background-image: url(../../assets/fondo-login.jpg);
  background-repeat: no-repeat, repeat;
  background-size: cover;
  background-position: center;
}

.subTitulo{

  
  color: #dddddd;
  vertical-align: center;
  font-size: 1.1rem;
}

.blanco {
  color: white;
}
</style>