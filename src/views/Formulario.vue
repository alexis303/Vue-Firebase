<template>
  <v-container fill-height>
    <v-layout align-end justify-center>
      <v-flex xs12 sm12 md12 lg12 xl12>
        <v-stepper v-model="e1">
          <v-stepper-header>
            <v-stepper-step :complete="e1 > 1" step="1">Nuevo Evento</v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step :complete="e1 > 2" step="2">Detalles del Festejado</v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step :complete="e1 > 3" step="3">Detalles del Evento</v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step :complete="e1 > 4" step="4">Personaliza tu evento</v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step :complete="e1 > 5" step="5">Agrega Regalos</v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step step="6">Metodos de pago</v-stepper-step>
          </v-stepper-header>

          <v-stepper-items>
            <v-stepper-content step="1">
              <v-card height="65vh" tile elevation="0">
                <v-layout justify-center wrap>
                  <h3 class="text-center ma-2">Creando evento</h3>
                </v-layout>
                <v-layout justify-center>
                  <v-flex xs7>
                    <v-layout justify-center column wrap>
                      <v-flex xs12>
                        <v-text-field v-model="f1.nombEvento" 
                        :error-messages="erroresNombre"
                         @blur="$v.f1.nombEvento.$touch" label="Nombre de su evento" outlined></v-text-field>
                      </v-flex>
                      <v-flex xs12>
                        <p class="font-weight-black">Seleccione el tipo de evento:</p>

                        <v-combobox
                          v-model="f1.check"
                          :error-messages="erroresSeleccionEvento"
                         @blur="$v.f1.check.$touch"
                          outlined
                          item-text="nombre"
                          :items="datosEvento"
                          label="Eventos"
                        ></v-combobox>
                      </v-flex>
                      <v-divider></v-divider>
                      <v-flex xs12>
                        <v-switch v-model="f1.privada" label="¿Evento privado?"></v-switch>
                        <v-text-field
                          v-show="f1.privada == true"
                          :error-messages="erroresPassword"
                          @blur="$v.f1.password.$touch"
                          v-model="f1.password"
                          label="Contraseña"
                          outlined
                        ></v-text-field>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                </v-layout>
              </v-card>
              <v-layout align-end>
                <v-spacer></v-spacer>
                <v-btn justify-end color="primary" @click="e1 = 2">Continuar</v-btn>
              </v-layout>
            </v-stepper-content>

            <v-stepper-content step="2">
              <v-card height="65vh" tile elevation="0">
                <v-layout justify-center wrap>
                  <h3 class="text-center ma-2">Detalles del festejado</h3>
                </v-layout>
                <v-layout justify-center>
                  <v-flex xs7>
                    <v-layout justify-center column wrap v-if="f1.check == null">
                      <v-flex xs12>
                        <v-text-field
                        :error-messages="erroresNombreFest1"
                          @blur="$v.f1.nombreFest1.$touch"
                          v-model="f1.nombreFest1"
                          label="Nombre del festejado o festejada"
                          outlined
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs12>
                        <v-text-field
                        :error-messages="erroresApellidoFest1"
                          @blur="$v.f1.apellidoFest1.$touch"
                          v-model="f1.apellidoFest1"
                          label="Primer Apellido del festejado o festejada"
                          outlined
                        ></v-text-field>
                        <v-flex xs12 class="mb-3"></v-flex>
                      </v-flex>
                    </v-layout>
                    <v-layout justify-center column wrap v-else-if="f1.check.pareja == false">
                      <v-flex xs12>
                        <v-text-field
                        :error-messages="erroresNombreFest1"
                          @blur="$v.f1.nombreFest1.$touch"
                          v-model="f1.nombreFest1"
                          label="Nombre del festejado o festejada"
                          outlined
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs12>
                        <v-text-field
                        :error-messages="erroresApellidoFest1"
                          @blur="$v.f1.apellidoFest1.$touch"
                          v-model="f1.apellidoFest1"
                          label="Primer Apellido del festejado o festejada"
                          outlined
                        ></v-text-field>
                        <v-flex xs12 class="mb-3"></v-flex>
                      </v-flex>
                    </v-layout>
                    <v-layout justify-center column wrap v-else-if="f1.check.pareja == true">
                      <v-flex xs12>
                        <v-text-field
                        :error-messages="erroresNombreFest1"
                          @blur="$v.f1.nombreFest1.$touch"
                          v-model="f1.nombreFest1"
                          label="Nombre del festejado o festejada"
                          outlined
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs12>
                        <v-text-field
                        :error-messages="erroresApellidoFest1"
                          @blur="$v.f1.apellidoFest1.$touch"
                          v-model="f1.apellidoFest1"
                          label="Primer Apellido del festejado o festejada"
                          outlined
                        ></v-text-field>
                        <v-flex xs12 class="mb-3"></v-flex>
                      </v-flex>

                      <v-flex xs12>
                        <v-text-field
                        :error-messages="erroresNombreFest2"
                          @blur="$v.f1.nombreFest2.$touch"
                          v-model="f1.nombreFest2"
                          label="Nombre del festejado o festejada"
                          outlined
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs12>
                        <v-text-field
                        :error-messages="erroresApellidoFest2"
                          @blur="$v.f1.apellidoFest2.$touch"
                          v-model="f1.apellidoFest2"
                          label="Primer Apellido del festejado o festejada"
                          outlined
                        ></v-text-field>
                        <v-flex xs12 class="mb-3"></v-flex>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                </v-layout>
              </v-card>
              <v-layout>
                <v-btn justify-start color="primary" @click="e1 = 1">Atras</v-btn>
                <v-spacer></v-spacer>
                <v-btn justify-end color="primary" @click="e1 = 3 ">Continuar</v-btn>
              </v-layout>
            </v-stepper-content>

            <v-stepper-content step="3">
              <v-card height="65vh" tile elevation="0">
                <v-layout justify-center wrap>
                  <h3 class="text-center ma-2">Detalles del evento</h3>
                </v-layout>
                <v-layout justify-center>
                  <v-flex xs7>
                    <v-layout justify-center column wrap>
                      <v-flex xs4>
                        <v-combobox
                          outlined
                          item-text="nombre"
                          :error-messages="erroresSeleccionRegion"
                          @blur="$v.region.$touch"
                          v-model="region"
                          :items="datosRegiones"
                          label="Selecciona una region"
                        ></v-combobox>
                      </v-flex>
                      <v-flex xs4>
                        <v-select
                          :disabled="region == null"
                          outlined
                          item-text="nombre"
                          v-model="f1.ciudad"
                          :error-messages="erroresSeleccionCiudad"
                          @blur="$v.f1.ciudad.$touch"
                          :items="datosCiudades"
                          label="Selecciona una ciudad"
                        ></v-select>
                      </v-flex>
                      <v-flex xs4>
                        <v-text-field v-model="f1.direccion" 
                        :error-messages="erroresDireccion"
                          @blur="$v.f1.direccion.$touch"
                        outlined label="Direccion"></v-text-field>
                      </v-flex>
                      <v-flex xs12>
                        <v-dialog
                          ref="menu"
                          v-model="menu"
                          :close-on-content-click="false"
                          :return-value.sync="f1.fechadeEvento"
                          transition="scale-transition"
                          offset-y
                          max-width="290px"
                        >
                          <template v-slot:activator="{ on }">
                            <v-text-field
                              outlined
                              :error-messages="erroresFechaInicio"
                               @blur="$v.f1.fechadeEvento.$touch"
                              v-model="f1.fechadeEvento"
                              label="Fecha del evento"
                              readonly
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker v-model="f1.fechadeEvento" scrollable>
                            <v-spacer></v-spacer>
                            <v-btn text color="primary" @click="menu = false">Cancelar</v-btn>
                            <v-btn
                              text
                              color="primary"
                              @click="$refs.menu.save(f1.fechadeEvento),menu=false"
                            >OK</v-btn>
                          </v-date-picker>
                        </v-dialog>
                      </v-flex>
                      <v-flex xs10>
                        <v-dialog
                          ref="menu2"
                          v-model="menu2"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          :return-value.sync="f1.horaEvento"
                          transition="scale-transition"
                          offset-y
                          max-width="290px"
                        >
                          <template v-slot:activator="{ on }">
                            <v-text-field
                              v-model="f1.horaEvento"
                              :error-messages="erroresHora"
                               @blur="$v.f1.horaEvento.$touch"
                              label="Hora de evento"
                              outlined
                              readonly
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-time-picker v-if="menu2" v-model="f1.horaEvento">
                            <v-spacer></v-spacer>
                            <v-btn text color="primary" @click="menu2 = false">Cancelar</v-btn>
                            <v-btn text color="primary" @click="$refs.menu2.save(f1.horaEvento)">OK</v-btn>
                          </v-time-picker>
                        </v-dialog>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                </v-layout>
              </v-card>
              <v-layout align-end>
                <v-btn justify-start color="primary" @click="e1 = 2">Atras</v-btn>
                <v-spacer></v-spacer>
                <v-btn justify-end color="primary" @click="e1 = 4,consultarFrase()">Continuar</v-btn>
              </v-layout>
            </v-stepper-content>

            <v-stepper-content step="4">
              <v-card height="650px" tile elevation="0">
                <v-layout justify-center wrap>
                  <h3 class="text-center ma-2">Personaliza tu evento</h3>
                </v-layout>
                <v-layout justify-center wrap>
                  <v-flex xs12>
                    <h4 class="text-center">Escoja una imagen de portada</h4>
                  </v-flex>
                  <v-flex xs6 class="ma-3">
                    <v-layout justify-center>
                      <v-btn color="success" @click="consultarImg()">Ver galeria</v-btn>
                    </v-layout>
                  </v-flex>

                  <v-flex xs12>
                    <h4 class="text-center">Escoja una imagen de pie de pagina</h4>
                  </v-flex>
                  <v-flex xs6 class="ma-3">
                    <v-layout justify-center>
                      <v-btn color="success" @click="consultarImg2()">Ver galeria</v-btn>
                    </v-layout>
                  </v-flex>

                  <v-flex xs6>
                    <v-text-field
                      outlined
                       :error-messages="erroresFraseP"
                        @blur="$v.f1.fraseP.$touch"
                      v-model="f1.fraseP"
                      label="Escriba una frase para su portada"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12></v-flex>
                  <v-flex xs6>
                    <v-select
                      outlined
                      item-text="nombre"
                      v-model="f1.frases"
                      :items="ArrayFraces"
                      :error-messages="erroresFrases"
                        @blur="$v.f1.frases.$touch"
                      label="Agrega una frase para agradecer a tus amigos"
                    ></v-select>
                  </v-flex>
                  <v-flex xs12></v-flex>
                  <v-flex xs6>
                    <v-textarea v-model="f1.descripcion"
                     :error-messages="erroresDescripcion"
                        @blur="$v.f1.descripcion.$touch"
                     label="Descripcion" outlined></v-textarea>
                  </v-flex>

                  <v-flex xs12></v-flex>
                  <v-flex xs6>
                    <v-dialog
                      v-model="menu1"
                      persistent
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                      full-width
                      max-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          outlined
                          v-model="f1.colorEve"
                           :error-messages="erroresColorEve"
                        @blur="$v.f1.colorEve.$touch"
                          label="Color"
                          persistent-hint
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-card max-width="290px">
                        <v-card-text>
                          <v-color-picker
                            class="pt-3"
                            v-model="f1.colorEve"
                            :mode.sync="mode"
                            show-swatches
                            swatches-max-height="300px"
                            hide-inputs
                          ></v-color-picker>
                        </v-card-text>
                        <v-card-action>
                          <v-layout justify-end>
                            <v-btn text color="success" @click="menu1 = false">Cancelar</v-btn>
                            <v-btn text color="success" @click="menu1 = false">Guardar</v-btn>
                          </v-layout>
                        </v-card-action>
                      </v-card>
                    </v-dialog>
                  </v-flex>

                  <v-flex xs12 class="ma-3">
                    <v-layout justify-center>
                      <v-btn @click="previa = true" color="success">Vista previa</v-btn>
                    </v-layout>
                  </v-flex>
                </v-layout>
              </v-card>
              <v-layout>
                <v-btn justify-start color="primary" @click="e1 = 3">Atras</v-btn>
                <v-spacer></v-spacer>
                <v-btn justify-end color="primary" @click="e1 = 5">Continuar</v-btn>
              </v-layout>
            </v-stepper-content>
            <v-stepper-content step="5">
              <v-layout wrap>
                <h2>Tus Regalos</h2>
              </v-layout>

              <v-card height="650px" tile elevation="0">
                <v-flex xs12>
                  <p class="font-weight-black">Seleccione el tipo de Regalo que desea:</p>

                  <v-combobox
                    v-model="regalos"
                    outlined
                    item-text="nombre"
                    :items="ArrayCategoriaRegalos"
                    label="Categoria"
                  ></v-combobox>
                </v-flex>
                <v-layout>
                  <v-flex xs6>
                    <v-responsive class="overflow-y-auto" max-height="400">
                      <v-lazy
                        v-model="isActive"
                        :options="{
          threshold: .5
        }"
                        min-height="200"
                        transition="fade-transition"
                      >
                        <v-card-text>
                          <v-layout wrap justify-center>
                            <v-flex
                              v-for="RC in ArrayCategoriaRC"
                              :key="RC.id"
                              xs3
                              class="mx-2 my-2"
                            >
                              <v-card>
                                <v-img
                                  :src="RC.urlImagen"
                                  class="white--text align-end"
                                  gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                                  height="200px"
                                >
                                  <v-card-title>{{RC.nombre}}</v-card-title>
                                  <v-card-text class="subheader">${{RC.precio | currency}}</v-card-text>
                                </v-img>

                                <v-card-actions>
                                  <v-layout justify-center>
                                    <v-btn color="success" fab small @click="AgregarAMilista(RC)">
                                      <v-icon>fa-plus</v-icon>
                                    </v-btn>
                                  </v-layout>
                                </v-card-actions>
                              </v-card>
                            </v-flex>
                          </v-layout>
                        </v-card-text>
                      </v-lazy>
                    </v-responsive>
                  </v-flex>

                  <v-flex xs6>
                    <v-responsive class="overflow-y-auto" max-height="400">
                      <v-lazy
                        v-model="isActive"
                        :options="{
          threshold: .5
        }"
                        min-height="200"
                        transition="fade-transition"
                      >
                        <v-simple-table>
                          <thead>
                            <tr>
                              <th>Imagen</th>
                              <th>Nombre</th>
                              <th>Precio</th>
                              <th>Cantidad</th>
                              <th>acciones</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="agregar in ArrayAgregados" :key="agregar">
                              <td>
                                <v-img class="ma-2" :src="agregar.Imagen" height="120" width="150"></v-img>
                              </td>
                              <td>{{agregar.nombre}}</td>
                              <td>${{agregar.precio | currency}}</td>
                              <td class="text-center">{{agregar.cantidad}}</td>
                              <td>
                                <v-btn
                                  fab
                                  x-small
                                  class="ma-1"
                                  flat
                                  elevation="0"
                                  @click="disminuirAgregado(agregar)"
                                  color="primary"
                                >
                                  <v-icon>fa-minus</v-icon>
                                </v-btn>
                                <v-btn
                                  fab
                                  x-small
                                  class="ma-1"
                                  @click="AumentarAgregado(agregar)"
                                  flat
                                  elevation="0"
                                  color="success"
                                >
                                  <v-icon>fa-plus</v-icon>
                                </v-btn>
                                <v-btn
                                  fab
                                  x-small
                                  class="ma-1"
                                  flat
                                  elevation="0"
                                  @click="quitarAgregado(agregar)"
                                  color="error"
                                >
                                  <v-icon>fa-trash</v-icon>
                                </v-btn>
                              </td>
                            </tr>
                          </tbody>
                        </v-simple-table>
                      </v-lazy>
                    </v-responsive>
                  </v-flex>
                </v-layout>
              </v-card>
              <v-layout>
                <v-btn justify-start color="primary" @click="e1 = 4">Atras</v-btn>
                <v-spacer></v-spacer>
                <v-btn justify-end color="primary" @click="e1 = 6">Continuar</v-btn>
              </v-layout>
            </v-stepper-content>
            <v-stepper-content step="6">
              <v-card height="650px" tile elevation="0">
                <v-layout justify-center colum wrap>
                  <v-flex xs7>
                    <v-layout colum wrap>
                      <v-flex xs12>
                        <v-select outlined :items="ArrayBanco" v-model="f1.banco"
                        :error-messages="erroresBanco"
                        @blur="$v.f1.banco.$touch" label="Banco"></v-select>
                      </v-flex>
                      <v-flex xs12>
                        <v-select
                          outlined
                          :disabled="f1.banco == ''"
                          :items="ArrayCuenta"
                           :error-messages="erroresTipoCuenta"
                        @blur="$v.f1.tipoCuenta.$touch"
                          v-model="f1.tipoCuenta"
                          label="Tipo de cuenta"
                        ></v-select>
                      </v-flex>
                      <v-flex xs12>
                        <v-text-field outlined v-model="f1.numCuenta"
                         :error-messages="erroresNumCuenta"
                        @blur="$v.f1.numCuenta.$touch" label="Numero de cuenta"></v-text-field>
                      </v-flex>
                      <v-flex xs12>
                        <v-text-field outlined v-model="f1.rut" 
                        :error-messages="erroresRut"
                        @blur="$v.f1.rut.$touch"
                        label="Rut de cuenta"></v-text-field>
                      </v-flex>
                      <v-flex xs12>
                        <v-divider></v-divider>
                      </v-flex>
                      <v-flex xs2>
                        <v-switch label="¿pago semanal?" v-model="f1.pagoSemanal"></v-switch>
                      </v-flex>
                      <v-flex xs1 class="mt-4">
                        <v-tooltip v-model="show" right max-width="400">
                          <template v-slot:activator="{ on }">
                            <v-btn icon v-on="on">
                              <v-icon color="grey lighten-1">fa-info-circle</v-icon>
                            </v-btn>
                          </template>
                          <span>¿Pago semanal?, se refiere a que los viernes de cada semana, se cancelaran montos a la cuenta vinculada, según la cantidad de regalos que se han comprado en el evento, ¿Que pasa sí no activo el pago semanal? Al finalizar el evento se realizara un pago con el monto total de los regalos simbólicos vendidos en el evento</span>
                        </v-tooltip>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                </v-layout>
              </v-card>
              <v-layout>
                <v-btn justify-start color="primary" @click="e1 = 5">Atras</v-btn>
                <v-spacer></v-spacer>
                <v-btn
                  justify-end
                  color="primary"
                  v-if="f1.check == null"
                  @click="crearEvento"
                >Finalizar</v-btn>
                <v-btn
                  justify-end
                  color="primary"
                  v-else-if="f1.check.pareja == false"
                  @click="crearEvento"
                >Finalizar</v-btn>
                <v-btn
                  justify-end
                  color="primary"
                  v-else-if="f1.check.pareja == true"
                  @click="crearEvento2"
                >Finalizar</v-btn>
              </v-layout>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-flex>
    </v-layout>
    <v-dialog v-model="ocupado.visible" hide-overlay persistent width="300">
      <v-card color="primary" dark>
        <v-card-text>
          {{ocupado.mensaje}}
          <v-progress-linear indeterminate color="white" class="mb-5"></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-snackbar dark v-model="notificar.visible" :color="notificar.color" top :timeout="10000">
      {{notificar.mensaje}}
      <v-btn text @click="notificar.visible = false">Cerrar</v-btn>
    </v-snackbar>
    <v-dialog v-model="galeriaP" persistent max-width="65vh" transition="dialog-transition">
      <v-card max-width="65vh">
        <v-toolbar color="primary" dark>
          <v-toolbar-title class="text-center mt-1">Seleccione una imagen para su portada</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-layout wrap>
            <v-flex xs4 v-for="n in ArrayImagenes" :key="n.id">
              <v-radio-group v-model="f1.imagenPortada">
                <v-card elevation="7" class="ma-2">
                  <v-img
                    :src="n.urlImagen"
                    :lazy-src="`https://picsum.photos/10/6?image=${5 + 10}`"
                    width="300"
                    height="200"
                    class="grey lighten-2"
                  >
                    <template v-slot:placeholder>
                      <v-row class="fill-height ma-0" align="center" justify="center">
                        <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                      </v-row>
                    </template>
                    <v-layout align-content-start>
                      <v-radio :value="n.urlImagen" class="nada ml-1 mt-1 bs" dark></v-radio>
                    </v-layout>
                  </v-img>
                </v-card>
              </v-radio-group>
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-card-action>
          <v-layout justify-end>
            <v-btn color="success" text @click="galeriaP = false">Cancelar</v-btn>
            <v-btn color="success" text @click="galeriaP = false">Guardar</v-btn>
          </v-layout>
        </v-card-action>
      </v-card>
    </v-dialog>
    <v-dialog v-model="galeriaF" persistent max-width="65vh" transition="dialog-transition">
      <v-card max-width="65vh">
        <v-toolbar color="primary" dark>
          <v-toolbar-title class="text-center mt-1">Seleccione una imagen para su pie de pagina</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-layout wrap>
            <v-flex xs4 v-for="n in ArrayImagenes" :key="n.id">
              <v-radio-group v-model="f1.imagenFooter">
                <v-card elevation="7" class="ma-2">
                  <v-img
                    :src="n.urlImagen"
                    :lazy-src="`https://picsum.photos/10/6?image=${5 + 10}`"
                    width="300"
                    height="200"
                    class="grey lighten-2"
                  >
                    <template v-slot:placeholder>
                      <v-row class="fill-height ma-0" align="center" justify="center">
                        <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                      </v-row>
                    </template>
                    <v-layout align-content-start>
                      <v-radio dark :value="n.urlImagen" class="nada ml-1 mt-1 bs"></v-radio>
                    </v-layout>
                  </v-img>
                </v-card>
              </v-radio-group>
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-layout justify-end>
          <v-btn color="success" text @click="galeriaF = false">Cancelar</v-btn>
          <v-btn color="success" text @click="galeriaF = false">Guardar</v-btn>
        </v-layout>
      </v-card>
    </v-dialog>
    <v-dialog v-model="previa" scrollable transition="dialog-transition">
      <v-card :color="f1.colorEve">
        <v-layout justify-center wrap>
          <h3 class="text-center ma-2 white--text bs merienda">Vista previa</h3>
        </v-layout>
        <v-layout justify-center wrap>
          <h3 class="text-center ma-2 white--text bs merienda">Para salir presione escape(ESC)</h3>
        </v-layout>
        <v-layout row wrap>
          <v-content fill-height light class="fondo">
            <v-container fluid class="fondo">
              <v-img
                :src="f1.imagenPortada"
                gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"
                height="80vh"
                width="auto"
              >
                <v-layout align-center justify-center row fill-height>
                  <v-card flat color="#ffffff00">
                    <v-layout align-center justify-center>
                      <v-card flat color="#ffffff00">
                        <v-flex xs12 sm12 md12 lg12 xl12 v-if="f1.check == null">
                          <h3 class="text-center merienda mini-titulo bs">{{f1.fraseP}}</h3>
                          <h1
                            class="merienda titulo-perfil text-center mb-5 bs"
                          >{{f1.nombreFest1}} {{f1.apellidoFest1}}</h1>
                        </v-flex>
                        <v-flex xs12 sm12 md12 lg12 xl12 v-else-if="f1.check.pareja == true">
                          <h3 class="text-center merienda mini-titulo bs">{{f1.fraseP}}</h3>
                          <h1
                            class="merienda titulo-perfil text-center mb-5 bs"
                          >{{f1.nombreFest1}} {{f1.apellidoFest1}}</h1>
                          <h3 class="text-center merienda mini-titulo bs">y</h3>
                          <h1
                            class="merienda titulo-perfil text-center mb-5 bs"
                          >{{f1.nombreFest2}} {{f1.apellidoFest2}}</h1>
                        </v-flex>
                        <v-flex xs12 sm12 md12 lg12 xl12 v-else-if="f1.check.pareja == false">
                          <h3 class="text-center merienda mini-titulo bs">{{f1.fraseP}}</h3>
                          <h1
                            class="merienda titulo-perfil text-center mb-5 bs"
                          >{{f1.nombreFest1}} {{f1.apellidoFest1}}</h1>
                        </v-flex>
                      </v-card>
                    </v-layout>
                  </v-card>
                </v-layout>
              </v-img>
            </v-container>
            <v-container fluid class="fondo">
              <v-layout>
                <v-card
                  height="auto"
                  width="2000vh"
                  tile
                  flat
                  :color="f1.colorEve"
                  dark
                  class="elevation-7"
                >
                  <v-layout class="mt-5 wrap" justify-center>
                    <v-card-text class="text-center titulo-descripcion merienda bs">{{f1.frases}}</v-card-text>
                    <v-card-text
                      class="text-center texto-descripcion merienda mb-5 bs"
                    >{{f1.descripcion}}</v-card-text>
                  </v-layout>
                </v-card>
              </v-layout>
              <v-card tile elevation="0">
                <v-layout justify-center wrap class="mt-5">
                  <v-flex xs10 sm10 md5 lg5 xl5 class="ml-4 mr-4">
                    <v-layout align-center wrap>
                      <v-flex xs12>
                        <h1 class="text-center meriendaB mt-5 mb-5">Mis Historias</h1>
                      </v-flex>
                    </v-layout>
                    <v-layout justify-center class="mb-10">
                      <v-timeline fill-dot clipped dense reverse>
                        <v-timeline-item :color="f1.colorEve">
                          <v-card class="elevation-2">
                            <v-layout>
                              <v-flex class="ma-4">
                                <v-img
                                  max-width="200"
                                  class="mt-5"
                                  src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-1.2.1&w=1000&q=80"
                                />
                              </v-flex>
                              <v-flex>
                                <v-card-title class="headline">Titulo</v-card-title>
                                <v-card-text>12/12/12</v-card-text>
                                <v-card-text>Lorea El Ipsum La legal ñoco los techeka zoronca brocacochi puro gile chantar matagatos la legal, pura falacia oe perro chico tenis mano? pero pa q po del corte jato para la mano tolompa teni mano?, zarpao matagatos pura falacia oe teni mano? embarao pipazo zarpao. Bellako asikalao oe si a treh deo picao gila terrible de perkin tení puro frío cuca, calzar la legal para la mano hermano ranazo chantale el pate odio, me voy en cana shekea bellako soplamoco tení puro frío la cani matagatos.</v-card-text>
                              </v-flex>
                            </v-layout>
                          </v-card>
                        </v-timeline-item>
                        <v-timeline-item :color="f1.colorEve">
                          <v-card class="elevation-2">
                            <v-layout>
                              <v-flex class="ma-4">
                                <v-img
                                  max-width="200"
                                  class="mt-5"
                                  src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-1.2.1&w=1000&q=80"
                                />
                              </v-flex>
                              <v-flex>
                                <v-card-title class="headline">Titulo</v-card-title>
                                <v-card-text>12/12/12</v-card-text>
                                <v-card-text>Lorea El Ipsum La legal ñoco los techeka zoronca brocacochi puro gile chantar matagatos la legal, pura falacia oe perro chico tenis mano? pero pa q po del corte jato para la mano tolompa teni mano?, zarpao matagatos pura falacia oe teni mano? embarao pipazo zarpao. Bellako asikalao oe si a treh deo picao gila terrible de perkin tení puro frío cuca, calzar la legal para la mano hermano ranazo chantale el pate odio, me voy en cana shekea bellako soplamoco tení puro frío la cani matagatos.</v-card-text>
                              </v-flex>
                            </v-layout>
                          </v-card>
                        </v-timeline-item>
                        <v-timeline-item :color="f1.colorEve">
                          <v-card class="elevation-2">
                            <v-layout>
                              <v-flex class="ma-4">
                                <v-img
                                  max-width="200"
                                  class="mt-5"
                                  src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-1.2.1&w=1000&q=80"
                                />
                              </v-flex>
                              <v-flex>
                                <v-card-title class="headline">Titulo</v-card-title>
                                <v-card-text>12/12/12</v-card-text>
                                <v-card-text>Lorea El Ipsum La legal ñoco los techeka zoronca brocacochi puro gile chantar matagatos la legal, pura falacia oe perro chico tenis mano? pero pa q po del corte jato para la mano tolompa teni mano?, zarpao matagatos pura falacia oe teni mano? embarao pipazo zarpao. Bellako asikalao oe si a treh deo picao gila terrible de perkin tení puro frío cuca, calzar la legal para la mano hermano ranazo chantale el pate odio, me voy en cana shekea bellako soplamoco tení puro frío la cani matagatos.</v-card-text>
                              </v-flex>
                            </v-layout>
                          </v-card>
                        </v-timeline-item>
                      </v-timeline>
                    </v-layout>
                  </v-flex>
                  <v-flex xs10 sm10 md5 lg5 xl5>
                    <v-layout wrap justify-center>
                      <v-flex xs12>
                        <h1 class="meriendaB text-center">Lista de regalos simbolicos</h1>
                      </v-flex>
                      <v-flex xs12></v-flex>
                    </v-layout>

                    <v-layout wrap justify-center>
                      <v-flex class="ma-5" xs7 sm7 md6 lg4 xl4>
                        <v-hover>
                          <v-card class="imagen" elevation="6" color="#ffffff00">
                            <v-layout justify-center wrap>
                              <v-img
                                min-height="250"
                                max-height="250"
                                src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-1.2.1&w=1000&q=80"
                              >
                                <v-layout align-end justify-center fill-height>
                                  <v-btn
                                    class="sube merienda"
                                    :color="f1.colorEve"
                                    dark
                                  >Agregar al carro</v-btn>
                                </v-layout>
                              </v-img>
                            </v-layout>
                            <v-card-text>
                              <v-layout justify-center wrap>
                                <v-flex xs12>
                                  <v-layout justify-center>
                                    <span class="meriendaB">Regalo</span>
                                  </v-layout>
                                </v-flex>
                                <v-flex xs12>
                                  <v-layout justify-center>
                                    <span class="meriendaB">$1000</span>
                                  </v-layout>
                                </v-flex>
                              </v-layout>
                            </v-card-text>
                          </v-card>
                        </v-hover>
                      </v-flex>
                      <v-flex class="ma-5" xs7 sm7 md6 lg4 xl4>
                        <v-hover>
                          <v-card class="imagen" elevation="6" color="#ffffff00">
                            <v-layout justify-center wrap>
                              <v-img
                                min-height="250"
                                max-height="250"
                                src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-1.2.1&w=1000&q=80"
                              >
                                <v-layout align-end justify-center fill-height>
                                  <v-btn
                                    :color="f1.colorEve"
                                    class="sube merienda"
                                    dark
                                  >Agregar al carro</v-btn>
                                </v-layout>
                              </v-img>
                            </v-layout>
                            <v-card-text>
                              <v-layout justify-center wrap>
                                <v-flex xs12>
                                  <v-layout justify-center>
                                    <span class="meriendaB">Regalo</span>
                                  </v-layout>
                                </v-flex>
                                <v-flex xs12>
                                  <v-layout justify-center>
                                    <span class="meriendaB">$1000</span>
                                  </v-layout>
                                </v-flex>
                              </v-layout>
                            </v-card-text>
                          </v-card>
                        </v-hover>
                      </v-flex>
                      <v-flex class="ma-5" xs7 sm7 md6 lg4 xl4>
                        <v-hover>
                          <v-card class="imagen" elevation="6" color="#ffffff00">
                            <v-layout justify-center wrap>
                              <v-img
                                min-height="250"
                                max-height="250"
                                src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-1.2.1&w=1000&q=80"
                              >
                                <v-layout align-end justify-center fill-height>
                                  <v-btn
                                    class="sube merienda"
                                    :color="f1.colorEve"
                                    dark
                                  >Agregar al carro</v-btn>
                                </v-layout>
                              </v-img>
                            </v-layout>
                            <v-card-text>
                              <v-layout justify-center wrap>
                                <v-flex xs12>
                                  <v-layout justify-center>
                                    <span class="meriendaB">Regalo</span>
                                  </v-layout>
                                </v-flex>
                                <v-flex xs12>
                                  <v-layout justify-center>
                                    <span class="meriendaB">$1000</span>
                                  </v-layout>
                                </v-flex>
                              </v-layout>
                            </v-card-text>
                          </v-card>
                        </v-hover>
                      </v-flex>
                      <v-flex class="ma-5" xs7 sm7 md6 lg4 xl4>
                        <v-hover>
                          <v-card class="imagen" elevation="6" color="#ffffff00">
                            <v-layout justify-center wrap>
                              <v-img
                                min-height="250"
                                max-height="250"
                                src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-1.2.1&w=1000&q=80"
                              >
                                <v-layout align-end justify-center fill-height>
                                  <v-btn
                                    class="sube merienda"
                                    :color="f1.colorEve"
                                    dark
                                  >Agregar al carro</v-btn>
                                </v-layout>
                              </v-img>
                            </v-layout>
                            <v-card-text>
                              <v-layout justify-center wrap>
                                <v-flex xs12>
                                  <v-layout justify-center>
                                    <span class="meriendaB">Regalo</span>
                                  </v-layout>
                                </v-flex>
                                <v-flex xs12>
                                  <v-layout justify-center>
                                    <span class="meriendaB">$1000</span>
                                  </v-layout>
                                </v-flex>
                              </v-layout>
                            </v-card-text>
                          </v-card>
                        </v-hover>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                </v-layout>
              </v-card>
              <v-layout>
                <v-img
                  :src="f1.imagenFooter"
                  gradient="to top right, rgba(0,0,0,.85), rgba(0,0,0,.7)"
                  height="50vh"
                  width="auto"
                >
                  <v-layout fill-height justify-center align-center>
                    <v-card flat color="#ffffff00">
                      <v-layout>
                        <v-flex>
                          <h2 class="mini-titulo merienda text-center">se celebra el</h2>
                          <h1 class="titulo-perfil merienda text-center">{{f1.fechadeEvento}}</h1>
                          <h3 class="text-center mini-titulo merienda">A las: {{f1.horaEvento}}</h3>
                          <h3 class="text-center merienda">En {{f1.ciudad.nombre}}</h3>
                          <h3 class="text-center merienda">la dirección: {{f1.direccion}}</h3>
                        </v-flex>
                      </v-layout>
                    </v-card>
                  </v-layout>
                </v-img>
              </v-layout>
            </v-container>
          </v-content>
        </v-layout>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
var moment = require('moment');
import {
  required,
  email,
  minLength,
  maxLength,
  sameAs
} from "vuelidate/lib/validators";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { nombreCompuesto, Rut } from "@/utilidades/validaciones";
import { firebase, db } from "@/firebase";
import { mapActions, mapState } from "vuex";
import uuidv4 from "uuid/v4";
export default {
  data() {
    return {
      moment:moment,
      mode: "hexa",
      show: false,
      isActive: false,
      galeriaP: false,
      galeriaF: false,
      menu: false,
      menu1: false,
      menu2: false,
      menu3: false,
      previa: false,
      datosEvento: [],
      datosUsuario: {
        id: ""
      },
      Fesid: 0,
      eliminar: false,
      datosCiudades: [],
      datosRegiones: [],
      Aeliminar: [],
      ArrayImagenes: [],
      ArrayFraces: [],
      ArrayCategoriaRegalos: [],
      ArrayCategoriaRC: [],
      ArrayAgregados: [],
      ArrayBanco: ["Bco. Estado"],
      ArrayCuenta: ["Cuenta rut", "Cuenta vista", "Cuenta corriente"],
      regalos: {
        id: "",
        nombre: null
      },
      region: null,

      f1: {
        fraseP: "",
        colorEve: "",
        nombreFest1: "",
        apellidoFest1: "",
        nombreFest2: "",
        apellidoFest2: "",
        check: null,
        frases: "",
        nombEvento: null,
        privada: false,
        password: null,
        ciudad: "",
        direccion: "",
        descripcion: "",
        fechadeEvento: "",
        horaEvento: "",
        imagenPortada: "",
        imagenFooter: "",
        descripcion: "",
        banco: "",
        tipoCuenta: "",
        numCuenta: "",
        rut: null,
        pagoSemanal: false
      },
      e1: 1,
      //  items: ["Bco. Estado", "Bco. De Chile", "Bco. Santander", "Bco. Itau"],

      rules: [
        value =>
          !value ||
          value.size < 2000000 ||
          "La imagen no puede superar los 2 MB de tamaño!"
      ]
    };
  },
  ///--------------Validaciones----------------
  validations: {

    region:{
      required
    },
  
    f1: {
      nombEvento: {
        required
      },
      check:{
        required
      },
        password: {
        required,
        minLength: minLength(6),
        maxLength: maxLength(12)
      },
      nombreFest1:{
          required
      },
       apellidoFest1:{
         required
      },
       nombreFest2:{
         required
      },
       apellidoFest2:{
         required
      },
       ciudad:{
         required
      },
       direccion:{
         required
      },
       fechadeEvento:{
         required
      }, horaEvento:{
         required
      },
      fraseP:{
         required
      },
       frases:{
         required
      },
       descripcion:{
         required,
        minLength: minLength(40)
      },
      colorEve:{
         required
      }, 
       banco:{
         required
      }, 
       tipoCuenta:{
         required
      }, 
       numCuenta:{
         required
      }, 
      rut: {
        required,
        minLength: minLength(7),
        Rut
      }


    }
  },
  ///----------------methods-------------------------
  created() {
    this.consultarEvento();
    this.consultarUsuario(this.datosUsuario);
    this.consultarRegion();
    this.getDatosRegalos();
  },

  methods: {
    onComplete: function() {
      alert("¡Completado!");
    },

    AgregarAMilista(RC) {
      if (this.validarAgregados(RC.id)) {
        Swal.fire({
          icon: "success",
          title: "ya se ha agregado este regalo Agrega otro",
          showConfirmButton: false,
          timer: 1500
        });
      } else {
        this.ArrayAgregados.push({
          id: RC.id,
          nombre: RC.nombre,
          precio: RC.precio,
          Imagen: RC.urlImagen,
          cantidad: 1
        });
        this.ArticulosTotal();
      }
    },
    validarAgregados(id) {
      var sw = 0;
      for (var i = 0; i < this.ArrayAgregados.length; i++) {
        if (this.ArrayAgregados[i].id == id) {
          sw = true;
        }
      }
      return sw;
    },

    AumentarAgregado(agregar) {
      let index = this.ArrayAgregados.indexOf(agregar);
      this.ArrayAgregados[index].cantidad = agregar.cantidad + 1;
    },
    disminuirAgregado(agregar) {
      let index = this.ArrayAgregados.indexOf(agregar);
      if (this.ArrayAgregados[index].cantidad >= 2) {
        this.ArrayAgregados[index].cantidad = agregar.cantidad - 1;
      } else {
        this.ArrayAgregados[index].cantidad = 1;
      }
    },
    quitarAgregado(agregar) {
      let index = this.ArrayAgregados.indexOf(agregar);
      this.ArrayAgregados.splice(index, 1);
      this.ArticulosTotal();
    },
    ArticulosTotal() {
      let total = this.ArrayAgregados.length;
      return (this.TotalCarrito = total);
    },
    async getDatosRegalos() {
      try {
        this.ArrayCategoria = [];
        await db
          .collection("categoriaRegalos")
          .get()
          .then(snapshot => {
            snapshot.forEach(doc => {
              this.ArrayCategoriaRegalos.push(doc.data());
            });
          });
      } catch (error) {
        alert(error);
      }
    },
    async consultarEvento() {
      try {
        let docs = await db.collection("categoriaEventos").get();

        docs.forEach(doc => {
          this.datosEvento.push(doc.data());
        });

        if (this.datosRango.length == 0) {
          this.mostrarAdvertencia("No hay rangos disponibles en el momento.");
        }
      } catch (error) {}
    },

    icono(n) {},

    async consultarFrase() {
      this.ArrayFraces = [];

      try {
        let resultado = await db
          .collection("categoriaEventos")
          .doc(this.f1.check.id)
          .collection("Fraces")
          .get();

        resultado.docs.forEach(doc => {
          this.ArrayFraces.push(doc.data());
        });
      } catch (error) {}
    },

    async consultarImg() {
      this.ArrayImagenes = [];

      let ocupado = {
        visible: true,
        titulo: "",
        mensaje: "Cargando imagenes"
      };

      this.$store.commit("mostrarOcupado", ocupado);

      try {
        let docs = await db
          .collection("categoriaEventos")
          .doc(this.f1.check.id)
          .collection("ImagenesForm")
          .get();
        docs.forEach(doc => {
          this.ArrayImagenes.push(doc.data());
        });
      } catch (error) {
      } finally {
        this.$store.commit("ocultarOcupado");
        this.galeriaP = true;
      }
    },
    async consultarImg2() {
      this.ArrayImagenes = [];

      let ocupado = {
        visible: true,
        titulo: "",
        mensaje: "Cargando imagenes"
      };

      this.$store.commit("mostrarOcupado", ocupado);

      try {
        let docs = await db
          .collection("categoriaEventos")
          .doc(this.f1.check.id)
          .collection("ImagenesForm")
          .get();
        docs.forEach(doc => {
          this.ArrayImagenes.push(doc.data());
        });
      } catch (error) {
      } finally {
        this.$store.commit("ocultarOcupado");
        this.galeriaF = true;
      }
    },
    consultarUsuario(datosUsuario) {
        this.$store.state.vista32 = 1;
      var user = firebase.auth().currentUser;

      if (user != null) {
        this.datosUsuario.id = user.uid;
      }
    },
    async crearEvento() {
      let ocupado = {
        visible: true,
        titulo: "Registrando evento",
        mensaje: "Se esta registrando el evento en la base de datos"
      };

      this.$store.commit("mostrarOcupado", ocupado);
      let id = uuidv4();
       var termino = moment(this.f1.fechadeEvento).add(10, 'd').format('YYYY-MM-DD');
      let evento = {
        evento: this.f1.nombEvento,
        idTipoEvento: this.f1.check.id,
        TipoEvento: this.f1.check.nombre,
        private: this.f1.privada,
        password: this.f1.password,
        festejado1: this.f1.nombreFest1 + " " + this.f1.apellidoFest1,
        festejado2:null,
        banco: this.f1.banco,
        tipoCuenta: this.f1.tipoCuenta,
        pagoSemanal: this.f1.pagoSemanal,
        fecha: this.f1.fechadeEvento,
        fechaFin: termino,
        pareja:this.f1.check.pareja,
        hora: this.f1.horaEvento,
        numCuenta: this.f1.numCuenta,
        rut: this.f1.rut,
        fraseP: this.f1.fraseP,
        fraseD: this.f1.frases,
        portada: this.f1.imagenPortada,
        footer: this.f1.imagenFooter,
        descripcion: this.f1.descripcion,
        usuario: this.datosUsuario.id,
        region: this.region.nombre,
        ciudad: this.f1.ciudad,
        direccion: this.f1.direccion,
        colorCat: this.f1.check.color,
        colorEve: this.f1.colorEve,
        icon: this.f1.check.icono,
        id
      };

      try {
        db.collection("Eventos")
          .doc(id)
          .set(evento);
      } catch (error) {
        alert(error);
      }

      try {
          this.ArrayAgregados.forEach(function(arr) {
           let regalos = {
             Imagen:arr.Imagen,
             cantidad:arr.cantidad,
             id:arr.id,
             nombre:arr.nombre,
             precio:arr.precio
           }
       
          db.collection("Eventos")
          .doc(id)
          .collection("Regalos")
          .doc(arr.id)
          .set(regalos)

          })
          this.$store.commit("ocultarOcupado");
          this.$router.push({ name: "evento", params: { id: id } });
        
      } catch (error) {
      } finally {
        this.$store.commit("ocultarOcupado");
      }
    },


    async crearEvento2() {
      let ocupado = {
        visible: true,
        titulo: "Registrando evento",
        mensaje: "Se esta registrando el evento en la base de datos"
      };

      this.$store.commit("mostrarOcupado", ocupado);

      let id = uuidv4();
       var termino = moment(this.f1.fechadeEvento).add(10, 'd').format('YYYY-MM-DD');
      let evento = {
      evento: this.f1.nombEvento,
        idTipoEvento: this.f1.check.id,
        TipoEvento: this.f1.check.nombre,
        private: this.f1.privada,
        password: this.f1.password,
        festejado1: this.f1.nombreFest1 + " " + this.f1.apellidoFest1,
        festejado2:this.f1.nombreFest2 + " " + this.f1.apellidoFest2,
        banco: this.f1.banco,
        tipoCuenta: this.f1.tipoCuenta,
        pagoSemanal: this.f1.pagoSemanal,
        fecha: this.f1.fechadeEvento,
        fechaFin: termino,
        hora: this.f1.horaEvento,
        numCuenta: this.f1.numCuenta,
        rut: this.f1.rut,
        pareja:this.f1.check.pareja,
        fraseP: this.f1.fraseP,
        fraseD: this.f1.frases,
        portada: this.f1.imagenPortada,
        footer: this.f1.imagenFooter,
        descripcion: this.f1.descripcion,
        usuario: this.datosUsuario.id,
        region: this.region.nombre,
        ciudad: this.f1.ciudad,
        direccion: this.f1.direccion,
        colorCat: this.f1.check.color,
        colorEve: this.f1.colorEve,
        icon: this.f1.check.icono,
        id
      };
      try {
        db.collection("Eventos")
          .doc(id)
          .set(evento);

  
      } catch (error) {
      } 
      try {
          this.ArrayAgregados.forEach(function(arr) {
           let regalos = {
             Imagen:arr.Imagen,
             cantidad:arr.cantidad,
             id:arr.id,
             nombre:arr.nombre,
             precio:arr.precio
           }
       
          db.collection("Eventos")
          .doc(id)
          .collection("Regalos")
          .doc(arr.id)
          .set(regalos)

          })
          this.$store.commit("ocultarOcupado");
          this.$router.push({ name: "evento", params: { id: id } });
        
      } catch (error) {
      } finally {
        this.$store.commit("ocultarOcupado");
      }
    },

    async consultarRegion() {
      this.datosRegiones = [];
      try {
        await db
          .collection("Region")
          .orderBy("nombre")
          .get()
          .then(snapshot => {
            snapshot.forEach(doc => {
              this.datosRegiones.push(doc.data());
            });
          });

        if (this.datosRegiones.length == 0) {
          Swal.fire({
            icon: "info",
            text: "no se a encontrado datos",
            showConfirmButton: false,
            timer: 1500
          });
        }
      } catch (error) {
        Swal.fire({
          icon: "warning",
          text: "no se a encontrado datos",
          showConfirmButton: false,
          timer: 1500
        });
      }
    },
    async consultarCiudad() {
      this.datosCiudades = [];
      try {
        await db
          .collection("Region")
          .doc(this.region.idRegion)
          .collection("Ciudades")
          .orderBy("nombre")
          .get()
          .then(snapshot => {
            snapshot.forEach(doc => {
              this.datosCiudades.push(doc.data());
            });
          });
      } catch (error) {
        alert(error);
      }
    },

    async regalosdisponivles() {
      try {
        this.ArrayCategoriaRC = [];
        let resultado = await db
          .collection("categoriaRegalos")
          .doc(this.regalos.id)
          .collection("RegalosCat")
          .get();

        resultado.docs.forEach(doc => {
          this.ArrayCategoriaRC.push(doc.data());
        });
      } catch (error) {
        alert(error);
      }
    }
  },
  //-----------------watch------------------
  watch: {
    regalos: function(newVal, oldVal) {
      this.regalosdisponivles();
    },
    region: function(newVal, oldVal) {
      this.consultarCiudad();
    }
  },

  //-----------------computed------------------
  computed: {
    ...mapState(["evento", "ocupado", "notificar"]),


    erroresNombre() {
      let errores = [];

      if (!this.$v.f1.nombEvento.$dirty) {
        return errores;
      }

      if (!this.$v.f1.nombEvento.required) {
        errores.push("Ingrese un nombre de evento");
      }
      return errores;
    },
    erroresSeleccionEvento() {
      let errores = [];


      if (!this.$v.f1.check.required) {
        errores.push("Seleccione el tipo de evento");
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

    erroresNombreFest1() {
      let errores = [];

      if (!this.$v.f1.nombreFest1.$dirty) {
        return errores;
      }

      if (!this.$v.f1.nombreFest1.required) {
        errores.push("Ingrese un nombre");
      }
      return errores;
    },
    erroresApellidoFest1() {
      let errores = [];

      if (!this.$v.f1.apellidoFest1.$dirty) {
        return errores;
      }

      if (!this.$v.f1.apellidoFest1.required) {
        errores.push("Ingrese un apellido");
      }
      return errores;
    },
    
    erroresNombreFest2() {
      let errores = [];

      if (!this.$v.f1.nombreFest2.$dirty) {
        return errores;
      }

      if (!this.$v.f1.nombreFest2.required) {
        errores.push("Ingrese un nombre");
      }
      return errores;
    },
    erroresApellidoFest2() {
      let errores = [];

      if (!this.$v.f1.apellidoFest2.$dirty) {
        return errores;
      }

      if (!this.$v.f1.apellidoFest2.required) {
        errores.push("Ingrese un apellido");
      }
      return errores;
    },
     erroresSeleccionRegion() {
      let errores = [];


      if (!this.$v.region.required) {
        errores.push("Seleccione la región");
      }
      return errores;
    },
    erroresSeleccionCiudad() {
      let errores = [];


      if (!this.$v.f1.ciudad.required) {
        errores.push("Seleccione la ciudad");
      }
      return errores;
    },
    erroresDireccion() {
      let errores = [];

      if (!this.$v.f1.direccion.$dirty) {
        return errores;
      }

      if (!this.$v.f1.direccion.required) {
        errores.push("Ingrese una dirección");
      }
      return errores;
    },
    erroresFechaInicio() {
      let errores = [];

      if (!this.$v.f1.fechadeEvento.$dirty) {
        return errores;
      }

      if (!this.$v.f1.fechadeEvento.required) {
        errores.push("Ingrese una fecha");
      }
      return errores;
    },erroresHora() {
      let errores = [];

      if (!this.$v.f1.horaEvento.$dirty) {
        return errores;
      }

      if (!this.$v.f1.horaEvento.required) {
        errores.push("Ingrese una hora");
      }
      return errores;
    },
    erroresFraseP() {
      let errores = [];

      if (!this.$v.f1.fraseP.$dirty) {
        return errores;
      }

      if (!this.$v.f1.fraseP.required) {
        errores.push("Ingrese una frase de portada");
      }
      return errores;
    },
     erroresFrases() {
      let errores = [];

      if (!this.$v.f1.frases.$dirty) {
        return errores;
      }

      if (!this.$v.f1.frases.required) {
        errores.push("Ingrese una frase para tus amigos");
      }
      return errores;
    },
    erroresDescripcion() {
      let errores = [];
      if (!this.$v.f1.descripcion.$dirty) {
        return errores;
      }
      if (!this.$v.f1.descripcion.required) {
        errores.push("Ingresa una descripción");
      }
     
      if (!this.$v.f1.descripcion.minLength) {
        errores.push("Ingresa una descripción de mínimo 40 caracteres");
      }

      return errores;
    },
     erroresColorEve() {
      let errores = [];

      if (!this.$v.f1.colorEve.$dirty) {
        return errores;
      }

      if (!this.$v.f1.colorEve.required) {
        errores.push("Seleccione un color para su evento");
      }
      return errores;
    },
    erroresBanco() {
      let errores = [];

      if (!this.$v.f1.banco.$dirty) {
        return errores;
      }

      if (!this.$v.f1.banco.required) {
        errores.push("Seleccione un banco");
      }
      return errores;
    },erroresTipoCuenta() {
      let errores = [];

      if (!this.$v.f1.tipoCuenta.$dirty) {
        return errores;
      }

      if (!this.$v.f1.tipoCuenta.required) {
        errores.push("Seleccione el tipo de cuenta");
      }
      return errores;
    },
    erroresNumCuenta() {
      let errores = [];

      if (!this.$v.f1.numCuenta.$dirty) {
        return errores;
      }

      if (!this.$v.f1.numCuenta.required) {
        errores.push("Agregue el número de cuenta");
      }
      return errores;
    },

    erroresRut() {
      let errores = [];

      if (!this.$v.f1.rut.$dirty) {
        return errores;
      }

      if (!this.$v.f1.rut.required) {
        errores.push("Ingrese un rut");
      }

      if (!this.$v.f1.rut.minLength) {
        errores.push("El rut debe tener mas de 7 digitos");
      }

      if (!this.$v.f1.rut.Rut) {
        errores.push("El rut ingresado no es valido");
      }

      return errores;
    },

  }
};
</script>

<style>
.nada {
  margin: 0px !important;
  padding: 0px !important;
}
.fondo {
  background-color: #ffffff;
}
.merienda {
  color: white;
  font-family: "Merienda", cursive;
}
.meriendaB {
  color: #a93673;
  font-family: "Merienda", cursive;
}

.mini-titulo {
  font-size: 2vw;
}
.titulo-perfil {
  font-size: 6vw;
}
.texto-descripcion {
  font-size: 20px;
}
.titulo-descripcion {
  font-size: 30px;
}
.bs {
  text-shadow: 160px 200px 44px #000000;
}
</style>