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
              <h2>Registrate ahora</h2>
              <span>crea una cuenta y celebra tus eventos a lo grande</span>
            </div>
          </v-card-text>
          <transition-group name="form-anim" mode="out-in">
            <div v-show="registro == 0" :key="0">
              <v-card-text>
                <v-text-field
                  v-model="f1.email"
                  :error-messages="erorresEmail"
                  @blur="$v.f1.email.$touch"
                  label="Correo Electronico"
                  outlined
                  dark
                ></v-text-field>
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
            </div>
            <div v-show="registro == 1" :key="1">
              <v-card-text>
                <v-text-field
                  v-model="f2.name"
                  :error-messages="erroresNombre"
                  @blur="$v.f2.name.$touch"
                  label="Nombres"
                  outlined
                  dark
                ></v-text-field>
                <v-text-field
                  v-model="f2.surname1"
                  :error-messages="erroresApellido1"
                  @blur="$v.f2.surname1.$touch"
                  label="Apellido Paterno"
                  outlined
                  dark
                ></v-text-field>
                <v-text-field
                  v-model="f2.surname2"
                  :error-messages="erroresApellido2"
                  @blur="$v.f2.surname2.$touch"
                  label="Apellido Materno"
                  outlined
                  dark
                ></v-text-field>
                <v-text-field
                  v-model="f2.rut"
                  :error-messages="erroresRut"
                  @blur="$v.f2.rut.$touch"
                  name="user[rut]"
                  label="Rut"
                  outlined
                  dark
                ></v-text-field>
              </v-card-text>
            </div>
          </transition-group>
          <v-card-text>
            <v-btn
              color="#431fc7"
              v-show="registro ==0 "
              :disabled="$v.f1.$invalid"
              @click="siguiente(registro)"
              dark
              block
            >Siguiente</v-btn>
            <v-btn
              color="#431fc7"
              @click="siguiente(registro)"
              v-show="registro==1"
              dark
              block
            >Teminar Registro</v-btn>
            <v-btn color="error" v-show="registro ==1" @click="registro--" block class="mt-3">Atras</v-btn>
            <v-btn color="error" v-show="registro ==0" block class="mt-3">Cancelar</v-btn>
          </v-card-text>
          <v-card-text class="ml-4">
            <span class="blanco">
              ¿No tienes una cuenta?
              <router-link :to="{ name: 'login' }">Inicia Sesión</router-link>
            </span>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

    <script>
import {
  required,
  email,
  minLength,
  maxLength,
  sameAs
} from "vuelidate/lib/validators";
import { nombreCompuesto, Rut } from "@/utilidades/validaciones";
import { firebase, auth, db } from "@/firebase";

export default {
  data() {
    return {
      f1: {
        email: "",
        password: "",
        passwordConfirm: ""
      },

      f2: {
        name: "",
        surname1: "",
        surname2: "",
        rut: ""
      },

      registro: 0
    };
  },
  validations: {
    f1: {
      email: {
        required,
        email
      },
      password: {
        required,
        minLength: minLength(6),
        maxLength: maxLength(12)
      },
      passwordConfirm: {
        required,
        sameAsPassword: sameAs("password")
      }
    },
    f2: {
      name: {
        required,
        nombreCompuesto
      },
      surname1: {
        required
      },
      surname2: {
        required
      },
      rut: {
        required,
        minLength: minLength(7),
        Rut
      }
    }
  },
  computed: {
    erorresEmail() {
      let errores = [];
      if (!this.$v.f1.email.$dirty) {
        return errores;
      }
      if (!this.$v.f1.email.required) {
        errores.push("Ingresa tu correo electronico.");
      }
      if (!this.$v.f1.email.email) {
        errores.push("Ingresa un correo electronico válido");
      }
      return errores;
    },
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
    erroresNombre() {
      let errores = [];

      if (!this.$v.f2.name.$dirty) {
        return errores;
      }

      if (!this.$v.f2.name.required) {
        errores.push("Ingrese un nombre");
      }

      if (!this.$v.f2.name.nombreCompuesto) {
        errores.push("Ingrese un nombre valido");
      }
      return errores;
    },
    erroresApellido1() {
      let errores = [];

      if (!this.$v.f2.surname1.$dirty) {
        return errores;
      }

      if (!this.$v.f2.surname1.required) {
        errores.push("Ingrese un apellido Paterno");
      }

      return errores;
    },
    erroresApellido2() {
      let errores = [];

      if (!this.$v.f2.surname2.$dirty) {
        return errores;
      }

      if (!this.$v.f2.surname2.required) {
        errores.push("Ingrese un apellido Materno");
      }

      return errores;
    },
    erroresRut() {
      let errores = [];

      if (!this.$v.f2.rut.$dirty) {
        return errores;
      }

      if (!this.$v.f2.rut.required) {
        errores.push("Ingrese un rut");
      }

      if (!this.$v.f2.rut.minLength) {
        errores.push("El rut debe tener mas de 7 digitos");
      }

      if (!this.$v.f2.rut.Rut) {
        errores.push("El rut ingresado no es valido");
      }

      return errores;
    },

    notificar() {
      return this.$store.state.notificar;
    }
  },

  methods: {
    siguiente(registro) {
      switch (registro) {
        case 0:
          if (this.$v.f1.$invalid) {
            this.$v.f1.$touch();
            return;
          } else {
            this.registro++;
          }
          break;

        case 1:
          if (this.$v.f2.$invalid) {
            this.$v.f2.$touch();
            return;
          } else {
            this.registrar();
          }
      }
    },
    async registrar() {
      let ocupado = {
        visible: true,
        titulo: "Registrando credenciales",
        mensaje: "Estamos guardando sus credenciales, esto podría demorar"
      };

      this.$store.commit("mostrarOcupado", ocupado);

      try {
        let cred = await auth.createUserWithEmailAndPassword(
          this.f1.email,
          this.f1.password
        );

        await auth.currentUser.sendEmailVerification();

        let usuario = {
          uid: cred.user.uid,
          nombres: this.f2.name,
          apellido1: this.f2.surname1,
          apellido2: this.f2.surname2,
          rut: this.f2.rut,
          email: this.f1.email,
          password: this.f1.password,
          ////////////////////////////////// Agrege estas lineas ya que son se utilidad (ANDRES)
          fotoPerfil: "https://castillotrans.eu/wp-content/uploads//2019/06/77461806-icono-de-usuario-hombre-hombre-avatar-avatar-pictograma-pictograma-vector-ilustraci%C3%B3n.jpg",
          oculto: 'false',
          cargo:'User'

        };
        db.collection("Usuarios")
          .doc(usuario.uid)
          .set(usuario);

        this.$store.commit("ocultarOcupado");
     
      } catch (error) {
        switch (error.code) {
          case "auth/email-already-in-use":
            var notificar = {
              visible: true,
              mensaje: "El Email ingresado ya se encuentra registrado"
            };

            this.$store.commit("notificacionWarning", notificar);
            break;
          default:


            notificar = {
              visible: true,
              mensaje:
                "Ocurrio un error mientras se guardan sus credenciales,intentelo nuevamente"
            };

            this.$store.commit("notificacionError", notificar);
            break;
        }
      } finally {
        let notificar = {
          visible: true,
          titulo: "Registro finalizado",
          mensaje: "Sus credenciales se guardaron exitosamente."
        };

        this.$store.commit("notificacionExito", notificar);
        this.$router.push({ name: "EnvioVerificacionEmail" });
      }
    }
  }
};
</script>


<style>
.fondo {
  padding: 0px !important;
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
  height: 100vh;
}

.blanco {
  color: whitesmoke;
}
</style>