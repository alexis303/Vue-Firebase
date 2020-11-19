import Vue from 'vue'
import Vuex from 'vuex'
import {
  auth,
  db
} from './firebase'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    evento: null,
    vista32: null,
    usuario: null,

    ocupado: {
      visible: false,
      titulo: '',
      mensaje: ''

    },
    notificar: {
      visible: false,
      mensaje: '',
      color: 'success'
    }
  },
  mutations: {

    mostrarOcupado(state, ocupado) {
      state.ocupado.visible = ocupado.visible;
      state.ocupado.mensaje = ocupado.mensaje;
      state.ocupado.titulo = ocupado.titulo;
    },
    ocultarOcupado(state) {
      state.ocupado.visible = false;
    },
    notificacionExito(state, notificar) {
      state.notificar.visible = notificar.visible,
        state.notificar.mensaje = notificar.mensaje,
        state.notificar.color = 'success'
    },
    notificacionError(state, notificar) {
      state.notificar.visible = notificar.visible,
        state.notificar.mensaje = notificar.mensaje,
        state.notificar.color = 'error'
    },
    mostrarError(state, notificar) {
      state.notificar.visible = notificar.visible,
        state.notificar.mensaje = notificar.mensaje,
        state.notificar.color = 'error'
    },
    notificacionInfo(state, notificar) {
      state.notificar.visible = notificar.visible,
        state.notificar.mensaje = notificar.mensaje,
        state.notificar.color = 'info'
    },
    notificacionWarning(state, notificar) {
      state.notificar.visible = notificar.visible,
        state.notificar.mensaje = notificar.mensaje,
        state.notificar.color = 'warning'
    },
    ocultarNotificar(state) {
      state.notificar.visible = false
    },

    actualizarUsuario(state, usuario) {
      state.usuario = usuario
    },
  
    actualizarNombresApellidos(state, payload) {
      if (!state.usuario) {
        return
      }

      state.usuario.nombres = payload.nombres
      state.usuario.apellido1 = payload.apellido1
      state.usuario.apellido2 = payload.apellido2
    },

    actualizarFotoPerfil(state, fotoPerfil) {
      if (!state.usuario) {
        return
      }

      state.usuario.fotoPerfil = fotoPerfil
    }



  },
  actions: {
    async iniciarSesion({commit}, uid) {
      try {
        let doc = await db.collection('Usuarios')
          .doc(uid)
          .get()

        if (doc.exists) {
          let usuario = doc.data()
          commit('actualizarUsuario', usuario)
        } else {

        }
      } catch (error) {
        commit('mostrarError', 'Ocurrió un error consultando tu información.', {
          root: true
        })
      }

    },

   

    cerrarSesion({
      commit
    }) {
      auth.signOut()
      commit('actualizarUsuario', null)
    }

  },
  getters: {
    saludo(state) {
      if (!state.usuario) {
        return ''
      }

      let vocal = state.usuario.sexo && state.usuario.sexo == 'F' ? 'a' : 'o'
      return `¡Bienvenid${vocal} ${state.usuario.nombres}!`
    },

    Despadida(state) {

      if (!state.usuario) {
        return ''
      }

      return `Esperamos que regreses pronto por aqui ${state.usuario.nombres}!`

    },



  }
})