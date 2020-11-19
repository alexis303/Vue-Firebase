<template>
  <v-layout>
    <v-flex>
      <v-container>
        <v-card-title>
          Eventos Creados
          <div class="flex-grow-1"></div>
          <v-text-field
            v-model="search"
            append-icon="mdi-table-search"
            label="Buscar"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>

        <v-data-table :headers="headers" :items="eventox" :search="search">
          <template v-slot:item.portada="{item}">
            <v-flex xs8 md10 xl12>
              <v-img max-height="150px" max-width="150px" :src="item.portada"></v-img>
            </v-flex>
          </template>

          <template v-slot:item.private="{item}">
            <span v-if="item.private == false">No</span>
            <span v-if="item.private == true">Si</span>
          </template>

          <template v-slot:item.descripcion="{item}">
            <span>{{item.descripcion| truncate}}</span>
          </template>

          <template v-slot:item.action="{item}">
            <v-col class="px-0">
              <v-btn icon medium @click="verDatos(item)">
                <v-icon>fa-eye</v-icon>
              </v-btn>
            </v-col>

            <v-col class="px-0">
              <v-btn icon medium @click="datosdelapersona(item)">
                <v-icon>fa-user-edit</v-icon>
              </v-btn>
            </v-col>

            <v-col class="px-0">
              <v-btn icon medium @click="deleteItem(item)">
                <v-icon>fa-trash-alt</v-icon>
              </v-btn>
            </v-col>
          </template>
        </v-data-table>

        <v-dialog v-model="verinformacion">
          <v-card
            class="mx-auto"
            color="#2E64FE"
            v-for="VER in verinformacionoptenida"
            :key="VER.nombreFest"
          >
            <v-card-title>
              <v-img class="white--text align-end" width="500px" height="500px" :src="VER.portada"></v-img>
            </v-card-title>
            <v-container>
              <v-row dense>
                <v-col cols="12" ma-1>
                  <v-card color="#58ACFA" dark>
                    <v-card-title>Evento: {{VER.evento}} {{VER.nombre}}, Horario: {{VER.hora}}</v-card-title>
                    <v-card-text>
                      <p>-ID: {{VER.id}}</p>
                      <p>-Evento creado por: {{VER.usuario}}</p>
                      <p>-Evento privado: {{VER.private}}</p>
                      <p>-Nombre del festejado(a): {{VER.nombreFest}}.</p>
                      <p>-DirecciÃ³n: {{VER.direccion}}, {{VER.ciudad}}.</p>
                      <p>-NÂ° de cuenta: {{VER.numCuenta}}, {{VER.banco}}.</p>
                      <p>-DescripciÃ³n: {{VER.descripcion}}.</p>
                    </v-card-text>
                  </v-card>
                </v-col>

                <v-col v-for="(item, i) in items" :key="i" cols="12"></v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-dialog>
      </v-container>
    </v-flex>
  </v-layout>
</template>
<script>
import { mapMutations } from "vuex";
import { firebase, db, storage } from "@/firebase";
export default {
  name: "Eventos",
  data() {
    return {
      verinformacion: false,
      verinformacionoptenida: [],
      search: "",
      eventox: [],
      headers: [
        { text: "ID", value: "id" },
        { text: "CREADO POR EL USUARIO", value: "usuario" },
        { text: "FOTO DE PORTADA", value: "portada" },
        { text: "TIPO DE EVENTO", value: "evento" },
        { text: "PRIVADO", value: "private" },
        { text: "NOMBRE DEL EVENTO", value: "nombre" },
        { text: "DESCRIPCION", value: "descripcion" },
        { text: "NOMBRE FESTEJADO", value: "nombreFest" },
        { text: "APELLIDO FESTEJADO", value: "apellidoFest" },
        { text: "CIUDAD", value: "ciudad" },
        { text: "DIRECCION ", value: "direccion" },
        { text: "FECHA", value: "fecha" },
        { text: "HORA", value: "hora" },
        { text: "BANCO", value: "banco" },
        { text: "NUMERO DE CUENTA", value: "numCuenta" },
        { text: "ACCIONES ", value: "action" }
      ]
    };
  },
  methods: {
    async consultarEventos() {
      try {
        let docs = await db.collection("Eventos").get();

        docs.forEach(doc => {
          this.eventox.push(doc.data());
        });

        if (this.eventox.length == 0) {
          this.mostrarAdvertencia("No hay rangos disponibles en el momento.");
        }
      } catch (error) {}
    },

    async verDatos(item) {
      this.verinformacion = true;
      this.verinformacionoptenida = [];
      try {
        let docs = await db
          .collection("Eventos")
          .where("id", "==", item.id)
          .get();

        docs.forEach(doc => {
          this.verinformacionoptenida.push(doc.data());
        });
      } catch (error) {}
    }
  },
  created() {
    this.consultarEventos();
  },
  filters: {
    truncate: function(value) {
      if (value.length > 80) {
        value = value.substring(0, 77) + "...";
      }

      return value;
    }
  }
};
</script>