    <template>
<div>
  <!-- **************************** BARRA SUPERIOR ***************************** -->
  <v-app-bar app :color="ColorEnviar" dark>
    <v-app-bar-nav-icon class="bs" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    <v-layout>
      <v-toolbar-title class="merienda bs">Lista regalo</v-toolbar-title>
    </v-layout>

    <v-spacer></v-spacer>

    <v-layout justify-end>
      <v-btn class="bs" text icon>
        <v-icon class="bs">fa-bell</v-icon>
      </v-btn>
      <v-avatar class="mr-2">
        <img :src="usuario.fotoPerfil" max-width="100" max-height="auto" />
      </v-avatar>
      <span class="mt-3 bs">{{ usuario.nombres}} {{usuario.apellido1}}</span>
    </v-layout>
  </v-app-bar>

  <!-- ********************** DRAWER******************** -->
  <v-navigation-drawer v-model="drawer" app temporary fill-height>
    <v-list dense>
      <v-list-item :to="name ='/home/bienvenido'">
        <v-list-item-action>
          <v-icon>fa-home</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Inicio</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item
        class="hidden-md-and-up"
        v-if="usuario.cargo == 'admin'"
        :to="name='/paneladministracion'"
      >
        <v-list-item-action>
          <v-icon>fa-user-cog</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Administración</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item :to="name ='/home/perfilUser'">
        <v-list-item-action>
          <v-icon>account_box</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Perfil</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item :to="name ='/home/formulario'">
        <v-list-item-action>
          <v-icon>fa-clipboard-list</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Crear evento</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-group prepend-icon="event">
        <template v-slot:activator>
          <v-list-content>
            <v-list-item-title>Eventos creados</v-list-item-title>
          </v-list-content>
        </template>
        <v-divider></v-divider>
        <v-list-item
          class="ml-3"
          v-for="n in ArrayEventos "
          :key="n.id"
          :to="{ name: 'evento', params: { id: n.id } }"
        >
          <v-list-item-action>
            <v-icon>{{n.icon}}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{n.evento}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
      <v-divider></v-divider>
      <v-list-item :to="name ='/home/listas'">
        <v-list-item-action>
          <v-icon>fa-list-alt</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Ver eventos</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <template v-slot:append>
      <div class="pa-2">
        <v-btn @click="pruebaPago()" color="primary" block>
          <v-icon left>fa-check</v-icon>firma
        </v-btn>
        <v-btn @click="salir()" color="primary" block>
          <v-icon left>fa-power-off</v-icon>Cerrar Sesion
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>

  <v-content fill-height light class="fondo" v-for="n in ArrayDatos" :key="n.id">
    <v-container fluid class="fondo">
      <v-snackbar dark v-model="notificar.visible" :color="notificar.color" top :timeout="3000">
        {{notificar.mensaje}}
        <v-btn text @click="notificar.visible = false">Cerrar</v-btn>
      </v-snackbar>
      <v-footer class="mt-5" :color="ColorEnviar" dense app>
        <span class="white--text bs">&copy; 2019</span>
        <v-layout align-start justify-start>
          <v-btn icon class="bs" v-if="usuario.cargo == 'admin'" :to="name='/paneladministracion'">
            <v-icon color="#999999">fa-user-cog</v-icon>
          </v-btn>
        </v-layout>
      </v-footer>

      <v-img
        :src="n.portada"
        gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"
        min-height="250"
        max-height="620"
        width="auto"
      >
        <v-layout align-center justify-center row fill-height>
          <v-card flat color="#ffffff00">
            <v-layout align-center justify-center>
              <v-card flat color="#ffffff00"></v-card>
            </v-layout>
            <v-layout align-center justify-center>
              <v-card flat color="#ffffff00">
                <v-flex xs12 sm12 md12 lg12 xl12>
                  <h3 class="text-center merienda mini-titulo bs">{{n.fraseP}}</h3>
                  <h1 class="merienda titulo-perfil text-center mb-5 bs">{{n.festejado1}}</h1>
                  <h1
                    class="merienda subtitulo-perfil text-center mb-5 bs"
                    v-show="n.festejado2 != '' && n.festejado2 != null "
                  >&</h1>
                  <h1
                    class="merienda titulo-perfil text-center mb-5 bs"
                    v-show="n.festejado2 != '' && n.festejado2 != null "
                  >{{n.festejado2}}</h1>
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
          :color="ColorEnviar"
          dark
          class="elevation-7"
        >
          <v-layout class="mt-5 wrap" justify-center>
            <v-card-text class="text-center titulo-descripcion merienda bs">{{n.fraseD}}</v-card-text>
            <v-card-text class="text-center texto-descripcion merienda mb-5 bs">{{n.descripcion}}</v-card-text>
            <v-layout justify-end v-show="usuario.uid == n.usuario">
              <!-- vista para imprimir contenido Telefono -->
              <body>
                <div>
                  <div id="printableTable" style="display: none">
                    <div :style="'background-color:'+ColorEnviar+';'">
                      <div
                        style=" width:100%; height:320px; position:relative; "
                        class="container-fluid"
                      >
                        <div
                          style=" height:90%; display:flex; justify-content:center; align-items:center;"
                        >
                          <img
                            :src="ArrayDatos[0].portada"
                            alt="imagen restaurante"
                            style=" border-style: double;  height:80%; width:98%; object-fit: cover; background-size:cover; position:absolute; z-index:1;"
                          />
                          <div class="container">
                            <h6
                              class="text-center"
                              style="     margin: -1%; padding: 0px;  font-size: 27px; font-family: Brush Script MT;  position:relative; z-index: 1; text-align: center; color: #fff;    text-shadow: 1px 2px #999;"
                            >{{n.TipoEvento}}</h6>
                            <img
                              class="img-responsive img-center"
                              style="  border-radius: 100px; width: 13%;  position:relative; display: block;  margin: auto; z-index: 1; "
                              :src="usuario.fotoPerfil"
                            />
                            <p
                              class="text-center"
                              style="     margin: -1%; padding: 0px;  font-size: 35px; font-family: Brush Script MT; position:relative; z-index: 1; text-align: center; color: #fff;    text-shadow: 1px 2px #999;"
                              :color="ColorEnviar"
                            >{{n.festejado1}}</p>
                          </div>
                        </div>
                      </div>

                      <h1 class="text-center">{{ArrayDatos[0].fraseD}}</h1>
                      <div class="well text-justify">
                        <p>{{ArrayDatos[0].descripcion}}</p>
                      </div>

                      <v-container>
                        <div style="height:45%;">
                          <article
                            class="card shadow"
                            style="height:200px;  border-style: solid;  display: flex; align-items: center; margin: 1rem; overflow: hidden; background-color: #fff;   "
                          >
                            <div style="margin-left: 1%;  width: 100%; ">
                              <div>
                                <h1>www.listaregalo-69a48.firebaseapp.com</h1>
                              </div>
                              <h3>
                                <strong>URL Acortada</strong>
                              </h3>
                              <span>
                                /home/evento/{{eventox}}
                                <div style=" margin-top: 10px"></div>
                              </span>

                              <h3>
                                <strong>Contraseña O Password</strong>
                              </h3>
                              <span>
                                Este evento no cuenta con contraseña
                                <div style=" margin-top: 10px"></div>
                              </span>

                              <span
                                v-show="ArrayEventos[0].password != null"
                              >{{ArrayEventos[0].password}} XDDDDD</span>
                            </div>

                            <div>
                              <div>
                                <img style="height: 200px;" v-bind:src="fullUrl" alt />
                              </div>
                            </div>
                          </article>
                        </div>
                      </v-container>

                      <v-container>
                        <h1 style="margin-left: 1%;">Tus Historias</h1>
                        <article
                          v-for="historias in FotoHistoriaOptener"
                          :key="historias"
                          class="card shadow"
                          style=" border-style: solid;  display: flex; align-items: center; margin: 1rem; overflow: hidden;  background-color: #fff; "
                        >
                          <div style="margin-left: 0.5%;">
                            <img
                              style="  display: block; width: 120px; height: 120px; object-fit: cover;"
                              :src="historias.FotoHistoria"
                              alt="image"
                            />
                          </div>

                          <div style="margin-left: 2%; width: 100%;">
                            <div>
                              <p style="margin-left: 80%;  ">{{historias.fecha}}</p>
                            </div>
                            <h3>
                              <strong>{{historias.Titulo}}</strong>
                            </h3>
                            <span>
                              {{historias.Historia}}
                              <div style=" margin-top: 10px"></div>
                            </span>
                          </div>
                        </article>
                      </v-container>

                      <div style="height: 50px">.</div>
                    </div>
                  </div>

                  <iframe name="print_frame" width="0" height="0" frameborder="0" src="about:blank"></iframe>
                </div>
              </body>
              <!-- vista para imprimir Telefono -->
              <!-- vista para imprimir contenido PC-->
              <body>
                <v-btn @click="sumarArrays()">EstoJunta2Array</v-btn>

                <div id="printMe" style="display: none">
                  <div :style="'background-color:'+ColorEnviar+';'">
                    <div
                      style=" width:100%; height:320px; position:relative; "
                      class="container-fluid"
                    >
                      <div
                        style=" height:90%; display:flex; justify-content:center; align-items:center;"
                      >
                        <img
                          :src="ArrayDatos[0].portada"
                          alt="imagen restaurante"
                          style=" border-style: double;  height:80%; width:98%; object-fit: cover; background-size:cover; position:absolute; z-index:1;"
                        />
                        <div class="container">
                          <h6
                            class="text-center"
                            style="     margin: -1%; padding: 0px;  font-size: 27px; font-family: Brush Script MT;  position:relative; z-index: 1; text-align: center; color: #fff;    text-shadow: 1px 2px #999;"
                          >{{n.TipoEvento}}</h6>
                          <img
                            class="img-responsive img-center"
                            style="  border-radius: 100px; width: 13%;  position:relative; display: block;  margin: auto; z-index: 1; "
                            :src="usuario.fotoPerfil"
                          />
                          <p
                            class="text-center"
                            style="     margin: -1%; padding: 0px;  font-size: 35px; font-family: Brush Script MT; position:relative; z-index: 1; text-align: center; color: #fff;    text-shadow: 1px 2px #999;"
                            :color="ColorEnviar"
                          >{{n.festejado1}}</p>
                        </div>
                      </div>
                    </div>

                    <h1 class="text-center">{{ArrayDatos[0].fraseD}}</h1>
                    <div class="well text-justify">
                      <p>{{ArrayDatos[0].descripcion}}</p>
                    </div>

                    <v-container>
                      <div style="height:45%;">
                        <article
                          class="card shadow"
                          style="height:200px;  border-style: solid;  display: flex; align-items: center; margin: 1rem; overflow: hidden; background-color: #fff;   "
                        >
                          <div style="margin-left: 1%;  width: 100%; ">
                            <div>
                              <h1>www.listaregalo-69a48.firebaseapp.com</h1>
                            </div>
                            <h3>
                              <strong>URL Acortada</strong>
                            </h3>
                            <span>
                              /home/evento/{{eventox}}
                              <div style=" margin-top: 10px"></div>
                            </span>

                            <h3>
                              <strong>Contraseña O Password</strong>
                            </h3>
                            <span>
                              Este evento no cuenta con contraseña
                              <div style=" margin-top: 10px"></div>
                            </span>

                            <span
                              v-show="ArrayEventos[0].password != null"
                            >{{ArrayEventos[0].password}} XDDDDD</span>
                          </div>

                          <div>
                            <div>
                              <img style="height: 200px;" v-bind:src="fullUrl" alt />
                            </div>
                          </div>
                        </article>
                      </div>
                    </v-container>

                    <v-container>
                      <h1 style="margin-left: 1%;">Tus Historias</h1>
                      <article
                        v-for="historias in FotoHistoriaOptener"
                        :key="historias"
                        class="card shadow"
                        style=" border-style: solid;  display: flex; align-items: center; margin: 1rem; overflow: hidden;  background-color: #fff; "
                      >
                        <div style="margin-left: 0.5%;">
                          <img
                            style="  display: block; width: 120px; height: 120px; object-fit: cover;"
                            :src="historias.FotoHistoria"
                            alt="image"
                          />
                        </div>

                        <div style="margin-left: 2%; width: 100%;">
                          <div>
                            <p style="margin-left: 80%;  ">{{historias.fecha}}</p>
                          </div>
                          <h3>
                            <strong>{{historias.Titulo}}</strong>
                          </h3>
                          <span>
                            {{historias.Historia}}
                            <div style=" margin-top: 10px"></div>
                          </span>
                        </div>
                      </article>
                    </v-container>

                    <div style="height: 50px">.</div>
                  </div>
                </div>
              </body>
              <!-- vista para imprimir contenido  PC-->

              <v-btn
                @click="print"
                color="#000000"
                justify-end
                class="ma-2 mr-1 elevation-10 hidden-sm-and-down bs"
              >
                <v-icon color="#ffffff">fa-print</v-icon>
              </v-btn>

              <v-btn
                color="red"
                justify-end
                @click="printDiv()"
                class="ma-2 mr-1 elevation-10 hidden-md-and-up bs"
              >
                <v-icon color="#ffffff">fa-print</v-icon>
              </v-btn>

              <v-btn
                color="#000000"
                justify-end
                @click="editarDiseñoPag(n)"
                class="ma-2 mr-6 elevation-10"
              >
                <v-icon color="#ffffff">fa-cog</v-icon>
              </v-btn>
            </v-layout>
          </v-layout>
        </v-card>
      </v-layout>
      <v-layout justify-center wrap class="mt-5">
        <v-flex xs10 sm10 md5 lg5 xl5 class="ml-4 mr-4">
          <v-layout align-center wrap>
            <v-flex xs12>
              <h3 v-show="n.evento == 'Boda'" class="text-center meriendaB">Antes de casarnos</h3>
              <h1 v-show="n.evento == 'Boda'" class="text-center meriendaB">Nuestras Historias</h1>
              <h1 v-show="n.evento != 'Boda'" class="text-center meriendaB">Mis Historias</h1>
            </v-flex>
            <v-layout v-show="n.evento == 'Boda'" justify-center>
              <img class="mt-5 mb-5" :src="require('@/assets/decorativo2.png')" />
            </v-layout>
          </v-layout>
          <v-layout justify-center class="mb-10">
            <v-timeline
              fill-dot
              clipped
              dense
              reverse
              v-show="FotoHistoriaOptener != 0"
              class="hidden-md-and-down"
            >
              <v-timeline-item v-show="usuario.uid == n.usuario" fill-dot class="mb-12" large>
                <template v-slot:icon>
                  <v-btn @click="nuevaHistoria=true" dark fab :color="ColorEnviar">
                    <v-icon class="bs">fa-plus</v-icon>
                  </v-btn>
                </template>
              </v-timeline-item>
              <v-timeline-item
                :color="ColorEnviar"
                v-for="historias in FotoHistoriaOptener"
                :key="historias"
              >
                <v-card class="elevation-2">
                  <v-layout>
                    <v-flex class="ma-4">
                      <v-img
                        width="200"
                        height="200"
                        max-width="200"
                        max-height="200"
                        class="mt-5"
                        :src="historias.FotoHistoria"
                      />
                    </v-flex>
                    <v-flex>
                      <v-card-title class="headline">{{historias.Titulo}}</v-card-title>
                      <v-card-text>{{historias.fecha}}</v-card-text>
                      <v-card-text>{{historias.Historia}}</v-card-text>
                    </v-flex>
                  </v-layout>
                  <v-card-text v-show="usuario.uid == n.usuario">
                    <v-layout justify-end>
                      <v-btn
                        fab
                        small
                        color="error"
                        @click="EliminarHistoria(historias)"
                        class="ma-3"
                      >
                        <v-icon small>fa-trash</v-icon>
                      </v-btn>
                      <v-btn
                        fab
                        small
                        color="warning"
                        @click="editarHistoria(historias)"
                        class="ma-3"
                      >
                        <v-icon small>fa-pen</v-icon>
                      </v-btn>
                    </v-layout>
                  </v-card-text>
                </v-card>
              </v-timeline-item>
            </v-timeline>
            <v-timeline
              fill-dot
              clipped
              dense
              reverse
              v-show="FotoHistoriaOptener != 0"
              class="hidden-lg-and-up"
            >
              <v-timeline-item v-show="usuario.uid == n.usuario" fill-dot class="mb-12" large>
                <template v-slot:icon>
                  <v-btn @click="nuevaHistoria=true" dark fab :color="ColorEnviar">
                    <v-icon class="bs">fa-plus</v-icon>
                  </v-btn>
                </template>
              </v-timeline-item>
              <v-timeline-item
                :color="ColorEnviar"
                v-for="historias in FotoHistoriaOptener"
                :key="historias"
              >
                <v-card class="elevation-2">
                  <v-layout justify-center>
                    <v-flex>
                      <v-card-title class="headline text-center">{{historias.Titulo}}</v-card-title>
                      <v-card-text>{{historias.fecha}}</v-card-text>
                      <v-card-text>
                        <v-img
                          width="auto"
                          height="500"
                          max-width="auto"
                          max-height="500"
                          class="mt-5"
                          :src="historias.FotoHistoria"
                        />
                      </v-card-text>
                      <v-card-text>{{historias.Historia}}</v-card-text>
                    </v-flex>
                  </v-layout>
                  <v-card-text v-show="usuario.uid == n.usuario">
                    <v-layout justify-end>
                      <v-btn
                        fab
                        small
                        color="error"
                        @click="EliminarHistoria(historias)"
                        class="ma-3"
                      >
                        <v-icon small>fa-trash</v-icon>
                      </v-btn>
                      <v-btn
                        fab
                        small
                        color="warning"
                        @click="editarHistoria(historias)"
                        class="ma-3"
                      >
                        <v-icon small>fa-pen</v-icon>
                      </v-btn>
                    </v-layout>
                  </v-card-text>
                </v-card>
              </v-timeline-item>
            </v-timeline>
            <v-layout wrap justify-center v-show="FotoHistoriaOptener == 0">
              <v-flex xs12>
                <p
                  class="meriendaB mt-4 text-center"
                  v-show="FotoHistoriaOptener == 0"
                >No hay Historias que mostrar</p>
              </v-flex>
              <v-btn
                @click="nuevaHistoria=true"
                class="mt-5 mb-5"
                dark
                fab
                :color="ColorEnviar"
                v-show="usuario.uid == n.usuario"
              >
                <v-icon>fa-plus</v-icon>
              </v-btn>
            </v-layout>
          </v-layout>
        </v-flex>
        <v-flex xs10 sm10 md5 lg5 xl5>
          <v-layout wrap justify-center>
            <v-flex xs12>
              <h1 class="meriendaB text-center">Lista de regalos simbolicos</h1>
            </v-flex>
            <v-flex xs12>
              <v-layout v-show="n.evento == 'Boda'" justify-center>
                <img class="mt-5 mb-5" :src="require('@/assets/decorativo2.png')" />
              </v-layout>
            </v-flex>
          </v-layout>

          <!-- ************* SECCION REGALO ************ -->
          <v-layout wrap justify-center>
            <v-flex
              v-show="FotoRegaloOptener != 0"
              class="ma-5"
              xs7
              sm7
              md6
              lg4
              xl4
              v-for="regalos in FotoRegaloOptener"
              :key="regalos"
            >
              <v-hover>
                <v-card class="imagen" elevation="6" color="#ffffff00">
                  <v-layout justify-center wrap>
                    <v-img min-height="250" max-height="250" :src="regalos.Imagen" class="ma-4">
                      <v-layout align-end justify-center fill-height>
                        <v-btn
                          @click="AgregarAlCarro(regalos)"
                          class="sube merienda white--text bs"
                          :color="ColorEnviar"
                        >
                          <h4>Agregar al carro</h4>
                        </v-btn>
                      </v-layout>
                    </v-img>
                  </v-layout>
                  <v-card-text>
                    <v-layout justify-center wrap>
                      <v-flex xs12>
                        <v-layout justify-center>
                          <span class="meriendaB">{{regalos.nombre}}</span>
                        </v-layout>
                      </v-flex>
                      <v-flex xs12>
                        <v-layout justify-center>
                          <span class="meriendaB">${{regalos.precio | currency}}</span>
                        </v-layout>
                      </v-flex>
                      <v-layout justify-end v-show="usuario.uid == n.usuario">
                        <v-btn
                          fab
                          x-small
                          @click="EliminarRegalos(regalos)"
                          class="ma-1"
                          color="error"
                        >
                          <v-icon x-small>fa-trash</v-icon>
                        </v-btn>
                        <v-btn
                          fab
                          x-small
                          @click="editarRegalo(regalos)"
                          class="ma-1"
                          color="warning"
                        >
                          <v-icon x-small>fa-pen</v-icon>
                        </v-btn>
                      </v-layout>
                    </v-layout>
                  </v-card-text>
                </v-card>
              </v-hover>
            </v-flex>
            <p
              class="meriendaB text-center mt-4"
              v-show="FotoRegaloOptener == 0"
            >La lista de regalos esta vacia</p>
          </v-layout>
          <v-layout justify-center v-show="usuario.uid == n.usuario">
            <v-btn @click="nuevoRegalo=true" dark class="mt-5 mb-5" :color="ColorEnviar">
              <v-icon small class="mr-2">fa-plus</v-icon>Agregar regalo personalizado
            </v-btn>
          </v-layout>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-img
          :src="n.footer"
          gradient="to top right, rgba(0,0,0,.85), rgba(0,0,0,.7)"
          height="50vh"
          width="auto"
        >
          <v-layout fill-height justify-center align-center>
            <v-card flat color="#ffffff00">
              <v-layout>
                <v-flex>
                  <h2 class="mini-titulo merienda text-center">se celebra el</h2>
                  <h1 class="titulo-perfil merienda text-center">{{n.fecha}}</h1>
                  <h3 class="text-center mini-titulo merienda">A las: {{n.hora}}</h3>
                  <h3 class="text-center merienda">En {{n.ciudad}}</h3>
                  <h3 class="text-center merienda">la dirección {{n.direccion}}</h3>
                </v-flex>
              </v-layout>
            </v-card>
          </v-layout>
        </v-img>
      </v-layout>
      <!--  -->
      <v-btn
        fab
        dark
        large
        @click="Carrito = true"
        class="bs elevation-5 mb-10"
        :color="ColorEnviar"
        fixed
        right
        bottom
      >
        <span>{{TotalCarrito | currency}}</span>
        <v-icon dark>fa-shopping-cart</v-icon>
      </v-btn>
    </v-container>

    <!-- Dialog del color picker -->

    <v-dialog v-model="colores" max-width="300">
      <v-card>
        <v-color-picker flat show-swatches v-model="editPag.EdcolorEve"></v-color-picker>
        <v-card-text>
          <v-layout row wrap justify-center>
            <v-btn
              class="mt-2"
              @click="colores = false;  editPag.EdcolorEve = n.colorEve"
              color
              text
            >cancelar</v-btn>
            <v-btn class="mt-2" @click="colores = false" color text>guardar</v-btn>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-content>
  <!-------------------------------------Modal carrito  ------------------------------------------>
  <v-dialog v-model="Carrito" fullscreen transition="dialog-bottom-transition">
    <v-card>
      <v-toolbar :color="ColorEnviar" dark>
        <v-toolbar-title>
          <v-icon class="mr-2 mb-1">fa-shopping-cart</v-icon>Carrito
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="Carrito = false">
          <v-icon dark>fa-times</v-icon>
        </v-btn>
      </v-toolbar>
      <v-layout justify-center align-center wrap fill-height>
        <v-flex xs12 md7>
          <v-card class="ma-6" min-height="500" tile elevation="0">
            <v-toolbar :color="ColorEnviar">
              <v-layout wrap justify-center align-end fill-height>
                <v-flex xs12>
                  <h2 class="merienda text-center">Regalos en el carrito</h2>
                </v-flex>
              </v-layout>
            </v-toolbar>
            <v-card-text>
              <v-simple-table>
                <thead>
                  <tr>
                    <th>Detalles</th>
                    <th>Precio</th>
                    <th>Cantidad</th>
                    <th>acciones</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="carrito in ArrayCarrito" :key="carrito">
                    <td>
                      <v-card tile elevation="0" class="my-4" color="#ffffff00">
                        <v-layout row wrap>
                          <v-flex xs5>
                            <v-card max-width="100" max-height="100">
                              <v-img :src="carrito.imagen" max-height="120" max-width="150"></v-img>
                            </v-card>
                          </v-flex>
                          <v-flex xs6>
                            <v-layout align-center justify-center fill-height>
                              <v-flex xs12>
                                <span class="center-text">{{carrito.nombre}}</span>
                              </v-flex>
                            </v-layout>
                          </v-flex>
                        </v-layout>
                      </v-card>
                    </td>
                    <td>${{carrito.precio | currency}}</td>
                    <td>
                      <v-card tile elevation="0" color="#ffffff00">
                        <v-layout align-center fill-height>
                          <v-flex xs2 class="mr-1">
                            <v-btn
                              fab
                              x-small
                              class="ma-1"
                              flat
                              icon
                              elevation="0"
                              @click="disminuir(carrito)"
                              :color="ColorEnviar"
                            >
                              <v-icon dark>fa-minus</v-icon>
                            </v-btn>
                          </v-flex>
                          <v-flex xs2 class="ml-1">
                            <v-card height="30" width="30">
                              <v-layout align-center fill-height justify-center>
                                <v-flex xs12 class="ml-2">{{carrito.cantidad}}</v-flex>
                              </v-layout>
                            </v-card>
                          </v-flex>
                          <v-flex xs2>
                            <v-btn
                              fab
                              x-small
                              icon
                              class="ma-1"
                              @click="Aumentar(carrito)"
                              flat
                              elevation="0"
                              :color="ColorEnviar"
                            >
                              <v-icon dark>fa-plus</v-icon>
                            </v-btn>
                          </v-flex>
                        </v-layout>
                      </v-card>
                    </td>
                    <td>
                      <v-btn
                        fab
                        x-small
                        class="ma-1"
                        flat
                        elevation="0"
                        @click="eliminar(carrito)"
                        :color="ColorEnviar"
                        dark
                      >
                        <v-icon>fa-trash</v-icon>
                      </v-btn>
                    </td>
                  </tr>
                </tbody>
              </v-simple-table>
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex xs12 md3 class="mb-5">
          <v-card color="#F3F3F3" class="mt-6" tile elevation="0">
            <v-card-title>
              <v-layout wrap justify-center>
                <v-flex xs12>
                  <h5 class="text-center">Resumen de pedido</h5>
                </v-flex>
                <v-flex xs11 class="mt-3 mb-3">
                  <v-divider></v-divider>
                </v-flex>
              </v-layout>
            </v-card-title>
            <v-card-text>
              <v-layout row wrap>
                <v-flex xs12>
                  <v-layout wrap justify-center>
                    <v-flex xs4 class="ml-10">
                      <span class="font-weight-bold">{{total | currency}} regalos</span>
                    </v-flex>
                    <v-spacer></v-spacer>
                    <v-flex xs3>
                      <span class="font-weight-black ml-5">${{totalPagar | currency}}</span>
                    </v-flex>
                    <v-flex xs10 class="mt-3 mb-1">
                      <v-divider></v-divider>
                    </v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-card-text>
            <v-card-subtitle>
              <v-layout justify-center wrap>
                <v-flex xs12>
                  <h4 class="text-center">Detalles</h4>
                </v-flex>
              </v-layout>
            </v-card-subtitle>
            <v-card-text>
              <v-layout wrap>
                <v-flex xs12>
                  <v-layout column wrap>
                    <v-layout wrap v-for="item in ArrayCarrito" :key="item.id">
                      <v-flex xs4 class="ml-10">
                        <span class="font-weight-bold">{{item.cantidad}} {{item.nombre}}</span>
                      </v-flex>
                      <v-spacer></v-spacer>
                      <v-flex xs3>
                        <span
                          class="font-weight-black ml-5"
                        >${{item.cantidad * item.precio | currency}}</span>
                      </v-flex>
                    </v-layout>
                    <v-flex xs10 class="mb-10">
                      <v-divider class="mt-4"></v-divider>
                    </v-flex>
                    <v-flex xs10>
                      <v-textarea outlined label="Mensaje de dedicatoria" v-model="dedicatoria"></v-textarea>
                    </v-flex>
                    <v-flex xs10 class="mt-1">
                      <v-divider class="mt-4"></v-divider>
                    </v-flex>

                    <v-flex xs7 class="mt-3">
                      <v-layout wrap justify-center>
                        <span class="font-weight-bold text-center">Total:</span>
                        <span class="font-weight-black ml-5 text-center">${{totalPagar | currency}}</span>
                      </v-layout>
                    </v-flex>

                    <v-flex xs12 class="mt-3">
                      <v-layout justify-center>
                        <v-btn @click="comprarCarrito" :color="ColorEnviar" dark>
                          <v-icon class="mr-2" small>fa-dollar-sign</v-icon>Pagar
                        </v-btn>
                      </v-layout>
                    </v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-card>
    <v-dialog v-model="ocupado.visible" hide-overlay persistent width="500">
      <v-card>
        <v-toolbar color="primary" dark class="mb-5">
          <v-toolbar-title>{{ocupado.titulo}}</v-toolbar-title>
        </v-toolbar>
        <v-card-text class="mb-4">{{ocupado.mensaje}}</v-card-text>
        <v-progress-linear indeterminate></v-progress-linear>
      </v-card>
    </v-dialog>
  </v-dialog>

  <!--                        MODAL EDITAR DESEÑO DE PAG                   -->
  <v-dialog persistent v-model="dialogDiseñoPag" max-width="600">
    <v-layout justify-center>
      <v-card width="600">
        <v-toolbar :color="editPag.EdcolorEve" dark>
          <v-toolbar-title>
            <h3 class="merienda bs">Editar Pagina</h3>
          </v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-layout row wrap justify-center>
            <v-flex xs11>
              <v-text-field v-model="editPag.Edevento" outlined label="Titulo del regalo"></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row wrap justify-center>
            <v-flex xs11>
              <v-text-field v-model="editPag.Eddescripcion" outlined label="Titulo del regalo"></v-text-field>
            </v-flex>
          </v-layout>
          <v-col cols="12" sm="6">
            <v-layout align-center justify-center wrap>
              <v-flex xs10>
                <v-text-field v-model=" editPag.EdcolorEve" @click="colores=true" label="Color"></v-text-field>
              </v-flex>
              <v-flex xs2>
                <v-icon :color=" editPag.EdcolorEve">fa-palette</v-icon>
              </v-flex>
            </v-layout>
          </v-col>
        </v-card-text>

        <v-card-text>
          <v-layout justify-end>
            <v-btn
              color="red"
              @click="dialogDiseñoPag = false, vista == 1"
              dark
              class="ma-2"
            >Cancelar</v-btn>

            <v-btn color="success" @click="subirEditarPag()" dark class="ma-2">Guardar</v-btn>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-layout>
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
  <v-snackbar class="sp" v-model="agregado" color="#fffff000" top timeout="2000">
    <v-card>
      <v-layout wrap>
        <v-card>
          <v-toolbar :color="Ragregado.color" dark elevation="0">
            <v-spacer></v-spacer>
            <v-toolbar-title class="title">
              <v-icon small class="mr-2">fa-check</v-icon>Regalo añadido al carrito
            </v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-layout wrap>
            <v-flex xs6>
              <v-card elevation="0">
                <v-card-text>
                  <v-layout wrap>
                    <v-flex xs6>
                      <v-img height="200px" width="100%" :src="Ragregado.imagen"></v-img>
                    </v-flex>
                    <v-flex xs5 fill-height>
                      <v-layout column wrap align-center>
                        <v-flex xs12>
                          <p class="text-center title font-weight-black">1 {{Ragregado.nombre}}</p>
                        </v-flex>
                        <v-flex xs12>
                          <p class="text-center subtitle-1">${{Ragregado.precio | currency}}</p>
                        </v-flex>
                      </v-layout>
                    </v-flex>
                  </v-layout>
                </v-card-text>
              </v-card>
            </v-flex>
            <v-divider vertical class="mt-3 mb-3"></v-divider>
            <v-flex xs5 class="mt-3">
              <v-layout column wrap>
                <v-flex xs12>
                  <p class="text-center title">Hay {{total}} regalos en tu carrito</p>
                </v-flex>
                <v-flex xs12>
                  <p class="text-center">
                    <strong>Precio del regalo</strong>
                    : ${{Ragregado.precio | currency}}
                  </p>
                </v-flex>
                <v-flex xs12>
                  <p class="text-center">
                    <strong>Total del carrito</strong>
                    :${{totalPagar | currency}}
                  </p>
                </v-flex>
                <v-flex xs12>
                  <v-layout justify-center>
                    <vflex xs12 class="ml-1 mr-1">
                      <v-btn color="error" @click="agregado = false">Cerrar</v-btn>
                    </vflex>
                    <vflex xs12 class="ml-1 mr-1">
                      <v-btn color="success" @click="agregado = false,Carrito = true">
                        <v-icon small class="mr-2">fa-shopping-cart</v-icon>Ir al carrito
                      </v-btn>
                    </vflex>
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-card>
      </v-layout>
    </v-card>
  </v-snackbar>

  <!-- MODAL DE HISTORIA  -->
  <v-dialog persistent v-model="nuevaHistoria" max-width="600">
    <v-layout justify-center>
      <v-card width="600">
        <v-toolbar :color="ColorEnviar" dark>
          <v-toolbar-title>
            <h3 class="merienda bs">{{fh.tituloF}}</h3>
          </v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-layout row wrap justify-center>
            <v-flex xs11>
              <v-text-field v-model="fh.titulo" outlined label="Titulo de la historia"></v-text-field>
            </v-flex>
            <v-flex xs11>
              <v-textarea v-model="fh.historia" outlined label="¿Que sucedio?"></v-textarea>
            </v-flex>
            <v-flex xs11 class="mt-5">
              <file-pond
                v-if="vista == 1"
                @addfile="cargarImagen"
                instant-upload="false"
                fileValidateTypeLabelExpectedTypes="Se esperaba {allButLastType} o {lastType}"
                labelFileTypeNotAllowed="Agrega una imagen .png o .jpg"
                accepted-file-types="image/jpeg, image/png"
                label-idle="Selecciona o arrastra una imagen..."
              ></file-pond>
              <v-responsive v-if="vista == 2">
                <img ref="imagenOriginal" src alt class="edicionImagen" />
              </v-responsive>
              <v-btn @click="limpiar()">cancelar imagen</v-btn>
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-card-text>
          <v-layout justify-end>
            <v-btn color="red" @click="limpiarHistoria()" dark class="ma-2">Cancelar</v-btn>
            <v-btn
              v-show="fh.tituloF == 'Agregar Historia'"
              color="success"
              @click="AgregarHistoria()"
              dark
              class="ma-2"
            >Subir historia</v-btn>
            <v-btn
              v-show="fh.tituloF == 'Editar Historia'"
              color="success"
              @click="EditarHistoria(fh)"
              dark
              class="ma-2"
            >Guardar cambios</v-btn>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-layout>
  </v-dialog>
  <!--                        MODAL EDITAR HISTORIA                    -->

  <v-dialog persistent v-model="editarHistoriaMdl" max-width="600">
    <v-layout justify-center>
      <v-card width="600">
        <v-toolbar :color="ColorEnviar" dark>
          <v-toolbar-title>
            <h3 class="merienda bs">{{fHisEdit.tituloF}}</h3>
          </v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-layout row wrap justify-center>
            <v-flex xs11>
              <v-text-field v-model="fHisEdit.titulo" outlined label="Titulo de la historia"></v-text-field>
            </v-flex>
            <v-flex xs11>
              <v-textarea v-model="fHisEdit.historia" outlined label="¿Que sucedio?"></v-textarea>
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-card-text>
          <v-layout justify-end>
            <v-btn color="red" @click="editarHistoriaMdl = false" dark class="ma-2">Cancelar</v-btn>
            <v-btn
              v-show="fh.tituloF == 'Agregar Historia'"
              color="success"
              @click="subirHistoriaEditar()"
              dark
              class="ma-2"
            >Editar historia</v-btn>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-layout>
  </v-dialog>

  <!--                        MODAL AGREGAR DE REGALO                   -->
  <v-dialog persistent v-model="nuevoRegalo" max-width="600">
    <v-layout justify-center>
      <v-card width="600">
        <v-toolbar :color="ColorEnviar" dark>
          <v-toolbar-title>
            <h3 class="merienda bs">{{fR.tituloF}}</h3>
          </v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-layout row wrap justify-center>
            <v-flex xs11>
              <v-text-field v-model="fR.tituloR" outlined label="Titulo del regalo"></v-text-field>
            </v-flex>
            <v-flex xs11>
              <v-text-field type="number" v-model="fR.monto" outlined label="Monto"></v-text-field>
            </v-flex>
            <v-flex xs11>
              <v-text-field type="number" v-model="fR.stock" outlined label="Stock"></v-text-field>
            </v-flex>
            <v-flex xs11 class="mt-5">
              <file-pond
                v-if="vista == 1"
                @addfile="cargarImagen2"
                instant-upload="false"
                fileValidateTypeLabelExpectedTypes="Se esperaba {allButLastType} o {lastType}"
                labelFileTypeNotAllowed="Agrega una imagen .png o .jpg"
                accepted-file-types="image/jpeg, image/png"
                label-idle="Selecciona o arrastra una imagen..."
              ></file-pond>
              <v-responsive v-if="vista == 2">
                <img ref="imagenOriginal2" src alt class="edicionImagen" />
              </v-responsive>
              <v-btn @click="limpiar2()">cancelar imagen</v-btn>
            </v-flex>
          </v-layout>
        </v-card-text>

        <v-card-text>
          <v-layout justify-end>
            <v-btn color="red" @click="limpiarRegalo()" dark class="ma-2">Cancelar</v-btn>

            <v-btn
              v-show="fR.tituloF == 'Agregar Regalo'"
              color="success"
              @click="AgregarRegalo()"
              dark
              class="ma-2"
            >Subir Regalo</v-btn>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-layout>
  </v-dialog>

  <!--                        MODAL EDITAR DE REGALO                   -->
  <v-dialog persistent v-model="editarRegaloMdl" max-width="600">
    <v-layout justify-center>
      <v-card width="600">
        <v-toolbar :color="ColorEnviar" dark>
          <v-toolbar-title>
            <h3 class="merienda bs">{{fRedit.tituloF}}</h3>
          </v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-layout row wrap justify-center>
            <v-flex xs11>
              <v-text-field v-model="fRedit.tituloR" outlined label="Titulo del regalo"></v-text-field>
            </v-flex>
            <v-flex xs11>
              <v-text-field type="number" v-model="fRedit.monto" outlined label="Monto"></v-text-field>
            </v-flex>
          </v-layout>
        </v-card-text>

        <v-card-text>
          <v-layout justify-end>
            <v-btn
              color="red"
              @click="editarRegaloMdl = false, vista == 1"
              dark
              class="ma-2"
            >Cancelar</v-btn>

            <v-btn
              v-show="fR.tituloF == 'Agregar Regalo'"
              color="success"
              @click="subirRegaloEditar()"
              dark
              class="ma-2"
            >Subir Regalo</v-btn>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-layout>
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
</div>
</template>


<script>
import Vue from "vue";
import VueHtmlToPaper from "vue-html-to-paper";

const options = {
  name: "_blank",
  specs: ["titlebar=yes"]
};

Vue.use(VueHtmlToPaper, options);

// or, using the defaults with no stylesheet

Vue.use(VueHtmlToPaper);

var moment = require("moment");

import { auth, db, storage } from "@/firebase";
import { mapActions, mapState, mapMutations } from "vuex";
import vueFilePond from "vue-filepond";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import "filepond/dist/filepond.min.css";
import Cropper from "cropperjs/dist/cropper";
import "cropperjs/dist/cropper.css";
import uuidv4 from "uuid/v4";
import axios from "axios";
import { URLSearchParams } from 'url';
import Axios from 'axios';
const FilePond = vueFilePond(FilePondPluginFileValidateType);

export default {
  name: "Eventos",
  components: { FilePond },
  data() {
    return {
      oldestFirst: true,
      apiKey: "TEST-11638eaf-7e01-40cd-83ef-af9195cd2bac",
      token:"TEST-8490584518945044-121220-c7d11485947b4470400e2b10c31faae0-235269402",
      app_id:"8490584518945044",
      Redirect_URI:"https://www.mercadopago.com/",
      fechaparalaHistoria: "",
      ArrayMaestra: [],
      QRE: {},
      output: null,
      drawer: false,
      colorBar: "",
      color: "",
      editPag: {
        Edfestejado1: "",
        Edfestejado2: "",
        Edbanco: "",
        Edciudad: "",
        EdcolorEve: "",
        EdcolorCat: "",
        Eddescripcion: "",
        Eddireccion: "",
        Edevento: "",
        Edfecha: "",
        EdfechaFin: "",
        Edfooter: "",
        EdfraseD: "",
        EdfraseP: "",
        Edhora: "",
        Edicon: "",
        Edid: "",
        EdtipoEvento: "",
        EdidTipoEvento: "",
        EdpagoSemanal: "",
        EdtipoCuenta: "",
        EdnumCuenta: "",
        Edpassword: "",
        Edportada: "",
        Edprivate: "",
        Edusuario: "",
        EdRegion: ""
      },
      evento: "",
      ArrayDatos: [],
      FotoHistoriaOptener: [],
      FotoRegaloOptener: [],
      vista: 1,
      hover: false,
      indexE: 0,
      fh: {
        tituloF: "Agregar Historia",
        titulo: "",
        historia: "",
        dialogFecha: false
      },
      Ragregado: {
        color: "",
        nombre: "",
        imagen: "",
        precio: "",
        cantidad: ""
      },
      fR: {
        tituloF: "Agregar Regalo",
        tituloR: "",
        monto: "",
        stock: ""
      },

      fRedit: {
        tituloF: "Editar Regalo",
        tituloR: "",
        monto: "",
        stock: "",
        idEditarRegalo: "",
        urlFotoEdit: "",
        uidUser: ""
      },
      fHisEdit: {
        tituloF: "Editar Historia",
        titulo: "",
        historia: "",
        urlFotoEditHistoria: "",
        uidUser: "",
        idEditarHistoria: "",
        fecha: new Date().toISOString().substr(0, 10),
        dialogFecha: false
      },
      dialogDiseñoPag: false,
      agregado: false,
      colores: false,
      nuevaHistoria: false,
      nuevoRegalo: false,
      editarRegaloMdl: false,
      editarHistoriaMdl: false,
      Carrito: false,
      ArrayCarrito: [],
      TotalCarrito: 0,
      eventox: null,
      ArrayEventos: [],
      dedicatoria: null
    };
  },

  // ***************** METHODS ****************
  methods: {
    ...mapActions(["cerrarSesion"]),
    ...mapState(["evento", "ocupado", "notificar", "usuario"]),

    actualizarColor(ColorEnviar) {
      this.ColorEnviar = ColorEnviar;
    },
    updateCurrentTime() {
      this.fechaparalaHistoria = moment().format("YYYY-MM-DD hh:mm:ss");
    },

    pruebas(){


      axios.get().then(){

      }

    },

    cargarArraY(v) {
      this.ArrayMaestra.push({
        fotoId: v.fotoId,
        FotoHistoria: v.FotoHistoria,
        uid: v.uid,
        fecha: v.fecha,
        Titulo: v.Titulo,
        Historia: v.Historia
      });
    },

    cargarArraYR(v) {
      this.ArrayMaestra.push({
        fotoId: v.Imagen,
        FotoHistoria: v.cantidad,
        id: v.id,

        nombre: v.nombre,
        precio: v.precio
      });
    },


    sumarArrays() {
      try {
        let ff = this.FotoHistoriaOptener;

        ff.filter((v, index) => {
          this.cargarArraY(v);
        });

        let GG = this.FotoRegaloOptener;

        GG.filter((v, index) => {
          this.cargarArraYR(v);
        });
      } catch (error) {
        alert(error);
      }
    },
    // IMPRIMIR

    print() {
      this.$htmlToPaper("printMe");
    },

    printDiv: function() {
      window.frames[
        "print_frame"
      ].document.body.innerHTML = document.getElementById(
        "printableTable"
      ).innerHTML;
      window.frames["print_frame"].window.focus();
      window.frames["print_frame"].window.print();
    },

    buildUrl: function() {
      this.fullUrl =
        "https://chart.googleapis.com/chart?cht=qr&chs=" +
        400 +
        "x" +
        400 +
        "&chl=" +
        encodeURIComponent(this.url + this.eventox);
    },
    // ------------------ LIMPIAR VARIABLES------------------METHODS
    limpiarHistoria(fh) {
      (this.vista = 1), (this.vistaPrevia = null);
      this.fh.titulo = "";
      this.fh.historia = "";
      this.nuevaHistoria = false;
    },

    limpiarRegalo(fR) {
      this.vista = 1;
      this.vistaPrevia2 = null;
      this.fR.tituloR = "";
      this.fR.monto = "";
      this.nuevoRegalo = false;
    },

    limpiar() {
      this.vista = 1;
      this.vistaPrevia = null;
    },

    limpiar2() {
      this.vista = 1;
      this.editarRegaloMdl = null;
    },

    // -------------------- EDITAR DISEÑO ---------------- METHODS

    editarDiseñoPag(n) {
      this.editPag.Edfestejado1 = n.festejado1;
      this.editPag.Edfestejado2 = n.festejado2;
      this.editPag.Edbanco = n.banco;
      this.editPag.Edciudad = n.ciudad;
      this.editPag.EdcolorEve = n.colorEve;
      this.editPag.EdcolorCat = n.colorCat;
      this.editPag.Eddescripcion = n.descripcion;
      this.editPag.Eddireccion = n.direccion;
      this.editPag.Edevento = n.evento;
      this.editPag.Edfecha = n.fecha;
      this.editPag.EdfechaFin = n.fechaFin;
      this.editPag.Edfooter = n.footer;
      this.editPag.EdfraseD = n.fraseD;
      this.editPag.EdfraseP = n.fraseP;
      this.editPag.Edhora = n.hora;
      this.editPag.Edicon = n.icon;
      this.editPag.Edid = n.id;
      this.editPag.EdtipoEvento = n.TipoEvento;
      this.editPag.EdidTipoEvento = n.idTipoEvento;
      this.editPag.EdpagoSemanal = n.pagoSemanal;
      this.editPag.EdtipoCuenta = n.tipoCuenta;
      this.editPag.EdnumCuenta = n.numCuenta;
      this.editPag.Edpassword = n.password;
      this.editPag.Edportada = n.portada;
      this.editPag.Edprivate = n.private;
      this.editPag.Edusuario = n.usuario;
      this.editPag.Edrut = n.rut;
      this.editPag.EdRegion = n.region;
      this.dialogDiseñoPag = true;
    },

    async subirEditarPag() {
      try {
        let datosEdit = {
          festejado1: this.editPag.Edfestejado1,
          festejado2: this.editPag.Edfestejado2,
          banco: this.editPag.Edbanco,
          ciudad: this.editPag.Edciudad,
          colorEve: this.editPag.EdcolorEve,
          colorCat: this.editPag.EdcolorCat,
          descripcion: this.editPag.Eddescripcion,
          direccion: this.editPag.Eddireccion,
          evento: this.editPag.Edevento,
          fecha: this.editPag.Edfecha,
          fechaFin: this.editPag.EdfechaFin,
          footer: this.editPag.Edfooter,
          fraseD: this.editPag.EdfraseD,
          fraseP: this.editPag.EdfraseP,
          hora: this.editPag.Edhora,
          icon: this.editPag.Edicon,
          id: this.editPag.Edid,
          TipoEvento: this.editPag.EdtipoEvento,
          idTipoEvento: this.editPag.EdidTipoEvento,
          pagoSemanal: this.editPag.EdpagoSemanal,
          tipoCuenta: this.editPag.EdtipoCuenta,
          numCuenta: this.editPag.EdnumCuenta,
          password: this.editPag.Edpassword,
          portada: this.editPag.Edportada,
          private: this.editPag.Edprivate,
          usuario: this.editPag.Edusuario,
          rut: this.editPag.Edrut,
          region: this.editPag.EdRegion
        };

        await db
          .collection("Eventos")
          .doc(this.editPag.Edid)
          .set(datosEdit);

        let notificacion = {
          visible: true,
          mensaje: "Se editó con éxito.",
          color: "success"
        };

        this.$store.commit("notificacionExito", notificacion);
        this.dialogDiseñoPag = false;
        this.ConsultarDatos();
      } catch (error) {
        alert(error);
        let notificacion = {
          visible: true,
          mensaje: "Error al editar.",
          color: "error"
        };
        this.$store.commit("notificacionError", notificacion);
      }
    },

    // ------------------ Perfil------------------METHODS

    perfil() {
      this.$router.push({ name: "perfil" });
    },

    // ------------------ HOME------------------METHODS

    home() {
      this.$router.push({ name: "home" });
    },

    // ------------------ Salir------------------METHODS

    salir() {
      this.cerrarSesion();
      this.menu = false;
      this.$router.push({ name: "login" });
    },

    // ------------------ Consultar historia------------------METHODS
    async consultarHistorias() {
      this.FotoHistoriaOptener = [];
      this.eventox = null;
      this.eventox = this.$route.params.id;

      try {
        let resultado = await db
          .collection("Eventos")
          .doc(this.eventox)
          .collection("Historias")
          .doc(this.eventox)
          .collection("Historia")
          .get();

        resultado.docs.forEach(doc => {
          this.FotoHistoriaOptener.push(doc.data());
        });

        this.newDates(); ///AQUI ORDENA LOS TIEMPOS
      } catch (error) {
        this.mostrarError("Ocurrió un error recuperando tus historias.");
      } finally {
      }
    },

    // ------------------ Cargar imagen (Historias)------------------METHODS
    cargarImagen(error, archivo) {
      if (error) {
        this.mostrarError("Ocurrió un error leyendo la imagen.");
        return;
      }

      this.vista = 2;

      let reader = new FileReader();

      let vm = this;

      reader.onloadend = () => {
        vm.$refs.imagenOriginal.src = reader.result;
        vm.recortarImagen();
      };

      if (archivo) {
        if (archivo.file) {
          reader.readAsDataURL(archivo.file);
        }
      }
    },

    async TraerEventos() {
      try {
        let docs = await db
          .collection("Eventos")
          .where("usuario", "==", this.usuario.uid)
          .get();
        docs.forEach(doc => {
          this.ArrayEventos.push(doc.data());
        });
      } catch (error) {
        alert(error);
      }
    },

    // ------------------ Consultar Evento(datos)------------------METHODS

    async ConsultarDatos() {
      this.ArrayDatos = [];
      try {
        let datos = await db
          .collection("Eventos")
          .where("id", "==", this.eventox)
          .get();

        datos.docs.forEach(doc => {
          this.ArrayDatos.push(doc.data());
          let ColorEnviar = doc.data().colorEve;
          this.actualizarColor(ColorEnviar);
        });
      } catch (error) {}
    },

    // ------------------ Consultar Regalo------------------METHODS

    async consultarRegalo() {
      this.FotoRegaloOptener = [];
      this.eventox = null;
      this.eventox = this.$route.params.id;

      try {
        let resultado = await db
          .collection("Eventos")
          .doc(this.eventox)
          .collection("Regalos")
          .get();

        resultado.docs.forEach(doc => {
          this.FotoRegaloOptener.push(doc.data());
        });
      } catch (error) {
        this.mostrarError("Ocurrió un error recuperando tus regalos.");
      } finally {
      }
    },

    // ------------------ Cargar imagen 2 (REGALO)------------------METHODS

    cargarImagen2(error, archivo) {
      if (error) {
        this.mostrarError("Ocurrió un error leyendo la imagen.");
        return;
      }

      this.vista = 2;

      let reader = new FileReader();

      let vm = this;

      reader.onloadend = () => {
        vm.$refs.imagenOriginal2.src = reader.result;
        vm.recortarImagen2();
      };

      if (archivo) {
        if (archivo.file) {
          reader.readAsDataURL(archivo.file);
        }
      }
    },

    // ------------------ Recortar imagen(HISTORIAS)------------------METHODS

    recortarImagen() {
      this.cropper = new Cropper(this.$refs.imagenOriginal, {
        preview: this.$refs.vistaPrevia,
        aspectRatio: NaN,
        modal: false,
        guides: true,
        sized: true,
        zoomable: false,
        highlight: true,
        background: false,
        autoCrop: true
      });
    },

    // ------------------ Recortar Imagen(REGALOS)------------------METHODS

    recortarImagen2() {
      this.cropper = new Cropper(this.$refs.imagenOriginal2, {
        preview: this.$refs.vistaPrevia2,
        aspectRatio: NaN,
        modal: false,
        guides: true,
        sized: true,
        zoomable: false,
        highlight: true,
        background: false,
        autoCrop: true
      });
    },

    // ------------------ AGREGAR HISTORIA------------------METHODS

    async AgregarHistoria() {
      this.eventox = null;
      this.eventox = this.$route.params.id;
      let canvas = this.cropper.getCroppedCanvas();
      let imagen = canvas.toDataURL("image/jpeg");
      let fotoId = uuidv4();

      let ocupado = {
        visible: true,
        titulo: "Registrando historia",
        mensaje: "Se esta registrando la historia en la base de datos"
      };

      this.$store.commit("mostrarOcupado", ocupado);

      try {
        let ref = storage.ref();
        let resultadox = await ref
          .child(
            `Usuarios/${this.usuario.uid}/lista/fotos-Historia/${fotoId}.jpg`
          )
          .putString(imagen, "data_url");

        let url = await resultadox.ref.getDownloadURL();

        let fotoPerfil = {
          fotoId,
          FotoHistoria: url,
          uid: this.usuario.uid,
          fecha: this.fechaparalaHistoria,
          Titulo: this.fh.titulo,
          Historia: this.fh.historia
        };

        await db
          .collection("Eventos")
          .doc(this.eventox)
          .collection("Historias")
          .doc(this.eventox)
          .collection("Historia")
          .doc(fotoId)
          .set(fotoPerfil);

        this.consultarHistorias();

        let notificacion = {
          visible: true,
          mensaje: "Se agrego la historia con éxito.",
          color: "success"
        };

        this.$store.commit("notificacionExito", notificacion);
        this.$store.commit("ocultarOcupado");
      } catch (error) {
        let notificacion = {
          visible: true,
          mensaje: "Error al agregar la historia.",
          color: "error"
        };
        this.$store.commit("notificacionError", notificacion);
      } finally {
        this.$store.commit("ocultarOcupado");
        this.limpiarHistoria();
      }
    },

    // ------------------ AGREGAR REGALO------------------METHODS

    async AgregarRegalo() {
      let canvas = this.cropper.getCroppedCanvas();
      let imagen = canvas.toDataURL("image/jpeg");
      let fotoId = uuidv4();

      let ocupado = {
        visible: true,
        titulo: "Registrando regalo",
        mensaje: "Se esta registrando el regalo en la base de datos"
      };

      this.$store.commit("mostrarOcupado", ocupado);
      try {
        let ref = storage.ref();
        let resultadox = await ref
          .child(`Usuarios/${this.usuario.uid}/lista/regalos/${fotoId}.jpg`)
          .putString(imagen, "data_url");

        let url = await resultadox.ref.getDownloadURL();

        let fotoPerfil = {
          id: fotoId,
          Imagen: url,
          cantidad: this.fR.stock,
          uid: this.usuario.uid,
          nombre: this.fR.tituloR,
          precio: this.fR.monto
        };

        await db
          .collection("Eventos")
          .doc(this.eventox)
          .collection("Regalos")
          .doc(fotoId)
          .set(fotoPerfil);

        this.consultarRegalo();

        let notificacion = {
          visible: true,
          mensaje: "Se agregó el regalo con éxito.",
          color: "success"
        };

        this.$store.commit("notificacionExito", notificacion);
        this.$store.commit("ocultarOcupado");
        this.limpiarRegalo();
      } catch (error) {
        let notificacion = {
          visible: true,
          mensaje: "Error al agregar el regalo.",
          color: "error"
        };
        this.$store.commit("notificacionError", notificacion);
      } finally {
        this, $store.commit("ocultarNotificar");
        this.$store.commit("ocultarOcupado");
      }
    },

    // ------------------ EDITAR HISTORIA------------------METHODS

    editarHistoria(historias, fHisEdit) {
      this.editarHistoriaMdl = historias;
      this.editarHistoriaMdl = true;
      this.fHisEdit.titulo = historias.Titulo;
      this.fHisEdit.historia = historias.Historia;
      this.fHisEdit.idEditarHistoria = historias.fotoId;
      this.fHisEdit.urlFotoEditHistoria = historias.FotoHistoria;
      this.fHisEdit.uidUser = historias.uid;
      this.fHisEdit.fecha = historias.fecha;
      this.fHisEdit;
    },

    async subirHistoriaEditar() {
      this.eventox = null;
      this.eventox = this.$route.params.id;
      try {
        let fotoPerfil = {
          fotoId: this.fHisEdit.idEditarHistoria,
          Titulo: this.fHisEdit.titulo,
          Historia: this.fHisEdit.historia,
          FotoHistoria: this.fHisEdit.urlFotoEditHistoria,
          uid: this.fHisEdit.uidUser
        };

        db.collection("Eventos")
          .doc(this.eventox)
          .collection("Historias")
          .doc(this.eventox)
          .collection("Historia")
          .doc(this.fHisEdit.idEditarHistoria)
          .set(fotoPerfil);

        this.consultarHistorias();

        let notificacion = {
          visible: true,
          mensaje: "Se editó la historia con éxito.",
          color: "success"
        };

        this.$store.commit("notificacionExito", notificacion);
      } catch (error) {
        let notificacion = {
          visible: true,
          mensaje: "Error al editar la historia.",
          color: "error"
        };
        this.$store.commit("notificacionError", notificacion);
      } finally {
      }
    },

    // ------------------ ELIMINAR HISTORIA------------------METHODS

    async EliminarHistoria(historias) {
      this.eventox = null;
      this.eventox = this.$route.params.id;
      let ref = storage.ref();
      let fotoRef = ref.child(
        `Usuarios/${this.usuario.uid}/lista/fotos-Historia/${historias.fotoId}.jpg`
      );

      try {
        fotoRef.delete();
        db.collection("Eventos")
          .doc(this.eventox)
          .collection("Historias")
          .doc(this.eventox)
          .collection("Historia")
          .doc(historias.fotoId)
          .delete();

        let notificacion = {
          visible: true,
          mensaje: "Se eliminó la historia con éxito.",
          color: "success"
        };

        this.$store.commit("notificacionExito", notificacion);
      } catch (error) {
        let notificacion = {
          visible: true,
          mensaje: "Error al eliminar la historia.",
          color: "error"
        };
        this.$store.commit("notificacionError", notificacion);
      } finally {
        this.consultarHistorias();
      }
    },

    // ------------------ ELIMINAR REGALO------------------METHODS

    async EliminarRegalos(regalos) {
      this.eventox = null;
      this.eventox = this.$route.params.id;
      let ref = storage.ref();
      let fotoRef = ref.child(
        `Usuarios/${this.usuario.uid}/lista/regalos/${regalos.id}.jpg`
      );

      try {
        fotoRef.delete();
        db.collection("Eventos")
          .doc(this.eventox)
          .collection("Regalos")
          .doc(regalos.id)
          .delete();

        let notificacion = {
          visible: true,
          mensaje: "Se eliminó el regalo con éxito.",
          color: "success"
        };

        this.$store.commit("notificacionExito", notificacion);
      } catch (error) {
        let notificacion = {
          visible: true,
          mensaje: "Error al eliminar el regalo.",
          color: "error"
        };
        this.$store.commit("notificacionError", notificacion);
      } finally {
        this.consultarRegalo();
      }
    },

    // --------------------------------------EDITAR REGALO --------------------METHODS

    editarRegalo(regalos, fRedit) {
      this.editarRegaloMdl = regalos;
      this.editarRegaloMdl = true;
      this.fRedit.tituloR = regalos.nombre;
      this.fRedit.monto = regalos.precio;
      this.fRedit.stock = regalos.cantidad;
      this.fRedit.idEditarRegalo = regalos.id;
      this.fRedit.urlFotoEdit = regalos.Imagen;
      this.fRedit.uidUser = regalos.uid;
      this.fRedit;
    },

    async subirRegaloEditar() {
      this.eventox = null;
      this.eventox = this.$route.params.id;

      try {
        let fotoPerfil = {
          id: this.fRedit.idEditarRegalo,
          nombre: this.fRedit.tituloR,
          precio: this.fRedit.monto,
          Imagen: this.fRedit.urlFotoEdit,
          cantidad: this.fRedit.stock,
          uid: this.fRedit.uidUser
        };

        db.collection("Eventos")
          .doc(this.eventox)
          .collection("Regalos")
          .doc(this.fRedit.idEditarRegalo)
          .set(fotoPerfil);

        this.consultarRegalo();

        let notificacion = {
          visible: true,
          mensaje: "Se editó el regalo con éxito.",
          color: "success"
        };

        this.$store.commit("notificacionExito", notificacion);
        this.limpiar2();
      } catch (error) {
        let notificacion = {
          visible: true,
          mensaje: "Error al editar el regalo.",
          color: "error"
        };
        this.$store.commit("notificacionError", notificacion);
      } finally {
      }
    },

    // ------------------ SECCION CARRITO------------------METHODS

    AgregarAlCarro(regalos) {
      if (this.validarCarro(regalos.id)) {
        let notificar = {
          visible: true,
          mensaje: "Este regalo ya se esta en el carrito c:"
        };

        this.$store.commit("notificacionError", notificar);
      } else {
        this.Ragregado.color = this.ArrayDatos[0].colorEve;
        this.Ragregado.nombre = regalos.nombre;
        this.Ragregado.precio = regalos.precio;
        this.Ragregado.imagen = regalos.Imagen;
        this.Ragregado.cantidad = 1;

        this.agregado = true;

        this.ArrayCarrito.push({
          id: regalos.id,
          nombre: regalos.nombre,
          precio: regalos.precio,
          imagen: regalos.Imagen,
          cantidad: 1
        });
        this.ArticulosTotal();
      }
    },

    validarCarro(id) {
      var sw = 0;
      for (var i = 0; i < this.ArrayCarrito.length; i++) {
        if (this.ArrayCarrito[i].id == id) {
          sw = true;
        }
      }
      return sw;
    },
    ArticulosTotal() {
      let total = this.ArrayCarrito.length;
      return (this.TotalCarrito = total);
    },
    Aumentar(carrito) {
      let index = this.ArrayCarrito.indexOf(carrito);
      this.ArrayCarrito[index].cantidad = carrito.cantidad + 1;
    },
    disminuir(carrito) {
      let index = this.ArrayCarrito.indexOf(carrito);
      if (this.ArrayCarrito[index].cantidad >= 2) {
        this.ArrayCarrito[index].cantidad = carrito.cantidad - 1;
      } else {
        this.ArrayCarrito[index].cantidad = 1;
      }
    },
    eliminar(carrito) {
      let index = this.ArrayCarrito.indexOf(carrito);
      this.ArrayCarrito.splice(index, 1);
      this.ArticulosTotal();
    },
    async comprarCarrito() {
      let id = uuidv4();
      let ocupado = {
        visible: true,
        titulo: "Comprando",
        mensaje: "Comprando regalos simbolicos"
      };
      this.$store.commit("mostrarOcupado", ocupado);

      let total = this.totalPagar;
      let comision = (total * 10) / 100;
      let totalTransferir = total - comision;
      let carrito = {
        id,
        fecha: new Date().toISOString().substr(0, 10),
        total: total,
        idRemitente: this.usuario.uid,
        Remitente: this.usuario.nombre + " " + this.usuario.apellido1,
        dedicatoria: this.dedicatoria,
        idEvento: this.ArrayDatos[0].id,
        usuario: this.ArrayDatos[0].usuario,
        nombreEvento: this.ArrayDatos[0].evento,
        transferido: false,
        comision: comision,
        totalTransferir: totalTransferir
      };
      try {
        await db
          .collection("Compras")
          .doc(id)
          .set(carrito);
      } catch (error) {
        console.log(error);
      }

      try {
        this.ArrayCarrito.forEach(arr => {
          let idR = uuidv4();

          let regalo = {
            idR,
            nombre: arr.nombre,
            cantidad: arr.cantidad,
            precioUnitario: arr.precio,
            total: arr.precio * arr.cantidad
          };

          db.collection("Compras")
            .doc(id)
            .collection("DetalleCompras")
            .doc(idR)
            .set(regalo);
        });
        this.$store.commit("ocultarOcupado");
        this.Carrito = false;
      } catch (error) {
      } finally {
        this.Carrito = false;
      }
    }
  },

  // ***************** CREATED ****************
  created() {
    this.TraerEventos();
    this.consultarHistorias();
    this.consultarRegalo();
    this.ConsultarDatos();
    this.buildUrl();
    this.sumarArrays();
    setInterval(() => this.updateCurrentTime(), 1 * 1000);
  },

  // ***************** WATCH ****************
  watch: {
    $route() {
      this.consultarHistorias();
      this.consultarRegalo();
      this.ConsultarDatos();
    }
  },
  // ***************** COMPUTED ****************
  computed: {
    ...mapState(["usuario"]),
    ...mapState(["evento", "ocupado", "notificar"]),
    totalPagar() {
      let total = 0;
      this.ArrayCarrito.map(i => {
        total = total + i.precio * i.cantidad;
      });
      return total;
    },
    total() {
      let total = 0;
      this.ArrayCarrito.forEach(arr => {
        total = total + arr.cantidad;
      });
      return total;
    },
    newDates: function() {
      var order = this.oldestFirst ? 1 : -1;
      // `this` points to the vm instance
      this.FotoHistoriaOptener.sort(function(a, b) {
        a = new Date(a.fecha);
        b = new Date(b.fecha);
        var results = a > b ? -1 : a < b ? 1 : 0;
        return results * order;
      });
    }
  }
};
</script>


<style>
/* ****************** STYLE ******************** */
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
.subtitulo-perfil {
  font-size: 2vw;
}
.texto-descripcion {
  font-size: 20px;
}
.titulo-descripcion {
  font-size: 30px;
}

.sube {
  opacity: 0;
}

.imagen:hover .sube {
  transition: 0.5s;
  opacity: 1;
  transform: translateY(-20px);
}

.edicionImagen {
  width: 92%;
}

.vistaPrevia {
  width: 400px;
  height: 400px;
  overflow: hidden;
}
.vistaPrevia2 {
  width: 400px;
  height: 400px;
  overflow: hidden;
}
.bs {
  text-shadow: 160px 200px 44px #000000;
}
.sp .v-snack__content {
  padding: 0px !important;
}

#portada {
  width: 100%;
  height: 450px;
  position: relative;
}
</style>

