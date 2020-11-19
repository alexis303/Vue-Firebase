<template>
  <v-container>
    <v-card>
      <v-card-text>
        <h2>Mantenedor Compras</h2>
      </v-card-text>
    </v-card>
    <v-data-table
      :headers="headersCompras"
      :items="ArrayDatos"
      sort-by="name"
      :search="buscar"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Compras y detalles de compra</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <div class="flex-grow-1"></div>
          <v-text-field
            v-model="buscar"
            append-icon="search"
            label="Buscar"
            single-line
            hide-details
          ></v-text-field>
        </v-toolbar>
      </template>
      <template v-slot:item.dedicatoria="{ item }">
        <p v-if="item.dedicatoria != null">{{item.dedicatoria}}</p>
        <p v-else>____________</p>
      </template>
      <template v-slot:item.total="{ item }">
        <p>${{item.total | currency}}</p>
      </template>
       <template v-slot:item.comision="{ item }">
        <p>${{item.comision | currency}}</p>
      </template>
       <template v-slot:item.totalTransferir="{ item }">
        <p>${{item.totalTransferir | currency}}</p>
      </template>
      <template v-slot:item.transferido="{ item }">
        <v-checkbox disabled v-model="item.transferido"></v-checkbox>
      </template>
      <template v-slot:item.action="{ item }">
        <v-btn @click="transferio(item)" class="mr-2" color="info" small>
          <v-icon small>fa-clipboard-check</v-icon>
        </v-btn>
        <v-btn @click="getDetalles(item)" color="success" small>
          <v-icon small>fa-clipboard-list</v-icon>
        </v-btn>
      </template>
    </v-data-table>

    <v-dialog v-model="confirmar" max-width="500px" persistent transition="dialog-transition">
      <v-card>
        <v-toolbar color="primary" dark>
          <v-toolbar-title>¿Se tranfirio el monto de este regalo?</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-layout column wrap>
            <v-card elevation="0" class="mt-2">
              <v-layout justify-center wrap>
                <p>No</p>
                <v-switch v-model="detallesT.transferido"></v-switch>
                <p>Si</p>
              </v-layout>
            </v-card>
          </v-layout>
        </v-card-text>
        <v-card-text>
          <v-layout justify-center wrap>
            <v-btn @click="transferido" color="success" dark>
              <v-icon small class="mr-1">fa-check</v-icon>aceptar
            </v-btn>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="detalles" max-width="700px" transition="dialog-transition">
      <v-card>
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>Detalles de compra</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <div class="flex-grow-1"></div>
          </v-toolbar>
        </template>
        <v-data-table
          :headers="headersDetalles"
          :items="ArrayDetalles"
          :items-per-page="5"
          class="elevation-1"
        >
          <template v-slot:item.total="{ item }">
            <p>{{item.total | currency}}</p>
          </template>
          <template v-slot:item.precioUnitario="{ item }">
            <p>{{item.precioUnitario | currency}}</p>
          </template>
        </v-data-table>
      </v-card>
    </v-dialog>


    
    <v-dialog v-model="ocupado.visible" hide-overlay persistent width="500">
      <v-card>
        <v-toolbar color="primary" dark class="mb-5" v-show="ocupado.titulo">
          <v-toolbar-title>{{ocupado.titulo}}</v-toolbar-title>
        </v-toolbar>
        <v-card-text class="mb-4">{{ocupado.mensaje}}</v-card-text>
        <v-progress-linear indeterminate></v-progress-linear>
      </v-card>
    </v-dialog>

  </v-container>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import { firebase, db, storage } from "@/firebase";
import uuidv4 from "uuid/v4";
import Swal from "sweetalert2";
export default {
  data: () => ({
    ArrayDatos: [],
    ArrayDetalles: [],
    detalles: false,
    confirmar: false,
    buscar: null,
    detallesT: {
      transferido: false,
      id: null,
      idR: null
    },
    headersDetalles: [
      { text: "Nombre", value: "nombre", align: "left", sortable: false },
      { text: "Precio unitario", value: "precioUnitario" },
      { text: "Cantidad", value: "cantidad" },
      { text: "Total", value: "total" }
    ],
    headersCompras: [
      {
        text: "Remitente",
        align: "left",
        sortable: false,
        value: "Remitente"
      },
      { text: "Dedicatoria", value: "dedicatoria" },
      { text: "Fecha de compra", value: "fecha" },
      { text: "Evento", value: "nombreEvento" },
      { text: "Total", value: "total" },
      { text: "Comision", value: "comision" },
      { text: "Total a tranferir", value: "totalTransferir" },
      { text: "Transferido", value: "transferido" },
      { text: "Usuario", value: "usuario" },
      { text: "Opciones", value: "action", sortable: false }
    ],
    imageUrl: "",
    imageName: ""
  }),
  created() {
    this.getDatos();
  },
  methods: {
    transferio(item) {
      (this.confirmar = true), (this.detallesT.transferido = item.transferido);
      this.detallesT.id = item.id;
    },

    async transferido() {
      try {
        let ocupado = {
          visible:true,
          titulo: "Actualizando",
          mensaje:"Se esta confirmando la solicitud"
        };
        this.$store.commit("mostrarOcupado",ocupado);
        let resultado = await db
          .collection("Compras")
          .doc(this.detallesT.id)
          .update({ transferido: this.detallesT.transferido });
      } catch (error) {
        console.log(error);
      }finally{
        this.$store.commit("ocultarOcupado")
        this.confirmar = false;
        this.getDatos();
      }
    },

    async getDatos() {
      this.ArrayDatos = [];
      try {
        let resultado = await db.collection("Compras").get();

        resultado.forEach(doc => {
          this.ArrayDatos.push(doc.data());
        });
      } catch (error) {
        console.log(error);
      }
    },

    async getDetalles(item) {
      this.detalles = true;
      this.ArrayDetalles = [];
      try {
        let resultado = await db
          .collection("Compras")
          .doc(item.id)
          .collection("DetalleCompras")
          .get();

        resultado.forEach(doc => {
          this.ArrayDetalles.push(doc.data());
        });
      } catch (error) {
        console.log(error);
      }
    }
  },computed: {
    ...mapState(["ocupado","notificar"]),
  },
};
</script>